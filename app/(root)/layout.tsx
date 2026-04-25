import { DocumentShell, metadata, viewport } from "@/app/document-shell";

export { metadata, viewport };

export default function RootGroupLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocumentShell lang="ru">{children}</DocumentShell>;
}
