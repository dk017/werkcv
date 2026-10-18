import "../test-env";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { registerWerkcvTools, successContent } from "../server";
import { checkCv, matchVacancy, openInEditor } from "../tools";
import {
  CheckCvOutput,
  MatchVacancyOutput,
  OpenInEditorOutput,
  Requirement,
  TOOL_DESCRIPTIONS,
  computeCheckScore,
  nextStepAfterCheck,
  utmMediumFromClient,
} from "./contract";
import { findCliches, readCvStructure, weakOpenerOf } from "./cv-structure";
import { isShortKeyword, reconcileRequirements, vacancyTitleOf } from "./match";
import { jobDurationLines, rangeMonths, requiredYears } from "./durations";
import { handoffLandingStep, resolveUtmMedium } from "./open";
import { redactGovernmentIds } from "./redact";

// Fictional test CV and vacancy, reconstructed from every quote in fixtures/examples.json.
const FIXTURES = join(__dirname, "fixtures");
const CV = readFileSync(join(FIXTURES, "sanne-cv.txt"), "utf8");
const VACANCY = readFileSync(join(FIXTURES, "fietsenplein-vacancy.txt"), "utf8");
const EXAMPLES = JSON.parse(readFileSync(join(FIXTURES, "examples.json"), "utf8"));
const EXAMPLE_REQUIREMENTS = Requirement.array().parse(EXAMPLES.match_vacancy.requirements);

test("check_cv on the Sanne CV: score 69, in ontwikkeling, editor offered, valid v2", async () => {
  const result = await checkCv({ cvText: CV, locale: "nl" });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const data = result.data;
  CheckCvOutput.parse(data);
  assert.equal(data.score, 69);
  assert.equal(data.grade10, 6.9);
  assert.equal(data.band, "in_ontwikkeling");
  assert.equal(data.bandLabel, "In ontwikkeling");
  assert.equal(data.canOpenInEditor, true);
  assert.deepEqual(data.nextStep, nextStepAfterCheck("nl", 69));
  assert.deepEqual(data.meta, { tool: "check_cv", schemaVersion: "2.0.0", scoringVersion: "2026-10", locale: "nl" });
  assert.deepEqual(data.categories.map((c) => [c.id, c.weight]), [["content", 0.5], ["ats", 0.2], ["basics", 0.15], ["dutch_conventions", 0.15]]);
});

test("check_cv on the Sanne CV: every fix quote is copied verbatim from the CV and names its place", async () => {
  const result = await checkCv({ cvText: CV, locale: "nl" });
  assert.ok(result.ok);
  if (!result.ok) return;
  assert.ok(result.data.topFixes.length > 0);
  for (const fix of result.data.topFixes) {
    if (fix.quote !== null) assert.ok(CV.includes(fix.quote), `quote not in CV: ${fix.quote}`);
    if (fix.example) assert.doesNotMatch(fix.example, /\d{2,}/, "examples use [X], not invented numbers");
  }
  const byId = Object.fromEntries(result.data.topFixes.map((fix) => [fix.id, fix]));
  assert.equal(byId.quantified_achievement?.section, "experience");
  assert.match(byId.quantified_achievement?.where ?? "", /^Werkervaring > .+, bullet \d+$/);
  assert.equal(byId.active_verbs?.quote, "Verantwoordelijk voor social media kanalen");
  assert.equal(byId.active_verbs?.where, "Werkervaring > Marketing Coördinator, bullet 1");
  assert.equal(byId.profile_length_and_cliches?.section, "profile");
});

test("check_cv stats: words, bullets, numbers, weak openers and clichés as written", async () => {
  const result = await checkCv({ cvText: CV, locale: "nl" });
  assert.ok(result.ok);
  if (!result.ok) return;
  const { stats } = result.data;
  assert.equal(stats.profileWordCount, 28);
  assert.equal(stats.experienceBulletCount, 8);
  assert.equal(stats.quantifiedBulletCount, 0);
  assert.deepEqual(stats.weakBulletOpeners, ["Verantwoordelijk voor", "Meewerken aan", "Ondersteuning bij"]);
  assert.deepEqual(stats.clichesFound, ["Enthousiaste en leergierige", "echte teamplayer", "nieuwe uitdaging"]);
  assert.ok(stats.wordCount > 100);
});

test("the Hobby's section is found with a curly and with a straight apostrophe", async () => {
  assert.ok(CV.includes("Hobby’s"), "the fixture uses the curly apostrophe");
  const result = await checkCv({ cvText: CV, locale: "nl" });
  assert.ok(result.ok && result.data.sectionsFound.includes("hobbies"));
  assert.deepEqual(result.ok && result.data.sectionsFound, ["contact", "profile", "experience", "education", "skills", "languages", "hobbies"]);
  for (const heading of ["Hobby's", "Hobby’s", "HOBBY'S:", "Hobbies", "Interesses"]) {
    assert.ok(readCvStructure(`Profiel\nTekst\n${heading}\nKoken`).sectionsFound.includes("hobbies"), heading);
  }
});

