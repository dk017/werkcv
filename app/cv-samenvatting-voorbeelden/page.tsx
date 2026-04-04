import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";

const frameworkSteps = [
  "Start met je rol + jaren ervaring (wie ben je professioneel?).",
  "Noem je specialisme en belangrijkste domein/sector.",
  "Bewijs je waarde met 1 concreet resultaat of KPI.",
  "Sluit af met wat je zoekt en wat je toevoegt in de nieuwe rol.",
];

const summaryExamples = [
  {
    title: "Starter (hbo/wo) — marketing",
    text: "Enthousiaste marketingstarter met stage-ervaring in content, e-mailcampagnes en social analytics. Tijdens mijn afstudeerstage verhoogde ik de nieuwsbrief CTR met 19% door onderwerpregels en segmentatie te optimaliseren. Ik zoek een junior marketingrol waarin ik data en creativiteit combineer voor meetbare groei.",
    why: "Werkt goed omdat de kandidaat direct context, bewijs en doelrichting geeft in één alinea.",
  },
  {
    title: "Administratief medewerker",
    text: "Nauwkeurige administratief medewerker met 6 jaar ervaring in dossierbeheer, planning en klantcontact binnen MKB-omgevingen. Ik verkortte de factuurdoorlooptijd met 24% door een strakkere workflow in te richten tussen finance en operations. Ik breng structuur, eigenaarschap en rust in teams met hoge werkdruk.",
    why: "Sterk door combinatie van betrouwbaarheid + procesverbetering + resultaat.",
  },
  {
    title: "Klantenservice specialist",
    text: "Klantgerichte supportprofessional met 4 jaar ervaring in omnichannel klantenservice (telefoon, mail, chat). Ik behaalde een gemiddelde CSAT van 9,2 en verminderde escalaties met 21% via betere first-response scripts. Ik zoek een rol waar ik servicekwaliteit en teamcoaching kan combineren.",
    why: "Kwaliteitsmetrics maken de samenvatting geloofwaardig en relevant.",
  },
  {
    title: "Software developer",
    text: "Full-stack developer met 5 jaar ervaring in TypeScript, Node.js en React binnen productteams. In mijn huidige rol heb ik de laadtijd van kernpagina's met 38% verlaagd en releasecycli versneld met CI/CD-optimalisaties. Ik richt me op schaalbare producten met hoge gebruikersimpact.",
    why: "Technische stack + impact + productfocus zijn direct zichtbaar.",
  },
  {
    title: "Verpleegkundige",
    text: "BIG-geregistreerde verpleegkundige met 8 jaar ervaring in klinische zorg en multidisciplinaire samenwerking. Ik ben sterk in acute triage, patiëntcommunicatie en zorgcoördinatie, en droeg bij aan een 15% kortere overdrachttijd op de afdeling. Ik zoek een rol waarin kwaliteit van zorg en teamontwikkeling centraal staan.",
    why: "Combineert zorginhoud, samenwerking en operationele verbetering.",
  },
  {
    title: "Carrièreswitch naar data-analyse",
    text: "Resultaatgerichte operations professional met 7 jaar ervaring in procesverbetering en KPI-rapportage, momenteel in transitie naar data-analyse. Ik bouwde interne dashboards die wekelijkse rapportagetijd met 10 uur verlaagden en volgde een intensief traject in SQL en Power BI. Ik wil mijn domeinkennis en analytische skills inzetten in een junior data-analist rol.",
    why: "Perfect voor switchers: bestaand bewijs + nieuwe richting + geloofwaardige brug.",
  },
];

const mistakes = [
  "Te algemeen: “gemotiveerd, leergierig, teamplayer” zonder bewijs.",
  "Te lang: een samenvatting van 10+ regels wordt vaak overgeslagen.",
  "Geen resultaat: rol genoemd, maar geen impact of toegevoegde waarde.",
  "Niet vacaturegericht: dezelfde tekst voor elke sollicitatie.",
];

const faqs = [
  {
    question: "Wat is een goede cv samenvatting?",
    answer:
      "Een goede CV-samenvatting is kort, concreet en resultaatgericht. In 3 tot 5 zinnen laat je zien wie je bent, wat je specialisme is, welke impact je levert en wat je zoekt in je volgende rol.",
  },
  {
    question: "Hoe lang moet een cv samenvatting zijn?",
    answer:
      "Houd het meestal tussen 60 en 90 woorden. Kort genoeg om snel te scannen, lang genoeg om relevantie en impact te tonen.",
  },
  {
    question: "Wat is het verschil tussen profieltekst en cv samenvatting?",
    answer:
      "In de praktijk betekenen ze bijna hetzelfde. Beide zijn de korte introductie bovenaan je CV die recruiters helpt in seconden te begrijpen waarom jij interessant bent.",
  },
  {
    question: "Moet ik mijn cv samenvatting per vacature aanpassen?",
    answer:
      "Ja. Pas termen, focus en voorbeelden aan op de specifieke rol. Vooral functietitel, kernvaardigheden en resultaatzinnen moeten aansluiten op de vacaturetaal.",
  },
];

