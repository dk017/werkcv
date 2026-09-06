-- Raise the Agency contract to EUR 99/month and 300 shared credits.
-- This migration is additive and deliberately non-decreasing: custom limits
-- above 300 and historical usage are preserved.

ALTER TABLE "AgencySubscription"
  ALTER COLUMN "monthlyLimit" SET DEFAULT 300;

ALTER TABLE "AgencyUsagePeriod"
  ALTER COLUMN "allowance" SET DEFAULT 300;

UPDATE "AgencySubscription"
SET "monthlyLimit" = 300
WHERE "monthlyLimit" < 300;

UPDATE "AgencyUsagePeriod"
SET "allowance" = 300
WHERE "allowance" < 300
  AND "endsAt" >= CURRENT_TIMESTAMP;
