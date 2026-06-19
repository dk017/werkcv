import { templateList } from "@/lib/templates/registry";
import TemplateGallery from "@/app/templates/gallery";
import { buildEnglishMetadata } from "../metadata";
import { cookies } from "next/headers";
import { normalizeStartSource, PENDING_START_SOURCE_COOKIE, readEncodedStartSource } from "@/lib/start-source";

export const metadata = buildEnglishMetadata({
  title: "English CV Templates for Jobs in the Netherlands",
  description:
    "Compare ATS-friendly CV templates in English for jobs in the Netherlands. Start free, switch templates later, and download a Dutch-market A4 PDF when ready.",
  path: "/en/templates",
  nlPath: "/templates",
  keywords: [
    "english cv templates netherlands",
    "dutch cv template english",
    "expat cv template netherlands",
    "ats cv template english",
    "cv templates for netherlands jobs",
  ],
});

export default async function EnglishTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ startSource?: string }>;
}) {
  const { startSource } = await searchParams;
  const cookieStore = await cookies();
  const resolvedStartSource =
    normalizeStartSource(startSource) ||
    readEncodedStartSource(cookieStore.get(PENDING_START_SOURCE_COOKIE)?.value) ||
    undefined;
  return (
    <main id="quick-start">
      <TemplateGallery templates={templateList} uiLanguage="en" initialStartSource={resolvedStartSource} />
    </main>
  );
}
