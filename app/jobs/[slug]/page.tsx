import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicJobListingPage from "@/components/jobs/PublicJobListingPage";
import { getJobListingPageByPath } from "@/lib/jobs/data";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getJobListingPageByPath(`/jobs/${slug}`);

  if (!result || !result.meetsThresholds) {
    return { title: "Jobs page not found | WerkCV.nl" };
  }

  return {
    title: result.page.metaTitle,
    description: result.page.metaDesc,
    alternates: {
      canonical: `https://werkcv.nl${result.page.path}`,
    },
    robots: {
      index: result.page.isIndexable,
      follow: result.page.isIndexable,
    },
    openGraph: {
      title: result.page.metaTitle,
      description: result.page.metaDesc,
      url: `https://werkcv.nl${result.page.path}`,
      type: "website",
      locale: "en_NL",
    },
  };
}

export default async function EnglishJobsListingPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getJobListingPageByPath(`/jobs/${slug}`);

  if (!result || !result.meetsThresholds) {
    notFound();
  }

  return <PublicJobListingPage result={result} />;
}

