# WerkCV CV-side MCP: spec

Date: 4 October 2026. Status: phases 0–1 built on branch `feat/cv-mcp-pilot` (4 Oct 2026), switched off by default (`MCP_ENABLED`). Not deployed, not listed in any directory.

## 1. Decision and one-line summary

Build a small remote MCP server that lets someone in Claude (or another MCP client) check their CV and match it to a vacancy, with a link into the no-account editor and, for people tailoring to several jobs, the Sollicitatiepas. Jobs come from the user's own job connector (Indeed, Careerjet, a pasted ad). We do not build a jobs feed. An optional tool searches Dutch government vacancies once the open API is back.

Why not a jobs MCP: Indeed already ships a free official one; scraped boards break site terms and carry EU database-right risk; licensed feeds (Adzuna) need a commercial licence. Dutch portals (Nationale Vacaturebank, Jobbird, Werkzoeken, Intermediair, Monsterboard.nl) offer no public API or MCP that I found. See the research notes in §10.

## 2. Evidence this is worth a pilot (and what we do not know)

What we know (production, 26 Sep–3 Oct 2026, `docs/product/2026-10-03-cv-check-2-week-review.sql`):
- 42 visitors opened the checker, 30 got a result, 13 clicked a fix. 43% of people with a result want to act. The leak was the login wall, fixed on 3 Oct.
- 4 people rebuilt their CV in the editor and then re-checked it. People want a number that moves.
- Free, no-account use works: 31 of 42 started a check.

What we do not know:
- How many people use MCP connectors with Dutch vacancies. Probably few at first.
- Whether they click through, or stay in chat. This is the main risk.
- The Sollicitatiepas spec found no search demand for "pass" as a concept (`2026-10-01-sollicitatiepas-growth-spec.md`). Demand is for tailoring, not for the pass.

So this is a cheap experiment with a kill rule (§8), not a growth plan.

## 3. Why the visitors could be good (and when they will not be)

A visitor from this MCP arrives further down the funnel than a search visitor:

| | Search visitor (e.g. /cv-check) | MCP visitor |
|---|---|---|
| Has a CV in hand | sometimes | always: they pasted it into chat |
| Has a specific vacancy | rarely | yes: they found it through a job connector or pasted it |
| Already knows what is wrong | no | yes: the chat showed grade, top fixes and requirement matches |
| Next step | decide whether to act | click the link to fix it |
| Pass fit | unclear | direct: each new vacancy means another tailored CV |

Reasons this is quality, not just volume:
1. **Intent is already shown.** Nobody pastes a CV and a vacancy into an assistant to browse.
2. **Pre-qualified.** The link is offered only when the grade is below 8,0 or a requirement is unmet. People with a strong CV get no nudge.
3. **Matches the pass.** Someone applying to a second and third job needs a second and third CV. The editor and the Mijn cv's page can offer "Dupliceer voor een andere vacature" (spec P1.1) at that moment.
4. **Cheap to attribute.** Every link carries `startSource=mcp_<client>`, so we measure it cleanly (§7).
5. **AI discovery.** A listed connector can be suggested when someone asks an assistant to check a Dutch CV. That is a new, uncontested channel (unproven; see §8).

Where it will not be quality: if the audience is mostly developers testing connectors, clicks will be low and sales near zero. The pilot measures this in the first two weeks.

## 4. Scope

In: `check_cv`, `match_vacancy`, `open_in_editor`, optional `search_government_jobs`, a landing page with install steps (NL + EN), tracking, rate limits, privacy wording, connector-directory submission.

Out: any jobs feed, scraping, auto-apply, accounts or OAuth, storing CVs, cover letters, a ChatGPT-specific app (revisit after the pilot).

## 5. Tools

All tools return plain structured JSON plus a short text summary in the user's language. Every tool sets MCP tool annotations (`title`, `readOnlyHint`, `destructiveHint`, `openWorldHint`) as the connector directory requires.

### 5.1 `check_cv` (read-only, no AI, free)

Input: `cv_text` (string, 200–25 000 chars), `locale` ("nl" | "en", default from the text).
Runs `runCvCheck({ ai: false, layout: emptyLayoutSignals("text") })`, the same engine as the editor grade (`/api/cv-check/editor-grade`).
Output: `grade` (1,0–10,0), `band`, `categories[]`, `top_fixes[]` (max 3: `id`, `title`, `fix`, `evidence`), `sections_found[]`, `critical_issues`, `can_open_in_editor` (true when `grade < 8,0`), `limitations`. It returns no link: only `open_in_editor` stores anything, and the text tells the model the CV can be opened in the editor.
Limit: 30 calls/hour/IP. No logging of `cv_text`.

