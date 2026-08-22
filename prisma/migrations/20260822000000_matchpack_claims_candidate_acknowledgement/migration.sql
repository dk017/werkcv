ALTER TABLE "AgencyMatchPack"
  ADD COLUMN "claimVerificationData" JSONB;

ALTER TABLE "AgencyMatchPackRevision"
  ADD COLUMN "claimVerificationData" JSONB;

ALTER TABLE "AgencySubscription"
  ADD COLUMN "legalName" TEXT,
  ADD COLUMN "privacyPolicyUrl" TEXT,
  ADD COLUMN "privacyContactEmail" TEXT;

ALTER TABLE "AgencyTransactionalEmail"
  ADD COLUMN "dedupeKey" TEXT,
  ADD COLUMN "entityType" TEXT,
  ADD COLUMN "entityId" TEXT;

UPDATE "AgencyTransactionalEmail"
SET "dedupeKey" = 'agency:' || "subscriptionId" || ':' || "kind"
WHERE "dedupeKey" IS NULL;

ALTER TABLE "AgencyTransactionalEmail"
  ALTER COLUMN "dedupeKey" SET NOT NULL;

DROP INDEX IF EXISTS "AgencyTransactionalEmail_subscriptionId_kind_key";
CREATE UNIQUE INDEX "AgencyTransactionalEmail_dedupeKey_key" ON "AgencyTransactionalEmail"("dedupeKey");
CREATE INDEX "AgencyTransactionalEmail_entityType_entityId_idx" ON "AgencyTransactionalEmail"("entityType", "entityId");

CREATE TABLE "AgencyCandidateReview" (
  "id" TEXT NOT NULL,
  "subscriptionId" TEXT NOT NULL,
  "matchPackId" TEXT NOT NULL,
  "revisionVersion" INTEGER NOT NULL,
  "snapshotDigest" TEXT NOT NULL,
  "snapshotData" JSONB NOT NULL,
  "candidateEmail" TEXT NOT NULL,
  "recipientOrganization" TEXT NOT NULL,
  "vacancyTitle" TEXT NOT NULL,
  "selectedVariant" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'nl',
  "statementVersion" TEXT NOT NULL DEFAULT 'candidate_acknowledgement_v1',
  "status" TEXT NOT NULL DEFAULT 'draft',
  "tokenHash" TEXT,
  "tokenExpiresAt" TIMESTAMP(3),
  "tokenConsumedAt" TIMESTAMP(3),
  "invitedAt" TIMESTAMP(3),
  "sentAt" TIMESTAMP(3),
  "openedAt" TIMESTAMP(3),
  "respondedAt" TIMESTAMP(3),
  "revokedAt" TIMESTAMP(3),
  "candidateResponse" TEXT,
  "overrideReason" TEXT,
  "overriddenAt" TIMESTAMP(3),
  "overriddenById" TEXT,
  "createdById" TEXT NOT NULL,
  "retentionExpiresAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AgencyCandidateReview_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AgencyCandidateReviewSession" (
  "id" TEXT NOT NULL,
  "reviewId" TEXT NOT NULL,
  "secretHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "revokedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AgencyCandidateReviewSession_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AgencyCandidateReviewSuggestion" (
  "id" TEXT NOT NULL,
  "reviewId" TEXT NOT NULL,
  "targetType" TEXT NOT NULL,
  "targetPath" TEXT NOT NULL,
  "originalValue" TEXT NOT NULL,
  "proposedValue" TEXT NOT NULL,
  "candidateNote" TEXT NOT NULL DEFAULT '',
  "status" TEXT NOT NULL DEFAULT 'pending',
  "resolvedById" TEXT,
  "resolvedAt" TIMESTAMP(3),
  "reviewerNote" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AgencyCandidateReviewSuggestion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AgencyCandidateReviewEvent" (
  "id" TEXT NOT NULL,
  "reviewId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "actorType" TEXT NOT NULL,
  "actorUserId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AgencyCandidateReviewEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AgencyCandidateReview_tokenHash_key" ON "AgencyCandidateReview"("tokenHash");
CREATE UNIQUE INDEX "AgencyCandidateReview_matchPackId_revisionVersion_snapshotD_key" ON "AgencyCandidateReview"("matchPackId", "revisionVersion", "snapshotDigest");
CREATE INDEX "AgencyCandidateReview_matchPackId_status_createdAt_idx" ON "AgencyCandidateReview"("matchPackId", "status", "createdAt");
CREATE INDEX "AgencyCandidateReview_subscriptionId_createdAt_idx" ON "AgencyCandidateReview"("subscriptionId", "createdAt");
CREATE INDEX "AgencyCandidateReview_retentionExpiresAt_status_idx" ON "AgencyCandidateReview"("retentionExpiresAt", "status");
CREATE UNIQUE INDEX "AgencyCandidateReviewSession_secretHash_key" ON "AgencyCandidateReviewSession"("secretHash");
CREATE INDEX "AgencyCandidateReviewSession_reviewId_expiresAt_idx" ON "AgencyCandidateReviewSession"("reviewId", "expiresAt");
CREATE INDEX "AgencyCandidateReviewSuggestion_reviewId_status_idx" ON "AgencyCandidateReviewSuggestion"("reviewId", "status");
CREATE INDEX "AgencyCandidateReviewEvent_reviewId_createdAt_idx" ON "AgencyCandidateReviewEvent"("reviewId", "createdAt");
CREATE INDEX "AgencyCandidateReviewEvent_type_createdAt_idx" ON "AgencyCandidateReviewEvent"("type", "createdAt");

ALTER TABLE "AgencyCandidateReview" ADD CONSTRAINT "AgencyCandidateReview_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "AgencySubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AgencyCandidateReview" ADD CONSTRAINT "AgencyCandidateReview_matchPackId_fkey" FOREIGN KEY ("matchPackId") REFERENCES "AgencyMatchPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AgencyCandidateReviewSession" ADD CONSTRAINT "AgencyCandidateReviewSession_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "AgencyCandidateReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AgencyCandidateReviewSuggestion" ADD CONSTRAINT "AgencyCandidateReviewSuggestion_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "AgencyCandidateReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AgencyCandidateReviewEvent" ADD CONSTRAINT "AgencyCandidateReviewEvent_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "AgencyCandidateReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
