import type { Metadata } from "next";
import { SponsorListHub } from "@/components/sponsor/SponsorPages";
import { buildEnglishMetadata } from "@/app/en/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildEnglishMetadata({
  title: "Netherlands Visa Sponsor List: All Recognised Sponsors A–Z (IND Register)",
  description:
    "The full list of recognised sponsors (erkend referenten) for work and highly skilled migrants from the IND public register, A to Z, with legal name and KvK number. Updated monthly.",
  path: "/en/netherlands-visa-sponsor-list",
  nlPath: "/erkende-referenten-lijst",
  keywords: ["netherlands visa sponsor list", "companies that sponsor visa netherlands", "recognised sponsor list netherlands", "IND recognised sponsors list", "highly skilled migrant sponsor list"],
});

export default function NetherlandsVisaSponsorListPage() {
  return <SponsorListHub locale="en" />;
}
