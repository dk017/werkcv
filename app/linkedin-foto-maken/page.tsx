import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import LinkedInPhotoCheck from "@/components/profile-photo/LinkedInPhotoCheck";
import { PhotoInsetCard, PhotoTransformation } from "@/components/profile-photo/PhotoBeforeAfter";
import type { ProfilePhotoFaq } from "@/components/profile-photo/ProfilePhotoLanding";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { profilePhotoExampleLabel, profilePhotoExamples } from "@/lib/profile-photo-examples";
import { profilePhotoPrice } from "@/lib/site-content";

const price = profilePhotoPrice.display;

const faq: ProfilePhotoFaq[] = [
  { question: "Hoe maak ik zelf een goede LinkedIn-foto?", answer: "Ga met je gezicht naar een raam voor zacht daglicht, sta voor een lichte, rustige muur, houd de camera op ooghoogte (laat iemand anders de foto maken of gebruik de timer) en zorg dat je hoofd en schouders in beeld zijn." },
  { question: "Wat kost een LinkedIn-foto laten maken?", answer: `Bij een fotograaf betaal je in Nederland vaak €59 tot €300, afhankelijk van het aantal foto's en of de fotograaf naar je toe komt. Een AI-profielfoto van WerkCV kost eenmalig ${price}, en je ziet eerst gratis 4 voorbeelden.` },
  { question: "Welke afmeting heeft een LinkedIn-profielfoto?", answer: "LinkedIn raadt minstens 400 × 400 pixels aan en accepteert JPG en PNG tot 8 MB. Je foto wordt als cirkel getoond, dus houd je gezicht in het midden." },
  { question: "Mag ik een AI-foto gebruiken op LinkedIn?", answer: "Ja, zolang de foto jou herkenbaar en eerlijk weergeeft. WerkCV houdt je gezicht en kenmerken bewust hetzelfde en verandert vooral licht, achtergrond en kleding." },
  { question: "Kan ik dezelfde foto op mijn cv zetten?", answer: "Ja. Dezelfde foto op je cv en LinkedIn maakt je herkenbaar. In WerkCV zet je je AI-profielfoto met één klik in je cv." },
  { question: "Hoe vaak moet ik mijn LinkedIn-foto vernieuwen?", answer: "Zodra je er duidelijk anders uitziet, bijvoorbeeld door een ander kapsel, een bril of een paar jaar verschil. Recruiters willen je bij een gesprek herkennen." },
];

const phoneTips = [
  ["Licht van voren", "Ga met je gezicht naar een raam. Geen lamp recht boven je en geen raam achter je."],
  ["Rustige achtergrond", "Een lichte, effen muur werkt het best. Geen keuken, auto of drukke straat."],
  ["Camera op ooghoogte", "Laat iemand anders de foto maken of gebruik de timer. Een selfie van onderaf of bovenaf vervormt."],
  ["Hoofd en schouders", "Je gezicht vult ongeveer 60% van het beeld. Te ver weg wordt een stip in de LinkedIn-cirkel."],
  ["Kijk in de lens", "Kijk in de camera, niet naar het scherm. Een rustige, vriendelijke blik is genoeg."],
  ["Kleding die past bij je vak", "Wat je ook naar een sollicitatiegesprek zou dragen. Effen kleuren werken beter dan drukke prints."],
];

export const metadata: Metadata = buildDutchMetadata({
  title: "LinkedIn-foto maken: zelf, bij een fotograaf of met AI | WerkCV",
  description: `Zo maak je een professionele LinkedIn-foto: tips voor je telefoon, wat een fotograaf kost en een AI-profielfoto van je selfie (eerst gratis 4 voorbeelden, ${price}). Met gratis foto-check.`,
  path: "/linkedin-foto-maken",
  keywords: ["linkedin foto maken", "linkedin profielfoto maken", "linkedin foto laten maken", "linkedin foto ai", "goede linkedin foto", "linkedin profielfoto tips"],
  type: "article",
});

