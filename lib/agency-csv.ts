import type { CVData } from "@/lib/cv";

export type AgencyCsvRow = Record<string, string>;

export class AgencyCsvError extends Error {
  constructor(public readonly code: "CSV_INVALID" | "CSV_DUPLICATE_HEADER" | "CSV_EMPTY_HEADER", message: string) {
    super(message);
    this.name = "AgencyCsvError";
  }
}

export function parseCsv(input: string): AgencyCsvRow[] {
  input = input.replace(/^\uFEFF/u, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }
  if (quoted) throw new AgencyCsvError("CSV_INVALID", "The CSV contains an unclosed quoted cell.");
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const headers = (rows.shift() || []).map((header) => header.trim().toLowerCase());
  if (!headers.length) return [];
  if (headers.some((header) => !header)) throw new AgencyCsvError("CSV_EMPTY_HEADER", "Every CSV column needs a header.");
  if (new Set(headers).size !== headers.length) throw new AgencyCsvError("CSV_DUPLICATE_HEADER", "CSV headers must be unique.");
  return rows
    .filter((values) => values.some((value) => value.trim()))
    .map((values) => {
      if (values.length > headers.length) throw new AgencyCsvError("CSV_INVALID", "A CSV row contains more values than headers.");
      return Object.fromEntries(headers.map((header, index) => [header, (values[index] || "").trim()]));
    });
}

export function csvEscape(value: unknown): string {
  const raw = value == null ? "" : String(value);
  const text = /^[\s]*[=+\-@]/u.test(raw) ? `'${raw}` : raw;
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function stringifyCsv(headers: string[], rows: Array<Record<string, unknown>>): string {
  return [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\r\n");
}

export function cvDataFromCsvRow(row: AgencyCsvRow): CVData {
  const skills = (row.skills || "")
    .split(/[|;]/)
    .map((skill) => skill.trim())
    .filter(Boolean)
    .map((name) => ({ name, level: 3 as const }));
  return {
    personal: {
      name: row.name || "",
      title: row.professionaltitle || row.title || "",
      resumeLanguage: "nl",
      email: row.email || "",
      phone: row.phone || "",
      location: row.location || "",
      address: "",
      postalCode: "",
      summary: row.summary || "",
      birthDate: "",
      birthPlace: "",
      nationality: "",
      driversLicense: "",
      gender: "",
      maritalStatus: "",
      linkedIn: row.linkedin || "",
      github: "",
      website: row.website || "",
      photo: "",
    },
    experience: [],
    education: [],
    skills,
    languages: [],
    internships: [],
    interests: [],
    properties: [],
    courses: [],
    awards: [],
    references: [],
    sideActivities: [],
    customSections: [],
  };
}