test("the content cap: no number in any bullet keeps the score at 69 or below", () => {
  const perfect = { content: 100, ats: 100, basics: 100, dutch_conventions: 100 };
  assert.equal(computeCheckScore(perfect, { quantifiedBulletCount: 0, experienceBulletCount: 8 }), 69);
  assert.equal(computeCheckScore(perfect, { quantifiedBulletCount: 1, experienceBulletCount: 8 }), 100);
  assert.equal(computeCheckScore(perfect, { quantifiedBulletCount: 0, experienceBulletCount: 0 }), 100, "no bullets, no cap");
});

test("match_vacancy with the example's requirements: score 49, counts, short missing keywords, valid v2", async () => {
  let aiCalls = 0;
  const result = await matchVacancy(
    { cvText: CV, vacancyText: VACANCY, locale: "nl" },
    { extractRequirements: async () => { aiCalls += 1; return EXAMPLE_REQUIREMENTS; }, takeBudget: () => true },
  );
  assert.equal(aiCalls, 1);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const data = result.data;
  MatchVacancyOutput.parse(data);
  assert.equal(data.score, 49);
  assert.equal(data.grade10, 4.9);
  assert.equal(data.band, "zwak");
  assert.deepEqual(data.counts, { mustMatched: 3, mustPartial: 5, mustMissing: 4, niceMatched: 2 });
  for (const keyword of ["Meta Ads", "GA4", "Looker Studio"]) assert.ok(data.missingKeywords.includes(keyword), keyword);
  for (const keyword of [...data.missingKeywords, ...data.matchedKeywords]) assert.ok(isShortKeyword(keyword), `not a short keyword: ${keyword}`);
  assert.equal(data.missingKeywords[0], "Meta Ads", "missing must-haves come first");
  assert.ok(!data.missingKeywords.includes("Google Ads"), "a keyword that is in the CV is not 'missing'");
  assert.equal(data.vacancyTitle, "Performance Marketeer – Fietsenplein");
  assert.equal(data.canOpenInEditor, true);
  assert.equal(data.nextStep.action, "open_in_editor");
  for (const fix of data.topFixes) if (fix.quote) assert.ok(CV.includes(fix.quote), fix.quote);
});

test("job durations are computed in code (nl/en months, heden/present, year-only ranges)", () => {
  const today = new Date("2026-10-18T12:00:00Z");
  assert.equal(rangeMonths("(June 2021 – present)", today), 65);
  assert.equal(rangeMonths("(maart 2022 – heden)", today), 56);
  assert.equal(rangeMonths("(september 2020 – februari 2022)", today), 18);
  assert.equal(rangeMonths("jan. 2020 t/m dec. 2020", today), 12);
  assert.equal(rangeMonths("(2017 - 2021)", today), 48);
  assert.equal(rangeMonths("01/2019 - 03/2020", today), 15);
  assert.equal(rangeMonths("Postcode 1234 AB, 2010", today), null);
  assert.equal(requiredYears("At least 3 years of experience leading a warehouse team"), 3);
  assert.equal(requiredYears("Minimaal drie jaar ervaring"), 3);
  assert.equal(requiredYears("5+ yrs SQL"), 5);
  assert.equal(requiredYears("Een jaarcontract met uitzicht op vast"), null);
  assert.deepEqual(jobDurationLines(CV, today, "nl"), [
    "Marketing Coördinator – Fietsplaats B.V., Utrecht (maart 2022 – heden): 4 jaar en 8 maanden",
    "Junior Online Marketeer – Webwinkel Groen, Amersfoort (september 2020 – februari 2022): 1 jaar en 6 maanden",
  ]);
});

