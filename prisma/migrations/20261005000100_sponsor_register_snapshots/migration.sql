-- One row per monthly update of the IND register of recognised sponsors (work and highly skilled migrants).
-- Kept so a later page can show which sponsors were added since the previous update.
CREATE TABLE "SponsorRegisterSnapshot" (
  "id" TEXT NOT NULL,
  "registerDate" TEXT NOT NULL,
  "rowCount" INTEGER NOT NULL,
  "entries" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SponsorRegisterSnapshot_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "SponsorRegisterSnapshot_registerDate_key" ON "SponsorRegisterSnapshot"("registerDate");
