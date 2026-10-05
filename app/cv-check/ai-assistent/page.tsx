import type { Metadata } from "next";
import CvCheckAssistant from "@/components/cv-check/CvCheckAssistant";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "Gratis cv-check in Claude: zo verbind je WerkCV",
  description:
    "Verbind WerkCV met Claude en laat je cv in een gesprek controleren op Nederlandse regels of naast een vacature leggen. Zonder account, er wordt niets opgeslagen. Stappen, voorbeelden en privacy.",
  path: "/cv-check/ai-assistent",
  keywords: ["cv check claude", "cv checken met claude", "claude connector cv", "mcp cv check", "cv check ai assistent"],
});

export default function CvCheckAssistantPage() {
  return <CvCheckAssistant locale="nl" />;
}
