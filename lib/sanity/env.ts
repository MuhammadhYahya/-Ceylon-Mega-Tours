export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-01";

function parseBoolean(value?: string) {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }

  return null;
}

export function isSanityConfigured() {
  return Boolean(sanityProjectId && sanityDataset);
}

export function isStudioEnabled() {
  const configured = parseBoolean(process.env.ENABLE_STUDIO);

  if (configured !== null) {
    return configured;
  }

  return process.env.NODE_ENV !== "production";
}
