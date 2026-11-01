import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { UseExampleButton } from "@/components/cv-voorbeelden/UseExampleButton";
import { zzpCvSample } from "@/lib/cv-samples/zzp-cv";

// One owner page for "zzp cv maken / schrijven / voorbeeld" (merged with /cv-tips/freelance-cv-maken on 1 Nov 2026).
// The worked inhuur example comes from a public Flextender request; re-check the legal lines before 31 Dec 2026.
const PATH = "/cv-gids/cv-voorbeeld-zzper" as const;
const UPDATED = { iso: "2026-11-01", display: "1 november 2026" };

const SOURCES = {
  flextender: {
    label: "Flextender, inhuuraanvraag 19713 (gemeente Krimpen aan den IJssel, januari 2025)",
    href: "https://app.flextender.nl/nologin/jobtopdf/19713",
  },
  handhaving: {
    label: "Rijksoverheid: vanaf 1 januari 2025 volledige handhaving op schijnzelfstandigheid",
    href: "https://www.rijksoverheid.nl/actueel/nieuws/2024/09/06/vanaf-1-januari-2025-volledige-handhaving-op-schijnzelfstandigheid",
  },
  schijnzelfstandigheid: {
    label: "Rijksoverheid: veelgestelde vragen over schijnzelfstandigheid",
    href: "https://www.rijksoverheid.nl/themas/werk/zelfstandigen-zonder-personeel-zzp/veelgestelde-vragen-schijnzelfstandigheid",
  },
  uurtarief: {
    label: "Ondernemersplein: laag uurtarief van zzp'er kan leiden tot arbeidsovereenkomst",
    href: "https://ondernemersplein.overheid.nl/wetswijzigingen/laag-uurtarief-van-zzper-kan-leiden-tot-arbeidsovereenkomst/",
  },
} as const;

const SUMMARY = [
  "Schrijf opdrachten, geen levensloop: per opdracht je rol, opdrachtgever of sector, maand en jaar, uren per week en twee of drie resultaten.",
  "Wie je cv als eerste leest, werkt vaak een lijst met eisen af. Staat een eis niet letterlijk in je cv, dan telt die niet mee.",
  "Zet beschikbaarheid (datum, uren, regio) bovenaan. Je uurtarief hoort in de offerte of het aanmeldformulier, niet in het cv.",
  "Een gerichte versie is meestal 2 pagina's. Noemt de aanvraag een maximum, zoals 5 pagina's, dan geldt dat.",
  "Een cv maakt je niet 'DBA-proof': of je zelfstandig werkt, hangt af van hoe het werk in de praktijk gaat.",
];

const COMPARISON = [
  ["Werkervaring", "Functies per werkgever", "Opdrachten per opdrachtgever, met sector en duur"],
  ["Wie leest eerst", "Recruiter of hiring manager", "Intermediair, inhuurdesk of broker die eisen afvinkt"],
  ["Datums", "Jaar is vaak genoeg", "Maand en jaar, plus uren per week: jaren ervaring worden nagerekend"],
  ["Lengte", "1 tot 2 pagina's", "Gerichte versie 2 pagina's; bij een aanvraag het opgegeven maximum"],
  ["Bovenaan", "Profiel en contact", "Specialisme, beschikbaarheid, regio of remote"],
  ["Aanpassen", "Per vacature", "Per opdracht, met de woorden uit de aanvraag"],
];

const FLEXTENDER_STEPS = [
  {
    title: "Stap 1: knock-outeisen",
    body: "Een afgeronde hbo-opleiding Rechten, minimaal 3 jaar werkervaring in de afgelopen 5 jaar met bezwaarschriften bij een gemeente, beschikbaar per 1 februari voor 16 uur per week en een maximumtarief van €75 per uur exclusief btw. Wie op één punt niet voldoet, wordt niet verder bekeken.",
  },
  {
    title: "Stap 2: punten voor gunningscriteria",
    body: "Ervaring met de systemen Key2Belastingen, VRiS en GISVG (30 punten), met Djuma (30 punten), met het volledige bezwaarproces (20 punten) en met waardebepaling (20 punten). Bij elk criterium staat: benoem dit duidelijk in het cv. De tien hoogst scorende cv's gaan door. Bij een gelijke score beslist het uurtarief.",
  },
  {
    title: "Stap 3 en 4: de opdrachtgever kiest",
    body: "De gemeente vergelijkt die tien cv's op ervaring met soortgelijke opdrachten en organisaties en nodigt de beste drie uit voor een gesprek. Daar worden de competenties getoetst.",
  },
];

