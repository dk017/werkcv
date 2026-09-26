// "Zo leest een systeem je cv": what a text-based parser can find in the CV, computed
// deterministically so it is honest and repeatable (spec §5.2 A, §5.6b).

export type ParsePreview = {
  email: string | null;
  phone: string | null;
  linkedin: boolean;
  /** Standard section headings found, by id. */
  sections: Array<"profile" | "experience" | "education" | "skills" | "languages">;
  /** Number of date ranges such as "2021 - 2023" or "januari 2023 - heden". */
  datedPeriods: number;
  /** First non-empty line: most parsers take the name from here. */
  firstLine: string | null;
};

const SECTION_ALIASES: Record<ParsePreview["sections"][number], string[]> = {
  profile: ["profiel", "profieltekst", "over mij", "samenvatting", "persoonlijk profiel", "profile", "summary", "about me", "professional summary"],
  experience: ["werkervaring", "ervaring", "beroepservaring", "experience", "work experience", "professional experience", "employment history"],
  education: ["opleiding", "opleidingen", "onderwijs", "education"],
  skills: ["vaardigheden", "competenties", "skills", "technical skills", "key skills"],
  languages: ["talen", "talenkennis", "languages", "language skills"],
};

const MONTH = "(?:jan(?:uari|uary)?|feb(?:ruari|ruary)?|m(?:aa)?rt|march|apr(?:il)?|mei|may|jun[ie]?|jul[iy]?|aug(?:ustus)?|sep(?:tember)?|okt(?:ober)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
const DATE_POINT = `(?:(?:${MONTH}\\.?\\s+|\\d{1,2}[-/.])?(?:19|20)\\d{2})`;
const DATE_RANGE = new RegExp(
  `${DATE_POINT}\\s*(?:-|–|—|tot|to|t/m)\\s*(?:${DATE_POINT}|heden|nu|present|current|now)`,
  "gi",
);

function normalizeHeading(line: string): string {
  return line.toLowerCase().replace(/[:|]+$/g, "").replace(/\s+/g, " ").trim();
}

export function buildParsePreview(cvText: string): ParsePreview {
  const lines = cvText.split("\n").map((line) => line.trim()).filter(Boolean);
  const headings = new Set(lines.filter((line) => line.length <= 40).map(normalizeHeading));

  const sections = (Object.keys(SECTION_ALIASES) as ParsePreview["sections"]).filter((id) =>
    SECTION_ALIASES[id].some((alias) => headings.has(alias)),
  );

  return {
    email: cvText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? null,
    phone: cvText.match(/(?:\+31|0031|0)[\s-]?(?:6|[1-9]\d)(?:[\s-]?\d){7,8}/)?.[0]?.trim() ?? null,
    linkedin: /linkedin\.com\/in\//i.test(cvText),
    sections,
    datedPeriods: (cvText.match(DATE_RANGE) ?? []).length,
    firstLine: lines[0]?.slice(0, 80) ?? null,
  };
}
