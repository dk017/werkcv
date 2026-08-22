import Link from "next/link";
import { cvDownloadPrice } from "@/lib/site-content";

type MoneyPageTrustBlockProps = {
  title?: string;
  intro?: string;
};

const trustItems = [
  {
    title: "Gratis bouwen",
    body: "Vul je cv eerst volledig in, vergelijk templates en betaal pas als je de PDF wilt downloaden.",
  },
  {
    title: `Eenmalig ${cvDownloadPrice.display}`,
    body: "Geen proefperiode, automatische verlenging of maandelijkse kosten voor individuele cv-downloads.",
  },
  {
    title: "Recruiter-proof output",
    body: "Rustige Nederlandse templates, duidelijke secties en ATS-vriendelijke PDF-export.",
  },
];

export default function MoneyPageTrustBlock({
  title = "Waarom mensen voor WerkCV kiezen",
  intro = "De meeste bezoekers willen niet meer uitleg, maar zekerheid: kan ik eerst serieus bouwen, wanneer betaal ik, en krijg ik een nette PDF zonder abonnement?",
}: MoneyPageTrustBlockProps) {
  return (
    <section className="wk-section pt-0">
      <div className="wk-container">
        <div className="wk-card p-6 md:p-8">
          <div className="wk-eyebrow mb-3">
            <span>Vertrouwen voor je start</span>
          </div>
          <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--wk-ink-muted)] md:text-base">
            {intro}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {trustItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-5"
              >
                <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/editor" className="wk-button wk-button-primary">
              Maak gratis je cv
            </Link>
            <Link href="/prijzen" className="wk-button wk-button-secondary">
              Bekijk prijsmodel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
