import type { Metadata } from "next";
import Link from "next/link";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import AgencyCommercialAnalytics from "@/components/agency/AgencyCommercialAnalytics";
import { FAQJsonLd, JsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { isAgencyDodoConfigured } from "@/lib/dodo";
import { candidateAcknowledgementEnabled, proposalClaimVerifierEnabled } from "@/lib/agency-feature-flags";

const pageUrl = "https://werkcv.nl/en/agency";
const title = "Candidate submission evidence software for recruitment agencies | MatchPack";
const description = "Connect client-facing candidate information to exact CV evidence, resolve visible gaps and export one controlled PDF or DOCX proposal for recruiter review.";

export const metadata: Metadata = {
  title,
  description,
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
    title: "MatchPack: evidence-linked candidate submissions",
    description,
    url: pageUrl,
    siteName: "WerkCV",
    locale: "en_GB",
    type: "website",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const workflow = [
  {
    number: "01",
    title: "Upload the source",
    body: "Add an authorised candidate CV and the real vacancy. MatchPack maps the source before drafting anything client-facing.",
    tone: "bg-[var(--wk-highlight-soft)]",
  },
  {
    number: "02",
    title: "Review every claim",
    body: "See the exact CV passage behind each claim. Unsupported, contradictory and changing information stays visible.",
    tone: "bg-[var(--wk-accent-soft)]",
  },
  {
    number: "03",
    title: "Confirm the version",
    body: "Resolve recruiter decisions for the current version. Candidate acknowledgement appears only when its production-certification gate is enabled.",
    tone: "bg-[var(--wk-info-soft)]",
  },
  {
    number: "04",
    title: "Export one snapshot",
    body: "The introduction, selected CV and PDF/DOCX outputs are generated from the same controlled approved snapshot.",
    tone: "bg-[var(--wk-success-soft)]",
  },
];

const faqItems = [
  {
    question: "Does MatchPack replace our ATS?",
    answer: "No. MatchPack is a pre-send quality-control layer for candidate submissions. Use your ATS for sourcing and pipeline management; use MatchPack to review the evidence and control the version sent to a client. CSV remains the current import and export route.",
  },
  {
    question: "Does WerkCV verify that a candidate is telling the truth?",
    answer: "No. MatchPack assesses whether a client-facing claim is supported by the submitted CV. Candidate-confirmed information and recruiter assessment are labelled separately. Recruiters remain responsible for checks and decisions.",
  },
  {
    question: "What will candidate acknowledgement establish when enabled?",
    answer: "The activation-gated workflow records whether the candidate confirmed, corrected or declined the exact displayed version for a named receiving organisation. It is not identity proof, consent, a legal signature or right-to-represent. WerkCV does not present this feature as live until its production gates pass.",
  },
  {
    question: "What is included in the €149 monthly tier?",
    answer: "The Agency billing tier includes up to 50 standalone Agency CVs or definitively approved MatchPacks per billing period. Analysis and draft review do not consume a slot. Billing is in EUR.",
  },
  {
    question: "Can we export Word documents?",
    answer: "Yes. Approved MatchPacks can produce PDF and DOCX outputs from the same approved snapshot, including a full or contact-reduced CV version.",
  },
  {
    question: "How is candidate data handled?",
    answer: "The uploaded source file is used for text extraction and is not retained as a downloadable original. Structured candidate data, evidence, revisions and approval records follow the Agency retention setting. Review the privacy page and request current DPA/subprocessor information before live use.",
  },
  {
    question: "Can we cancel the subscription?",
    answer: "Yes. Cancellation stops renewal; access continues until the end of the paid billing period. Retention and deletion remain controlled from Agency settings.",
  },
];

function CheckoutAction({ location }: { location: string }) {
  if (!isAgencyDodoConfigured()) {
    return (
      <Link href="/agency/account" className="wk-button wk-button-primary min-h-12 px-6 text-base">
        Open MatchPack
      </Link>
    );
  }

  return (
    <AgencyCheckoutButton
      locale="en"
      location={location}
      label="Start MatchPack · €149/month"
      className="wk-button wk-button-primary min-h-12 px-6 text-base"
    />
  );
}

export default function EnglishAgencyPage() {
  const acknowledgementEnabled = candidateAcknowledgementEnabled();
  const verifierEnabled = proposalClaimVerifierEnabled();
  const effectiveFaqItems = faqItems.map((item) => item.question.startsWith("What will candidate acknowledgement") && acknowledgementEnabled
    ? {
        question: "What does candidate acknowledgement establish?",
        answer: "It records whether the candidate confirmed, corrected or declined the exact displayed version for a named receiving organisation. It is not identity proof, consent, a legal signature or right-to-represent.",
      }
    : item);
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WerkCV MatchPack",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: pageUrl,
    inLanguage: "en-GB",
    description,
    featureList: [
      "Exact CV source references for client-facing claims",
      "Recruiter review and version history",
      "Controlled PDF and DOCX export",
      "Full and contact-reduced output",
      "CSV import and export",
      ...(acknowledgementEnabled ? ["Candidate acknowledgement for a named recipient"] : []),
    ],
    offers: {
      "@type": "Offer",
      price: "149.00",
      priceCurrency: "EUR",
      category: "monthly subscription",
      description: "Up to 50 standalone Agency CVs or approved MatchPacks per billing period",
      url: `${pageUrl}#pricing`,
    },
    publisher: { "@id": "https://werkcv.nl/#organization" },
  };

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
          <div className="wk-container grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.75fr)] lg:items-center lg:py-24">
            <div className="min-w-0 text-center lg:text-left">
              <p className="wk-eyebrow">Candidate submission evidence</p>
              <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
                Send candidate proposals with every important claim <span className="wk-hero-highlight">connected to evidence.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)] lg:mx-0">
                MatchPack turns an authorised CV, a genuine vacancy and recruiter notes into one controlled client proposal. Exact CV evidence stays visible, missing or changing information is not hidden, and the recruiter approves the final PDF or DOCX.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/en/candidate-proposal-checker" className="wk-button wk-button-primary min-h-12 px-7 text-base">
                  {verifierEnabled ? "Check a proposal free" : "Check CV evidence free"}
                </Link>
                <Link href="#sample" className="wk-button wk-button-secondary min-h-12 px-7 text-base">
                  View fictional example
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <span className="wk-trust-pill">No sales call required</span>
                <span className="wk-trust-pill">No candidate ranking</span>
                <span className="wk-trust-pill">PDF + DOCX</span>
                <span className="wk-trust-pill">Human approval</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg min-w-0">
              <div className="absolute -left-5 -top-5 h-full w-full rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)]" aria-hidden="true" />
              <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-accent-soft)]" aria-hidden="true" />
              <div className="relative rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-white p-5 shadow-[var(--wk-shadow-md)] sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-[var(--wk-border)] pb-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-primary)]">Claim review</p>
                    <p className="mt-1 text-xl font-black">Senior HR adviser</p>
                  </div>
                  <span className="rounded-full bg-[var(--wk-warning-soft)] px-3 py-2 text-xs font-extrabold text-[var(--wk-warning)]">2 need review</span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-[var(--wk-radius-sm)] border border-[#b9dfc9] bg-[var(--wk-success-soft)] p-4">
                    <div className="flex items-center justify-between gap-3"><p className="text-sm font-extrabold">Advised 24 team leaders</p><span className="text-xs font-black text-[var(--wk-success)]">SUPPORTED</span></div>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--wk-ink-muted)]">CV · Experience · “Advised 24 team leaders on absence and organisational change.”</p>
                  </div>
                  <div className="rounded-[var(--wk-radius-sm)] border border-[#ead49a] bg-[var(--wk-warning-soft)] p-4">
                    <div className="flex items-center justify-between gap-3"><p className="text-sm font-extrabold">Available from 1 October</p><span className="text-xs font-black text-[var(--wk-warning)]">CONFIRM</span></div>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--wk-ink-muted)]">Changing information is not present in the CV. Ask the candidate before sharing.</p>
                  </div>
                  <div className="rounded-[var(--wk-radius-sm)] border border-[#edc3c7] bg-[var(--wk-danger-soft)] p-4">
                    <div className="flex items-center justify-between gap-3"><p className="text-sm font-extrabold">Configured AFAS workflows</p><span className="text-xs font-black text-[var(--wk-danger)]">UNSUPPORTED</span></div>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--wk-ink-muted)]">The source names HR systems but does not support this specific responsibility.</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-[var(--wk-radius-sm)] bg-[var(--wk-primary)] px-4 py-3 text-white">
                  <span className="text-xs font-bold">Recruiter remains in control</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wk-section bg-[var(--wk-surface)]" aria-labelledby="why-matchpack">
          <div className="wk-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="wk-eyebrow">Before a submission leaves the agency</p>
              <h2 id="why-matchpack" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Formatting is useful. A controlled evidence trail is safer.</h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-[var(--wk-ink-muted)]">MatchPack does not decide whether a candidate fits. It helps the recruiter see what the proposal says, where that statement came from and what still needs a human decision.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                ["Exact source evidence", "Every supported claim points back to the submitted CV passage and source location."],
                ["Gaps remain visible", "Unsupported, contradictory, subjective and changing information cannot quietly become candidate fact."],
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
              <div className="wk-card wk-card-success"><p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--wk-success)]">CV evidence</p><p className="mt-3 text-sm font-semibold">“Advised 24 team leaders on absence and organisational change.”</p><p className="mt-3 text-xs leading-relaxed text-[var(--wk-ink-muted)]">Exact source passage. Can support the client-facing claim.</p></div>
              <div className="wk-card wk-card-accent"><p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--wk-primary)]">Recruiter assessment</p><p className="mt-3 text-sm font-semibold">“Her experience appears relevant to this HR advisory assignment.”</p><p className="mt-3 text-xs leading-relaxed text-[var(--wk-ink-muted)]">Professional judgement. Labelled separately from source evidence.</p></div>
              <div className="wk-card wk-card-warning"><p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--wk-warning)]">Candidate confirmation</p><p className="mt-3 text-sm font-semibold">“Available for 32–36 hours from 1 October.”</p><p className="mt-3 text-xs leading-relaxed text-[var(--wk-ink-muted)]">Changing information. Confirmed for the displayed named-client version, not proven by the CV.</p></div>
            </div>
          </div>
        </section>

        <section className="wk-section bg-[var(--wk-primary)] text-white" aria-labelledby="boundaries-title">
          <div className="wk-container grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--wk-accent)]">What MatchPack controls</p>
              <h2 id="boundaries-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em]">A traceable pre-send review.</h2>
              <ul className="mt-6 space-y-3 text-sm font-medium leading-relaxed text-white/80">{[
                "Exact source snippets and locations for supported claims.",
                "Reviewer status, notes, version history and visible changes.",
                "Resolution of unsupported and contradictory client-facing claims.",
                acknowledgementEnabled ? "Candidate acknowledgement tied to a named organisation and snapshot." : "Candidate acknowledgement remains unavailable until its certification gate passes.",
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
              <p className="wk-eyebrow">Agency billing tier</p>
              <h2 id="pricing-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">One clear monthly allowance.</h2>
              <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">Analysis and draft review do not consume a slot. A new standalone Agency CV or a definitively approved MatchPack uses one of the shared 50 slots.</p>
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
              <div className="mt-4 flex items-end gap-2"><span className="text-5xl font-black tracking-[-0.05em]">€149</span><span className="pb-2 text-sm font-bold text-[var(--wk-ink-muted)]">/ month</span></div>
              <p className="mt-2 text-sm font-semibold">Billed in EUR · up to 50 shared slots per billing period</p>
              <div className="mt-7"><CheckoutAction location="en_agency_pricing" /></div>
              <p className="mt-5 text-xs font-medium leading-relaxed text-[var(--wk-ink-muted)]">At full use, the allowance is €2.98 per new Agency CV or approved MatchPack. Editing and repeat downloads do not consume another slot.</p>
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
