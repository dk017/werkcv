import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { cvDownloadPrice } from "@/lib/site-content";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/pricing" as const;
const editorHref = "/en/editor?template=professional&startSource=en_pricing_hero";

export const metadata = buildEnglishMetadata({
  title: `WerkCV Pricing: ${cvDownloadPrice.displayEn} One-Time CV PDF`,
  description: `Build and preview your CV for free. Download the finished PDF for a one-time ${cvDownloadPrice.displayEn} including VAT, with no subscription or automatic renewal.`,
  path: pagePath,
  nlPath: "/prijzen",
  keywords: [
    "WerkCV pricing",
    "CV builder price Netherlands",
    "resume builder no subscription",
    "one time CV payment",
    "CV PDF price",
    "English CV builder Netherlands price",
  ],
});

const priceBadges = [
  `${cvDownloadPrice.displayEn} including VAT`,
  "No subscription",
  "No automatic renewal",
  "Preview before payment",
] as const;

const includedFeatures = [
  "Build, edit and preview your complete CV for free",
  "13+ professional, ATS-friendly templates",
  "Multiple colour themes for every template",
  "A polished PDF ready for Dutch-market applications",
  "Immediate download after successful payment",
  "Edit and re-download the same paid CV later",
  "Keep the CV stored securely in your account",
  "No trial period, monthly charge or cancellation task",
] as const;

const paymentSteps = [
  {
    number: "1",
    title: "Build for free",
    body: "Create a new English CV or upload an existing document. Editing, templates and the live preview are free.",
  },
  {
    number: "2",
    title: "Review everything",
    body: "Check the content, page layout, template and colour before opening the payment step.",
  },
  {
    number: "3",
    title: "Pay only for the PDF",
    body: `Pay ${cvDownloadPrice.displayEn} including VAT when the CV is ready, then download it immediately.`,
  },
] as const;

const pricingFaqs = [
  {
    question: "Can I use WerkCV for free?",
    answer: `You can create an account, build or upload your CV, compare templates and review the complete result for free. The finished WerkCV PDF costs a one-time ${cvDownloadPrice.displayEn} including VAT.`,
  },
  {
    question: "Is the payment a subscription?",
    answer: "No. There is no trial subscription, monthly charge, automatic renewal or cancellation requirement.",
  },
  {
    question: `What do I receive for ${cvDownloadPrice.displayEn}?`,
    answer: "The payment unlocks the finished PDF for one CV document. That paid CV remains in your account so you can edit it, change its template or colour, and download it again without paying again.",
  },
  {
    question: "When would I need to pay again?",
    answer: `You do not repay for changes or later downloads of the same paid CV. If you create a separate new CV document and want its PDF, that document has its own one-time ${cvDownloadPrice.displayEn} payment.`,
  },
  {
    question: "Can I see the full CV before paying?",
    answer: "Yes. You can review the complete content, page layout, template and accent colour before proceeding to checkout.",
  },
  {
    question: "Which payment methods are available?",
    answer: "Checkout is handled securely by Dodo Payments. Eligible customers may see iDEAL, credit or debit cards, Apple Pay or Google Pay. The methods shown depend on country, device, bank and provider availability.",
  },
  {
    question: "Is VAT included?",
    answer: `Yes. The advertised ${cvDownloadPrice.displayEn} price includes applicable VAT.`,
  },
] as const;

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://werkcv.nl/en/pricing#cv-download",
  name: "WerkCV professional CV PDF download",
  description: `Build and preview a Dutch-market CV for free, then download the finished PDF for a one-time ${cvDownloadPrice.displayEn} including VAT.`,
  url: "https://werkcv.nl/en/pricing",
  image: ["https://werkcv.nl/opengraph-image"],
  inLanguage: "en-NL",
  brand: {
    "@type": "Brand",
    name: "WerkCV",
  },
  sku: "cv-download",
  offers: {
    "@type": "Offer",
    url: "https://werkcv.nl/en/pricing",
    price: cvDownloadPrice.value,
    priceCurrency: cvDownloadPrice.currency,
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": "https://werkcv.nl/#organization" },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      doesNotShip: true,
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "NL",
      returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      merchantReturnLink: "https://werkcv.nl/en/terms",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "WerkCV",
      item: "https://werkcv.nl/en",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: "https://werkcv.nl/en/pricing",
    },
  ],
};

