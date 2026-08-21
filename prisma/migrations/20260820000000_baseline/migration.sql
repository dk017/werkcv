-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('pillar', 'subhub', 'spoke');

-- CreateEnum
CREATE TYPE "JobProvider" AS ENUM ('greenhouse', 'lever', 'ashby', 'workable');

-- CreateEnum
CREATE TYPE "JobSourceStatus" AS ENUM ('research', 'pilot', 'verified', 'paused');

-- CreateEnum
CREATE TYPE "JobEnglishFit" AS ENUM ('high', 'medium', 'low');

-- CreateEnum
CREATE TYPE "JobRemoteMode" AS ENUM ('remote', 'hybrid', 'onsite');

-- CreateEnum
CREATE TYPE "JobLanguageHint" AS ENUM ('english', 'dutch', 'mixed', 'unknown');

-- CreateEnum
CREATE TYPE "JobRoleFamily" AS ENUM ('engineering', 'data', 'product_design', 'sales', 'marketing', 'customer_support', 'customer_success', 'operations', 'finance_accounting', 'hr_people', 'legal_compliance', 'admin_office', 'logistics_supply_chain', 'general_business', 'unknown');

-- CreateEnum
CREATE TYPE "JobSeniority" AS ENUM ('internship', 'graduate', 'junior', 'mid', 'senior', 'lead', 'manager', 'director', 'executive', 'unknown');

-- CreateEnum
CREATE TYPE "JobRecordStatus" AS ENUM ('active', 'expired', 'hidden');

