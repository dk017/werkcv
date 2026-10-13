CREATE TABLE "PersonalJobApplication" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "jobKey" TEXT NOT NULL,
  "snapshot" JSONB NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'saved',
  "tailoredCvId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PersonalJobApplication_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "PersonalJobApplication_status_check" CHECK ("status" IN ('saved','applied','interview','offer','rejected')),
  CONSTRAINT "PersonalJobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "PersonalJobApplication_tailoredCvId_fkey" FOREIGN KEY ("tailoredCvId") REFERENCES "CVDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PersonalJobApplication_userId_jobKey_key" ON "PersonalJobApplication"("userId", "jobKey");
CREATE INDEX "PersonalJobApplication_userId_updatedAt_idx" ON "PersonalJobApplication"("userId", "updatedAt");
CREATE INDEX "PersonalJobApplication_tailoredCvId_idx" ON "PersonalJobApplication"("tailoredCvId");
CREATE TABLE "PersonalJobSearchCache" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "jobs" JSONB NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL
);
CREATE TABLE "PersonalJobSearchBudget" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "used" INTEGER NOT NULL DEFAULT 0,
  "expiresAt" TIMESTAMP(3) NOT NULL
);