const summaryIntentLinks = [
  {
    href: "/gratis-cv-maken",
    label: "Gratis CV maken met een sterke samenvatting bovenaan",
    description:
      "Start met een basis-CV en werk daarna je profieltekst verder uit per vacature.",
  },
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken met de juiste plek voor je profieltekst",
    description:
      "Gebruik een Nederlandse opbouw waarin samenvatting, werkervaring en vaardigheden logisch op elkaar volgen.",
  },
  {
    href: "/cv-maken-student",
    label: "Studenten-CV maken als je samenvatting extra veel werk moet doen",
    description:
      "Geef opleiding, stage en leervermogen sneller context met een korte sterke opening.",
  },
  {
    href: "/cv-maken-in-engels",
    label: "Engels CV maken voor Nederlandse recruiters",
    description:
      "Houd je samenvatting Engelstalig, maar laat de structuur wel aansluiten op Nederlandse scanverwachtingen.",
  },
];

export const metadata: Metadata = {
  title: "CV Samenvatting Voorbeelden - Sterke Profielteksten per Functie | WerkCV",
  description:
    "Zoek je cv samenvatting voorbeelden? Bekijk sterke profielteksten voor starters, ervaren professionals en carrièreswitchers. Inclusief structuur, checklist en direct toepasbare voorbeelden.",
  keywords: [
    "cv samenvatting voorbeelden",
    "profieltekst cv voorbeelden",
    "persoonlijk profiel cv voorbeeld",
    "cv profieltekst",
    "cv introductie voorbeeld",
    "goede cv samenvatting",
    "samenvatting op cv",
    "cv samenvatting schrijven",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-samenvatting-voorbeelden",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-samenvatting-voorbeelden",
      "x-default": "https://werkcv.nl/cv-samenvatting-voorbeelden",
    },
  },
};

export default function CvSamenvattingVoorbeeldenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://werkcv.nl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "CV Samenvatting Voorbeelden",
        item: "https://werkcv.nl/cv-samenvatting-voorbeelden",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <Link
            href="/tools/profieltekst-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open profieltekst tool
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Hoog-intent examples
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV samenvatting voorbeelden die recruiters vertrouwen geven in de eerste 10 seconden
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Sterke resume-sites in het Engels winnen op korte, scherpe samenvattingen met concreet bewijs. Diezelfde aanpak werkt in Nederland: geen vage claims, wel heldere rolcontext,
              meetbare impact en vacaturegerichte focus. Gebruik de voorbeelden hieronder als bouwblokken voor jouw eigen profieltekst.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/profieltekst-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak je samenvatting in tool
              </Link>
              <Link
                href="/cv-aanmaken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                CV aanmaken met deze opening
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Voorbeelden per profieltype",
                "Framework uit bewezen resume-praktijk",
                "Direct toepasbaar in editor",
              ].map((item) => (
                <div
                  key={item}
                  className="border-3 border-black bg-white px-4 py-3 text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">De 4-delige formule voor een sterke samenvatting</h2>
            <div className="mt-5 space-y-4">
              {frameworkSteps.map((step, index) => (
                <div key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-tips/profieltekst-schrijven"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: profieltekst schrijven
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Rich voorbeeldbank
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            CV samenvatting voorbeelden per type kandidaat
          </h2>
          <div className="mt-6 space-y-5">
            {summaryExamples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
                <p className="mt-4 border-t-2 border-black pt-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                  Waarom dit werkt: <span className="normal-case tracking-normal font-medium text-slate-700">{example.why}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Van voorbeeld naar sollicitatieversie
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Trek een sterke samenvatting direct door naar het juiste CV-type
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Deze pagina wint pas echt als je de juiste opening meteen in de juiste
            CV-structuur zet. Gebruik daarom niet alleen de profieltekst-tool, maar
            ook de route die past bij jouw fase, taal of sollicitatiecontext.
          </p>
          <SectionIntentLinks links={summaryIntentLinks} locale="nl" />
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waarom samenvattingen vaak niet converteren naar uitnodigingen
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/tools/profieltekst-generator",
                  title: "Profieltekst generator",
                  body: "Gebruik de voorbeelden als input en genereer een versie op jouw doelrol.",
                },
                {
                  href: "/gratis-cv-maken",
                  title: "Gratis CV maken",
                  body: "Zet je samenvatting direct in een complete Nederlandse CV-opbouw.",
                },
                {
                  href: "/cv-aanmaken",
                  title: "CV aanmaken",
                  body: "Gebruik een heldere structuur waarin je profieltekst meteen op de juiste plek staat.",
                },
                {
                  href: "/cv-maken-student",
                  title: "Studenten-CV maken",
                  body: "Handige route als je samenvatting opleiding, stage en potentieel moet verbinden.",
                },
                {
                  href: "/cv-maken-in-engels",
                  title: "Engels CV maken",
                  body: "Houd je opening Engelstalig, maar wel afgestemd op Nederlandse recruiters.",
                },
                {
                  href: "/cv-maken-template",
                  title: "CV maken met template",
                  body: "Kies een layout waarin je samenvatting, ervaring en skills direct goed uitlijnen.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
                >
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over CV samenvattingen
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t-2 border-black px-4 pb-4 pt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-yellow-400 px-6 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Klaar om je samenvatting te finaliseren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Genereer je profieltekst en zet hem direct op je CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de formule, pas de voorbeelden aan op jouw rol en publiceer direct in de editor.
              </p>
            </div>
            <Link
              href="/tools/profieltekst-generator"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start met profieltekst
            </Link>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Footer />
    </div>
  );
}


