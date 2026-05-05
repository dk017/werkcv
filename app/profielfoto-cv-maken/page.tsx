import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import NavUserMenu from "@/components/NavUserMenu";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { applicationBundlePrice, profilePhotoPrice } from "@/lib/site-content";
import ProfilePhotoGenerator from "./ProfilePhotoGenerator";

const faqItems = [
  {
    question: "Is een foto verplicht op mijn cv in Nederland?",
    answer:
      "Nee. Een foto op je cv is niet verplicht. In Nederland wordt een professionele foto wel vaak gebruikt, maar volg altijd de instructies in de vacature. Als er om een cv zonder foto wordt gevraagd, laat je de foto weg.",
  },
  {
    question: "Kan ik dezelfde foto gebruiken voor cv en LinkedIn?",
    answer:
      "Ja, dat is vaak juist handig. Een consistente profielfoto op je cv en LinkedIn maakt je herkenbaar voor recruiters die beide bekijken.",
  },
  {
    question: "Vervangt dit een professionele fotograaf?",
    answer:
      "Niet altijd. Een fotograaf blijft de beste keuze als je volledige controle wilt over licht, houding en kleding. Deze tool is bedoeld als snelle, betaalbare route als je al een redelijke foto hebt en die professioneler wilt maken.",
  },
  {
    question: "Wat gebeurt er met mijn foto?",
    answer:
      "WerkCV gebruikt je upload alleen om de AI-variant te maken. We vragen niet om LinkedIn-login. De gegenereerde foto's bewaren we in je account zodat je ze later opnieuw kunt downloaden.",
  },
  {
    question: "Kan WerkCV mijn LinkedIn-foto automatisch ophalen?",
    answer:
      "Nee. WerkCV scrapt LinkedIn niet, gebruikt geen LinkedIn API en vraagt niet om je LinkedIn-login. Je uploadt zelf een foto die je wilt gebruiken.",
  },
  {
    question: "Wat gaat de profielfoto-tool kosten?",
    answer:
      `De AI-profielfoto is een eenmalige add-on van ${profilePhotoPrice.display}. Je krijgt 4 startvarianten en 2 inbegrepen verfijningen. Combineer je hem met je CV, dan is de bundle ${applicationBundlePrice.display}. Er is geen abonnement.`,
  },
];

const qualityChecks = [
  "Je gezicht is duidelijk herkenbaar en niet overdreven aangepast.",
  "De achtergrond is rustig en leidt niet af van je gezicht.",
  "De foto voelt professioneel, maar niet stijf of onnatuurlijk.",
  "De uitsnede werkt als kleine profielfoto op LinkedIn en als compacte cv-foto.",
  "De kleding en uitstraling passen bij de sector waarin je solliciteert.",
];

const sampleTransformations = [
  {
    before: "Selfie met drukke achtergrond",
    after: "Rustige LinkedIn-foto met neutrale achtergrond en professionele uitsnede",
  },
  {
    before: "Goede foto, maar te casual",
    after: "Nettere kledingstijl en belichting die beter past bij cv en sollicitatie",
  },
  {
    before: "LinkedIn-foto voelt verouderd",
    after: "Nieuwe variant met herkenbare uitstraling, direct oogcontact en moderne studio-look",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: `AI profielfoto maken voor CV en LinkedIn | ${profilePhotoPrice.display} | WerkCV`,
  description:
    `Maak van een gewone foto een professionele AI-profielfoto voor je cv en LinkedIn. 4 varianten, 2 verfijningen en later downloaden. Eenmalig ${profilePhotoPrice.display}.`,
  path: "/profielfoto-cv-maken",
  keywords: [
    "profielfoto cv maken",
    "ai profielfoto cv",
    "linkedin profielfoto maken",
    "professionele profielfoto maken",
    "cv foto maken",
    "zakelijke profielfoto ai",
  ],
  type: "article",
});

export default function ProfielfotoCvMakenPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 sm:flex">
            <Link href="/cv-tips/foto-op-je-cv" className="hover:text-slate-900">
              Foto op je cv
            </Link>
            <Link href="/cv-maken" className="hover:text-slate-900">
              CV maken
            </Link>
            <Link href="/tools" className="hover:text-slate-900">
              Tools
            </Link>
            <NavUserMenu />
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b-4 border-black bg-[radial-gradient(circle_at_top_left,#E9FFFC_0,#FFFEF9_42%,#FFF4D8_100%)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                AI profielfoto voor sollicitaties
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                Professionele profielfoto maken voor je cv en LinkedIn
              </h1>
              <p className="mt-5 text-lg font-medium leading-relaxed text-slate-700">
                Upload een bestaande foto of selfie en maak er een realistische, herkenbare AI-profielfoto van die past
                bij je sollicitatie, CV en LinkedIn-profiel. Geen fotoshoot nodig; handig als laatste stap
                nadat je CV klaar is of wanneer je LinkedIn-profiel nog rommelig oogt.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#profielfoto-tool"
                  className="inline-flex items-center justify-center border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  Maak mijn profielfoto
                </Link>
                <Link
                  href="/cv-tips/foto-op-je-cv"
                  className="inline-flex items-center justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
                >
                  Wanneer foto op je cv?
                </Link>
              </div>
              <p className="mt-4 text-sm font-bold text-slate-700">
                Eénmalig {profilePhotoPrice.display}. Of samen met je CV voor {applicationBundlePrice.display}. Geen abonnement.
              </p>
            </div>

            <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                Positionering
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Niet zomaar een headshot, maar een sollicitatiefoto
              </h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                Veel AI-headshot tools verkopen vooral veel varianten. WerkCV richt zich smaller op het moment
                waarop iemand wil solliciteren: CV opmaken, LinkedIn netjes maken en de eerste indruk professioneel
                afronden. Daarom krijg je minder ruis, duidelijke stijlen en twee gerichte verfijningen.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Voor CV en LinkedIn",
                  "Nederlandse sollicitatiecontext",
                  "Herkenbaar en realistisch",
                  "Later opnieuw downloaden",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border-2 border-black bg-[#FFFEF9] p-3 text-sm font-black">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="profielfoto-tool" className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 rounded-3xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Eerst preview, dan betalen
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Bekijk je varianten voordat je {profilePhotoPrice.display} betaalt
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  Je logt in, maakt 4 voorbeeldvarianten en kiest de beste foto. Pas als je wilt downloaden start de
                  eenmalige betaling. Zo betaal je niet blind voor een resultaat dat je nog niet hebt gezien.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {["4 startvarianten", "2 verfijningen", "Betalen bij download"].map((item) => (
                    <div key={item} className="border-2 border-black bg-[#E9FFFC] p-3 text-sm font-black text-black">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {sampleTransformations.map((item) => (
                  <div key={item.before} className="grid gap-3 rounded-2xl border-2 border-slate-200 bg-[#FFFEF9] p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Vaak nu</p>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{item.before}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Doeloutput</p>
                      <p className="mt-1 text-sm font-black leading-relaxed text-slate-900">{item.after}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ProfilePhotoGenerator />
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-12 md:grid-cols-3">
          {[
            {
              title: "1. Upload een redelijke basisfoto",
              text: "Een duidelijke selfie of portret werkt beter dan een groepsfoto, vakantiefoto of foto met zonnebril.",
            },
            {
              title: "2. Kies de juiste uitstraling",
              text: "Zakelijk voor kantoorfuncties, warmer voor zorg en onderwijs, of een strakke LinkedIn-stijl.",
            },
            {
              title: "3. Gebruik de beste variant bewust",
              text: "Controleer of je nog steeds herkenbaar bent en gebruik de foto alleen als hij natuurlijk aanvoelt.",
            },
          ].map((step) => (
            <article key={step.title} className="rounded-3xl border-2 border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-slate-950">{step.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{step.text}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black text-slate-950">Wanneer gebruik je een profielfoto op je cv?</h2>
              <div className="mt-4 space-y-4 text-sm font-medium leading-relaxed text-slate-700">
                <p>
                  In Nederland is een foto op je cv niet verplicht. Toch kiezen veel sollicitanten voor een
                  professionele foto, vooral bij functies waarin persoonlijk contact, vertrouwen of presentatie
                  belangrijk is. Denk aan sales, zorg, onderwijs, hospitality, HR, klantenservice en veel
                  kantoorfuncties.
                </p>
                <p>
                  Laat een foto weg als de vacature expliciet vraagt om anoniem solliciteren of om een cv zonder
                  foto. Solliciteer je internationaal, controleer dan de lokale norm. Voor de VS, het VK en Canada
                  wordt een foto op het resume meestal afgeraden.
                </p>
                <p>
                  Twijfel je? Lees eerst de uitgebreide gids over{" "}
                  <Link href="/cv-tips/foto-op-je-cv" className="font-black underline decoration-2 underline-offset-4">
                    foto op je cv in Nederland
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black text-slate-950">Wat maakt een goede cv-profielfoto?</h2>
              <ul className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
                {qualityChecks.map((check) => (
                  <li key={check} className="flex gap-3">
                    <span className="mt-1 h-5 w-5 flex-none rounded-full bg-[#4ECDC4] text-center text-xs font-black text-black">
                      ✓
                    </span>
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y-4 border-black bg-slate-950 text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#4ECDC4]">Volgende stap</p>
              <h2 className="mt-3 text-3xl font-black leading-tight">Maak je hele sollicitatieprofiel netjes</h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300">
                Een professionele foto helpt pas echt wanneer je CV en LinkedIn hetzelfde niveau uitstralen.
                Gebruik je beste variant daarom direct met een rustige CV-template en een duidelijke profieltekst.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                "Gebruik dezelfde foto op je CV en LinkedIn.",
                "Werk je profieltekst bij zodat foto en verhaal kloppen.",
                "Kies een rustige template die de foto niet te dominant maakt.",
                "Download pas als je complete sollicitatieprofiel klaar is.",
              ].map((item) => (
                <div key={item} className="border-2 border-white/20 bg-white/10 p-4 text-sm font-bold leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black text-slate-950">Voor sollicitanten</h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                Gebruik de tool als je al een cv hebt, maar je foto nog niet past bij het niveau van je document.
                Maak daarna je cv compleet in WerkCV met een nette template, duidelijke profieltekst en PDF-export.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/cv-maken" className="inline-flex justify-center border-2 border-black bg-[#4ECDC4] px-4 py-3 text-sm font-black text-black">
                  Maak mijn cv
                </Link>
                <Link href="/tools/linkedin-naar-cv" className="inline-flex justify-center border-2 border-black bg-white px-4 py-3 text-sm font-black text-black">
                  LinkedIn naar cv
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black text-slate-950">Voor coaches en begeleiders</h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                Loopbaancoaches zien vaak dat het verhaal van een cliënt sterker wordt, maar cv en profielfoto nog
                achterlopen. Deze tool kan later als praktische add-on helpen om het eindprofiel netter en
                consistenter te maken.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/loopbaancoach" className="inline-flex justify-center border-2 border-black bg-[#FFD166] px-4 py-3 text-sm font-black text-black">
                  CV tool voor coaches
                </Link>
                <Link href="/for-coaches" className="inline-flex justify-center border-2 border-black bg-white px-4 py-3 text-sm font-black text-black">
                  Voor coaches
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Veelgestelde vragen</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="text-sm font-black text-slate-950">{item.question}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="border-4 border-black bg-[#4ECDC4] p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Maak je sollicitatieprofiel compleet</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-slate-900">
              Start met een professionele profielfoto, zet daarna je cv netjes in WerkCV en download alleen als je
              tevreden bent met de PDF.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="#profielfoto-tool" className="inline-flex justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black">
                Maak mijn profielfoto
              </Link>
              <Link href="/editor" className="inline-flex justify-center border-4 border-black bg-black px-5 py-3 text-sm font-black text-white">
                Maak mijn cv
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
