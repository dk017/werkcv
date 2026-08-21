-- Add explicit Agency content-retention metadata and non-content deletion receipts.
ALTER TABLE "AgencySubscription"
  ADD COLUMN "retentionDays" INTEGER NOT NULL DEFAULT 90,
  ADD COLUMN "retentionPolicySetAt" TIMESTAMP(3),
  ADD COLUMN "retentionUpdatedAt" TIMESTAMP(3);

ALTER TABLE "AgencyMatchPack"
  ADD COLUMN "retentionExpiresAt" TIMESTAMP(3);

CREATE TABLE "AgencyDeletionReceipt" (
  "id" TEXT NOT NULL,
  "subscriptionId" TEXT NOT NULL,
  "actorUserId" TEXT,
  "reason" TEXT NOT NULL,
  "matchPacksDeleted" INTEGER NOT NULL DEFAULT 0,
  "revisionsDeleted" INTEGER NOT NULL DEFAULT 0,
  "cvDocumentsDeleted" INTEGER NOT NULL DEFAULT 0,
  "templatesDeleted" INTEGER NOT NULL DEFAULT 0,
  "teamMembersDeleted" INTEGER NOT NULL DEFAULT 0,
  "retentionDays" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "AgencyDeletionReceipt_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AgencyMatchPack_retentionExpiresAt_status_idx"
  ON "AgencyMatchPack"("retentionExpiresAt", "status");

CREATE INDEX "AgencyDeletionReceipt_subscriptionId_createdAt_idx"
  ON "AgencyDeletionReceipt"("subscriptionId", "createdAt");

ALTER TABLE "AgencyDeletionReceipt"
  ADD CONSTRAINT "AgencyDeletionReceipt_subscriptionId_fkey"
  FOREIGN KEY ("subscriptionId") REFERENCES "AgencySubscription"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
