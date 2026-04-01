import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";

const frameworkSteps = [
  "Kies 6 tot 10 vaardigheden die echt aansluiten op de functie-eisen.",
  "Mix hard skills en soft skills in een verhouding die bij je rol past.",
  "Gebruik exacte termen uit de vacature (tools, methodes, systemen).",
  "Bewijs je belangrijkste skills met voorbeelden in werkervaring en projecten.",
];

const roleExamples = [
  {
    title: "Administratief medewerker",
    hardSkills: ["Excel (draaitabellen)", "Factuurverwerking", "Dossierbeheer", "Exact Online"],
    softSkills: ["Nauwkeurigheid", "Plannen en organiseren", "Stressbestendigheid", "Klantgerichtheid"],
    why: "Combinatie van procesvaardigheden en betrouwbaarheid sluit aan op office-rollen.",
  },
  {
    title: "Klantenservice medewerker",
    hardSkills: ["CRM-systemen", "Ticketing software", "Chat en e-mail support", "Rapportage (CSAT/NPS)"],
    softSkills: ["Empathisch communiceren", "Probleemoplossend denken", "Conflictbeheersing", "Samenwerken"],
    why: "Laat zowel kanaalkennis als servicegedrag zien waar recruiters op selecteren.",
  },
  {
    title: "Software developer",
    hardSkills: ["TypeScript", "React", "Node.js", "CI/CD"],
    softSkills: ["Analytisch denken", "Code review samenwerking", "Ownership", "Prioriteren"],
    why: "Technische kernskills worden versterkt door productieve teamvaardigheden.",
  },
  {
    title: "Verpleegkundige",
    hardSkills: ["Triage", "Medicatiebeheer", "EPD-systemen", "Wondzorg"],
    softSkills: ["Patientgerichtheid", "Samenwerken in multidisciplinair team", "Besluitvaardigheid", "Rust onder druk"],
    why: "Zorginhoud en gedrag onder hoge werkdruk zijn beide cruciaal.",
  },
  {
    title: "Marketing specialist",
    hardSkills: ["GA4", "SEO basis", "E-mail automation", "A/B-testing"],
    softSkills: ["Creativiteit", "Data-interpretatie", "Stakeholdermanagement", "Commercieel inzicht"],
    why: "Toont balans tussen kanaaluitvoering en businessimpact.",
  },
  {
    title: "Logistiek medewerker",
    hardSkills: ["WMS", "Orderpicking", "Voorraadcontrole", "Veiligheidsprocedures"],
    softSkills: ["Nauwkeurigheid", "Tempo houden", "Teamwerk", "Verantwoordelijkheid"],
    why: "Praktische uitvoering en kwaliteit/veiligheid staan centraal in logistieke functies.",
  },
];

const skillLibrary = {
  "Hard skills voorbeelden": [
    "Power BI",
    "SAP",
    "AutoCAD",
    "SQL",
    "HubSpot",
    "Canva",
    "Python",
    "Salesforce",
    "Adobe Illustrator",
    "Microsoft 365",
  ],
  "Soft skills voorbeelden": [
    "Prioriteren",
    "Helder communiceren",
    "Leiderschap",
    "Klantgericht handelen",
    "Samenwerken",
    "Problemen oplossen",
    "Analytisch denken",
    "Eigenaarschap tonen",
    "Besluitvaardigheid",
    "Aanpassingsvermogen",
  ],
};

const intentMatches = [
  {
    title: "Vaardigheden voor cv",
    body: "Kies 6 tot 10 vaardigheden die direct uit de vacature of je doelrol volgen, niet een losse lijst met alles wat je ooit hebt gedaan.",
  },
  {
    title: "Welke vaardigheden zet je op je cv?",
    body: "Combineer tools, methodes en vakinhoud met gedrag dat recruiters echt terugzien in jouw werkervaring of projecten.",
  },
  {
    title: "Vaardigheden voor cv voorbeelden",
    body: "Gebruik voorbeelden per functie als shortlist en pas daarna de termen aan op jouw sector, senioriteit en gebruikte systemen.",
  },
];

