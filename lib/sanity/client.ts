import { createClient } from "next-sanity";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId
} from "@/lib/sanity/env";

export function getSanityClient() {
  if (!isSanityConfigured()) {
    return null;
  }

  return createClient({
    projectId: sanityProjectId!,
    dataset: sanityDataset!,
    apiVersion: sanityApiVersion,
    useCdn: false,
    perspective: "published"
  });
}
