import type { CVData } from "./cv";

export const WRITING_GUARD_VERSION = "2026-09-12.2";
export type WritingIssue = "NEW_NUMBER_OR_UNIT" | "NEW_NAMED_TERM" | "INFLATED_SCOPE" | "LOST_QUALIFIER" | "INVALID_TARGET";
const normal = (text: string) => text.normalize("NFKC").toLocaleLowerCase("en").replace(/\s+/g, " ").trim();
const scopeTerms = [
  /\b(manag(?:ed|e|ing)|led|leadership|supervis(?:ed|ing)|leidinggevend|leidde|aangestuurd)\b/g,
  /\b(senior|expert|specialist|certified|gecertificeerd|fluent|vloeiend|native|moedertaal|bachelor|master|phd|hbo|wo|b2|c1|c2)\b/g,
  /\b(increased|decreased|improved|reduced|verhoogd|verlaagd|verbeterd|verminderd)\b/g,
  /\b(python|javascript|typescript|sql|excel|power bi|afas|sap|salesforce|aws|azure|scrum|agile|prince2|cfa|vca)\b/g,
  /\b(english|dutch|french|german|spanish|nederlands|engels|frans|duits|spaans)\b/g,
  /\b(python|javascript|typescript|sql|excel|power bi|afas|sap|salesforce|aws|azure|scrum|agile|prince2|cfa|vca)\b/g,
];
const protectedNamedTerms = /\b(?:python|javascript|typescript|sql|excel|power bi|afas|sap|salesforce|aws|azure|scrum|agile|prince2|cfa|vca|b2|c1|c2)\b/gi;
// Ordinary sentence openings may change. Unknown capitalised terms still need
// source support, including products outside our technology list (e.g. Zendesk).
const ordinaryOpenings = new Set("i ik the a an de het een professional professioneel professionele experienced ervaren careful nauwkeurige customer klantenservice klantgerichte responsible verantwoordelijk answered handled maintained processed worked supported assisted helped developed coordinated organised organized provided delivered checked updated managed led created skilled dedicated motivated gemotiveerde demonstrated beantwoordde verwerkte controleerde werkte hield ondersteunde hielp maakte leverde verzorgde nauwkeurig klantgericht administratief administrative warehouse logistiek strong sterk proven aantoonbare focused gericht results resultaatgerichte reliable betrouwbaar adaptable flexibel collaborative samenwerkende committed betrokken knowledgeable deskundig effective effectief clear duidelijk calm rustig friendly vriendelijk solution oplossingsgericht detail details detail-oriented driven gedreven versatile veelzijdig relevant relevante experience ervaring experienced junior medior senior profile profiel specialist specialism specialistische practical praktisch analytical analytisch accurate accuraat zorgvuldig zelfstandig customer klant clients klanten teams team tasks taken responsibilities verantwoordelijkheden enquiries inquiries vragen reports rapportages overview overzicht handling".split(" "));
const numberWords: Record<string, string> = {
  one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
  een: "1", twee: "2", drie: "3", vier: "4", vijf: "5", zes: "6", zeven: "7", acht: "8", negen: "9", tien: "10",
};
function quantities(text: string): string[] {
  const normalized = normal(text).replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten|twee|drie|vier|vijf|zes|zeven|acht|negen|tien)\b/g, w => numberWords[w]);
  return normalized.match(/\b\d+(?:[.,]\d+)?\s*(?:%|[\p{L}]+)?/gu) || [];
}
function frequencies(text: string): string[] {
  const normalized = normal(text)
    .replace(/\b(daily|dagelijks)\b/g, "per day")
    .replace(/\b(weekly|wekelijks)\b/g, "per week")
    .replace(/\b(monthly|maandelijks)\b/g, "per month")
    .replace(/\b(yearly|annually|jaarlijks)\b/g, "per year")
    .replace(/\b(per|each|every|iedere|elke)\s+(dag|day|week|maand|month|jaar|year|uur|hour|dienst|shift)\b/g, (_, _prefix, unit: string) => "per " + ({ dag: "day", maand: "month", jaar: "year", uur: "hour", dienst: "shift" }[unit] || unit));
  return normalized.match(/\bper (?:day|week|month|year|hour|shift)\b/g) || [];
}

