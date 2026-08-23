import Footer from "@/components/Footer";
import type { UiLanguage } from "@/lib/ui-language";

export default function PublicFooter({
  locale = "nl",
  product = "personal",
}: {
  locale?: UiLanguage;
  product?: "personal" | "matchpack";
}) {
  return <Footer uiLanguage={locale} product={product} variant="brand" />;
}
