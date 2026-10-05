import Link from "next/link";
import { notFound } from "next/navigation";
import JobPassCallout from "@/components/pricing/JobPassCallout";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { LIST_LETTERS, entriesForLetter, type SponsorRegister } from "@/lib/sponsor/register";
import { getSponsorRegister } from "@/lib/sponsor/store";
import SponsorChecker from "./SponsorChecker";
import { IND_SOURCE_URL, LETTER_LABEL, SPONSOR_PATHS, formatRegisterDate, type SponsorLocale } from "./copy";

// Public pages for the IND register of recognised sponsors: the checker, the A-Z hub and the letter pages.
// All use the register held in memory (lib/sponsor/store), so they render on request, never at build time.

async function loadRegister(): Promise<SponsorRegister | null> {
  try {
    return await getSponsorRegister();
  } catch {
    return null;
  }
}

const number = (value: number, locale: SponsorLocale) => value.toLocaleString(locale === "en" ? "en-GB" : "nl-NL");

const LINK = "font-semibold underline underline-offset-4";

const COPY = {
  en: {
    toolBreadcrumb: "Netherlands visa sponsor checker",
    hubBreadcrumb: "Visa sponsor list A–Z",
    home: { label: "Home", href: "/en" },
    tools: { label: "Tools", href: "/tools" },
    tool: {
      eyebrow: "Free tool · IND register",
      h1: "Netherlands visa sponsor checker",
      intro: (count: string | null) =>
        `Check whether an employer is a recognised sponsor (erkend referent) on the IND public register. Recognised sponsors are the employers that can hire highly skilled migrants (kennismigranten) and apply for other work permits. Enter a name or a KvK number${count ? `: one search checks all ${count} organisations on the register` : ""}.`,
      whatTitle: "What a recognised sponsor is",
      what: [
        "A recognised sponsor is a company, school or organisation that the IND (Immigration and Naturalisation Service) has recognised. Only a recognised sponsor can apply for a highly skilled migrant residence permit for an employee.",
        "The register lists the organisation's legal name and its KvK (Chamber of Commerce) number. It does not say which jobs an employer sponsors, how many people, or whether it is hiring.",
      ],
      stepsTitle: "Before you apply: three checks",
      steps: [
        { title: "Is the employer a recognised sponsor?", body: "This checker answers that one." },
        { title: "Does the salary meet the highly skilled migrant threshold?", body: "The thresholds depend on your age and situation.", link: { label: "Use the salary checker", href: SPONSOR_PATHS.en.salary } },
        { title: "Does the job and your background qualify?", body: "The IND decides this when the employer applies. Read the IND's own requirements before you plan around a sponsored job." },
      ],
      browseTitle: "Looking for a list of sponsors?",
      browse: (count: string | null) => `The full list${count ? ` of ${count} recognised sponsors` : ""} is in one place, A to Z, with the legal names and KvK numbers as the IND publishes them.`,
      browseLink: "Browse the sponsor list A–Z",
      faqTitle: "Questions",
      faq: [
        { question: "What is a recognised sponsor (erkend referent)?", answer: "A company, school or organisation that the IND has recognised, so it can apply for residence permits for people such as employees, au pairs or students. For work, the register this checker uses covers regular labour and highly skilled migrants." },
        { question: "Does a recognised sponsor have to sponsor my job?", answer: "No. Recognition shows the employer is able to sponsor. Whether it does for a particular job is the employer's decision, and the IND still assesses the application, including the salary." },
        { question: "Why can't I find my employer?", answer: "Search the legal name (often in the website footer) or the KvK number. Brand names often differ from legal names. A newly recognised sponsor appears after the IND's next monthly update. Recognised sponsors for research, study or exchange are in separate IND registers that this checker does not cover." },
        { question: "How up to date is the result?", answer: "The IND updates the register once a month. This checker reads it every day and shows the date the IND gives, under each result." },
        { question: "Is this an official answer?", answer: "No. It searches the IND's public register, but the IND is the official source and this is not legal advice. WerkCV is not affiliated with the IND." },
      ],
      related: "Next steps for your application",
      cvLinks: [
        { label: "CV for highly skilled migrants in the Netherlands", href: "/en/highly-skilled-migrant-cv-netherlands" },
        { label: "Expat CV for the Netherlands", href: "/en/expat-cv-netherlands" },
        { label: "Dutch CV for expats", href: "/en/dutch-cv-for-expats" },
      ],
      source: "Source",
      sourceText: "IND public register of recognised sponsors, work (regular labour and highly skilled migrants)",
    },
    hub: {
      eyebrow: "Updated monthly · IND register",
      h1: "Netherlands visa sponsor list: all recognised sponsors A–Z",
      intro: (count: string, date: string) =>
        `The full list of ${count} organisations on the IND register of recognised sponsors for work and highly skilled migrants, as updated on ${date}. Search a name, or browse by letter. Each entry shows the legal name and KvK number, as the IND publishes them.`,
      unavailable: "The register is temporarily unavailable. Please try again shortly, or open the IND's public register.",
      browseTitle: "Browse by letter",
      howTitle: "How to use this list",
      how: [
        "Find the employer by legal name, or search it above. Brand names often differ from legal names.",
        "Check the KvK number on the employer's website or in the Chamber of Commerce register.",
        "A listing shows the employer can sponsor. It does not show that it is hiring, or that a job qualifies. Look at the employer's own vacancies.",
        "Check the salary against the highly skilled migrant threshold before you apply.",
      ],
      salaryLink: "Check the salary threshold",
      faqTitle: "Questions",
      faq: [
        { question: "Is every company on this list hiring?", answer: "No. The list shows which organisations are recognised sponsors, not who has vacancies. It also gives no jobs, salaries or sizes." },
        { question: "Where does the list come from?", answer: "From the IND's public register of recognised sponsors for work (regular labour and highly skilled migrants). We copy it as published and refresh it daily. The IND updates it once a month." },
        { question: "Why are some well-known companies missing?", answer: "Some use a different legal name, and some are not recognised sponsors. Search the legal name or the KvK number, or check the IND's register directly." },
      ],
    },
    letter: {
      h1: (label: string) => `Recognised sponsors starting with ${label}`,
      intro: (count: string, label: string, date: string) =>
        `${count} organisations on the IND register of recognised sponsors start with ${label}, as updated on ${date}. Each entry shows the legal name and KvK number.`,
      emptyLetter: "No organisations start with this character on the current register.",
      back: "All letters",
      prev: "Previous",
      next: "Next",
      kvk: "KvK",
      count: (count: string) => `${count} organisations`,
    },
  },
  nl: {
    toolBreadcrumb: "Erkend referent check",
    hubBreadcrumb: "Erkende referenten A–Z",
    home: { label: "Home", href: "/" },
    tools: { label: "Tools", href: "/tools" },
    tool: {
      eyebrow: "Gratis tool · IND-register",
      h1: "Erkend referent check",
      intro: (count: string | null) =>
        `Check of een werkgever erkend referent is in het openbaar register van de IND. Erkend referenten zijn de werkgevers die kennismigranten mogen aanvragen en andere werknemers uit het buitenland. Vul een naam of KvK-nummer in${count ? `: één zoekopdracht doorzoekt alle ${count} organisaties in het register` : ""}.`,
      whatTitle: "Wat een erkend referent is",
      what: [
        "Een erkend referent is een bedrijf, school of organisatie die de IND (Immigratie- en Naturalisatiedienst) heeft erkend. Alleen een erkend referent kan voor een werknemer een verblijfsvergunning als kennismigrant aanvragen.",
        "Het register toont de juridische naam en het KvK-nummer van de organisatie. Het zegt niet voor welke functies een werkgever aanvraagt, voor hoeveel mensen, of dat de werkgever vacatures heeft.",
      ],
      stepsTitle: "Voordat je solliciteert: drie checks",
      steps: [
        { title: "Is de werkgever erkend referent?", body: "Die vraag beantwoordt deze check." },
        { title: "Haalt het salaris de kennismigrantennorm?", body: "De normen hangen af van je leeftijd en situatie.", link: { label: "Gebruik de salaris-check", href: SPONSOR_PATHS.nl.salary } },
        { title: "Komen de functie en je achtergrond in aanmerking?", body: "Dat beoordeelt de IND zodra de werkgever aanvraagt. Lees de eisen van de IND zelf voordat je op een sponsorbaan rekent." },
      ],
      browseTitle: "Zoek je een lijst met erkend referenten?",
      browse: (count: string | null) => `De volledige lijst${count ? ` van ${count} erkend referenten` : ""} staat op één plek, van A tot Z, met juridische namen en KvK-nummers zoals de IND ze publiceert.`,
      browseLink: "Bekijk de lijst van A tot Z",
      faqTitle: "Vragen",
      faq: [
        { question: "Wat is een erkend referent?", answer: "Een bedrijf, school of organisatie die de IND heeft erkend, zodat het verblijfsvergunningen kan aanvragen voor bijvoorbeeld werknemers, au pairs of studenten. Voor werk doorzoekt deze check het register voor regulier arbeid en kennismigranten." },
        { question: "Moet een erkend referent mijn baan sponsoren?", answer: "Nee. Erkenning laat zien dat de werkgever kan aanvragen. Of dat voor een bepaalde functie gebeurt, beslist de werkgever, en de IND beoordeelt de aanvraag nog, ook het salaris." },
        { question: "Waarom vind ik mijn werkgever niet?", answer: "Zoek op de juridische naam (vaak onderaan de website) of het KvK-nummer. Merknamen wijken vaak af van juridische namen. Een nieuw erkend referent staat er na de volgende maandelijkse update van de IND. Erkend referenten voor onderzoek, studie of uitwisseling staan in aparte IND-registers die deze check niet doorzoekt." },
        { question: "Hoe actueel is het resultaat?", answer: "De IND werkt het register één keer per maand bij. Deze check leest het elke dag en toont onder elk resultaat de datum die de IND geeft." },
        { question: "Is dit een officieel antwoord?", answer: "Nee. De check doorzoekt het openbaar register van de IND, maar de IND is de officiële bron en dit is geen juridisch advies. WerkCV is niet gelieerd aan de IND." },
      ],
      related: "Volgende stappen voor je sollicitatie",
      cvLinks: [
        { label: "CV maken voor kennismigranten (Engels)", href: "/en/highly-skilled-migrant-cv-netherlands" },
        { label: "Gratis cv-check", href: "/cv-check" },
        { label: "CV maken in de editor", href: "/editor?template=professional" },
      ],
      source: "Bron",
      sourceText: "Openbaar register erkende referenten van de IND, arbeid (regulier en kennismigranten)",
    },
    hub: {
      eyebrow: "Maandelijks bijgewerkt · IND-register",
      h1: "Erkende referenten lijst: alle erkend referenten van A tot Z",
      intro: (count: string, date: string) =>
        `De volledige lijst van ${count} organisaties in het IND-register van erkend referenten voor arbeid en kennismigranten, bijgewerkt op ${date}. Zoek een naam of blader per letter. Elke regel toont de juridische naam en het KvK-nummer, zoals de IND ze publiceert.`,
      unavailable: "Het register is tijdelijk niet beschikbaar. Probeer het zo opnieuw, of open het openbaar register van de IND.",
      browseTitle: "Blader per letter",
      howTitle: "Zo gebruik je deze lijst",
      how: [
        "Zoek de werkgever op juridische naam, of zoek hierboven. Merknamen wijken vaak af van juridische namen.",
        "Controleer het KvK-nummer op de website van de werkgever of in het handelsregister van de KvK.",
        "Een vermelding laat zien dat de werkgever kan aanvragen. Het laat niet zien dat hij werft, of dat een functie in aanmerking komt. Kijk naar de eigen vacatures van de werkgever.",
        "Check het salaris tegen de kennismigrantennorm voordat je solliciteert.",
      ],
      salaryLink: "Check de salarisnorm",
      faqTitle: "Vragen",
      faq: [
        { question: "Heeft elk bedrijf in deze lijst vacatures?", answer: "Nee. De lijst toont welke organisaties erkend referent zijn, niet wie vacatures heeft. Er staan ook geen functies, salarissen of bedrijfsgroottes in." },
        { question: "Waar komt de lijst vandaan?", answer: "Uit het openbaar register van erkend referenten voor arbeid (regulier en kennismigranten) van de IND. We nemen het over zoals gepubliceerd en verversen het dagelijks. De IND werkt het één keer per maand bij." },
        { question: "Waarom ontbreken sommige bekende bedrijven?", answer: "Sommige gebruiken een andere juridische naam en sommige zijn geen erkend referent. Zoek op de juridische naam of het KvK-nummer, of kijk direct in het register van de IND." },
      ],
    },
    letter: {
      h1: (label: string) => `Erkend referenten die beginnen met ${label}`,
      intro: (count: string, label: string, date: string) =>
        `${count} organisaties in het IND-register van erkend referenten beginnen met ${label}, bijgewerkt op ${date}. Elke regel toont de juridische naam en het KvK-nummer.`,
      emptyLetter: "Geen organisaties beginnen met dit teken in het huidige register.",
      back: "Alle letters",
      prev: "Vorige",
      next: "Volgende",
      kvk: "KvK",
      count: (count: string) => `${count} organisaties`,
    },
  },
} as const;

