import type { Metadata } from "next";
import ChatGptCvGuide from "@/components/seo/ChatGptCvGuide";
import { CHATGPT_LETTER_GUIDE_NL } from "@/lib/chatgpt-guide/letter-content";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "Sollicitatiebrief met ChatGPT: geteste prompt, valkuilen en gratis check | WerkCV",
  description:
    "Wij lieten ChatGPT 24 sollicitatiebrieven schrijven: elke brief begon hetzelfde en de meeste hadden invulvelden. Zo voorkom je dat, met een geteste prompt en een gratis check van je brief.",
  path: "/cv-gids/sollicitatiebrief-met-chatgpt",
  type: "article",
  keywords: ["sollicitatiebrief chatgpt", "motivatiebrief chatgpt", "motivatiebrief ai", "sollicitatiebrief ai", "chatgpt sollicitatiebrief prompt", "motivatiebrief laten schrijven door ai"],
});

export default function Page() {
  return <ChatGptCvGuide content={CHATGPT_LETTER_GUIDE_NL} />;
}
