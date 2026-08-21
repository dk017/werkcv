import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CandidateProposalEvidenceChecker from "@/components/agency/CandidateProposalEvidenceChecker";
import CandidateProposalEvidenceGuide from "@/components/agency/CandidateProposalEvidenceGuide";
import { BrandShell } from "@/components/brand/BrandShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLanguageAlternates } from "@/lib/i18n/route-pairs";

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

export default function CandidateProposalCheckerPage() {
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
    inLanguage: "nl-NL",
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
    isPartOf: { "@id": "https://werkcv.nl/#website" },
    about: ["kandidaatvoorstel", "recruitment", "CV-bewijs", "vacature-eisen"],
  };

  return (
    <BrandShell>
      <CandidateProposalEvidenceChecker locale="nl" />
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Voor bureaus", href: "/voor-bureaus" }, { label: "Kandidaatvoorstel checker", href: "/tools/kandidaatvoorstel-checker" }]} />
      </section>
      <CandidateProposalEvidenceGuide locale="nl" />
      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-6 sm:pb-16"><div className="border-2 border-slate-950 bg-yellow-300 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] sm:p-8"><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">Van gratis check naar bureauworkflow</p><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight">Wilt u één gecontroleerde bron gebruiken voor introductie, CV en e-mail?</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-800">Bekijk het complete fictieve MatchPack-voorbeeld. Daar ziet u wat intern blijft, wat de klant ontvangt en waar de recruiter vóór goedkeuring moet corrigeren.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/agency#voorbeeld" className="border-2 border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white">Bekijk het voorbeeld</Link><Link href="/voor-bureaus" className="border-2 border-slate-950 bg-white px-4 py-3 text-sm font-black">Lees voor bureaus</Link></div></div></section>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={webPageSchema} />
      <Footer variant="brand" />
    </BrandShell>
  );
}
