export const agencyDiscoveryPaths = [
  "/agency", "/en/agency", "/voor-bureaus", "/voor-bureaus/kennisbank",
  "/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau",
  "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld",
  "/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid",
  "/tools/kandidaatvoorstel-checker", "/en/candidate-proposal-checker",
] as const;
export const agencyDiscoveryAuxiliary = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/.well-known/ai.txt", "/ai/service.json", "/ai/summary.json", "/ai/faq.json"] as const;
export const agencyDiscoveryPeers: Record<string, string> = { "/agency": "/en/agency", "/en/agency": "/agency" };
