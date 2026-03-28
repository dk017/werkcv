import type { Metadata } from "next";
import Link from "next/link";

const localOnlyFacts = [
  "The extension scans the current page only after you click scan.",
  "Page analysis runs locally in the browser.",
  "No account is required to use the extension.",
  "No page content is sent to WerkCV servers by the extension.",
];

const dataSections = [
  {
    title: "What the extension can access",
    body:
      "Only the active browser tab that you explicitly choose to scan. The extension reads visible page text to identify CV-relevant terms and render highlights on that page.",
  },
  {
    title: "What the extension does not collect",
    body:
      "It does not require an account, does not upload page text, does not scrape tabs in the background, and does not collect form data from unrelated tabs.",
  },
  {
    title: "Permissions",
    body:
      "The extension uses activeTab to work on the current page only and scripting to inject the local highlighter and popup-driven scan logic.",
  },
  {
    title: "Storage and tracking",
    body:
      "The current version does not store personal data, does not sync data to a backend, and does not include analytics inside the extension itself.",
  },
];

export const metadata: Metadata = {
  title: "Privacy | WerkCV Vacature Keyword Highlighter",
  description:
    "Privacy and data-use information for the WerkCV Vacature Keyword Highlighter Chrome extension.",
  alternates: {
    canonical: "https://werkcv.nl/chrome/vacature-keyword-highlighter/privacy",
  },
};

export default function ChromeVacatureKeywordHighlighterPrivacyPage() {
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
          <li>
            <Link href="/chrome/vacature-keyword-highlighter" className="hover:text-black hover:underline">
              Chrome extension
            </Link>
          </li>
          <li>/</li>
          <li className="font-bold text-black">Privacy</li>
        </ol>
      </nav>

      <section className="mb-10 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4 inline-block border-2 border-black bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
          Privacy
        </div>
        <h1 className="mb-4 text-4xl font-black text-black md:text-5xl">
          Privacy information for the WerkCV Vacature Keyword Highlighter
        </h1>
        <p className="max-w-3xl text-lg font-medium leading-relaxed text-black">
          The extension is designed to run locally on the current tab. It highlights CV-relevant job
          page terms and does not transmit page text to WerkCV servers as part of that scan.
        </p>
      </section>

      <section className="mb-10 border-4 border-black bg-teal-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="mb-4 text-2xl font-black text-black">Local-only behavior</h2>
        <ul className="space-y-3 text-sm font-medium leading-relaxed text-black">
          {localOnlyFacts.map((item) => (
            <li key={item} className="border-2 border-black bg-white px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        {dataSections.map((section) => (
          <section
            key={section.title}
            className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="mb-3 text-2xl font-black text-black">{section.title}</h2>
            <p className="text-sm font-medium leading-relaxed text-gray-700">{section.body}</p>
          </section>
        ))}

        <section className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-3 text-2xl font-black text-black">Links and contact</h2>
          <div className="space-y-3 text-sm font-medium leading-relaxed text-gray-700">
            <p>
              If you click from the extension to the WerkCV website, normal website privacy terms may
              apply on those destination pages.
            </p>
            <p>
              General website policy:{" "}
              <Link href="/privacy" className="font-bold text-black underline underline-offset-2">
                werkcv.nl/privacy
              </Link>
            </p>
            <p>
              Support contact:{" "}
              <a
                href="mailto:contact@werkcv.nl?subject=WerkCV%20Chrome%20extension"
                className="font-bold text-black underline underline-offset-2"
              >
                contact@werkcv.nl
              </a>
            </p>
          </div>
        </section>
      </section>
    </>
  );
}
