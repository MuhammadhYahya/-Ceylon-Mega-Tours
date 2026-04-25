import { notFound } from "next/navigation";
import { isStudioEnabled } from "@/lib/sanity/env";
import { StudioPageClient } from "./studio-page-client";

export default function StudioPage() {
  if (!isStudioEnabled()) {
    notFound();
  }

  return <StudioPageClient />;
}
