import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  buildCitedAuthorityEditorHref,
  citedAuthorityRouteConfigs,
  citedAuthoritySourceIds,
  getCitedAuthorityRouteConfig,
} from "@/lib/cited-authority-conversion";
import { editorFocusAnchor, normalizeEditorFocus } from "@/lib/editor-focus";
import {
  formatCitedAuthorityRate,
  rollupCitedAuthorityFunnelFixture,
} from "@/lib/cited-authority-funnel";
import { parsePendingExampleCV } from "@/lib/pending-example-cv";
import { getExamplePageRoleConversion } from "@/lib/role-cv-conversions";
import { normalizeStartSource } from "@/lib/start-source";
import { getTemplateConfig } from "@/lib/templates/registry";
import { studentCv } from "@/lib/cv-voorbeelden/examples/studenten-en-starters/student-cv";
import { administratiefMedewerker } from "@/lib/cv-voorbeelden/examples/zakelijk-en-financieel/administratief-medewerker";
import { cvMakenInHetEngels } from "@/lib/cv-tips/articles/cv-maken-in-het-engels";

const root = process.cwd();
const read = (path: string) => readFileSync(`${root}/${path}`, "utf8");

test("the cited-authority registry contains six unique, safe route contracts", () => {
  assert.equal(citedAuthorityRouteConfigs.length, 6);
  assert.equal(new Set(citedAuthorityRouteConfigs.map((config) => config.canonicalPath)).size, 6);
  assert.equal(new Set(citedAuthorityRouteConfigs.map((config) => config.startSource)).size, 6);

  for (const config of citedAuthorityRouteConfigs) {
    assert.match(config.canonicalPath, /^\/[a-z0-9/-]+$/);
    assert.ok(!config.canonicalPath.includes("//"));
    assert.ok(citedAuthoritySourceIds.includes(config.startSource));
    assert.equal(normalizeStartSource(config.startSource), config.startSource);
    assert.equal(getTemplateConfig(config.templateId).id, config.templateId);
    assert.equal(config.landingLocale, "nl");
    assert.notEqual(config.editorPath, "/agency/editor");
    assert.equal(config.destination === "blank_editor", Boolean(config.focus));
  }
});

test("only the English-CV article opens an English editor and document", () => {
  const english = getCitedAuthorityRouteConfig("/cv-tips/cv-maken-in-het-engels");
  assert.ok(english);
  assert.equal(english.editorPath, "/en/editor");
  assert.equal(english.editorUiLanguage, "en");
  assert.equal(english.resumeLanguage, "en");

  for (const config of citedAuthorityRouteConfigs.filter((candidate) => candidate !== english)) {
    assert.equal(config.editorPath, "/editor");
    assert.equal(config.editorUiLanguage, "nl");
    assert.equal(config.resumeLanguage, "nl");
  }
});

test("all six routes retain the locked source, destination, and template mapping", () => {
  const expected = new Map([
    ["/vaardigheden-cv-voorbeelden", ["cited_authority_skills", "professional", "blank_editor"]],
    ["/profieltekst-cv-voorbeelden", ["cited_authority_profile", "professional", "blank_editor"]],
    ["/cv-tips/cv-maken-in-het-engels", ["cited_authority_english_cv", "professional", "blank_editor"]],
    ["/cv-voorbeelden/studenten-en-starters/student-cv", ["cited_authority_student_example", studentCv.templateId, "fictional_example"]],
    ["/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker", ["cited_authority_admin_example", administratiefMedewerker.templateId, "fictional_example"]],
    ["/cv-template-administratief-medewerker", ["cited_authority_admin_template", "professional", "fictional_example"]],
  ]);

  for (const config of citedAuthorityRouteConfigs) {
    assert.deepEqual(
      [config.startSource, config.templateId, config.destination],
      expected.get(config.canonicalPath),
      config.canonicalPath,
    );
  }
});