export default function LinkedInFotoMakenPage() {
  const sanne = profilePhotoExamples[0];
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faq} />
      <main>
        <section className="border-b-4 border-black bg-[radial-gradient(circle_at_top_left,#E9FFFC_0,#FFFEF9_45%,#FFF4D8_100%)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-900">LinkedIn-foto</span>
              <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">LinkedIn-foto maken: zo krijg je een professionele profielfoto</h1>
              <div className="mt-5 border-l-4 border-[#4ECDC4] bg-white/70 px-4 py-3">
                <p className="font-semibold leading-snug text-slate-900">
                  Een goede LinkedIn-foto is recent, scherp en laat je hoofd en schouders zien voor een rustige achtergrond. Je maakt
                  hem zelf met je telefoon, laat hem maken door een fotograaf (vaak €59 tot €300) of maakt er met AI een
                  professionele versie van een selfie van (bij WerkCV eerst gratis zien, daarna {price}).
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="#foto-check" className="inline-flex justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black">Check je huidige foto gratis</Link>
                <Link href="/profielfoto-cv-maken?bron=linkedin_foto_maken_hero" className="inline-flex justify-center border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Maak een AI-profielfoto</Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[460px]">
              <PhotoTransformation example={sanne} locale="nl" size="lg" priority />
              <p className="mt-3 text-center text-[11px] font-semibold text-slate-500">{profilePhotoExampleLabel.nl}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-black text-slate-950">Drie manieren om aan een goede LinkedIn-foto te komen</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { title: "Zelf met je telefoon", price: "Gratis", text: "Prima als je goed licht, een rustige muur en iemand hebt die de foto maakt. Kost wat proberen.", href: "#zelf-maken", cta: "Bekijk de tips" },
              { title: "Bij een fotograaf", price: "Vaak €59 tot €300", text: "De beste keuze als je volledige controle wilt over locatie, licht en kleding. Je plant een afspraak.", href: null, cta: null },
              { title: "AI-profielfoto van je selfie", price: `Eerst gratis, daarna ${price}`, text: "Upload een gewone foto en bekijk gratis 4 professionele versies. Pas betalen als je er een gebruikt.", href: "/profielfoto-cv-maken?bron=linkedin_foto_maken_routes", cta: "Maak gratis voorbeelden" },
            ].map((route) => (
              <article key={route.title} className="flex flex-col rounded-3xl border-2 border-black bg-white p-6">
                <h3 className="text-xl font-black text-slate-950">{route.title}</h3>
                <p className="mt-1 text-sm font-black text-[#0f8f86]">{route.price}</p>
                <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-slate-700">{route.text}</p>
                {route.href ? <Link href={route.href} className="mt-4 text-sm font-black underline decoration-2 underline-offset-4">{route.cta}</Link> : null}
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">Prijzen van fotografen zoals vermeld op de sites van Nederlandse fotostudio&apos;s in oktober 2026.</p>
        </section>

        <section id="zelf-maken" className="scroll-mt-20 border-y-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <h2 className="text-3xl font-black text-slate-950">Zelf een LinkedIn-foto maken met je telefoon</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {phoneTips.map(([title, text], i) => (
                <article key={title} className="rounded-2xl border-2 border-slate-200 bg-[#FFFEF9] p-5">
                  <p className="text-xs font-black text-slate-400">{i + 1}</p>
                  <h3 className="mt-1 text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="foto-check" className="scroll-mt-20 mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-black text-slate-950">Check je huidige foto gratis</h2>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Upload je foto en zie hoe hij scoort op uitsnede, licht, achtergrond en scherpte, met per punt een tip. Zonder account; je foto wordt niet opgeslagen.
          </p>
          <div className="mt-6"><LinkedInPhotoCheck locale="nl" source="linkedin_foto_maken_check" /></div>
        </section>

        <section className="border-y-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <h2 className="text-3xl font-black text-slate-950">Van selfie naar LinkedIn-foto met AI</h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Linksonder zie je steeds de foto die erin ging. Je gezicht blijft hetzelfde; licht, achtergrond en uitstraling worden professioneel.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {profilePhotoExamples.map((example) => <PhotoInsetCard key={example.id} example={example} locale="nl" />)}
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">{profilePhotoExampleLabel.nl}</p>
            <Link href="/profielfoto-cv-maken?bron=linkedin_foto_maken_examples" className="mt-6 inline-flex border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Maak gratis mijn voorbeelden
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-black text-slate-950">Je nieuwe foto op LinkedIn zetten</h2>
          <ol className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            {[
              "Open je LinkedIn-profiel en klik of tik op je huidige profielfoto.",
              "Kies voor een nieuwe foto uploaden en selecteer je foto.",
              "Verschuif en zoom zo dat je gezicht in het midden van de cirkel staat.",
              "Zet de zichtbaarheid op 'Iedereen', zodat recruiters buiten je netwerk je ook zien.",
              "Gebruik dezelfde foto op je cv, zodat je overal herkenbaar bent.",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#FFD166] text-xs font-black">{i + 1}</span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm font-medium text-slate-700">
            Ook je LinkedIn-profiel verbeteren? Lees{" "}
            <Link href="/cv-tips/linkedin-profiel-maken" className="font-black underline decoration-2 underline-offset-4">LinkedIn-profiel maken: stap voor stap</Link>.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
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
      </main>
      <Footer />
    </div>
  );
}
