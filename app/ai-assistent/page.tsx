import AiAssistantPage from "@/components/ai-assistant/AiAssistantPage";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata = buildDutchMetadata({
  title: "WerkCV in je AI-assistent (MCP-koppeling) | WerkCV",
  description: "Voeg de WerkCV-koppeling toe aan Claude of een andere AI-assistent: check je cv volgens Nederlandse normen, vergelijk het met een vacature en open het in de editor.",
  path: "/ai-assistent",
});

export default function Page() {
  return <AiAssistantPage locale="nl" />;
}
