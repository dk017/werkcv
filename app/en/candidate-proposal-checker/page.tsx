import type { Metadata } from "next";
import Link from "next/link";
import CandidateProposalEvidenceChecker from "@/components/agency/CandidateProposalEvidenceChecker";
import ProposalClaimVerifier from "@/components/agency/ProposalClaimVerifier";
import CandidateProposalEvidenceGuide from "@/components/agency/CandidateProposalEvidenceGuide";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLanguageAlternates } from "@/lib/i18n/route-pairs";
import { proposalClaimVerifierEnabled } from "@/lib/agency-feature-flags";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
import { AGENCY_CONTENT_MODIFIED, AGENCY_CONTENT_PUBLISHED } from "@/lib/agency-content";

const pageUrl = "https://werkcv.nl/en/candidate-proposal-checker";
const route = getAgencyAcquisitionRoute("/en/candidate-proposal-checker")!;
const title = route.title;
const description = route.description;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "candidate proposal checker",
    "candidate presentation evidence",
    "candidate submission checklist",
    "resume evidence against job requirements",
    "recruitment agency tool",
    "candidate profile review",
  ],
  alternates: {
    canonical: pageUrl,
    languages: getLanguageAlternates("/en/candidate-proposal-checker") ?? undefined,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "WerkCV",
    locale: "en_GB",
    type: "website",
  },
};

export default async function CandidateProposalCheckerEnglishPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const enabled = proposalClaimVerifierEnabled();
  const candidateAcknowledgementEnabled = getAgencyPublicCapabilities().candidateAcknowledgement;
  const mode = (await searchParams).mode;
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WerkCV Candidate Proposal Evidence Checker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: pageUrl,
    inLanguage: "en",
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
    inLanguage: "en",
    datePublished: AGENCY_CONTENT_PUBLISHED,
    dateModified: AGENCY_CONTENT_MODIFIED,
    isPartOf: { "@id": "https://werkcv.nl/#website" },
    about: ["candidate proposal", "recruitment", "resume evidence", "vacancy requirements"],
  };

  return (
    <>
      {enabled && mode !== "requirements" ? <ProposalClaimVerifier locale="en" candidateAcknowledgementEnabled={candidateAcknowledgementEnabled} /> : <CandidateProposalEvidenceChecker locale="en" claimVerifierEnabled={enabled && mode !== "requirements"} />}
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/en" }, { label: "Candidate proposal checker", href: "/en/candidate-proposal-checker" }]} />
      </section>
      <CandidateProposalEvidenceGuide locale="en" />
      <section className="wk-section bg-[var(--wk-surface)]"><div className="wk-container"><div className="rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)] p-6 shadow-[var(--wk-shadow-md)] sm:p-8"><p className="wk-eyebrow">From free check to controlled workflow</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em]">Want one controlled source for the introduction, CV and email?</h2><p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Review the fictional MatchPack example to see what stays internal, what the client receives and what the recruiter must resolve before approval.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/en/agency#sample" className="wk-button wk-button-primary">View the example</Link><Link href="/en/agency" className="wk-button wk-button-secondary">See MatchPack</Link></div></div></div></section>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={webPageSchema} />
    </>
  );
}
