import { z } from "zod";

const shortText = z.string().trim().min(1).max(120);
const locale = z.enum(["nl", "en"]);
const outputVariant = z.enum(["full", "anonymized"]);

export const agencyRoiCompletedPropertiesSchema = z.object({
  path: shortText,
  submissions: z.number().int().min(1).max(500),
  minutes: z.number().int().min(1).max(240),
  hourlyCost: z.number().min(1).max(300),
  reductionPercent: z.number().min(1).max(90),
  potentialHoursSaved: z.number().nonnegative().max(100_000),
  potentialCostSaved: z.number().nonnegative().max(10_000_000),
}).strict();

export type AgencyRoiCompletedProperties = z.infer<typeof agencyRoiCompletedPropertiesSchema>;

export const agencyAnalyticsEventSchemas: Record<string, z.ZodTypeAny> = {
  agency_hub_viewed: z.object({ path: shortText }).strict(),
  agency_guide_index_viewed: z.object({ path: shortText }).strict(),
  agency_guide_viewed: z.object({ path: shortText, slug: shortText }).strict(),
  agency_content_cta_clicked: z.object({
    path: shortText,
    location: shortText,
    destination: shortText,
    intent: z.enum(["learn", "product", "login", "sample", "knowledge"]).optional(),
  }).strict(),
  agency_roi_completed: agencyRoiCompletedPropertiesSchema,
  agency_pricing_viewed: z.object({ locale, path: shortText }).strict(),
  agency_checkout_cta_clicked: z.object({ locale, location: shortText }).strict(),
  agency_checkout_started: z.object({ location: shortText, product: z.literal("agency") }).strict(),
  agency_checkout_failed: z.object({ location: shortText, product: z.literal("agency"), reason: shortText }).strict(),
  agency_demo_started: z.object({ location: shortText, mode: z.literal("sample") }).strict(),
  agency_demo_field_changed: z.object({
    field: z.enum(["name", "title", "summary", "experience", "skills"]),
    mode: z.literal("sample"),
  }).strict(),
  agency_submission_demo_viewed: z.object({ location: shortText }).strict(),
  agency_submission_demo_tab_changed: z.object({ tab: z.enum(["intro", "evidence", "gaps", "email", "outputs"]) }).strict(),
  agency_sample_pack_downloaded: z.object({ variant: outputVariant }).strict(),
  agency_sample_output_viewed: z.object({ variant: outputVariant, location: shortText }).strict(),
  agency_workspace_started: z.object({ location: shortText }).strict(),
  agency_docx_cta_clicked: z.object({ path: shortText, location: shortText }).strict(),
  agency_redaction_cta_clicked: z.object({ path: shortText, location: shortText }).strict(),
  agency_evidence_checker_viewed: z.object({ locale }).strict(),
  agency_evidence_checker_sample_loaded: z.object({ locale }).strict(),
  agency_evidence_checker_started: z.object({ locale, inputType: z.enum(["file", "text"]), sample: z.boolean() }).strict(),
  agency_evidence_checker_completed: z.object({
    locale,
    requirementCount: z.number().int().nonnegative().max(100),
    missingCount: z.number().int().nonnegative().max(100),
    sample: z.boolean(),
  }).strict(),
  agency_evidence_checker_failed: z.object({ locale, reason: shortText }).strict(),
  agency_evidence_checker_cta_clicked: z.object({ locale, destination: z.enum(["agency", "guide"]) }).strict(),
  proposal_claim_verifier_viewed: z.object({ locale }).strict(),
  proposal_claim_verifier_sample_loaded: z.object({ locale }).strict(),
  proposal_claim_verifier_started: z.object({ locale, inputType: z.enum(["file", "text"]) }).strict(),
  proposal_claim_verifier_completed: z.object({
    locale,
    claimCount: z.number().int().nonnegative().max(100),
    unsupportedCount: z.number().int().nonnegative().max(100),
    confirmationCount: z.number().int().nonnegative().max(100),
  }).strict(),
  proposal_claim_verifier_failed: z.object({ locale, reason: shortText }).strict(),
  proposal_claim_methodology_clicked: z.object({ locale }).strict(),
  proposal_claim_verifier_result_copied: z.object({
    locale,
    claimCount: z.number().int().nonnegative().max(100),
  }).strict(),
  proposal_claim_verifier_cta_clicked: z.object({ locale, destination: z.literal("agency") }).strict(),
  agency_onboarding_step_clicked: z.object({ step: shortText }).strict(),
  agency_onboarding_dismissed: z.object({
    completed: z.number().int().nonnegative().max(20),
    total: z.number().int().positive().max(20),
  }).strict(),
  matchpack_analysis_started: z.object({ locale, fileType: z.enum(["pdf", "docx", "unknown"]) }).strict(),
  matchpack_analysis_completed: z.object({
    locale,
    requirementCount: z.number().int().nonnegative().max(100),
    scoreBand: shortText,
  }).strict(),
  matchpack_analysis_failed: z.object({ locale, reason: shortText }).strict(),
  matchpack_review_opened: z.object({ locale, status: z.enum(["analyzed", "approved"]) }).strict(),
  matchpack_draft_saved: z.object({ locale, selectedVariant: outputVariant }).strict(),
  matchpack_approved: z.object({
    locale,
    selectedVariant: outputVariant,
    requirementCount: z.number().int().nonnegative().max(100),
  }).strict(),
  matchpack_pdf_downloaded: z.object({ variant: outputVariant }).strict(),
  matchpack_docx_downloaded: z.object({ variant: outputVariant }).strict(),
  matchpack_email_copied: z.object({ locale }).strict(),
  matchpack_client_outcome_saved: z.object({ status: z.enum(["unknown", "pending", "accepted", "rejected", "withdrawn"]) }).strict(),
};

export function parseAgencyAnalyticsProperties(event: string, properties: unknown) {
  const schema = agencyAnalyticsEventSchemas[event];
  return schema ? schema.safeParse(properties) : null;
}
