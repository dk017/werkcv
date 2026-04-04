import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { getTemplateConfig } from "@/lib/templates/registry";

const professionalTemplate = getTemplateConfig("professional");
const modernTemplate = getTemplateConfig("modern");
const atsTemplate = getTemplateConfig("ats");

const recruiterSignals = [
  "Geldige BIG-registratie en duidelijke vermelding van relevante certificaten.",
  "Klinische inhoud: triage, medicatieveiligheid, EPD-rapportage en zorgcoordinatie.",
  "Meetbare impact: overdracht, patiëntveiligheid, doorlooptijd of kwaliteitsscores.",
  "Samenwerking in multidisciplinaire teams en heldere communicatie met patiënt en familie.",
];

const marketSignals2026 = [
  {
    title: "UWV arbeidsmarktsignaal",
    body: "UWV classificeert (algemeen en gespecialiseerd) verpleegkundigen als structureel kansrijke beroepen in de meest recente publicaties.",
  },
  {
    title: "Vacaturedruk in zorg",
    body: "De Staat van Volksgezondheid en Zorg rapporteert 59.200 openstaande vacatures in zorg en welzijn (Q3 2025, update 21 november 2025).",
  },
  {
    title: "BIG-herregistratie",
    body: "Voor verpleegkundigen geldt herregistratie elke 5 jaar; norm is 2.080 uur werkervaring of voldoen aan de scholingseis.",
  },
];

const templateCards = [
  {
    label: "Beste allround keuze",
    name: professionalTemplate.nameDutch,
    body: "Rustige, betrouwbare layout die goed werkt voor ziekenhuis, VVT, wijkzorg en GGZ-rollen.",
    fit: "Past goed bij: algemeen verpleegkundige, wijkverpleegkundige, senior verpleegkundige.",
  },
  {
    label: "Voor moderne zorgteams",
    name: modernTemplate.nameDutch,
    body: "Frisse maar professionele uitstraling voor rollen waar patiëntcommunicatie en teamdynamiek centraal staan.",
    fit: "Past goed bij: polikliniek, dagbehandeling, zorgcoordinatie, patiëntgerichte teams.",
  },
  {
    label: "Voor maximale ATS-veiligheid",
    name: atsTemplate.nameDutch,
    body: "Ultrascanbare opbouw voor grote zorginstellingen met strikte digitale selectie.",
    fit: "Past goed bij: ziekenhuisconcerns, landelijke zorgorganisaties, uitzend- en detacheringsroutes.",
  },
];

const profileExamples = [
  {
    title: "Algemeen verpleegkundige (ziekenhuis)",
    text: "BIG-geregistreerde verpleegkundige met 6 jaar ervaring in klinische zorg en multidisciplinaire samenwerking. Ik ben sterk in triage, medicatieveiligheid en patiëntvoorlichting, en verbeterde overdrachtstijd met 14% door een strakkere rapportagestructuur in het EPD. Ik zoek een rol waarin kwaliteit van zorg en teamontwikkeling centraal staan.",
  },
  {
    title: "Wijkverpleegkundige",
    text: "Zelfstandige wijkverpleegkundige met 5 jaar ervaring in indiceren, zorgcoordinatie en complexe thuissituaties. Ik verhoogde continuiteit van zorg door afspraken rond overdracht en familiecommunicatie te standaardiseren, met minder escalaties als resultaat. Ik combineer klinisch redeneren met mensgerichte begeleiding thuis.",
  },
  {
    title: "SEH / acute zorg",
    text: "Stressbestendige verpleegkundige met 4 jaar ervaring op SEH en spoedstroom. Ik triageer snel en zorgvuldig, bewaak prioriteiten onder hoge druk en hield kwaliteitsscores stabiel tijdens piekbelasting door betere teamafstemming per shift. Ik wil mijn acute zorgervaring verder verdiepen in een dynamische spoedomgeving.",
  },
  {
    title: "Starter HBO-V / MBO-V",
    text: "Recent afgestudeerde verpleegkundige met stage-ervaring in ziekenhuis en ouderenzorg. Tijdens mijn stages heb ik verantwoordelijkheid genomen voor ADL-zorg, klinische observaties en nauwkeurige EPD-rapportage. Ik zoek een startersfunctie waar ik veilig, leergierig en patiëntgericht kan doorgroeien.",
  },
];

const impactBullets = [
  "Overdracht tussen diensten verbeterd met vaste SBAR-structuur, waardoor overdrachttijd daalde.",
  "Medicatiecontrole aangescherpt met dubbele verificatie op risicomomenten.",
  "EPD-rapportage gestandaardiseerd, wat vervolgzorg voor collega&apos;s sneller en duidelijker maakte.",
  "Triage-aanpak geoptimaliseerd, waardoor urgente casussen sneller de juiste route kregen.",
  "Patiëntvoorlichting bij ontslag versterkt, met minder herhaalvragen in de eerste week na ontslag.",
  "Nieuwe collega&apos;s en stagiairs begeleid met focus op klinisch redeneren en veilige uitvoering.",
  "Multidisciplinair overleg beter voorbereid met compacte zorgsamenvattingen per patiënt.",
  "Familiecommunicatie planmatiger ingericht bij complexe zorgtrajecten.",
];

