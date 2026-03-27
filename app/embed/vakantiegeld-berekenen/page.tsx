import type { Metadata } from "next";
import ToolEmbedShell, {
  resolveEmbedOption,
  resolveEmbedTheme,
} from "@/components/embed/ToolEmbedShell";
import VakantiegeldTool from "@/app/tools/vakantiegeld-berekenen/VakantiegeldTool";

export const metadata: Metadata = {
  title: "Vakantiegeld calculator embed | WerkCV.nl",
  description: "Embedversie van de WerkCV vakantiegeld calculator.",
  robots: { index: false, follow: false },
};

export default async function VakantiegeldBerekenenEmbedPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string; cta?: string; footer?: string }>;
}) {
  const { theme, cta, footer } = await searchParams;

  return (
    <ToolEmbedShell
      badge="WordPress embed"
      title="Vakantiegeld berekenen"
      description="Laat bezoekers snel hun bruto vakantiegeld indicatie checken op basis van salaris, maanden en percentage."
      toolHref="/tools/vakantiegeld-berekenen"
      showCta={resolveEmbedOption(cta, "on")}
      showFooter={resolveEmbedOption(footer, "on")}
      theme={resolveEmbedTheme(theme)}
    >
      <VakantiegeldTool />
    </ToolEmbedShell>
  );
}
