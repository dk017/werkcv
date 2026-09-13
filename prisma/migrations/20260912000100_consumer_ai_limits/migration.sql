CREATE TABLE "ConsumerAiAttempt" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "accountKey" TEXT NOT NULL,
  "documentKey" TEXT NOT NULL,
  "requestId" TEXT NOT NULL,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "leaseUntil" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX "ConsumerAiAttempt_accountKey_requestId_key" ON "ConsumerAiAttempt"("accountKey", "requestId");
CREATE INDEX "ConsumerAiAttempt_accountKey_startedAt_idx" ON "ConsumerAiAttempt"("accountKey", "startedAt");
CREATE INDEX "ConsumerAiAttempt_leaseUntil_idx" ON "ConsumerAiAttempt"("leaseUntil");