const hardSkills = [
  "BIG-registratie (met geldigheid/registratiedatum)",
  "Klinisch redeneren en triage",
  "Medicatieveiligheid en toedienprotocollen",
  "EPD-systemen (bijv. HiX, Epic, ONS of vergelijkbaar)",
  "Zorgplannen, overdracht en rapportage (SBAR)",
  "Acute zorg, wondzorg of chronische zorg (afhankelijk van profiel)",
];

const softSkills = [
  "Empathische patiëntcommunicatie",
  "Samenwerken in multidisciplinair team",
  "Stressbestendigheid in wisselende diensten",
  "Nauwkeurigheid en risicobewust handelen",
  "Prioriteiten stellen bij acute situaties",
  "Begeleiden van familie en mantelzorgers",
];

const atsKeywords = [
  "verpleegkundige",
  "BIG-registratie",
  "klinisch redeneren",
  "triage",
  "medicatieveiligheid",
  "EPD",
  "zorgcoordinatie",
  "SBAR",
  "multidisciplinair",
  "acute zorg",
  "wijkverpleging",
  "patiëntveiligheid",
];

const starterPlan = [
  "Noem je diploma (MBO-V/HBO-V) en, zodra van toepassing, je BIG-registratie duidelijk bovenaan.",
  "Gebruik stagevoorbeelden met concrete context: afdeling, patiëntgroep, type handelingen.",
  "Toon vakvolwassenheid met veilige werkwijze, rapportage en samenwerking in het team.",
  "Koppel houding aan bewijs: nauwkeurig, leergierig en stressbestendig in echte zorgsituaties.",
];

const mistakes = [
  "BIG-registratie of relevante geldigheid helemaal niet vermelden.",
  "Alleen zorgtaken opsommen zonder klinische context of resultaat.",
  "Geen onderscheid maken tussen ziekenhuis, wijk, VVT of GGZ-ervaring.",
  "Te generieke profieltekst zonder patiëntgroep, setting of specialisatie.",
];

const faqs = [
  {
    question: "Moet ik mijn BIG-registratie op mijn CV zetten?",
    answer:
      "Ja, voor verpleegkundige functies is dat meestal essentieel. Vermeld je BIG-registratie duidelijk en actueel, bij voorkeur in de kop of een korte certificatensectie.",
  },
  {
    question: "Wat is het beste CV template voor verpleegkundige?",
    answer:
      "Een rustige, professioneel leesbare template werkt meestal het best. Recruiters willen snel je klinische ervaring, registratie en specialisaties kunnen scannen.",
  },
  {
    question: "Welke vaardigheden zijn belangrijk op een verpleegkundige CV?",
    answer:
      "Combineren werkt het sterkst: hard skills zoals triage, EPD en medicatieveiligheid plus soft skills zoals patiëntcommunicatie, samenwerking en stressbestendigheid.",
  },
  {
    question: "Hoe maak ik een verpleegkundige CV zonder veel werkervaring?",
    answer:
      "Gebruik stage, leerwerktrajecten en praktijkvoorbeelden met concrete handelingen en context. Laat zien hoe je veilig werkt, rapporteert en samenwerkt in het zorgteam.",
  },
];

const nurseTemplateIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken voor verpleegkundige functies",
    description: "Ga door naar een sollicitatieversie waarin BIG, klinische ervaring en teamfit direct zichtbaar zijn.",
  },
  {
    href: "/gratis-cv-template",
    label: "Gratis CV template voor zorgprofielen",
    description: "Vergelijk eerst rustige templates voordat je je zorg-CV definitief maakt.",
  },
  {
    href: "/professioneel-cv-template",
    label: "Professioneel CV template voor zorg",
    description: "Handig als je betrouwbaarheid, rust en scanbaarheid centraal wilt zetten.",
  },
  {
    href: "/ats-cv-template",
    label: "ATS CV template voor zorginstellingen",
    description: "Relevant voor ziekenhuisconcerns, grote zorggroepen en detacheringsroutes.",
  },
  {
    href: "/cv-maken-pdf",
    label: "Verpleegkundige CV als PDF afronden",
    description: "Zorg dat je definitieve zorg-CV stabiel blijft bij upload en recruiter-review.",
  },
];

