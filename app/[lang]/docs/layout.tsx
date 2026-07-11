import { baseOptions } from "@/app/layout.config";
import { Header } from "@/layouts/notebook/slots/header";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
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
    <DocsLayout
      tree={source.pageTree[lang]}
      slots={{
        header: Header,
      }}
      tabMode="navbar"
      {...baseOptions(lang)}
    >
      {children}
    </DocsLayout>
  );
}
