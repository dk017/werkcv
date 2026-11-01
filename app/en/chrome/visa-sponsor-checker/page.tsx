import type { Metadata } from "next";
import Link from "next/link";
import { buildEnglishMetadata } from "@/app/en/metadata";
import { thresholdsFor } from "@/lib/sponsor/thresholds";
import { AddToChromeButton, BadgeSamples, Card, ExtensionShell } from "./ExtensionShell";

export const metadata: Metadata = buildEnglishMetadata({
  title: "Netherlands Visa Sponsor Checker for Chrome: IND Recognised Sponsors on Job Ads",
  description:
    "Free Chrome extension that marks which employers on LinkedIn and Indeed Netherlands are IND recognised sponsors, checks the advertised salary against the highly skilled migrant threshold and flags Dutch-language requirements. No account.",
  path: "/en/chrome/visa-sponsor-checker",
  keywords: ["visa sponsor checker chrome extension", "IND recognised sponsor", "kennismigrant", "highly skilled migrant", "erkend referent", "netherlands visa sponsorship jobs"],
});

const permissions = [
  { name: "storage", why: "Keeps your settings and the copy of the IND register on your computer." },
  { name: "alarms", why: "Checks once a day whether werkcv.nl has a newer copy of the register." },
  { name: "LinkedIn and Indeed Netherlands", why: "Shows the badges and the job card while you browse job listings there. The extension does nothing on other LinkedIn pages." },
  { name: "activeTab and scripting", why: "Only when you click “Check this page” in the menu: reads the job posting on the tab you are looking at." },
];

const faqs = [
  {
    q: "Is a green badge a guarantee that the employer will sponsor my visa?",
    a: "No. It means the employer is a recognised sponsor, so it can apply for a highly skilled migrant permit for you. Whether it sponsors a particular job is up to the employer, and the salary and other IND conditions still apply.",
  },
  {
    q: "Why does a big brand show “Possible sponsor”?",
    a: "The register lists legal names, such as “Vanderlande Industries B.V.”, while job sites show the brand. When the names differ, the extension shows the registered companies it found and leaves the final check to you. Recognition is per legal entity, so the company in your contract has to be on the list.",
  },
  {
    q: "How current is the register?",
    a: "The IND updates its public register about once a month. The extension ships with a copy and checks werkcv.nl for a newer one every day. The register date is shown in the menu.",
  },
  {
    q: "Does it work in Edge or Brave?",
    a: "It is built for Chrome and uses only standard extension features, so it also runs in Edge and Brave when installed from the Chrome Web Store. It needs no Google sign-in.",
  },
];

export default function VisaSponsorCheckerExtensionPage() {
  const { year, amounts } = thresholdsFor();
  const euro = (amount: number) => `€${amount.toLocaleString("en-US")}`;
  return (
    <ExtensionShell>
      <Card>
        <p className="mb-3 inline-block border-2 border-black bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">Chrome extension</p>
        <h1 className="mb-4 text-3xl font-black text-black sm:text-4xl">Netherlands Visa Sponsor Checker</h1>
        <p className="mb-6 text-lg font-medium leading-relaxed text-gray-800">
          See which employers are IND recognised sponsors (erkende referenten) while you browse jobs on LinkedIn and Indeed Netherlands. The
          extension also compares the advertised salary with the highly skilled migrant threshold and flags jobs that ask for Dutch.
        </p>
        <AddToChromeButton content="support_page" />
        <p className="mt-4 text-sm font-medium text-gray-600">Free. No account. Matching runs in your browser.</p>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-black">What the badges mean</h2>
        <BadgeSamples />
        <p className="mt-4 font-medium text-gray-700">Click a badge to see the registered legal names and KvK numbers, search the IND register, or report a wrong match.</p>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-black">On the open job</h2>
        <ul className="list-disc space-y-2 pl-6 font-medium text-gray-800">
          <li>The sponsor status, with the legal names found.</li>
          <li>
            The advertised salary against the threshold you choose. The IND amounts for {year} are {euro(amounts.hsm30)} gross per month (30 or over), {euro(amounts.hsmUnder30)} (under 30)
            and {euro(amounts.reduced)} (reduced criterion), excluding holiday allowance.
          </li>
          <li>Whether the advert asks for Dutch, says Dutch is a plus, or is written in English with no Dutch requirement.</li>
        </ul>
        <p className="mt-4 font-medium text-gray-700">
          On another job site, open the extension menu and click “Check this page”. It reads the job posting data that most career sites publish.
        </p>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-black">Permissions</h2>
        <dl className="space-y-3">
          {permissions.map((permission) => (
            <div key={permission.name}>
              <dt className="font-black">{permission.name}</dt>
              <dd className="font-medium text-gray-700">{permission.why}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 font-medium text-gray-700">
          Nothing about the jobs you view is sent to WerkCV or anyone else. Details are on the{" "}
          <Link href="/en/chrome/visa-sponsor-checker/privacy" className="font-bold underline">
            privacy page
          </Link>
          .
        </p>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-black">Questions</h2>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="mb-1 font-black">{faq.q}</h3>
              <p className="font-medium leading-relaxed text-gray-800">{faq.a}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-xl font-black">Without the extension</h2>
        <p className="mb-4 font-medium text-gray-800">You can search the same register on werkcv.nl by name or KvK number, or browse it from A to Z.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/en/netherlands-visa-sponsor-checker" className="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-yellow-100">
            Sponsor checker
          </Link>
          <Link href="/en/netherlands-visa-sponsor-list" className="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-yellow-100">
            Recognised sponsor list
          </Link>
          <Link href="/en/expat-cv-netherlands" className="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-yellow-100">
            Dutch-format CV in English
          </Link>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-600">Questions or a wrong match: contact@werkcv.nl.</p>
      </Card>
    </ExtensionShell>
  );
}
