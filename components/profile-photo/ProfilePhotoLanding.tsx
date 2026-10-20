import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PhotoInsetCard, PhotoTransformation } from "@/components/profile-photo/PhotoBeforeAfter";
import { profilePhotoExampleLabel, profilePhotoExamples } from "@/lib/profile-photo-examples";
import { profilePhotoPrice } from "@/lib/site-content";

type Locale = "nl" | "en";
export type ProfilePhotoFaq = { question: string; answer: string };

/**
 * AI profile photo landing page (NL /profielfoto-cv-maken, EN /en/profile-photo). Order and elements follow the
 * research of 20 Oct 2026 (docs/product/2026-10-20-profile-photo-positioning.md): transformation hero with the
 * free-preview promise, 3 steps, selfie → result examples, the photo in use (LinkedIn + CV), comparison,
 * "why 4", the tool, privacy, FAQ, final CTA. No invented social proof; examples are labelled AI examples.
 */
export default function ProfilePhotoLanding({ locale, tool, styleGallery, faq, seoContent }: { locale: Locale; tool: ReactNode; styleGallery: ReactNode; faq: ProfilePhotoFaq[]; seoContent?: ReactNode }) {
  const nl = locale === "nl";
  const t = (dutch: string, english: string) => (nl ? dutch : english);
  const price = nl ? profilePhotoPrice.display : profilePhotoPrice.displayEn;
  const hero = profilePhotoExamples[0];
  const toolHref = "#profielfoto-tool";

  const steps = [
    { n: "1", title: t("Upload een gewone foto", "Upload a regular photo"), text: t("Een selfie of portret waarop je gezicht duidelijk te zien is. 1 tot 4 foto's.", "A selfie or portrait where your face is clearly visible. 1 to 4 photos.") },
    { n: "2", title: t("Bekijk gratis 4 voorbeelden", "See 4 previews for free"), text: t("Meestal binnen een minuut. Niet helemaal goed? Je hebt 2 gratis verfijningen.", "Usually within a minute. Not quite right? You get 2 free refinements.") },
    { n: "3", title: t(`Betaal pas als je er een gebruikt`, "Pay only if you use one"), text: t(`Eenmalig ${price}. Download je foto's en zet je favoriet met één klik in je WerkCV-cv.`, `${price} once. Download your photos and put your favourite on your WerkCV CV in one click.`) },
  ];

  const compareRows: Array<[string, string, string, string]> = [
    [t("Prijs", "Price"), t("€59 tot €300", "€59 to €300"), t("vaak €15 tot €59", "often €15 to €59"), price],
    [t("Eerst zien, dan betalen", "See first, then pay"), t("Nee", "No"), t("Zelden", "Rarely"), t("Ja, 4 gratis voorbeelden", "Yes, 4 free previews")],
    [t("Tijd", "Time"), t("Afspraak plus reistijd", "Appointment plus travel"), t("15 minuten tot 2 uur", "15 minutes to 2 hours"), t("Meestal binnen een minuut", "Usually within a minute")],
    [t("Foto's", "Photos"), t("2 tot 30", "2 to 30"), t("20 tot 200, waarvan een deel bruikbaar", "20 to 200, part of them usable"), t("4 die je al hebt gezien, plus 2 verfijningen", "4 you have already seen, plus 2 refinements")],
    [t("Direct in je cv", "Straight onto your CV"), t("Nee", "No"), t("Nee", "No"), t("Ja, met één klik", "Yes, in one click")],
  ];

  const privacy = [
    { title: t("Je selfie wordt niet bewaard", "Your selfie is not stored"), text: t("We gebruiken je upload alleen om de foto's te maken en slaan hem daarna niet op.", "We use your upload only to create the photos and do not store it afterwards.") },
    { title: t("Je foto's blijven van jou", "Your photos stay yours"), text: t("De gemaakte foto's staan in je account. Wil je ze laten verwijderen? Mail contact@werkcv.nl.", "The generated photos are kept in your account. Want them deleted? Email contact@werkcv.nl.") },
    { title: t("Niet gebruikt om AI te trainen", "Not used to train AI"), text: t("De foto's worden gemaakt via de OpenAI API; die gebruikt API-gegevens standaard niet voor training.", "Photos are made through the OpenAI API, which by default does not use API data for training.") },
    { title: t("Niet als pasfoto", "Not a passport photo"), text: t("Geschikt voor cv en LinkedIn, niet voor paspoort, ID-kaart of rijbewijs: een pasfoto moet onbewerkt zijn.", "Fine for CV and LinkedIn, not for a passport, ID card or driving licence: those photos must be unedited.") },
  ];

  return (
    <main>
      {/* 1. Hero: the transformation and the free-preview promise */}
      <section className="border-b-4 border-black bg-[radial-gradient(circle_at_top_left,#E9FFFC_0,#FFFEF9_45%,#FFF4D8_100%)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-900">
              {t("AI-profielfoto voor cv en LinkedIn", "AI profile photo for CV and LinkedIn")}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              {t("Een professionele profielfoto van je selfie. Eerst gratis zien.", "A professional profile photo from your selfie. See it free first.")}
            </h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-slate-700">
              {t(
                `Upload een gewone foto en bekijk gratis 4 professionele versies voor je cv en LinkedIn. Pas als je er een wilt gebruiken, betaal je eenmalig ${price}.`,
                `Upload a regular photo and see 4 professional versions for your CV and LinkedIn for free. Only if you want to use one do you pay ${price} once.`,
              )}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={toolHref} className="inline-flex items-center justify-center border-4 border-black bg-[#4ECDC4] px-6 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {t("Maak gratis mijn voorbeelden", "Create my free previews")}
              </Link>
              <Link href="#voorbeelden" className="inline-flex items-center justify-center border-4 border-black bg-white px-6 py-3 text-base font-black text-black">
                {t("Bekijk voorbeelden", "See examples")}
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-slate-700">
              {[t("Geen fotoshoot", "No photo shoot"), t("Meestal binnen een minuut", "Usually within a minute"), t("Geen abonnement", "No subscription")].map((item) => (
                <li key={item} className="flex items-center gap-1.5"><span aria-hidden className="text-[#0f8f86]">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[540px]">
            <PhotoTransformation example={hero} locale={locale} size="lg" priority />
            <p className="mt-4 text-center text-[11px] font-semibold text-slate-500">{profilePhotoExampleLabel[locale]}</p>
          </div>
        </div>
      </section>

      {/* 2. How it works */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl font-black text-slate-950">{t("Zo werkt het", "How it works")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.n} className="rounded-3xl border-2 border-black bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-[#FFD166] text-base font-black">{s.n}</span>
              <h3 className="mt-4 text-xl font-black text-slate-950">{s.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Selfie → result examples */}
      <section id="voorbeelden" className="scroll-mt-20 border-y-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 className="text-3xl font-black leading-tight text-slate-950">{t("Gewone selfie erin, profielfoto eruit", "Regular selfie in, profile photo out")}</h2>
            <p className="text-sm font-medium leading-relaxed text-slate-700">
              {t(
                "Linksonder zie je steeds de foto die erin ging. Je gezicht, haar en kenmerken blijven hetzelfde; licht, achtergrond en uitstraling worden professioneel.",
                "The small photo shows what went in. Your face, hair and features stay the same; light, background and look become professional.",
              )}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {profilePhotoExamples.map((example, i) => (
              <PhotoInsetCard key={example.id} example={example} locale={locale} priority={i < 2} />
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold text-slate-500">{profilePhotoExampleLabel[locale]}</p>
        </div>
      </section>

      {/* 4. The photo in use: LinkedIn and CV */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl font-black text-slate-950">{t("Zo staat hij op LinkedIn en op je cv", "How it looks on LinkedIn and your CV")}</h2>
        <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
          {t("Recruiters bekijken vaak je cv en je LinkedIn naast elkaar. Met dezelfde nette foto ben je meteen herkenbaar.", "Recruiters often look at your CV and LinkedIn side by side. The same clean photo makes you recognisable at once.")}
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" aria-label={t("Voorbeeld LinkedIn-profiel", "Example LinkedIn profile")}>
            <div className="h-20 bg-gradient-to-r from-[#0a66c2] to-[#4ECDC4]" />
            <div className="px-5 pb-5">
              <div className="relative -mt-12 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow">
                <Image src={hero.result} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <p className="mt-3 text-lg font-black text-slate-950">Sanne de Vries</p>
              <p className="text-sm font-medium text-slate-700">{t("Marketing coördinator · Utrecht", "Marketing coordinator · Utrecht")}</p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-[#0a66c2] px-3 py-1 text-xs font-bold text-white">{t("Connectie", "Connect")}</span>
                <span className="rounded-full border border-[#0a66c2] px-3 py-1 text-xs font-bold text-[#0a66c2]">{t("Bericht", "Message")}</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" aria-label={t("Voorbeeld cv met foto", "Example CV with photo")}>
            <div className="flex items-center gap-4 border-b-2 border-slate-900 pb-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-300">
                <Image src={hero.result} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-950">Sanne de Vries</p>
                <p className="text-sm font-semibold text-slate-600">{t("Marketing coördinator", "Marketing coordinator")}</p>
                <p className="mt-1 text-xs text-slate-500">sanne@voorbeeld.nl · 06 12345678 · Utrecht</p>
              </div>
            </div>
            {[t("Profiel", "Profile"), t("Werkervaring", "Work experience"), t("Opleiding", "Education")].map((h) => (
              <div key={h} className="mt-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">{h}</p>
                <div className="mt-2 space-y-1.5">
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="h-2 w-5/6 rounded bg-slate-200" />
                </div>
              </div>
            ))}
            <p className="mt-4 text-xs font-bold text-slate-600">{t("In WerkCV zet je je foto met één klik in je cv.", "In WerkCV you put your photo on your CV in one click.")}</p>
          </div>
        </div>
      </section>

      {/* 5. Comparison */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="text-3xl font-black text-slate-950">{t("Fotograaf, andere AI-diensten of WerkCV", "Photographer, other AI services or WerkCV")}</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-black bg-white">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-4 font-black text-slate-500" />
                <th className="bg-[#E9FFFC] p-4 font-black text-slate-950">WerkCV</th>
                <th className="p-4 font-black text-slate-900">{t("Fotograaf", "Photographer")}</th>
                <th className="p-4 font-black text-slate-900">{t("Andere AI-diensten", "Other AI services")}</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(([label, a, b, c]) => (
                <tr key={label} className="border-b border-slate-200 last:border-0">
                  <th className="p-4 font-black text-slate-900">{label}</th>
                  <td className="bg-[#E9FFFC] p-4 font-black text-slate-950">{c}</td>
                  <td className="p-4 font-medium text-slate-700">{a}</td>
                  <td className="p-4 font-medium text-slate-700">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs font-medium text-slate-500">
          {t(
            "Prijzen en levertijden zoals vermeld op de sites van fotostudio's en AI-diensten in oktober 2026. Een fotograaf blijft de beste keuze als je volledige controle wilt over locatie, licht en kleding.",
            "Prices and turnaround as listed on photo studio and AI service websites in October 2026. A photographer is still the best choice if you want full control over location, light and clothing.",
          )}
        </p>
      </section>

      {/* 6. Why 4 photos */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid gap-5 rounded-3xl border-4 border-black bg-[#FFD166] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:grid-cols-[1fr_1.2fr] md:items-center">
          <h2 className="text-2xl font-black leading-tight text-black">{t("Waarom 4 foto's en niet 40?", "Why 4 photos and not 40?")}</h2>
          <p className="text-sm font-bold leading-relaxed text-slate-900">
            {t(
              "Je hebt één goede foto nodig, niet een stapel om doorheen te zoeken. Je ziet je 4 voorbeelden voordat je betaalt, en met 2 gratis verfijningen pas je een detail aan. Zo betaal je alleen voor een foto die je echt gebruikt.",
              "You need one good photo, not a pile to sort through. You see your 4 previews before you pay, and 2 free refinements let you adjust a detail. So you only pay for a photo you will actually use.",
            )}
          </p>
        </div>
      </section>

      {/* 7. Style gallery + the tool */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="text-3xl font-black text-slate-950">{t("Kies een stijl die past bij je werk", "Pick a style that fits your work")}</h2>
        <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
          {t("Van strak LinkedIn tot warm en toegankelijk. Klik op een voorbeeld om het groter te zien.", "From clean LinkedIn to warm and approachable. Click an example to see it larger.")}
        </p>
        <div className="mt-6">{styleGallery}</div>
      </section>

      <section id="profielfoto-tool" className="scroll-mt-20 mx-auto max-w-6xl px-6 pb-12">
        {tool}
      </section>

      {/* 8. Privacy */}
      <section className="border-y-4 border-black bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-black">{t("Je foto, je privacy", "Your photo, your privacy")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {privacy.map((p) => (
              <article key={p.title} className="rounded-2xl border-2 border-white/20 bg-white/10 p-5">
                <h3 className="text-base font-black text-[#4ECDC4]">{p.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200">{p.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">
            {t("Meer in ons ", "More in our ")}
            <Link href={nl ? "/privacy" : "/en/privacy"} className="underline underline-offset-2">{t("privacybeleid", "privacy policy")}</Link>.
          </p>
        </div>
      </section>

      {seoContent}

      {/* 9. FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl font-black text-slate-950">{t("Veelgestelde vragen", "Frequently asked questions")}</h2>
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

      {/* 10. Final CTA with the results */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="overflow-hidden border-4 border-black bg-[#4ECDC4] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-5">
            {profilePhotoExamples.map((example) => (
              <div key={example.id} className="relative aspect-square border-b-4 border-black">
                <Image src={example.result} alt="" fill sizes="20vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="p-8 text-center">
            <h2 className="text-3xl font-black text-black">{t("Zie eerst je nieuwe profielfoto", "See your new profile photo first")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-slate-900">
              {t(`4 gratis voorbeelden, meestal binnen een minuut. Pas als je er een gebruikt, betaal je eenmalig ${price}.`, `4 free previews, usually within a minute. Only if you use one do you pay ${price} once.`)}
            </p>
            <Link href={toolHref} className="mt-6 inline-flex justify-center border-4 border-black bg-white px-6 py-3 text-base font-black text-black">
              {t("Maak gratis mijn voorbeelden", "Create my free previews")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
