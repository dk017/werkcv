import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import EnglishProfileSummaryTool from "./EnglishProfileSummaryTool";

export const metadata: Metadata = {
  title: "Free English CV Profile Summary Generator | WerkCV",
  description: "Draft an English CV profile for a Netherlands job application, then review the wording and add it safely to your WerkCV.",
  alternates: { canonical: "/en/profile-summary-generator", languages: { nl: "/tools/profieltekst-generator", en: "/en/profile-summary-generator" } },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "WerkCV English CV profile summary generator", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: "https://werkcv.nl/en/profile-summary-generator", description: "Free English CV profile wording tool with an explicit review step and optional secure handoff to the WerkCV editor." }} />
    <main className="wk-page-shell py-10 sm:py-16">
      <section className="max-w-3xl">
        <p className="wk-eyebrow">Free English CV tool</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">Write the profile section employers read first.</h1>
        <p className="mt-6 text-lg leading-8 text-[var(--wk-ink-muted)]">Give us your current role, target role and real strengths. You get a concise English draft for a Netherlands-ready CV, with the facts still yours to check.</p>
        <p className="mt-4 text-sm leading-6 text-[var(--wk-ink-muted)]">Do not enter contact details or confidential employer information. The tool is for wording help; it does not verify your identity or employment history.</p>
      </section>
      <div className="mt-8 max-w-3xl"><EnglishProfileSummaryTool /></div>
      <p className="mt-5"><Link href="/en/ai-cv-builder" className="underline underline-offset-4">See complete CV examples and AI writing guidance</Link></p>
      <section className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="wk-card"><h2 className="text-xl font-semibold">What makes a useful profile?</h2><p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">Name the professional direction, two or three strengths and the contribution you can support. Keep the result specific enough for a recruiter to understand in one scan.</p></article>
        <article className="wk-card"><h2 className="text-xl font-semibold">Check before you use it</h2><p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">Compare every date, number, tool, employer and responsibility with your source CV. If the draft adds a claim, remove it or rewrite it before downloading.</p></article>
      </section>
      <section className="mt-12 rounded-[2rem] bg-[var(--wk-ink)] p-7 text-white sm:p-10"><h2 className="text-2xl font-semibold">Need the complete CV?</h2><p className="mt-3 max-w-2xl text-white/75">Build and preview the rest for free in the English editor. The one-time PDF price is shown before checkout; there is no subscription.</p><Link href="/en/editor?startSource=profile-summary-generator" className="wk-button mt-6 bg-white text-[var(--wk-ink)]">Open the CV editor</Link></section>
    </main>
  </>;
}
