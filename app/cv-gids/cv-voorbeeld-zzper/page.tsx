import type { Metadata } from "next";
import ZzpCvGuide, { ZZP_CV_GUIDE_META } from "@/components/seo/ZzpCvGuide";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: ZZP_CV_GUIDE_META.title,
  description: ZZP_CV_GUIDE_META.description,
  path: ZZP_CV_GUIDE_META.path,
  type: "article",
  keywords: ZZP_CV_GUIDE_META.keywords,
});

export default function Page() {
  return <ZzpCvGuide />;
}
