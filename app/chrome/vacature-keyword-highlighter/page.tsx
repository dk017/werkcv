import type { Metadata } from "next";
import Link from "next/link";

const highlights = [
  "Single-purpose Chrome extension for Dutch and English job pages",
  "Highlights CV-relevant skills, qualifications, and repeated themes on the current tab",
  "Runs locally in the browser with no login, no account, and no remote code",
  "Built for fast CV tailoring before reusing terms inside WerkCV",
];

const workflows = [
  {
    title: "1. Open a job page",
    body: "Visit a Dutch vacature or English job listing in a regular browser tab.",
  },
  {
    title: "2. Scan the current tab",
    body: "Click the extension popup and run a scan. The extension reads the current page only after you trigger it.",
  },
  {
    title: "3. Reuse the right terms",
    body: "Review highlighted skills, qualifications, and themes, then carry the strongest wording into your CV or motivation letter.",
  },
];

const permissions = [
  {
    label: "activeTab",
    description: "Used so the extension can scan only the page you explicitly choose.",
  },
  {
    label: "scripting",
    description: "Used to inject the local highlighter into the current page so terms can be marked visually.",
  },
];

const supportLinks = [
  {
    title: "Privacy information",
    href: "/chrome/vacature-keyword-highlighter/privacy",
    copy: "Detailed data-handling explanation for reviewers and users.",
  },
  {
    title: "General privacy policy",
    href: "/privacy",
    copy: "WerkCV.nl privacy policy for the website itself.",
  },
];

export const metadata: Metadata = {
  title: "WerkCV Vacature Keyword Highlighter | Chrome extension",
  description:
    "Official support page for the WerkCV Vacature Keyword Highlighter Chrome extension. Scan Dutch and English job pages, highlight CV keywords, and review privacy details.",
  alternates: {
    canonical: "https://werkcv.nl/chrome/vacature-keyword-highlighter",
  },
};

export default function ChromeVacatureKeywordHighlighterPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-gray-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-black hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="font-bold text-black">Chrome extension</li>
        </ol>
      </nav>

      <section className="mb-10 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4 inline-block border-2 border-black bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
          Chrome extension
        </div>
        <h1 className="mb-4 text-4xl font-black text-black md:text-5xl">
          WerkCV Vacature Keyword Highlighter
        </h1>
        <p className="max-w-3xl text-lg font-medium leading-relaxed text-black">
          A narrow Chrome extension that scans the active Dutch or English job page, highlights
          CV-relevant wording, and surfaces the terms worth reusing in a CV.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/chrome/vacature-keyword-highlighter/privacy"
            className="inline-block border-4 border-black bg-yellow-400 px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Privacy & data use
          </Link>
          <a
            href="mailto:contact@werkcv.nl?subject=WerkCV%20Chrome%20extension"
            className="inline-block border-4 border-black bg-white px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-50 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Contact support
          </a>
        </div>
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-3xl font-black text-black">What it does</h2>
          <ul className="space-y-3 text-sm font-medium leading-relaxed text-gray-700">
            {highlights.map((item) => (
              <li key={item} className="border-2 border-black bg-[#FFFEF0] px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-4 border-black bg-teal-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-2xl font-black text-black">Status</h2>
          <p className="text-sm font-medium leading-relaxed text-black">
            This page is the official support URL for the Chrome Web Store listing. It exists for
            reviewers, users, and anyone who wants a clear explanation of the extension&apos;s
            purpose, permissions, and privacy behavior.
          </p>
          <div className="mt-5 border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black">
            Current scope: local page analysis on the active tab only.
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-3xl font-black text-black">How it works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {workflows.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="mb-3 text-xl font-black text-black">{item.title}</h3>
              <p className="text-sm font-medium leading-relaxed text-gray-700">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <article className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-3xl font-black text-black">Permissions used</h2>
          <div className="space-y-4">
            {permissions.map((item) => (
              <div key={item.label} className="border-2 border-black bg-[#FFFEF0] px-4 py-4">
                <p className="text-lg font-black text-black">{item.label}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-3xl font-black text-black">Support links</h2>
          <div className="space-y-4">
            {supportLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-2 border-black bg-[#FFFEF0] px-4 py-4 transition-colors hover:bg-yellow-100"
              >
                <p className="text-lg font-black text-black">{item.title}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-gray-700">
                  {item.copy}
                </p>
              </Link>
            ))}
            <a
              href="mailto:contact@werkcv.nl?subject=WerkCV%20Chrome%20extension"
              className="block border-2 border-black bg-[#FFFEF0] px-4 py-4 transition-colors hover:bg-yellow-100"
            >
              <p className="text-lg font-black text-black">Email support</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-gray-700">
                contact@werkcv.nl
              </p>
            </a>
          </div>
        </article>
      </section>
    </>
  );
}
