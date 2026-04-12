import { source } from "@/lib/source";
import type { InferPageType } from "fumadocs-core/source";
import { remarkInclude } from "fumadocs-mdx/config";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdx from "remark-mdx";

const processor = remark()
  .use(remarkMdx)
  // needed for Fumadocs MDX
  .use(remarkInclude)
  .use(remarkGfm)
  .use(remarkMath);

function resolveMarkdownPath(page: InferPageType<typeof source>): string {
  const fromData = page.data._file?.absolutePath;
  if (fromData) return fromData;
  if (page.absolutePath) return page.absolutePath;
  if (page.path) return page.path;
  return `${(page.slugs?.length ? page.slugs.join("/") : "index") || "index"}.mdx`;
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await processor.process({
    path: resolveMarkdownPath(page),
    value: page.data.content,
  });

  const title = page.data.title ?? page.slugs?.join("/") ?? "Untitled";
  const rawDesc = page.data.description;
  const description =
    rawDesc === undefined || rawDesc === null
      ? ""
      : String(rawDesc).trim();
  const head =
    description.length > 0
      ? `# ${title}\nURL: ${page.url}\n\n${description}\n\n`
      : `# ${title}\nURL: ${page.url}\n\n`;

  return `${head}${processed.value}`;
}
