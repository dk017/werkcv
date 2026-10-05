import { IND_REGISTER_PAGE_URL_EN, IND_REGISTER_URL } from "@/lib/sponsor/links";

export type SponsorLocale = "nl" | "en";

export const SPONSOR_PATHS = {
  nl: {
    checker: "/tools/erkend-referent-check",
    hub: "/erkende-referenten-lijst",
    letter: (letter: string) => `/erkende-referenten-lijst/${letter}`,
    cvCheck: "/cv-check",
    salary: "/tools/kennismigrant-salary-checker",
  },
  en: {
    checker: "/en/netherlands-visa-sponsor-checker",
    hub: "/en/netherlands-visa-sponsor-list",
    letter: (letter: string) => `/en/netherlands-visa-sponsor-list/${letter}`,
    cvCheck: "/en/cv-check",
    salary: "/tools/kennismigrant-salary-checker",
  },
} as const;

export const IND_SOURCE_URL: Record<SponsorLocale, string> = { nl: IND_REGISTER_URL, en: IND_REGISTER_PAGE_URL_EN };

export function formatRegisterDate(date: string | null, locale: SponsorLocale) {
  if (!date) return locale === "en" ? "the latest update" : "de laatste update";
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(locale === "en" ? "en-GB" : "nl-NL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export const LETTER_LABEL = (letter: string) => (letter === "0" ? "0-9" : letter.toUpperCase());

// What the checker says. It always names the matched register entries and never just "yes": the register uses
// legal names, and recognition says the employer CAN sponsor, not that a particular job qualifies.
export const RESULT_COPY = {
  en: {
    listed: {
      title: "Yes, an organisation with this name is a recognised sponsor.",
      body: "Check that the registered name below is the employer you mean. Recognition shows the employer can sponsor highly skilled migrants and other work permits. It does not mean this particular job qualifies: the salary, your qualifications and the other conditions are assessed by the IND.",
    },
    possible: {
      title: "No exact match, but these registered names are close.",
      body: "The register lists legal names, which can differ from the brand name in a job advert. Check which one, if any, is the employer. The KvK number (often in the footer of the employer's website) settles it.",
    },
    not_found: {
      title: "No organisation with this name is on the register.",
      body: "Try the legal name (often in the website footer or the advert's small print) or the KvK number. If it is still missing, the employer was not a recognised sponsor on the register date, or it is registered under a different name. Recognised sponsors for research, study or exchange are in separate IND registers that this checker does not cover.",
    },
    kvk: "KvK number",
    registerDate: (date: string) => `IND register as updated on ${date}.`,
    source: "Open the IND register",
    searching: "Searching…",
    placeholder: "Employer name or KvK number",
    button: "Check",
    label: "Employer name or KvK number",
    exact: "Exact match",
    close: "Close match",
    more: (shown: number, total: number) => `Showing ${shown} of ${total} matches. Add more of the name to narrow it down.`,
  },
  nl: {
    listed: {
      title: "Ja, een organisatie met deze naam is erkend referent.",
      body: "Controleer of de geregistreerde naam hieronder de werkgever is die je bedoelt. Erkenning laat zien dat de werkgever kennismigranten en andere werknemers uit het buitenland mag aanvragen. Het betekent niet dat deze functie in aanmerking komt: het salaris, je kwalificaties en de andere voorwaarden beoordeelt de IND.",
    },
    possible: {
      title: "Geen exacte overeenkomst, maar deze geregistreerde namen lijken erop.",
      body: "Het register gebruikt juridische namen, die kunnen afwijken van de merknaam in een vacature. Kijk welke het is, als het er al een is. Het KvK-nummer (vaak onderaan de website van de werkgever) geeft zekerheid.",
    },
    not_found: {
      title: "Geen organisatie met deze naam staat in het register.",
      body: "Probeer de juridische naam (vaak onderaan de website of in de kleine lettertjes van de vacature) of het KvK-nummer. Staat de werkgever er dan nog niet in, dan was hij op de datum van het register geen erkend referent, of staat hij onder een andere naam. Erkend referenten voor onderzoek, studie of uitwisseling staan in aparte IND-registers die deze check niet doorzoekt.",
    },
    kvk: "KvK-nummer",
    registerDate: (date: string) => `IND-register, bijgewerkt op ${date}.`,
    source: "Open het IND-register",
    searching: "Zoeken…",
    placeholder: "Naam van de werkgever of KvK-nummer",
    button: "Check",
    label: "Naam van de werkgever of KvK-nummer",
    exact: "Exacte overeenkomst",
    close: "Lijkt erop",
    more: (shown: number, total: number) => `${shown} van ${total} resultaten getoond. Vul meer van de naam in om te verfijnen.`,
  },
} as const;
