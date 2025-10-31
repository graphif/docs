"use client";

import SearchDialog from "@/components/search";
import { RootProvider, RootProviderProps } from "fumadocs-ui/provider/base";
import type { ReactNode } from "react";

export function Provider({
  children,
  ...props
}: { children: ReactNode } & RootProviderProps) {
  return (
    <RootProvider
      search={{
        SearchDialog,
      }}
      {...props}
    >
      {children}
    </RootProvider>
  );
}
