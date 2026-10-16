import AiAssistantPage from "@/components/ai-assistant/AiAssistantPage";
import { buildEnglishMetadata } from "@/app/en/metadata";

export const metadata = buildEnglishMetadata({
  title: "WerkCV in your AI assistant (MCP connector)",
  description: "Add the WerkCV connector to Claude or another AI assistant: check your CV against Dutch hiring norms, compare it with a vacancy and open it in the editor.",
  path: "/en/ai-assistant",
  nlPath: "/ai-assistent",
  keywords: ["werkcv mcp", "cv check mcp server", "dutch cv ai assistant", "claude cv connector"],
});

export default function Page() {
  return <AiAssistantPage locale="en" />;
}
