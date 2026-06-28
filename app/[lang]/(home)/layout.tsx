import { baseOptions } from "@/app/layout.config";
import { HomeLayout } from "@/components/layout/home";
import type { CSSProperties, ReactNode } from "react";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <HomeLayout
      style={
        {
          "--spacing-fd-container": "1120px",
        } as CSSProperties
      }
      {...baseOptions(lang)}
    >
      {children}
    </HomeLayout>
  );
}
