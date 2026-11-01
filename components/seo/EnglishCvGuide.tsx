import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { UseExampleButton } from "@/components/cv-voorbeelden/UseExampleButton";
import { englishCvSample } from "@/lib/cv-samples/english-cv";
import SimpleTable from "@/components/seo/GuideTable";

// One owner page for the Dutch "engels cv (maken/voorbeeld/template)" searches (merged 1 Nov 2026 with
// /cv-gids/engels-cv-in-nederland, /engels-cv-voorbeeld and /cv-maken-in-engels).
const PATH = "/engels-cv-template" as const;
const UPDATED = { iso: "2026-11-01", display: "1 november 2026" };
const EN_EDITOR_HREF = "/en/editor?template=professional&startSource=nl_engels_cv_guide";

const SOURCES = {
  nufficHe: {
    label: "Nuffic: higher education in the Netherlands (hbo, wo, graden)",
    href: "https://www.nuffic.nl/en/education-systems/the-netherlands/higher-education",
  },
  nufficLevels: {
    label: "Nuffic: level of Dutch diplomas (NLQF en EQF)",
    href: "https://www.nuffic.nl/en/education-systems/the-netherlands/level-of-dutch-diplomas",
  },
  cefr: {
    label: "Raad van Europa: CEFR global scale (A1 tot C2)",
    href: "https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale",
  },
  prospects: {
    label: "Prospects (VK): how to write a CV",
    href: "https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/how-to-write-a-cv",
  },
  careeronestop: {
    label: "CareerOneStop (VS, ministerie van Arbeid): resumes and cover letters",
    href: "https://www.careeronestop.org/ResourcesFor/55PlusWorkers/resumes-and-cover-letters.aspx",
  },
  europass: {
    label: "Europass (Europese Commissie)",
    href: "https://europass.europa.eu/nl",
  },
} as const;

const SUMMARY = [
  "Een Engels cv heeft dezelfde onderdelen als een Nederlands cv, met Engelse koppen: Profile, Work experience, Education, Skills, Languages.",
  "Schrijf voor het land van de werkgever. Een internationaal bedrijf in Nederland, een Britse en een Amerikaanse werkgever verwachten elk iets anders.",
  "Laat je Nederlandse diploma staan en zet de Engelse omschrijving en het EQF-niveau erachter, zodat elke lezer het kan plaatsen.",
  "Geef taalniveaus met de Europese codes A1 tot C2, niet met sterren of 'goed'.",
  "Vertalen met DeepL of ChatGPT is prima voor zinnen. Controleer daarna functietitels, opleidingen, valse vrienden en getallen.",
];

const VARIANT_COLUMNS = ["", "Internationaal bedrijf in NL", "Verenigd Koninkrijk", "Verenigde Staten"] as const;
const VARIANT_ROWS = [
  ["Naam", "CV", "CV", "Resume. Een 'CV' is daar een lang, academisch document."],
  ["Lengte", "1 tot 2 pagina's A4", "Maximaal 2 pagina's A4", "Vaak 1 pagina, op US Letter in plaats van A4"],
  ["Foto", "Mag, zoals in Nederland; niet nodig", "Weglaten, behalve voor acteer- of modellenwerk", "Weglaten"],
  ["Geboortedatum", "Niet nodig", "Weglaten", "Weglaten"],
  ["Spelling", "Volg de vacature en blijf consequent", "Brits: organisation, licence", "Amerikaans: organization, license"],
  ["Extra", "Zet erbij dat je geen visum nodig hebt, en je niveau Nederlands", "Woonplaats en contactgegevens", "Woonplaats en contactgegevens"],
];

const TERMS = [
  ["Personalia", "Personal details", "Of geen kop: naam en contact staan gewoon bovenaan."],
  ["Profiel", "Profile", "VK ook 'Personal profile', VS vaak 'Summary'."],
  ["Werkervaring", "Work experience", "Niet 'working experience'."],
  ["Heden", "Present", "Mar 2023 – Present. Niet 'till now' of 'nowadays'."],
  ["Opleiding", "Education", ""],
  ["Stage", "Internship", "Niet 'stage': dat is een podium."],
  ["Bijbaan", "Part-time job", "Of gewoon de functie, met 'part-time' erachter."],
  ["Nevenactiviteiten", "Volunteering / Additional activities", "Als student: 'Extracurricular activities'."],
  ["Vaardigheden, competenties", "Skills", ""],
  ["Talen", "Languages", ""],
  ["Cursussen, certificaten", "Courses and certifications", ""],
  ["Rijbewijs B", "Driving licence (VK) / Driver's license (VS)", "Alleen als de functie het vraagt."],
  ["Hobby's", "Interests", ""],
  ["Referenties", "References", "Alleen als erom gevraagd wordt, en na toestemming van je referent."],
];

