import type { Metadata } from "next";
import EnglishCvGuide, { ENGLISH_CV_GUIDE_META } from "@/components/seo/EnglishCvGuide";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: ENGLISH_CV_GUIDE_META.title,
  description: ENGLISH_CV_GUIDE_META.description,
  path: ENGLISH_CV_GUIDE_META.path,
  type: "article",
  keywords: ENGLISH_CV_GUIDE_META.keywords,
});

export default function EngelsCvTemplatePage() {
  return <EnglishCvGuide />;
}
