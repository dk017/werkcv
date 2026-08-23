-- Add the persisted Personal CV / MatchPack ownership boundary.
-- Backfill is deliberately separate and must be run by
-- scripts/cv-workspace-backfill.ts after an audited dry run.
ALTER TABLE "CVDocument"
  ADD COLUMN "agencySubscriptionId" TEXT;

CREATE INDEX "CVDocument_agencySubscriptionId_updatedAt_idx"
  ON "CVDocument"("agencySubscriptionId", "updatedAt");

CREATE INDEX "CVDocument_userId_agencySubscriptionId_updatedAt_idx"
  ON "CVDocument"("userId", "agencySubscriptionId", "updatedAt");

ALTER TABLE "CVDocument"
  ADD CONSTRAINT "CVDocument_agencySubscriptionId_fkey"
  FOREIGN KEY ("agencySubscriptionId")
  REFERENCES "AgencySubscription"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;
