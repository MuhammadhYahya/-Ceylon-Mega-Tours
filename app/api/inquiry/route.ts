import { NextResponse } from "next/server";
import type { InquiryFormPayload } from "@/lib/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const body = await request.json().catch(() => null);

  if (!isPayload(body)) {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const honeypot = body.company?.trim();
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name.trim();
  const contact = body.contact.trim();
  const email = body.email?.trim() ?? "";
  const message = body.message.trim();

  if (name.length < 2 || contact.length < 5 || message.length < 10) {
    return NextResponse.json(
      { ok: false, message: "Please complete the required fields." },
      { status: 400 }
    );
  }

  if (email && !emailPattern.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  console.log("Ceylon Mega Tours inquiry", {
    ...body,
    receivedAt: new Date().toISOString()
  });

  return NextResponse.json({
    ok: true,
    message: "Inquiry received. We will get back to you shortly."
  });
}