/** Conservative rejection rules, NOT a truth verifier. Vacancy/target role are never evidence. */
export function checkWritingFacts(source: string, proposed: string): WritingIssue[] {
  const issues = new Set<WritingIssue>();
  const evidence = normal(source);
  const output = normal(proposed);
  const acceptedQuantities = new Set(quantities(source));
  for (const number of quantities(proposed)) if (!acceptedQuantities.has(number)) issues.add("NEW_NUMBER_OR_UNIT");
  // Bind each quantity to its sentence's rate; equal numbers with a different
  // denominator are different claims (25/week is not 25/day).
  const sourceSentences = source.split(/[.!?\n]+/).filter(Boolean);
  for (const sentence of proposed.split(/[.!?\n]+/).filter(Boolean)) {
    const rates = frequencies(sentence);
    for (const quantity of quantities(sentence)) {
      if (!sourceSentences.some(part => quantities(part).includes(quantity) && JSON.stringify(frequencies(part).sort()) === JSON.stringify([...rates].sort()))) issues.add("NEW_NUMBER_OR_UNIT");
    }
  }
  // Capitalisation alone is not a named-entity signal: every sentence starts
  // with a capital. Protect concrete acronyms and known CV technologies.
  for (const term of proposed.match(protectedNamedTerms) || []) if (!evidence.includes(normal(term))) issues.add("NEW_NAMED_TERM");
  for (const acronym of proposed.match(/\b[A-Z][A-Z0-9+#.-]{1,12}\b/g) || []) if (acronym !== "CV" && !evidence.includes(normal(acronym))) issues.add("NEW_NAMED_TERM");
  // Product or employer names can be written in lowercase. In a tool/author
  // context, require the token to occur in the source as well; this catches
  // “using zendesk” without treating ordinary rewritten prose as a name.
  const sourceWords = new Set(evidence.match(/[\p{L}][\p{L}\p{N}+#.-]{2,}/gu) || []);
  for (const match of proposed.matchAll(/\b(?:using|with|via|through|met|bij|van|op)\s+([\p{L}][\p{L}\p{N}+#.-]{2,})/giu)) {
    const candidate = normal(match[1]);
    if (!sourceWords.has(candidate) && !ordinaryOpenings.has(candidate)) issues.add("NEW_NAMED_TERM");
  }
  for (const sentence of proposed.split(/(?<=[.!?])\s+|\n/).filter(Boolean)) {
    for (const match of sentence.matchAll(/\b[A-ZÀ-Ý][\p{L}\p{N}+#.-]*/gu)) {
      const term = normal(match[0]);
      const first = sentence.slice(0, match.index).trim().replace(/^[•\-\s]+/, "") === "";
      if (term !== "cv" && !evidence.includes(term) && !(first && ordinaryOpenings.has(term))) issues.add("NEW_NAMED_TERM");
    }
  }
  for (const pattern of scopeTerms) {
    for (const term of output.match(pattern) || []) {
      if (evidence.includes(term)) continue;
      // “lead” and “leadership” are the same scope concept when the source
      // already states it; only a genuinely new leadership claim is unsafe.
      if (/^(managed|manage|managing|led|lead|leadership|supervised|supervising|leidinggevend|leidde|aangestuurd)$/i.test(term)
        && /\b(managed|manage|managing|led|lead|leadership|supervised|supervising|leidinggevend|leidde|aangestuurd)\b/i.test(evidence)) continue;
      issues.add("INFLATED_SCOPE");
    }
  }
  // Preserve limiting language even when the model safely paraphrases the
  // sentence (for example, “helped” → “assisted”). Requiring the whole source
  // sentence verbatim was too strict and rejected harmless punctuation/order
  // changes; these small families still fail closed when a limit disappears.
  const qualifierFamilies = [
    { source: /\b(no|not|never|without|geen|niet|nooit|zonder)\b/i, output: /\b(no|not|never|without|geen|niet|nooit|zonder)\b/i },
    { source: /\b(under supervision|with supervision|onder begeleiding)\b/i, output: /\b(under supervision|with supervision|onder begeleiding|assisted|supported|helped|begeleid|ondersteunde|hielp)\b/i },
    { source: /\b(assisted|supported|helped|ondersteunde|hielp)\b/i, output: /\b(assisted|supported|helped|under supervision|onder begeleiding|begeleid|ondersteunde|hielp)\b/i },
    { source: /\b(basic|basis|learning|lerend|entry[- ]level|junior)\b/i, output: /\b(basic|basis|learning|lerend|entry[- ]level|junior)\b/i },
  ];
  for (const clause of source.split(/[.!?;,\n]+/).map(normal).filter(Boolean)) {
    for (const family of qualifierFamilies) if (family.source.test(clause) && !family.output.test(output)) issues.add("LOST_QUALIFIER");
  }
  return [...issues];
}

export function assertWritingFacts(source: CVData, proposed: CVData): void {
  const entries = new Map(source.experience.map(entry => [entry.entryId, entry]));
  if (entries.has(undefined) || entries.size !== source.experience.length || proposed.experience.length !== entries.size) throw new Error("AI_FACT_CHECK_FAILED");
  const allEvidence = [source.personal.summary, ...source.experience.map(e => [e.role, e.company, e.start, e.end, e.description, ...e.highlights].join(" ")),
    ...source.education.map(e => [e.degree, e.school, e.start, e.end, e.description].join(" ")),
    ...source.skills.map(e => e.name)].join("\n");
  // Qualifiers from unrelated experience should not force their inclusion in the summary.
  const summaryIssues: WritingIssue[] = checkWritingFacts(allEvidence, proposed.personal.summary).filter(issue => issue !== "LOST_QUALIFIER");
  if (checkWritingFacts(source.personal.summary, proposed.personal.summary).includes("LOST_QUALIFIER")) summaryIssues.push("LOST_QUALIFIER");
  if (summaryIssues.length) throw new Error("AI_FACT_CHECK_FAILED");
  for (const sentence of proposed.personal.summary.split(/[.!?\n]+/).filter(Boolean)) {
    for (const entry of source.experience) {
      if (entry.company && normal(sentence).includes(normal(entry.company))) {
        const ownEvidence = [entry.role, entry.company, entry.start, entry.end, entry.description, ...entry.highlights].join(" ");
        if (checkWritingFacts(ownEvidence, sentence).filter(issue => issue !== "LOST_QUALIFIER").length) throw new Error("AI_FACT_CHECK_FAILED");
      }
    }
  }
  const seen = new Set<string>();
  for (const entry of proposed.experience) {
    if (!entry.entryId || seen.has(entry.entryId)) throw new Error("AI_FACT_CHECK_FAILED");
    seen.add(entry.entryId);
    const original = entries.get(entry.entryId);
    if (!original) throw new Error("AI_FACT_CHECK_FAILED");
    const evidence = [original.role, original.company, original.start, original.end, original.description, ...original.highlights].join("\n");
    if (checkWritingFacts(evidence, [entry.description, ...entry.highlights].join("\n")).length) throw new Error("AI_FACT_CHECK_FAILED");
  }
}