test("a years-of-experience requirement is a match when the quoted job is long enough (the model miscounts dates)", () => {
  const today = new Date("2026-10-18T12:00:00Z");
  const cv = "Daniel Okafor\n\nWork experience\nWarehouse Team Lead – PortLink Logistics, Rotterdam (June 2021 – present)\n- Responsible for the night shift team\n- Helped with inventory counts\n\nLogistics Assistant – Lagos Freight Ltd (2017 – 2021)\n- Handled shipping documents\n";
  const base = {
    id: "r1", requirement: "At least 3 years of experience leading a warehouse team", type: "must" as const, category: "experience" as const,
    vacancyQuote: "At least 3 years of experience leading a warehouse team", keywords: ["team leadership"],
    status: "partial" as const, gap: "Only 2 years shown.", honestAction: "If this is true, add the years.",
  };
  const viaBullet = reconcileRequirements([{ ...base, cvQuote: "Responsible for the night shift team" }], cv, today)[0];
  assert.equal(viaBullet.status, "match");
  assert.equal(viaBullet.gap, null);
  assert.equal(viaBullet.honestAction, null);
  const tooShort = reconcileRequirements([{ ...base, requirement: "At least 6 years leading a warehouse team", cvQuote: "Responsible for the night shift team" }], cv, today)[0];
  assert.equal(tooShort.status, "partial", "65 months is not 6 years; the model's judgement stays");
  assert.equal(tooShort.gap, "Gevraagd: 6 jaar. De functie bij dit citaat duurt 5 jaar en 5 maanden.", "the gap states the computed length, not the model's count");
  const noQuote = reconcileRequirements([{ ...base, cvQuote: null }], cv, today)[0];
  assert.equal(noQuote.status, "partial");
});

test("match_vacancy enforces the quote rules in code", () => {
  const [base] = EXAMPLE_REQUIREMENTS.filter((r) => r.status === "match");
  const invented = reconcileRequirements([{ ...base, cvQuote: "Leidde een team van 12 marketeers" }], CV)[0];
  assert.equal(invented.status, "partial", "no real quote, no match");
  assert.equal(invented.cvQuote, null);
  const real = reconcileRequirements([base], CV)[0];
  assert.equal(real.status, "match");
  assert.equal(isShortKeyword("Ervaring met GA4 en Looker Studio in een e-commerce omgeving"), false);
  assert.equal(isShortKeyword("Looker Studio"), true);
  assert.equal(vacancyTitleOf("Wij zoeken iemand die graag met data werkt en verder kijkt dan de campagne."), null);
});

test("open_in_editor returns the v2 fields and a valid answer", async () => {
  const deps = { createHandoff: async () => ({ token: "a".repeat(43) }) };
  const withVacancy = await openInEditor({ cvText: CV, vacancyText: VACANCY, locale: "nl" }, "cursor", deps);
  const cvOnly = await openInEditor({ cvText: CV, locale: "en" }, "claude", deps);
  assert.ok(withVacancy.ok && cvOnly.ok);
  if (!withVacancy.ok || !cvOnly.ok) return;
  OpenInEditorOutput.parse(withVacancy.data);
  OpenInEditorOutput.parse(cvOnly.data);
  assert.equal(withVacancy.data.singleUse, true);
  assert.equal(withVacancy.data.expiresInMinutes, 60);
  assert.equal(withVacancy.data.includesVacancy, true);
  assert.equal(withVacancy.data.opensWith, "match");
  assert.equal(cvOnly.data.includesVacancy, false);
  assert.equal(cvOnly.data.opensWith, "check");
  assert.match(withVacancy.data.userMessage, /één keer/);
  assert.equal(new URL(withVacancy.data.url).searchParams.get("utm_medium"), "cursor");
  assert.ok(!withVacancy.data.url.includes("Sanne"), "no CV text in the URL");
});

test("open_in_editor states the price for Claude but not for ChatGPT (OpenAI app directory rule)", async () => {
  const deps = { createHandoff: async () => ({ token: "b".repeat(43) }) };
  const claude = await openInEditor({ cvText: CV, locale: "nl" }, "claude", deps);
  const chatgpt = await openInEditor({ cvText: CV, locale: "nl" }, "chatgpt", deps);
  const chatgptEn = await openInEditor({ cvText: CV, locale: "en" }, "chatgpt", deps);
  assert.ok(claude.ok && chatgpt.ok && chatgptEn.ok);
  if (!claude.ok || !chatgpt.ok || !chatgptEn.ok) return;
  assert.match(claude.data.userMessage, /eenmalig/);
  for (const answer of [chatgpt.data, chatgptEn.data]) {
    OpenInEditorOutput.parse(answer);
    assert.doesNotMatch(answer.userMessage, /€|eenmalig|abonnement|subscription|PDF|pdf|pay|kost/);
  }
});

test("BSN, passport/ID and IBAN numbers are removed; ordinary text and phone numbers stay", () => {
  assert.equal(redactGovernmentIds("BSN: 123456789\nRijbewijs B", "nl"), "BSN: [verwijderd]\nRijbewijs B");
  assert.equal(redactGovernmentIds("Burgerservicenummer 123 456 789 – Utrecht", "nl"), "Burgerservicenummer [verwijderd] – Utrecht");
  assert.equal(redactGovernmentIds("Passport no. AB1234567", "en"), "Passport no. [removed]");
  assert.equal(redactGovernmentIds("IBAN NL91 ABNA 0417 1643 00", "nl"), "IBAN [verwijderd]");
  for (const kept of ["Paspoort aanwezig", "Telefoon 06 12345678", "Werkte aan het BSN-register van 2019 tot 2021"]) {
    assert.equal(redactGovernmentIds(kept, "nl"), kept);
  }
});

