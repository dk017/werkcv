import { detectLanguageFromText } from "@/lib/cv-language";
import type { LayoutSignals } from "./layout";
import type { CvCheckItem, CvCheckLocale } from "./types";

// Dutch hiring conventions (spec §5.2 D). Deterministic and conservative: a check only fails on
// a clear signal, and personal details are reported neutrally as optional, never as a fault.

type Copy = { nl: string; en: string };
const t = (locale: CvCheckLocale, copy: Copy) => (locale === "en" ? copy.en : copy.nl);

const LANGUAGE_NAMES =
  /\b(nederlands|engels|duits|frans|spaans|italiaans|arabisch|turks|pools|dutch|english|german|french|spanish|italian|arabic|turkish|polish)\b/i;
const LANGUAGE_LEVEL =
  /\b([abc][12]|moedertaal|native|vloeiend|fluent|uitstekend|excellent|zeer goed|very good|goed|good|redelijk|basis|basic|conversational|professional working|tweetalig|bilingual)\b/i;

const SENSITIVE_ID_PATTERNS: Array<{ pattern: RegExp; label: Copy }> = [
  { pattern: /\b(bsn|burgerservicenummer|sofi-?nummer)\b/i, label: { nl: "BSN", en: "Dutch citizen service number (BSN)" } },
  { pattern: /\b(paspoort|passport|id-?kaart|identiteitskaart|identiteitsbewijs|id card)\s*(nr|nummer|number|no)\b/i, label: { nl: "paspoort- of ID-nummer", en: "passport or ID number" } },
  { pattern: /\bNL\d{2}\s?[A-Z]{4}\s?(\d{4}\s?){2}\d{2}\b/, label: { nl: "IBAN", en: "IBAN bank account" } },
];

const OPTIONAL_DETAILS: Array<{ pattern: RegExp; label: Copy }> = [
  { pattern: /\b(geboortedatum|geboren op|date of birth|born on|leeftijd|age:)/i, label: { nl: "geboortedatum of leeftijd", en: "date of birth or age" } },
  { pattern: /\b(nationaliteit|nationality)\b/i, label: { nl: "nationaliteit", en: "nationality" } },
  { pattern: /\b(burgerlijke staat|gehuwd|ongehuwd|getrouwd|samenwonend|marital status|married)\b/i, label: { nl: "burgerlijke staat", en: "marital status" } },
  { pattern: /\b(geslacht|gender)\s*:/i, label: { nl: "geslacht", en: "gender" } },
];

const EDUCATION_LEVEL =
  /\b(vmbo|mavo|havo|vwo|mbo|hbo|wo|bachelor|master|bsc|msc|phd|propedeuse|associate degree|roc|hogeschool|universiteit|university|college|niveau [1-4]|level [1-4])\b/i;

// Whole words only: a bare "zorg" prefix would match "zorgvuldig" and "verzorg" would match "verzorgd".
const CARE_EDUCATION_CONTEXT =
  /\b(zorg|zorgsector|zorginstelling|zorgmedewerker|zorgverlener|zorglocatie|zorggroep|verpleegkundige|verpleeghuis|verzorgende|verzorgende ig|kinderopvang|bso|pedagogisch medewerker|pedagogische|onderwijs|onderwijsassistent|leerkracht|docent|basisschool|jeugdzorg|jeugdwerk|gehandicaptenzorg|ouderenzorg|thuiszorg|ggz|woonbegeleider|begeleider)\b/i;
