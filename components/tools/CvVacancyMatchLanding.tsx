import Link from "next/link";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CvVacatureMatchTool from "@/app/tools/cv-vacature-match/CvVacatureMatchTool";
import type { CvMatchLocale } from "@/lib/tools/cv-vacature-match";

type CvVacancyMatchLandingProps = {
  locale: CvMatchLocale;
};

export default function CvVacancyMatchLanding({
  locale,
}: CvVacancyMatchLandingProps) {
  const isEnglish = locale === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const toolsHref = isEnglish ? "/en/dutch-cv-checker" : "/tools";

  const content = isEnglish
    ? {
        badge: "Free vacancy-fit check",
        title: "Will your CV make your fit clear for this vacancy?",
        intro:
          "Compare the evidence in your CV with one real vacancy. See how your role and seniority come across, which requirements are supported and which three changes deserve attention first.",
        trust: [
          "No account needed for the assessment",
          "Evidence from your CV and vacancy, not a generic score",
          "Continue with the same content in the English editor",
        ],
        toolTitle: "Compare your CV with a vacancy",
        toolBody:
          "Use the complete CV and vacancy. The result checks content and evidence; it does not guarantee an employer or ATS decision.",
        howTitle: "What the assessment checks",
        howItems: [
          ["Positioning", "What role and seniority a recruiter may understand from the CV."],
          ["Evidence", "Whether claims are supported with relevant responsibilities, outcomes and examples."],
          ["Requirements", "Which explicit vacancy requirements are strongly, partly or not yet demonstrated."],
          ["Next action", "Three prioritized changes that can be carried into WerkCV after login."],
        ],
        privacyTitle: "Your CV stays out of analytics",
        privacyBody:
          "The CV and vacancy are sent to the analysis endpoint, but their contents are not written to WerkCV analytics. If you continue, the text is held temporarily in this browser tab and removed after a successful editor import.",
        related: "Need a general Dutch-market CV check without a vacancy?",
        relatedLink: "Use the Dutch CV checker",
      }
    : {
        badge: "Gratis vacaturematch",
        title: "Laat je CV duidelijk genoeg zien waarom jij bij deze vacature past?",
        intro:
          "Vergelijk het bewijs in je CV met één echte vacature. Zie welke functie en senioriteit je uitstraalt, welke eisen zijn onderbouwd en welke drie aanpassingen als eerste aandacht verdienen.",
        trust: [
          "Geen account nodig voor de analyse",
          "Bewijs uit je CV en vacature, geen willekeurige score",
          "Ga met dezelfde inhoud verder in de editor",
        ],
        toolTitle: "Vergelijk je CV met een vacature",
        toolBody:
          "Gebruik het volledige CV en de volledige vacature. De uitslag controleert inhoud en bewijs, maar garandeert geen beslissing van een werkgever of ATS.",
        howTitle: "Wat de analyse controleert",
        howItems: [
          ["Positionering", "Welke functie en senioriteit een recruiter waarschijnlijk uit je CV haalt."],
          ["Bewijs", "Of uitspraken worden ondersteund met relevante taken, resultaten en voorbeelden."],
          ["Functie-eisen", "Welke expliciete eisen sterk, gedeeltelijk of nog niet zijn aangetoond."],
          ["Vervolgactie", "Drie prioriteiten die na login direct meegaan naar de WerkCV-editor."],
        ],
        privacyTitle: "De inhoud van je CV komt niet in analytics",
        privacyBody:
          "Het CV en de vacature gaan naar de analyse-endpoint, maar de inhoud wordt niet in WerkCV-analytics opgeslagen. Als je doorgaat, blijft de tekst tijdelijk in dit browsertabblad en wordt die na een geslaagde editorimport verwijderd.",
        related: "Wil je je CV algemeen controleren zonder specifieke vacature?",
        relatedLink: "Gebruik de ATS CV checker",
      };

  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <header className="border-b-2 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <Link href={homeHref} className="text-2xl font-black tracking-tight text-black">
            Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
          </Link>
          <div className="flex items-center gap-3">
            <Link href={toolsHref} className="text-sm font-bold text-slate-600 hover:text-black">
              {isEnglish ? "General CV check" : "Alle tools"}
            </Link>
            <LanguageSwitcher tone="solid" />
          </div>
        </div>
      </header>

      <main>
        <section className="border-b-2 border-black bg-[#E9FFFC]">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
            <span className="inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em]">
              {content.badge}
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-black sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              {content.intro}
            </p>
            <ul className="mt-6 grid max-w-5xl gap-3 md:grid-cols-3">
              {content.trust.map((item) => (
                <li key={item} className="flex gap-2 border border-teal-300 bg-white px-4 py-3 text-sm font-bold text-slate-800">
                  <span className="text-teal-700">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-950">{content.toolTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              {content.toolBody}
            </p>
          </div>
          <div className="border-2 border-black bg-white p-5 shadow-[5px_5px_0_0_#000] sm:p-7">
            <CvVacatureMatchTool locale={locale} />
          </div>
        </section>

        <section className="border-y-2 border-black bg-white">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
            <h2 className="text-2xl font-black text-slate-950">{content.howTitle}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {content.howItems.map(([title, body]) => (
                <article key={title} className="border-l-4 border-teal-500 pl-4">
                  <h3 className="font-black text-slate-950">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
          <div className="max-w-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-black text-slate-950">{content.privacyTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{content.privacyBody}</p>
          </div>
          <p className="mt-6 text-sm font-semibold text-slate-600">
            {content.related}{" "}
            <Link
              href={isEnglish ? "/en/dutch-cv-checker" : "/tools/ats-cv-checker"}
              className="font-black text-slate-950 underline decoration-2 underline-offset-4"
            >
              {content.relatedLink}
            </Link>
          </p>
        </section>
      </main>

      <Footer uiLanguage={locale} />
    </div>
  );
}
