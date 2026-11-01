import type { Metadata } from "next";
import Link from "next/link";
import { thresholdsFor } from "@/lib/sponsor/thresholds";
import { BadgeSamples, Card, ExtensionShell } from "../ExtensionShell";

// Opened once by the extension right after install (with utm_content=install, so installs show in our analytics).
export const metadata: Metadata = {
  title: "Welcome: Netherlands Visa Sponsor Checker | WerkCV",
  robots: { index: false, follow: true },
};

export default function VisaSponsorCheckerWelcomePage() {
  const { amounts } = thresholdsFor();
  return (
    <ExtensionShell>
      <Card>
        <p className="mb-3 inline-block border-2 border-black bg-[#e2f4ec] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#0b5d4b]">Installed</p>
        <h1 className="mb-4 text-3xl font-black text-black">The sponsor checker is ready</h1>
        <ol className="list-decimal space-y-2 pl-6 text-lg font-medium text-gray-800">
          <li>
            Open a job search on{" "}
            <a href="https://www.linkedin.com/jobs/search/?location=Netherlands" className="font-bold underline">
              LinkedIn
            </a>{" "}
            or{" "}
            <a href="https://nl.indeed.com/jobs?q=english" className="font-bold underline">
              Indeed Netherlands
            </a>
            .
          </li>
          <li>Badges appear next to each employer as you scroll. Open a job to see the salary and Dutch-language check.</li>
          <li>Pin the extension (the puzzle icon, then the pin) to reach the register search and settings in one click.</li>
        </ol>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-black">The badges</h2>
        <BadgeSamples />
        <p className="mt-4 font-medium text-gray-700">
          The salary check uses the threshold for highly skilled migrants aged 30 or over (€{amounts.hsm30.toLocaleString("en-US")} gross per month) until you
          pick another one in the extension menu.
        </p>
      </Card>

      <Card>
        <h2 className="mb-3 text-xl font-black">Found a sponsor? Send a CV they expect</h2>
        <p className="mb-4 font-medium leading-relaxed text-gray-800">
          Dutch employers read CVs in a particular format: short, factual, one or two pages, with a profile at the top. WerkCV builds that format in
          English, with a live preview. You pay once to download, with no subscription.
        </p>
        <Link
          href="/en/expat-cv-netherlands?utm_source=chrome_extension&utm_campaign=sponsor_checker&utm_content=welcome"
          className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Make a Dutch-format CV in English
        </Link>
      </Card>
    </ExtensionShell>
  );
}
