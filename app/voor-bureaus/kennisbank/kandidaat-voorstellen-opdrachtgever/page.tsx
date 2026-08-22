import type { Metadata } from "next";
import Link from "next/link";
import { AgencyContentLink, AgencyContentView } from "@/components/agency/AgencyContentAnalytics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { AGENCY_CONTENT_MODIFIED, AGENCY_CONTENT_PUBLISHED } from "@/lib/agency-content";

const slug = "kandidaat-voorstellen-opdrachtgever";
const path = `/voor-bureaus/kennisbank/${slug}`;

export const metadata: Metadata = {
  title: "Hoe stelt u een kandidaat professioneel voor? | WerkCV",
  description:
    "Praktische structuur voor een onderbouwd kandidaatvoorstel met CV-bewijs, bevestigde gegevens, open punten en een duidelijke introductie-e-mail.",
  alternates: { canonical: `https://werkcv.nl${path}` },
  openGraph: {
    title: "Hoe stelt u een kandidaat professioneel voor aan een opdrachtgever?",
    description:
      "Maak zichtbaar waarom de kandidaat aansluit, welk bewijs beschikbaar is en welke informatie nog moet worden bevestigd.",
    url: `https://werkcv.nl${path}`,
    type: "article",
    locale: "nl_NL",
  },
};

const proposalFields = [
  ["Doelrol", "Vacature en opdrachtbevestiging", "Exacte functie- of opdrachttitel"],
  ["Kandidaatsamenvatting", "CV plus bevestigde intake", "Twee tot vier zinnen over relevante aansluiting"],
  ["Bewijs per functie-eis", "Concreet CV-fragment", "Sterk, gedeeltelijk of ontbrekend bewijs"],
  ["Beschikbaarheid en opzegtermijn", "Bevestiging door kandidaat", "Exact of duidelijk als nog te bevestigen"],
  ["Uren, locatie en werkvorm", "Kandidaat plus vacature", "Praktische match en eventuele beperking"],
  ["Salaris- of tariefindicatie", "Bevestigde afspraak", "De afgesproken bandbreedte, nooit een AI-aanname"],
  ["Taalniveau en werkautorisatie", "Kandidaat en relevante documenten", "Alleen opnemen wanneer relevant en gecontroleerd"],
  ["Open punten", "Review van vacature, CV en intake", "Expliciete vragen, niet verbergen in positieve copy"],
] as const;

const evidenceRows = [
  {
    requirement: "Hbo werk- en denkniveau",
    status: "Sterk",
    evidence: "Bachelor HRM en zeven jaar relevante HR-ervaring.",
    action: "Geen aanvullende claim nodig.",
    tone: "bg-emerald-100 text-emerald-900",
  },
  {
    requirement: "Advies aan leidinggevenden",
    status: "Sterk",
    evidence: "CV vermeldt advies aan 24 teamleiders over verzuim en ontwikkeling.",
    action: "Vraag eventueel welk resultaat aantoonbaar is.",
    tone: "bg-emerald-100 text-emerald-900",
  },
  {
    requirement: "Ervaring met AFAS",
    status: "Gedeeltelijk",
    evidence: "HR-systemen zijn genoemd; AFAS staat niet expliciet in het CV.",
    action: "Bevestig het systeem en gebruiksniveau bij de kandidaat.",
    tone: "bg-amber-100 text-amber-950",
  },
  {
    requirement: "Beschikbaar per 1 oktober",
    status: "Ontbreekt",
    evidence: "Een CV is geen betrouwbare bron voor actuele beschikbaarheid.",
    action: "Vraag de datum na en houd het veld leeg tot bevestiging.",
    tone: "bg-rose-100 text-rose-900",
  },
];

