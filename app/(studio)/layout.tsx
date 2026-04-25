import { DocumentShell, metadata, viewport } from "@/app/document-shell";

export { metadata, viewport };

export default function StudioGroupLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocumentShell lang="ru">{children}</DocumentShell>;
}
