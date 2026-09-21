import type { Metadata } from "next";
import AiCvGuidePage from "@/components/seo/AiCvGuidePage";
export const metadata: Metadata = { title: "CV maken met AI: Nederlands cv zonder abonnement | WerkCV", description: "Bekijk hoe je echte ervaring omzet in een duidelijk Nederlands cv. Voorbeelden, schrijftips en een volledige preview. Gratis beginnen, PDF eenmalig betaald.", alternates: { canonical: "/cv-maken-met-ai", languages: { nl: "/cv-maken-met-ai", en: "/en/ai-cv-builder" } } };
export default function Page() { return <AiCvGuidePage locale="nl" kind="builder" />; }
