import type { Metadata } from "next";
import Link from "next/link";
import { AgencyContentView } from "@/components/agency/AgencyContentAnalytics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";
import { AGENCY_MONTHLY_CREDIT_LIMIT } from "@/lib/agency-plan";
import { AGENCY_CONTENT_MODIFIED, AGENCY_CONTENT_PUBLISHED } from "@/lib/agency-content";

const path = "/voor-bureaus/kennisbank/matchpack-handleiding";
const pageUrl = `https://werkcv.nl${path}`;
const route = getAgencyAcquisitionRoute(path)!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: pageUrl },
  openGraph: { title: route.title, description: route.description, url: pageUrl, type: "article", locale: "nl_NL" },
};

const faqs = [
  {
    question: "Wanneer gebruikt MatchPack een Agency-credit?",
    answer: `Analyse en conceptreview gebruiken geen credit. Eén nieuw zelfstandig CV-document of één definitief goedgekeurd MatchPack gebruikt één credit uit de gedeelde hoeveelheid van ${AGENCY_MONTHLY_CREDIT_LIMIT} CV-credits. Bewerken en opnieuw downloaden gebruiken geen extra credit.`,
  },
  {
    question: "Wat betekent sterk, gedeeltelijk en ontbrekend bewijs?",
    answer: "Sterk betekent dat de bron het vereiste concreet ondersteunt. Gedeeltelijk betekent dat er verwante informatie is maar een detail, schaal of context ontbreekt. Ontbrekend betekent dat het aangeleverde CV het vereiste niet betrouwbaar ondersteunt. Ontbrekend bewijs blijft een open punt.",
  },
  {
    question: "Is de contactvrije versie volledig anoniem?",
    answer: "Nee. De contactvrije versie verwijdert bekende directe contactvelden, maar werkgevers, scholen, projecten, locaties en zeldzame tekst kunnen de kandidaat herkenbaar maken. Controleer de echte PDF of DOCX vóór delen.",
  },
  {
    question: "Wie is verantwoordelijk voor de eindcontrole?",
    answer: "De recruiter blijft verantwoordelijk voor broncontrole, kandidaatbevoegdheid, actuele praktische gegevens, de gekozen outputvariant en verzending aan de opdrachtgever. MatchPack ondersteunt die controle maar neemt geen selectie- of juridisch besluit over.",
  },
];

