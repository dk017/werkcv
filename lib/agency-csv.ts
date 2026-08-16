import type { CVData } from "@/lib/cv";

export type AgencyCsvRow = Record<string, string>;

export function parseCsv(input: string): AgencyCsvRow[] {
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
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const headers = (rows.shift() || []).map((header) => header.trim().toLowerCase());
  if (!headers.length) return [];
  return rows
    .filter((values) => values.some((value) => value.trim()))
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] || "").trim()])));
}

export function csvEscape(value: unknown): string {
  const text = value == null ? "" : String(value);
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
