import "./test-env";
import assert from "node:assert/strict";
import test from "node:test";
import { classifyMcpClient } from "./context";
import { alertAiCapReached, resetAlertForTests } from "./alerts";
import { CHECKED_CV_KIND, CHECKED_CV_TTL_MS, createCheckedCvHandoff, HandoffCapacityError, maxLiveHandoffs, peekCheckedCvHandoff, takeCheckedCvHandoff } from "./handoff";
import { aiDailyCap, resetAiBudgetForTests, takeAiBudget, takeToolSlot } from "./limits";
import { formatCheck, formatMatch, MCP_INSTRUCTIONS } from "./server";
import { checkCv, editorLink, matchVacancy, openInEditor, type CheckCvData, type MatchVacancyData } from "./tools";

// All CV text below is fictional.
const CV = [
  "Sanne de Vries",
  "Utrecht | sanne.voorbeeld@example.com | 06-12345678",
  "Profiel",
  "Klantgerichte medewerker klantenservice met vijf jaar ervaring in telefonisch en schriftelijk contact. Ik los klachten snel op en registreer elk contact in Salesforce.",
  "Werkervaring",
  "Medewerker klantenservice, Voorbeeld Energie BV (2021 - heden)",
  "• Beantwoordde gemiddeld 60 klantvragen per dag",
  "• Verlaagde de afhandeltijd met 15%",
  "• Coördineerde de overdracht van complexe klachten naar het back-office en bewaakte de afhandeling tot het gesprek was afgerond",
  "• Trainde twee nieuwe collega's in het gebruik van het klantsysteem en de standaard antwoorden voor veelgestelde vragen",
  "Kassamedewerker, Voorbeeld Supermarkt (2019 - 2021)",
  "• Verwerkte 150 transacties per dienst en helpt klanten bij vragen",
  "• Begeleidde twee nieuwe collega's tijdens hun eerste weken en verbeterde de kassaplanning van het weekend",
  "• Ondersteunde de winkelmanager bij de voorraadtelling en rapporteerde afwijkingen aan het hoofdkantoor",
  "• Adviseerde klanten over acties en lanceerde samen met het team een nieuwe afhaalservice in de winkel",
  "Opleiding",
  "MBO 4 Commercieel medewerker, ROC Midden Nederland (2017 - 2021)",
  "Vaardigheden",
  "Excel, Salesforce, klantcontact",
  "Talen",
  "Nederlands (moedertaal), Engels (B2)",
].join("\n");

type Row = { id: string; tokenHash: string; kind: string; locale: string; payload: unknown; expiresAt: Date };

/** The three ToolCvHandoff calls the handoff code uses, over an array. */
function fakeDb() {
  const rows: Row[] = [];
  let next = 1;
  const db = {
    toolCvHandoff: {
      deleteMany: async ({ where }: { where: { id?: string; tokenHash?: string; kind?: string; expiresAt?: { lte: Date } } }) => {
        const before = rows.length;
        for (let i = rows.length - 1; i >= 0; i -= 1) {
          const row = rows[i];
          const match =
            (where.id === undefined || row.id === where.id) &&
            (where.tokenHash === undefined || row.tokenHash === where.tokenHash) &&
            (where.kind === undefined || row.kind === where.kind) &&
            (where.expiresAt === undefined || row.expiresAt <= where.expiresAt.lte);
          if (match) rows.splice(i, 1);
        }
        return { count: before - rows.length };
      },
      create: async ({ data }: { data: Omit<Row, "id"> }) => {
        const row = { id: String(next++), ...data };
        rows.push(row);
        return row;
      },
      findFirst: async ({ where }: { where: { tokenHash: string; kind: string } }) =>
        rows.find((row) => row.tokenHash === where.tokenHash && row.kind === where.kind) ?? null,
      count: async ({ where }: { where: { kind: string } }) => rows.filter((row) => row.kind === where.kind).length,
    },
  };
  return { db: db as unknown as Parameters<typeof createCheckedCvHandoff>[0], rows };
}

