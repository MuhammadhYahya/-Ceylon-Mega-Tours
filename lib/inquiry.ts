import type { InquiryFormPayload } from "@/lib/types";
import { fallbackHomepage } from "@/lib/fallback-content";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const arrivalDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const allowedServiceTypes = new Set(
  fallbackHomepage.inquiry.serviceOptions.flatMap((option) => [option.en.trim(), option.ru.trim()])
);
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();

export type SanitizedInquiryPayload = {
  name: string;
  contact: string;
  email: string;
  arrivalDate: string;
  groupSize: string;
  serviceType: string;
  message: string;
};

export function isPayload(body: unknown): body is InquiryFormPayload {
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

export function getInquiryIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export function consumeInquiryRateLimit(ip: string) {
  const now = Date.now();
  const current = (rateLimitStore.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (current.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, current);
    return false;
  }

  current.push(now);
  rateLimitStore.set(ip, current);
  return true;
}

export function validateInquiryPayload(payload: InquiryFormPayload) {
  const sanitized: SanitizedInquiryPayload = {
    name: payload.name.trim(),
    contact: payload.contact.trim(),
    email: payload.email?.trim() ?? "",
    arrivalDate: payload.arrivalDate.trim(),
    groupSize: payload.groupSize.trim(),
    serviceType: payload.serviceType.trim(),
    message: payload.message.trim()
  };

  if (sanitized.name.length < 2 || sanitized.contact.length < 5 || sanitized.message.length < 10) {
    return { ok: false as const, message: "Please complete the required fields." };
  }

  if (!sanitized.groupSize || sanitized.groupSize.length > 60 || !/\d/.test(sanitized.groupSize)) {
    return { ok: false as const, message: "Please provide a valid group size." };
  }

  if (!allowedServiceTypes.has(sanitized.serviceType)) {
    return { ok: false as const, message: "Please choose a valid service type." };
  }

  if (!arrivalDatePattern.test(sanitized.arrivalDate)) {
    return { ok: false as const, message: "Please choose a valid arrival date." };
  }

  const selectedDate = new Date(`${sanitized.arrivalDate}T00:00:00.000Z`);
  const today = new Date();
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

  if (Number.isNaN(selectedDate.getTime()) || selectedDate.getTime() < todayUtc) {
    return { ok: false as const, message: "Please choose a future arrival date." };
  }

  if (sanitized.email && !emailPattern.test(sanitized.email)) {
    return { ok: false as const, message: "Please enter a valid email address." };
  }

  return { ok: true as const, payload: sanitized };
}
