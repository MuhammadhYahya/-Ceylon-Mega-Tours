import { groq } from "next-sanity";
import { createClient } from "next-sanity";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/lib/sanity/env";
import { getSanityClient } from "@/lib/sanity/client";
import type { GuestReviewItem, ReviewFormPayload, ReviewStatus } from "@/lib/types";

const REVIEW_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const REVIEW_RATE_LIMIT_MAX_REQUESTS = 3;
const reviewRateLimitStore = new Map<string, number[]>();

const APPROVED_REVIEWS_QUERY = groq`
  *[_type == "websiteReview" && status == "approved"] | order(submittedAt desc)[0...$limit] {
    "id": _id,
    name,
    location,
    rating,
    message,
    submittedAt
  }
`;

type StoredReviewInput = {
  name: string;
  location: string;
  rating: number;
  message: string;
  submittedAt: string;
  sourceIp: string;
};

type SanityReviewDocument = {
  id?: string | null;
  name?: string | null;
  location?: string | null;
  rating?: number | null;
  message?: string | null;
  submittedAt?: string | null;
};

export type SanitizedReviewPayload = {
  name: string;
  location: string;
  rating: number;
  message: string;
};

export function isReviewPayload(body: unknown): body is ReviewFormPayload {
  if (!body || typeof body !== "object") {
    return false;
  }

  const value = body as Record<string, unknown>;

  return (
    typeof value.name === "string" &&
    typeof value.message === "string" &&
    typeof value.rating === "number" &&
    (value.location === undefined || typeof value.location === "string") &&
    (value.company === undefined || typeof value.company === "string")
  );
}

export function getReviewIp(request: Request) {
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

export function consumeReviewRateLimit(ip: string) {
  const now = Date.now();
  const current = (reviewRateLimitStore.get(ip) || []).filter(
    (timestamp) => now - timestamp < REVIEW_RATE_LIMIT_WINDOW_MS
  );

  if (current.length >= REVIEW_RATE_LIMIT_MAX_REQUESTS) {
    reviewRateLimitStore.set(ip, current);
    return false;
  }

  current.push(now);
  reviewRateLimitStore.set(ip, current);
  return true;
}

export function validateReviewPayload(payload: ReviewFormPayload) {
  const sanitized: SanitizedReviewPayload = {
    name: payload.name.trim(),
    location: payload.location?.trim() || "",
    rating: payload.rating,
    message: payload.message.trim()
  };

  if (sanitized.name.length < 2 || sanitized.name.length > 80) {
    return { ok: false as const, message: "Please enter your name." };
  }

  if (sanitized.location.length > 90) {
    return { ok: false as const, message: "Please use a shorter location." };
  }

  if (!Number.isInteger(sanitized.rating) || sanitized.rating < 1 || sanitized.rating > 5) {
    return { ok: false as const, message: "Please choose a rating from 1 to 5." };
  }

  if (sanitized.message.length < 10 || sanitized.message.length > 900) {
    return { ok: false as const, message: "Please write a review between 10 and 900 characters." };
  }

  return { ok: true as const, payload: sanitized };
}

function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

  if (!sanityProjectId || !sanityDataset || !token) {
    return null;
  }

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    token,
    useCdn: false
  });
}

function mapReview(item: SanityReviewDocument): GuestReviewItem | null {
  const id = item.id?.trim();
  const name = item.name?.trim();
  const message = item.message?.trim();
  const submittedAt = item.submittedAt?.trim();

  if (!id || !name || !message || !submittedAt || !item.rating) {
    return null;
  }

  return {
    id,
    name,
    location: item.location?.trim() || undefined,
    rating: Math.min(Math.max(Math.round(item.rating), 1), 5),
    message,
    submittedAt
  };
}

export async function getApprovedReviews(limit = 12): Promise<GuestReviewItem[]> {
  const client = getSanityClient();

  if (!client) {
    return [];
  }

  try {
    const items = await client.fetch<SanityReviewDocument[]>(
      APPROVED_REVIEWS_QUERY,
      { limit },
      { cache: "no-store" }
    );

    return items.map(mapReview).filter((item): item is GuestReviewItem => Boolean(item));
  } catch {
    return [];
  }
}

export async function persistReview(input: StoredReviewInput) {
  const client = getWriteClient();

  if (!client) {
    throw new Error("Review storage is not configured.");
  }

  const status: ReviewStatus = "pending";

  await client.create({
    _type: "websiteReview",
    status,
    name: input.name,
    location: input.location,
    rating: input.rating,
    message: input.message,
    submittedAt: input.submittedAt,
    sourceIp: input.sourceIp
  });
}
