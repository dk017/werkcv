import type { Metadata } from "next";
import AiCvGuidePage from "@/components/seo/AiCvGuidePage";
export const metadata: Metadata = { title: "CV maken met ChatGPT: veilig stappenplan | WerkCV", description: "Gebruik ChatGPT voor sterkere CV-tekst zonder ervaring, getallen of vaardigheden te verzinnen.", alternates: { canonical: "/cv-gids/cv-maken-met-chatgpt", languages: { nl: "/cv-gids/cv-maken-met-chatgpt", en: "/en/guides/create-cv-with-chatgpt" } } };
export default function Page() { return <AiCvGuidePage locale="nl" kind="chatgpt" />; }
