import type { Metadata } from "next";
import StudentCvGuide, { STUDENT_CV_GUIDE_META } from "@/components/seo/StudentCvGuide";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: STUDENT_CV_GUIDE_META.title,
  description: STUDENT_CV_GUIDE_META.description,
  path: STUDENT_CV_GUIDE_META.path,
  type: "article",
  keywords: STUDENT_CV_GUIDE_META.keywords,
});

export default function CvMakenStudentPage() {
  return <StudentCvGuide />;
}