const mistakes = [
  "Te lange lijst (15+) zonder focus op de doelrol.",
  "Vage claims zoals “teamplayer” zonder bewijs in werkervaring.",
  "Alleen soft skills noemen en technische vereisten vergeten.",
  "Geen vacaturetaal gebruiken, waardoor ATS-match lager wordt.",
];

const faqs = [
  {
    question: "Welke vaardigheden zet je op je cv?",
    answer:
      "Zet vaardigheden op je CV die direct aansluiten op de vacature. Gebruik een mix van hard skills (tools, systemen, technieken) en soft skills (samenwerking, communicatie, prioriteren) die je kunt onderbouwen met praktijkvoorbeelden.",
  },
  {
    question: "Hoeveel vaardigheden moet je op een cv zetten?",
    answer:
      "Voor de meeste functies is 6 tot 10 vaardigheden een sterke bandbreedte. Minder kan te mager ogen, meer wordt vaak onduidelijk of ongeloofwaardig voor recruiters.",
  },
  {
    question: "Wat is het verschil tussen hard skills en soft skills?",
    answer:
      "Hard skills zijn meetbare technische of vakinhoudelijke vaardigheden, zoals SQL of Excel. Soft skills gaan over gedrag en samenwerking, zoals helder communiceren of probleemoplossend denken.",
  },
  {
    question: "Kan ik vaardigheden uit een voorbeeld direct kopieren?",
    answer:
      "Gebruik voorbeelden als inspiratie, maar pas ze aan op jouw functiecontext. Recruiters verwachten dat je vaardigheden terugziet in je werkervaring, projecten en resultaten.",
  },
];

const skillsIntentLinks = [
  {
    href: "/cv-maken-template",
    label: "CV maken met een template voor een heldere skillssectie",
    description:
      "Gebruik een layout waarin je belangrijkste hard en soft skills compact en scanbaar boven water blijven.",
  },
  {
    href: "/ats-cv-template",
    label: "ATS CV template kiezen voor betere skill-keyword match",
    description:
      "Voorkom iconen, kolommen en layout-ruis die je vaardigheden minder goed vindbaar maken in software.",
  },
  {
    href: "/cv-maken-in-engels",
    label: "Engels CV maken als taalniveau en internationale skills tellen",
    description:
      "Laat Engelse copy en Nederlandse recruiterlogica samenwerken wanneer je op internationale rollen mikt.",
  },
  {
    href: "/engels-cv-template",
    label: "Kies een Engels CV template voor internationale sollicitaties",
    description:
      "Presenteer tools, methodes en taalniveau in een format dat ook voor expat- en English-first vacatures werkt.",
  },
];

export const metadata: Metadata = {
  title: "Vaardigheden Voor CV - Voorbeelden per Functie | WerkCV.nl",
  description:
    "Zoek je vaardigheden voor cv of voorbeelden per functie? Bekijk sterke hard en soft skills, een heldere checklist en direct toepassen in je CV.",
  keywords: [
    "vaardigheden voor cv",
    "vaardigheden voor cv voorbeelden",
    "welke vaardigheden op cv",
    "vaardigheden cv voorbeelden",
    "cv vaardigheden voorbeelden",
    "hard skills cv",
    "soft skills cv",
    "vaardigheden op cv zetten",
    "skills cv voorbeeld",
  ],
  alternates: {
    canonical: "https://werkcv.nl/vaardigheden-cv-voorbeelden",
    languages: {
      "nl-NL": "https://werkcv.nl/vaardigheden-cv-voorbeelden",
      "x-default": "https://werkcv.nl/vaardigheden-cv-voorbeelden",
    },
  },
};

