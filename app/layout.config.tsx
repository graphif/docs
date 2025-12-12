import { i18n } from "@/lib/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Logo from "./components/Logo";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function baseOptions(lang: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: (
        <>
          <Logo width="24" height="24" />
          Graphif
        </>
      ),
    },
    githubUrl: "https://github.com/graphif/project-graph",
  };
}