test("client names are read from the User-Agent, unknown otherwise", () => {
  assert.equal(classifyMcpClient("Claude-User/1.0"), "claude");
  assert.equal(classifyMcpClient("ChatGPT-User"), "chatgpt");
  assert.equal(classifyMcpClient("Cursor/2.0"), "cursor");
  assert.equal(classifyMcpClient("curl/8"), "unknown");
  assert.equal(classifyMcpClient(null), "unknown");
});

test("per-IP limits: check_cv 30/hour, match_vacancy 8/hour, open_in_editor 5/hour", () => {
  const ip = "198.51.100.1";
  for (let i = 0; i < 30; i += 1) assert.equal(takeToolSlot("check_cv", ip), true);
  assert.equal(takeToolSlot("check_cv", ip), false);
  assert.equal(takeToolSlot("check_cv", "198.51.100.2"), true, "another IP has its own allowance");
  for (let i = 0; i < 8; i += 1) assert.equal(takeToolSlot("match_vacancy", ip), true);
  assert.equal(takeToolSlot("match_vacancy", ip), false);
  for (let i = 0; i < 5; i += 1) assert.equal(takeToolSlot("open_in_editor", ip), true);
  assert.equal(takeToolSlot("open_in_editor", ip), false);
});

test("daily AI budget stops at the cap and starts over the next UTC day", () => {
  resetAiBudgetForTests();
  const monday = new Date("2026-10-05T10:00:00Z");
  assert.equal(takeAiBudget(monday, 2), true);
  assert.equal(takeAiBudget(monday, 2), true);
  assert.equal(takeAiBudget(monday, 2), false);
  assert.equal(takeAiBudget(new Date("2026-10-06T00:00:01Z"), 2), true);
  assert.equal(aiDailyCap({ MCP_AI_DAILY_CAP: "50" }), 50);
  assert.equal(aiDailyCap({ MCP_AI_DAILY_CAP: "0" }), 0);
  assert.equal(aiDailyCap({ MCP_AI_DAILY_CAP: "abc" }), 300);
  assert.equal(aiDailyCap({}), 300);
});

test("check_cv grades pasted text without calling the AI", async () => {
  const openai = (await import("../openai-client")).default;
  const original = openai.chat.completions.create;
  let aiCalls = 0;
  openai.chat.completions.create = (async () => {
    aiCalls += 1;
    throw new Error("no AI in this test");
  }) as unknown as typeof original;
  try {
    const result = await checkCv({ cvText: CV });
    assert.equal(result.ok, true);
    assert.equal(aiCalls, 0);
    if (!result.ok) return;
    assert.equal(result.locale, "nl");
    assert.ok(result.data.grade >= 1 && result.data.grade <= 10);
    assert.ok(result.data.categories.length >= 3);
    assert.ok(result.data.sectionsFound.includes("experience") && result.data.sectionsFound.includes("education"));
    assert.equal(result.data.canOpenInEditor, result.data.grade < 8);
    assert.ok(result.data.topFixes.length <= 3);
  } finally {
    openai.chat.completions.create = original;
  }
});

test("check_cv answers in the language of the request and refuses a too-short text", async () => {
  const english = await checkCv({ cvText: CV, locale: "en" });
  assert.equal(english.ok && english.locale, "en");
  const short = await checkCv({ cvText: "Sanne de Vries, klantenservice, Utrecht.", locale: "en" });
  assert.equal(short.ok, false);
  if (!short.ok) {
    assert.equal(short.code, "TEXT_TOO_SHORT");
    assert.match(short.message, /too short/i);
  }
});

