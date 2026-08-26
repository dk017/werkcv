-- Additive durable meaningful-content state for consumer CVs.
ALTER TABLE "CVDocument"
  ADD COLUMN "hasMeaningfulContent" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "meaningfulContentAt" TIMESTAMP(3),
  ADD COLUMN "meaningfulContentSignals" JSONB,
  ADD COLUMN "publicClaimKey" TEXT;

CREATE UNIQUE INDEX "CVDocument_publicClaimKey_key"
  ON "CVDocument"("publicClaimKey");

CREATE INDEX "CVDocument_userId_agencySubscriptionId_hasMeaningfulContent_idx"
  ON "CVDocument"("userId", "agencySubscriptionId", "hasMeaningfulContent");

CREATE INDEX "CVDocument_meaningfulContentAt_idx"
  ON "CVDocument"("meaningfulContentAt");

-- Server-side first-transition events use a deterministic key. Existing
-- browser events remain readable with a NULL key and are not rewritten.
ALTER TABLE "AnalyticsEvent"
  ADD COLUMN "dedupeKey" TEXT;

CREATE UNIQUE INDEX "AnalyticsEvent_dedupeKey_key"
  ON "AnalyticsEvent"("dedupeKey");
