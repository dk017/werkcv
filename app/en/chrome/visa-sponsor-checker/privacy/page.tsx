import type { Metadata } from "next";
import Link from "next/link";
import { buildEnglishMetadata } from "@/app/en/metadata";
import { Card, ExtensionShell } from "../ExtensionShell";

export const metadata: Metadata = buildEnglishMetadata({
  title: "Privacy: Netherlands Visa Sponsor Checker Chrome extension",
  description: "How the Netherlands Visa Sponsor Checker extension handles data: matching runs in your browser, no account, no browsing history collected.",
  path: "/en/chrome/visa-sponsor-checker/privacy",
  keywords: ["visa sponsor checker privacy", "chrome extension privacy"],
});

export default function VisaSponsorCheckerPrivacyPage() {
  return (
    <ExtensionShell>
      <Card>
        <h1 className="mb-2 text-3xl font-black text-black">Privacy: Netherlands Visa Sponsor Checker</h1>
        <p className="mb-8 text-sm font-medium text-gray-500">Last updated: November 2026</p>

        <div className="space-y-6 text-black">
          <section>
            <h2 className="mb-2 text-lg font-black">In short</h2>
            <p className="font-medium leading-relaxed">
              The extension checks employer names against a copy of the IND public register that is stored in your browser. The names of the
              employers and jobs you look at are not sent to WerkCV or to anyone else. There is no account and no sign-in.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-black">What stays on your computer</h2>
            <ul className="list-disc space-y-1 pl-6 font-medium">
              <li>The copy of the IND register (employer names and KvK numbers, which the IND publishes).</li>
              <li>Your settings: the salary threshold you chose, whether badges are shown, and the “only sponsors” filter.</li>
              <li>The dates on which sponsor badges were shown, at most the last ten, so the menu can ask for a rating once.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-black">What is sent, and when</h2>
            <ul className="list-disc space-y-2 pl-6 font-medium">
              <li>
                Once a day the extension downloads the latest register copy from werkcv.nl. Like any web request, this reaches our server with your IP
                address and browser version; it contains nothing about the pages you visited.
              </li>
              <li>
                If LinkedIn or Indeed changes its layout so that no employers can be read on a results page, the extension sends a count to werkcv.nl,
                at most once a day per site: the event name, the site (LinkedIn or Indeed) and the extension version. No page address, job, employer or
                identifier.
              </li>
              <li>
                When you click “Report a wrong match”, your email program opens a message to contact@werkcv.nl with the employer name as shown, its
                LinkedIn page name and the matched KvK numbers. Nothing is sent unless you send that email.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-black">What the extension never does</h2>
            <ul className="list-disc space-y-1 pl-6 font-medium">
              <li>Collect your browsing history, searches or the jobs you view.</li>
              <li>Read pages other than job listings on LinkedIn and Indeed Netherlands, except the tab you choose with “Check this page”.</li>
              <li>Show adverts, change links or add promotion to the job sites.</li>
              <li>Sell or share data. It runs no code downloaded from the internet; the daily download is a data file only.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-black">Links to werkcv.nl</h2>
            <p className="font-medium leading-relaxed">
              The extension menu and the welcome page link to werkcv.nl. When you follow such a link, the{" "}
              <Link href="/en/privacy" className="font-bold underline">
                WerkCV privacy policy
              </Link>{" "}
              applies to your visit.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-black">Contact</h2>
            <p className="font-medium leading-relaxed">Questions or requests: contact@werkcv.nl.</p>
          </section>
        </div>
      </Card>
    </ExtensionShell>
  );
}