test("the editor link and the vacancy comparison never receive the BSN; check_cv still sees it", async () => {
  const withBsn = CV.replace(/\n/, "\nBSN: 123456789\n");
  let stored = "";
  await openInEditor({ cvText: withBsn, locale: "nl" }, "claude", { createHandoff: async (h) => { stored = h.cvText; return { token: "c".repeat(43) }; } });
  assert.ok(stored.includes("BSN: [verwijderd]") && !stored.includes("123456789"));
  let sentToAi = "";
  await matchVacancy(
    { cvText: withBsn, vacancyText: VACANCY, locale: "nl" },
    { extractRequirements: async (cv) => { sentToAi = cv; return EXAMPLE_REQUIREMENTS; }, takeBudget: () => true },
  );
  assert.ok(sentToAi.length > 0 && !sentToAi.includes("123456789"));
});

test("ChatGPT editor links open on the profile step; other clients keep Afronden", () => {
  assert.equal(handoffLandingStep("chatgpt"), "profiel");
  assert.equal(handoffLandingStep("claude"), "afronden");
  assert.equal(handoffLandingStep(undefined), "afronden");
});

test("utm_medium comes from the client's name, with the User-Agent label as fallback", () => {
  assert.equal(resolveUtmMedium({ name: "Cursor" }, "unknown"), "cursor");
  assert.equal(resolveUtmMedium({ name: "claude-ai" }, "unknown"), "claude");
  assert.equal(resolveUtmMedium({ name: "ChatGPT Connector" }, "claude"), "chatgpt");
  assert.equal(resolveUtmMedium(undefined, "claude"), "claude", "stateless request without client info");
  assert.equal(utmMediumFromClient({ name: "Some Client 2.0" }), "some-client-2-0");
});

test("tools are registered with the v2 output schemas and descriptions; input schemas are unchanged", () => {
  const registered = new Map<string, { description: string; outputSchema: unknown; inputSchema: { shape: Record<string, unknown> } }>();
  const fakeServer = {
    registerTool: (name: string, config: { description: string; outputSchema: unknown; inputSchema: { shape: Record<string, unknown> } }) => registered.set(name, config),
    server: { getClientVersion: () => undefined },
  };
  registerWerkcvTools(fakeServer as never);
  assert.deepEqual([...registered.keys()], ["check_cv", "match_vacancy", "open_in_editor"]);
  assert.equal(registered.get("check_cv")!.outputSchema, CheckCvOutput);
  assert.equal(registered.get("match_vacancy")!.outputSchema, MatchVacancyOutput);
  assert.equal(registered.get("open_in_editor")!.outputSchema, OpenInEditorOutput);
  for (const name of ["check_cv", "match_vacancy", "open_in_editor"] as const) assert.equal(registered.get(name)!.description, TOOL_DESCRIPTIONS[name]);
  assert.deepEqual(Object.keys(registered.get("check_cv")!.inputSchema.shape), ["cv_text", "locale"]);
  assert.deepEqual(Object.keys(registered.get("match_vacancy")!.inputSchema.shape), ["cv_text", "vacancy_text", "locale"]);
  assert.deepEqual(Object.keys(registered.get("open_in_editor")!.inputSchema.shape), ["cv_text", "vacancy_text", "locale"]);
});

test("a v2 answer is structuredContent plus the same object as JSON text, and a drifting shape fails", async () => {
  const result = await checkCv({ cvText: CV, locale: "nl" });
  assert.ok(result.ok);
  if (!result.ok) return;
  const content = successContent(result.data, CheckCvOutput);
  assert.deepEqual(content.structuredContent, result.data);
  assert.deepEqual(JSON.parse(content.content[0].text), result.data);
  assert.throws(() => successContent({ ...result.data, score: 140 }, CheckCvOutput), "outside production a wrong shape throws");
});

test("helpers: weak openers and clichés are returned as written", () => {
  assert.equal(weakOpenerOf("Verantwoordelijk voor de webshop"), "Verantwoordelijk voor");
  assert.equal(weakOpenerOf("Beheerde de webshop"), null);
  assert.deepEqual(findCliches("Gedreven Team player op zoek naar een Nieuwe Uitdaging"), ["Gedreven", "Team player", "Nieuwe Uitdaging"]);
});
