import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  getMotivationGeneratorHref,
  motivationLetterPresets,
} from "@/lib/motivation-letter-presets";

const checklist = [
  "Leg kort uit waarom deze functie inhoudelijk bij je past.",
  "Noem 1-2 relevante prestaties als bewijs van geschiktheid.",
  "Verbind jouw motivatie aan het bedrijf of de sector.",
  "Houd je toon concreet en professioneel, niet te algemeen.",
];

const letterParts = [
  ["Contactgegevens", "Jouw naam, telefoon en e-mail, daaronder organisatie, contactpersoon en adres."],
  ["Plaats, datum en onderwerp", "Bijvoorbeeld: Betreft: sollicitatie administratief medewerker, vacature 2026-114."],
  ["Aanhef", "Geachte mevrouw De Vries, of Geachte heer/mevrouw als je geen naam kunt vinden."],
  ["Opening (1 alinea)", "Noem de functie en de belangrijkste eis uit de vacature die jij waarmaakt."],
  ["Bewijs (1-2 alinea's)", "Eén of twee concrete prestaties, het liefst met een cijfer, gekoppeld aan de vacature."],
  ["Motivatie (1 alinea)", "Waarom deze organisatie: een product, klantgroep of project dat je zelf hebt gecheckt."],
  ["Afsluiting en groet", "Vraag om een gesprek, verwijs naar je cv en sluit af met Met vriendelijke groet."],
];

const fullExamples = [
  {
    id: "voorbeeld-algemeen",
    title: "Voorbeeld motivatiebrief (algemeen, om in te vullen)",
    intro:
      "Vervang alles tussen [haakjes]. Deze opbouw werkt voor bijna elke vacature en past op één A4 (ongeveer 250-350 woorden).",
    letter: `[Jouw naam]
[Adres], [postcode en woonplaats]
[Telefoonnummer] · [e-mailadres]

[Naam organisatie]
T.a.v. [naam contactpersoon]
[Adres]
[Postcode en plaats]

[Plaats], [datum]

Betreft: sollicitatie [functie], vacature [nummer]

Geachte [mevrouw/heer] [achternaam],

In uw vacature voor [functie] vraagt u iemand die [belangrijkste eis uit de vacature]. Dat is precies wat ik de afgelopen [aantal] jaar bij [huidige of vorige werkgever] doe. Daarom solliciteer ik graag naar deze functie.

Als [huidige of vorige functie] ben ik verantwoordelijk voor [belangrijkste taak]. Zo heb ik [concreet resultaat, bij voorkeur met een cijfer]. Daarbij werk ik dagelijks met [tool, vaardigheid of werkwijze uit de vacature], wat direct aansluit bij wat u in deze rol vraagt.

[Organisatie] spreekt mij aan omdat [specifieke reden: product, klantgroep, project of waarde die je zelf hebt gecheckt]. In deze functie wil ik [wat je wilt bijdragen] en mij verder ontwikkelen in [wat je wilt leren].

Graag licht ik in een gesprek toe hoe ik [concrete bijdrage] kan versterken. Mijn cv vindt u in de bijlage.

Met vriendelijke groet,

[Jouw naam]`,
  },
  {
    id: "voorbeeld-ingevuld",
    title: "Ingevuld voorbeeld: administratief medewerker",
    intro:
      "Een fictief maar realistisch voorbeeld van dezelfde opbouw. Namen, bedrijf en cijfers zijn verzonnen: gebruik je eigen feiten.",
    letter: `Sanne de Vries
Lindelaan 12, 3521 AB Utrecht
06 12345678 · sanne.devries@email.nl

Noordkade Logistiek B.V.
T.a.v. mevrouw Bakker
Havenweg 40
3542 AD Utrecht

Utrecht, 12 november 2026

Betreft: sollicitatie administratief medewerker, vacature 2026-114

Geachte mevrouw Bakker,

In uw vacature voor administratief medewerker vraagt u iemand die nauwkeurig werkt en een grote orderstroom overzichtelijk houdt. Dat is precies wat ik de afgelopen vier jaar bij een groothandel in bouwmaterialen doe. Daarom solliciteer ik graag naar deze functie.

Als administratief medewerker verwerk ik gemiddeld 80 orders per dag en beantwoord ik vragen van klanten over leveringen en facturen. Toen ik merkte dat dezelfde invoerfouten steeds terugkwamen, heb ik een controlelijst ingevoerd. Daarmee daalde het aantal gecorrigeerde facturen in een half jaar met ongeveer een derde. Ik werk dagelijks met Excel en Exact, de systemen die u in de vacature noemt.

Noordkade Logistiek spreekt mij aan omdat u snelgroeiende webwinkels ontzorgt: daar telt elke foutloze zending. In deze functie wil ik mijn ervaring met orderverwerking inzetten en mij verder ontwikkelen in procesverbetering.

Graag licht ik in een gesprek toe hoe ik uw orderadministratie nog betrouwbaarder kan maken. Mijn cv vindt u in de bijlage.

Met vriendelijke groet,

Sanne de Vries`,
  },
];

