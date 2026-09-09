import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { aiFaqItems, primaryAiPages, siteBaseUrl } from "@/lib/ai-discovery";

const root = process.cwd();
const read = (path: string) => readFileSync(`${root}/${path}`, "utf8");

test("AI discovery keeps the intentional first-twelve order without duplicate URLs", () => {
  const expected = [
    "/",
    "/cv-maken",
    "/prijzen",
    "/cv-maken-zonder-abonnement",
    "/en",
    "/en/pricing",
    "/en/dutch-cv-template",
    "/en/guides/cv-format-netherlands-english",
    "/templates",
    "/cv-voorbeelden",
    "/cv-tips",
    "/faq",
  ].map((path) => `${siteBaseUrl}${path}`);
  assert.deepEqual(primaryAiPages.slice(0, 12).map((page) => page.url), expected);
  assert.equal(new Set(primaryAiPages.map((page) => page.url)).size, primaryAiPages.length);
});

test("English AI FAQ uses canonical English pricing and template routes", () => {
  const expected = new Map([
    ["CV Builder: What does WerkCV cost?", `${siteBaseUrl}/en/pricing`],
    ["CV Builder: Is the consumer CV download a subscription?", `${siteBaseUrl}/en/pricing`],
    ["CV Builder: Can I preview before paying?", `${siteBaseUrl}/en/pricing`],
    ["CV Builder: Where can I find a Dutch CV template in English?", `${siteBaseUrl}/en/dutch-cv-template`],
  ]);
  for (const [question, canonicalUrl] of expected) {
    const item = aiFaqItems.find((candidate) => candidate.question === question);
    assert.ok(item, `missing FAQ: ${question}`);
    assert.equal(item.canonicalUrl, canonicalUrl);
  }
});

test("scoped commercial pages use shared pricing rather than hardcoded consumer price text", () => {
  const scopedFiles = [
    "app/prijzen/page.tsx",
    "app/cv-maken-zonder-abonnement/page.tsx",
    "app/goedkoopste-cv-maker-nederland/page.tsx",
    "app/cv-downloaden-zonder-abonnement/page.tsx",
    "app/en/page.tsx",
    "app/en/pricing/page.tsx",
    "app/en/dutch-cv-template/page.tsx",
    "app/en/guides/[slug]/page.tsx",
  ];
  for (const file of scopedFiles) {
    const source = read(file);
    assert.doesNotMatch(source, /€4[.,]99/, `hardcoded price in ${file}`);
  }
});

test("required commercial CTA sources are safe and present", () => {
  const sources = [
    "nl_pricing_hero",
    "nl_pricing_card",
    "nl_pricing_bottom",
    "nl_pricing_sticky",
    "nl_no_subscription_header",
    "nl_no_subscription_hero",
    "nl_no_subscription_trust",
    "nl_no_subscription_comparison",
    "nl_no_subscription_download",
    "nl_no_subscription_bottom",
    "nl_no_subscription_sticky",
    "nl_cheapest_cv_hero",
    "nl_cheapest_cv_templates",
    "nl_cheapest_cv_comparison",
    "nl_cheapest_cv_bottom",
    "nl_cheapest_cv_sticky",
    "en_pricing_hero",
    "en_pricing_card",
    "en_pricing_bottom",
    "en_pricing_sticky",
    "en_dutch_cv_template_hero",
    "en_dutch_cv_template_compare",
    "en_cv_format_guide_hero",
    "en_cv_format_guide_templates",
    "nl_no_subscription_download_page",
  ];
  const combined = [
    read("app/prijzen/page.tsx"),
    read("app/cv-maken-zonder-abonnement/page.tsx"),
    read("app/goedkoopste-cv-maker-nederland/page.tsx"),
    read("app/en/pricing/page.tsx"),
    read("app/en/dutch-cv-template/page.tsx"),
    read("app/en/guides/[slug]/page.tsx"),
    read("app/cv-downloaden-zonder-abonnement/page.tsx"),
  ].join("\n");
  for (const source of sources) {
    assert.match(source, /^[a-z0-9_]{1,80}$/);
    assert.ok(combined.includes(source), `missing CTA source: ${source}`);
  }
});

test("legacy one-time route is a permanent redirect to pricing", () => {
  const source = read("app/cv-maken-eenmalig-betalen/page.tsx");
  assert.match(source, /permanentRedirect\("\/prijzen"\)/);
});

test("English pricing exposes a visible payment-method anchor", () => {
  const source = read("app/en/pricing/page.tsx");
  assert.match(source, /id="payment-methods"/);
  assert.match(source, /href="#payment-methods"/);
});