### 5.2 `match_vacancy` (read-only, uses AI, rate-limited)

Input: `cv_text`, `vacancy_text` (120–18 000 chars), `locale`.
Runs `matchCvVacature` (gpt-4o-mini, existing). Output: `score`, `scoreLabel`, `summary`, `requirements[]` (`requirement`, `importance`, `status` strong/partial/missing, `cvEvidence`, `vacancyEvidence`, `honestAction`), `topFixes[]`, `missingKeywords[]`, `canOpenInEditor` (true when any requirement is not strong).
Limit: 8 calls/hour and 20/day/IP (same as `/api/cv-check`), plus a global daily AI budget (§6).
Errors: `VACANCY_TOO_SHORT`, `TEXT_TOO_SHORT`, `RATE_LIMITED`, `AI_UNAVAILABLE`, each with a plain-language message.

### 5.3 `open_in_editor` (writes a short-lived handoff)

Input: `cv_text`, optional `vacancy_text`, `locale`.
Creates a handoff record (§5.5) and returns `{ url, expires_in_minutes: 60 }`. The model should call it only when the user asks to edit or download. This is the only tool that stores anything.
Limit: 5/hour/IP.

### 5.4 `search_government_jobs` (optional, behind a flag, off until the API is back)

Source: the KOOP "Vacatures overheid" Vacature-API (WerkenvoorNederland, WerkenbijdeOverheid, Mobiliteitsbank), JSON, CC-0 (`data.overheid.nl/dataset/vacatures-overheid`).
Status on 4 Oct 2026: the dataset is marked "Not available" and `docs.api.cso20.net` returned 503. Contact: helpdesk@werkenvoornederland.nl. Do not build this until they confirm the API, its limits and whether results may be cached.
Input: `query`, `location`, `limit` (≤10).
Output per job: `title`, `employer`, `location`, `url` (the original posting), `published`. Footer: "Bron: WerkenvoorNederland.nl (KOOP), CC0".
Cache: only as the terms allow; default no cache beyond 15 minutes.
Honest limit: public-sector jobs only. The tool description says so.

### 5.5 Handoff to the editor

The CV text is personal data, so it never goes in a URL. `open_in_editor` stores it server-side through a new `ToolCvHandoff` kind (`checked_cv`), reusing the existing design in `lib/tool-handoff-service.ts`: 256-bit random token, SHA-256 hash stored, single use, deleted on first use, hard expiry at 60 minutes, expired rows purged on the next write.
The link is `https://werkcv.nl/cv-check/verbeteren?handoff=<token>&utm_source=mcp&utm_medium=<client>&utm_campaign=cv-check` (`/en/cv-check/improve` for English). First-touch attribution already stores the `utm_*` parameters, so no attribution change was needed. The editor removes the token from the address bar as soon as it reads it. The page already hosts the no-account editor. It exchanges the token for the text once, parses it (`parseCVText`) into the editor, and shows the grade card. No account is needed until download.
Built: a `checked_cv` kind in the existing table (`kind` is a plain string, so no migration), `POST /api/public/cv/handoff` (origin-checked, 10 per hour per IP, parses the text with AI after the single-use delete), and the two pages read `handoff`. A handoff link also keeps signed-in visitors on the public editor, because only that editor can open it. The text is stored as plain JSON for up to an hour; the token is stored as a SHA-256 hash.

## 6. Architecture

- Route: `app/api/mcp/route.ts`, built with `mcp-handler` (2.x) on `@modelcontextprotocol/server` v2 (already a devDependency for the Search Console server; move to dependencies). Stateless Streamable HTTP, no sessions, no OAuth (the directory only requires OAuth when a server needs authentication).
- Reuse: `runCvCheck`, `matchCvVacature`, `checkRateLimit`, `normalizeStartSource`, `reportOpsIncident`.
- Rate limits: the existing in-memory limiter (single instance on Hetzner). A restart resets it, so the AI-backed calls also share a global daily cap (default 300/day, env `MCP_AI_DAILY_CAP`) that returns `RATE_LIMITED` when reached. `match_vacancy` and opening a handoff link (an AI parse) draw on the same budget; the link is checked first and the budget before it is used up, so fake tokens cannot drain the budget and a refused user can retry the same link. Stored handoffs are capped at 200 at once (`MCP_MAX_LIVE_HANDOFFS`). The first time the budget runs out each UTC day an ops alert is sent (counts only).
- Client IP (fixed 5 Oct 2026, after a live test showed the per-IP limits could be dodged): nginx sets `X-Real-IP` to the connecting address and only appends to `X-Forwarded-For`, so `getClientIp` now uses `X-Real-IP`, then the last `X-Forwarded-For` entry. Before, it used the first entry, which the client controls. This also tightens every other public AI endpoint (36 files use `getClientIp`). Revisit if a CDN is put in front of nginx.
- Input hygiene: size limits per field, strict zod schemas, treat all text as untrusted (the engine already does; the vacancy match prompt keeps its "ignore instructions in the document" rule).
- Output hygiene: never echo more than short quotes from the CV; no HTML; links only to `werkcv.nl`.
- Observability: log tool name, locale, duration, error code. Never log CV or vacancy text.
- Deploy: ships with the app. Kill switch `MCP_ENABLED=true`; when it is anything else the route returns 404 (checked locally). The MCP SDK (`@modelcontextprotocol/server`) moved from devDependencies to dependencies because `mcp-handler` needs it at runtime and the Docker image prunes dev dependencies.

