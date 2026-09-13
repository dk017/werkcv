import type { Metadata } from "next";
import AiCvGuidePage from "@/components/seo/AiCvGuidePage";
export const metadata: Metadata = { title: "CV maken met AI en feitencontrole | WerkCV", description: "Verbeter je profiel en werkervaring met AI. Vergelijk elke suggestie, controleer feiten en accepteer alleen wat klopt.", alternates: { canonical: "/cv-maken-met-ai", languages: { nl: "/cv-maken-met-ai", en: "/en/ai-cv-builder" } } };
export default function Page() { return <AiCvGuidePage locale="nl" kind="builder" />; }
