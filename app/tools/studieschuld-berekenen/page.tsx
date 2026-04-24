import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { buildDutchMetadata } from "@/lib/page-metadata";
import StudieschuldTool from "./StudieschuldTool";

const quickAnswerCards = [
  {
    title: "DUO kijkt eerst naar inkomen",
    text: "Je maandlast hangt niet alleen af van je schuld. Voor DUO telt vooral wat je verdient boven het drempelinkomen.",
  },
  {
    title: "Je stelsel bepaalt de looptijd",
    text: "Oud stelsel en nieuw stelsel gebruiken dezelfde draagkrachtlogica, maar verschillen sterk in terugbetaalperiode.",
  },
  {
    title: "Extra aflossen is altijd apart",
    text: "De verplichte DUO maandlast is iets anders dan vrijwillig extra aflossen. Deze tool laat beide denkrichtingen uit elkaar trekken.",
  },
];

const routeChoiceCards = [
  {
    href: "/tools/netto-bruto-calculator",
    title: "Netto bruto calculator",
    body: "Logische vervolgstap als je wilt weten hoeveel ruimte je netto overhoudt naast je DUO maandbedrag.",
  },
  {
    href: "/tools/parttime-salaris-calculator",
    title: "Parttime salaris calculator",
    body: "Handig als je met minder uren of een starterssalaris wilt zien wat dat doet met je draagkracht en maandlast.",
  },
  {
    href: "/salaris",
    title: "Salaris per beroep",
    body: "Gebruik deze route als je een eerste baan of overstap vergelijkt en je bruto salaris nog wilt ijken aan de markt.",
  },
  {
    href: "/gratis-cv-maken",
    title: "Gratis CV maken",
    body: "Past goed als je berekening onderdeel is van een bredere overstap en je direct verder wilt met solliciteren.",
  },
];

const faqItems = [
  {
    question: "Hoeveel moet ik per maand terugbetalen aan DUO?",
    answer:
      "Je betaalt 4% van het deel van je inkomen dat boven het drempelinkomen van €24.893 per jaar (2026, alleenstaand) uitkomt. Verdien je minder dan de drempel, dan betaal je niets terug. DUO herberekent dit elk jaar op basis van je belastingaangifte van 2 jaar eerder.",
  },
  {
    question: "Wat is het verschil tussen oud stelsel en nieuw stelsel?",
    answer:
      "In het oud stelsel (lenen vóór september 2015) heb je 15 jaar om terug te betalen. In het nieuw stelsel (lenen ná september 2015) is dit 35 jaar. Het aflospercentage is in beide stelsels 4% van het inkomen boven het drempelinkomen. Na de looptijd wordt de restschuld automatisch kwijtgescholden.",
  },
  {
    question: "Wordt mijn studieschuld kwijtgescholden als ik niet alles heb terugbetaald?",
    answer:
      "Ja. Na 15 jaar (oud stelsel) of 35 jaar (nieuw stelsel) wordt het resterende bedrag automatisch kwijtgescholden door DUO. Je hoeft hiervoor niets aan te vragen — het gebeurt automatisch op basis van de startdatum van je terugbetaling.",
  },
  {
    question: "Wat als ik tijdelijk geen inkomen heb, bijvoorbeeld door werkloosheid?",
    answer:
      "Als je inkomen onder het drempelinkomen van €24.893 valt, is je verplichte aflossing €0. Je hoeft dit niet apart aan te vragen — DUO gebruikt automatisch je belastingaangifte. Je kunt ook een betalingspauze aanvragen als je in een bijzondere financiële situatie zit.",
  },
  {
    question: "Kan ik vrijwillig extra aflossen zonder boete?",
    answer:
      "Ja, altijd en zonder boete. Extra aflossen verlaagt je openstaande schuld en vermindert de renteopbouw. Je regelt dit via Mijn DUO op duo.nl. Er is geen minimum- of maximumbedrag voor vrijwillige extra aflossingen.",
  },
  {
    question: "Hoe weet ik wanneer mijn terugbetalingstermijn begint?",
    answer:
      "De terugbetalingstermijn start 2 jaar na het einde van je studie (of na afmelding als student). DUO stuurt je een betalingsoverzicht met je startdatum, het maandelijkse aflosbedrag en de actuele rente. Je kunt dit ook altijd inzien via Mijn DUO.",
  },
  {
    question: "Hoe kan ik mijn DUO maandlast berekenen?",
    answer:
      "Voor een goede DUO maandlast-berekening heb je minimaal vier dingen nodig: je stelsel, openstaande schuld, huidige bruto jaarinkomen en de rente die op jouw lening geldt. Deze tool zet die variabelen direct om naar een maandbedrag en laat ook zien wat vrijwillig extra aflossen verandert.",
  },
  {
    question: "Wat bedoelen mensen met duo berekenen of maandbedrag berekenen duo?",
    answer:
      "Meestal bedoelen ze hetzelfde: hoeveel DUO maandelijks van je verwacht op basis van draagkracht. De zoektermen verschillen, maar de vraag erachter is bijna altijd of je huidige inkomen genoeg ruimte laat voor de verplichte aflossing.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title:
    "Studieschuld DUO Berekenen 2026 – Maandelijkse Aflossing Calculator | WerkCV",
  description:
    "Bereken hoeveel je maandelijks terugbetaalt aan DUO op basis van je inkomen. Voor oud stelsel (voor 2015) en nieuw stelsel (na 2015). Gratis en direct inzichtelijk.",
  path: "/tools/studieschuld-berekenen",
  keywords: [
    "studieschuld duo berekenen",
    "duo maandlast berekenen",
    "duo berekenen",
    "maandbedrag berekenen duo",
    "duo maandbedrag berekening",
    "maandelijkse duo aflossing",
    "studieschuld berekenen",
    "duo aflossing berekenen",
  ],
});