test("blank editor hrefs preserve each value exactly once and never enter Agency", () => {
  const expected = new Map([
    [
      "/vaardigheden-cv-voorbeelden",
      "/editor?template=professional&startSource=cited_authority_skills&focus=skills",
    ],
    [
      "/profieltekst-cv-voorbeelden",
      "/editor?template=professional&startSource=cited_authority_profile&focus=profile",
    ],
    [
      "/cv-tips/cv-maken-in-het-engels",
      "/en/editor?template=professional&startSource=cited_authority_english_cv&focus=profile",
    ],
  ]);

  for (const config of citedAuthorityRouteConfigs.filter(
    (candidate) => candidate.destination === "blank_editor",
  )) {
    const href = buildCitedAuthorityEditorHref(config);
    assert.equal(href, expected.get(config.canonicalPath));
    assert.ok(href.startsWith("/"));
    assert.ok(!href.startsWith("//"));
    const parsed = new URL(href, "https://werkcv.nl");
    assert.equal(parsed.origin, "https://werkcv.nl");
    assert.deepEqual(parsed.searchParams.getAll("template"), [config.templateId]);
    assert.deepEqual(parsed.searchParams.getAll("startSource"), [config.startSource]);
    assert.deepEqual(parsed.searchParams.getAll("focus"), [config.focus]);
    assert.equal(parsed.searchParams.has("workspace"), false);
  }
});

test("focus accepts only allowlisted scalar values", () => {
  assert.equal(normalizeEditorFocus("profile"), "profile");
  assert.equal(normalizeEditorFocus("skills"), "skills");
  assert.equal(editorFocusAnchor("profile"), "section-personal");
  assert.equal(editorFocusAnchor("skills"), "section-skills");

  for (const value of [
    undefined,
    null,
    "",
    " profile",
    "skills ",
    "profile\n",
    "#section-personal",
    "../skills",
    "/skills",
    "https://example.com",
    "other",
    ["profile"],
    { focus: "profile" },
  ]) {
    assert.equal(normalizeEditorFocus(value), null);
  }
});

test("the shared bridge derives price copy and avoids fixed conversion UI", () => {
  const source = read("components/conversion/CitedAuthorityConversionBridge.tsx");
  assert.match(source, /cvDownloadPrice\.display/);
  assert.doesNotMatch(source, /€\s*\d/);
  assert.doesNotMatch(source, /\bfixed\b|\bsticky\b/);
  assert.match(source, /Gratis bouwen en volledig bekijken/);
  assert.match(source, /Geen abonnement/);
});

test("bridge analytics labels are bounded contracts without user content", () => {
  for (const config of citedAuthorityRouteConfigs) {
    const labels = [
      `cited_authority:${config.intentId}:main`,
      `cited_authority:${config.intentId}:primary`,
      `cited_authority:${config.intentId}:pricing`,
      `${config.startSource}:open_editor`,
      `${config.startSource}:view_pricing`,
    ];
    for (const label of labels) {
      assert.match(label, /^[a-z0-9_:]{1,120}$/);
    }
  }
});

test("pending fictional examples accept complete registered fixtures and reject unsafe contracts", () => {
  const valid = parsePendingExampleCV({
    templateId: studentCv.templateId,
    colorThemeId: studentCv.colorThemeId,
    sampleCV: studentCv.sampleCV,
    startSource: "cited_authority_student_example",
    pagePath: "/cv-voorbeelden/studenten-en-starters/student-cv",
    uiLanguage: "nl",
  });
  assert.ok(valid);
  assert.equal(valid.templateId, studentCv.templateId);
  assert.equal(valid.sampleCV?.personal.name, studentCv.sampleCV.personal.name);
  assert.equal(valid.pagePath, "/cv-voorbeelden/studenten-en-starters/student-cv");

  for (const value of [
    null,
    [],
    { ...valid, templateId: "not-a-template" },
    { ...valid, colorThemeId: "not-a-theme" },
    { ...valid, startSource: "../unsafe" },
    { ...valid, sampleCV: { personal: { name: 42 } } },
  ]) {
    assert.equal(parsePendingExampleCV(value), null);
  }

  const externalPath = parsePendingExampleCV({ ...valid, pagePath: "https://example.com/cv" });
  assert.ok(externalPath);
  assert.equal(externalPath.pagePath, undefined);
});

