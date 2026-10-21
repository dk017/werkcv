import Link from "next/link";
import LinkedInPhotoCheck from "@/components/profile-photo/LinkedInPhotoCheck";
import { PhotoInsetCard } from "@/components/profile-photo/PhotoBeforeAfter";
import type { ProfilePhotoFaq } from "@/components/profile-photo/ProfilePhotoLanding";
import { profilePhotoExampleLabel, profilePhotoExamples } from "@/lib/profile-photo-examples";

type Locale = "nl" | "en";

/** Page body for the free LinkedIn photo check (NL /linkedin-foto-check, EN /en/linkedin-photo-check). */
export default function LinkedInPhotoCheckLanding({ locale, faq }: { locale: Locale; faq: ProfilePhotoFaq[] }) {
  const nl = locale === "nl";
  const t = (dutch: string, english: string) => (nl ? dutch : english);
  const rules = [
    { title: t("Gezicht vult ongeveer 60% van het beeld", "Face fills about 60% of the frame"), text: t("Hoofd en schouders in beeld. LinkedIn toont je foto als kleine cirkel, dus een foto van ver weg wordt een stip.", "Head and shoulders. LinkedIn shows your photo as a small circle, so a distant shot becomes a dot.") },
    { title: t("Rustige achtergrond", "Calm background"), text: t("Een lichte muur of een onscherpe achtergrond. Geen keuken, auto of drukke straat.", "A light wall or a blurred background. No kitchen, car or busy street.") },
    { title: t("Goed licht van voren", "Good light from the front"), text: t("Daglicht van een raam vóór je werkt het best. Vermijd een lamp recht boven je of tegenlicht.", "Daylight from a window in front of you works best. Avoid a lamp right above you or backlight.") },
    { title: t("Recent en herkenbaar", "Recent and recognisable"), text: t("Recruiters willen je herkennen bij een gesprek. Vernieuw je foto als je er duidelijk anders uitziet.", "Recruiters want to recognise you at the interview. Update your photo when you look clearly different.") },
    { title: t("Minstens 400 × 400 pixels", "At least 400 × 400 pixels"), text: t("LinkedIn raadt 400 × 400 pixels aan en accepteert foto's tot 8 MB (JPG of PNG).", "LinkedIn recommends 400 × 400 pixels and accepts photos up to 8 MB (JPG or PNG).") },
  ];

  return (
    <main>
      <section className="border-b-4 border-black bg-[radial-gradient(circle_at_top_left,#E9FFFC_0,#FFFEF9_45%,#FFF4D8_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <span className="inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-900">
            {t("Gratis tool · zonder account", "Free tool · no account")}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            {t("Gratis LinkedIn-foto check: hoe scoort jouw profielfoto?", "Free LinkedIn photo check: how does your profile photo score?")}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
            {t(
              "Upload je huidige LinkedIn-foto en krijg binnen een paar seconden een score van 0 tot 100, met per punt een concrete tip: uitsnede, licht, achtergrond, scherpte en meer.",
              "Upload your current LinkedIn photo and get a score from 0 to 100 within seconds, with a concrete tip per point: framing, light, background, sharpness and more.",
            )}
          </p>
          <div className="mt-8">
            <LinkedInPhotoCheck locale={locale} source={nl ? "linkedin_foto_check" : "en_linkedin_photo_check"} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl font-black text-slate-950">{t("Wat maakt een goede LinkedIn-foto?", "What makes a good LinkedIn photo?")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rules.map((r) => (
            <article key={r.title} className="rounded-2xl border-2 border-black bg-white p-5">
              <h3 className="text-lg font-black text-slate-950">{r.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-black text-slate-950">{t("Lage score? Zo ziet je selfie eruit als profielfoto", "Low score? This is your selfie as a profile photo")}</h2>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            {t(
              "Met de WerkCV AI-profielfoto maak je van een gewone foto een professionele versie. Je ziet eerst gratis 4 voorbeelden.",
              "The WerkCV AI profile photo turns a regular photo into a professional version. You see 4 previews for free first.",
            )}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {profilePhotoExamples.map((example) => (
              <PhotoInsetCard key={example.id} example={example} locale={locale} />
            ))}
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-500">{profilePhotoExampleLabel[locale]}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={`${nl ? "/profielfoto-cv-maken" : "/en/profile-photo"}?bron=${nl ? "linkedin_foto_check_page" : "en_linkedin_photo_check_page"}`} className="inline-flex justify-center border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {t("Maak gratis mijn voorbeelden", "Create my free previews")}
            </Link>
            {nl ? (
              <Link href="/linkedin-foto-maken" className="inline-flex justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black">
                Zo maak je een goede LinkedIn-foto
              </Link>
            ) : null}
          </div>
        </div>
      </section>

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
    </main>
  );
}