test("match_vacancy maps the result, and reports the daily cap and AI errors plainly", async () => {
  const fakeResult = {
    score: 72,
    scoreBand: "good",
    scoreLabel: "Goede match",
    summary: "Je cv past bij de kern van de functie.",
    perceivedRole: "Klantenservice",
    perceivedSeniority: "mid",
    dimensions: [],
    strengths: [],
    requirements: [
      { requirement: "Ervaring met Salesforce", vacancyEvidence: "Salesforce is een pre", importance: "preferred", status: "strong", cvEvidence: "registreer elk contact in Salesforce", honestAction: "" },
      { requirement: "Rijbewijs B", vacancyEvidence: "Rijbewijs B vereist", importance: "essential", status: "missing", cvEvidence: "", honestAction: "Vermeld je rijbewijs als je dat hebt." },
    ],
    missingKeywords: ["rijbewijs"],
    topFixes: [{ category: "completeness", title: "Rijbewijs", evidence: "Niet op je cv", action: "Voeg je rijbewijs toe." }],
    limitations: [],
  };
  const vacancy = "x".repeat(150);

  const ok = await matchVacancy({ cvText: CV, vacancyText: vacancy }, { runMatch: (async () => fakeResult) as never, takeBudget: () => true });
  assert.equal(ok.ok, true);
  if (ok.ok) {
    assert.equal(ok.data.score, 72);
    assert.equal(ok.data.requirements.length, 2);
    assert.equal(ok.data.canOpenInEditor, true, "a missing requirement offers the editor");
    assert.equal("dimensions" in ok.data, false, "only the needed fields are passed on");
  }

  let called = false;
  const capped = await matchVacancy({ cvText: CV, vacancyText: vacancy, locale: "en" }, { runMatch: (async () => { called = true; return fakeResult; }) as never, takeBudget: () => false });
  assert.equal(called, false, "no AI call once the daily budget is used");
  assert.equal(capped.ok === false && capped.code, "RATE_LIMITED");

  const broken = await matchVacancy({ cvText: CV, vacancyText: vacancy }, { runMatch: (async () => { throw new Error("quota"); }) as never, takeBudget: () => true });
  assert.equal(broken.ok === false && broken.code, "AI_UNAVAILABLE");
  assert.ok(broken.ok === false && !/quota/i.test(broken.message), "the cause is not shown");
});

test("the editor link carries a token and tracking, never the CV text", async () => {
  assert.equal(editorLink("t".repeat(43), "nl", "claude").startsWith("https://werkcv.nl/cv-check/verbeteren?handoff="), true);
  assert.equal(editorLink("t".repeat(43), "en", "chatgpt").startsWith("https://werkcv.nl/en/cv-check/improve?handoff="), true);
  const url = new URL(editorLink("t".repeat(43), "nl", "claude"));
  assert.equal(url.searchParams.get("utm_source"), "mcp");
  assert.equal(url.searchParams.get("utm_medium"), "claude");
  assert.equal(url.searchParams.get("utm_campaign"), "cv-check");

  let stored: { cvText: string; vacancyText: string | null; locale: string } | null = null;
  const opened = await openInEditor({ cvText: CV, vacancyText: "vacature".repeat(30) }, "claude", {
    createHandoff: async (handoff) => {
      stored = handoff;
      return { token: "a".repeat(43) };
    },
  });
  assert.equal(opened.ok, true);
  if (opened.ok) {
    assert.equal(opened.data.expiresInMinutes, 60);
    assert.ok(!opened.data.url.includes("Sanne"), "no CV text in the URL");
    assert.ok(!opened.data.url.includes("example.com"), "no contact details in the URL");
  }
  assert.equal(stored!.cvText, CV);
  assert.equal(stored!.locale, "nl");

  const failed = await openInEditor({ cvText: CV }, "claude", { createHandoff: async () => { throw new Error("db down"); } });
  assert.equal(failed.ok === false && failed.code, "FAILED");
});

test("a handoff works once, expires after an hour and rejects other tokens", async () => {
  const { db, rows } = fakeDb();
  const now = new Date("2026-10-05T10:00:00Z");
  const { token } = await createCheckedCvHandoff(db, { cvText: CV, vacancyText: "vacature", locale: "nl" }, now);
  assert.equal(rows.length, 1);
  assert.notEqual(rows[0].tokenHash, token, "only a hash of the token is stored");
  assert.equal(rows[0].kind, CHECKED_CV_KIND);
  assert.equal(rows[0].expiresAt.getTime() - now.getTime(), CHECKED_CV_TTL_MS);

  assert.equal(await takeCheckedCvHandoff(db, "b".repeat(43), now), null, "unknown token");
  assert.equal(await takeCheckedCvHandoff(db, "short", now), null, "malformed token");
  const taken = await takeCheckedCvHandoff(db, token, new Date(now.getTime() + 60_000));
  assert.deepEqual(taken, { cvText: CV, vacancyText: "vacature", locale: "nl" });
  assert.equal(rows.length, 0, "deleted by the first use");
  assert.equal(await takeCheckedCvHandoff(db, token, now), null, "second use");

  const late = await createCheckedCvHandoff(db, { cvText: CV, vacancyText: null, locale: "en" }, now);
  assert.equal(await takeCheckedCvHandoff(db, late.token, new Date(now.getTime() + CHECKED_CV_TTL_MS)), null, "expired");
  assert.equal(rows.length, 0, "an expired handoff is removed when someone tries it");
});