const HEADER_ROWS = [
  ["Naam en vaktitel", "Ja", "\"Freelance projectmanager | Digitale implementaties\" zegt meer dan alleen je bedrijfsnaam."],
  ["Beschikbaarheid", "Ja, bovenaan", "Startdatum, uren per week en regio of remote. Vaak een knock-outeis."],
  ["Woonplaats", "Ja", "Voor reistijd. Je volledige adres is niet nodig."],
  ["Website, portfolio, LinkedIn", "Ja", "Alleen links die werken en werk tonen dat bij de opdracht past."],
  ["Bedrijfsnaam", "Als je onder die naam werkt", "Zet hem naast je naam, niet in plaats van je naam."],
  ["KvK-nummer", "Mag, niet verplicht", "Handig bij intermediairs en inhuurdesks die je inschrijving controleren. Het staat ook in het openbare Handelsregister."],
  ["Uurtarief", "Nee", "Hoort in de offerte of het aanmeldformulier. Daar wordt het ook beoordeeld."],
  ["Btw-nummer", "Nee", "Hoort op je factuur en offerte."],
  ["Geboortedatum, BSN", "Nee", "Niet nodig voor de beoordeling. Een BSN deel je pas als het contract getekend wordt, en nooit in een cv."],
];

const FAQ = [
  {
    question: "Hoe lang mag een zzp cv zijn?",
    answer:
      "Voor een opdracht via een intermediair of direct bij een bedrijf werkt een gerichte versie van 2 pagina's het best. Bij overheidsopdrachten staat vaak een maximum in de aanvraag; in het voorbeeld op deze pagina was dat 5 pagina's. Houd daarnaast een master-cv met al je opdrachten voor jezelf bij; dat stuur je niet op.",
  },
  {
    question: "Moet mijn KvK-nummer op mijn zzp cv?",
    answer:
      "Het is niet verplicht. Bij intermediairs en inhuurdesks scheelt het een vraag, omdat zij je inschrijving vaak controleren. Zet het dan in je contactgegevens, naast je bedrijfsnaam. Je btw-nummer en BSN horen niet in je cv.",
  },
  {
    question: "Zet ik mijn uurtarief in mijn cv?",
    answer:
      "Nee. Je tarief vul je in op het aanmeldformulier of in je offerte. Let op een maximumtarief in de aanvraag: dat is vaak een knock-outeis, en bij een gelijke score kan het tarief de doorslag geven.",
  },
  {
    question: "Hoe zet je in je cv dat je als zzp'er administratief werk deed bij verschillende bedrijven?",
    answer:
      "Maak één kop 'Zelfstandig administratief medewerker (eigen onderneming)' met de totale periode. Zet daaronder de opdrachten met de meeste uren apart, elk met opdrachtgever of sector, maanden en uren per week. Bundel kleine klussen in één regel, bijvoorbeeld: 'Losse administratieve opdrachten voor 6 mkb-bedrijven, 2023-2025: debiteurenbeheer, btw-aangifte voorbereiden, Exact Online.'",
  },
  {
    question: "Hoe vermeld ik zzp naast of na loondienst?",
    answer:
      "Houd één chronologische lijst. Zet bij elke regel of het een dienstverband of een opdracht was. Werkte je tegelijk in loondienst en als zzp'er, noem dan bij beide de uren per week, zodat de lezer ziet dat de periodes elkaar overlappen.",
  },
  {
    question: "Bestaat er een DBA-proof cv?",
    answer:
      "Nee. Of je als zelfstandige werkt, hangt af van hoe het werk in de praktijk wordt uitgevoerd, niet van je cv of je contract. Je cv kan wel eerlijk laten zien hoe je onderneming eruitziet: meerdere opdrachtgevers, een eigen bedrijfsnaam, je eigen specialisme.",
  },
  {
    question: "Hoe vermeld ik opdrachten onder geheimhouding?",
    answer:
      "Noem de sector en de grootte in plaats van de naam, met '(vertrouwelijk)' erachter, bijvoorbeeld: 'Vertrouwelijke opdrachtgever, zakelijke dienstverlening, 400 medewerkers'. Rol, periode en resultaten blijven gewoon staan. Twijfel je, vraag de opdrachtgever dan of je de naam mag noemen.",
  },
];

