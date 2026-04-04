import type { Metadata } from "next";
import ToolEmbedShell, {
  resolveEmbedOption,
  resolveEmbedTheme,
} from "@/components/embed/ToolEmbedShell";
import NettoBrutoTool from "@/app/tools/netto-bruto-calculator/NettoBrutoTool";

export const metadata: Metadata = {
  title: "Netto bruto calculator embed | WerkCV",
  description: "Embedversie van de WerkCV netto bruto calculator.",
  robots: { index: false, follow: false },
};

export default async function NettoBrutoCalculatorEmbedPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string; cta?: string; footer?: string }>;
}) {
  const { theme, cta, footer } = await searchParams;

  return (
    <ToolEmbedShell
      badge="WordPress embed"
      title="Netto bruto calculator"
      description="Een compacte embed voor bruto naar netto en netto naar bruto in Nederland, met WerkCV-logica onder de motorkap."
      toolHref="/tools/netto-bruto-calculator"
      showCta={resolveEmbedOption(cta, "on")}
      showFooter={resolveEmbedOption(footer, "on")}
      theme={resolveEmbedTheme(theme)}
    >
      <NettoBrutoTool />
    </ToolEmbedShell>
  );
}
