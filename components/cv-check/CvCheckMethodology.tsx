import Link from "next/link";
import { CATEGORY_LABELS, CRITICAL_CAP_SCORE, GENERAL_WEIGHTS, VACANCY_WEIGHTS, toGrade } from "@/lib/cv-check/score";
import { CV_CHECK_SCORE_VERSION, type CvCheckLocale } from "@/lib/cv-check/types";

type Category = keyof typeof GENERAL_WEIGHTS;

const COPY = {
  nl: {
    eyebrow: `Methodologie · versie ${CV_CHECK_SCORE_VERSION}`,
    h1: "Zo berekent de CV-check je cijfer",
    intro: "We publiceren welke controles we doen en hoe zwaar ze meetellen, zodat je het cijfer kunt controleren en begrijpen.",
    isTitle: "Wat het cijfer wel en niet is",
    is: [
      "Een samenvatting van controleerbare punten in je cv, als rapportcijfer van 1 tot 10.",
      "Geen voorspelling of garantie van een uitnodiging, en geen simulatie van één specifiek sollicitatiesysteem.",
      "Sollicitatiesystemen wijzen cv's zelden automatisch af. Ze lezen je gegevens uit en recruiters zoeken en filteren erin. Daarom kijken we naar leesbaarheid, inhoud en aansluiting, niet naar een verzonnen 'ATS-score'.",
    ],
    weightsTitle: "Onderdelen en weging",
    colPart: "Onderdeel",
    colGeneral: "Zonder vacature",
    colVacancy: "Met vacature",
    vacancyRow: "Aansluiting op de vacature",
    details: {
      parsing: [
        "Leesbare tekst: een gescande pdf of foto telt als ernstig probleem.",
        "Leesvolgorde: we meten hoeveel regels twee kolommen naast elkaar hebben.",
        "Word-bestanden: contactgegevens alleen in kop- of voettekst, en tekstvakken.",
        "Standaardkopjes, consistente datumnotatie, bestandsgrootte en bestandsnaam.",
      ],
      basics: ["E-mail, telefoon, woonplaats en LinkedIn.", "Opleiding en vaardigheden aanwezig."],
      content: [
        "Profieltekst: aanwezig, lengte, jaren ervaring, geen holle containerwoorden.",
        "Werkervaring: meetbare resultaten, actieve werkwoorden, data bij functies.",
        "Taalgebruik: consistente taal, geen ik-vorm, leesbare kopjes.",
      ],
      dutch: [
        "Taalniveaus: moedertaal of een ERK-niveau (A1–C2) per taal.",
        "Herkenbaar opleidingsniveau (mbo, hbo, wo) en lengte van 1–2 pagina's.",
        "Geen BSN, paspoort-, ID- of bankgegevens (ernstig probleem).",
        "VOG, BIG-registratie en rijbewijs alleen als de rol of vacature erom vraagt.",
        "Foto, geboortedatum, nationaliteit en burgerlijke staat: alleen ter info, ze tellen niet mee.",
      ],
    } satisfies Record<Category, string[]>,
    gradeTitle: "Van score naar cijfer",
    grade: (cap: string) => [
      "Elke controle heeft een gewicht binnen zijn onderdeel; deels goed levert deels punten op. Controles die voor jouw cv niet gelden, tellen niet mee.",
      "De onderdelen tellen mee volgens de tabel hierboven en vormen samen een score van 0 tot 100. Die zetten we om naar een cijfer: 0 wordt 1,0 en 100 wordt 10,0.",
      `Een ernstig probleem, zoals een gescande pdf of je BSN op je cv, houdt het cijfer op maximaal ${cap} tot je het oplost.`,
      "Onvoldoende onder 5,5 · voldoende tot 7,0 · goed tot 8,5 · uitstekend vanaf 8,5.",
    ],
    aiTitle: "Wat regels doen en wat AI doet",
    ai: [
      "Het cijfer wordt altijd in code berekend. AI geeft nooit zelf een cijfer.",
      "Opbouw, contactgegevens, data, lengte, taalniveaus en gevoelige gegevens controleren we met vaste regels.",
      "AI helpt bij oordelen die taal vragen: holle woorden in je profiel, de kracht van je werkwoorden, en bij een vacature welke eisen erin staan en of je cv die aantoont. Elke eis komt met een letterlijk citaat uit de vacature, en waar mogelijk uit je cv.",
      "We passen Nederlandse regels toe: moedertaal telt als het hoogste taalniveau, een gelijk of hoger opleidingsniveau voldoet aan een 'werk- en denkniveau', en een 'pre' is een pluspunt, geen harde eis.",
      "AI raadt je nooit aan ervaring te claimen die je niet hebt, en beoordeelt geen persoonlijke kenmerken zoals leeftijd, afkomst of geslacht.",
    ],
    privacyTitle: "Privacy",
    privacy:
      "Je cv en de vacaturetekst worden alleen voor deze check gebruikt en niet opgeslagen. In logbestanden en statistieken bewaren we geen cv-tekst, alleen technische gegevens zoals de duur van de check en welke controles niet slaagden. Zie ook onze",
    privacyLink: { href: "/privacy", label: "privacyverklaring" },
    back: { href: "/cv-check", label: "Terug naar de CV-check" },
  },
  en: {
    eyebrow: `Methodology · version ${CV_CHECK_SCORE_VERSION}`,
    h1: "How the CV check calculates your grade",
    intro: "We publish which checks we run and how much each one counts, so you can verify and understand your grade.",
    isTitle: "What the grade is and is not",
    is: [
      "A summary of verifiable points in your CV, as a grade from 1 to 10 (the Dutch school scale, where 5.5 is a pass).",
      "Not a prediction or guarantee of an interview, and not a simulation of one specific application system.",
      "Application systems rarely reject CVs automatically. They extract your details and recruiters search and filter them. That is why we look at readability, content and fit, not at an invented 'ATS score'.",
    ],
    weightsTitle: "Parts and weights",
    colPart: "Part",
    colGeneral: "Without job ad",
    colVacancy: "With job ad",
    vacancyRow: "Fit with the job ad",
    details: {
      parsing: [
        "Readable text: a scanned PDF or photo counts as a critical problem.",
        "Reading order: we measure how many lines sit side by side in two columns.",
        "Word files: contact details only in a header or footer, and text boxes.",
        "Standard headings, consistent date format, file size and file name.",
      ],
      basics: ["Email, phone, city and LinkedIn.", "Education and skills present."],
      content: [
        "Profile: present, length, years of experience, no empty buzzwords.",
        "Experience: measurable results, active verbs, dates for each role.",
        "Language: one consistent language, no first-person sentences, readable headings.",
      ],
      dutch: [
        "Language levels: native or a CEFR level (A1–C2) for each language.",
        "A recognisable education level (MBO, HBO, WO) and a length of 1–2 pages.",
        "No BSN, passport, ID or bank details (critical problem).",
        "VOG, BIG registration and driving licence only when the role or job ad asks for them.",
        "Photo, date of birth, nationality and marital status: for information only, they never count.",
      ],
    } satisfies Record<Category, string[]>,
    gradeTitle: "From score to grade",
    grade: (cap: string) => [
      "Each check has a weight within its part; partly met earns partial credit. Checks that do not apply to your CV are left out.",
      "The parts count as shown in the table above and add up to a score from 0 to 100, which we convert to a grade: 0 becomes 1.0 and 100 becomes 10.0.",
      `A critical problem, such as a scanned PDF or your BSN on your CV, keeps the grade at ${cap} at most until you fix it.`,
      "Below 5.5 insufficient · up to 7.0 sufficient · up to 8.5 good · 8.5 and above excellent.",
    ],
    aiTitle: "What rules do and what AI does",
    ai: [
      "The grade is always calculated in code. AI never sets a grade.",
      "Structure, contact details, dates, length, language levels and sensitive data are checked with fixed rules.",
      "AI helps with judgements that need language understanding: empty words in your profile, the strength of your verbs and, with a job ad, which requirements it contains and whether your CV shows them. Every requirement comes with a literal quote from the job ad, and where possible from your CV.",
      "We apply Dutch conventions: native counts as the highest language level, an equal or higher education level meets a requested 'working and thinking level', and a 'pre' is a plus, not a hard requirement.",
      "AI never suggests claiming experience you do not have, and never judges personal characteristics such as age, background or gender.",
    ],
    privacyTitle: "Privacy",
    privacy:
      "Your CV and the job ad are only used for this check and are not stored. Logs and statistics contain no CV text, only technical data such as how long the check took and which checks did not pass. See also our",
    privacyLink: { href: "/en/privacy", label: "privacy policy" },
    back: { href: "/en/cv-check", label: "Back to the CV check" },
  },
} as const;