export const metadata: Metadata = {
  title: "CV Template Verpleegkundige - BIG-proof en Sollicitatieklaar | WerkCV",
  description:
    "Gebruik het beste CV template voor verpleegkundige. Inclusief BIG-check, profieltekst voorbeelden, zorg-bullets, ATS-keywords en startertips. Start gratis in de editor.",
  keywords: [
    "cv template verpleegkundige",
    "verpleegkundige cv template",
    "cv verpleegkundige voorbeeld template",
    "big registratie cv verpleegkundige",
    "wijkverpleegkundige cv",
    "ziekenhuis verpleegkundige cv",
    "verpleegkundige cv maken",
    "zorg cv template",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-verpleegkundige",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-verpleegkundige",
      "x-default": "https://werkcv.nl/cv-template-verpleegkundige",
    },
  },
};

export default function CvTemplateVerpleegkundigePage() {
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
        name: "CV Template Verpleegkundige",
        item: "https://werkcv.nl/cv-template-verpleegkundige",
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
            href="/editor"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Start in editor
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Rol-intent: verpleegkundige
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV template verpleegkundige dat BIG-proof is en direct vertrouwen opbouwt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Voor verpleegkundige functies beslist de eerste scan snel: registratie, klinische kwaliteit en teamfit moeten direct zichtbaar zijn. Deze pagina combineert templatekeuze met
              copy-ready profielteksten, zorgspecifieke werkervaring bullets en actuele ATS-termen voor Nederlandse zorgvacatures.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met verpleegkundige template
              </Link>
              <Link
                href="/cv-voorbeelden/zorg-en-welzijn/verpleegkundige"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk volledig verpleegkundige voorbeeld
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "BIG en zorgkwaliteit centraal",
                "Template + content in één flow",
                "Gratis starten, later downloaden",
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
            <h2 className="text-xl font-black text-black">Wat recruiters direct checken bij een verpleegkundige CV</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {recruiterSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/cv-keywords"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Check je vacaturematch met de CV keywords tool
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Arbeidsmarktcontext (Nederland)
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Waarom deze pagina in 2026 relevant is voor verpleegkundige sollicitaties
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            De zorgarbeidsmarkt blijft krap en selectie blijft streng op formele vereisten en kwaliteitssignalen. Daarom moet je CV tegelijk inhoudelijk sterk, juridisch correct en ATS-scanbaar
            zijn.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {marketSignals2026.map((item) => (
              <div key={item.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">{item.title}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Template-keuze
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welke CV template werkt het best voor verpleegkundige functies?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {templateCards.map((card) => (
              <article
                key={card.name}
                className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                  {card.label}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">{card.name}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.fit}</p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Gebruik in editor
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/professioneel-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met professioneel CV template
            </Link>
            <Link
              href="/modern-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met modern CV template
            </Link>
            <Link
              href="/ats-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met ATS CV template
            </Link>
          </div>
          <div className="mt-8 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Template-intentie
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Van verpleegkundige template naar zorgsollicitatie
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Gebruik deze vervolgstappen als je vanuit zorgspecifieke template-intentie verder wilt naar de beste aanmaak-, ATS- of PDF-route voor verpleegkundige sollicitaties.
            </p>
            <SectionIntentLinks links={nurseTemplateIntentLinks} locale="nl" />
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready profieltekst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Profieltekst voorbeelden voor verpleegkundige sollicitaties
          </h2>
          <div className="mt-6 space-y-5">
            {profileExamples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools/profieltekst-generator"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Genereer profieltekst
            </Link>
            <Link
              href="/profieltekst-cv-voorbeelden"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Meer profieltekst voorbeelden
            </Link>
            <Link
              href="/sollicitatiebrief-voorbeeld-verpleegkundige"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Voorbeeld sollicitatiebrief verpleegkundige
            </Link>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Werkervaring bullets
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Sterke verpleegkundige bullets die kwaliteit zichtbaar maken
            </h2>
            <ul className="mt-5 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {impactBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/werkervaring-bullets"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Maak zorg-bullets op maat met de werkervaring tool
              </Link>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Skills + ATS termen
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Vaardigheden en keywords die in zorgvacatures terugkomen
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">Hard skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {hardSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">Soft skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {softSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                ATS keyword bank
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                {atsKeywords.join(" | ")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Zonder ervaring
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Zo bouw je een sterk verpleegkundige CV als starter
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {starterPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Wat vaak misgaat op verpleegkundige CV&apos;s
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/cv-samenvatting-voorbeelden"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: samenvatting voorbeelden voor zorgprofielen
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een CV template voor verpleegkundige
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
                Klaar om je verpleegkundige CV te finaliseren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw je CV in de editor en solliciteer met meer zorgspecifieke overtuigingskracht
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start gratis met de juiste template, voeg BIG-proof details toe en download pas wanneer je sollicitatieversie volledig staat.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Open editor
              </Link>
              <Link
                href="/prijzen"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk prijzen
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
