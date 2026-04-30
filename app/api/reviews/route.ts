import { NextResponse } from "next/server";
import {
  consumeReviewRateLimit,
  getReviewIp,
  isReviewPayload,
  persistReview,
  validateReviewPayload
} from "@/lib/reviews";
import { logError, logWarn } from "@/lib/logger";

export const runtime = "nodejs";

const noStoreHeaders = { "Cache-Control": "no-store" };
const successMessage = "Thank you. Your review has been submitted for approval.";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!isReviewPayload(body)) {
      logWarn("review.invalid_payload");
      return NextResponse.json(
        { ok: false, message: "Invalid request payload." },
        { status: 400, headers: noStoreHeaders }
      );
    }

    const honeypot = body.company?.trim();
    if (honeypot) {
      logWarn("review.honeypot_triggered");
      return NextResponse.json({ ok: true, message: successMessage }, { headers: noStoreHeaders });
    }

    const ip = getReviewIp(request);
    if (!consumeReviewRateLimit(ip)) {
      logWarn("review.rate_limited");
      return NextResponse.json(
        { ok: false, message: "Too many reviews. Please wait a few minutes and try again." },
        { status: 429, headers: noStoreHeaders }
      );
    }

    const validation = validateReviewPayload(body);
    if (!validation.ok) {
      logWarn("review.validation_failed");
      return NextResponse.json(
        { ok: false, message: validation.message },
        { status: 400, headers: noStoreHeaders }
      );
    }

    await persistReview({
      ...validation.payload,
      submittedAt: new Date().toISOString(),
      sourceIp: ip
    });

    return NextResponse.json({ ok: true, message: successMessage }, { headers: noStoreHeaders });
  } catch (error) {
    logError("review.unexpected_error", {
      message: error instanceof Error ? error.message : "Unknown error"
    });

    return NextResponse.json(
      { ok: false, message: "Review submission failed. Please try again later." },
      { status: 503, headers: noStoreHeaders }
    );
  }
}