test("creating a handoff removes expired ones, and other kinds are left alone", async () => {
  const { db, rows } = fakeDb();
  const now = new Date("2026-10-05T10:00:00Z");
  await createCheckedCvHandoff(db, { cvText: CV, vacancyText: null, locale: "nl" }, new Date(now.getTime() - 2 * CHECKED_CV_TTL_MS));
  rows.push({ id: "other", tokenHash: "h", kind: "profile", locale: "nl", payload: {}, expiresAt: new Date(now.getTime() - 1000) });
  await createCheckedCvHandoff(db, { cvText: CV, vacancyText: null, locale: "nl" }, now);
  assert.equal(rows.filter((row) => row.kind === CHECKED_CV_KIND).length, 1);
  assert.equal(rows.filter((row) => row.kind === "profile").length, 1);
});


test("at most N unexpired handoffs exist at once; expired ones do not count", async () => {
  const { db, rows } = fakeDb();
  const now = new Date("2026-10-05T10:00:00Z");
  await createCheckedCvHandoff(db, { cvText: CV, vacancyText: null, locale: "nl" }, now, 2);
  await createCheckedCvHandoff(db, { cvText: CV, vacancyText: null, locale: "nl" }, now, 2);
  await assert.rejects(() => createCheckedCvHandoff(db, { cvText: CV, vacancyText: null, locale: "nl" }, now, 2), HandoffCapacityError);
  assert.equal(rows.length, 2, "the refused handoff stored nothing");
  // An hour later the first two have expired, so there is room again.
  await createCheckedCvHandoff(db, { cvText: CV, vacancyText: null, locale: "nl" }, new Date(now.getTime() + CHECKED_CV_TTL_MS), 2);
  assert.equal(rows.length, 1);
  assert.equal(maxLiveHandoffs({ MCP_MAX_LIVE_HANDOFFS: "50" }), 50);
  assert.equal(maxLiveHandoffs({ MCP_MAX_LIVE_HANDOFFS: "x" }), 200);
  assert.equal(maxLiveHandoffs({}), 200);
});

test("peeking at a handoff changes nothing, and only a real unexpired token passes", async () => {
  const { db, rows } = fakeDb();
  const now = new Date("2026-10-05T10:00:00Z");
  const { token } = await createCheckedCvHandoff(db, { cvText: CV, vacancyText: null, locale: "nl" }, now);
  assert.equal(await peekCheckedCvHandoff(db, token, now), true);
  assert.equal(await peekCheckedCvHandoff(db, token, now), true, "peeking twice still works");
  assert.equal(rows.length, 1, "nothing was deleted");
  assert.equal(await peekCheckedCvHandoff(db, "c".repeat(43), now), false, "unknown token");
  assert.equal(await peekCheckedCvHandoff(db, "short", now), false, "malformed token");
  assert.equal(await peekCheckedCvHandoff(db, token, new Date(now.getTime() + CHECKED_CV_TTL_MS)), false, "expired");
  assert.deepEqual(await takeCheckedCvHandoff(db, token, now), { cvText: CV, vacancyText: null, locale: "nl" });
});

test("open_in_editor answers 'limit reached' when every link slot is in use", async () => {
  const full = await openInEditor({ cvText: CV, locale: "en" }, "claude", { createHandoff: async () => { throw new HandoffCapacityError(); } });
  assert.equal(full.ok === false && full.code, "RATE_LIMITED");
  assert.ok(full.ok === false && /limit/i.test(full.message));
});

