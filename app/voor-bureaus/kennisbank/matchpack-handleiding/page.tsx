import type { Metadata } from "next";
import Link from "next/link";
import { AgencyContentView } from "@/components/agency/AgencyContentAnalytics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";

const path = "/voor-bureaus/kennisbank/matchpack-handleiding";
const pageUrl = `https://werkcv.nl${path}`;

export const metadata: Metadata = {
  title: "MatchPack handleiding voor recruiters | WerkCV",
  description:
    "Stap-voor-stap MatchPack handleiding: upload, bewijs per functie-eis, recruiter-review, correcties, versies, goedkeuring, PDF/DOCX-export, retentie en Agency-rollen.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "MatchPack handleiding voor recruiters", description: "Een controleerbare kandidaatvoorstel-workflow van CV en vacature naar klantklare output.", url: pageUrl, type: "article", locale: "nl_NL" },
};

const faqs = [
  {
    question: "Wanneer gebruikt MatchPack een Agency-slot?",
    answer: "Analyse en conceptreview gebruiken geen slot. Eén nieuw zelfstandig CV-document of één definitief goedgekeurd MatchPack gebruikt één slot uit de gedeelde maandallowance van maximaal 50. Bewerken en opnieuw downloaden gebruiken geen extra slot.",
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
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MatchPack handleiding voor recruiters",
    description: metadata.description,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
    inLanguage: "nl-NL",
    about: ["MatchPack", "kandidaatvoorstel", "recruitment", "CV-bewijs"],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <AgencyContentView kind="guide" path={path} slug="matchpack-handleiding" />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Voor bureaus", href: "/voor-bureaus" }, { label: "Kennisbank", href: "/voor-bureaus/kennisbank" }, { label: "MatchPack handleiding", href: path }]} />
      <JsonLd data={articleSchema} />
      <FAQJsonLd questions={faqs} />

      <article>
        <header className="max-w-4xl py-12 sm:py-16">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">MatchPack · recruiterhandleiding</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Van CV en vacature naar een controleerbaar kandidaatvoorstel.</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">MatchPack verbindt functie-eisen met concreet bewijs uit één kandidaat-CV. Het maakt ook zichtbaar wat niet bewezen is. De recruiter controleert, corrigeert en keurt goed voordat een PDF of DOCX naar een opdrachtgever gaat.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-600"><span className="border border-slate-300 bg-white px-3 py-2">Geen ATS of automatische selectie</span><span className="border border-slate-300 bg-white px-3 py-2">Menselijke eindcontrole</span><span className="border border-slate-300 bg-white px-3 py-2">Gedeelde allowance: maximaal 50</span></div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-10">
            <section id="workflow" className="border-2 border-slate-900 bg-white p-6 sm:p-8"><h2 className="text-3xl font-black">1. Start met drie bronnen</h2><p className="mt-4 text-sm leading-relaxed text-slate-700">Gebruik één vacaturetekst, één kandidaat-CV en de recruiter-notities die je bevoegd bent te verwerken. Een vacaturetitel is optioneel; de volledige vacaturetekst is nodig om eisen aan bronbewijs te koppelen.</p><ol className="mt-5 space-y-3 text-sm font-semibold text-slate-800"><li><span className="mr-2 font-black text-emerald-700">01</span> Upload een tekstgebaseerde PDF of DOCX. Een gescande of lege PDF kan geen betrouwbare bronverwijzingen opleveren.</li><li><span className="mr-2 font-black text-emerald-700">02</span> Plak de volledige vacaturetekst, inclusief verantwoordelijkheden, eisen, uren, locatie en praktische voorwaarden.</li><li><span className="mr-2 font-black text-emerald-700">03</span> Gebruik fictieve of correct geautoriseerde gegevens tijdens testen en controleer of de gekozen kandidaat voor deze verwerking mag worden gebruikt.</li></ol></section>

            <section id="evidence" className="border-2 border-slate-900 bg-slate-950 p-6 text-white sm:p-8"><h2 className="text-3xl font-black">2. Lees bewijs als een controlelijst</h2><p className="mt-4 text-sm leading-relaxed text-slate-200">Een match is geen aanname. Open iedere functie-eis en controleer de bronpagina, sectie, regel en exacte snippet. De tekst moet terug te vinden zijn in de aangeleverde CV- of vacaturebron.</p><div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="border border-emerald-300 bg-emerald-300/10 p-4"><p className="font-black text-emerald-300">Sterk</p><p className="mt-2 text-xs leading-relaxed text-slate-200">De bron noemt het vereiste concreet, bijvoorbeeld tool, schaal, opleiding of resultaat.</p></div><div className="border border-amber-300 bg-amber-300/10 p-4"><p className="font-black text-amber-300">Gedeeltelijk</p><p className="mt-2 text-xs leading-relaxed text-slate-200">Er is verwante context, maar een belangrijk detail moet worden bevestigd.</p></div><div className="border border-rose-300 bg-rose-300/10 p-4"><p className="font-black text-rose-300">Ontbreekt</p><p className="mt-2 text-xs leading-relaxed text-slate-200">De bron ondersteunt het vereiste niet. Laat het als open punt staan.</p></div></div><p className="mt-5 border-l-4 border-yellow-300 pl-4 text-sm font-bold text-yellow-100">Een zoekwoord zonder context is geen bewijs van aantoonbare ervaring.</p></section>

            <section id="review" className="border-2 border-slate-900 bg-white p-6 sm:p-8"><h2 className="text-3xl font-black">3. Corrigeer voordat je schrijft</h2><p className="mt-4 text-sm leading-relaxed text-slate-700">Controleer kandidaatvelden, werkervaring, opleidingen, vaardigheden en praktische informatie tegen de originele CV. Bevestig of corrigeer bewijsregels; wijs een niet-onderbouwde regel af. Beschikbaarheid, uren, tarief, opzegtermijn en werkautorisatie blijven open tenzij de recruiter of kandidaat ze heeft bevestigd.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><div className="border-2 border-slate-200 bg-slate-50 p-4"><h3 className="font-black">Wat je mag corrigeren</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">Extractiefouten, functietitels, tekstvolgorde, bewijsstatus en voorsteltekst—zolang de correctie door de bron of een bevoegde recruiter wordt gedragen.</p></div><div className="border-2 border-slate-200 bg-slate-50 p-4"><h3 className="font-black">Wat je niet mag invullen</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">Een ontbrekende startdatum, een niet-genoemde tool, een verzonnen schaal, een salarisaanname of een positieve claim die alleen uit de vacature komt.</p></div></div></section>

            <section id="versions" className="border-2 border-slate-900 bg-white p-6 sm:p-8"><h2 className="text-3xl font-black">4. Bewaar wijzigingen en beoordeel output</h2><p className="mt-4 text-sm leading-relaxed text-slate-700">Elke opgeslagen conceptwijziging maakt een nieuwe versie met actor, tijdstip en gewijzigde velden. Controleer de zichtbare verschillen voordat je de klantintroductie en begeleidende e-mail afrondt.</p><ul className="mt-5 space-y-3 text-sm font-semibold text-slate-800"><li>• Kies een volledig voorstel of een versie zonder directe contactgegevens.</li><li>• Controleer PDF én DOCX als beide worden gedeeld.</li><li>• Controleer op naam, e-mail, telefoon, URL, adres en postcode, maar ook op indirecte herkenning via werkgevers, opleidingen en projecten.</li><li>• Kopieer de e-mail pas nadat de tekst overeenkomt met de gekozen outputvariant.</li></ul></section>

            <section id="approval" className="border-2 border-yellow-500 bg-yellow-50 p-6 sm:p-8"><h2 className="text-3xl font-black text-yellow-950">5. Keur pas goed na de checklist</h2><p className="mt-4 text-sm leading-relaxed text-yellow-950">De goedkeuring is de commerciële grens: daarna wordt één slot gebruikt en ontstaat het gekoppelde CV-document. Bevestig dat je de vacature-eisen, bronbewijzen, kandidaatdata, commerciële gegevens, e-mail en gekozen output hebt gecontroleerd en bevoegd bent om de informatie te delen.</p><p className="mt-4 text-sm font-black text-yellow-950">Analyse en conceptreview gebruiken geen slot. Een nieuw standalone CV of goedgekeurd MatchPack gebruikt één gedeeld slot uit maximaal 50 per factuurperiode.</p></section>

            <section id="retention" className="border-2 border-slate-900 bg-emerald-50 p-6 sm:p-8"><h2 className="text-3xl font-black">6. Retentie, rollen en verwijderen</h2><p className="mt-4 text-sm leading-relaxed text-slate-700">Nieuwe Agency-abonnementen starten met 90 dagen inhoudelijke MatchPack-retentie. De eigenaar kan 30, 90, 180 of 365 dagen kiezen. Bestaande accounts moeten het beleid expliciet activeren; de exacte vervaldatum staat op het MatchPack.</p><ul className="mt-5 space-y-3 text-sm font-semibold text-slate-800"><li><strong>Owner:</strong> beheert instellingen, templates, team en alle verwijderacties.</li><li><strong>Editor:</strong> maakt en wijzigt concepten, importeert CV&apos;s en exporteert goedgekeurde output.</li><li><strong>Reviewer:</strong> controleert bewijs, corrigeert en keurt goed.</li><li><strong>Viewer:</strong> leest bestaande workspace-inhoud zonder export of mutatie.</li></ul><p className="mt-5 text-sm leading-relaxed text-slate-700">Verwijderen verwijdert kandidaatinhoud, revisies en een veilig afgeleide CV. Het verbruikte slot wordt niet teruggegeven. Facturen, abonnement en niet-inhoudelijke verbruiksregistratie blijven behouden.</p></section>

            <section id="limits" className="border-2 border-slate-900 bg-white p-6 sm:p-8"><h2 className="text-3xl font-black">Wat MatchPack niet belooft</h2><ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700"><li>Het is geen ATS, kandidatenranking of automatische hiring recommendation.</li><li>Een score is geen bewijs dat een kandidaat geschikt is.</li><li>Contactgegevens verwijderen is geen juridische anonimisatie.</li><li>AI-uitvoer vervangt geen recruiter, kandidaatbevestiging, privacygrondslag of klantafspraak.</li><li>Een klantklare export is pas klaar na jouw controle van de echte bestanden.</li></ul></section>

            <section id="faq" className="border-t-2 border-slate-900 pt-8"><h2 className="text-3xl font-black">Veelgestelde vragen</h2><div className="mt-5 space-y-4">{faqs.map((faq) => <details key={faq.question} className="border-2 border-slate-200 bg-white p-4"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 text-sm leading-relaxed text-slate-700">{faq.answer}</p></details>)}</div></section>
          </div>
          <aside className="h-fit border-2 border-slate-900 bg-yellow-300 p-5 lg:sticky lg:top-6"><p className="text-xs font-black uppercase tracking-[0.16em]">Direct naar</p><nav className="mt-4 space-y-3 text-sm font-black"><a href="#workflow" className="block underline underline-offset-4">Bronnen</a><a href="#evidence" className="block underline underline-offset-4">Bewijsstatus</a><a href="#review" className="block underline underline-offset-4">Recruiter-review</a><a href="#versions" className="block underline underline-offset-4">Versies en output</a><a href="#approval" className="block underline underline-offset-4">Goedkeuring</a><a href="#retention" className="block underline underline-offset-4">Retentie en rollen</a><a href="#faq" className="block underline underline-offset-4">FAQ</a></nav><Link href="/tools/kandidaatvoorstel-checker" className="mt-6 block border-2 border-slate-900 bg-white px-3 py-3 text-center text-xs font-black">Gratis evidence checker →</Link></aside>
        </div>
      </article>
    </main>
  );
}
