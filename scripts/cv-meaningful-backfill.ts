import "dotenv/config";
import { prisma } from "../lib/prisma";
import { getMeaningfulCvState } from "../lib/cv-meaningful";

const execute = process.argv.includes("--execute");
const batchSize = 250;

/** One-time additive backfill; it never creates or rewrites analytics events. */
async function main() {
  let cursor: string | undefined;
  let inspected = 0;
  let marked = 0;

  while (true) {
    const documents = await prisma.cVDocument.findMany({
      // Backfill only consumer documents. Agency data must not change the
      // consumer follow-up funnel and remains available for its own reporting.
      where: { agencySubscriptionId: null, hasMeaningfulContent: false },
      select: { id: true, data: true },
      orderBy: { id: "asc" },
      take: batchSize,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    });
    if (documents.length === 0) break;

    for (const document of documents) {
      inspected += 1;
      const state = getMeaningfulCvState(document.data);
      if (!state.isMeaningful) continue;
      marked += 1;
      if (execute) {
        await prisma.cVDocument.updateMany({
          where: { id: document.id, agencySubscriptionId: null, hasMeaningfulContent: false },
          data: {
            hasMeaningfulContent: true,
            meaningfulContentAt: new Date(),
            meaningfulContentSignals: {
              profileSummary: state.signals.profileSummary,
              experience: state.signals.experience,
              education: state.signals.education,
              skills: state.signals.skills,
              languages: state.signals.languages,
              otherSections: state.signals.otherSections,
            },
          },
        });
      }
    }

    cursor = documents[documents.length - 1]?.id;
    if (documents.length < batchSize) break;
  }

  console.log(JSON.stringify({ execute, inspected, marked }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