const CHECKLIST = [
  "Elke eis en wens uit de aanvraag staat letterlijk in je cv, bij de opdracht waar je het deed.",
  "Bij elke opdracht staan maand en jaar, en de uren per week als je parttime werkte.",
  "Een eis als 'minimaal 3 jaar in de afgelopen 5 jaar' heb je zelf nagerekend, zonder overlappende maanden dubbel te tellen.",
  "Beschikbaarheid staat bovenaan: startdatum, uren per week, regio of remote.",
  "Je cv blijft binnen het maximum aantal pagina's en is in de taal van de aanvraag.",
  "Je hebt referenties gevraagd of ze akkoord gaan, en hun gegevens bij de hand.",
  "Geen tarief, btw-nummer, BSN of geboortedatum in het cv.",
];

const RELATED = [
  { href: "/cv-check/vacature", label: "CV vergelijken met een opdracht", body: "Plak je cv en de aanvraag: je ziet per eis of die in je cv te vinden is." },
  { href: "/tools/zzp-uurtarief-berekenen", label: "ZZP uurtarief berekenen", body: "Reken uit welk tarief je nodig hebt voordat je het formulier invult." },
  { href: "/tools/werkervaring-bullets", label: "Werkervaring omzetten naar resultaten", body: "Van een takenlijst per opdracht naar twee of drie resultaatregels." },
  { href: "/cv-tips/cv-voor-detachering", label: "CV voor detachering", body: "Als je via een detacheerder werkt in plaats van op eigen naam." },
  { href: "/profieltekst-cv-voorbeelden", label: "Profieltekst voorbeelden", body: "Meer voorbeelden van een korte profieltekst bovenaan je cv." },
  { href: "/cv-gids/engels-cv-in-nederland", label: "Engels cv in Nederland", body: "Voor opdrachten bij internationale teams die een Engels cv vragen." },
];

function Source({ id }: { id: keyof typeof SOURCES }) {
  return (
    <a href={SOURCES[id].href} className="underline underline-offset-4" rel="noopener" target="_blank">
      {SOURCES[id].label}
    </a>
  );
}

const sample = zzpCvSample;
const sampleJobs = sample.experience.slice(0, 2);

export const ZZP_CV_GUIDE_META = {
  path: PATH,
  title: "ZZP CV schrijven: voorbeeld en opbouw per opdracht (2026) | WerkCV",
  description:
    "Zo schrijf je een zzp cv dat door de selectie komt: opbouw per opdracht, een ingevuld voorbeeld, wat je doet met KvK en tarief en hoe inhuurdesks cv's scoren.",
  h1: "ZZP CV schrijven: voorbeeld en opbouw per opdracht",
  keywords: ["zzp cv", "zzp cv maken", "zzp cv schrijven", "cv voorbeeld zzp'er", "freelance cv", "cv freelancer", "zzp cv voorbeeld"],
};

