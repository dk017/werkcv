-- Store the owner's explicit dismissal of the self-service Agency checklist.
ALTER TABLE "AgencySubscription"
  ADD COLUMN "onboardingDismissedAt" TIMESTAMP(3);