export default function EnglishPricingPage() {
  return (
    <main className="pb-24 md:pb-0">
      <FAQJsonLd questions={[...pricingFaqs]} />
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="wk-section">
        <div className="wk-container max-w-4xl text-center">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {priceBadges.map((badge) => (
              <span key={badge} className="wk-trust-pill">
                {badge}
              </span>
            ))}
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
            One professional CV PDF for{" "}
            <span className="wk-hero-highlight">{cvDownloadPrice.displayEn}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--wk-ink-muted)]">
            Build your English CV for the Netherlands, compare templates and review the complete
            result for free. Pay only when you want the finished PDF.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-[var(--wk-ink)]">
            One payment. No trial, subscription, automatic renewal or hidden monthly charge.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <TrackedLandingLink
              href={editorHref}
              trackingLocation="en_pricing_hero"
              trackingLabel="build_cv_free"
              className="wk-button wk-button-primary px-7 py-4 text-lg"
            >
              Build my CV for free
            </TrackedLandingLink>
            <Link href="#how-payment-works" className="wk-button wk-button-secondary px-7 py-4 text-lg">
              How payment works
            </Link>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container max-w-3xl">
          <div className="wk-card p-7 md:p-9">
            <div className="text-center">
              <p className="wk-eyebrow">
                <span>One-time CV download</span>
              </p>
              <p className="mt-3 text-6xl font-semibold text-[var(--wk-ink)]">{cvDownloadPrice.displayEn}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--wk-ink-muted)]">Including VAT</p>
              <p className="mt-3 text-lg font-semibold text-[var(--wk-ink)]">One finished CV document as PDF</p>
            </div>

            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {includedFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--wk-success-soft)] text-sm font-semibold text-[var(--wk-success)]">
                    ✓
                  </span>
                  <span className="text-sm font-medium leading-6 text-[var(--wk-ink)]">{feature}</span>
                </li>
              ))}
            </ul>

            <TrackedLandingLink
              href="/en/editor?template=professional&startSource=en_pricing_card"
              trackingLocation="en_pricing_card"
              trackingLabel="start_free"
              className="wk-button wk-button-primary mt-8 w-full px-6 py-4 text-lg"
            >
              Start free — pay only for the PDF
            </TrackedLandingLink>
          </div>
        </div>
      </section>

      <section id="how-payment-works" className="wk-section scroll-mt-24 pt-0">
        <div className="wk-container">
          <div className="text-center">
            <div className="wk-eyebrow mb-3">
              <span>Transparent from start to finish</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--wk-ink)] md:text-4xl">
              How payment works
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {paymentSteps.map((step) => (
              <article key={step.number} className="wk-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--wk-accent-soft)] text-xl font-semibold text-[var(--wk-primary)]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[var(--wk-ink)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="wk-card p-7">
              <div className="wk-eyebrow mb-3">
                <span>What one payment unlocks</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">The same CV stays unlocked</h2>
              <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">
                You can edit the content, change the template or colour, and download that paid CV
                again without another payment.
              </p>
              <p className="mt-4 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)] p-4 text-sm font-medium leading-6 text-[var(--wk-ink)]">
                A separate new CV document has its own one-time {cvDownloadPrice.displayEn} PDF
                payment. We show this clearly before checkout.
              </p>
            </article>

            <article className="wk-card p-7">
              <div className="wk-eyebrow mb-3">
                <span>Secure hosted checkout</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Payment methods</h2>
              <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">
                Payment is handled by Dodo Payments. Eligible customers may see iDEAL, credit or
                debit cards, Apple Pay or Google Pay.
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--wk-ink-muted)]">
                The exact methods displayed depend on your country, device, bank and payment-provider
                availability.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="text-center">
            <div className="wk-eyebrow mb-3">
              <span>Clear answers before you start</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">Pricing FAQ</h2>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {pricingFaqs.map((faq) => (
              <details key={faq.question} className="wk-card group">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-[var(--wk-ink)]">
                  {faq.question}
                  <span className="ml-3 text-xl text-[var(--wk-ink-muted)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-[var(--wk-border)] px-4 pb-4 pt-3 leading-7 text-[var(--wk-ink-muted)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 text-center md:p-12">
            <h2 className="text-3xl font-semibold text-[var(--wk-primary-contrast)]">
              Finish the CV first. Decide after the preview.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl leading-8 text-[var(--wk-primary-contrast)]/80">
              Start free and pay {cvDownloadPrice.displayEn} including VAT only when you want the
              final PDF. No subscription or automatic renewal.
            </p>
            <TrackedLandingLink
              href="/en/editor?template=professional&startSource=en_pricing_bottom"
              trackingLocation="en_pricing_bottom"
              trackingLabel="build_cv"
              className="wk-button wk-button-accent mt-7 px-7 py-4 text-lg"
            >
              Build my CV
            </TrackedLandingLink>
          </div>
        </div>
      </section>

      <Footer variant="brand" uiLanguage="en" />
      <MobileStickyCta
        text={`Start free. Final PDF ${cvDownloadPrice.displayEn}.`}
        buttonLabel="Build CV"
        href="/en/editor?template=professional&startSource=en_pricing_sticky"
        trackingLocation="en_pricing_mobile_sticky"
        trackingLabel="build_cv"
        variant="brand"
      />
    </main>
  );
}