export default function ZzpCvGuide() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ZZP_CV_GUIDE_META.h1,
    description: ZZP_CV_GUIDE_META.description,
    inLanguage: "nl-NL",
    datePublished: "2026-02-19",
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
              { label: "CV-gids", href: "/cv-gids" },
              { label: "ZZP CV", href: PATH },
            ]}
          />
          <p className="wk-eyebrow mt-4">CV-gids voor zelfstandigen</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl md:text-5xl">{ZZP_CV_GUIDE_META.h1}</h1>
          <p className="mt-4 text-base leading-7 text-[var(--wk-ink-muted)] sm:text-lg sm:leading-8">
            Een zzp cv is geen overzicht van je hele loopbaan, maar een selectie van opdrachten die bewijzen dat je deze ene opdracht aankunt.
            Bovenaan staan je specialisme en je beschikbaarheid. Daaronder per opdracht: je rol, de opdrachtgever of sector, maand en jaar,
            uren per week en twee of drie resultaten. Tarief en contractafspraken horen in je offerte.
          </p>
          <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">
            Redactie WerkCV · <time dateTime={UPDATED.iso}>Bijgewerkt: {UPDATED.display}</time>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <UseExampleButton
              templateId="professional"
              colorThemeId="classic-blue"
              sampleCV={zzpCvSample}
              label="Open het ingevulde ZZP-cv"
              pagePath={PATH}
              trackingLocation={`zzp_guide:${PATH}:hero`}
              trackingLabel="use_zzp_example"
            />
            <a href="#eisen" className="wk-button wk-button-secondary">
              Pas je cv aan op een opdracht
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
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Voorbeeld: zo ziet een zzp cv eruit</h2>
          <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">
            Een verzonnen freelance projectmanager, ingekort tot de bovenkant en twee opdrachten. Let op wat er níet staat: geen geboortedatum,
            geen adres, geen tarief, en geen blok &quot;2019 - heden: eigen bedrijf&quot; zonder inhoud.
          </p>
          <article className="wk-card mt-6 p-5 sm:p-6" aria-label="Voorbeeld zzp cv">
            <p className="text-lg font-semibold text-[var(--wk-ink)]">{sample.personal.name}</p>
            <p className="text-sm font-semibold text-[var(--wk-ink)]">{sample.personal.title}</p>
            <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">
              {sample.personal.location} · {sample.personal.email} · {sample.personal.website} · {sample.personal.linkedIn}
            </p>
            <p className="mt-4 text-sm leading-6 text-[var(--wk-ink)]">{sample.personal.summary}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Opdrachten</p>
            {sampleJobs.map((job) => (
              <div key={job.role} className="mt-3 border-t border-[var(--wk-border)] pt-3">
                <p className="text-sm font-semibold text-[var(--wk-ink)]">
                  {job.role}, {job.company}
                </p>
                <p className="text-xs text-[var(--wk-ink-muted)]">
                  {job.start} - {job.end} · {job.location}
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">{job.description}</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--wk-ink)]">
                  {job.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
          <p className="mt-4 text-sm leading-6 text-[var(--wk-ink-muted)]">
            Het volledige voorbeeld heeft drie opdrachten, waaronder een opdracht onder geheimhouding, plus opleiding en certificaten. Open het in de
            editor en vervang de voorbeeldgegevens door je eigen opdrachten. Bouwen en bekijken is gratis.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Waarin een zzp cv verschilt van een cv voor een baan</h2>
          <div className="wk-table-scroll-hint mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--wk-border)]">
                  <th className="py-2 pr-4" scope="col"></th>
                  <th className="py-2 pr-4" scope="col">Cv voor een baan</th>
                  <th className="py-2 pr-4" scope="col">Zzp cv</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([label, job, zzp]) => (
                  <tr key={label} className="border-b border-[var(--wk-border)] align-top">
                    <th className="py-2 pr-4 font-semibold text-[var(--wk-ink)]" scope="row">
                      {label}
                    </th>
                    <td className="py-2 pr-4 text-[var(--wk-ink-muted)]">{job}</td>
                    <td className="py-2 pr-4 text-[var(--wk-ink)]">{zzp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Hoe een inhuuraanvraag je cv beoordeelt</h2>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            Veel zzp-opdrachten, zeker bij de overheid, lopen via een inhuurdesk of broker. Die leest je cv niet als een verhaal, maar legt het naast
            een lijst. Een openbare aanvraag voor een behandelaar bezwaarschriften bij de gemeente Krimpen aan den IJssel (januari 2025, via
            Flextender) laat zien hoe dat gaat:
          </p>
          <ol className="mt-6 space-y-4">
            {FLEXTENDER_STEPS.map((step) => (
              <li key={step.title} className="wk-card p-5">
                <h3 className="font-semibold text-[var(--wk-ink)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 leading-7 text-[var(--wk-ink-muted)]">
            De cv-eisen stonden er ook bij: maximaal 5 pagina&apos;s, in het Nederlands, met minimaal 2 referenties. Wat dit betekent: 60 van de 100
            punten hingen af van drie systeemnamen. Werkte je met Djuma maar schreef je &quot;zaaksysteem&quot;, dan kreeg je voor dat criterium
            niets, en zag de gemeente je cv waarschijnlijk nooit.
          </p>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            Niet elke opdracht is zo streng. Een intermediair die een opdracht bij een bedrijf invult, werkt informeler. Maar ook die zoekt eerst
            naar de eisen uit de aanvraag, en jouw cv is het enige bewijs dat hij kan doorsturen.
          </p>
          <p className="mt-4 text-sm text-[var(--wk-ink-muted)]">
            Bron: <Source id="flextender" />.
          </p>
        </div>
      </section>

      <section id="eisen" className="wk-section scroll-mt-24">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Je zzp cv aanpassen op een opdracht, in 5 stappen</h2>
          <ol className="mt-6 space-y-5">
            <li className="wk-card p-5">
              <h3 className="font-semibold text-[var(--wk-ink)]">1. Zet elke eis en wens onder elkaar</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                Kopieer de eisen, wensen of gunningscriteria uit de aanvraag. Staan er punten bij, zet die erachter: daar zit je winst.
              </p>
            </li>
            <li className="wk-card p-5">
              <h3 className="font-semibold text-[var(--wk-ink)]">2. Zoek per regel je bewijs</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                Bij welke opdracht deed je dit, wanneer, en hoe lang? Schrijf het bij die opdracht, niet alleen in een losse lijst vaardigheden.
                &quot;Aantoonbare ervaring&quot; betekent: de lezer ziet waar en wanneer.
              </p>
            </li>
            <li className="wk-card p-5">
              <h3 className="font-semibold text-[var(--wk-ink)]">3. Gebruik de woorden uit de aanvraag</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                Vraagt de aanvraag om &quot;projectleider&quot;, gebruik dan niet alleen &quot;projectmanager&quot;. Vraagt hij om een systeem of
                methode bij naam, zet die naam erin. Alleen als het klopt: het gesprek toetst het.
              </p>
            </li>
            <li className="wk-card p-5">
              <h3 className="font-semibold text-[var(--wk-ink)]">4. Reken eisen in jaren zelf na</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                Stel: je reageert in november 2026 op &quot;minimaal 3 jaar ervaring in de afgelopen 5 jaar&quot;. Dan telt alles vanaf november 2021.
                Opdracht A liep van februari tot en met november 2022 (10 maanden), opdracht B van maart 2023 tot en met juni 2024 (16 maanden),
                opdracht C van september 2025 tot en met oktober 2026 (14 maanden). Samen 40 maanden: 3 jaar en 4 maanden, dus je voldoet.
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                Dat werkt alleen als de maanden in je cv staan. Bij &quot;2022 - 2024&quot; kan de beoordelaar niet rekenen. Liepen twee opdrachten
                tegelijk, tel die maanden dan maar één keer.
              </p>
            </li>
            <li className="wk-card p-5">
              <h3 className="font-semibold text-[var(--wk-ink)]">5. Leg je cv naast de aanvraag</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                Lees je cv zoals de beoordelaar dat doet: eis voor eis. Of laat het doen: de{" "}
                <Link href="/cv-check/vacature" className="underline underline-offset-4">
                  vacature-check
                </Link>{" "}
                vergelijkt je cv met de tekst van de opdracht en laat per eis zien of die erin te vinden is.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Opdrachten opschrijven: het format per opdracht</h2>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">Gebruik voor elke opdracht dezelfde vier regels:</p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-[var(--wk-canvas)] p-4 text-sm leading-6 text-[var(--wk-ink)]">
            {`Rol, opdrachtgever (of sector bij geheimhouding), plaats of remote
maand jaar - maand jaar · uren per week · via [intermediair], als dat zo was
Eén zin over de vraag van de opdrachtgever
2 of 3 resultaten, het liefst met een getal`}
          </pre>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="wk-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Zwak</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink)]">
                2019 - heden: eigenaar Van Dijk Projectadvies. Diverse projecten voor diverse klanten op het gebied van projectmanagement en
                procesverbetering.
              </p>
            </div>
            <div className="wk-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Sterk</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink)]">
                Freelance projectleider procesverbetering, dienstverlener in de energiesector, Amersfoort
                <br />
                maart 2024 - december 2024 · 24 uur per week
                <br />
                Klantverzoeken bleven te lang liggen tussen service en backoffice.
                <br />- Doorlooptijd met 24% verkort na herontwerp van drie kernprocessen
                <br />- Nieuwe werkwijze getest met twee teams, daarna uitgerold naar 60 medewerkers
              </p>
            </div>
          </div>

          <h3 className="mt-10 text-lg font-semibold text-[var(--wk-ink)]">Veel korte klussen</h3>
          <p className="mt-2 leading-7 text-[var(--wk-ink-muted)]">
            Klussen van een paar dagen krijgen geen eigen blok. Bundel ze in één regel met het aantal, de soort opdrachtgever en de periode:
            &quot;Korte adviesopdrachten (1 tot 10 dagen) voor 9 woningcorporaties, 2023 - 2025&quot;, met daaronder één typisch resultaat. Zo blijft
            je cv kort zonder dat je ervaring verdwijnt.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-[var(--wk-ink)]">Twee opdrachten tegelijk</h3>
          <p className="mt-2 leading-7 text-[var(--wk-ink-muted)]">
            Zzp&apos;ers werken vaak voor twee opdrachtgevers in dezelfde maanden. Zet bij beide de uren per week (&quot;16 uur per week&quot;). Dan
            ziet de lezer dat het parallel liep, en lijkt het niet alsof je 80 uur per week werkte of steeds na een paar maanden vertrok.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-[var(--wk-ink)]">Opdrachten onder geheimhouding</h3>
          <p className="mt-2 leading-7 text-[var(--wk-ink-muted)]">
            Vervang de naam door sector en grootte: &quot;Vertrouwelijke opdrachtgever, zakelijke dienstverlening, 400 medewerkers&quot;. Rol, periode
            en resultaten blijven staan. Bekende namen noem je wel, als dat mag: ze geven direct vertrouwen.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-[var(--wk-ink)]">Gaten tussen opdrachten</h3>
          <p className="mt-2 leading-7 text-[var(--wk-ink-muted)]">
            Een paar maanden tussen opdrachten is normaal voor een zelfstandige en hoeft niet uitgelegd. Was het langer, noem het kort en neutraal
            (&quot;Sabbatical, 2024&quot;, &quot;Opleiding PRINCE2 en acquisitie, januari - maart 2025&quot;), en alleen als het klopt.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Wat zet je bovenaan, en wat laat je weg?</h2>
          <div className="wk-table-scroll-hint mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--wk-border)]">
                  <th className="py-2 pr-4" scope="col">Gegeven</th>
                  <th className="py-2 pr-4" scope="col">In je cv?</th>
                  <th className="py-2 pr-4" scope="col">Waarom</th>
                </tr>
              </thead>
              <tbody>
                {HEADER_ROWS.map(([item, advice, why]) => (
                  <tr key={item} className="border-b border-[var(--wk-border)] align-top">
                    <th className="py-2 pr-4 font-semibold text-[var(--wk-ink)]" scope="row">
                      {item}
                    </th>
                    <td className="py-2 pr-4 font-semibold text-[var(--wk-ink)]">{advice}</td>
                    <td className="py-2 pr-4 text-[var(--wk-ink-muted)]">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-lg font-semibold text-[var(--wk-ink)]">Profieltekst: drie zinnen</h3>
          <p className="mt-2 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            Wat doe je, voor wie, en wanneer ben je beschikbaar. Geen eigenschappen zonder bewijs. Twee voorbeelden:
          </p>
          <ul className="mt-3 max-w-3xl space-y-3">
            <li className="wk-card p-4 text-sm leading-6 text-[var(--wk-ink)]">{sample.personal.summary}</li>
            <li className="wk-card p-4 text-sm leading-6 text-[var(--wk-ink)]">
              Zelfstandig content- en SEO-specialist voor B2B-softwarebedrijven. Bouwt contentplannen die organische aanvragen opleveren en rapporteert
              per kwartaal aan het marketingteam. Beschikbaar vanaf januari 2027 voor 16 uur per week, remote.
            </li>
          </ul>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Uurtarief, schijnzelfstandigheid en wat je cv niet regelt</h2>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            <strong className="text-[var(--wk-ink)]">Tarief.</strong> Je tarief vul je in op het formulier of in je offerte. Lees wel wat de aanvraag
            erover zegt: in het voorbeeld hierboven was een maximumtarief een knock-outeis en gaf het tarief de doorslag bij een gelijke score. Weet
            je nog niet wat je moet vragen, gebruik dan de{" "}
            <Link href="/tools/zzp-uurtarief-berekenen" className="underline underline-offset-4">
              zzp uurtarief calculator
            </Link>
            .
          </p>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            <strong className="text-[var(--wk-ink)]">Lage tarieven vanaf 31 december 2026.</strong> Vanaf die datum geldt bij een uurtarief tot €38
            een wettelijk vermoeden dat er een arbeidsovereenkomst is. De opdrachtgever moet dan aantonen dat dat niet zo is. Bron:{" "}
            <Source id="uurtarief" />.
          </p>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            <strong className="text-[var(--wk-ink)]">Geen &quot;DBA-proof&quot; cv.</strong> De Belastingdienst handhaaft sinds 1 januari 2025 weer
            volledig op schijnzelfstandigheid. Of je zelfstandig werkt, hangt af van hoe het werk in de praktijk gaat, niet van wat er in een cv of
            contract staat. Sommige opdrachtgevers sluiten zzp&apos;ers daarom uit: de aanvraag hierboven meldde dat de winnaar via payroll of
            detachering moest werken. Je cv kan alleen eerlijk laten zien hoe je onderneming eruitziet. Bronnen: <Source id="handhaving" />;{" "}
            <Source id="schijnzelfstandigheid" />.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Lengte, taal en referenties</h2>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            Houd voor jezelf een master-cv bij met alle opdrachten. Wat je verstuurt is een gerichte versie: voor intermediairs en bedrijven meestal
            2 pagina&apos;s, met de opdrachten die bij deze aanvraag passen. Noemt de aanvraag een maximum, houd je daaraan; meer pagina&apos;s
            worden soms niet gelezen.
          </p>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            Is de aanvraag in het Nederlands, stuur dan een Nederlands cv, ook als je meestal in het Engels werkt. Vraag na elke afgeronde opdracht of
            je opdrachtgever referent wil zijn, zodat je bij een aanvraag die referenties eist niet hoeft te zoeken. Noem naam, functie, organisatie
            en de opdracht; telefoon of e-mail alleen met toestemming.
          </p>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            Stuur een pdf met een rustige opmaak: inhuursystemen lezen tekst uit je bestand, en tekst in afbeeldingen of tabellen gaat dan
            verloren. Meer daarover in de{" "}
            <Link href="/ats-cv-template" className="underline underline-offset-4">
              uitleg over ATS-vriendelijke cv&apos;s
            </Link>
            .
          </p>
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
              sampleCV={zzpCvSample}
              label="Begin met het ingevulde voorbeeld"
              pagePath={PATH}
              trackingLocation={`zzp_guide:${PATH}:checklist`}
              trackingLabel="use_zzp_example"
            />
            <Link href="/cv-check/vacature" className="wk-button wk-button-secondary">
              Vergelijk je cv met de opdracht
            </Link>
          </div>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Veelgestelde vragen over een zzp cv</h2>
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
