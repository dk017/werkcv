import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { getMeaningfulCvState } from "@/lib/cv-meaningful";

const execute = process.argv.includes("--execute");
const batchSize = 250;

async function main() {
  let cursor: string | undefined;
  let inspected = 0;
  let marked = 0;

  while (true) {
    const documents = await prisma.cVDocument.findMany({
      where: { agencySubscriptionId: null, hasMeaningfulContent: false },
      select: { id: true, data: true, updatedAt: true },
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
            meaningfulContentAt: document.updatedAt,
            meaningfulContentSignals: {
              schemaVersion: 2,
              source: "historical_backfill",
              ...state.signals,
            },
          },
        });
      }
    }

    cursor = documents.at(-1)?.id;
    if (documents.length < batchSize) break;
  }

  console.log(JSON.stringify({ execute, inspected, marked }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
