import { z } from "zod";

export const clientOutcomeSchema = z.object({
  status: z.enum(["unknown", "pending", "accepted", "rejected", "withdrawn"]),
}).strict();

export type ClientOutcome = z.infer<typeof clientOutcomeSchema>["status"];

export function deriveMatchPackDurations(input: {
  createdAt: Date;
  approvedAt: Date | null;
  firstExportedAt: Date | null;
}) {
  return {
    uploadToApprovalSeconds: input.approvedAt
      ? Math.max(0, Math.round((input.approvedAt.getTime() - input.createdAt.getTime()) / 1000))
      : null,
    approvalToFirstExportSeconds: input.approvedAt && input.firstExportedAt
      ? Math.max(0, Math.round((input.firstExportedAt.getTime() - input.approvedAt.getTime()) / 1000))
      : null,
  };
}

export function clientAcceptanceSummary(outcomes: ClientOutcome[]) {
  const denominator = outcomes.filter((status) => status === "accepted" || status === "rejected" || status === "withdrawn");
  const accepted = denominator.filter((status) => status === "accepted").length;
  return { accepted, denominator: denominator.length, rate: denominator.length ? accepted / denominator.length : null };
}