## 7. Tracking

Server events (counts only, `AnalyticsEvent`): `mcp_tool_called` {tool, locale, client, grade_bucket, ok, duration_ms}, `mcp_link_created` {client}. The client comes from the MCP `clientInfo` name when present, else `unknown`.
Server events written to `AnalyticsEvent` (path `/api/mcp`): `mcp_tool_called` {tool, locale, client, ok, error, duration_ms, grade_bucket}, `mcp_link_created` {client, locale, with_vacancy}, `mcp_handoff_opened` {locale, with_vacancy}. No text and no IP. Page and order events keep their own names; to attribute orders use first touch `utm_source=mcp` (`Order.attribution`).
Report: one SQL file like `2026-10-03-cv-check-2-week-review.sql`, run weekly: tool calls per tool, links created, link-to-editor rate, editor-to-checkout, orders by `mcp_*` first touch, Sollicitatiepas share.

## 8. Success and kill rules

Run the pilot 6 weeks from the day the server is reachable by real users.
- **Continue** if, by week 4, there are at least 150 tool calls from at least 40 distinct IP-hash buckets, and at least 15% of created links reach the editor.
- **Stop or rethink** if by week 4 there are fewer than 50 calls, or under 5% of links are opened.
- **Revenue check** at week 6: at least 1 paid order from `mcp_*` first touch, or a clear funnel step to blame.
These thresholds are guesses, not forecasts: there is no baseline for this channel. Adjust after week 2.

## 9. Privacy, legal and policy

- Privacy page section (NL + EN, done 5 Oct 2026, in the retention section): what the tools receive, that `check_cv` and `match_vacancy` store nothing, that `open_in_editor` stores the text for up to 60 minutes and deletes it on first use, and that the vacancy match sends text to OpenAI (as `/cv-check` does today).
- Tool descriptions tell the model not to send BSN, ID or bank numbers; `check_cv` flags them (existing critical check) and the response says to remove them.
- No ad copy aimed at the model. A tool result may contain one factual line with the link and, in the editor page only, the pass offer. Keep tool output free of instructions to the model; I have not read the full directory policy, so read `support.claude.com` "Anthropic MCP directory policy" before submitting.
- Government data: CC-0, but keep the source line.
- Comparison or competitor claims: none in tool output.

## 10. Research behind this spec

- Indeed MCP: official, Claude connector, beta, needs an Indeed login; Netherlands coverage not stated in its docs (docs.indeed.com/mcp).
- Open-source job MCPs scrape LinkedIn, Indeed and others (JobSpy and similar): terms-of-service risk, not for us.
- Adzuna: 14-day commercial trial, then a licence; attribution; 250 hits/day by default; nothing allows AI assistants explicitly.
- Dutch portals: no public API or MCP found for Nationale Vacaturebank, Jobbird, Werkzoeken, Intermediair, Monsterboard.nl.
- Government: the KOOP Vacature-API (CC-0) exists but is marked unavailable and returned 503 on 4 Oct 2026.
- Resumai: ships an MCP connector where Claude or ChatGPT can tailor a resume from chat (public product page, 3 Oct 2026). It is a Pro feature there.
- Directory: remote servers are submitted through a review form; tool annotations, a privacy policy and setup instructions are required; OAuth only if the server needs sign-in.

## 11. Delivery plan

