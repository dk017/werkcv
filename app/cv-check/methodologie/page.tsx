import type { Metadata } from "next";
import CvCheckMethodology from "@/components/cv-check/CvCheckMethodology";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "Zo berekent de WerkCV CV-check je cijfer | Methodologie",
  description:
    "Welke controles de WerkCV CV-check doet, hoe zwaar elk onderdeel meetelt, wat regels en wat AI beoordelen, en wat het cijfer niet zegt.",
  path: "/cv-check/methodologie",
});

export default function CvCheckMethodologyPage() {
  return <CvCheckMethodology locale="nl" />;
}