test("the daily AI cap alerts once per UTC day, with counts only", () => {
  resetAlertForTests();
  const reports: Array<{ stage: string; context?: Record<string, unknown>; error: unknown }> = [];
  const report = (async (input: { stage: string; context?: Record<string, unknown>; error: unknown }) => { reports.push(input); return { supportNotified: true, userNotified: false }; }) as never;
  const monday = new Date("2026-10-05T10:00:00Z");
  assert.equal(alertAiCapReached("match_vacancy", monday, report, 300), true);
  assert.equal(alertAiCapReached("handoff_exchange", monday, report, 300), false, "same day: no second alert");
  assert.equal(alertAiCapReached("match_vacancy", new Date("2026-10-06T00:00:01Z"), report, 300), true, "next day alerts again");
  assert.equal(reports.length, 2);
  assert.equal(reports[0].stage, "daily_cap_reached");
  assert.deepEqual(reports[0].context, { tool: "mcp", cap: 300, source: "match_vacancy" });
  assert.match(String((reports[0].error as Error).message), /daily AI cap reached/);
});


// What the real Claude session showed: the model only offered the editor when asked, did not know which
// requirements were optional, and the user was never told the PDF is paid.
const matchData: MatchVacancyData = {
  score: 79,
  scoreLabel: "Goede match",
  summary: "Past bij de functie.",
  requirements: [
    { requirement: "minimaal mbo 4 niveau", importance: "essential", status: "strong", cvEvidence: "MBO 4", vacancyEvidence: "mbo 4", honestAction: "" },
    { requirement: "rijbewijs B is een pre", importance: "preferred", status: "missing", cvEvidence: "", vacancyEvidence: "rijbewijs B", honestAction: "Vermeld je rijbewijs als je dat hebt." },
  ],
  topFixes: [{ title: "Vermeld je rijbewijs B", action: "Zet het bij je persoonsgegevens.", evidence: "" }],
  missingKeywords: [],
  canOpenInEditor: true,
};
const checkData: CheckCvData = {
  grade: 6.8, band: "voldoende", categories: [{ label: "Inhoud", score: 60 }], topFixes: [], criticalIssues: 0,
  sectionsFound: ["profile"], canOpenInEditor: true, limitations: "Alleen tekst.",
};

test("the vacancy match text says which requirements are essential and which are preferred", () => {
  const text = formatMatch(matchData, "nl");
  assert.match(text, /\[aangetoond, essentieel\] minimaal mbo 4 niveau/);
  assert.match(text, /\[ontbreekt, pre\] rijbewijs B is een pre/);
  assert.match(formatMatch(matchData, "en"), /\[missing, nice to have\]/);
});

test("results that can be opened in the editor state what is free and what costs money", () => {
  for (const text of [formatCheck(checkData, "nl"), formatMatch(matchData, "nl")]) {
    assert.match(text, /Bewerken is gratis/);
    assert.match(text, /eenmalig €7,95/);
    assert.match(text, /zonder abonnement/);
  }
  assert.match(formatCheck(checkData, "en"), /costs €7\.95 once/);
  assert.doesNotMatch(formatCheck({ ...checkData, canOpenInEditor: false, grade: 9 }, "nl"), /WerkCV-editor/, "no offer when there is nothing to fix");
  assert.doesNotMatch(formatMatch({ ...matchData, canOpenInEditor: false }, "nl"), /WerkCV-editor/);
});

test("the server instructions only describe the tools and when to call them (directory policy: no promotion)", () => {
  // Anthropic's directory policy rejects tool text that promotes products or steers the model beyond the tool's function.
  assert.match(MCP_INSTRUCTIONS, /open_in_editor opens the CV in the WerkCV editor/);
  assert.match(MCP_INSTRUCTIONS, /Call it when the user asks to edit/);
  for (const steering of [/you may offer/i, /say plainly/i, /paid step/i, /one option/i, /recommend/i, /promot/i, /always (mention|offer)/i]) {
    assert.doesNotMatch(MCP_INSTRUCTIONS, steering, String(steering));
  }
});

test("tool results state the price as a fact and carry no instruction to the model", () => {
  for (const text of [formatCheck(checkData, "nl"), formatMatch(matchData, "nl"), formatCheck(checkData, "en"), formatMatch(matchData, "en")]) {
    assert.doesNotMatch(text, /\b(you should|you must|always|tell the user|mention (this|that)|offer (this|it))\b/i);
    assert.doesNotMatch(text, /\b(moet je|vertel de gebruiker|noem altijd|bied (dit|het) aan)\b/i);
  }
});
