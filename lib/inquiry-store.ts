import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "next-sanity";
import { logWarn } from "@/lib/logger";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/lib/sanity/env";
import type { SanitizedInquiryPayload } from "@/lib/inquiry";

type InquiryStatus = "pending" | "emailed" | "email_failed";

type StoredInquiryInput = SanitizedInquiryPayload & {
  submittedAt: string;
  sourceIp: string;
};

type StoredInquiryRecord = {
  id: string;
  storage: "sanity" | "file";
};

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

export async function persistInquiry(input: StoredInquiryInput): Promise<StoredInquiryRecord> {
  const client = getWriteClient();

  if (client) {
    const created = await client.create({
      _type: "websiteInquiry",
      status: "pending",
      name: input.name,
      contact: input.contact,
      email: input.email || "",
      arrivalDate: input.arrivalDate,
      groupSize: input.groupSize,
      serviceType: input.serviceType,
      message: input.message,
      submittedAt: input.submittedAt,
      sourceIp: input.sourceIp
    });

    return { id: created._id, storage: "sanity" };
  }

  const directory = path.join(process.cwd(), "data");
  const id = `file-${randomUUID()}`;
  await mkdir(directory, { recursive: true });
  await appendFile(
    path.join(directory, "inquiries.ndjson"),
    `${JSON.stringify({ id, status: "pending", ...input })}\n`,
    "utf8"
  );
  logWarn("inquiry.storage_fallback_file");
  return { id, storage: "file" };
}

export async function updateInquiryStatus(
  record: StoredInquiryRecord,
  status: InquiryStatus,
  errorMessage?: string
) {
  if (record.storage !== "sanity") {
    return;
  }

  const client = getWriteClient();
  if (!client) {
    return;
  }

  await client
    .patch(record.id)
    .set({
      status,
      emailError: errorMessage || "",
      emailedAt: status === "emailed" ? new Date().toISOString() : null
    })
    .commit();
}