const EDUCATION_ROWS = [
  ["vmbo", "VMBO diploma (pre-vocational secondary education)", "1 of 2"],
  ["havo", "HAVO diploma (senior general secondary education)", "4"],
  ["vwo", "VWO diploma (pre-university secondary education)", "4"],
  ["mbo 4", "MBO level 4, [opleiding] (secondary vocational education)", "4"],
  ["associate degree", "Associate degree, [opleiding]", "5"],
  ["hbo-bachelor", "Bachelor of [Business Administration / Science / Arts], [hogeschool], University of Applied Sciences", "6"],
  ["wo-bachelor", "BSc of BA [opleiding], [universiteit]", "6"],
  ["master (hbo of wo)", "MSc, MA of Master of [vak], [instelling]", "7"],
];

const CEFR_ROWS = [
  ["A1 – A2", "Je redt je in eenvoudige, bekende situaties.", "Basic"],
  ["B1", "Je werkt zelfstandig in gewone situaties, maar nog niet over complexe onderwerpen.", "Intermediate"],
  ["B2", "Je vergadert en schrijft over je vak zonder dat het gesprek stokt.", "Upper intermediate / good working knowledge"],
  ["C1", "Je gebruikt de taal vloeiend en precies, ook in lastige gesprekken en teksten.", "Fluent / advanced"],
  ["C2", "Je begrijpt vrijwel alles en drukt nuances moeiteloos uit.", "Near-native"],
];

const FALSE_FRIENDS = [
  ["solliciteren naar", "solicit for", "apply for"],
  ["functie", "function", "role, position"],
  ["stage", "stage", "internship"],
  ["eventueel", "eventually", "if needed, possibly"],
  ["actueel", "actual", "current"],
  ["controleren", "control", "check, review"],
  ["sinds 2021 werkzaam als", "since 2021 I work as", "2021 – Present (of: have worked as … since 2021)"],
  ["€1.200 / 3,5%", "€1.200 / 3,5%", "€1,200 / 3.5%"],
  ["03-04-2025", "03/04/2025", "Apr 2025 (03/04 betekent in de VS 4 maart)"],
];

const FAQ = [
  {
    question: "Hoe noem je een cv in het Engels?",
    answer:
      "In het Verenigd Koninkrijk en het grootste deel van Europa is het een CV. In de VS en Canada heet het een resume; een 'CV' is daar een lang academisch document voor onderzoek en onderwijs. Bij internationale bedrijven in Nederland kun je gewoon CV zeggen.",
  },
  {
    question: "Hoe schrijf je 'heden' op een Engels cv?",
    answer: "Met 'Present', bijvoorbeeld 'Mar 2023 – Present'. Schrijf maanden afgekort en zonder cijfers, zodat Britse en Amerikaanse lezers dezelfde datum zien.",
  },
  {
    question: "Hoe vertaal je mbo, hbo en wo op een Engels cv?",
    answer:
      "Laat de Nederlandse naam staan en zet de omschrijving en het niveau erachter, bijvoorbeeld 'MBO level 4, Logistics (secondary vocational education, EQF 4)' of 'Bachelor of Science, Nursing, [hogeschool] University of Applied Sciences'. Een wo-opleiding schrijf je als BSc, BA, MSc of MA bij de Engelse naam van de universiteit.",
  },
  {
    question: "Moet er een foto op een Engels cv?",
    answer:
      "Voor het VK en de VS niet: daar laat je foto en geboortedatum weg. Bij een internationaal bedrijf in Nederland mag een foto, net als op een Nederlands cv, maar het is niet nodig.",
  },
  {
    question: "Brits of Amerikaans Engels?",
    answer:
      "Volg het land van de werkgever, of bij een internationaal bedrijf in Nederland de spelling van de vacature. Het belangrijkste is dat je niet wisselt: organisation en organization in hetzelfde cv valt op.",
  },
  {
    question: "Kan ik mijn Nederlandse cv omzetten naar Engels in WerkCV?",
    answer:
      "In de Engelse editor staan de koppen van je cv in het Engels (Experience, Education, Languages). Je eigen tekst vertaal je zelf, of je begint met het ingevulde Engelse voorbeeld op deze pagina en vervangt de gegevens. Bouwen en bekijken is gratis; je betaalt pas bij het downloaden.",
  },
];

