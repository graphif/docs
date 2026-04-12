import type { Folder, Item, Node, Root } from "fumadocs-core/page-tree";
import type { LoaderConfig, LoaderOutput } from "fumadocs-core/source";

type LLMsContext = {
  lang?: string;
};

type LLMsNode = Node | Root;

type LLMsConfig<C extends LoaderConfig> = {
  TAB?: string;
  renderName?: (
    node: LLMsNode,
    ctx: LLMsContext,
    loader: LoaderOutput<C>,
  ) => string;
  renderDescription?: (
    node: LLMsNode,
    ctx: LLMsContext,
    loader: LoaderOutput<C>,
  ) => string;
};

function formatMarkdownLink(title: string, url: string) {
  return `[${title.replace(/([[\]])/g, "\\$1")}](${url.replace(/([()])/g, "\\$1")})`;
}

/**
 * 与新版 fumadocs-core 的 `llms(loader).index()` 等价的索引生成（当前锁定的 core 版本未导出该 helper）。
 */
export function llms<C extends LoaderConfig>(
  loader: LoaderOutput<C>,
  config: LLMsConfig<C> = {},
) {
  const {
    TAB = "  ",
    renderName = (node, ctx, l) => {
      if ("type" in node && node.type === "page") {
        const page = l.getNodePage(node, ctx.lang);
        if (page?.data.title) return page.data.title;
      } else if (!("type" in node) || node.type !== "separator") {
        const meta = l.getNodeMeta(node as Folder, ctx.lang);
        if (meta?.data.title) return meta.data.title;
      }
      return typeof node.name === "string" ? node.name : "";
    },
    renderDescription = (node, ctx, l) => {
      if ("type" in node && node.type === "page") {
        const page = l.getNodePage(node, ctx.lang);
        if (page?.data.description) return page.data.description;
      } else if (!("type" in node) || node.type !== "separator") {
        const meta = l.getNodeMeta(node as Folder, ctx.lang);
        if (meta?.data.description) return meta.data.description;
      }
      const desc =
        "description" in node && typeof node.description === "string"
          ? node.description
          : "";
      return desc;
    },
  } = config;

  function formatListItem(name: string, description: string, indent: number) {
    const prefix = TAB.repeat(indent);
    const trimmed = description.trim();
    if (trimmed.length > 0) return `${prefix}- ${name}: ${trimmed}`;
    return `${prefix}- ${name}`;
  }

  function formatNode(node: Node, indent: number, ctx: LLMsContext): string {
    switch (node.type) {
      case "page": {
        const item = node as Item;
        const title = renderName(node, ctx, loader);
        const desc = renderDescription(node, ctx, loader);
        return formatListItem(
          formatMarkdownLink(title, item.url),
          desc,
          indent,
        );
      }
      case "folder": {
        const out: string[] = [];
        out.push(
          formatListItem(
            renderName(node, ctx, loader),
            renderDescription(node, ctx, loader),
            indent,
          ),
        );
        if (node.index) out.push(formatNode(node.index, indent + 1, ctx));
        for (const child of node.children)
          out.push(formatNode(child, indent + 1, ctx));
        return out.join("\n");
      }
      case "separator":
        return `\n${formatListItem(`**${renderName(node, ctx, loader) || "Separator"}**`, "", indent)}`;
    }
  }

  function index(lang?: string): string {
    if (loader._i18n && lang === undefined) {
      const { languages } = loader._i18n;
      return languages.map((l: string) => index(l)).join("\n\n");
    }
    const pageTree = loader.getPageTree(lang) as Root;
    const out: string[] = [];
    const ctx: LLMsContext = { lang };
    out.push(`# ${renderName(pageTree as LLMsNode, ctx, loader)}`, "");
    const description = renderDescription(pageTree as LLMsNode, ctx, loader);
    if (description) out.push(`> ${description}`, "");
    for (const child of pageTree.children) out.push(formatNode(child, 0, ctx));
    return out.join("\n");
  }

  return {
    index,
    indexNode(node: Node, lang?: string) {
      return formatNode(node, 0, { lang });
    },
  };
}
