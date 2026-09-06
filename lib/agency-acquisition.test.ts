import { strict as assert } from "node:assert";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
import {
  agencyAcquisitionRouteIds,
  agencyAcquisitionRoutes,
  getAgencyAcquisitionRoute,
  validateAgencyAcquisitionRoutes,
} from "@/lib/agency-acquisition";
import { AGENCY_CURRENCY, AGENCY_MONTHLY_CREDIT_LIMIT, AGENCY_MONTHLY_PRICE_CENTS, AGENCY_PLAN_VERSION, getAgencyCreditExplanation } from "@/lib/agency-plan";
import { resolveAgencyMonthlyLimit } from "@/lib/agency-billing";
import { primaryAiPages, siteBaseUrl } from "@/lib/ai-discovery";
import sitemap from "@/app/sitemap";
import {
  agencyFictionalExample,
  fictionalExampleSourceCanonical,
  fictionalExampleSourceDigest,
} from "@/lib/agency-fictional-example";
import {
  agencyPublicSectorExample,
  getAgencyPublicSectorMatrixRows,
  getAgencyPublicSectorSourceText,
} from "@/lib/agency-public-sector-example";
import { cvVacatureEvidenceResultSchema } from "@/lib/tools/cv-vacature-match-schema";

test("Agency acquisition registry is unique and complete", () => {
  assert.deepEqual(validateAgencyAcquisitionRoutes(), []);
  assert.equal(agencyAcquisitionRoutes.length, agencyAcquisitionRouteIds.length);
  assert.equal(getAgencyAcquisitionRoute("/agency")?.primaryIntent, "kandidaatvoorstel software recruitmentbureau");
  assert.equal(getAgencyAcquisitionRoute("/en/agency")?.hreflangPeer, "/agency");
  assert.equal(getAgencyAcquisitionRoute("/voor-bureaus/kandidaatvoorstel-maken"), undefined);
  assert.equal(getAgencyAcquisitionRoute("/en/candidate-submission-software"), undefined);
});