| Phase | Work | Done when |
|---|---|---|
| 0 (2–3 days) | `/api/mcp` with `check_cv` and `match_vacancy`, limits, zod schemas, kill switch, tests, internal test in Claude with fictional CVs | A Claude custom connector pointed at the route returns correct results for 5 fixture CVs, including a BSN case and a too-short case |
| 1 (2–3 days) | `checked_cv` handoff, exchange endpoint, page reads `handoff`, grade card shows, `startSource` tracking, weekly SQL | A link from chat opens the CV in the editor, once, and expires |
| 2 (1 week incl. waiting) | Landing page NL + EN with install steps, privacy section, `llms.txt` entry, directory submission | Page live; form submitted |
| 3 (only if the API is confirmed) | `search_government_jobs` behind a flag | KOOP helpdesk confirms terms and uptime |

Tests (phases 0–1, `npm run test:mcp`, 9 tests; plus a manual protocol run with `initialize`, `tools/list` and `tools/call` against a dev server): schema validation; each tool with fixture inputs; rate limits and the daily cap; handoff single-use, expiry and replay; no CV text in logs; `MCP_ENABLED=false` returns 404; a type check and the existing `cv-check` tests.

## 12. Open questions

1. Server URL and name: `werkcv.nl/api/mcp`, listed as "WerkCV CV-check"? (My suggestion; decide before the directory form.)
2. Do we offer ChatGPT support in the pilot? Not verified how its connector setup works today; revisit after week 2.
3. Should `check_cv` ever call the AI buzzword check? Not in the pilot, to keep it free and fast; the grade can differ slightly from `/cv-check` (in a local test the editor grade, which also skips the AI step, was 0,1 higher). Say so on the landing page.
4. Who emails KOOP, and who owns the Sollicitatiepas copy shown on the editor page for `mcp_*` visitors?

## 13. Findings from the first real Claude session (5 Oct 2026)

Tested in a real Claude account with a fictional CV: custom connector, no sign-in, three tools, each call approved once. All three tools worked; Claude chose them from plain Dutch and passed `locale`. The link carried `utm_medium=claude` and opened the editor with the CV loaded.

What it showed, and what changed (commit after 0435975):
1. **False "years of experience missing"** on "vijf jaar ervaring": the check only matched digits. Now spelled-out numbers (NL and EN) count; "een"/"one" do not (they are articles). Score version 2026-10.4. This also fixes the website checker.
2. **A fix for a requirement the list showed as met** (English B2: "aangetoond", yet fix number one). The rules correct statuses after the model wrote its fixes. `dropFixesForMetRequirements` now drops a fix when everything it is about is met.
3. **Essential versus preferred was missing from the text** ("rijbewijs B is een pre"). The text now marks each requirement `essentieel` or `pre`.
4. **The editor was never offered.** The instructions said to call `open_in_editor` only when the user wants to edit or download, so Claude offered to rewrite the CV itself instead. The instructions now let the model offer the editor, and tool results that can open in the editor state that editing is free without an account and the PDF is a one-time €7,95.

Not changed yet: the match only covers the "Wat vragen wij" requirements and ignores "Wat ga je doen"; fix wording assumes a motivatiebrief; a missing vacancy keyword ("per e-mail") is not flagged. Each tool call re-sends the whole CV, which is costly on usage: the test chat used about 90% of a Pro session limit.

## 14. Phase 2: public documentation and the connector directory (6 Oct 2026)

Sources read on 5 Oct 2026: Anthropic's "Submit a connector to the directory" and "Connector pre-submission checklist" (claude.com/docs/connectors/building), and the Software Directory Policy (support.claude.com article 13145358, which replaced the MCP Directory Policy on 15 Apr 2026). Re-read them before submitting: they change.

### 14.1 Built in this phase (not deployed until approved)

- Public documentation, NL and EN: `/cv-check/ai-assistent` and `/en/cv-check/ai-assistant` (`components/cv-check/CvCheckAssistant.tsx`). Contents: the three tools, the connect steps (tested in Claude on the web), three example prompts, a table of what is received and kept per tool, limits, the usage cost, the price of the PDF, FAQ with JSON-LD, support email, and a "not affiliated with Anthropic" line.
- Language pair, sitemap entries, a link from the CV-check page, and a line in `llms.txt`.
- The copy button selects the URL when the browser blocks clipboard access.

### 14.2 What the directory requires, and where we stand

| Requirement | Status |
|---|---|
| Remote server over HTTPS, Streamable HTTP | Yes (`https://werkcv.nl/api/mcp`) |
| Every tool has `title` and `readOnlyHint` or `destructiveHint` | Yes (checked in the real Claude: two read-only tools, one write tool) |
| Tool names at most 64 characters | Yes |
| OAuth only if the tools need an account | Not needed: no sign-in, no account data |
| Tested in Claude as a custom connector | Yes, 5 Oct 2026 |
| Documentation URL | The new page (public by the publish date) |
| Privacy policy URL | `/en/privacy` and `/privacy`, which now describe the connector |
| Support contact | contact@werkcv.nl |
| Test account for reviewers | No account exists; give reviewers a fictional CV, a vacancy and the three prompts (below) |
| Three working prompt examples | On the page |
| Own first-party API on a matching domain | Yes: werkcv.nl |
| No extra conversation data, no reading memory or files | Yes: counts only, nothing else collected |
| Actionable error messages | Yes (plain-language codes in NL and EN) |
| Seven compliance acknowledgments in the portal | A person at the company must tick them (see 14.4) |

