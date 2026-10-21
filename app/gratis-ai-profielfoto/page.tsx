import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { PhotoInsetCard, PhotoTransformation } from "@/components/profile-photo/PhotoBeforeAfter";
import type { ProfilePhotoFaq } from "@/components/profile-photo/ProfilePhotoLanding";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { profilePhotoExampleLabel, profilePhotoExamples } from "@/lib/profile-photo-examples";
import { profilePhotoPrice } from "@/lib/site-content";

const price = profilePhotoPrice.display;
const toolHref = "/profielfoto-cv-maken?bron=gratis_ai_profielfoto#profielfoto-tool";

const faq: ProfilePhotoFaq[] = [
  { question: "Is de AI-profielfoto van WerkCV gratis?", answer: `Het maken en bekijken is gratis: je krijgt 4 voorbeelden en 2 verfijningen. Wil je een foto downloaden of in je cv zetten, dan betaal je eenmalig ${price}. Er is geen abonnement.` },
  { question: "Heb ik een account nodig?", answer: "Ja, je logt in met je e-mailadres. Zo bewaren we je voorbeelden en kun je later terugkomen om er een te kiezen." },
  { question: "Krijg ik de voorbeelden met een watermerk?", answer: "Nee. Je bekijkt je voorbeelden gewoon in de tool. Downloaden (1024 × 1024 pixels) en in je cv zetten kan na de eenmalige betaling." },
  { question: "Waarom is het niet helemaal gratis?", answer: "Elke AI-foto kost rekenkracht. Daarom laten we je eerst gratis zien wat je krijgt, en vragen we pas geld als je een foto echt wilt gebruiken." },
  { question: "Hoe lang duurt het?", answer: "Meestal heb je je 4 voorbeelden binnen een minuut." },
  { question: "Wat gebeurt er met mijn foto?", answer: "Je oorspronkelijke foto wordt niet bewaard. De gemaakte foto's staan in je account; je kunt WerkCV altijd vragen ze te verwijderen. De foto's worden gemaakt via de OpenAI API, die gegevens standaard niet gebruikt voor training." },
  { question: "Kan ik de foto als pasfoto gebruiken?", answer: "Nee. Een pasfoto voor paspoort, ID-kaart of rijbewijs moet onbewerkt zijn. Deze foto is voor je cv en LinkedIn." },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Gratis AI-profielfoto maken: eerst gratis voorbeelden zien | WerkCV",
  description: `Maak gratis 4 AI-voorbeelden van je profielfoto voor cv en LinkedIn. Pas als je er een wilt downloaden, betaal je eenmalig ${price}. Geen abonnement, je oorspronkelijke foto wordt niet bewaard.`,
  path: "/gratis-ai-profielfoto",
  keywords: ["gratis ai profielfoto", "ai profielfoto gratis", "gratis ai profielfoto maken", "ai profielfoto maken gratis", "gratis linkedin foto ai", "gratis profielfoto cv"],
  type: "article",
});