export default function VaardighedenCvVoorbeeldenPage() {
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
        name: "Vaardigheden CV Voorbeelden",
        item: "https://werkcv.nl/vaardigheden-cv-voorbeelden",
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
            href="/tools/vaardigheden-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open vaardigheden tool
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Intent: vaardigheden voor cv
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Vaardigheden voor CV die direct aansluiten op vacature-eisen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zoek je welke vaardigheden je op je cv zet? In Nederland werkt dezelfde regel als op sterke resume-sites: combineer relevante hard skills met bewezen soft skills en koppel ze aan echte
              werkresultaten. Gebruik deze voorbeelden als basis voor je eigen skillssectie.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/vaardigheden-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Genereer je vaardigheden
              </Link>
              <Link
                href="/cv-maken-template"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Zet dit in een CV-template
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Hard + soft skills per functie",
                "Formule voor vacaturematch",
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
            <h2 className="text-xl font-black text-black">De 4-delige formule voor een sterke skillssectie</h2>
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
                href="/cv-tips/cv-vaardigheden-kiezen"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: vaardigheden op je CV
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-3">
          {intentMatches.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-lg font-black text-black">{item.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Functiegerichte voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Vaardigheden voorbeelden per type rol
          </h2>
          <div className="mt-6 space-y-5">
            {roleExamples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="border-2 border-black bg-[#FFFEF0] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-700">
                      Hard skills
                    </p>
                    <ul className="mt-2 space-y-1 text-sm font-medium leading-relaxed text-slate-700">
                      {example.hardSkills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-2 border-black bg-[#FFFEF0] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-700">
                      Soft skills
                    </p>
                    <ul className="mt-2 space-y-1 text-sm font-medium leading-relaxed text-slate-700">
                      {example.softSkills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-4 border-t-2 border-black pt-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                  Waarom dit werkt: <span className="normal-case font-medium tracking-normal text-slate-700">{example.why}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Skill-bibliotheek
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Hard en soft skills om op maat te kiezen
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            Gebruik deze lijst als inspiratie en selecteer alleen vaardigheden die je kunt bewijzen in werkervaring, projecten of certificaten.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {Object.entries(skillLibrary).map(([group, items]) => (
              <div key={group} className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">{group}</p>
                <ul className="mt-3 grid gap-2 text-sm font-medium leading-relaxed text-slate-700 sm:grid-cols-2">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Van skillslijst naar recruiter-match
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Gebruik de juiste route voor een skillssectie die ook echt gevonden wordt
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Een goede skillslijst is niet alleen inhoudelijk sterk, maar ook goed
            geplaatst, logisch gegroepeerd en technisch leesbaar. Trek deze voorbeelden
            daarom direct door naar het CV-type dat bij jouw rol en taal past.
          </p>
          <SectionIntentLinks links={skillsIntentLinks} locale="nl" />
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waarom skillssecties vaak zwak presteren
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
                  href: "/competenties-voorbeelden",
                  title: "Competenties voorbeelden",
                  body: "Gebruik deze route als je vooral zoekt naar gedragsmatige competenties in plaats van losse skills of tools.",
                },
                {
                  href: "/eigenschappen-cv-voorbeelden",
                  title: "Eigenschappen op CV",
                  body: "Handig als je zoekt naar goede eigenschappen en sterke punten die passen bij jouw rol.",
                },
                {
                  href: "/tools/vaardigheden-generator",
                  title: "Vaardigheden generator",
                  body: "Maak direct een shortlist skills op basis van jouw doelrol.",
                },
                {
                  href: "/cv-maken-template",
                  title: "CV maken met template",
                  body: "Gebruik een layout waarin je skills niet verdrinken tussen andere secties.",
                },
                {
                  href: "/ats-cv-template",
                  title: "ATS CV template",
                  body: "Houd je skillssectie schoon, scanbaar en beter matchbaar met vacaturekeywords.",
                },
                {
                  href: "/cv-maken-in-engels",
                  title: "Engels CV maken",
                  body: "Handig als taalniveau, tools en internationale context samen belangrijk zijn.",
                },
                {
                  href: "/engels-cv-template",
                  title: "Engels CV template",
                  body: "Plaats vaardigheden en taalniveau in een format dat ook voor internationale rollen werkt.",
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
            Veelgestelde vragen over vaardigheden op je CV
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
                Klaar om je skillssectie te verbeteren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Genereer vaardigheden en zet ze direct op je CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de voorbeelden, kies je shortlist en publiceer direct in de editor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/vaardigheden-generator"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start vaardigheden tool
              </Link>
              <Link
                href="/cv-maken-template"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Kies een CV-template
              </Link>
            </div>
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


