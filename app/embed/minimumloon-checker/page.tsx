import type { Metadata } from "next";
import ToolEmbedShell, {
  resolveEmbedOption,
  resolveEmbedTheme,
} from "@/components/embed/ToolEmbedShell";
import MinimumloonCheckerTool from "@/app/tools/minimumloon-checker/MinimumloonCheckerTool";

export const metadata: Metadata = {
  title: "Minimumloon checker embed | WerkCV",
  description: "Embedversie van de WerkCV minimumloon checker.",
  robots: { index: false, follow: false },
};

export default async function MinimumloonCheckerEmbedPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string; cta?: string; footer?: string }>;
}) {
  const { theme, cta, footer } = await searchParams;

  return (
    <ToolEmbedShell
      badge="WordPress embed"
      title="Minimumloon checker 2026"
      description="Een compacte minimumloon-check voor scholieren, starters en werkgevers die het uurloon per leeftijd willen vergelijken."
      toolHref="/tools/minimumloon-checker"
      showCta={resolveEmbedOption(cta, "on")}
      showFooter={resolveEmbedOption(footer, "on")}
      theme={resolveEmbedTheme(theme)}
    >
      <MinimumloonCheckerTool />
    </ToolEmbedShell>
  );
}