const faqs = [
  {
    question: "Wat moet er in een professioneel kandidaatvoorstel staan?",
    answer:
      "Neem minimaal de doelrol, een korte relevante samenvatting, bewijs voor de belangrijkste functie-eisen, bevestigde beschikbaarheid en praktische voorwaarden, zichtbare open punten en het passende volledige of contactvrije kandidaat-CV op. Houd interne recruiternotities buiten het klantdocument.",
  },
  {
    question: "Hoe schrijft u een goede kandidaatintroductie?",
    answer:
      "Begin met de doelrol en twee of drie aantoonbare redenen waarom het profiel aansluit. Verbind iedere reden aan concrete ervaring, schaal of verantwoordelijkheid uit het CV. Sluit af met relevante praktische informatie of een open punt. Vermijd algemene woorden zoals gedreven, perfect of uitstekende match zonder bewijs.",
  },
  {
    question: "Hoe onderbouwt u dat een kandidaat aan een functie-eis voldoet?",
    answer:
      "Plaats de eis naast een controleerbaar CV-fragment: functie, werkgever, project, vaardigheid, opleiding of resultaat. Een los zoekwoord is niet automatisch bewijs van ervaring. Als de bron slechts gedeeltelijk aansluit, benoem dat en formuleer de vraag die de recruiter nog moet stellen.",
  },
  {
    question: "Wat doet u wanneer informatie niet in het CV staat?",
    answer:
      "Laat de informatie open en vraag deze na. Gebruik bijvoorbeeld ‘nog te bevestigen’ voor beschikbaarheid of specifieke toolervaring. Voeg het antwoord pas toe nadat de kandidaat het heeft bevestigd. Maak van ontbrekende informatie nooit een waarschijnlijk klinkende AI-claim.",
  },
  {
    question: "Moet de kandidaat het voorstel goedkeuren voordat het wordt verstuurd?",
    answer:
      "Spreek binnen uw bureau een controle- en toestemmingsproces af dat past bij uw dienstverlening en rechtsgrond. Bevestig in ieder geval actuele kandidaatfeiten en wat met de opdrachtgever wordt gedeeld. WerkCV heeft momenteel geen ingebouwde kandidaatgoedkeuringsflow; de recruiter blijft verantwoordelijk voor deze processtap.",
  },
  {
    question: "Kan AI zelfstandig bepalen of een kandidaat geschikt is?",
    answer:
      "Gebruik AI niet als zelfstandig selectieoordeel. AI kan eisen structureren en mogelijke bewijsplaatsen aanwijzen, maar de bron kan onvolledig zijn en de analyse kan fouten bevatten. De NVP Sollicitatiecode benadrukt transparantie, zorgvuldig databeheer en menselijk toezicht bij AI in werving en selectie.",
  },
  {
    question: "Wanneer gebruikt u een volledig of contactvrij kandidaat-CV?",
    answer:
      "Gebruik de versie die past bij het afgesproken doel, de verwachtingen van de kandidaat en uw grondslag voor delen. Een versie zonder directe contactgegevens kan directe velden verwijderen, maar werkgevers, opleidingen, projecten of tekstfragmenten kunnen de kandidaat nog herkenbaar maken. Controleer daarom het echte PDF-bestand vóór verzending.",
  },
];

const sources = [
  {
    label: "NVP Sollicitatiecode 2025",
    href: "https://www.nvp-hrnetwerk.nl/l/library/download/urn%3Auuid%3Ac902b6f9-dcac-4c26-9a13-8b90f4d2fe5f/mos25068%2Bbrochure%2Bsollicitatiecode%2Bonline.pdf",
    note: "Ondersteunt de uitgangspunten zorgvuldigheid, vertrouwelijkheid, transparantie over AI en menselijk toezicht bij werving en selectie.",
  },
  {
    label: "ABU Gedragscode",
    href: "https://gedragscode.abu.nl/",
    note: "Ondersteunt het belang van kennis van kandidaat en opdrachtgever, afgesproken kwalificaties en realistische, transparante verwachtingen.",
  },
  {
    label: "Rijksoverheid: relevante vragen tijdens sollicitatie",
    href: "https://www.rijksoverheid.nl/vraag-en-antwoord/gelijke-behandeling-op-het-werk/welke-vragen-mogen-niet-gesteld-worden-tijdens-een-sollicitatiegesprek",
    note: "Ondersteunt het beginsel dat vragen en gedeelde informatie relevant moeten zijn voor de functie en niet onnodig over privézaken of gezondheid mogen gaan.",
  },
  {
    label: "Rijksoverheid: persoonsgegevens aan anderen doorgeven",
    href: "https://www.rijksoverheid.nl/vraag-en-antwoord/privacy-en-persoonsgegevens/mogen-organisaties-mijn-persoonsgegevens-aan-anderen-doorgeven",
    note: "Geeft algemene uitleg over het delen van persoonsgegevens. Uw eigen grondslag en proces moeten afzonderlijk worden beoordeeld.",
  },
];