export default function MatchPackGuidePage() {
  const publishedDate = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${AGENCY_CONTENT_PUBLISHED}T00:00:00.000Z`));
  const modifiedDate = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${AGENCY_CONTENT_MODIFIED}T00:00:00.000Z`));
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: route.h1,
    description: metadata.description,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
    datePublished: AGENCY_CONTENT_PUBLISHED,
    dateModified: AGENCY_CONTENT_MODIFIED,
    inLanguage: "nl-NL",
    about: ["MatchPack", "kandidaatvoorstel", "recruitment", "CV-bewijs"],
  };

  return (
    <div className="wk-agency-marketing">
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <AgencyContentView kind="guide" path={path} slug="matchpack-handleiding" />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Voor bureaus", href: "/voor-bureaus" }, { label: "Kennisbank", href: "/voor-bureaus/kennisbank" }, { label: "MatchPack handleiding", href: path }]} />
      <JsonLd data={articleSchema} />
      <FAQJsonLd questions={faqs} />

      <article>
        <header className="min-w-0 max-w-4xl py-12 sm:py-16">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">MatchPack · recruiterhandleiding</p>
          <h1 className="mt-4 break-words text-4xl font-black tracking-tight sm:text-6xl">{route.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">MatchPack verbindt functie-eisen met concreet bewijs uit één kandidaat-CV. Het maakt ook zichtbaar wat niet bewezen is. De recruiter controleert, corrigeert en keurt goed voordat een PDF of DOCX naar een opdrachtgever gaat.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-600"><span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Geen ATS of automatische selectie</span><span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Menselijke eindcontrole</span><span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Gedeeld: {AGENCY_MONTHLY_CREDIT_LIMIT} CV-credits</span><span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Gepubliceerd {publishedDate}</span><span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Bijgewerkt {modifiedDate}</span></div>
        </header>

        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
          <div className="space-y-10">
            <section id="workflow" className="wk-card min-w-0 p-6 sm:p-8"><h2 className="text-3xl font-semibold">1. Start met drie bronnen</h2><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Gebruik één vacaturetekst, één kandidaat-CV en de recruiter-notities die je bevoegd bent te verwerken. Een vacaturetitel is optioneel; de volledige vacaturetekst is nodig om eisen aan bronbewijs te koppelen.</p><ol className="mt-5 space-y-3 text-sm font-semibold text-[var(--wk-ink)]"><li><span className="mr-2 font-black text-[var(--wk-primary)]">01</span> Upload een tekstgebaseerde PDF of DOCX. Een gescande of lege PDF kan geen betrouwbare bronverwijzingen opleveren.</li><li><span className="mr-2 font-black text-[var(--wk-primary)]">02</span> Plak de volledige vacaturetekst, inclusief verantwoordelijkheden, eisen, uren, locatie en praktische voorwaarden.</li><li><span className="mr-2 font-black text-[var(--wk-primary)]">03</span> Gebruik fictieve of correct geautoriseerde gegevens tijdens testen en controleer of de gekozen kandidaat voor deze verwerking mag worden gebruikt.</li></ol></section>

            <section id="evidence" className="wk-card wk-card-dark min-w-0 p-6 sm:p-8"><h2 className="text-3xl font-semibold">2. Lees bewijs als een controlelijst</h2><p className="mt-4 text-sm font-medium leading-relaxed text-white/75">Een match is geen aanname. Open iedere functie-eis en controleer de bronpagina, sectie, regel en exacte snippet. De tekst moet terug te vinden zijn in de aangeleverde CV- of vacaturebron.</p><div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-[var(--wk-radius-sm)] border border-emerald-300/50 bg-emerald-300/10 p-4"><p className="font-black text-emerald-300">Sterk</p><p className="mt-2 text-xs leading-relaxed text-white/75">De bron noemt het vereiste concreet, bijvoorbeeld tool, schaal, opleiding of resultaat.</p></div><div className="rounded-[var(--wk-radius-sm)] border border-amber-300/50 bg-amber-300/10 p-4"><p className="font-black text-amber-300">Gedeeltelijk</p><p className="mt-2 text-xs leading-relaxed text-white/75">Er is verwante context, maar een belangrijk detail moet worden bevestigd.</p></div><div className="rounded-[var(--wk-radius-sm)] border border-rose-300/50 bg-rose-300/10 p-4"><p className="font-black text-rose-300">Ontbreekt</p><p className="mt-2 text-xs leading-relaxed text-white/75">De bron ondersteunt het vereiste niet. Laat het als open punt staan.</p></div></div><p className="mt-5 border-l-4 border-[var(--wk-highlight)] pl-4 text-sm font-bold text-[var(--wk-highlight)]">Een zoekwoord zonder context is geen bewijs van aantoonbare ervaring.</p></section>

            <section id="review" className="wk-card min-w-0 p-6 sm:p-8"><h2 className="text-3xl font-semibold">3. Corrigeer voordat je schrijft</h2><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Controleer kandidaatvelden, werkervaring, opleidingen, vaardigheden en praktische informatie tegen de originele CV. Bevestig of corrigeer bewijsregels; wijs een niet-onderbouwde regel af. Beschikbaarheid, uren, tarief, opzegtermijn en werkautorisatie blijven open tenzij de recruiter of kandidaat ze heeft bevestigd.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><div className="wk-card bg-[var(--wk-surface-subtle)] p-4"><h3 className="font-semibold">Wat je mag corrigeren</h3><p className="mt-2 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Extractiefouten, functietitels, tekstvolgorde, bewijsstatus en voorsteltekst—zolang de correctie door de bron of een bevoegde recruiter wordt gedragen.</p></div><div className="wk-card bg-[var(--wk-surface-subtle)] p-4"><h3 className="font-semibold">Wat je niet mag invullen</h3><p className="mt-2 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Een ontbrekende startdatum, een niet-genoemde tool, een verzonnen schaal, een salarisaanname of een positieve claim die alleen uit de vacature komt.</p></div></div></section>

            <section id="versions" className="wk-card min-w-0 p-6 sm:p-8"><h2 className="text-3xl font-semibold">4. Bewaar wijzigingen en beoordeel output</h2><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Elke opgeslagen conceptwijziging maakt een nieuwe versie met actor, tijdstip en gewijzigde velden. Controleer de zichtbare verschillen voordat je de klantintroductie en begeleidende e-mail afrondt.</p><ul className="mt-5 space-y-3 text-sm font-semibold text-[var(--wk-ink)]"><li>• Kies een volledig voorstel of een versie zonder directe contactgegevens.</li><li>• Controleer PDF én DOCX als beide worden gedeeld.</li><li>• Controleer op naam, e-mail, telefoon, URL, adres en postcode, maar ook op indirecte herkenning via werkgevers, opleidingen en projecten.</li><li>• Kopieer de e-mail pas nadat de tekst overeenkomt met de gekozen outputvariant.</li></ul></section>

            <section id="approval" className="wk-card wk-card-warning min-w-0 p-6 sm:p-8"><h2 className="text-3xl font-semibold">5. Keur pas goed na de checklist</h2><p className="mt-4 text-sm font-medium leading-relaxed">De goedkeuring is de commerciële grens: daarna wordt één credit gebruikt en ontstaat het gekoppelde CV-document. Bevestig dat je de vacature-eisen, bronbewijzen, kandidaatdata, commerciële gegevens, e-mail en gekozen output hebt gecontroleerd en bevoegd bent om de informatie te delen.</p><p className="mt-4 text-sm font-black">Analyse en conceptreview gebruiken geen credit. Een nieuw zelfstandig CV of goedgekeurd MatchPack gebruikt één gedeelde credit uit de {AGENCY_MONTHLY_CREDIT_LIMIT} per factuurperiode.</p></section>

            <section id="retention" className="wk-card wk-card-success min-w-0 p-6 sm:p-8"><h2 className="text-3xl font-semibold">6. Retentie, rollen en verwijderen</h2><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Nieuwe Agency-abonnementen starten met 90 dagen inhoudelijke MatchPack-retentie. De eigenaar kan 30, 90, 180 of 365 dagen kiezen. Bestaande accounts moeten het beleid expliciet activeren; de exacte vervaldatum staat op het MatchPack.</p><ul className="mt-5 space-y-3 text-sm font-semibold text-[var(--wk-ink)]"><li><strong>Owner:</strong> beheert instellingen, templates, team en alle verwijderacties.</li><li><strong>Editor:</strong> maakt en wijzigt concepten, importeert CV&apos;s en exporteert goedgekeurde output.</li><li><strong>Reviewer:</strong> controleert bewijs, corrigeert en keurt goed.</li><li><strong>Viewer:</strong> leest bestaande workspace-inhoud zonder export of mutatie.</li></ul><p className="mt-5 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Verwijderen verwijdert kandidaatinhoud, revisies en een veilig afgeleide CV. De gebruikte credit wordt niet teruggegeven. Facturen, abonnement en niet-inhoudelijke verbruiksregistratie blijven behouden.</p></section>

            <section id="limits" className="wk-card min-w-0 p-6 sm:p-8"><h2 className="text-3xl font-semibold">Wat MatchPack niet belooft</h2><ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]"><li>Het is geen ATS, kandidatenranking of automatische hiring recommendation.</li><li>Een score is geen bewijs dat een kandidaat geschikt is.</li><li>Contactgegevens verwijderen is geen juridische anonimisatie.</li><li>AI-uitvoer vervangt geen recruiter, kandidaatbevestiging, privacygrondslag of klantafspraak.</li><li>Een klantklare export is pas klaar na jouw controle van de echte bestanden.</li></ul></section>

            <section id="faq" className="wk-section border-t border-[var(--wk-border)]"><h2 className="text-3xl font-semibold">Veelgestelde vragen</h2><div className="mt-5 space-y-4">{faqs.map((faq) => <details key={faq.question} className="wk-card p-4"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{faq.answer}</p></details>)}</div></section>
          </div>
          <aside className="wk-card wk-card-accent h-fit min-w-0 p-5 lg:sticky lg:top-6"><p className="text-xs font-black uppercase tracking-[0.16em]">Direct naar</p><nav className="mt-4 space-y-3 text-sm font-semibold"><a href="#workflow" className="block underline underline-offset-4">Bronnen</a><a href="#evidence" className="block underline underline-offset-4">Bewijsstatus</a><a href="#review" className="block underline underline-offset-4">Recruiter-review</a><a href="#versions" className="block underline underline-offset-4">Versies en output</a><a href="#approval" className="block underline underline-offset-4">Goedkeuring</a><a href="#retention" className="block underline underline-offset-4">Retentie en rollen</a><a href="#faq" className="block underline underline-offset-4">FAQ</a></nav><Link href="/tools/kandidaatvoorstel-checker" className="wk-button wk-button-primary mt-6 w-full">Gratis evidence checker →</Link></aside>
        </div>
      </article>
    </main>
    </div>
  );
}
