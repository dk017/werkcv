import type { Metadata } from "next";
import { SponsorListHub } from "@/components/sponsor/SponsorPages";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildDutchMetadata({
  title: "Erkende referenten lijst: alle erkend referenten van A tot Z (IND-register)",
  description:
    "De volledige lijst van erkend referenten voor arbeid en kennismigranten uit het openbaar IND-register, van A tot Z, met juridische naam en KvK-nummer. Maandelijks bijgewerkt.",
  path: "/erkende-referenten-lijst",
  keywords: ["erkende referenten lijst", "erkend referent lijst", "IND erkende referenten", "lijst erkend referenten kennismigrant", "erkend referent zoeken"],
});

export default function ErkendeReferentenLijstPage() {
  return <SponsorListHub locale="nl" />;
}
