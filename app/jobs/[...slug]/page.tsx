import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import PublicJobDetailPage from "@/components/jobs/PublicJobDetailPage";
import PublicJobListingPage from "@/components/jobs/PublicJobListingPage";
import { getJobListingPageByPath, getJobPage } from "@/lib/jobs/data";
import { descriptionExcerpt } from "@/lib/jobs/format";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug.length === 1) {
    const result = await getJobListingPageByPath(`/jobs/${slug[0]}`);

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

  if (slug.length === 2) {
    const result = await getJobPage(slug[0], slug[1]);

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

  return { title: "Jobs page not found | WerkCV.nl" };
}

export default async function JobsCatchAllPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug.length === 1) {
    const result = await getJobListingPageByPath(`/jobs/${slug[0]}`);

    if (!result || !result.meetsThresholds) {
      notFound();
    }

    return <PublicJobListingPage result={result} />;
  }

  if (slug.length === 2) {
    const result = await getJobPage(slug[0], slug[1]);

    if (!result) {
      notFound();
    }

    if (result.redirectTo) {
      permanentRedirect(result.redirectTo);
    }

    return <PublicJobDetailPage result={result} />;
  }

  notFound();
}
