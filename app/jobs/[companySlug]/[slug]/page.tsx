import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import PublicJobDetailPage from "@/components/jobs/PublicJobDetailPage";
import { getJobPage } from "@/lib/jobs/data";
import { descriptionExcerpt } from "@/lib/jobs/format";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

type PageProps = {
  params: Promise<{ companySlug: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { companySlug, slug } = await params;
  const result = await getJobPage(companySlug, slug);

  if (!result) {
    return { title: "Job not found | WerkCV.nl" };
  }

  const job = result.job;
  const canonicalPath = result.redirectTo || job.routePath;

  return {
    title: `${job.title} at ${job.companyName} | WerkCV`,
    description: descriptionExcerpt(job.excerpt || job.descriptionText, 160),
    alternates: {
      canonical: `https://werkcv.nl${canonicalPath}`,
    },
    openGraph: {
      title: `${job.title} at ${job.companyName} | WerkCV`,
      description: descriptionExcerpt(job.excerpt || job.descriptionText, 160),
      url: `https://werkcv.nl${canonicalPath}`,
      type: "article",
      locale: "en_NL",
    },
  };
}

export default async function PublicJobPage({ params }: PageProps) {
  const { companySlug, slug } = await params;
  const result = await getJobPage(companySlug, slug);

  if (!result) {
    notFound();
  }

  if (result.redirectTo) {
    permanentRedirect(result.redirectTo);
  }

  return <PublicJobDetailPage result={result} />;
}

