import { baseOptions } from "@/app/layout.config";
import { DocsLayout } from "@/components/layout/docs";
import { source } from "@/lib/source";
import type { ReactNode } from "react";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <DocsLayout tree={source.pageTree[lang]} {...baseOptions(lang)}>
      {children}
    </DocsLayout>
  );
}
