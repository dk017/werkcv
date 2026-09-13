import type { Metadata } from "next";
import AiCvGuidePage from "@/components/seo/AiCvGuidePage";
export const metadata: Metadata = { title: "AI CV Builder with Human Review | WerkCV", description: "Improve your profile and experience with AI, compare every suggestion and accept only changes you have checked.", alternates: { canonical: "/en/ai-cv-builder", languages: { nl: "/cv-maken-met-ai", en: "/en/ai-cv-builder" } } };
export default function Page() { return <AiCvGuidePage locale="en" kind="builder" />; }
