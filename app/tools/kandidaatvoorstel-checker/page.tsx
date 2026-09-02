import type { Metadata } from "next";
import Link from "next/link";
import CandidateProposalEvidenceChecker from "@/components/agency/CandidateProposalEvidenceChecker";
import ProposalClaimVerifier from "@/components/agency/ProposalClaimVerifier";
import CandidateProposalEvidenceGuide from "@/components/agency/CandidateProposalEvidenceGuide";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLanguageAlternates } from "@/lib/i18n/route-pairs";
import { proposalClaimVerifierEnabled } from "@/lib/agency-feature-flags";

const pageUrl = "https://werkcv.nl/tools/kandidaatvoorstel-checker";
const title = "Gratis kandidaatvoorstel checker voor recruitmentbureaus | WerkCV";
const description = "Controleer gratis welke vacature-eisen door concreet CV-bewijs worden ondersteund. Zie bronregels, open punten en recruiter-acties vóór u een kandidaatvoorstel naar de klant stuurt.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "kandidaatvoorstel checker",
    "kandidaat voorstellen aan klant",
    "cv matchen met vacature recruiter",
    "cv bewijs vacature-eisen",
    "kandidaatprofiel controleren",
    "recruitment agency tool",
  ],
  alternates: {
    canonical: pageUrl,
    languages: getLanguageAlternates("/tools/kandidaatvoorstel-checker") ?? undefined,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
  },
};

export default async function CandidateProposalCheckerPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const enabled = proposalClaimVerifierEnabled();
  const mode = (await searchParams).mode;
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WerkCV Candidate Proposal Evidence Checker",
    alternateName: "WerkCV kandidaatvoorstel checker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: pageUrl,
    inLanguage: "nl-NL",
    isAccessibleForFree: true,
    description,
    featureList: enabled && mode !== "requirements" ? [
      "Atomic proposal claim extraction",
      "Exact CV source-span resolution",
      "Unsupported and contradictory claim review",
      "Candidate-confirmation prompts for changing facts",
    ] : [
      "Vacancy requirement extraction",
      "CV source-line matching",
      "Visible missing evidence",
      "Recruiter review guidance",
    ],
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl,
    inLanguage: "nl-NL",
    datePublished: "2026-08-20",
    dateModified: "2026-09-01",
    isPartOf: { "@id": "https://werkcv.nl/#website" },
    about: ["kandidaatvoorstel", "recruitment", "CV-bewijs", "vacature-eisen"],
  };

  return (
    <>
      {enabled && mode !== "requirements" ? <ProposalClaimVerifier locale="nl" /> : <CandidateProposalEvidenceChecker locale="nl" claimVerifierEnabled={enabled} />}
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Voor bureaus", href: "/voor-bureaus" }, { label: "Kandidaatvoorstel checker", href: "/tools/kandidaatvoorstel-checker" }]} />
      </section>
      <CandidateProposalEvidenceGuide locale="nl" />
      <section className="wk-section bg-[var(--wk-surface)]"><div className="wk-container"><div className="rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)] p-6 shadow-[var(--wk-shadow-md)] sm:p-8"><p className="wk-eyebrow">Van gratis check naar bureauworkflow</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em]">Wilt u één gecontroleerde bron gebruiken voor introductie, CV en e-mail?</h2><p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Bekijk het complete fictieve MatchPack-voorbeeld. Daar ziet u wat intern blijft, wat de klant ontvangt en waar de recruiter vóór goedkeuring moet corrigeren.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/agency#voorbeeld" className="wk-button wk-button-primary">Bekijk het voorbeeld</Link><Link href="/voor-bureaus" className="wk-button wk-button-secondary">Lees voor bureaus</Link></div></div></div></section>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={webPageSchema} />
    </>
  );
}
