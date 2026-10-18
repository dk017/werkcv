import type { CVData } from "./cv";

/**
 * LinkedIn's "Save to PDF" export is mostly English ("March 2022 - Present", "South Holland,
 * Netherlands") even when the person wants a Dutch CV. The parser keeps the source language, so this
 * puts only those fixed LinkedIn tokens into Dutch; job titles and descriptions stay as written.
 */

const MONTHS: Record<string, string> = {
  january: "januari", jan: "jan", february: "februari", feb: "feb", march: "maart", mar: "mrt",
  april: "april", apr: "apr", may: "mei", june: "juni", jun: "jun", july: "juli", jul: "jul",
  august: "augustus", aug: "aug", september: "september", sep: "sep", sept: "sep", october: "oktober",
  oct: "okt", november: "november", nov: "nov", december: "december", dec: "dec",
};

const MONTH_PATTERN = new RegExp(`\\b(${Object.keys(MONTHS).join("|")})\\b`, "gi");
const PRESENT_PATTERN = /^\s*(present|current|now)\s*$/i;

const PROVINCES: Record<string, string> = {
  "north holland": "Noord-Holland",
  "south holland": "Zuid-Holland",
  "north brabant": "Noord-Brabant",
  "zeeland": "Zeeland",
  "utrecht": "Utrecht",
  "gelderland": "Gelderland",
  "overijssel": "Overijssel",
  "flevoland": "Flevoland",
  "drenthe": "Drenthe",
  "groningen": "Groningen",
  "friesland": "Friesland",
  "limburg": "Limburg",
};

export function dutchLinkedInDate(value: string): string {
  if (!value) return value;
  if (PRESENT_PATTERN.test(value)) return "heden";
  return value.replace(MONTH_PATTERN, (month) => MONTHS[month.toLowerCase()] ?? month);
}

/** "Delft, South Holland, Netherlands" → "Delft"; "South Holland, Netherlands" → "Zuid-Holland". Dutch CVs name the city. */
export function dutchLinkedInLocation(value: string): string {
  if (!value) return value;
  const parts = value.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2 || !/^(netherlands|the netherlands|nederland)$/i.test(parts[parts.length - 1])) return value;
  parts.pop();
  if (parts.length === 2 && PROVINCES[parts[1].toLowerCase()]) return parts[0];
  if (parts.length === 1) return PROVINCES[parts[0].toLowerCase()] ?? parts[0];
  return parts.join(", ");
}

export function localizeLinkedInCvForDutch(cv: CVData): CVData {
  const dates = <T extends { start: string; end: string; location?: string }>(item: T): T => ({
    ...item,
    start: dutchLinkedInDate(item.start),
    end: dutchLinkedInDate(item.end),
    ...(typeof item.location === "string" ? { location: dutchLinkedInLocation(item.location) } : {}),
  });

  return {
    ...cv,
    personal: { ...cv.personal, location: dutchLinkedInLocation(cv.personal.location) },
    experience: cv.experience.map(dates),
    education: cv.education.map(dates),
  };
}