export async function SponsorToolPage({ locale }: { locale: SponsorLocale }) {
  const copy = COPY[locale];
  const t = copy.tool;
  const paths = SPONSOR_PATHS[locale];
  const register = await loadRegister();
  const count = register ? number(register.entries.length, locale) : null;

  return (
    <main className="wk-section">
      <FAQJsonLd questions={[...t.faq]} />
      <div className="wk-container max-w-3xl space-y-10">
        <Breadcrumbs items={[copy.home, copy.tools, { label: copy.toolBreadcrumb, href: paths.checker }]} />
        <header>
          <p className="wk-eyebrow">{t.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--wk-ink)]">{t.h1}</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--wk-ink-muted)]">{t.intro(count)}</p>
        </header>

        <section aria-label={t.h1}>
          <SponsorChecker locale={locale} passPlacement="sponsor_checker" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{t.whatTitle}</h2>
          {t.what.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-[var(--wk-ink-muted)]">
              {paragraph}
            </p>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{t.stepsTitle}</h2>
          <ol className="mt-3 list-decimal space-y-3 pl-5 text-[var(--wk-ink-muted)]">
            {t.steps.map((step) => (
              <li key={step.title}>
                <span className="font-semibold text-[var(--wk-ink)]">{step.title}</span> {step.body}
                {"link" in step && step.link && (
                  <>
                    {" "}
                    <Link href={step.link.href} className={LINK}>
                      {step.link.label}
                    </Link>
                    .
                  </>
                )}
              </li>
            ))}
          </ol>
        </section>

        <JobPassCallout locale={locale} placement="sponsor_checker_page" />

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{t.browseTitle}</h2>
          <p className="mt-3 text-[var(--wk-ink-muted)]">{t.browse(count)}</p>
          <p className="mt-3">
            <Link href={paths.hub} className="wk-button wk-button-secondary">
              {t.browseLink}
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{t.faqTitle}</h2>
          <dl className="mt-3 space-y-4">
            {t.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-[var(--wk-ink)]">{item.question}</dt>
                <dd className="mt-1 text-[var(--wk-ink-muted)]">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--wk-ink)]">{t.related}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {t.cvLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-[var(--wk-ink-muted)]">
          {t.source}:{" "}
          <a href={IND_SOURCE_URL[locale]} target="_blank" rel="noopener noreferrer" className={LINK}>
            {t.sourceText}
          </a>
          {register?.registerDate ? ` (${formatRegisterDate(register.registerDate, locale)})` : ""}.
        </p>
      </div>
    </main>
  );
}

