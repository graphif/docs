import { GoogleTagManager } from "@next/third-parties/google";
import { NextProvider } from "fumadocs-core/framework/next";
import "katex/dist/katex.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import "../global.css";
import { Provider } from "./provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://graphif.dev"),
};

const locales = [
  {
    name: "English",
    locale: "en",
  },
  {
    name: "简体中文",
    locale: "zh-CN",
  },
];

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const lang = (await params).lang;

  return (
    <html suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-5BT4HFCW" />
      <head>
        <link
          rel="stylesheet"
          href="https://gcore.jsdelivr.net/npm/misans-vf@1.0.0/lib/MiSans.min.css"
        />
        <link
          rel="stylesheet"
          href="https://gcore.jsdelivr.net/npm/@fontsource/maple-mono@5.2.6/index.min.css"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <NextProvider>
          <Provider
            i18n={{
              locale: lang,
              locales,
            }}
          >
            {children}
          </Provider>
        </NextProvider>
      </body>
    </html>
  );
}
