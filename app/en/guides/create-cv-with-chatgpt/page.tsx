import type { Metadata } from "next";
import AiCvGuidePage from "@/components/seo/AiCvGuidePage";
export const metadata: Metadata = { title: "Create a CV with ChatGPT Without Invented Facts | WerkCV", description: "A practical workflow for using ChatGPT on your CV while checking evidence, numbers, employers and skills.", alternates: { canonical: "/en/guides/create-cv-with-chatgpt", languages: { nl: "/cv-gids/cv-maken-met-chatgpt", en: "/en/guides/create-cv-with-chatgpt" } } };
export default function Page() { return <AiCvGuidePage locale="en" kind="chatgpt" />; }