const CHECKLIST = [
  "Je weet voor welk land je schrijft, en lengte, spelling en persoonsgegevens kloppen daarmee.",
  "Alle koppen zijn Engels, en 'heden' is 'Present'.",
  "Data staan als 'Apr 2025', niet als 03/04/2025.",
  "Opleidingen hebben de Nederlandse naam plus Engelse omschrijving of EQF-niveau.",
  "Taalniveaus staan als A1 tot C2, met een certificaat of score als je die hebt.",
  "Valse vrienden zijn eruit: geen 'function', 'stage' of 'actual' in de betekenis van het Nederlandse woord.",
  "Getallen gebruiken een punt voor decimalen en een komma voor duizendtallen.",
  "Een tweede lezer, of een native speaker, heeft de tekst gelezen.",
];

const RELATED = [
  { href: "/en/english-cv-example-netherlands", label: "English version of this guide", body: "For non-Dutch readers applying in the Netherlands." },
  { href: "/sollicitatiebrief-in-engels", label: "Sollicitatiebrief in het Engels", body: "De cover letter bij je Engelse cv." },
  { href: "/engelstalige-bedrijven-in-nederland", label: "Engelstalige bedrijven in Nederland", body: "Waar Engels de werktaal is, en wat ze van je cv verwachten." },
  { href: "/cv-gids/cv-maken-met-chatgpt", label: "CV maken met ChatGPT", body: "Geteste prompts, ook om je cv te laten vertalen, en wat er misging." },
  { href: "/cv-check", label: "Gratis cv-check", body: "Controleer je cv op ontbrekende onderdelen voor je het verstuurt." },
  { href: "/cv-check/vacature", label: "CV vergelijken met een vacature", body: "Zie per eis uit de Engelse vacature of die in je cv staat." },
];

function Source({ id }: { id: keyof typeof SOURCES }) {
  return (
    <a href={SOURCES[id].href} className="underline underline-offset-4" rel="noopener" target="_blank">
      {SOURCES[id].label}
    </a>
  );
}

const sample = englishCvSample;

export const ENGLISH_CV_GUIDE_META = {
  path: PATH,
  title: "Engels cv maken: voorbeeld, vertalingen en template | WerkCV",
  description:
    "Engels cv maken voor een internationaal bedrijf, het VK of de VS: ingevuld voorbeeld, vertaling van cv-termen en mbo/hbo/wo, taalniveaus A1-C2 en valkuilen.",
  h1: "Engels cv maken: voorbeeld, vertalingen en opbouw",
  keywords: ["engels cv", "engels cv maken", "cv engels", "cv in het engels", "engels cv voorbeeld", "engels cv template", "cv in het engels voorbeeld"],
};

