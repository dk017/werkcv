import assert from "node:assert/strict";
import test from "node:test";
import { getAgencyPublicCapabilities } from "./agency-public-capabilities";
import { getProductDescriptions, getProductServiceGraph, getAgencySoftwareJsonLd, getCompanyPricingSummary } from "./product-discovery";
import { cvDownloadPrice } from "./site-content";
import { AGENCY_MONTHLY_PRICE_CENTS, AGENCY_MONTHLY_CREDIT_LIMIT } from "./agency-plan";
import { GET as service } from "../app/ai/service.json/route";
import { GET as summary } from "../app/ai/summary.json/route";
import { GET as faq } from "../app/ai/faq.json/route";
import { GET as llms } from "../app/llms.txt/route";

for (let bits = 0; bits < 8; bits++) {
  test(`two-product contracts, flags ${bits}`, () => {
    const capabilities = getAgencyPublicCapabilities({ PROPOSAL_CLAIM_VERIFIER_ENABLED: bits & 1 ? "1" : "0", CANDIDATE_ACKNOWLEDGEMENT_ENABLED: bits & 2 ? "1" : "0", CLAIM_BENCHMARK_PUBLICATION_ENABLED: bits & 4 ? "1" : "0" });
    const [consumer, agency] = getProductDescriptions(capabilities);
    assert.notEqual(consumer.id, agency.id);
    assert.equal(consumer.pricing.amount, cvDownloadPrice.value);
    assert.equal(agency.pricing.amount, (AGENCY_MONTHLY_PRICE_CENTS / 100).toFixed(2));
    assert.match(agency.pricing.description, new RegExp(`${AGENCY_MONTHLY_CREDIT_LIMIT} shared`));
    assert.equal(consumer.pricing.kind, "one_time_per_document");
    assert.equal(agency.pricing.kind, "monthly_subscription");
    assert.doesNotMatch(consumer.capabilities.join(" "), /DOCX|Team|acknowledgement/);
    assert.deepEqual(agency.languages.workspace, ["nl"]);
    assert.equal(agency.capabilities.some(x => x.includes("Candidate acknowledgement")), !!(bits & 2));
    assert.equal(agency.capabilities.some(x => x.includes("Benchmark")), !!(bits & 4));
    assert.equal(/proposal claims/.test(agency.description), !!(bits & 1));
    if (!(bits & 1)) assert.match(agency.description, /selected vacancy requirements/);
    const graph = getProductServiceGraph(capabilities)["@graph"];
    assert.equal(graph.length, 2);
    assert.deepEqual(graph[1], Object.fromEntries(Object.entries(getAgencySoftwareJsonLd("en", capabilities)).filter(([key]) => key !== "@context")));
    assert.notEqual(graph[0].offers.url, graph[1].offers.url);
    assert.equal(graph[0].offers.priceSpecification?.valueAddedTaxIncluded, true);
    assert.equal(graph[1].offers.priceSpecification, undefined);
    for (const p of [consumer, agency]) for (const url of [p.id, p.url, p.englishUrl, p.privacyUrl]) assert.equal(new URL(url).hostname, "werkcv.nl");
    assert.match(getCompanyPricingSummary(capabilities), /Consumer CV Builder:.*MatchPack:/);
  });
}
test("real discovery endpoints expose the separated contract", async () => {
  for (const handler of [service, summary, faq]) {
    const response = handler();
    assert.match(response.headers.get("content-type")!, /application\/json/);
    assert.equal(response.status, 200);
    assert.ok(await response.json());
  }
  const body = await summary().json();
  assert.equal(body.schemaVersion, 2);
  assert.equal(body.products.length, 2);
  assert.match(body.productFactsScope, /CV Builder only/);
  assert.match(body.description, /individuals.*recruitment agencies/);
  const text = await llms().text();
  assert.match(text, /Separate products and billing/);
  assert.match(text, /monthly|month/);
  assert.doesNotMatch(text, /Every requirement is connected/);
});
