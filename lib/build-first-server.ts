import { headers } from "next/headers";
import { parseUserAgent } from "@/lib/analytics-source";
import { prisma } from "@/lib/prisma";
import type { BuildFirstArm } from "@/lib/build-first";

/**
 * One server-side event per eligible editor visit without an account, with its arm: the
 * denominator of the build-first split. Crawlers are not counted. Never blocks the page.
 */
export async function recordBuildFirstEntry(input: { arm: BuildFirstArm; startSource: string; locale: "nl" | "en" }): Promise<void> {
  const userAgent = (await headers()).get("user-agent") || "";
  const { deviceType } = parseUserAgent(userAgent);
  if (deviceType === "bot") return;
  void prisma.analyticsEvent
    .create({
      data: {
        event: "build_first_entry",
        path: input.locale === "en" ? "/en/editor" : "/editor",
        properties: { arm: input.arm, startSource: input.startSource, locale: input.locale, deviceType },
      },
    })
    .catch(() => undefined);
}