const faqs = [
  {
    question: "Wat is een goed motivatiebrief voorbeeld?",
    answer:
      "Een goed voorbeeld heeft vier korte alinea's: een opening die de functie en de belangrijkste vacature-eis noemt, een alinea met één of twee concrete prestaties (liefst met een cijfer), een alinea over waarom juist deze organisatie, en een afsluiting waarin je om een gesprek vraagt.",
  },
  {
    question: "Hoe verschilt een motivatiebrief van een sollicitatiebrief?",
    answer:
      "In Nederland bedoelen de meeste werkgevers hetzelfde: een brief bij je cv. Wordt het verschil wel gemaakt, dan legt een motivatiebrief meer nadruk op waarom je iets wilt (vaak bij een opleiding, stage of studie) en een sollicitatiebrief meer op waarom je geschikt bent.",
  },
  {
    question: "Hoe lang moet een motivatiebrief zijn?",
    answer:
      "Maximaal één A4, ongeveer 250 tot 400 woorden in drie tot vijf korte alinea's. Vraagt de vacature om een bepaald aantal woorden, houd je dan daaraan.",
  },
  {
    question: "Hoe begin je een motivatiebrief?",
    answer:
      "Begin met de aanhef (Geachte mevrouw/heer + achternaam) en open direct met de functie en de eis uit de vacature die jij waarmaakt. Vermijd openingszinnen als 'Hierbij solliciteer ik naar'.",
  },
  {
    question: "Hoe sluit je een motivatiebrief af?",
    answer:
      "Vraag in één zin om een gesprek, verwijs naar je cv in de bijlage en sluit af met 'Met vriendelijke groet' en je naam.",
  },
  {
    question: "Mag ik een motivatiebrief voorbeeld letterlijk overnemen?",
    answer:
      "Neem de opbouw over, niet de tekst. Recruiters herkennen standaardbrieven: vervang elke voorbeeldzin door jouw eigen functie, organisatie en resultaten.",
  },
];

export const metadata: Metadata = {
  title: "Motivatiebrief Voorbeeld 2026 – Complete Brief + 8 Voorbeelden | WerkCV",
  description:
    "Bekijk een complete motivatiebrief om in te vullen, een ingevuld voorbeeld en 8 voorbeelden voor starters, carrièreswitch, stage, Albert Heijn en kinderopvang.",
  keywords: [
    "motivatiebrief voorbeeld",
    "goede motivatiebrief",
    "motivatiebrief schrijven voorbeeld",
    "motivatiebrief opbouw",
    "motivatiebrief voorbeeld zinnen",
    "korte motivatiebrief",
    "motivatiebrief template",
    "motivatiebrief sollicitatie",
  ],
  alternates: {
    canonical: "https://werkcv.nl/motivatiebrief-voorbeeld",
    languages: {
      "nl-NL": "https://werkcv.nl/motivatiebrief-voorbeeld",
      "x-default": "https://werkcv.nl/motivatiebrief-voorbeeld",
    },
  },
};