export default function GratisAiProfielfotoPage() {
  const daniel = profilePhotoExamples[1];
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faq} />
      <main>
        <section className="border-b-4 border-black bg-[radial-gradient(circle_at_top_left,#E9FFFC_0,#FFFEF9_45%,#FFF4D8_100%)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-900">AI-profielfoto</span>
              <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">Gratis AI-profielfoto maken: eerst zien, dan pas betalen</h1>
              <div className="mt-5 border-l-4 border-[#4ECDC4] bg-white/70 px-4 py-3">
                <p className="font-semibold leading-snug text-slate-900">
                  Bij WerkCV maak je gratis 4 AI-voorbeelden van je profielfoto voor cv en LinkedIn. Wil je er een downloaden of in je cv
                  zetten, dan betaal je eenmalig {price}. Geen abonnement en geen verrassingen.
                </p>
              </div>
              <Link href={toolHref} className="mt-6 inline-flex border-4 border-black bg-[#4ECDC4] px-6 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Maak gratis mijn voorbeelden
              </Link>
              <p className="mt-3 text-sm font-semibold text-slate-600">Meestal binnen een minuut · inloggen met je e-mailadres</p>
            </div>
            <div className="mx-auto w-full max-w-[440px]">
              <PhotoTransformation example={daniel} locale="nl" size="lg" priority />
              <p className="mt-3 text-center text-[11px] font-semibold text-slate-500">{profilePhotoExampleLabel.nl}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-black text-slate-950">Wat is gratis, en wat kost geld?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0f8f86]">Gratis</p>
              <ul className="mt-3 space-y-2 text-sm font-bold text-slate-800">
                {["4 AI-voorbeelden van je eigen foto", "2 verfijningen om iets aan te passen", "Je voorbeelden bewaren in je account", "De LinkedIn-foto check met score en tips"].map((item) => (
                  <li key={item} className="flex gap-2"><span aria-hidden className="text-[#0f8f86]">✓</span>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border-4 border-black bg-[#FFD166] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-800">Eenmalig {price}</p>
              <ul className="mt-3 space-y-2 text-sm font-bold text-slate-900">
                {["Je foto's downloaden (1024 × 1024 pixels)", "Je favoriet met één klik in je WerkCV-cv", "Gebruiken voor LinkedIn, cv en professionele profielen", "Geen abonnement, niets om op te zeggen"].map((item) => (
                  <li key={item} className="flex gap-2"><span aria-hidden>✓</span>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Waarom niet helemaal gratis? Elke AI-foto kost rekenkracht. Daarom laten we je eerst zien wat je krijgt, en vragen we pas
            geld als je een foto echt wilt gebruiken. Bij de meeste andere AI-diensten betaal je vooraf, vaak €15 tot €59.
          </p>
        </section>

        <section className="border-y-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <h2 className="text-3xl font-black text-slate-950">Zo ziet het resultaat eruit</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {profilePhotoExamples.map((example) => <PhotoInsetCard key={example.id} example={example} locale="nl" />)}
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">{profilePhotoExampleLabel.nl}</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-black text-slate-950">Liever helemaal gratis?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { title: "Zelf fotograferen", text: "Met je telefoon, daglicht van voren en een lichte muur kom je een heel eind.", href: "/linkedin-foto-maken#zelf-maken", cta: "Tips voor je telefoon" },
              { title: "Check je huidige foto", text: "Misschien is je foto al goed genoeg. De gratis check geeft een score en tips per punt.", href: "/linkedin-foto-check", cta: "Gratis LinkedIn-foto check" },
              { title: "Vraag iemand om hulp", text: "Een collega of vriend met een goede telefoon maakt vaak een betere foto dan een selfie.", href: null, cta: null },
            ].map((item) => (
              <article key={item.title} className="flex flex-col rounded-2xl border-2 border-black bg-white p-5">
                <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-slate-700">{item.text}</p>
                {item.href ? <Link href={item.href} className="mt-3 text-sm font-black underline decoration-2 underline-offset-4">{item.cta}</Link> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-12">
          <h2 className="text-3xl font-black text-slate-950">Veelgestelde vragen</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {faq.map((item) => (
              <details key={item.question} className="group rounded-2xl border-2 border-black bg-white p-4 open:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <summary className="cursor-pointer list-none text-sm font-black text-slate-950">
                  <span className="flex items-start justify-between gap-3">{item.question}<span aria-hidden className="text-lg leading-none group-open:rotate-45">+</span></span>
                </summary>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="border-4 border-black bg-[#4ECDC4] p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Zie eerst je nieuwe profielfoto</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-bold text-slate-900">4 gratis voorbeelden, meestal binnen een minuut. Pas betalen als je er een gebruikt: eenmalig {price}.</p>
            <Link href={toolHref} className="mt-6 inline-flex border-4 border-black bg-white px-6 py-3 text-base font-black text-black">Maak gratis mijn voorbeelden</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