export default function EnglishCvGuide() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ENGLISH_CV_GUIDE_META.h1,
    description: ENGLISH_CV_GUIDE_META.description,
    inLanguage: "nl-NL",
    dateModified: UPDATED.iso,
    author: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
    publisher: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
    mainEntityOfPage: `https://werkcv.nl${PATH}`,
    citation: Object.values(SOURCES).map((source) => source.href),
  };

  return (
    <main>
      <JsonLd data={articleJsonLd} />
      <FAQJsonLd questions={FAQ} />

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Engels cv", href: PATH },
            ]}
          />
          <p className="wk-eyebrow mt-4">CV in het Engels</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl md:text-5xl">{ENGLISH_CV_GUIDE_META.h1}</h1>
          <p className="mt-4 text-base leading-7 text-[var(--wk-ink-muted)] sm:text-lg sm:leading-8">
            Een Engels cv heeft dezelfde onderdelen als een Nederlands cv: profiel, werkervaring, opleiding, vaardigheden en talen. Wat verandert:
            Engelse koppen, opleidingen die een buitenlandse lezer kan plaatsen, taalniveaus van A1 tot C2 en minder persoonlijke gegevens. Hoe ver
            je daarin gaat, hangt af van waar je solliciteert: bij een internationaal bedrijf in Nederland, in het Verenigd Koninkrijk of in de
            Verenigde Staten.
          </p>
          <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">
            Redactie WerkCV · <time dateTime={UPDATED.iso}>Bijgewerkt: {UPDATED.display}</time>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <UseExampleButton
              templateId="professional"
              colorThemeId="classic-blue"
              sampleCV={englishCvSample}
              label="Open het Engelse voorbeeld-cv"
              startSource="nl_engels_cv_guide_example"
              pagePath={PATH}
              uiLanguage="en"
              trackingLocation={`english_cv_guide:${PATH}:hero`}
              trackingLabel="use_english_example"
            />
            <a href="#vertalen" className="wk-button wk-button-secondary">
              Naar de vertaaltabellen
            </a>
          </div>

          <div className="wk-card mt-8 p-5">
            <h2 className="font-semibold text-[var(--wk-ink)]">In het kort</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--wk-ink-muted)]">
              {SUMMARY.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Voor wie schrijf je? Drie varianten van een Engels cv</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            De meeste Nederlanders die een Engels cv maken, solliciteren bij een internationaal bedrijf in Nederland. Dat cv lijkt meer op een
            Nederlands cv in het Engels dan op een Brits of Amerikaans cv. Solliciteer je in het buitenland, volg dan de gewoonten van dat land.
          </p>
          <SimpleTable head={VARIANT_COLUMNS} rows={VARIANT_ROWS} />
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
            Europass is het Europese cv-format. Gebruik het alleen als een werkgever of opleiding erom vraagt. Bronnen: <Source id="prospects" />;{" "}
            <Source id="careeronestop" />; <Source id="europass" />.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Voorbeeld: een Engels cv voor een internationaal bedrijf in Nederland</h2>
          <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">
            Een verzonnen Nederlandse kandidaat die solliciteert bij een internationaal softwarebedrijf in Utrecht. Let op de datums, het diploma met
            niveau, de taalniveaus en de laatste zin van het profiel.
          </p>
          <article className="wk-card mt-6 p-5 sm:p-6" aria-label="Voorbeeld Engels cv" lang="en">
            <p className="text-lg font-semibold text-[var(--wk-ink)]">{sample.personal.name}</p>
            <p className="text-sm font-semibold text-[var(--wk-ink)]">{sample.personal.title}</p>
            <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">
              {sample.personal.location} · {sample.personal.phone} · {sample.personal.email} · {sample.personal.linkedIn}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Profile</p>
            <p className="mt-1 text-sm leading-6 text-[var(--wk-ink)]">{sample.personal.summary}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Work experience</p>
            {sample.experience.map((job) => (
              <div key={job.role} className="mt-3 border-t border-[var(--wk-border)] pt-3">
                <p className="text-sm font-semibold text-[var(--wk-ink)]">
                  {job.role}, {job.company}
                </p>
                <p className="text-xs text-[var(--wk-ink-muted)]">
                  {job.start} – {job.end} · {job.location}
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--wk-ink)]">
                  {job.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Education</p>
            {sample.education.map((item) => (
              <p key={item.degree} className="mt-1 text-sm leading-6 text-[var(--wk-ink)]">
                {item.degree}, {item.school}, {item.location} · {item.start} – {item.end}
              </p>
            ))}
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Languages</p>
            <p className="mt-1 text-sm leading-6 text-[var(--wk-ink)]">Dutch – native · English – C1 (IELTS 7.5) · German – B1</p>
          </article>
          <p className="mt-4 text-sm leading-6 text-[var(--wk-ink-muted)]">
            Open het voorbeeld in de Engelse editor: de koppen van je cv staan dan in het Engels en je vervangt alleen de inhoud. Bouwen en bekijken
            is gratis.
          </p>
        </div>
      </section>

      <section id="vertalen" className="wk-section scroll-mt-24 bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Cv-termen vertalen: één keuze per woord</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            Woordenlijsten geven vaak vier vertalingen per woord. Op een cv wil je er één die iedereen herkent:
          </p>
          <SimpleTable head={["Nederlands", "Op je Engelse cv", "Let op"]} rows={TERMS} />
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Mbo, hbo en wo vertalen op je cv</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            Een buitenlandse recruiter weet niet wat hbo is, een Nederlandse recruiter herkent &quot;higher professional education&quot; niet direct.
            Zet daarom allebei neer: de Nederlandse naam, een Engelse omschrijving en het Europese niveau (EQF). Dat Europese kwalificatiekader
            maakt diploma&apos;s uit verschillende landen vergelijkbaar, en Nuffic legt per Nederlands diploma vast welk niveau het heeft.
          </p>
          <SimpleTable head={["Diploma", "Zo schrijf je het", "EQF-niveau"]} rows={EDUCATION_ROWS} />
          <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 leading-7 text-[var(--wk-ink-muted)]">
            <li>
              Gebruik de Engelse naam die de school zelf gebruikt; die staat op de Engelse website of op je diplomasupplement. Vertaal hem niet zelf.
            </li>
            <li>
              Een hogeschool is in het Engels een University of Applied Sciences, een universiteit een (research) university. Zet de opleidingsnaam
              erbij, want &quot;Bachelor of Science&quot; alleen zegt weinig.
            </li>
            <li>
              Laat cijfers weg: een 7,5 zegt een buitenlandse lezer niets. Een cum laude, een prijs of een gepubliceerde scriptie zet je er wel bij.
            </li>
          </ul>
          <p className="mt-4 text-sm text-[var(--wk-ink-muted)]">
            Bronnen: <Source id="nufficLevels" />; <Source id="nufficHe" />. De omschrijvingen van vmbo, havo en vwo zijn gangbare vertalingen, geen
            officiële namen.
          </p>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Taalniveau op een Engels cv: gebruik A1 tot C2</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            Sterren en woorden als &quot;good&quot; betekenen voor iedereen iets anders. Het Europees Referentiekader (CEFR) van de Raad van Europa
            heeft zes niveaus die recruiters in heel Europa kennen. Schrijf bijvoorbeeld &quot;English – C1&quot;, en zet een certificaat of score
            erachter als je die hebt.
          </p>
          <SimpleTable head={["Niveau", "Wat het in de praktijk betekent", "Als je een woord wilt gebruiken"]} rows={CEFR_ROWS} />
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
            Je moedertaal schrijf je als &quot;native&quot;. Bij een internationaal bedrijf in Nederland is &quot;Dutch – native&quot; voor veel
            functies juist een pluspunt: zet het er dus bij. In WerkCV kies je een niveau uit de lijst en zet je de code achter de taal, bijvoorbeeld
            &quot;English (C1)&quot;. De omschrijvingen hierboven zijn een samenvatting; de officiële tekst staat bij de bron:{" "}
            <Source id="cefr" />.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Vertalen met DeepL of ChatGPT: dit moet je nalopen</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            Een vertaaltool maakt van goede Nederlandse zinnen meestal goede Engelse zinnen. De fouten zitten in woorden die op elkaar lijken, in
            functietitels en in getallen. Loop deze lijst na voor je verstuurt:
          </p>
          <SimpleTable head={["Nederlands", "Fout", "Goed"]} rows={FALSE_FRIENDS} />
          <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 leading-7 text-[var(--wk-ink-muted)]">
            <li>
              Functietitels: gebruik de titel die in Engelse vacatures voor dit werk staat, niet een letterlijke vertaling. Een &quot;medewerker
              klantenservice&quot; is een customer service agent of representative, geen &quot;employee customer service&quot;.
            </li>
            <li>
              Schrijf werkervaring zonder &quot;I&quot;: &quot;Cut onboarding time from 9 to 5 weeks&quot;, niet &quot;I have cut the onboarding
              time&quot;.
            </li>
            <li>
              Zet geen persoonsgegevens in een gratis chattool die je niet nodig hebt voor de vertaling. Lees meer in de{" "}
              <Link href="/cv-gids/cv-maken-met-chatgpt" className="underline underline-offset-4">
                gids over cv maken met ChatGPT
              </Link>
              .
            </li>
          </ul>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Checklist voor je verstuurt</h2>
          <ul className="mt-4 space-y-2">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex gap-3 leading-7 text-[var(--wk-ink-muted)]">
                <span aria-hidden="true" className="font-semibold text-[var(--wk-ink)]">
                  ☐
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <UseExampleButton
              templateId="professional"
              colorThemeId="classic-blue"
              sampleCV={englishCvSample}
              label="Begin met het Engelse voorbeeld"
              startSource="nl_engels_cv_guide_example"
              pagePath={PATH}
              uiLanguage="en"
              trackingLocation={`english_cv_guide:${PATH}:checklist`}
              trackingLabel="use_english_example"
            />
            <Link href={EN_EDITOR_HREF} className="wk-button wk-button-secondary">
              Begin leeg in het Engels
            </Link>
          </div>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Veelgestelde vragen over een Engels cv</h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((item) => (
              <details key={item.question} className="wk-card p-4">
                <summary className="cursor-pointer font-semibold text-[var(--wk-ink)]">{item.question}</summary>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Verder lezen en tools</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {RELATED.map((item) => (
              <Link key={item.href} href={item.href} className="wk-card block p-5 transition hover:border-[var(--wk-ink)]">
                <span className="font-semibold text-[var(--wk-ink)]">{item.label}</span>
                <span className="mt-2 block text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-sm text-[var(--wk-ink-muted)]">
            <p className="font-semibold text-[var(--wk-ink)]">Bronnen</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {(Object.keys(SOURCES) as Array<keyof typeof SOURCES>).map((id) => (
                <li key={id}>
                  <Source id={id} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
