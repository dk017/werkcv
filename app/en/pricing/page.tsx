import Link from "next/link";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
    <div className="min-h-screen bg-[#FFFEF0] pb-24 md:pb-0">
      <FAQJsonLd questions={[...pricingFaqs]} />
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/en" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher tone="solid" />
            <TrackedLandingLink
              href={editorHref}
              trackingLocation="en_pricing_header"
              trackingLabel="build_cv"
              className="hidden border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300 sm:inline-block"
            >
              Build my CV
            </TrackedLandingLink>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="text-center">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {priceBadges.map((badge) => (
              <span
                key={badge}
                className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-black"
              >
                {badge}
              </span>
            ))}
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight text-black md:text-6xl">
            One professional CV PDF for {cvDownloadPrice.displayEn}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-slate-700">
            Build your English CV for the Netherlands, compare templates and review the complete
            result for free. Pay only when you want the finished PDF.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-black text-black">
            One payment. No trial, subscription, automatic renewal or hidden monthly charge.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <TrackedLandingLink
              href={editorHref}
              trackingLocation="en_pricing_hero"
              trackingLabel="build_cv_free"
              className="border-4 border-black bg-yellow-400 px-7 py-4 text-lg font-black text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Build my CV for free
            </TrackedLandingLink>
            <Link
              href="#how-payment-works"
              className="border-4 border-black bg-white px-7 py-4 text-lg font-black text-black"
            >
              How payment works
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-3xl border-4 border-black bg-yellow-300 p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-9">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
              One-time CV download
            </p>
            <p className="mt-2 text-6xl font-black text-black">{cvDownloadPrice.displayEn}</p>
            <p className="mt-1 text-sm font-black text-slate-700">Including VAT</p>
            <p className="mt-3 text-lg font-bold text-black">One finished CV document as PDF</p>
          </div>

          <ul className="mt-7 grid gap-3 md:grid-cols-2">
            {includedFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 border-2 border-black bg-white p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-black bg-green-400 text-sm font-black">
                  ✓
                </span>
                <span className="text-sm font-semibold leading-relaxed text-black">{feature}</span>
              </li>
            ))}
          </ul>

          <TrackedLandingLink
            href="/en/editor?template=professional&startSource=en_pricing_card"
            trackingLocation="en_pricing_card"
            trackingLabel="start_free"
            className="mt-7 block w-full border-4 border-black bg-black px-6 py-4 text-center text-lg font-black text-white"
          >
            Start free — pay only for the PDF
          </TrackedLandingLink>
        </section>

        <section id="how-payment-works" className="scroll-mt-8 py-16">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Transparent from start to finish
            </p>
            <h2 className="mt-2 text-3xl font-black text-black md:text-4xl">
              How payment works
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {paymentSteps.map((step) => (
              <article
                key={step.number}
                className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <span className="flex h-11 w-11 items-center justify-center border-[3px] border-black bg-[#4ECDC4] text-xl font-black">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-black text-black">{step.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="border-4 border-black bg-white p-7 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
              What one payment unlocks
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">The same CV stays unlocked</h2>
            <p className="mt-3 font-medium leading-relaxed text-slate-700">
              You can edit the content, change the template or colour, and download that paid CV
              again without another payment.
            </p>
            <p className="mt-4 border-2 border-black bg-[#FFF7E8] p-4 text-sm font-bold leading-relaxed text-black">
              A separate new CV document has its own one-time {cvDownloadPrice.displayEn} PDF
              payment. We show this clearly before checkout.
            </p>
          </article>

          <article className="border-4 border-black bg-[#E9FFFC] p-7 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
              Secure hosted checkout
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">Payment methods</h2>
            <p className="mt-3 font-medium leading-relaxed text-slate-700">
              Payment is handled by Dodo Payments. Eligible customers may see iDEAL, credit or
              debit cards, Apple Pay or Google Pay.
            </p>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">
              The exact methods displayed depend on your country, device, bank and payment-provider
              availability.
            </p>
          </article>
        </section>

        <section className="mt-16">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Clear answers before you start
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">Pricing FAQ</h2>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {pricingFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="border-t-2 border-black px-4 pb-4 pt-3 font-medium leading-relaxed text-slate-700">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 border-4 border-black bg-black p-8 text-center text-white">
          <h2 className="text-3xl font-black">Finish the CV first. Decide after the preview.</h2>
          <p className="mx-auto mt-3 max-w-2xl font-medium leading-relaxed text-slate-200">
            Start free and pay {cvDownloadPrice.displayEn} including VAT only when you want the
            final PDF. No subscription or automatic renewal.
          </p>
          <TrackedLandingLink
            href="/en/editor?template=professional&startSource=en_pricing_bottom"
            trackingLocation="en_pricing_bottom"
            trackingLabel="build_cv"
            className="mt-6 inline-block border-4 border-white bg-yellow-400 px-7 py-4 text-lg font-black text-black"
          >
            Build my CV
          </TrackedLandingLink>
        </section>
      </main>

      <Footer uiLanguage="en" />
      <MobileStickyCta
        text={`Start free. Final PDF ${cvDownloadPrice.displayEn}.`}
        buttonLabel="Build CV"
        href="/en/editor?template=professional&startSource=en_pricing_sticky"
        trackingLocation="en_pricing_mobile_sticky"
        trackingLabel="build_cv"
      />
    </div>
  );
}
