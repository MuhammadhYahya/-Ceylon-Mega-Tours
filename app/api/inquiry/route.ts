import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/mailer";
import { logError, logInfo, logWarn } from "@/lib/logger";
import type { InquiryFormPayload } from "@/lib/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const noStoreHeaders = { "Cache-Control": "no-store" };

function isPayload(body: unknown): body is InquiryFormPayload {
  if (!body || typeof body !== "object") {
    return false;
  }

  const value = body as Record<string, unknown>;

  return (
    typeof value.name === "string" &&
    typeof value.contact === "string" &&
    typeof value.arrivalDate === "string" &&
    typeof value.groupSize === "string" &&
    typeof value.serviceType === "string" &&
    typeof value.message === "string"
  );
}

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

    const name = body.name.trim();
    const contact = body.contact.trim();
    const email = body.email?.trim() ?? "";
    const message = body.message.trim();

    if (name.length < 2 || contact.length < 5 || message.length < 10) {
      logWarn("inquiry.validation_failed", {
        hasName: name.length >= 2,
        hasContact: contact.length >= 5,
        hasMessage: message.length >= 10
      });
      return NextResponse.json(
        { ok: false, message: "Please complete the required fields." },
        { status: 400, headers: noStoreHeaders }
      );
    }

    if (email && !emailPattern.test(email)) {
      logWarn("inquiry.invalid_email");
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400, headers: noStoreHeaders }
      );
    }

    logInfo("inquiry.received", {
      hasEmail: Boolean(email),
      serviceType: body.serviceType,
      groupSize: body.groupSize
    });

    await sendInquiryEmail({
      name,
      contact,
      email,
      arrivalDate: body.arrivalDate.trim(),
      groupSize: body.groupSize.trim(),
      serviceType: body.serviceType.trim(),
      message
    });

    logInfo("inquiry.email_sent", {
      hasEmail: Boolean(email),
      serviceType: body.serviceType,
      groupSize: body.groupSize
    });

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