After submission Anthropic scans automatically and, by default, lists the connector as a Community connector; some get a human review. Escalations: mcp-review@anthropic.com. Submitting needs a paid Claude plan.

### 14.3 The one real risk: promotion

The policy rejects software that "exists primarily as an advertising or promotional vehicle", and tool descriptions that "promote products and services" or tell Claude "to behave in ways unrelated to the tool's function". Our connector does real work (check, compare), but two things lean toward promotion:
1. The server instructions added on 5 Oct tell the model it "may offer" the editor and "say plainly" that the PDF is a paid step. That is steering.
2. `open_in_editor` leads to a paid download.

Options for the listed version:
- **A (recommended for the directory):** neutral instructions that only describe each tool and when to call it, e.g. "open_in_editor opens the CV in the WerkCV editor; call it when the user asks to edit the CV there or to download it as a PDF." Keep the factual price line inside tool results (it is information, not steering). Expect fewer unprompted editor offers: in the first real session Claude never offered the editor until asked.
- **B:** keep the steering and accept a rejection risk. For the private custom connector this is fine; for the directory it is a gamble.
Decision needed from the owner. Either way, the landing page is documentation, not part of the review of tool text.

### 14.4 Who does what

- **Owner (needs a person at WerkCV):** open the portal (claude.ai/directory/manage, "Submit new", "MCP connector"), enter company name, website and primary contact, choose categories, upload an icon, tick the seven compliance acknowledgments and agree to the Software Directory Terms. These are legal acknowledgments, so they are not done on the owner's behalf.
- **Prepared below:** all listing text and the reviewer instructions.

### 14.5 Listing draft (portal limits: name 100, one-liner 200, description 2,000)

- **Name:** WerkCV CV-check
- **One-liner (EN):** Check a CV against Dutch hiring conventions, compare it with a vacancy and open it in an editor. Free, no account, nothing stored.
- **Description (EN):** WerkCV CV-check lets you check a CV inside a conversation. Paste your CV and get a grade from 1 to 10 for readability by application systems, contact basics, content and Dutch conventions (language levels, MBO/HBO/WO, sensitive numbers such as BSN), with the fixes to make first. Paste a vacancy as well and see, requirement by requirement, whether the CV shows it, with quotes from both texts and whether each requirement is essential or a nice-to-have. When you want to edit the CV, a one-time link opens it in the WerkCV editor without an account. Checking and comparing store nothing. The editor link keeps the text for at most 60 minutes and deletes it the first time the link is opened. Editing is free; downloading the PDF is a one-time paid step with no subscription. Available in Dutch and English. Not affiliated with Anthropic.
- **Documentation URL:** https://werkcv.nl/en/cv-check/ai-assistant (NL: https://werkcv.nl/cv-check/ai-assistent)
- **Privacy policy URL:** https://werkcv.nl/en/privacy
- **Support:** contact@werkcv.nl
- **Slug (permanent once published):** werkcv-cv-check
- **Categories (1 to 5, choose from the portal's list):** career, documents, productivity (names to be matched to the portal)
- **Icon:** needs an owner-provided file (portal specs not checked); `public/logo.png` exists on the site.
- **Authentication step:** no authentication. **Data handling step:** our own first-party API; no sponsored content; CVs can contain personal data, which the privacy page describes.

### 14.6 Reviewer instructions (for "Test & launch")

No account or credentials are needed. In Claude, add `https://werkcv.nl/api/mcp` as a custom connector with no sign-in. Use a fictional CV and vacancy, for example the text on the documentation page, and run: (1) "Can you check my CV? [paste CV]" which calls the check tool; (2) "Compare my CV with this vacancy: [paste both]" which calls the comparison tool; (3) "Can I edit this CV and download it as a PDF?" which calls the editor tool and returns a link that opens the CV in the editor once. The comparison tool is limited to 8 calls per hour per user.

### 14.7 After listing

Watch the weekly report (section 7) for `client = claude`, the link open rate and orders with first touch `utm_source=mcp`; apply the stop rules in section 8. Keep the documentation, privacy text and tool behaviour in step: reviewers re-check ("initial and ongoing reviews").