-- CreateEnum
CREATE TYPE "JobListingKind" AS ENUM ('english_speaking_nl', 'without_dutch', 'visa_sponsorship', 'english_speaking_city', 'without_dutch_city', 'role_family_nl', 'starter_nl');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "attribution" JSONB,
    "sourceCluster" TEXT,
    "sourceLocale" TEXT,
    "sourcePath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PilotAccess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PilotAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginCode" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVDocument" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "templateId" TEXT NOT NULL DEFAULT 'professional',
    "colorThemeId" TEXT NOT NULL DEFAULT 'classic-blue',
    "coverLetter" TEXT,
    "coverLetterUpdatedAt" TIMESTAMP(3),
    "attribution" JSONB,
    "sourceCluster" TEXT,
    "sourceLocale" TEXT,
    "startSource" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CVDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyMatchPack" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "vacancyTitle" TEXT,
    "vacancyText" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'nl',
    "sourceFileType" TEXT,
    "sourceTextDigest" TEXT,
    "originalCandidateData" JSONB,
    "candidateData" JSONB NOT NULL,
    "anonymizedData" JSONB NOT NULL,
    "analysis" JSONB NOT NULL,
    "submissionData" JSONB,
    "outcomeData" JSONB,
    "templateId" TEXT NOT NULL DEFAULT 'professional',
    "colorThemeId" TEXT NOT NULL DEFAULT 'classic-blue',
    "agencyTemplateId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'analyzed',
    "cvDocumentId" TEXT,
    "approvedAt" TIMESTAMP(3),
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgencyMatchPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyMatchPackRevision" (
    "id" TEXT NOT NULL,
    "matchPackId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "reason" TEXT NOT NULL DEFAULT 'draft_saved',
    "candidateData" JSONB NOT NULL,
    "submissionData" JSONB NOT NULL,
    "analysis" JSONB NOT NULL,
    "changedFields" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyMatchPackRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyTemplate" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "templateId" TEXT NOT NULL DEFAULT 'professional',
    "colorThemeId" TEXT NOT NULL DEFAULT 'classic-blue',
    "companyName" TEXT,
    "website" TEXT,
    "headerText" TEXT,
    "footerText" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgencyTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cvId" TEXT,
    "product" TEXT NOT NULL,
    "amountCents" INTEGER,
    "currency" TEXT,
    "addons" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "attribution" JSONB,
    "sourceCluster" TEXT,
    "lemonId" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentCheckout" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalCheckoutId" TEXT NOT NULL,
    "cvId" TEXT,
    "email" TEXT,
    "siteHost" TEXT,
    "product" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentCheckout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencySubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planCode" TEXT NOT NULL DEFAULT 'agency',
    "provider" TEXT NOT NULL DEFAULT 'dodo',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "productId" TEXT,
    "externalSubscriptionId" TEXT,
    "externalCustomerId" TEXT,
    "checkoutSessionId" TEXT,
    "companyName" TEXT,
    "website" TEXT,
    "monthlyLimit" INTEGER NOT NULL DEFAULT 50,
    "templateId" TEXT NOT NULL DEFAULT 'professional',
    "colorThemeId" TEXT NOT NULL DEFAULT 'classic-blue',
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "canceledAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgencySubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyTeamMember" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "status" TEXT NOT NULL DEFAULT 'invited',
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgencyTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyUsagePeriod" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "allowance" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyUsagePeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyCvUsage" (
    "id" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "countedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyCvUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyPayment" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "externalPaymentId" TEXT NOT NULL,
    "checkoutSessionId" TEXT,
    "amountCents" INTEGER,
    "currency" TEXT,
    "status" TEXT NOT NULL DEFAULT 'paid',
    "paidAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilePhotoProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "style" TEXT,
    "sourceImageCount" INTEGER NOT NULL DEFAULT 0,
    "generationCount" INTEGER NOT NULL DEFAULT 0,
    "refinementCount" INTEGER NOT NULL DEFAULT 0,
    "images" JSONB,
    "attribution" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfilePhotoProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "cvId" TEXT,
    "orderId" TEXT,
    "path" TEXT,
    "cluster" TEXT,
    "properties" JSONB,
    "attribution" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowupContact" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT,
    "userId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowupContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowupTask" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "reason" TEXT NOT NULL,
    "draftSubject" TEXT,
    "draftBody" TEXT,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "sentAt" TIMESTAMP(3),
    "skippedReason" TEXT,
    "relatedUserId" TEXT,
    "relatedCvId" TEXT,
    "relatedOrderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowupTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailMessage" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "folder" TEXT,
    "uid" INTEGER,
    "uidValidity" INTEGER,
    "fromAddress" TEXT,
    "toAddress" TEXT,
    "subject" TEXT,
    "bodyPreview" TEXT,
    "messageId" TEXT,
    "inReplyTo" TEXT,
    "sentAt" TIMESTAMP(3),
    "receivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailboxSyncState" (
    "id" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "uidValidity" INTEGER,
    "lastUid" INTEGER NOT NULL DEFAULT 0,
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MailboxSyncState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobSource" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companySlug" TEXT NOT NULL,
    "segment" TEXT,
    "city" TEXT,
    "countryCode" TEXT,
    "englishFit" "JobEnglishFit" NOT NULL DEFAULT 'medium',
    "providerHint" TEXT,
    "provider" "JobProvider" NOT NULL,
    "sourceKey" TEXT,
    "apiUrl" TEXT,
    "careersUrl" TEXT NOT NULL,
    "status" "JobSourceStatus" NOT NULL DEFAULT 'research',
    "priority" INTEGER NOT NULL DEFAULT 100,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastFetchedAt" TIMESTAMP(3),
    "lastSuccessfulFetchAt" TIMESTAMP(3),
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT,
    "provider" "JobProvider" NOT NULL,
    "externalId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companySlug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleSlug" TEXT NOT NULL,
    "canonicalSlug" TEXT NOT NULL,
    "routePath" TEXT NOT NULL,
    "locationRaw" TEXT NOT NULL,
    "city" TEXT,
    "citySlug" TEXT,
    "countryCode" TEXT,
    "remoteMode" "JobRemoteMode",
    "employmentType" TEXT,
    "languageHint" "JobLanguageHint" NOT NULL DEFAULT 'unknown',
    "dutchRequired" BOOLEAN,
    "visaHint" BOOLEAN,
    "roleFamily" "JobRoleFamily" NOT NULL DEFAULT 'unknown',
    "seniority" "JobSeniority" NOT NULL DEFAULT 'unknown',
    "isNlRelevant" BOOLEAN NOT NULL DEFAULT false,
    "isEnglishFriendly" BOOLEAN NOT NULL DEFAULT false,
    "isWithoutDutch" BOOLEAN NOT NULL DEFAULT false,
    "status" "JobRecordStatus" NOT NULL DEFAULT 'active',
    "descriptionText" TEXT NOT NULL,
    "excerpt" TEXT,
    "applyUrl" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3),
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "keywords" TEXT[],
    "clusterTags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobListingPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'nl',
    "kind" "JobListingKind" NOT NULL,
    "title" TEXT NOT NULL,
    "heroTitle" TEXT,
    "description" TEXT NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "metaDesc" TEXT NOT NULL,
    "introText" TEXT,
    "filters" JSONB NOT NULL,
    "minJobCount" INTEGER NOT NULL DEFAULT 10,
    "minCompanyCount" INTEGER NOT NULL DEFAULT 5,
    "primaryCtaHref" TEXT,
    "primaryCtaLabel" TEXT,
    "relatedGuideHref" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isIndexable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobListingPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameDutch" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL,
    "parentId" TEXT,
    "sampleCV" JSONB,
    "heroTitle" TEXT,
    "heroText" TEXT,
    "tips" TEXT[],
    "metaTitle" TEXT NOT NULL,
    "metaDesc" TEXT NOT NULL,
    "keywords" TEXT[],
    "siblingIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CVCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "PilotAccess_userId_idx" ON "PilotAccess"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PilotAccess_userId_key" ON "PilotAccess"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");

-- CreateIndex
CREATE INDEX "LoginCode_email_createdAt_idx" ON "LoginCode"("email", "createdAt");

-- CreateIndex
CREATE INDEX "LoginCode_expiresAt_idx" ON "LoginCode"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyMatchPack_cvDocumentId_key" ON "AgencyMatchPack"("cvDocumentId");

-- CreateIndex
CREATE INDEX "AgencyMatchPack_userId_updatedAt_idx" ON "AgencyMatchPack"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "AgencyMatchPack_userId_status_idx" ON "AgencyMatchPack"("userId", "status");

-- CreateIndex
CREATE INDEX "AgencyMatchPackRevision_matchPackId_createdAt_idx" ON "AgencyMatchPackRevision"("matchPackId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyMatchPackRevision_matchPackId_version_key" ON "AgencyMatchPackRevision"("matchPackId", "version");

-- CreateIndex
CREATE INDEX "AgencyTemplate_ownerId_isDefault_idx" ON "AgencyTemplate"("ownerId", "isDefault");

-- CreateIndex
CREATE UNIQUE INDEX "Order_lemonId_key" ON "Order"("lemonId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentCheckout_externalCheckoutId_key" ON "PaymentCheckout"("externalCheckoutId");

-- CreateIndex
CREATE INDEX "PaymentCheckout_provider_createdAt_idx" ON "PaymentCheckout"("provider", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentCheckout_cvId_idx" ON "PaymentCheckout"("cvId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencySubscription_userId_key" ON "AgencySubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencySubscription_externalSubscriptionId_key" ON "AgencySubscription"("externalSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencySubscription_checkoutSessionId_key" ON "AgencySubscription"("checkoutSessionId");

-- CreateIndex
CREATE INDEX "AgencySubscription_status_currentPeriodEnd_idx" ON "AgencySubscription"("status", "currentPeriodEnd");

-- CreateIndex
CREATE INDEX "AgencySubscription_externalCustomerId_idx" ON "AgencySubscription"("externalCustomerId");

-- CreateIndex
CREATE INDEX "AgencyTeamMember_email_status_idx" ON "AgencyTeamMember"("email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyTeamMember_subscriptionId_email_key" ON "AgencyTeamMember"("subscriptionId", "email");

-- CreateIndex
CREATE INDEX "AgencyUsagePeriod_subscriptionId_endsAt_idx" ON "AgencyUsagePeriod"("subscriptionId", "endsAt");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyUsagePeriod_subscriptionId_startsAt_key" ON "AgencyUsagePeriod"("subscriptionId", "startsAt");

-- CreateIndex
CREATE INDEX "AgencyCvUsage_periodId_countedAt_idx" ON "AgencyCvUsage"("periodId", "countedAt");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyCvUsage_periodId_cvId_key" ON "AgencyCvUsage"("periodId", "cvId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyPayment_externalPaymentId_key" ON "AgencyPayment"("externalPaymentId");

-- CreateIndex
CREATE INDEX "AgencyPayment_subscriptionId_paidAt_idx" ON "AgencyPayment"("subscriptionId", "paidAt");

-- CreateIndex
CREATE INDEX "AgencyPayment_checkoutSessionId_idx" ON "AgencyPayment"("checkoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfilePhotoProject_orderId_key" ON "ProfilePhotoProject"("orderId");

-- CreateIndex
CREATE INDEX "ProfilePhotoProject_userId_createdAt_idx" ON "ProfilePhotoProject"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ProfilePhotoProject_status_idx" ON "ProfilePhotoProject"("status");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_event_createdAt_idx" ON "AnalyticsEvent"("event", "createdAt");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_cvId_idx" ON "AnalyticsEvent"("cvId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_orderId_idx" ON "AnalyticsEvent"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "FollowupContact_email_key" ON "FollowupContact"("email");

-- CreateIndex
CREATE INDEX "FollowupContact_status_idx" ON "FollowupContact"("status");

-- CreateIndex
CREATE INDEX "FollowupContact_userId_idx" ON "FollowupContact"("userId");

-- CreateIndex
CREATE INDEX "FollowupTask_status_dueAt_idx" ON "FollowupTask"("status", "dueAt");

-- CreateIndex
CREATE INDEX "FollowupTask_email_idx" ON "FollowupTask"("email");

-- CreateIndex
CREATE INDEX "FollowupTask_type_idx" ON "FollowupTask"("type");

-- CreateIndex
CREATE UNIQUE INDEX "FollowupTask_email_type_relatedCvId_key" ON "FollowupTask"("email", "type", "relatedCvId");

-- CreateIndex
CREATE UNIQUE INDEX "FollowupTask_email_type_relatedOrderId_key" ON "FollowupTask"("email", "type", "relatedOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailMessage_messageId_key" ON "EmailMessage"("messageId");

-- CreateIndex
CREATE INDEX "EmailMessage_email_receivedAt_idx" ON "EmailMessage"("email", "receivedAt");

-- CreateIndex
CREATE INDEX "EmailMessage_direction_receivedAt_idx" ON "EmailMessage"("direction", "receivedAt");

-- CreateIndex
CREATE INDEX "EmailMessage_folder_uid_idx" ON "EmailMessage"("folder", "uid");

-- CreateIndex
CREATE UNIQUE INDEX "MailboxSyncState_folder_key" ON "MailboxSyncState"("folder");

-- CreateIndex
CREATE UNIQUE INDEX "JobSource_slug_key" ON "JobSource"("slug");

-- CreateIndex
CREATE INDEX "JobSource_companySlug_idx" ON "JobSource"("companySlug");

-- CreateIndex
CREATE INDEX "JobSource_provider_status_idx" ON "JobSource"("provider", "status");

-- CreateIndex
CREATE INDEX "JobSource_status_priority_idx" ON "JobSource"("status", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "JobSource_provider_sourceKey_key" ON "JobSource"("provider", "sourceKey");

-- CreateIndex
CREATE UNIQUE INDEX "Job_routePath_key" ON "Job"("routePath");

-- CreateIndex
CREATE INDEX "Job_companySlug_titleSlug_idx" ON "Job"("companySlug", "titleSlug");

-- CreateIndex
CREATE INDEX "Job_countryCode_citySlug_status_idx" ON "Job"("countryCode", "citySlug", "status");

-- CreateIndex
CREATE INDEX "Job_isNlRelevant_isEnglishFriendly_status_idx" ON "Job"("isNlRelevant", "isEnglishFriendly", "status");

-- CreateIndex
CREATE INDEX "Job_isWithoutDutch_status_idx" ON "Job"("isWithoutDutch", "status");

-- CreateIndex
CREATE INDEX "Job_roleFamily_status_idx" ON "Job"("roleFamily", "status");

-- CreateIndex
CREATE INDEX "Job_seniority_status_idx" ON "Job"("seniority", "status");

-- CreateIndex
CREATE INDEX "Job_lastSeenAt_idx" ON "Job"("lastSeenAt");

-- CreateIndex
CREATE UNIQUE INDEX "Job_provider_externalId_key" ON "Job"("provider", "externalId");

-- CreateIndex
CREATE UNIQUE INDEX "JobListingPage_slug_key" ON "JobListingPage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "JobListingPage_path_key" ON "JobListingPage"("path");

-- CreateIndex
CREATE INDEX "JobListingPage_locale_kind_isActive_idx" ON "JobListingPage"("locale", "kind", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "CVCategory_slug_key" ON "CVCategory"("slug");

-- CreateIndex
CREATE INDEX "CVCategory_parentId_idx" ON "CVCategory"("parentId");

-- CreateIndex
CREATE INDEX "CVCategory_type_idx" ON "CVCategory"("type");

-- AddForeignKey
ALTER TABLE "PilotAccess" ADD CONSTRAINT "PilotAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVDocument" ADD CONSTRAINT "CVDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyMatchPack" ADD CONSTRAINT "AgencyMatchPack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyMatchPack" ADD CONSTRAINT "AgencyMatchPack_agencyTemplateId_fkey" FOREIGN KEY ("agencyTemplateId") REFERENCES "AgencyTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyMatchPack" ADD CONSTRAINT "AgencyMatchPack_cvDocumentId_fkey" FOREIGN KEY ("cvDocumentId") REFERENCES "CVDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyMatchPackRevision" ADD CONSTRAINT "AgencyMatchPackRevision_matchPackId_fkey" FOREIGN KEY ("matchPackId") REFERENCES "AgencyMatchPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyTemplate" ADD CONSTRAINT "AgencyTemplate_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencySubscription" ADD CONSTRAINT "AgencySubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyTeamMember" ADD CONSTRAINT "AgencyTeamMember_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "AgencySubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyTeamMember" ADD CONSTRAINT "AgencyTeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyUsagePeriod" ADD CONSTRAINT "AgencyUsagePeriod_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "AgencySubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyCvUsage" ADD CONSTRAINT "AgencyCvUsage_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "AgencyUsagePeriod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyPayment" ADD CONSTRAINT "AgencyPayment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "AgencySubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilePhotoProject" ADD CONSTRAINT "ProfilePhotoProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilePhotoProject" ADD CONSTRAINT "ProfilePhotoProject_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "JobSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVCategory" ADD CONSTRAINT "CVCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CVCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
