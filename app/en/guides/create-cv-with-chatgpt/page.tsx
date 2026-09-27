import type { Metadata } from "next";
import ChatGptCvGuide from "@/components/seo/ChatGptCvGuide";
import { buildEnglishMetadata } from "@/app/en/metadata";
import { CHATGPT_GUIDE_EN } from "@/lib/chatgpt-guide/content";

export const metadata: Metadata = buildEnglishMetadata({
  title: "Using ChatGPT for Your CV in the Netherlands: Tested Prompts and Pitfalls",
  description:
    "We had ChatGPT write 24 English CVs for jobs in the Netherlands. See what went wrong, copy prompts that fixed it, learn what Dutch employers think and check your text for free.",
  path: "/en/guides/create-cv-with-chatgpt",
  nlPath: "/cv-gids/cv-maken-met-chatgpt",
  type: "article",
  keywords: ["chatgpt cv netherlands", "create cv with chatgpt", "chatgpt resume prompt", "ai cv netherlands", "chatgpt cv check"],
});

export default function Page() {
  return <ChatGptCvGuide content={CHATGPT_GUIDE_EN} />;
}
