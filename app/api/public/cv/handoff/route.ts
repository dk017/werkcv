import { NextRequest, NextResponse } from "next/server";
import { cvSchema } from "@/lib/cv";
import { parseCVText } from "@/lib/cv-parser";
import { takeAiBudgetOrAlert } from "@/lib/mcp/alerts";
import { peekCheckedCvHandoff, takeCheckedCvHandoff } from "@/lib/mcp/handoff";
import { recordMcpEvent } from "@/lib/mcp/events";
import { takeExchangeSlot } from "@/lib/mcp/limits";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

/**
 * The no-account editor exchanges the single-use token from an MCP link for the CV it carries. The
 * handoff is deleted by the exchange. The text is parsed into editor fields here, with AI, so the
 * exchange is limited per IP and draws on the daily AI budget shared with match_vacancy; nothing is logged.
 */
export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request)) {
    return NextResponse.json({ code: "INVALID_ORIGIN" }, { status: 403, headers: NO_STORE });
  }
  if (!takeExchangeSlot(getClientIp(request))) {
    return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429, headers: { ...NO_STORE, "Retry-After": "3600" } });
  }

  let token: unknown;
  try {
    token = ((await request.json()) as { token?: unknown }).token;
  } catch {
    return NextResponse.json({ code: "INVALID_REQUEST" }, { status: 400, headers: NO_STORE });
  }

  // Check the token first, so fake tokens cannot use up the daily AI budget, and check the budget
  // before the handoff is deleted, so a user who hits the cap can try the same link again later.
  const known = await peekCheckedCvHandoff(prisma, token).catch(() => false);
  if (!known) return NextResponse.json({ code: "UNAVAILABLE" }, { status: 410, headers: NO_STORE });
  if (!takeAiBudgetOrAlert("handoff_exchange")) {
    return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429, headers: { ...NO_STORE, "Retry-After": "3600" } });
  }

  const handoff = await takeCheckedCvHandoff(prisma, token).catch(() => null);
  if (!handoff) return NextResponse.json({ code: "UNAVAILABLE" }, { status: 410, headers: NO_STORE });

  try {
    const parsed = cvSchema.safeParse(await parseCVText(handoff.cvText, handoff.locale));
    if (!parsed.success) throw new Error("Parsed CV failed schema validation");
    void recordMcpEvent("mcp_handoff_opened", { locale: handoff.locale, with_vacancy: Boolean(handoff.vacancyText) });
    return NextResponse.json(
      { success: true, data: parsed.data, vacancyText: handoff.vacancyText, locale: handoff.locale },
      { headers: NO_STORE },
    );
  } catch {
    // The handoff is already used up; the user asks the assistant for a new link.
    console.error("mcp_handoff_parse_failed");
    return NextResponse.json({ code: "PARSE_FAILED" }, { status: 422, headers: NO_STORE });
  }
}