test("student and administrative role panels use their exact cited sources", () => {
  const student = getExamplePageRoleConversion("studenten-en-starters", "student-cv");
  const admin = getExamplePageRoleConversion("zakelijk-en-financieel", "administratief-medewerker");
  assert.equal(student?.startSource, "cited_authority_student_example");
  assert.equal(student?.canonicalPath, "/cv-voorbeelden/studenten-en-starters/student-cv");
  assert.equal(admin?.startSource, "cited_authority_admin_example");
  assert.equal(admin?.canonicalPath, "/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker");
});

test("fictional example action has an atomic duplicate guard and accessible failure feedback", () => {
  const source = read("components/cv-voorbeelden/UseExampleButton.tsx");
  assert.match(source, /requestInFlightRef\.current/);
  assert.match(source, /disabled=\{isLoading\}/);
  assert.match(source, /role="alert"/);
  assert.match(source, /aria-live="polite"/);
  assert.match(source, /workspace:\s*'consumer'/);
});

test("reviewed English-CV copy no longer contains unsupported precision", () => {
  const source = read("lib/cv-tips/articles/cv-maken-in-het-engels.ts");
  assert.doesNotMatch(source, /63%|2\.400|70%.*ATS/i);
  assert.match(source, /updatedAt:\s*'2026-08-30'/);
  assert.equal(cvMakenInHetEngels.sources?.length, 4);
  assert.ok(cvMakenInHetEngels.sources?.every((item) => item.url.startsWith("https://")));
  const renderer = read("app/cv-tips/[slug]/page.tsx");
  assert.match(renderer, /citation: article\.sources\.map/);
  assert.match(renderer, /Bronnen en controle/);
});

test("all scoped page implementations connect to the shared cited-authority contract", () => {
  const pageSources = new Map([
    ["app/vaardigheden-cv-voorbeelden/page.tsx", "/vaardigheden-cv-voorbeelden"],
    ["app/profieltekst-cv-voorbeelden/page.tsx", "/profieltekst-cv-voorbeelden"],
    ["app/cv-tips/[slug]/page.tsx", "/cv-tips/cv-maken-in-het-engels"],
    ["app/cv-voorbeelden/[category]/[slug]/page.tsx", "RoleCvPrefillPanel"],
    ["app/cv-template-administratief-medewerker/page.tsx", "/cv-template-administratief-medewerker"],
  ]);
  for (const [file, contract] of pageSources) {
    assert.ok(read(file).includes(contract), `${file} is missing ${contract}`);
  }
});

test("pending example storage is removed only after successful application", () => {
  const source = read("app/editor/editor.tsx");
  const applyStart = source.indexOf("const applyPendingExample = async");
  const saved = source.indexOf("setIsSaved(true)", applyStart);
  const consumed = source.indexOf("removeItem(PENDING_EXAMPLE_CV_STORAGE_KEY)", saved);
  assert.ok(applyStart >= 0 && saved > applyStart && consumed > saved);
  assert.match(source, /pendingExampleApplyStartedRef\.current/);
});

