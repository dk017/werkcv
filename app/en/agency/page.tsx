import type { Metadata } from "next";
import { getAgencySoftwareJsonLd } from "@/lib/product-discovery";
import AgencyEvidencePreview from "@/components/agency/AgencyEvidencePreview";
import AgencyPurchaseNotes from "@/components/agency/AgencyPurchaseNotes";
import { getAgencyReviewScopeNotice, AGENCY_WORKSPACE_LANGUAGE_NOTICE } from "@/lib/agency-review-scope";
import { getAgencyStorageDescription } from "@/lib/agency-privacy-content";
import { getAgencyEvidenceSample } from "@/lib/agency-evidence-sample";
import Link from "next/link";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import AgencyCommercialAnalytics from "@/components/agency/AgencyCommercialAnalytics";
import { FAQJsonLd, JsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { isAgencyDodoConfigured } from "@/lib/dodo";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
import { getAgencyPublicMessaging } from "@/lib/agency-public-messaging";
import { AGENCY_CURRENCY, AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyFullUseUnitPriceDisplay, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";

const route = getAgencyAcquisitionRoute("/en/agency")!;
const pageUrl = `https://werkcv.nl${route.path}`;
const capabilities = getAgencyPublicCapabilities();
const messaging = getAgencyPublicMessaging({ locale: "en", capabilities });
const monthlyPrice = getAgencyMonthlyPriceDisplay("en");

export const metadata: Metadata = {
  title: messaging.title,
  description: messaging.description,
  keywords: [
    "candidate submission software",
    "candidate presentation software",
    "candidate proposal evidence",
    "recruitment agency candidate submission",
    "branded candidate CV",
    "candidate proposal checker",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      nl: "https://werkcv.nl/agency",
      "nl-NL": "https://werkcv.nl/agency",
      en: pageUrl,
      "en-GB": pageUrl,
      "x-default": "https://werkcv.nl/agency",
    },
  },
  openGraph: {
    title: messaging.title,
    description: messaging.description,
    url: pageUrl,
    siteName: "WerkCV",
    locale: "en_GB",
    type: "website",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const faqItems = [
  { question: "Is the workspace in English?", answer: AGENCY_WORKSPACE_LANGUAGE_NOTICE },
  {
    question: "Does MatchPack replace our ATS?",
    answer: "No. MatchPack is a pre-send quality-control layer for candidate submissions. Use your ATS for sourcing and pipeline management; use MatchPack to review the evidence and control the version sent to a client. CSV remains the current import and export route.",
  },
  {
    question: "Does WerkCV verify that a candidate is telling the truth?",
    answer: messaging.faqAnswer,
  },
  {
    question: "What will candidate acknowledgement establish when enabled?",
    answer: "The activation-gated workflow records whether the candidate confirmed, corrected or declined the exact displayed version for a named receiving organisation. It is not identity proof, consent, a legal signature or right-to-represent. WerkCV does not present this feature as live until its production gates pass.",
  },
  {
    question: `What is included in the ${monthlyPrice} tier?`,
    answer: `The MatchPack subscription includes ${AGENCY_MONTHLY_CREDIT_LIMIT} shared CV credits per billing period. One credit covers a new standalone Agency CV or the first definitive approval of a MatchPack. Editing and repeat downloads do not use another credit. Billing is in ${AGENCY_CURRENCY}.`,
  },
  {
    question: "Can we export Word documents?",
    answer: "Yes. Approved MatchPacks can produce PDF and DOCX outputs from the same approved version, including a full or contact-reduced CV version.",
  },
  {
    question: "How is candidate data handled?",
    answer: getAgencyStorageDescription("en"),
  },
  {
    question: "Can we cancel the subscription?",
    answer: "Yes. Cancellation stops renewal; access continues until the end of the paid billing period. Retention and deletion remain controlled from Agency settings.",
  },
];

function CheckoutAction({ location, variant = "primary" }: { location: string; variant?: "primary" | "secondary" }) {
  const className = variant === "primary" ? "wk-button wk-button-primary min-h-12 px-6 text-base" : "wk-button wk-button-secondary min-h-12 px-6 text-base";
  if (!isAgencyDodoConfigured()) {
    return (
      <div><Link href="/agency/account?locale=en" className={className}>Open MatchPack (Dutch workspace)</Link><AgencyPurchaseNotes locale="en" /></div>
    );
  }

  return (
    <AgencyCheckoutButton
      locale="en"
      location={location}
      label={`Start MatchPack · ${monthlyPrice}`}
      className={className}
    />
  );
}

export default function EnglishAgencyPage() {
  const acknowledgementEnabled = capabilities.candidateAcknowledgement;
  const verifierEnabled = messaging.mode === "proposal_claim_verification";
  const workflow = messaging.workflow.map((step) => ({
    ...step,
    tone: {
      highlight: "bg-[var(--wk-highlight-soft)]",
      accent: "bg-[var(--wk-accent-soft)]",
      info: "bg-[var(--wk-info-soft)]",
      success: "bg-[var(--wk-success-soft)]",
    }[step.tone],
  }));
  const effectiveFaqItems = faqItems
    .filter((item) => acknowledgementEnabled || !item.question.startsWith("What will candidate acknowledgement"))
    .map((item) => item.question.startsWith("What will candidate acknowledgement") && acknowledgementEnabled
      ? {
          question: "What does candidate acknowledgement establish?",
          answer: "It records whether the candidate confirmed, corrected or declined the exact displayed version for a named receiving organisation. It is not identity proof, consent, a legal signature or right-to-represent.",
        }
      : item);
  const softwareJsonLd = getAgencySoftwareJsonLd("en", capabilities);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "WerkCV", item: "https://werkcv.nl/en" },
      { "@type": "ListItem", position: 2, name: "MatchPack", item: pageUrl },
    ],
  };

  return (
    <>
      <AgencyCommercialAnalytics locale="en" path="/en/agency" />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--wk-border)] bg-gradient-to-br from-[#fffef0] via-[#f8fbf7] to-[#eaf7f5]">
          <div className="absolute left-8 top-16 h-24 w-24 rounded-full bg-[var(--wk-highlight)] opacity-25" aria-hidden="true" />
          <div className="absolute bottom-12 right-10 h-36 w-36 rounded-full bg-[var(--wk-accent)] opacity-15" aria-hidden="true" />
          <div className="wk-container grid min-w-0 gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.75fr)] lg:items-center lg:py-16">
            <div className="min-w-0 text-center lg:text-left">
              <p className="wk-eyebrow">{messaging.eyebrow}</p>
              <h1 className="mt-4 break-words text-3xl font-black leading-[1.08] tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">{messaging.h1}</h1>
              <p className="mt-4 text-base font-extrabold tracking-[-0.01em] text-[var(--wk-ink)] sm:text-lg">{monthlyPrice} · {AGENCY_MONTHLY_CREDIT_LIMIT} shared CV credits</p>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)] lg:mx-0">{messaging.hero}</p>
              <div className="mt-7 flex min-w-0 flex-col items-start justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
                <Link href="/en/candidate-proposal-checker" className="wk-button wk-button-primary min-h-12 px-7 text-base">
                  {messaging.freeToolCta}
                </Link>
                <CheckoutAction location="en_agency_hero_checkout" variant="secondary" />
                <Link href="#sample" className="wk-button wk-button-quiet min-h-12 px-4 text-base">View fictional example</Link>
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
                <span className="wk-trust-pill">No sales call required</span>
                <span className="wk-trust-pill">No candidate ranking</span>
                <span className="wk-trust-pill">PDF + DOCX</span>
              </div>
            </div>

            <AgencyEvidencePreview locale="en" />
          </div>
        </section>

        <div className="wk-container py-5"><p className="text-sm leading-relaxed" data-review-scope>{getAgencyReviewScopeNotice("en")}</p></div>
        <section className="wk-section bg-[var(--wk-surface)]" aria-labelledby="why-matchpack">
          <div className="wk-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="wk-eyebrow">Before a submission leaves the agency</p>
              <h2 id="why-matchpack" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Formatting is useful. A controlled evidence trail is safer.</h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-[var(--wk-ink-muted)]">MatchPack does not decide whether a candidate fits. It helps the recruiter see what the workflow contains, where the supporting source came from and what still needs a human decision.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                [messaging.evidenceBenefit, verifierEnabled ? "Every supported proposal claim points back to the submitted CV passage and source location." : "Selected requirements show the CV passages found and their source locations; missing support stays visible."],
                ["Gaps remain visible", "Missing, contradictory, subjective and changing information cannot quietly become candidate fact."],
                ["One controlled version", acknowledgementEnabled ? "Recruiter review, candidate acknowledgement and exports stay tied to the same version." : "Recruiter review, version history and exports stay tied to the same controlled version."],
              ].map(([heading, body], index) => (
                <article key={heading} className="wk-card transition-transform hover:-translate-y-0.5">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-[var(--wk-radius-sm)] font-black ${index === 0 ? "bg-[var(--wk-accent-soft)]" : index === 1 ? "bg-[var(--wk-highlight-soft)]" : "bg-[var(--wk-info-soft)]"}`}>{index + 1}</span>
                  <h3 className="mt-5 text-xl font-semibold">{heading}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="wk-section bg-[var(--wk-surface-subtle)]" aria-labelledby="workflow-title">
          <div className="wk-container">
            <div className="max-w-3xl">
              <p className="wk-eyebrow">The MatchPack workflow</p>
              <h2 id="workflow-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">From original CV to one approved client version.</h2>
            </div>
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {workflow.map((step) => (
                <li key={step.number} className="wk-card min-w-0">
                  <span className={`inline-flex rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] px-3 py-2 text-sm font-black ${step.tone}`}>{step.number}</span>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="sample" className="wk-section bg-[var(--wk-surface)]" aria-labelledby="sample-title">
          <div className="wk-container grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="wk-eyebrow">Fictional worked example</p>
              <h2 id="sample-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">See the difference between evidence, judgement and confirmation.</h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-[var(--wk-ink-muted)]">Nina de Vries and Stadshaven Care Group are fictional. The example shows the review logic without exposing real candidate information.</p>
              <Link href="/en/candidate-proposal-checker" className="wk-button wk-button-secondary mt-6">Try the free checker</Link>
            </div>
              <div className="grid gap-4 sm:grid-cols-3">
               <div className="wk-card wk-card-success"><p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--wk-success)]">CV evidence</p><p className="mt-3 text-sm font-semibold">“{getAgencyEvidenceSample("en").result.requirements[2].cvEvidence}”</p><p className="mt-3 text-xs leading-relaxed text-[var(--wk-ink-muted)]">Exact source passage. {verifierEnabled ? "Can support the client-facing claim." : "Can support the corresponding vacancy requirement."}</p></div>
               <div className="wk-card wk-card-accent"><p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--wk-primary)]">Recruiter assessment</p><p className="mt-3 text-sm font-semibold">“Her experience appears relevant to this HR advisory assignment.”</p><p className="mt-3 text-xs leading-relaxed text-[var(--wk-ink-muted)]">Professional judgement. Labelled separately from source evidence.</p></div>
               <div className="wk-card wk-card-warning"><p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--wk-warning)]">{acknowledgementEnabled ? "Candidate confirmation" : "Changing information"}</p><p className="mt-3 text-sm font-semibold">“Available for 32–36 hours from 1 October.”</p><p className="mt-3 text-xs leading-relaxed text-[var(--wk-ink-muted)]">{acknowledgementEnabled ? "Changing information. Confirmed for the displayed named-client version, not proven by the CV." : "Changing information is not proven by the CV; the recruiter must confirm it before sharing."}</p></div>
            </div>
          </div>
        </section>

        <section className="wk-section bg-[var(--wk-primary)] text-white" aria-labelledby="boundaries-title">
          <div className="wk-container grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--wk-accent)]">What MatchPack controls</p>
              <h2 id="boundaries-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em]">A traceable pre-send review.</h2>
              <ul className="mt-6 space-y-3 text-sm font-medium leading-relaxed text-white/80">{[
                verifierEnabled ? "Exact source snippets and locations for supported proposal claims." : "Exact source snippets and locations for vacancy requirements.",
                "Reviewer status, notes, version history and visible changes.",
                verifierEnabled ? "Resolution of unsupported and contradictory client-facing claims." : "Open points remain visible for recruiter resolution.",
                ...(acknowledgementEnabled ? ["Candidate acknowledgement tied to a named organisation and version."] : []),
                "PDF and DOCX generated from the approved version.",
              ].map((item) => <li key={item} className="flex gap-3"><span className="text-[var(--wk-accent)]">✓</span><span>{item}</span></li>)}</ul>
            </div>
            <div className="rounded-[var(--wk-radius-lg)] border border-white/20 bg-white/10 p-6 sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--wk-highlight)]">What it does not establish</p>
              <ul className="mt-6 space-y-3 text-sm font-medium leading-relaxed text-white/80">{[
                "Whether the candidate is objectively truthful.",
                "Legal identity, consent, signature or right-to-represent.",
                "A candidate score, rank, selection or hiring recommendation.",
                "Legal anonymity after direct contact fields are removed.",
                "Guaranteed GDPR, AI Act or ATS compliance.",
              ].map((item) => <li key={item} className="flex gap-3"><span className="text-[var(--wk-highlight)]">—</span><span>{item}</span></li>)}</ul>
            </div>
          </div>
        </section>

        <section id="pricing" className="wk-section bg-[var(--wk-canvas)]" aria-labelledby="pricing-title">
          <div className="wk-container grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="wk-eyebrow">MatchPack subscription</p>
              <h2 id="pricing-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">One clear monthly credit pool.</h2>
              <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">Analysis and draft review do not consume a credit. A new standalone Agency CV or a definitively approved MatchPack uses one of the shared {AGENCY_MONTHLY_CREDIT_LIMIT} CV credits.</p>
              <ul className="mt-7 grid gap-3 text-sm font-semibold sm:grid-cols-2">{[
                "Exact evidence and visible open points",
                "Recruiter review and version history",
                acknowledgementEnabled ? "Candidate acknowledgement workflow" : "Reviewer-controlled approval workflow",
                "Full and contact-reduced output",
                "PDF and DOCX export",
                "Reusable agency templates and team roles",
                "Dutch and English output",
                "CSV import and export",
              ].map((item) => <li key={item} className="flex gap-3"><span className="text-[var(--wk-success)]">✓</span><span>{item}</span></li>)}</ul>
            </div>
            <div className="rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)] p-7 shadow-[var(--wk-shadow-md)] sm:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--wk-primary)]">MatchPack · Agency</p>
              <div className="mt-4 flex items-end gap-2"><span className="text-5xl font-black tracking-[-0.05em]">{monthlyPrice.split("/")[0]}</span><span className="pb-2 text-sm font-bold text-[var(--wk-ink-muted)]">/ month</span></div>
              <p className="mt-2 text-sm font-semibold">Billed in {AGENCY_CURRENCY} · {AGENCY_MONTHLY_CREDIT_LIMIT} shared CV credits per billing period</p>
              <div className="mt-7"><CheckoutAction location="en_agency_pricing" /></div>
               <p className="mt-5 text-xs font-medium leading-relaxed text-[var(--wk-ink-muted)]">{getAgencyFullUseUnitPriceDisplay("en")} Editing and repeat downloads do not consume another credit.</p>
            </div>
          </div>
        </section>

        <section className="wk-section bg-[var(--wk-surface)]" aria-labelledby="privacy-title">
          <div className="wk-container grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1"><p className="wk-eyebrow">Data responsibility</p><h2 id="privacy-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em]">Use real candidate data only with the right controls.</h2></div>
            <div className="wk-card lg:col-span-2"><p className="text-base font-semibold leading-relaxed">Your agency remains responsible for its legal basis, candidate information and client sharing. WerkCV provides retention settings, deletion controls, team roles and product information; it does not infer your lawful basis.</p><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Before live use, review current retention, subprocessor and DPA information. The free verifier does not persist submitted source text or place session-replay advertising on the tool.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/en/agency/privacy" className="wk-button wk-button-secondary">Privacy and retention</Link><Link href="/en/agency/methodology/claim-evidence-benchmark" className="wk-button wk-button-quiet">Accuracy methodology →</Link></div></div>
          </div>
        </section>

        <section className="wk-section bg-[var(--wk-surface-subtle)]" aria-labelledby="faq-title">
          <div className="wk-container">
            <div className="max-w-3xl"><p className="wk-eyebrow">Questions before you use it</p><h2 id="faq-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">MatchPack FAQ</h2></div>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">{effectiveFaqItems.map((faq) => <details key={faq.question} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-white shadow-[var(--wk-shadow-sm)]"><summary className="cursor-pointer px-5 py-5 text-base font-semibold">{faq.question}</summary><p className="border-t border-[var(--wk-border)] px-5 py-5 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{faq.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="wk-section bg-[var(--wk-surface)]">
          <div className="wk-container">
            <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 text-center text-white shadow-[var(--wk-shadow-md)] sm:p-12">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--wk-accent)]">Start with evidence, not a sales call</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Check a proposal free. Move to MatchPack only if the controlled workflow helps.</h2>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/en/candidate-proposal-checker" className="wk-button wk-button-accent min-h-12 px-7">Use the free checker</Link><CheckoutAction location="en_agency_bottom" /></div>
            </div>
          </div>
        </section>
      </main>

      <FAQJsonLd questions={effectiveFaqItems} />
      <JsonLd data={softwareJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <OrganizationJsonLd />
    </>
  );
}
