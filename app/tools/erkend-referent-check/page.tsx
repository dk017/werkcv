import type { Metadata } from "next";
import { SponsorToolPage } from "@/components/sponsor/SponsorPages";
import { buildDutchMetadata } from "@/lib/page-metadata";

// The register is held in memory and read at request time, never during the build.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildDutchMetadata({
  title: "Erkend referent check: staat de werkgever in het IND-register?",
  description:
    "Check gratis of een werkgever erkend referent is in het openbaar register van de IND. Zoek op naam of KvK-nummer. Voor kennismigranten en andere werknemers uit het buitenland.",
  path: "/tools/erkend-referent-check",
  keywords: ["erkend referent check", "erkend referent", "erkende referenten", "IND register erkend referent", "kennismigrant werkgever", "is mijn werkgever erkend referent"],
});

export default function ErkendReferentCheckPage() {
  return <SponsorToolPage locale="nl" />;
}
