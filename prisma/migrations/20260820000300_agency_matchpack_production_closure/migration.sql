-- MatchPack source traceability, immutable approval metadata and server-derived outcomes.
ALTER TABLE "AgencyMatchPack"
  ADD COLUMN "sourceText" TEXT,
  ADD COLUMN "sourceMap" JSONB,
  ADD COLUMN "approvalData" JSONB,
  ADD COLUMN "approvedRevisionVersion" INTEGER,
  ADD COLUMN "approvedSnapshotDigest" TEXT,
  ADD COLUMN "firstExportedAt" TIMESTAMP(3),
  ADD COLUMN "correctionsCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "unsupportedClaimsCaught" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "clientOutcome" TEXT NOT NULL DEFAULT 'unknown',
  ADD COLUMN "clientOutcomeRecordedAt" TIMESTAMP(3),
  ADD COLUMN "clientOutcomeRecordedById" TEXT,
  ADD COLUMN "productFeedbackData" JSONB;

ALTER TABLE "AgencySubscription"
  ADD COLUMN "onboardingExampleViewedAt" TIMESTAMP(3),
  ADD COLUMN "excludeFromProductMetrics" BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE "AgencyTransactionalEmail" (
  "id" TEXT NOT NULL,
  "subscriptionId" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "recipientEmail" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'nl',
  "status" TEXT NOT NULL DEFAULT 'pending',
  "attemptCount" INTEGER NOT NULL DEFAULT 0,
  "claimedAt" TIMESTAMP(3),
  "sentAt" TIMESTAMP(3),
  "lastErrorCode" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "AgencyTransactionalEmail_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AgencyTransactionalEmail_subscriptionId_kind_key"
  ON "AgencyTransactionalEmail"("subscriptionId", "kind");

CREATE INDEX "AgencyTransactionalEmail_status_createdAt_idx"
  ON "AgencyTransactionalEmail"("status", "createdAt");

ALTER TABLE "AgencyTransactionalEmail"
  ADD CONSTRAINT "AgencyTransactionalEmail_subscriptionId_fkey"
  FOREIGN KEY ("subscriptionId") REFERENCES "AgencySubscription"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
