"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { idSchema, manualJobSchema, searchSchema, statusSchema, localeSchema, type JobActionResult } from "@/lib/app-jobs/model";
import { JobServiceError } from "@/lib/app-jobs/provider";
import { searchJobs, saveSearchJob, saveJob, manualJob, updateApplication, createTailoredCopy } from "@/lib/app-jobs/service";

async function run<T>(work: (userId: string) => Promise<T>, mutation = true): Promise<JobActionResult<T>> {
  try {
    const user = await getCurrentUser();
    if (!user) return { ok: false, code: "AUTH" };
    if (!(await isAppV2Active())) return { ok: false, code: "DISABLED" };
    const value = await work(user.id);
    if (mutation) {
      revalidatePath("/mijn-cvs", "layout");
      revalidatePath("/en/my-cvs", "layout");
    }
    return { ok: true, value };
  } catch (error) {
    return { ok: false, code: error instanceof JobServiceError ? error.code : error instanceof z.ZodError ? "INVALID" : "UNAVAILABLE" };
  }
}
export async function findJobs(input: unknown) {
  return run(userId => searchJobs(userId, searchSchema.parse(input)), false);
}
export async function saveVacancy(input: unknown) {
  return run(userId => {
    const parsed = z.object({ searchKey: z.string().regex(/^[a-f0-9]{64}$/), jobKey: z.string().regex(/^[a-f0-9]{64}$/) }).strict().parse(input);
    return saveSearchJob(userId, parsed.searchKey, parsed.jobKey);
  });
}
export async function addManualVacancy(input: unknown) {
  return run(userId => saveJob(userId, manualJob(manualJobSchema.parse(input))));
}
export async function changeJobStatus(input: unknown) {
  return run(userId => {
    const parsed = z.object({ id: idSchema, status: statusSchema }).strict().parse(input);
    return updateApplication(userId, parsed.id, parsed.status);
  });
}
export async function tailorForJob(input: unknown) {
  return run(userId => {
    const parsed = z.object({ id: idSchema, cvId: idSchema, locale: localeSchema }).strict().parse(input);
    return createTailoredCopy(userId, parsed.id, parsed.cvId, parsed.locale);
  });
}
