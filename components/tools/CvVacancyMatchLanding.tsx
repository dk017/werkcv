import Link from "next/link";
import Footer from "@/components/Footer";
import CvVacatureMatchTool from "@/app/tools/cv-vacature-match/CvVacatureMatchTool";
import type { CvMatchLocale } from "@/lib/tools/cv-vacature-match";

type CvVacancyMatchLandingProps = {
  locale: CvMatchLocale;
};

export default function CvVacancyMatchLanding({
  locale,
}: CvVacancyMatchLandingProps) {
  const isEnglish = locale === "en";
  const toolsHref = isEnglish ? "/en/dutch-cv-checker" : "/tools";

  const content = isEnglish
    ? {
        badge: "Free vacancy-fit check",
        title: ["Will your CV make your ", "fit clear", " for this vacancy?"],
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
        title: ["Laat je CV duidelijk genoeg zien waarom jij bij deze ", "vacature past", "?"],
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
    <main>
      <section className="wk-section">
        <div className="wk-container">
          <span className="wk-badge wk-badge-accent mb-4">{content.badge}</span>
          <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl md:text-5xl">
            {content.title[0]}
            <span className="wk-hero-highlight">{content.title[1]}</span>
            {content.title[2]}
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[var(--wk-ink-muted)]">
            {content.intro}
          </p>
          <ul className="mt-6 grid max-w-5xl gap-3 md:grid-cols-3">
            {content.trust.map((item) => (
              <li
                key={item}
                className="flex gap-2 rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-4 py-3 text-sm font-medium leading-6 text-[var(--wk-ink)]"
              >
                <span className="text-[var(--wk-success)]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.toolTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
              {content.toolBody}
            </p>
          </div>
          <div className="wk-card p-5 sm:p-7">
            <CvVacatureMatchTool locale={locale} />
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.howTitle}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {content.howItems.map(([title, body]) => (
              <article
                key={title}
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] border-l-4 border-l-[var(--wk-accent)] bg-[var(--wk-surface)] pl-4 pr-4 py-4"
              >
                <h3 className="font-semibold text-[var(--wk-ink)]">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="max-w-3xl rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-5">
            <h2 className="text-lg font-semibold text-[var(--wk-ink)]">{content.privacyTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{content.privacyBody}</p>
          </div>
          <p className="mt-6 text-sm text-[var(--wk-ink-muted)]">
            {content.related}{" "}
            <Link
              href={isEnglish ? "/en/dutch-cv-checker" : "/tools/ats-cv-checker"}
              className="font-semibold text-[var(--wk-primary)] underline underline-offset-4"
            >
              {content.relatedLink}
            </Link>
            {" "}·{" "}
            <Link
              href={toolsHref}
              className="font-semibold text-[var(--wk-primary)] underline underline-offset-4"
            >
              {isEnglish ? "General CV check" : "Alle tools"}
            </Link>
          </p>
        </div>
      </section>

      <Footer variant="brand" uiLanguage={locale} />
    </main>
  );
}