export async function SponsorListHub({ locale }: { locale: SponsorLocale }) {
  const copy = COPY[locale];
  const h = copy.hub;
  const paths = SPONSOR_PATHS[locale];
  const register = await loadRegister();

  const letters = register ? LIST_LETTERS.map((letter) => ({ letter, count: entriesForLetter(register, letter).length })) : [];

  return (
    <main className="wk-section">
      <FAQJsonLd questions={[...h.faq]} />
      <div className="wk-container max-w-4xl space-y-10">
        <Breadcrumbs items={[copy.home, copy.tools, { label: copy.toolBreadcrumb, href: paths.checker }, { label: copy.hubBreadcrumb, href: paths.hub }]} />
        <header className="max-w-3xl">
          <p className="wk-eyebrow">{h.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--wk-ink)]">{h.h1}</h1>
          {register ? (
            <p className="mt-4 text-lg leading-8 text-[var(--wk-ink-muted)]">{h.intro(number(register.entries.length, locale), formatRegisterDate(register.registerDate, locale))}</p>
          ) : (
            <p className="mt-4 text-lg leading-8 text-[var(--wk-ink-muted)]">
              {h.unavailable}{" "}
              <a href={IND_SOURCE_URL[locale]} target="_blank" rel="noopener noreferrer" className={LINK}>
                IND
              </a>
            </p>
          )}
        </header>

        <section className="max-w-3xl" aria-label={h.h1}>
          <SponsorChecker locale={locale} passPlacement="sponsor_list_hub" />
        </section>

        {letters.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{h.browseTitle}</h2>
            <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7">
              {letters.map(({ letter, count }) => (
                <li key={letter}>
                  <Link href={paths.letter(letter)} className="wk-card block p-3 text-center hover:border-[var(--wk-ink)]">
                    <span className="block text-xl font-semibold text-[var(--wk-ink)]">{LETTER_LABEL(letter)}</span>
                    <span className="block text-xs text-[var(--wk-ink-muted)]">{number(count, locale)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{h.howTitle}</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--wk-ink-muted)]">
            {h.how.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
          <p className="mt-3">
            <Link href={paths.salary} className={LINK}>
              {h.salaryLink}
            </Link>
          </p>
        </section>

        <JobPassCallout locale={locale} placement="sponsor_list_hub" className="max-w-3xl" />

        <section className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{h.faqTitle}</h2>
          <dl className="mt-3 space-y-4">
            {h.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-[var(--wk-ink)]">{item.question}</dt>
                <dd className="mt-1 text-[var(--wk-ink-muted)]">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="text-sm text-[var(--wk-ink-muted)]">
          {copy.tool.source}:{" "}
          <a href={IND_SOURCE_URL[locale]} target="_blank" rel="noopener noreferrer" className={LINK}>
            {copy.tool.sourceText}
          </a>
          .
        </p>
      </div>
    </main>
  );
}

export async function SponsorListLetter({ locale, letter }: { locale: SponsorLocale; letter: string }) {
  const wanted = letter.toLowerCase();
  if (!(LIST_LETTERS as readonly string[]).includes(wanted)) notFound();
  const copy = COPY[locale];
  const l = copy.letter;
  const paths = SPONSOR_PATHS[locale];
  const register = await loadRegister();
  const entries = register ? entriesForLetter(register, wanted) : [];
  const label = LETTER_LABEL(wanted);
  const index = LIST_LETTERS.indexOf(wanted as (typeof LIST_LETTERS)[number]);
  const previous = index > 0 ? LIST_LETTERS[index - 1] : null;
  const next = index < LIST_LETTERS.length - 1 ? LIST_LETTERS[index + 1] : null;

  return (
    <main className="wk-section">
      <div className="wk-container max-w-4xl space-y-8">
        <Breadcrumbs
          items={[
            copy.home,
            copy.tools,
            { label: copy.hubBreadcrumb, href: paths.hub },
            { label, href: paths.letter(wanted) },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl">{l.h1(label)}</h1>
          {register ? (
            <p className="mt-3 text-[var(--wk-ink-muted)]">{l.intro(number(entries.length, locale), label, formatRegisterDate(register.registerDate, locale))}</p>
          ) : (
            <p className="mt-3 text-[var(--wk-ink-muted)]">{copy.hub.unavailable}</p>
          )}
        </header>

        <section className="max-w-3xl" aria-label={copy.tool.h1}>
          <SponsorChecker locale={locale} passPlacement="sponsor_list_letter" />
        </section>

        <nav aria-label={copy.hub.browseTitle} className="flex flex-wrap gap-2 text-sm">
          {LIST_LETTERS.map((candidate) => (
            <Link
              key={candidate}
              href={paths.letter(candidate)}
              aria-current={candidate === wanted ? "page" : undefined}
              className={`rounded-lg border px-3 py-1.5 font-semibold ${candidate === wanted ? "border-[var(--wk-ink)] bg-[var(--wk-ink)] text-white" : "border-[var(--wk-border)] text-[var(--wk-ink)]"}`}
            >
              {LETTER_LABEL(candidate)}
            </Link>
          ))}
        </nav>

        <JobPassCallout locale={locale} placement="sponsor_list_letter" compact className="max-w-3xl" />

        {entries.length > 0 ? (
          <ul className="divide-y divide-[var(--wk-border)] rounded-xl border border-[var(--wk-border)] bg-white">
            {entries.map((entry) => (
              <li key={`${entry.name}-${entry.kvk}`} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-2.5 text-sm">
                <span className="font-semibold text-[var(--wk-ink)]">{entry.name}</span>
                <span className="text-[var(--wk-ink-muted)]">
                  {l.kvk} {entry.kvk}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          register && <p className="text-[var(--wk-ink-muted)]">{l.emptyLetter}</p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
          {previous ? <Link href={paths.letter(previous)} className={LINK}>{`← ${l.prev}: ${LETTER_LABEL(previous)}`}</Link> : <span />}
          <Link href={paths.hub} className={LINK}>
            {l.back}
          </Link>
          {next ? <Link href={paths.letter(next)} className={LINK}>{`${l.next}: ${LETTER_LABEL(next)} →`}</Link> : <span />}
        </div>

        <p className="text-sm text-[var(--wk-ink-muted)]">
          {copy.tool.source}:{" "}
          <a href={IND_SOURCE_URL[locale]} target="_blank" rel="noopener noreferrer" className={LINK}>
            {copy.tool.sourceText}
          </a>
          .
        </p>
      </div>
    </main>
  );
}

export { LIST_LETTERS };