export default function StudieschuldBerekenenPage() {
  return (
    <ToolPageShell
      badge="Geld"
      title="Studieschuld DUO berekenen — hoeveel betaal je maandelijks?"
      description="Bereken je maandelijkse DUO-aflossing op basis van je stelsel, openstaande schuld en huidige inkomen. Je betaalt altijd naar draagkracht — nooit meer dan je kunt missen."
      toolLabel="Studieschuld DUO berekenen"
      toolHref="/tools/studieschuld-berekenen"
      faqTitle="Veelgestelde vragen over studieschuld en DUO"
      faqItems={faqItems}
      statPills={[
        {
          label: "35 jaar",
          value: "maximale looptijd nieuw stelsel",
          note: "oud stelsel kent 15 jaar",
        },
        {
          label: "Inkomensgerelateerd",
          value: "je betaalt naar draagkracht",
          note: "onder de drempel betaal je niets",
        },
        {
          label: "Kwijtschelding",
          value: "restschuld vervalt na looptijd",
          note: "automatisch via DUO",
        },
      ]}
      asideTitle="Waarom deze rekensom vaak onduidelijk voelt"
      asideParagraphs={[
        "DUO kijkt niet alleen naar je schuld, maar vooral naar je inkomen, stelsel en drempelbedrag.",
        "Daardoor lijkt het maandbedrag soms laag, terwijl de looptijd juist heel lang is en rente blijft meelopen.",
        "Deze tool laat meteen zien wat verplicht is, wat vrijwillig extra doet en wat er aan het einde wordt kwijtgescholden.",
      ]}
    >
      <StudieschuldTool />

      <section className="mt-10 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Kort antwoord</p>
        <h2 className="mt-2 text-3xl font-black text-slate-900">
          DUO maandlast berekenen: waar kijkt DUO eigenlijk naar?
        </h2>
        <p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-slate-700">
          Wie zoekt op <strong>duo maandlast berekenen</strong>, <strong>duo berekenen</strong> of{" "}
          <strong>maandbedrag berekenen duo</strong> wil meestal snel weten of een inkomen genoeg ruimte laat voor de
          verplichte aflossing. DUO kijkt daarbij eerst naar draagkracht, daarna naar stelsel en pas daarna naar de
          grootte van je openstaande schuld.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {quickAnswerCards.map((card) => (
            <article key={card.title} className="border-2 border-black bg-[#FFFEF0] p-5">
              <h3 className="text-lg font-black text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Wanneer deze tool helpt</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Gebruik deze berekening vooral in drie situaties</h2>
          <ul className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <li>Je start met terugbetalen en wilt vooraf weten wat DUO waarschijnlijk als maandbedrag hanteert.</li>
            <li>Je vergelijkt een nieuwe baan, minder uren of een starterssalaris en wilt je netto ruimte realistischer inschatten.</li>
            <li>Je denkt aan extra aflossen en wilt zien wat verplicht is versus wat je vrijwillig bovenop dat bedrag kunt doen.</li>
          </ul>
        </div>
        <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Wat deze pagina niet doet</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Gebruik het als rekenhulp, niet als DUO-beschikking</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
            DUO baseert de echte beschikking op je belastinggegevens en actuele regeling. Deze tool is bedoeld als snelle,
            begrijpelijke voorcalculatie zodat je eerder ziet hoe zwaar een studieschuld meeweegt in je salaris- of baanbeslissing.
          </p>
        </div>
      </section>

      <section className="mt-10 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Volgende stap</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">
          Trek je DUO-berekening door naar je volgende werk- of salarisbeslissing
        </h2>
        <p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-slate-700">
          Veel bezoekers gebruiken deze tool niet los, maar tijdens een overstapmoment: eerste baan, salarisonderhandeling,
          minder uren of een nieuwe offercheck. Daarom loont het om je maandlast meteen naast netto salaris, marktloon en
          je sollicitatiepositie te leggen.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {routeChoiceCards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
            >
              <p className="text-sm font-black text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </ToolPageShell>
  );
}
