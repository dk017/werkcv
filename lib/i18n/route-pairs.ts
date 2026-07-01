export type LocaleRoutePath = `/${string}` | "/";

export type RoutePair = Readonly<{
  id: string;
  nl: LocaleRoutePath;
  en: `/en${string}`;
  useForSwitcher: boolean;
  useForHreflang: boolean;
  preserveSearch: boolean;
}>;

export type RoutePairPurpose = "switcher" | "hreflang";

export const routePairs = [
  {
    id: "home",
    nl: "/",
    en: "/en",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "templates",
    nl: "/templates",
    en: "/en/templates",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: true,
  },
  {
    id: "editor",
    nl: "/editor",
    en: "/en/editor",
    useForSwitcher: true,
    useForHreflang: false,
    preserveSearch: true,
  },
  {
    id: "cv-vacancy-match",
    nl: "/tools/cv-vacature-match",
    en: "/en/cv-job-match-checker",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "resume-optimizer",
    nl: "/cv-optimaliseren",
    en: "/en/resume-optimizer-netherlands",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "cv-examples",
    nl: "/cv-voorbeelden",
    en: "/en/dutch-cv-examples",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "english-cv-example",
    nl: "/engels-cv-voorbeeld",
    en: "/en/english-cv-example-netherlands",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "english-speaking-companies",
    nl: "/engelstalige-bedrijven-in-nederland",
    en: "/en/english-speaking-companies-netherlands",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "english-cv-format",
    nl: "/cv-maken-in-engels",
    en: "/en/cv-format-netherlands-english",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "expat-cv",
    nl: "/cv-tips/cv-schrijven-buitenlander-nederland",
    en: "/en/dutch-cv-for-expats",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "ats-cv-guide",
    nl: "/cv-tips/ats-vriendelijk-cv",
    en: "/en/ats-resume-netherlands",
    useForSwitcher: true,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "guide-english-cv-in-netherlands",
    nl: "/cv-gids/engels-cv-in-nederland",
    en: "/en/guides/cv-format-netherlands-english",
    useForSwitcher: false,
    useForHreflang: true,
    preserveSearch: false,
  },
  {
    id: "guide-cv-photo-netherlands",
    nl: "/cv-gids/foto-op-cv-nederland",
    en: "/en/guides/netherlands-cv-photo-rules",
    useForSwitcher: false,
    useForHreflang: true,
    preserveSearch: false,
  },
] as const satisfies readonly RoutePair[];

function normalizePath(path: string): string {
  if (path === "/") return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function isEnglishPath(path: string): boolean {
  return path === "/en" || path.startsWith("/en/");
}

export function validateRoutePairs(pairs: readonly RoutePair[]): void {
  const ids = new Set<string>();
  const nlPaths = new Set<string>();
  const enPaths = new Set<string>();

  for (const pair of pairs) {
    if (!pair.id.trim()) {
      throw new Error("Route pair IDs must not be empty.");
    }
    if (ids.has(pair.id)) {
      throw new Error(`Duplicate route pair ID: ${pair.id}`);
    }
    ids.add(pair.id);

    if (!pair.nl.startsWith("/") || isEnglishPath(pair.nl)) {
      throw new Error(`Invalid Dutch route in ${pair.id}: ${pair.nl}`);
    }
    if (!isEnglishPath(pair.en)) {
      throw new Error(`Invalid English route in ${pair.id}: ${pair.en}`);
    }
    if (pair.nl !== normalizePath(pair.nl) || pair.en !== normalizePath(pair.en)) {
      throw new Error(`Route pair ${pair.id} contains a trailing slash.`);
    }
    if (!pair.useForSwitcher && !pair.useForHreflang) {
      throw new Error(`Route pair ${pair.id} is not enabled for any purpose.`);
    }
    if (pair.preserveSearch && !pair.useForSwitcher) {
      throw new Error(`Route pair ${pair.id} preserves search parameters without switcher support.`);
    }
    if (nlPaths.has(pair.nl)) {
      throw new Error(`Duplicate Dutch route: ${pair.nl}`);
    }
    if (enPaths.has(pair.en)) {
      throw new Error(`Duplicate English route: ${pair.en}`);
    }

    nlPaths.add(pair.nl);
    enPaths.add(pair.en);
  }
}

validateRoutePairs(routePairs);

const routePairByPath = new Map<string, RoutePair>();
for (const pair of routePairs) {
  routePairByPath.set(pair.nl, pair);
  routePairByPath.set(pair.en, pair);
}

export function getRoutePair(pathname: string): RoutePair | null {
  return routePairByPath.get(normalizePath(pathname)) ?? null;
}

export function getCounterpart(
  pathname: string,
  purpose: RoutePairPurpose = "switcher",
): LocaleRoutePath | null {
  const normalizedPath = normalizePath(pathname);
  const pair = getRoutePair(normalizedPath);
  if (!pair) return null;

  const isEnabled = purpose === "switcher" ? pair.useForSwitcher : pair.useForHreflang;
  if (!isEnabled) return null;

  return normalizedPath === pair.nl ? pair.en : pair.nl;
}

export function getLanguageAlternates(pathname: string): Record<string, string> | null {
  const normalizedPath = normalizePath(pathname);
  const pair = getRoutePair(normalizedPath);
  if (!pair?.useForHreflang) return null;

  const nlUrl = `https://werkcv.nl${pair.nl === "/" ? "" : pair.nl}`;
  const enUrl = `https://werkcv.nl${pair.en}`;
  const defaultUrl = normalizedPath === pair.en ? enUrl : nlUrl;

  return {
    nl: nlUrl,
    "nl-NL": nlUrl,
    en: enUrl,
    "en-NL": enUrl,
    "x-default": defaultUrl,
  };
}