test("cited funnel fixture uses unique identities, paid orders, and all exclusions", () => {
  const rows = rollupCitedAuthorityFunnelFixture({
    bridgeEvents: [
      { sourceId: "cited_authority_skills", visitorId: "visitor-a", kind: "view" },
      { sourceId: "cited_authority_skills", visitorId: "visitor-a", kind: "view" },
      { sourceId: "cited_authority_skills", visitorId: "visitor-a", kind: "click" },
      { sourceId: "cited_authority_profile", visitorId: "visitor-a", kind: "view" },
      { sourceId: "cited_authority_profile", visitorId: "test", kind: "click", sourceLabel: "codex_test" },
      { sourceId: "cited_authority_profile", visitorId: "owner", kind: "view", excluded: true },
    ],
    documents: [
      { sourceId: "cited_authority_skills", cvId: "cv-1", userId: "user-1", meaningful: true, previewed: true, checkoutStarted: true },
      { sourceId: "cited_authority_skills", cvId: "cv-2", userId: "user-1", meaningful: false },
      { sourceId: "cited_authority_profile", cvId: "cv-3", userId: "user-2", meaningful: true },
      { sourceId: "cited_authority_admin_example", cvId: "agency-cv", userId: "user-3", agency: true },
      { sourceId: "cited_authority_student_example", cvId: "owner-cv", userId: "owner", excluded: true },
    ],
    orders: [
      { orderId: "order-1", cvId: "cv-1", product: "cv-download", amountCents: 499, paid: true, hoursToPaid: 2 },
      { orderId: "order-2", cvId: "cv-2", product: "cv-profile-photo-bundle", amountCents: 699, paid: true, hoursToPaid: 4 },
      { orderId: "order-unpaid", cvId: "cv-3", product: "cv-download", amountCents: 499, paid: false },
      { orderId: "order-agency", cvId: "agency-cv", product: "cv-download", amountCents: 499, paid: true },
      { orderId: "order-other", cvId: "cv-3", product: "agency", amountCents: 14900, paid: true },
    ],
  });

  const skills = rows.find((row) => row.sourceId === "cited_authority_skills");
  const aggregate = rows.find((row) => row.sourceId === "__all__");
  assert.ok(skills);
  assert.ok(aggregate);
  assert.deepEqual(
    {
      bridgeViews: skills.bridgeViews,
      bridgeClicks: skills.bridgeClicks,
      cvDocuments: skills.cvDocuments,
      cvUsers: skills.cvUsers,
      meaningfulUsers: skills.meaningfulUsers,
      previewUsers: skills.previewUsers,
      checkoutUsers: skills.checkoutUsers,
      paidUsers: skills.paidUsers,
      paidOrders: skills.paidOrders,
      revenueCents: skills.revenueCents,
      medianHoursToPaid: skills.medianHoursToPaid,
    },
    {
      bridgeViews: 1,
      bridgeClicks: 1,
      cvDocuments: 2,
      cvUsers: 1,
      meaningfulUsers: 1,
      previewUsers: 1,
      checkoutUsers: 1,
      paidUsers: 1,
      paidOrders: 2,
      revenueCents: 1198,
      medianHoursToPaid: 3,
    },
  );
  assert.equal(aggregate.bridgeViews, 1, "one visitor touching two sources remains one aggregate visitor");
  assert.equal(aggregate.cvDocuments, 3);
  assert.equal(aggregate.cvUsers, 2);
  assert.equal(aggregate.paidUsers, 1);
  assert.equal(aggregate.paidOrders, 2);
  assert.equal(aggregate.revenueCents, 1198);
  assert.equal(formatCitedAuthorityRate(0, 0), "—");
  assert.equal(formatCitedAuthorityRate(1, 2), "50%");
});

test("reporting contract uses distinct identities and never selects candidate content", () => {
  const reportSource = read("lib/cited-authority-funnel.ts");
  const dashboardSource = read("app/admin/analytics/page.tsx");
  assert.match(reportSource, /COUNT\(DISTINCT b\.visitor_id\)/);
  assert.match(reportSource, /e\.properties->>'slug' = LTRIM\(sm\.canonical_path, '\/'\)/);
  assert.match(reportSource, /COUNT\(DISTINCT d\.cv_id\)/);
  assert.match(reportSource, /JOIN "Order" o ON o\."cvId" = d\.cv_id/);
  assert.match(reportSource, /d\."agencySubscriptionId" IS NULL/);
  assert.match(reportSource, /codex_test/);
  assert.doesNotMatch(reportSource, /d\."data"\s+AS|personal\.name|filename/i);
  assert.match(dashboardSource, /Preview\*/);
  assert.match(dashboardSource, /formatCitedAuthorityRate/);
  assert.match(dashboardSource, /includeCitedAuthority: view === "conversion"/);
});
