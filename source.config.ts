import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { Pluggable } from "unified";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    // schema: frontmatterSchema.extend({
    //   relatedFile: z.string().optional(),
    // }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
    remarkPlugins: [remarkMath],
    // Place it at first so that it won't be changed by syntax highlighter
    rehypePlugins: (v: Pluggable[]) => [rehypeKatex, ...v],

    rehypeCodeOptions: {
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
      ],
      // important: Shiki doesn't support lazy loading languages for codeblocks in Twoslash popups
      // make sure to define them first (e.g. the common ones)
      langs: ["js", "jsx", "ts", "tsx"],

      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    },
  },
});
