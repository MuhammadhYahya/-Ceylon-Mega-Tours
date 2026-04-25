import { NextResponse } from "next/server";
import {
  consumeInquiryRateLimit,
  getInquiryIp,
  isPayload,
  validateInquiryPayload,
  // verifyTurnstileToken
} from "@/lib/inquiry";
import { persistInquiry, updateInquiryStatus } from "@/lib/inquiry-store";
import { logError, logInfo, logWarn } from "@/lib/logger";
import { sendInquiryEmailWithRetry } from "@/lib/mailer";

export const runtime = "nodejs";

const noStoreHeaders = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!isPayload(body)) {
      logWarn("inquiry.invalid_payload");
      return NextResponse.json(
        { ok: false, message: "Invalid request payload." },
        { status: 400, headers: noStoreHeaders }
      );
    }

    const honeypot = body.company?.trim();
    if (honeypot) {
      logWarn("inquiry.honeypot_triggered");
      return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
    }

    const ip = getInquiryIp(request);
    if (!consumeInquiryRateLimit(ip)) {
      logWarn("inquiry.rate_limited");
      return NextResponse.json(
        { ok: false, message: "Too many inquiries. Please wait a few minutes and try again." },
        { status: 429, headers: noStoreHeaders }
      );
    }

    const validation = validateInquiryPayload(body);
    if (!validation.ok) {
      logWarn("inquiry.validation_failed");
      return NextResponse.json(
        { ok: false, message: validation.message },
        { status: 400, headers: noStoreHeaders }
      );
    }

    // const isHuman = await verifyTurnstileToken(body.turnstileToken, ip);
    // if (!isHuman) {
    //   logWarn("inquiry.turnstile_failed");
    //   return NextResponse.json(
    //     { ok: false, message: "Please confirm you are human and try again." },
    //     { status: 400, headers: noStoreHeaders }
    //   );
    // }

    const inquiry = validation.payload;

    logInfo("inquiry.received", {
      hasEmail: Boolean(inquiry.email),
      serviceType: inquiry.serviceType,
      groupSize: inquiry.groupSize
    });

    let record = null;

    try {
      record = await persistInquiry({
        ...inquiry,
        submittedAt: new Date().toISOString(),
        sourceIp: ip
      });
    } catch (error) {
      logError("inquiry.persist_failed", {
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }

    let emailDelivered = false;

    try {
      await sendInquiryEmailWithRetry(inquiry);
      emailDelivered = true;
      if (record) {
        try {
          await updateInquiryStatus(record, "emailed");
        } catch (error) {
          logWarn("inquiry.status_update_failed", {
            message: error instanceof Error ? error.message : "Unknown error"
          });
        }
      }
    } catch (error) {
      if (record) {
        try {
          await updateInquiryStatus(
            record,
            "email_failed",
            error instanceof Error ? error.message : "Unknown error"
          );
        } catch (statusError) {
          logWarn("inquiry.status_update_failed", {
            message: statusError instanceof Error ? statusError.message : "Unknown error"
          });
        }
      }

      logError("inquiry.email_failed", {
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }

    if (emailDelivered) {
      logInfo("inquiry.email_sent", {
        hasEmail: Boolean(inquiry.email),
        serviceType: inquiry.serviceType,
        groupSize: inquiry.groupSize
      });
    }

    if (!record && !emailDelivered) {
      return NextResponse.json(
        { ok: false, message: "Inquiry delivery failed. Please contact us on WhatsApp." },
        { status: 503, headers: noStoreHeaders }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Inquiry received. We will get back to you shortly."
      },
      { headers: noStoreHeaders }
    );
  } catch (error) {
    logError("inquiry.unexpected_error", {
      message: error instanceof Error ? error.message : "Unknown error"
    });
    return NextResponse.json(
      { ok: false, message: "Unexpected server error." },
      { status: 500, headers: noStoreHeaders }
    );
  }
}