export default function CvCheckMethodology({ locale }: { locale: CvCheckLocale }) {
  const copy = COPY[locale];
  const categories = Object.keys(GENERAL_WEIGHTS) as Category[];
  const cap = toGrade(CRITICAL_CAP_SCORE).toLocaleString(locale === "en" ? "en-GB" : "nl-NL");

  return (
    <main className="wk-section">
      <div className="wk-container max-w-3xl space-y-10">
        <header>
          <p className="wk-eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--wk-ink)]">{copy.h1}</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--wk-ink-muted)]">{copy.intro}</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.isTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--wk-ink-muted)]">
            {copy.is.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.weightsTitle}</h2>
          <div className="wk-table-scroll-hint mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--wk-border)]">
                  <th className="py-2 pr-4">{copy.colPart}</th>
                  <th className="py-2 pr-4">{copy.colGeneral}</th>
                  <th className="py-2">{copy.colVacancy}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--wk-border)]">
                  <td className="py-2 pr-4 font-semibold">{copy.vacancyRow}</td>
                  <td className="py-2 pr-4">–</td>
                  <td className="py-2">{VACANCY_WEIGHTS.vacancy}%</td>
                </tr>
                {categories.map((id) => (
                  <tr key={id} className="border-b border-[var(--wk-border)]">
                    <td className="py-2 pr-4 font-semibold">{CATEGORY_LABELS[id][locale]}</td>
                    <td className="py-2 pr-4">{GENERAL_WEIGHTS[id]}%</td>
                    <td className="py-2">{VACANCY_WEIGHTS[id] ? `${VACANCY_WEIGHTS[id]}%` : "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 space-y-5">
            {categories.map((id) => (
              <div key={id}>
                <h3 className="font-semibold text-[var(--wk-ink)]">{CATEGORY_LABELS[id][locale]}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--wk-ink-muted)]">
                  {copy.details[id].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.gradeTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--wk-ink-muted)]">
            {copy.grade(cap).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.aiTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--wk-ink-muted)]">
            {copy.ai.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.privacyTitle}</h2>
          <p className="mt-3 text-[var(--wk-ink-muted)]">
            {copy.privacy}{" "}
            <Link href={copy.privacyLink.href} className="font-semibold underline underline-offset-4">
              {copy.privacyLink.label}
            </Link>
            .
          </p>
        </section>

        <p>
          <Link href={copy.back.href} className="wk-button wk-button-primary">
            {copy.back.label}
          </Link>
        </p>
      </div>
    </main>
  );
}