export default function MotivatiebriefVoorbeeldPage() {
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
        name: "Motivatiebrief Voorbeeld",
        item: "https://werkcv.nl/motivatiebrief-voorbeeld",
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
            href="/tools/sollicitatiebrief-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open generator
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Motivatie-intent
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Motivatiebrief voorbeeld: complete brief + 8 voorbeelden per situatie
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een sterke motivatiebrief past op één A4 en laat in vier korte alinea&apos;s zien waarom jij deze functie wilt
              en waarom jij geschikt bent. Hieronder vind je een complete brief om in te vullen, hetzelfde voorbeeld
              ingevuld, en voorbeelden per situatie.
            </p>
            <a
              href="#volledig-voorbeeld"
              className="mt-4 inline-block text-sm font-black text-black underline decoration-2 underline-offset-4"
            >
              Direct naar de complete voorbeeldbrief
            </a>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf motivatiebrief in generator
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk sollicitatiebrief voorbeelden
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Voorbeelden per context",
                "Concreet en vacaturegericht",
                "Direct toepasbaar in tool",
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
            <h2 className="text-xl font-black text-black">Checklist voor een sterke motivatiebrief</h2>
            <div className="mt-5 space-y-4">
              {checklist.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-tips/sollicitatiebrief-tips"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: sollicitatiebrief tips
              </Link>
            </div>
          </div>
        </section>

        <section id="volledig-voorbeeld" className="mb-14 scroll-mt-24">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Volledige brieven</p>
          <h2 className="mt-2 text-3xl font-black text-black">Voorbeeld motivatiebrief: zo ziet een complete brief eruit</h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Een goede motivatiebrief is maximaal één A4: contactgegevens, onderwerp, aanhef, drie of vier korte
            alinea&apos;s (opening, bewijs, motivatie, afsluiting) en een groet. Hieronder staat dezelfde opbouw eerst
            als invulbrief en daarna ingevuld.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {fullExamples.map((example) => (
              <article
                key={example.id}
                id={example.id}
                className="flex flex-col border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black">{example.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{example.intro}</p>
                <div className="mt-4 flex-1 whitespace-pre-line border-2 border-slate-200 bg-[#FFFEF0] p-4 text-sm leading-relaxed text-slate-800">
                  {example.letter}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 border-4 border-black bg-white p-6">
            <h3 className="text-xl font-black text-black">Wat hoort er in een motivatiebrief?</h3>
            <ol className="mt-4 grid gap-3 md:grid-cols-2">
              {letterParts.map(([title, body], index) => (
                <li key={title} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700">
                    <strong className="font-black text-black">{title}:</strong> {body}
                  </p>
                </li>
              ))}
            </ol>
            <Link
              href="/tools/sollicitatiebrief-generator"
              className="mt-5 inline-block text-sm font-black text-black underline decoration-2 underline-offset-4"
            >
              Liever niet zelf invullen? Laat de generator deze opbouw voor jouw vacature schrijven
            </Link>
          </div>
        </section>

        <section id="kies-voorbeeld" className="mb-14 scroll-mt-24">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Kies, vervang en genereer
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Motivatiebrief voorbeelden per situatie
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Kies het voorbeeld dat het dichtst bij jouw situatie ligt. De generator vult de doelrol, toon en
            relevante bewijsstructuur alvast in. Vervang daarna alle voorbeeldfeiten door je eigen ervaring.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {motivationLetterPresets.map((example) => (
              <article
                key={example.slug}
                className="flex h-full flex-col border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{example.eyebrow}</p>
                <h3 className="mt-2 text-xl font-black text-black">{example.label}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">“{example.preview}”</p>
                <div className="mt-4 border-t-2 border-slate-200 pt-4">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">Vervang met jouw bewijs</p>
                  <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                    {example.proofPrompts.map((prompt) => (
                      <li key={prompt}>✓ {prompt}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={getMotivationGeneratorHref(example)}
                  className="mt-5 inline-flex w-full items-center justify-center border-3 border-black bg-yellow-400 px-4 py-3 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  style={{ borderWidth: "3px" }}
                >
                  Gebruik voorbeeld voor {example.label.toLowerCase()}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Verdieping per werkgever of sector</p>
          <h2 className="mt-2 text-2xl font-black text-black sm:text-3xl">Lees eerst wat in jouw context als bewijs telt</h2>
          <p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-slate-700">
            Een vooraf ingevulde generator geeft je een snelle start. Deze verdiepende pagina&apos;s leggen ook uit
            welke feiten je moet controleren, welke voorbeelden geloofwaardig zijn en waar een standaardbrief misgaat.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Link href="/motivatiebrief-albert-heijn" className="border-3 border-black bg-yellow-300 p-5" style={{ borderWidth: "3px" }}>
              <h3 className="font-black text-black">Motivatiebrief Albert Heijn</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">Voor winkelrollen, bijbanen, beschikbaarheid en concreet klantgedrag.</p>
            </Link>
            <Link href="/motivatiebrief-kinderopvang" className="border-3 border-black bg-[#E9FBF8] p-5" style={{ borderWidth: "3px" }}>
              <h3 className="font-black text-black">Motivatiebrief kinderopvang</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">Voor pedagogisch handelen, kwalificaties, taalniveau en oudercontact.</p>
            </Link>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-[#E9FBF8] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-800">Waarom deze invoer werkt</p>
          <h2 className="mt-2 text-2xl font-black text-black sm:text-3xl">
            Geef de generator feiten, geen lege eigenschappen
          </h2>
          <p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-slate-700">
            UWV adviseert bij AI-hulp om de vacaturetekst en concrete motivatie-elementen mee te geven, een echte
            gebeurtenis of voorbeeld uit je werk uit te schrijven en de uitkomst daarna kritisch te beoordelen.
            Daarom vraagt elk voorbeeld hierboven om bewijs zoals een project, resultaat, tool of werksituatie.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["1. Benoem de context", "Welke rol, organisatie en situatie gaat het om?"],
              ["2. Voeg bewijs toe", "Gebruik een project, resultaat, cijfer of concreet gedrag."],
              ["3. Controleer de uitkomst", "Verwijder verzonnen details en maak de toon herkenbaar van jou."],
            ].map(([title, body]) => (
              <div key={title} className="border-2 border-black bg-white p-4">
                <h3 className="text-sm font-black text-black">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{body}</p>
              </div>
            ))}
          </div>
          <a
            href="https://inspiratie.uwv.nl/motivatiebrief-maken-met-chatgpt"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-sm font-black text-teal-900 underline decoration-2 underline-offset-4"
          >
            Bron: UWV — motivatiebrief maken met AI
          </a>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fout
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Alleen motivatie noemen zonder inhoudelijk bewijs
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Recruiters zien graag motivatie, maar beslissen op relevantie. Koppel je motivatie dus altijd aan één of twee resultaten uit je ervaring zodat je brief zowel enthousiast als
              geloofwaardig is.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/motivatiebrief-schrijven",
                  title: "Motivatiebrief schrijven",
                  body: "Gebruik deze route als je minder voorbeelden en meer stap-voor-stap schrijfstructuur zoekt.",
                },
                {
                  href: "/korte-motivatiebrief-voorbeeld",
                  title: "Korte motivatiebrief voorbeeld",
                  body: "Handig als je compact wilt schrijven zonder de inhoud te mager te maken.",
                },
                {
                  href: "/motivatiebrief-stage-voorbeeld",
                  title: "Motivatiebrief stage voorbeeld",
                  body: "Gebruik stagegerichte voorbeeldblokken als je opleiding, projecten en leerdoelen centraal staan.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-administratief-medewerker",
                  title: "Sollicitatiebrief administratief medewerker",
                  body: "Bekijk role-specifieke voorbeeldzinnen voor administratieve functies.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-klantenservice",
                  title: "Sollicitatiebrief klantenservice",
                  body: "Gebruik klantenservice-specifieke briefblokken met service-KPI voorbeelden.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-verpleegkundige",
                  title: "Sollicitatiebrief verpleegkundige",
                  body: "Bekijk zorgspecifieke briefblokken met BIG- en klinische focus.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-marketing",
                  title: "Sollicitatiebrief marketing",
                  body: "Gebruik marketing-specifieke voorbeeldzinnen met kanaalervaring en KPI-focus.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-office-manager",
                  title: "Sollicitatiebrief office manager",
                  body: "Bekijk office manager voorbeeldblokken met focus op structuur, procesverbetering en regie.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-verkoopmedewerker",
                  title: "Sollicitatiebrief verkoopmedewerker",
                  body: "Gebruik verkoop-specifieke briefblokken met klantfocus, targetbijdrage en retailcontext.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-software-ontwikkelaar",
                  title: "Sollicitatiebrief software ontwikkelaar",
                  body: "Bekijk developer-specifieke briefblokken met stack, impact en engineeringcultuur.",
                },
                {
                  href: "/sollicitatiebrief-in-engels",
                  title: "Sollicitatiebrief in Engels",
                  body: "Gebruik Engelse opbouw en voorbeeldzinnen voor internationale of Engelstalige vacatures.",
                },
                {
                  href: "/open-sollicitatie-brief",
                  title: "Open sollicitatie brief",
                  body: "Gebruik deze route als je zonder concrete vacature toch een sterke, gerichte brief wilt sturen.",
                },
                {
                  href: "/motivatiebrief-layout",
                  title: "Motivatiebrief layout",
                  body: "Gebruik deze pagina als je niet alleen voorbeeldzinnen, maar ook de juiste opmaak, witruimte en PDF-structuur wilt.",
                },
                {
                  href: "/tools/sollicitatiebrief-generator",
                  title: "Sollicitatiebrief generator",
                  body: "Gebruik de voorbeelden direct als input en personaliseer op jouw vacature.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld",
                  title: "Sollicitatiebrief voorbeelden",
                  body: "Combineer motivatievoorbeelden met sterke openings- en afsluitzinnen.",
                },
                {
                  href: "/professioneel-cv-template",
                  title: "Professioneel CV template",
                  body: "Laat je brief en CV dezelfde professionele toon uitstralen.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Start gratis en betaal alleen wanneer je je CV wilt downloaden.",
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
            Veelgestelde vragen over motivatiebrief voorbeelden
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
                Klaar om je motivatiebrief af te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Schrijf nu je motivatiebrief en koppel direct een sterk CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de generator voor je brief en werk daarna je CV uit in dezelfde flow.
              </p>
            </div>
            <Link
              href="/tools/sollicitatiebrief-generator"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start met motivatiebrief
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
