import type { CVData } from "./cv";

export function literalKeywordOccurs(text: string, keyword: string): boolean {
  const term = keyword.trim();
  if (!term || term.length > 120) return false;
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\p{N}])`, "iu");
  return pattern.test(text);
}

/** Literal occurrences only: a keyword occurrence does not establish proficiency. */
export function cvKeywordEvidence(data: CVData, keyword: string) {
  const term = keyword.trim();
  if (!term || term.length > 120) return [];
  const sources = [
    { section: "profile", text: data.personal.summary },
    ...data.experience.flatMap(e => [e.description, ...e.highlights].map(text => ({ section: [e.role, e.company].filter(Boolean).join(" — "), text }))),
    ...data.education.map(e => ({ section: e.school, text: [e.degree, e.description].filter(Boolean).join(" — ") })),
    ...data.skills.map(s => ({ section: "skills", text: s.name })),
  ];
  return sources.filter(source => literalKeywordOccurs(source.text, term)).slice(0, 3);
}
