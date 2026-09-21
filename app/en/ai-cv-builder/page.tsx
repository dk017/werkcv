import type { Metadata } from "next";
import AiCvGuidePage from "@/components/seo/AiCvGuidePage";
export const metadata: Metadata = { title: "AI CV Builder for Jobs in the Netherlands | WerkCV", description: "Turn real experience into clear CV writing. Explore complete examples, writing guidance and a full preview. Start free; a one-time payment unlocks the PDF.", alternates: { canonical: "/en/ai-cv-builder", languages: { nl: "/cv-maken-met-ai", en: "/en/ai-cv-builder" } } };
export default function Page() { return <AiCvGuidePage locale="en" kind="builder" />; }
