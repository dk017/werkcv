import type { Metadata } from "next";
import Link from "next/link";
import { agencyPrivacyFacts } from "@/lib/agency-privacy-content";
import { JsonLd } from "@/components/seo/JsonLd";

const pageUrl = "https://werkcv.nl/en/agency/privacy";

export const metadata: Metadata = {
  title: "MatchPack privacy, retention and data processing | WerkCV",
  description: "How MatchPack handles source files, structured candidate data, evidence, revisions, retention, deletion and Agency access.",
  alternates: {
    canonical: pageUrl,
    languages: {
      nl: "https://werkcv.nl/agency/privacy",
      "nl-NL": "https://werkcv.nl/agency/privacy",
      en: pageUrl,
      "en-GB": pageUrl,
      "x-default": "https://werkcv.nl/agency/privacy",
    },
  },
  robots: { index: true, follow: true },
};

export default function EnglishAgencyPrivacyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "WerkCV", item: "https://werkcv.nl/en" },
      { "@type": "ListItem", position: 2, name: "MatchPack", item: "https://werkcv.nl/en/agency" },
      { "@type": "ListItem", position: 3, name: "Privacy and retention", item: pageUrl },
    ],
  };

  return (
    <>
      <main className="bg-[var(--wk-canvas)]">
        <section className="border-b border-[var(--wk-border)] bg-gradient-to-br from-[#fffef0] via-[#f8fbf7] to-[#eaf7f5]">
          <div className="wk-container py-16 sm:py-20">
            <p className="wk-eyebrow">MatchPack privacy</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">What is stored, for how long, and who remains responsible.</h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">This page describes the current MatchPack product. It is product information, not legal advice. Your agency remains the controller for candidate data and must establish its own lawful basis, candidate notice and client-sharing instructions.</p>
          </div>
        </section>

        <article className="wk-container wk-section max-w-5xl">
          <div className="grid gap-5 md:grid-cols-2">
            <section className="wk-card"><h2 className="text-2xl font-semibold">Source file handling</h2><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">An uploaded PDF or DOCX is used to extract text. The original file is not retained as a downloadable source. MatchPack stores the vacancy text, structured candidate data, contact-reduced version, analysis, evidence references, revisions and approval information needed for review.</p></section>
            <section className="wk-card"><h2 className="text-2xl font-semibold">Retention and deletion</h2><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">New Agency subscriptions use a {agencyPrivacyFacts.retention.defaultDays}-day content retention setting by default. The owner may select {agencyPrivacyFacts.retention.options.join(", ")} days in settings. Content expiry covers candidate data, vacancy text, evidence references, revisions and derived CV content. {agencyPrivacyFacts.retention.excludes} remain where required for administration and allowance auditing.</p></section>
            <section className="wk-card"><h2 className="text-2xl font-semibold">Contact-reduced is not anonymous</h2><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">The contact-reduced output clears known name and contact fields and removes recognisable contact-like text. Employers, schools, projects and rare combinations may still identify a person. Review both full and contact-reduced PDF/DOCX files before client sharing.</p></section>
            <section className="wk-card"><h2 className="text-2xl font-semibold">Roles and access</h2><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Owners manage settings, templates, team members and deletion. Editors create and change work. Reviewers inspect evidence and approve. Viewers have read access. Remove access promptly when a team relationship ends.</p></section>
          </div>

          <section id="subprocessors" className="mt-8 wk-card">
            <p className="wk-eyebrow">Current verification status</p>
            <h2 className="mt-4 text-2xl font-semibold">Processors and subprocessors</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Depending on deployment, MatchPack may use providers for AI processing, payments, login email and hosting/PostgreSQL. Legal entity, processing region, transfer mechanism and contract status must be checked against current provider contracts before live candidate use. WerkCV does not infer those facts from a hostname or environment variable.</p>
            <p className="wk-table-scroll-hint">Swipe horizontally to view all columns.</p>
            <div className="mt-5 overflow-x-auto rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)]">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[var(--wk-surface-subtle)]"><tr><th className="px-4 py-3 font-semibold">Category</th><th className="px-4 py-3 font-semibold">Purpose</th><th className="px-4 py-3 font-semibold">Verification status</th></tr></thead>
                <tbody>{agencyPrivacyFacts.processors.map((processor) => <tr key={processor.name} className="border-t border-[var(--wk-border)]"><td className="px-4 py-3 font-semibold">{processor.name}</td><td className="px-4 py-3 text-[var(--wk-ink-muted)]">{processor.purpose}</td><td className="px-4 py-3 text-[var(--wk-ink-muted)]">{processor.verificationStatus}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section id="dpa" className="mt-8 wk-card wk-card-warning">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-warning)]">DPA request</p>
            <h2 className="mt-3 text-2xl font-semibold">Review the current documents before live use.</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Current status: {agencyPrivacyFacts.dpa.status}. Request the current processor details and DPA through <a className="font-bold text-[var(--wk-primary)] underline" href="mailto:contact@werkcv.nl">contact@werkcv.nl</a>. Until the required information and contracts have been checked for your use case, use fictional or properly authorised CVs for testing.</p>
          </section>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--wk-border)] pt-6"><Link href="/en/agency" className="wk-button wk-button-secondary">← Back to MatchPack</Link><Link href="/en/agency/methodology/claim-evidence-benchmark" className="wk-button wk-button-quiet">Accuracy methodology →</Link></div>
        </article>
      </main>
      <JsonLd data={breadcrumbJsonLd} />
    </>
  );
}
