import type { Metadata } from "next";
import { SponsorToolPage } from "@/components/sponsor/SponsorPages";
import { buildEnglishMetadata } from "@/app/en/metadata";

// The register is held in memory and read at request time, never during the build.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildEnglishMetadata({
  title: "Netherlands Visa Sponsor Checker: Is the Employer an IND Recognised Sponsor?",
  description:
    "Check whether an employer is a recognised sponsor (erkend referent) on the IND public register. Search by name or KvK number. Free, no account. For highly skilled migrants and other work permits.",
  path: "/en/netherlands-visa-sponsor-checker",
  nlPath: "/tools/erkend-referent-check",
  keywords: ["netherlands visa sponsor checker", "recognised sponsor netherlands", "recognized sponsor netherlands", "IND sponsor list", "erkend referent check", "highly skilled migrant sponsor"],
});

export default function NetherlandsVisaSponsorCheckerPage() {
  return <SponsorToolPage locale="en" />;
}