test("registry enforces canonical paths, editorial limits and the only language pair", () => {
  const routePaths = new Set(agencyAcquisitionRoutes.map((route) => route.path));
  for (const route of agencyAcquisitionRoutes) {
    assert.match(route.path, /^\/[^\s?#]+$/, `${route.id} must be a normalised pathname`);
    assert.ok(route.title.length <= 80, `${route.id} title is over the editorial limit`);
    assert.ok(route.description.length <= 180, `${route.id} description is over the editorial limit`);
    assert.ok(route.h1.length <= 100, `${route.id} H1 is over the editorial limit`);
    assert.ok(route.primaryDestination.startsWith("/"), `${route.id} CTA must stay internal`);
    assert.ok(!route.primaryDestination.startsWith("/agency/account"), `${route.id} must not canonicalise to an account URL`);
    assert.equal(route.hreflangPeer ? routePaths.has(route.hreflangPeer) : route.id !== "nl_product" && route.id !== "en_product", true);
  }

  const dutchProduct = getAgencyAcquisitionRoute("/agency")!;
  const englishProduct = getAgencyAcquisitionRoute("/en/agency")!;
  assert.equal(dutchProduct.hreflangPeer, englishProduct.path);
  assert.equal(englishProduct.hreflangPeer, dutchProduct.path);
  assert.equal(agencyAcquisitionRoutes.filter((route) => route.hreflangPeer).length, 2);
});

test("every acquisition route is represented in AI discovery output", () => {
  const urlCounts = new Map<string, number>();
  for (const page of primaryAiPages) urlCounts.set(page.url, (urlCounts.get(page.url) ?? 0) + 1);
  for (const route of agencyAcquisitionRoutes) {
    const url = `${siteBaseUrl}${route.path}`;
    assert.equal(urlCounts.get(url), 1, `AI discovery must contain exactly one entry for ${route.path}`);
  }
});

test("canonical Agency acquisition routes appear exactly once in the sitemap", async () => {
  const entries = await sitemap();
  const urlCounts = new Map<string, number>();
  for (const entry of entries) urlCounts.set(entry.url, (urlCounts.get(entry.url) ?? 0) + 1);
  for (const route of agencyAcquisitionRoutes) {
    const url = `${siteBaseUrl}${route.path}`;
    assert.equal(urlCounts.get(url), 1, `sitemap must contain exactly one entry for ${route.path}`);
  }
  assert.equal(urlCounts.get(`${siteBaseUrl}/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld`), 1);
});

const scopedPublicFiles = [
  "app/agency/page.tsx",
  "app/en/agency/page.tsx",
  "app/voor-bureaus/page.tsx",
  "app/voor-bureaus/kennisbank/page.tsx",
  "app/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever/page.tsx",
  "app/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld/page.tsx",
  "app/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau/page.tsx",
  "app/voor-bureaus/kennisbank/cv-anonimiseren-recruitment/page.tsx",
  "app/voor-bureaus/kennisbank/matchpack-handleiding/page.tsx",
  "app/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid/page.tsx",
  "app/tools/kandidaatvoorstel-checker/page.tsx",
  "app/en/candidate-proposal-checker/page.tsx",
  "app/agency/privacy/page.tsx",
  "app/en/agency/privacy/page.tsx",
  "app/voor-bureaus/methodologie/claim-evidence-benchmark/page.tsx",
  "app/en/agency/methodology/claim-evidence-benchmark/page.tsx",
  "components/agency/AgencyGuideArticle.tsx",
  "components/agency/CandidateProposalEvidenceChecker.tsx",
  "components/agency/AgencySubmissionDemo.tsx",
  "components/agency/AgencyInteractiveDemo.tsx",
  "lib/agency-content.ts",
  "lib/ai-discovery.ts",
  "app/llms.txt/route.ts",
  "components/Footer.tsx",
  "components/brand/BrandRouteBoundary.tsx",
] as const;

function scopedSource(file: string): string {
  return readFileSync(path.join(process.cwd(), file), "utf8");
}

test("scoped public copy contains no unqualified legacy or decisioning claims", () => {
  const legacyCommercialPatterns = [
    /€\s*149\b/i,
    /\bEUR\s*149\b/i,
    /\b14900\b/i,
    /\b50\s*(?:slots|cv['’]?s|cv's)\b/i,
    /voorstel[- ]slots/i,
  ];
  for (const file of scopedPublicFiles) {
    const source = scopedSource(file);
    for (const pattern of legacyCommercialPatterns) {
      assert.doesNotMatch(source, pattern, `${file} contains stale Agency commercial copy (${pattern})`);
    }
    assert.doesNotMatch(source, /\bpilot\b/i, `${file} must not describe a pilot funnel`);
    assert.doesNotMatch(source, /\b(?:100%\s*accurate|hallucination[- ]free|verified\s+true)\b/i, `${file} contains an unsupported accuracy claim`);
    assert.doesNotMatch(source, /\b(?:PDF[- ]only|only\s+PDF|alleen\s+PDF|PDF\s+als\s+enige)\b/i, `${file} still describes PDF-only output`);
    assert.doesNotMatch(source, /\b(?:no\s+team\s+roles|geen\s+teamrollen|teamrollen\s+bestaan\s+niet)\b/i, `${file} says team roles are unavailable`);

    const hasSensitivePrivacyTerm = /\b(?:anonymous|anonymised|anonymized|anoniem|geanonimiseerd|AVG-proof|GDPR\s+compliant)\b/i.test(source);
    if (hasSensitivePrivacyTerm) {
      assert.match(source, /\b(?:not|no|geen|niet|never|no guarantee|geen garantie|geen juridische)\b/i, `${file} must qualify privacy/anonymity language`);
    }

    const hasDecisioningTerm = /\b(?:best\s+candidate|candidate\s+(?:score|rank|ranking)|candidate\s+recommendation|hiring\s+recommendation|kandidatenranking|kandidaatselectie|matchscore|match\s+score|aannamebeslissing|geschiktheidsadvies)\b/i.test(source);
    if (hasDecisioningTerm) {
      assert.match(source, /\b(?:no|not|geen|niet|never|does\s+not|geen\s+ranking|geen\s+matchscore)\b/i, `${file} must frame decisioning terms as a limitation`);
    }

    const hasDirectIntegrationTerm = /\b(?:direct(?:e|ly)?\s+(?:ATS|CRM)\s*(?:integration|koppeling|synchronisatie)?|integrat(?:e|es|ion)\s+with\s+(?:an\s+)?ATS)\b/i.test(source);
    if (hasDirectIntegrationTerm) {
      assert.match(source, /\b(?:not\s+included|niet\s+inbegrepen|nog\s+niet\s+ondersteund|geen\s+directe)\b/i, `${file} must qualify ATS integration language`);
    }
  }
});

test("public capabilities follow flags and preserve static product contract", () => {
  const disabled = getAgencyPublicCapabilities({});
  assert.equal(disabled.proposalClaimVerifier, false);
  assert.equal(disabled.candidateAcknowledgement, false);
  assert.equal(disabled.benchmarkPublished, false);
  assert.equal(disabled.atsIntegration, false);
  assert.equal(disabled.clientPortal, false);
  assert.equal(disabled.docxExport, true);
  assert.equal(disabled.teamRoles, true);

  const enabled = getAgencyPublicCapabilities({
    PROPOSAL_CLAIM_VERIFIER_ENABLED: "1",
    CANDIDATE_ACKNOWLEDGEMENT_ENABLED: "true",
    CLAIM_BENCHMARK_PUBLICATION_ENABLED: "1",
  });
  assert.equal(enabled.proposalClaimVerifier, true);
  assert.equal(enabled.candidateAcknowledgement, true);
  assert.equal(enabled.benchmarkPublished, true);
});

test("Agency plan values remain the shared source of truth", () => {
  assert.equal(AGENCY_CURRENCY, "EUR");
  assert.equal(AGENCY_PLAN_VERSION, "agency_99_300_2026_09");
  assert.equal(AGENCY_MONTHLY_CREDIT_LIMIT, 300);
  assert.equal(AGENCY_MONTHLY_PRICE_CENTS, 9900);
  assert.match(getAgencyCreditExplanation("nl"), /credit/i);
});

test("stored Agency allowances remain authoritative during provider sync", () => {
  assert.equal(resolveAgencyMonthlyLimit(undefined), AGENCY_MONTHLY_CREDIT_LIMIT);
  assert.equal(resolveAgencyMonthlyLimit(null), AGENCY_MONTHLY_CREDIT_LIMIT);
  assert.equal(resolveAgencyMonthlyLimit(0), 0);
  assert.equal(resolveAgencyMonthlyLimit(120), 120);
  assert.equal(resolveAgencyMonthlyLimit(450), 450);
});

test("Agency evidence projection cannot serialize consumer score fields", () => {
  const projected = cvVacatureEvidenceResultSchema.parse({
    score: 91,
    scoreBand: "strong",
    scoreLabel: "Strong match",
    dimensions: [{ id: "relevance", label: "Relevance", score: 30, maxScore: 35, explanation: "Test" }],
    summary: "Source-backed summary",
    perceivedRole: "HR adviser",
    perceivedSeniority: "senior",
    strengths: [],
    requirements: [],
    missingKeywords: [],
    topFixes: [],
    limitations: [],
  });
  const serialized = JSON.stringify(projected);
  assert.doesNotMatch(serialized, /score|scoreBand|scoreLabel|dimensions/u);
  assert.equal(projected.summary, "Source-backed summary");
});

test("Agency checker uses its no-store score-free API contract", () => {
  const component = scopedSource("components/agency/CandidateProposalEvidenceChecker.tsx");
  const endpoint = scopedSource("app/api/tools/cv-vacature-evidence/route.ts");
  assert.match(component, /\/api\/tools\/cv-vacature-evidence/u);
  assert.doesNotMatch(component, /\/api\/tools\/cv-vacature-match\?/u);
  assert.doesNotMatch(component, /\bscore(?:Band|Label)?\s*:/u);
  assert.match(endpoint, /cvVacatureEvidenceResultSchema\.parse/u);
  assert.match(endpoint, /Cache-Control[\s\S]*no-store/u);
});

test("Agency pages derive metadata, CTA and FAQ claims from the capability contract", () => {
  const dutch = scopedSource("app/agency/page.tsx");
  const english = scopedSource("app/en/agency/page.tsx");
  for (const source of [dutch, english]) {
    assert.match(source, /title:\s*messaging\.title/u);
    assert.match(source, /description:\s*messaging\.description/u);
    assert.match(source, /messaging\.freeToolCta/u);
    assert.match(source, /messaging\.faqAnswer/u);
    assert.match(source, /<FAQJsonLd\s+questions=/u);
  }
  assert.doesNotMatch(english, /title:\s*"MatchPack: evidence-linked candidate submissions"/u);
});

test("public-sector guide fixture contains the required varied outcomes", () => {
  const statuses = new Set(agencyPublicSectorExample.requirements.map((item) => item.status));
  for (const status of ["supported", "partially_supported", "unsupported", "contradicted", "confirmation_required"] as const) {
    assert.equal(statuses.has(status), true, `missing public-sector status ${status}`);
  }
  const sourceText = getAgencyPublicSectorSourceText();
  for (const item of agencyPublicSectorExample.requirements) {
    if (!item.evidence.startsWith("Geen exact")) assert.match(sourceText, new RegExp(item.evidence.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.equal(getAgencyPublicSectorMatrixRows().length, agencyPublicSectorExample.requirements.length);
  assert.equal(existsSync(path.join(process.cwd(), "public/downloads/werkcv-eisenmatrix-kandidaat-aanbieden-overheid.csv")), true);
  assert.equal(existsSync(path.join(process.cwd(), "public/downloads/werkcv-eisenmatrix-kandidaat-aanbieden-overheid.docx")), true);
});

test("fictional example source spans are deterministic and resolvable", () => {
  const digest = `sha256:${createHash("sha256").update(JSON.stringify(fictionalExampleSourceCanonical)).digest("hex")}`;
  assert.equal(digest, fictionalExampleSourceDigest);

  const sourceText = fictionalExampleSourceCanonical.map((source) => source.snippet).join("\n");
  for (const claim of agencyFictionalExample.evidence) {
    if (claim.sourceSnippet) assert.ok(sourceText.includes(claim.sourceSnippet), `missing source snippet for ${claim.id}`);
    if (claim.status === "unsupported" || claim.status === "confirmation_required") {
      assert.notEqual(claim.nextAction.trim(), "Behouden", `${claim.id} must not be retained as supported`);
    }
  }
});

test("fictional public example exposes both verified output formats", () => {
  const assets = [
    "public/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur.pdf",
    "public/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur.docx",
    "public/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur-geanonimiseerd.pdf",
    "public/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur-geanonimiseerd.docx",
  ];
  for (const asset of assets) assert.equal(existsSync(path.join(process.cwd(), asset)), true, `missing fictional output asset: ${asset}`);
});
