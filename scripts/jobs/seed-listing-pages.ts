import "dotenv/config";
import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { jobsListingPageSeeds } from "../../lib/jobs/listing-pages";
async function main() {
  const dryRun = process.argv.includes("--dry-run");

  if (dryRun) {
    console.log("Dry run: curated JobListingPage seeds");
    console.table(
      jobsListingPageSeeds.map((seed) => ({
        path: seed.path,
        locale: seed.locale,
        kind: seed.kind,
        min_jobs: seed.minJobCount,
        min_companies: seed.minCompanyCount,
        cta: seed.primaryCtaHref,
      }))
    );
    return;
  }

  let created = 0;
  let updated = 0;

  for (const seed of jobsListingPageSeeds) {
    const existing = await prisma.jobListingPage.findUnique({
      where: { path: seed.path },
      select: { id: true },
    });

    await prisma.jobListingPage.upsert({
      where: { path: seed.path },
      create: {
        slug: seed.slug,
        path: seed.path,
        locale: seed.locale,
        kind: seed.kind,
        title: seed.title,
        heroTitle: seed.heroTitle,
        description: seed.description,
        metaTitle: seed.metaTitle,
        metaDesc: seed.metaDesc,
        introText: seed.introText,
        filters: seed.filters as Prisma.InputJsonValue,
        minJobCount: seed.minJobCount,
        minCompanyCount: seed.minCompanyCount,
        primaryCtaHref: seed.primaryCtaHref,
        primaryCtaLabel: seed.primaryCtaLabel,
        relatedGuideHref: seed.relatedGuideHref,
      },
      update: {
        slug: seed.slug,
        locale: seed.locale,
        kind: seed.kind,
        title: seed.title,
        heroTitle: seed.heroTitle,
        description: seed.description,
        metaTitle: seed.metaTitle,
        metaDesc: seed.metaDesc,
        introText: seed.introText,
        filters: seed.filters as Prisma.InputJsonValue,
        minJobCount: seed.minJobCount,
        minCompanyCount: seed.minCompanyCount,
        primaryCtaHref: seed.primaryCtaHref,
        primaryCtaLabel: seed.primaryCtaLabel,
        relatedGuideHref: seed.relatedGuideHref,
        isActive: true,
      },
    });

    if (existing) {
      updated += 1;
    } else {
      created += 1;
    }
  }

  console.log(`Seeded JobListingPage rows: ${jobsListingPageSeeds.length}`);
  console.table([{ created, updated, total: jobsListingPageSeeds.length }]);
}

main()
  .catch((error) => {
    console.error("Failed to seed JobListingPage rows.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

