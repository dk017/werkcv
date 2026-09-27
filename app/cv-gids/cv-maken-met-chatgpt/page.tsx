import type { Metadata } from "next";
import ChatGptCvGuide from "@/components/seo/ChatGptCvGuide";
import { CHATGPT_GUIDE_NL } from "@/lib/chatgpt-guide/content";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "CV maken met ChatGPT: geteste prompts, valkuilen en gratis check | WerkCV",
  description:
    "Wij lieten ChatGPT 24 cv's schrijven: dit ging mis en zo voorkom je het. Geteste Nederlandse prompts, privacytips, wat werkgevers ervan vinden en een gratis check van je tekst.",
  path: "/cv-gids/cv-maken-met-chatgpt",
  type: "article",
  keywords: ["cv maken met chatgpt", "chatgpt cv", "chatgpt cv prompt", "cv laten maken door chatgpt", "chatgpt cv checken"],
  languages: {
    nl: "https://werkcv.nl/cv-gids/cv-maken-met-chatgpt",
    "nl-NL": "https://werkcv.nl/cv-gids/cv-maken-met-chatgpt",
    en: "https://werkcv.nl/en/guides/create-cv-with-chatgpt",
    "en-NL": "https://werkcv.nl/en/guides/create-cv-with-chatgpt",
    "x-default": "https://werkcv.nl/cv-gids/cv-maken-met-chatgpt",
  },
});

export default function Page() {
  return <ChatGptCvGuide content={CHATGPT_GUIDE_NL} />;
}
