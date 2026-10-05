import type { Metadata } from "next";
import CvCheckAssistant from "@/components/cv-check/CvCheckAssistant";
import { buildEnglishMetadata } from "@/app/en/metadata";

export const metadata: Metadata = buildEnglishMetadata({
  title: "Free CV Check in Claude: How to Connect WerkCV",
  description:
    "Connect WerkCV to Claude and have your CV checked against Dutch hiring conventions or compared with a vacancy. No account, nothing stored. Steps, examples and privacy.",
  path: "/en/cv-check/ai-assistant",
  nlPath: "/cv-check/ai-assistent",
  keywords: ["cv check claude", "resume check claude connector", "mcp cv checker", "dutch cv check ai assistant"],
});

export default function EnglishCvCheckAssistantPage() {
  return <CvCheckAssistant locale="en" />;
}
