import type { Metadata } from "next";
import EvidenceComparisonArticle from "@/components/seo/EvidenceComparisonArticle";
import { buildEnglishMetadata } from "@/app/en/metadata";
import { cvDownloadPrice } from "@/lib/site-content";
import { consumerComparisonPrice, comparisonEvidenceLabel, getComparisonEvidence } from "@/lib/comparisons/evidence";

export const revalidate = 86400;

const path = "/en/guides/cv-builders-netherlands-compared" as const;
const pageDescription = "Compare CV builders for English-speaking applicants in the Netherlands. Check free routes, one-time downloads, subscriptions, imports, previews and PDF output before you pay.";

export const metadata: Metadata = buildEnglishMetadata({
  title: "CV Builders for Jobs in the Netherlands Compared",
  description: pageDescription,
  path,
  keywords: ["cv builder netherlands", "english cv builder netherlands", "resume builder netherlands", "cv download without subscription", "cv maker comparison"],
  type: "article",
});

const rows = [
  {
    product: "WerkCV",
    bestFor: "An English CV route with Netherlands-focused structure.",
    price: `Build and preview free; ${cvDownloadPrice.displayEn} one time for this CV's PDF.`,
    output: "Template preview, editor and PDF download; the same paid CV can be edited again.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("werkcv-consumer-price-2026-09").status, "en")}.`,
    href: "/en/pricing",
  },
  {
    product: "YoungCapital",
    bestFor: "Applicants exploring a free CV route.",
    price: consumerComparisonPrice("youngcapital", "en"),
    output: "The provider documents free CV creation and PDF download.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("youngcapital-free-route-2026-09").status, "en")}.`,
  },
  {
    product: "Europass",
    bestFor: "A recognisable European CV format.",
    price: "Check current conditions on Europass.",
    output: "Official Europass CV route; a standard format is not required for every Dutch vacancy.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("europass-create-cv-2026-09").status, "en")}.`,
  },
  {
    product: "Canva",
    bestFor: "More visual design control.",
    price: consumerComparisonPrice("canva", "en"),
    output: "Design-led templates; check text selection and document readability before sending.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("canva-free-route-2026-09").status, "en")}.`,
  },
  {
    product: "FlowCV",
    bestFor: "A free online builder starting point.",
    price: "A free offer is documented; plan and export limits can change.",
    output: "Online resume builder; test the desired template and file yourself.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("flowcv-free-offer-2026-09").status, "en")}.`,
  },
  {
    product: "CVMaker",
    bestFor: "A separate provider with its own templates and pricing route.",
    price: consumerComparisonPrice("cvmaker", "en"),
    output: "Check current templates, import and export on the official route.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("cvmaker-terms-2026-09").status, "en")}.`,
  },
];

const faqs = [
  { question: "Which CV builder is best for an English-speaking applicant in the Netherlands?", answer: "It depends on your vacancy, language, document and payment needs. This guide compares tasks and evidence; it does not declare a universal winner." },
  { question: "Can I download a CV without a subscription?", answer: `Some routes are free and WerkCV uses a one-time ${cvDownloadPrice.displayEn} payment for the PDF of one CV. Check what the provider means by free and whether export or renewal conditions apply.` },
  { question: "Should I use an English or Dutch CV?", answer: "Use the language that fits the vacancy and your evidence. An English CV can be appropriate for an English-speaking role; do not claim Dutch fluency you do not have." },
  { question: "Does a visual template work with an ATS?", answer: "Not automatically. Check text selection, columns, images, reading order and the final PDF. A good-looking preview alone does not prove software readability." },
  { question: "How current are the comparison details?", answer: "Each row displays whether the point is provider-documented, observed in a test or not verified. Recheck official pricing and features before payment because they can change." },
];

export default function EnglishCvBuildersNetherlandsComparedPage() {
  return (
    <EvidenceComparisonArticle
      locale="en"
      path={path}
      breadcrumbs={[{ label: "Home", href: "/en" }, { label: "English CV guides", href: "/en/guides" }, { label: "CV builders compared", href: path }]}
      eyebrow="A practical Netherlands comparison"
      title="CV builders for jobs in the Netherlands compared"
      description={pageDescription}
      reviewedLabel="Last checked: 10 September 2026"
      modifiedDate="2026-09-10"
      rows={rows}
      cardsTitle="Choose the route that matches your situation"
      cards={[
        { title: "One application, no subscription", body: `Compare the total download price and renewal terms. WerkCV lets you build and preview free, then charges ${cvDownloadPrice.displayEn} once for the PDF of that CV.` },
        { title: "Spend nothing if possible", body: "A free route may be enough. Confirm that the desired template and export are genuinely available without a paid step." },
        { title: "Apply in English", body: "Choose a builder and template that let you explain experience clearly in English while keeping the document appropriate for the Netherlands." },
        { title: "Import an existing CV", body: "Ask how sections, dates, links and optional fields are preserved. Do not assume a polished preview contains everything from your source." },
        { title: "More visual control", body: "Design-led tools can help a creative profile, but inspect text extraction and reading order before sending to an employer." },
        { title: "Manage documents over time", body: "A subscription can fit sustained job searching and multiple documents. Compare recurring cost with how long you actually need the service." },
      ]}
      methodTitle="How to read this comparison"
      method={[
        "The shortlist represents common applicant decisions: free route, standard format, visual control, existing-CV import and one-time download.",
        "A claim is labelled observed only when the same fictional input and task are recorded in an authorised test; this first version does not contain hands-on tests for every provider.",
        "Provider documentation supports what the provider says, not an independent conclusion that it is the best product.",
        "This page does not promise ATS acceptance, interviews, hiring outcomes or a ranking of tools.",
      ]}
      sources={[
        { label: "CVMaker", href: getComparisonEvidence("cvmaker-terms-2026-09").sourceUrl!, note: "Official download and subscription terms." },
        { label: "WerkCV English pricing", href: "/en/pricing", note: "Current English explanation of building, preview and one-time PDF pricing." },
        { label: "YoungCapital CV guidance", href: "https://www.youngcapital.nl/sollicitatietips/cv/gratis-cv-maken", note: "Provider source for the free CV route; verify the current export route." },
        { label: "Europass: Create your CV", href: "https://europass.europa.eu/en/create-europass-cv", note: "Official information about the Europass CV route." },
        { label: "Canva resume maker", href: "https://www.canva.com/create/resumes/", note: "Provider source for a design-oriented CV route." },
        { label: "FlowCV", href: "https://flowcv.com/", note: "Provider source describing a free online resume-builder offer." },
      ]}
      faqs={faqs}
      primaryCta={{ href: "/en/editor?template=professional&startSource=en_cv_builder_comparison", label: "Start my English CV free", trackingLocation: "en_cv_builder_comparison_hero" }}
      secondaryCta={{ href: "/en/templates?startSource=en_cv_builder_comparison", label: "Browse English templates" }}
      relatedLinks={[
        { href: "/en/dutch-cv-template", label: "Dutch-style CV template in English", body: "See local structure, sections and language choices." },
        { href: "/en/expat-cv-netherlands", label: "Expat CV Netherlands", body: "Start with the wider decision about language, work route and personal details." },
        { href: "/en/guides/one-page-cv-netherlands", label: "One-page or two-page CV", body: "Choose length based on evidence instead of forcing every profile to one page." },
        { href: "/en/pricing", label: "English pricing", body: "Read exactly what is free, what triggers payment and what one-time means." },
      ]}
      disclosure="WerkCV publishes this comparison and sells its own CV builder. We include free alternatives, limitations and unverified points. Check official terms before paying; this is not an independent certification."
    />
  );
}
