import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CandidateProposalEvidenceChecker from "@/components/agency/CandidateProposalEvidenceChecker";
import ProposalClaimVerifier from "@/components/agency/ProposalClaimVerifier";
import CandidateProposalEvidenceGuide from "@/components/agency/CandidateProposalEvidenceGuide";
import { BrandShell } from "@/components/brand/BrandShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLanguageAlternates } from "@/lib/i18n/route-pairs";
import { proposalClaimVerifierEnabled } from "@/lib/agency-feature-flags";

const pageUrl = "https://werkcv.nl/en/candidate-proposal-checker";
const title = "Free candidate proposal evidence checker for recruitment agencies | WerkCV";
const description = "Check which vacancy requirements are supported by concrete CV evidence. See source lines, open points and recruiter actions before sending a candidate proposal to a client.";

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
    featureList: [
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
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
    isPartOf: { "@id": "https://werkcv.nl/#website" },
    about: ["candidate proposal", "recruitment", "resume evidence", "vacancy requirements"],
  };

  return (
    <BrandShell>
      {enabled && mode !== "requirements" ? <ProposalClaimVerifier locale="en" /> : <CandidateProposalEvidenceChecker locale="en" claimVerifierEnabled={enabled} />}
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/en" }, { label: "Candidate proposal checker", href: "/en/candidate-proposal-checker" }]} />
      </section>
      <CandidateProposalEvidenceGuide locale="en" />
      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-6 sm:pb-16"><div className="border-2 border-slate-950 bg-yellow-300 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] sm:p-8"><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">From free check to agency workflow</p><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight">Want one controlled source for the introduction, CV and email?</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-800">Review the complete fictional MatchPack example to see what stays internal, what the client receives and what the recruiter must correct before approval.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/agency#voorbeeld" className="border-2 border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white">View the example</Link><Link href="/agency" className="border-2 border-slate-950 bg-white px-4 py-3 text-sm font-black">See MatchPack</Link></div></div></section>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={webPageSchema} />
      <Footer variant="brand" />
    </BrandShell>
  );
}