const BIG_ROLES = /\b(verpleegkundige|arts|basisarts|fysiotherapeut|apotheker|verloskundige|tandarts|psycholoog|gz-psycholoog|physician|nurse)\b/i;
const DRIVING_ROLES = /\b(chauffeur|bezorger|koerier|buitendienst|servicemonteur|monteur|vertegenwoordiger|accountmanager buitendienst|delivery driver|driver)\b/i;
const DRIVING_REQUIRED = /\b(rijbewijs|driving licen[cs]e|driver'?s licen[cs]e)\b/i;

function firstMatch(text: string, pattern: RegExp): string | null {
  const match = text.match(pattern);
  return match ? match[0] : null;
}

function languageLines(text: string): string[] {
  return text.split("\n").filter((line) => LANGUAGE_NAMES.test(line) && line.length < 160);
}

export function dutchConventionChecks(input: {
  cvText: string;
  vacancyText: string | null;
  layout: LayoutSignals;
  wordCount: number;
  locale: CvCheckLocale;
}): CvCheckItem[] {
  const { cvText, vacancyText, layout, wordCount, locale } = input;
  const checks: CvCheckItem[] = [];
  const context = `${cvText}\n${vacancyText ?? ""}`;

  // Languages with levels.
  const languages = languageLines(cvText);
  const withoutLevel = languages.filter((line) => !LANGUAGE_LEVEL.test(line));
  checks.push({
    id: "nl_language_levels",
    category: "dutch",
    severity: "important",
    status: languages.length === 0 ? "fail" : withoutLevel.length === 0 ? "pass" : "fail",
    credit: languages.length === 0 ? 0 : withoutLevel.length === 0 ? 1 : 0.5,
    weight: 3,
    label: t(locale, { nl: "Talen met niveau", en: "Languages with level" }),
    evidence: languages.length ? languages.slice(0, 3).join(" · ").slice(0, 160) : null,
    fix:
      languages.length === 0
        ? t(locale, {
            nl: "Voeg een kopje Talen toe met je niveau per taal, bijvoorbeeld 'Nederlands: moedertaal' en 'Engels: C1'.",
            en: "Add a Languages section with a level per language, for example 'English: native' and 'Dutch: B1 (CEFR)'.",
          })
        : withoutLevel.length
          ? t(locale, {
              nl: "Noem bij elke taal een niveau: moedertaal of een ERK-niveau (A1–C2). Werkgevers vragen vaak om B2 of hoger.",
              en: "Give each language a level: native or a CEFR level (A1–C2). Dutch employers often ask for B2 or higher.",
            })
          : null,
  });

  // Sensitive identifiers: never on a CV.
  const sensitive = SENSITIVE_ID_PATTERNS.filter(({ pattern }) => pattern.test(cvText));
  checks.push({
    id: "nl_no_sensitive_ids",
    category: "dutch",
    severity: "critical",
    status: sensitive.length ? "fail" : "pass",
    weight: 3,
    label: t(locale, { nl: "Geen BSN, ID- of bankgegevens", en: "No BSN, ID or bank details" }),
    evidence: sensitive.length ? sensitive.map(({ label }) => t(locale, label)).join(", ") : null,
    fix: sensitive.length
      ? t(locale, {
          nl: "Haal dit weg uit je cv. Een werkgever vraagt je BSN en ID pas bij indiensttreding; op een cv vergroot het alleen het risico op misbruik.",
          en: "Remove this from your CV. Employers only ask for your BSN and ID when you are hired; on a CV it only adds fraud risk.",
        })
      : null,
  });

  // Optional personal details: neutral information, never a failure.
  const optional = OPTIONAL_DETAILS.filter(({ pattern }) => pattern.test(cvText)).map(({ label }) => t(locale, label));
  checks.push({
    id: "nl_optional_personal_details",
    category: "dutch",
    severity: "tip",
    status: optional.length ? "info" : "not_applicable",
    weight: 0,
    label: t(locale, { nl: "Optionele persoonsgegevens", en: "Optional personal details" }),
    evidence: optional.length ? optional.join(", ") : null,
    fix: optional.length
      ? t(locale, {
          nl: "Dit is in Nederland niet verplicht. Je mag het laten staan of weglaten; het zegt niets over je geschiktheid.",
          en: "This is not required in the Netherlands. You may keep it or leave it out; it says nothing about your suitability.",
        })
      : null,
  });

  // Length: 1–2 pages is the Dutch norm for most roles.
  const pages = layout.pageCount ?? Math.max(1, Math.ceil(wordCount / 450));
  checks.push({
    id: "nl_length",
    category: "dutch",
    severity: pages > 3 ? "important" : "tip",
    status: pages <= 2 ? "pass" : "fail",
    credit: pages <= 2 ? 1 : pages === 3 ? 0.5 : 0,
    weight: 2,
    label: t(locale, { nl: "Lengte 1–2 pagina's", en: "Length of 1–2 pages" }),
    evidence: layout.pageCount
      ? t(locale, { nl: `${layout.pageCount} pagina's`, en: `${layout.pageCount} pages` })
      : t(locale, { nl: `ca. ${wordCount} woorden`, en: `about ${wordCount} words` }),
    fix:
      pages > 2
        ? t(locale, {
            nl: "Kort in tot maximaal twee pagina's: vat oude of minder relevante functies samen in één regel.",
            en: "Trim to two pages at most: summarise older or less relevant roles in one line.",
          })
        : null,
  });

  // Education with a recognisable level.
  const educationLines = cvText.split("\n").filter((line) => /\b(opleiding|education|diploma|studie)\b/i.test(line));
  const hasLevel = EDUCATION_LEVEL.test(cvText);
  checks.push({
    id: "nl_education_level",
    category: "dutch",
    severity: "important",
    status: hasLevel ? "pass" : "fail",
    weight: 2,
    label: t(locale, { nl: "Opleidingsniveau herkenbaar", en: "Education level recognisable" }),
    evidence: firstMatch(cvText, EDUCATION_LEVEL) ?? (educationLines[0]?.slice(0, 120) || null),
    fix: hasLevel
      ? null
      : t(locale, {
          nl: "Noem het niveau van je opleiding (bijv. mbo niveau 4, hbo of wo). Vacatures vragen vaak om een 'werk- en denkniveau'. Heb je een buitenlands diploma, vermeld dan het Nederlandse vergelijkbare niveau als je dat weet (IDW/Nuffic).",
          en: "State the level of your education (e.g. MBO level 4, HBO/bachelor, WO/master). Dutch vacancies often ask for a 'werk- en denkniveau'. For a foreign degree, add the Dutch equivalent if you know it (IDW/Nuffic evaluation).",
        }),
  });

  // Role signals: VOG, BIG, driving licence, only when the CV or vacancy points at the domain.
  const vogContext = firstMatch(context, CARE_EDUCATION_CONTEXT);
  const hasVog = /\bvog\b|verklaring omtrent (het )?gedrag|certificate of conduct/i.test(cvText);
  checks.push({
    id: "nl_vog",
    category: "dutch",
    severity: "tip",
    status: !vogContext ? "not_applicable" : hasVog ? "pass" : "fail",
    weight: vogContext ? 1 : 0,
    label: t(locale, { nl: "VOG vermeld (zorg, onderwijs, kinderopvang)", en: "VOG mentioned (care, education, childcare)" }),
    evidence: vogContext,
    fix:
      vogContext && !hasVog
        ? t(locale, {
            nl: "Heb je een geldige VOG (Verklaring Omtrent het Gedrag)? Vermeld dat dan kort, bijvoorbeeld onder Certificaten. Heb je die niet, laat het weg.",
            en: "If you have a valid VOG (certificate of conduct), mention it briefly, e.g. under Certificates. If you don't, leave it out.",
          })
        : null,
  });

  const bigRole = firstMatch(context, BIG_ROLES);
  // Uppercase BIG or an explicit registration phrase; plain "big" would match "big data".
  const hasBig = /\bBIG\b/.test(cvText) || /\bbig[- ](registratie|geregistreerd|registered|registration|nummer|number)\b/i.test(cvText);
  checks.push({
    id: "nl_big",
    category: "dutch",
    severity: "important",
    status: !bigRole ? "not_applicable" : hasBig ? "pass" : "fail",
    weight: bigRole ? 2 : 0,
    label: t(locale, { nl: "BIG-registratie vermeld", en: "BIG registration mentioned" }),
    evidence: bigRole,
    fix:
      bigRole && !hasBig
        ? t(locale, {
            nl: "Voor BIG-beroepen verwachten werkgevers je BIG-registratie. Vermeld dat je BIG-geregistreerd bent (het nummer mag, maar is niet nodig), als dat klopt.",
            en: "For regulated healthcare roles, employers expect your BIG registration. State that you are BIG-registered (the number is optional), if true.",
          })
        : null,
  });

  const drivingContext =
    (vacancyText && firstMatch(vacancyText, DRIVING_REQUIRED)) || firstMatch(context, DRIVING_ROLES);
  const hasLicence = /\brijbewijs\b|driving licen[cs]e|driver'?s licen[cs]e/i.test(cvText);
  checks.push({
    id: "nl_driving_licence",
    category: "dutch",
    severity: vacancyText && DRIVING_REQUIRED.test(vacancyText) ? "important" : "tip",
    status: !drivingContext ? "not_applicable" : hasLicence ? "pass" : "fail",
    weight: drivingContext ? 1 : 0,
    label: t(locale, { nl: "Rijbewijs vermeld waar relevant", en: "Driving licence mentioned where relevant" }),
    evidence: drivingContext,
    fix:
      drivingContext && !hasLicence
        ? t(locale, {
            nl: "Heb je een rijbewijs (bijv. B)? Zet het bij je persoonlijke gegevens of vaardigheden.",
            en: "Do you have a driving licence (e.g. B)? Add it to your personal details or skills.",
          })
        : null,
  });

  // CV language vs vacancy language.
  if (vacancyText && vacancyText.length > 200) {
    const cvLanguage = detectLanguageFromText(cvText);
    const vacancyLanguage = detectLanguageFromText(vacancyText);
    const mismatch = cvLanguage !== "unknown" && vacancyLanguage !== "unknown" && cvLanguage !== vacancyLanguage;
    checks.push({
      id: "nl_cv_language_matches_vacancy",
      category: "dutch",
      severity: "important",
      status: mismatch ? "fail" : "pass",
      weight: 2,
      label: t(locale, { nl: "Taal van cv past bij vacature", en: "CV language matches the vacancy" }),
      evidence: mismatch ? `cv: ${cvLanguage} · vacature: ${vacancyLanguage}` : null,
      fix: mismatch
        ? t(locale, {
            nl: "Schrijf je cv in de taal van de vacature. Een Nederlandstalige vacature verwacht meestal een Nederlands cv, tenzij de vacature anders vraagt.",
            en: "Write your CV in the language of the vacancy. A Dutch-language vacancy usually expects a Dutch CV unless it says otherwise.",
          })
        : null,
    });
  }

  return checks;
}
