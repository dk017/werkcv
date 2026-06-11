import { getAllCategories, getAllExamples } from "@/lib/cv-voorbeelden/registry";

const LEGACY_ROOT = "/cv-voorbeelden";
const LEGACY_ALIAS_MAP: Record<string, string> = {
  "ict-en-software": "/cv-voorbeelden/technologie-en-ict",
  "developer": "/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar",
  "backend-developer-nodejs": "/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar",
  "frontend-react-developer": "/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar",
  "data-specialist": "/cv-voorbeelden/technologie-en-ict/data-engineer",
  "junior-data-analist-python": "/cv-voorbeelden/technologie-en-ict/data-engineer",
  "zendesk-support-medewerker": "/cv-voorbeelden/horeca-en-detailhandel/klantenservice-medewerker",
  "logistiek-en-transport": "/cv-voorbeelden/vakmanschap-en-logistiek",
  "magazijnmedewerker-nachtdienst": "/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker",
  "heftruckchauffeur-certificaat": "/cv-voorbeelden/vakmanschap-en-logistiek",
  "vrachtwagenchauffeur-internationaal": "/cv-voorbeelden/vakmanschap-en-logistiek/chauffeur",
  "zorg-en-welzijn": "/cv-voorbeelden/zorg-en-welzijn",
  "verpleegkundige-icu": "/cv-voorbeelden/zorg-en-welzijn/verpleegkundige",
  "verzorgende-ig-ouderenzorg": "/cv-voorbeelden/zorg-en-welzijn/verzorgende-ig",
  "situatie": "/cv-gids/cv-voorbeelden-per-situatie",
  "carrièreswitch-naar-it": "/cv-gids/cv-voorbeelden-per-situatie",
  "zonder-ervaring-horeca": "/cv-gids/cv-voorbeelden-per-situatie",
  "gat-in-cv-burn-out": "/cv-gids/cv-voorbeelden-per-situatie",
  "kantoor-en-administratie": "/cv-voorbeelden/zakelijk-en-financieel",
  "directiesecretaresse": "/cv-voorbeelden/zakelijk-en-financieel/office-manager",
  "financial-controller-mkb": "/cv-voorbeelden/zakelijk-en-financieel/controller",
};

const categories = getAllCategories();
const examples = getAllExamples();
const categorySlugSet = new Set(categories.map((category) => category.slug));
const uniqueExampleSlugMap = new Map<string, string>();

for (const example of examples) {
  const existingPath = uniqueExampleSlugMap.get(example.slug);
  const nextPath = `/cv-voorbeelden/${example.categorySlug}/${example.slug}`;

  if (existingPath && existingPath !== nextPath) {
    uniqueExampleSlugMap.delete(example.slug);
    continue;
  }

  uniqueExampleSlugMap.set(example.slug, nextPath);
}

export function resolveLegacyCvVoorbeeldPath(slugPath: string[]): string {
  if (slugPath.length === 0) {
    return LEGACY_ROOT;
  }

  const normalizedParts = slugPath.map((part) => decodeURIComponent(part).toLowerCase());
  const fullPath = normalizedParts.join("/");
  const lastPart = normalizedParts[normalizedParts.length - 1];

  if (LEGACY_ALIAS_MAP[fullPath]) {
    return LEGACY_ALIAS_MAP[fullPath];
  }

  if (LEGACY_ALIAS_MAP[lastPart]) {
    return LEGACY_ALIAS_MAP[lastPart];
  }

  if (categorySlugSet.has(lastPart)) {
    return `/cv-voorbeelden/${lastPart}`;
  }

  const examplePath = uniqueExampleSlugMap.get(lastPart);
  if (examplePath) {
    return examplePath;
  }

  return LEGACY_ROOT;
}