export default function CandidateProposalGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Hoe stelt u een kandidaat professioneel voor aan een opdrachtgever?",
    description: metadata.description,
    url: `https://werkcv.nl${path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://werkcv.nl${path}` },
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
    datePublished: AGENCY_CONTENT_PUBLISHED,
    dateModified: AGENCY_CONTENT_MODIFIED,
    inLanguage: "nl-NL",
    about: ["kandidaatvoorstel", "recruitment", "functie-eisen", "CV-bewijs"],
  };

  return (
    <div className="wk-agency-marketing">
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <AgencyContentView kind="guide" path={path} slug={slug} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Voor bureaus", href: "/voor-bureaus" }, { label: "Kennisbank", href: "/voor-bureaus/kennisbank" }, { label: "Kandidaat voorstellen", href: path }]} />

      <article>
        <header className="wk-agency-marketing-hero grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Kandidaatvoorstel · praktische gids</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Hoe stelt u een kandidaat professioneel voor aan een opdrachtgever?</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
              Een professioneel kandidaatvoorstel verbindt de belangrijkste functie-eisen aan controleerbaar CV-bewijs en houdt onbevestigde informatie zichtbaar. Voeg een korte kandidaatintroductie, beschikbaarheid, locatie, uren, salaris- of tariefindicatie en opzegtermijn alleen toe wanneer deze zijn bevestigd. Scheid interne recruiternotities van klantinformatie en controleer de volledige of contactvrije PDF vóór verzending.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-600">
              <span className="border border-slate-300 bg-white px-3 py-2">Gepubliceerd 16 augustus 2026</span>
              <span className="border border-slate-300 bg-white px-3 py-2">12 minuten leestijd</span>
              <span className="border border-slate-300 bg-white px-3 py-2">Operationele uitleg, geen juridisch advies</span>
            </div>
          </div>
          <aside className="border-2 border-slate-950 bg-emerald-100 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">De kwaliteitsvraag</p>
            <p className="mt-3 text-2xl font-black leading-tight">Kan de opdrachtgever ieder belangrijk oordeel terugvoeren naar een bron of bevestiging?</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">Zo niet, dan is de tekst overtuigender geworden dan het bewijs.</p>
          </aside>
        </header>

        <section className="border-y-2 border-slate-950 py-12 sm:py-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-700">De minimale inhoud</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Acht onderdelen en de bron die erbij hoort.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">De tabel voorkomt dat intakekennis, CV-inhoud en aannames door elkaar gaan lopen. Pas de velden aan uw eigen dienstverlening aan.</p>
          <div className="mt-7 overflow-x-auto border-2 border-slate-950 bg-white">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead className="bg-slate-950 text-white"><tr><th className="p-4">Onderdeel</th><th className="p-4">Betrouwbare bron</th><th className="p-4">Wat de klant ziet</th></tr></thead>
              <tbody>{proposalFields.map(([field, source, output]) => <tr key={field} className="border-t border-slate-200 align-top"><th className="p-4 font-black">{field}</th><td className="p-4 text-slate-600">{source}</td><td className="p-4 text-slate-600">{output}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Van oordeel naar bewijs</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Een eisenmatrix hoeft niet ingewikkeld te zijn.</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">Gebruik per belangrijke eis vier velden: de eis, de status, het concrete CV-bewijs en de eerlijke vervolgstap. De score is secundair; de herleidbaarheid is het werkelijke product.</p>
            </div>
            <div className="space-y-3">
              {evidenceRows.map((row) => (
                <div key={row.requirement} className="grid gap-3 border-2 border-slate-200 bg-white p-4 sm:grid-cols-[1fr_auto_1.3fr_1.1fr] sm:items-start">
                  <p className="text-sm font-black">{row.requirement}</p>
                  <span className={`w-fit px-2 py-1 text-xs font-black ${row.tone}`}>{row.status}</span>
                  <p className="text-xs leading-relaxed text-slate-600">{row.evidence}</p>
                  <p className="text-xs font-semibold leading-relaxed text-slate-700">{row.action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y-2 border-slate-950 py-12 sm:py-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">Voor en na</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Maak de tekst specifieker, niet groter.</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="border-2 border-rose-300 bg-rose-50 p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-800">Te algemeen</p>
              <p className="mt-4 text-xl font-black leading-snug">“Nina is een ervaren HR-professional en een uitstekende match voor deze opdracht.”</p>
              <p className="mt-4 text-sm leading-relaxed text-rose-950">De klant kan niet zien welke ervaring relevant is of waarom “uitstekend” gerechtvaardigd is.</p>
            </article>
            <article className="border-2 border-emerald-400 bg-emerald-50 p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">Herleidbaar</p>
              <p className="mt-4 text-xl font-black leading-snug">“Nina heeft zeven jaar HR-ervaring en adviseerde volgens haar CV 24 teamleiders over verzuim en medewerkerontwikkeling. Haar AFAS-ervaring en startdatum worden nog bevestigd.”</p>
              <p className="mt-4 text-sm leading-relaxed text-emerald-950">De relevante ervaring is zichtbaar en de twee open punten blijven eerlijk in beeld.</p>
            </article>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Intern versus klant</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Niet iedere nuttige notitie hoort in het voorstel.</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <article className="border-2 border-slate-950 bg-slate-950 p-5 text-white"><h3 className="font-black text-emerald-300">Intern houden</h3><ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300"><li>Interviewhypotheses</li><li>Onderhandelingsruimte</li><li>Niet-bevestigde indrukken</li><li>Persoonlijke of irrelevante gegevens</li><li>Vragen voor de volgende intake</li></ul></article>
                <article className="border-2 border-slate-950 bg-white p-5"><h3 className="font-black text-emerald-800">Klantgericht delen</h3><ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600"><li>Relevante samenvatting</li><li>CV-bewijs per kerneis</li><li>Bevestigde voorwaarden</li><li>Zakelijke open punten</li><li>Afgesproken CV-versie</li></ul></article>
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-700">Volledig of contactvrij</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Redactie is een controleproces, geen vinkje.</h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600">Een versie zonder directe contactgegevens kan naam- en contactvelden verwijderen, maar de kandidaat kan herkenbaar blijven door werkgevers, opleidingen, projecten, locaties, datums of een naam in lopende tekst. Controleer daarom de uiteindelijke PDF en leg binnen uw bureau vast waarom en met wie de gegevens worden gedeeld.</p>
              <div className="mt-5 border-2 border-amber-400 bg-amber-50 p-4 text-sm font-semibold leading-relaxed text-amber-950">WerkCV garandeert geen juridische anonimiteit of AVG-compliance. Raadpleeg bij twijfel uw privacyprofessional of juridisch adviseur.</div>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-slate-950 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Begeleidende e-mail</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Geef de klant een reden om het document te openen.</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">Herhaal niet het hele voorstel. Benoem de rol, twee relevante redenen, de bijlage en eventuele open punten die u mondeling wilt toelichten.</p>
            </div>
            <div className="border-2 border-slate-950 bg-white p-6 shadow-[5px_5px_0px_0px_rgba(78,205,196,1)]">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Fictief voorbeeld</p>
              <p className="mt-4 font-black">Onderwerp: Kandidaatvoorstel HR-adviseur — Nina de Vries</p>
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
                <p>Beste opdrachtgever,</p>
                <p>Graag stel ik Nina de Vries voor voor de rol HR-adviseur. Zij heeft zeven jaar relevante HR-ervaring en adviseerde volgens haar CV 24 teamleiders over verzuim en medewerkerontwikkeling.</p>
                <p>Het gecontroleerde kandidaatvoorstel vindt u in de bijlage. Haar exacte startdatum en ervaring met AFAS worden nog bevestigd; die punten licht ik graag toe zodra de intake is afgerond.</p>
                <p>Met vriendelijke groet,</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Werkproces</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Zes controles vóór verzending.</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["1", "Lees de vacature", "Markeer alleen de eisen die de opdrachtgever werkelijk gebruikt om te beslissen."],
              ["2", "Controleer het bron-CV", "Zoek concreet bewijs en onderscheid een genoemd zoekwoord van aantoonbare ervaring."],
              ["3", "Vul de intakegaten", "Vraag actuele beschikbaarheid, voorwaarden en wensen rechtstreeks na."],
              ["4", "Scheid intern en extern", "Houd hypotheses en gevoelige notities buiten het klantdocument."],
              ["5", "Controleer beide versies", "Lees de volledige én eventueel contactvrije PDF als echte ontvanger."],
              ["6", "Leg de snapshot vast", "Verstuur alleen de versie die de recruiter inhoudelijk heeft goedgekeurd."],
            ].map(([number, title, body]) => <li key={number} className="border-2 border-slate-950 bg-white p-5"><span className="font-mono text-sm font-black text-emerald-700">0{number}</span><h3 className="mt-3 font-black">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p></li>)}
          </ol>
        </section>

        <section className="border-y-2 border-slate-950 py-12 sm:py-16">
          <h2 className="text-3xl font-black tracking-tight">Veelgestelde vragen</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => <details key={faq.question} className="border-2 border-slate-200 bg-white p-4 open:border-slate-950"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">{faq.answer}</p></details>)}
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Bronnen en afbakening</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Waar deze werkwijze op steunt.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">Deze gids combineert officiële gedrags- en overheidsbronnen met de operationele WerkCV-workflow. De bronnen bepalen niet één verplicht kandidaatvoorstel-format en deze pagina is geen juridisch advies.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="border-2 border-slate-950 bg-white p-5 transition-colors hover:bg-emerald-50"><h3 className="font-black text-emerald-800 underline decoration-2 underline-offset-4">{source.label}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{source.note}</p></a>)}
          </div>
        </section>

        <section className="border-2 border-slate-950 bg-slate-950 p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)] sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">Van checklist naar één review</p>
              <h2 className="mt-2 max-w-2xl text-3xl font-black">WerkCV brengt vacature, bewijs, open punten en klantoutput samen.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">Bekijk het fictieve resultaat voordat u beslist of de workflow bij uw bureau past.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <AgencyContentLink href="/agency#voorbeeld" path={path} location="guide_bottom" intent="sample" className="border-2 border-white bg-white px-5 py-3 text-center text-sm font-black text-slate-950">Bekijk het voorbeeld</AgencyContentLink>
              <AgencyContentLink href="/agency#plan" path={path} location="guide_bottom" intent="product" className="border-2 border-white bg-yellow-300 px-5 py-3 text-center text-sm font-black text-slate-950">Start Agency · €149/maand</AgencyContentLink>
            </div>
          </div>
        </section>

        <nav aria-label="Verder lezen" className="mt-10 flex flex-wrap gap-4 text-sm font-black">
          <Link href="/voor-bureaus/kennisbank" className="text-emerald-800 underline decoration-2 underline-offset-4">← Terug naar de kennisbank</Link>
          <Link href="/voor-bureaus" className="text-emerald-800 underline decoration-2 underline-offset-4">Bekijk WerkCV voor bureaus</Link>
        </nav>
      </article>

      <FAQJsonLd questions={faqs} />
      <JsonLd data={articleSchema} />
    </main>
    </div>
  );
}
