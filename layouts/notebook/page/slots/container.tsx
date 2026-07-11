"use client";
import { useDocsPage } from "fumadocs-ui/layouts/notebook/page";
import type { ComponentProps } from "react";
import { cn } from "../../../../lib/cn";

export function Container(props: ComponentProps<"article">) {
  const {
    props: { full },
  } = useDocsPage();

  return (
    <article
      id="nd-page"
      data-full={full}
      {...props}
      className={cn(
        "flex flex-col gap-4 px-4 py-6 [grid-area:main] *:max-w-[900px] md:px-6 md:pt-8 xl:px-8 xl:pt-14",
        full && "*:max-w-[1285px]",
        props.className,
      )}
    >
      {props.children}
    </article>
  );
}
