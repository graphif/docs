"use client";

import Link from "fumadocs-core/link";
import {
  ArrowRight,
  BookOpen,
  Box,
  Download,
  File,
  GitBranch,
  Globe,
  Heart,
  Keyboard,
  Link2,
  MessageCircle,
  MessageCircleDashed,
  Palette,
  Puzzle,
  Scaling,
  Sparkles,
  TreePine,
  Type,
} from "lucide-react";
import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import type { StatsData } from "../../[lang]/(home)/page.client";

// ─── Data ─────────────────────────────────────────────

const coreFeatures = [
  {
    icon: Scaling,
    title: "自由布局，流畅缩放",
    description:
      "随心拖拽、自由缩放，渐进式披露，俯瞰全局如观星海，深入毫末如探秘境。",
    href: "/docs/prg/features/feature/camera",
    demo: "https://assets.graphif.dev/videos/scale.webm",
  },
  {
    icon: GitBranch,
    title: "丰富的逻辑结构",
    description: "树形结构、拓扑结构、随意嵌套、能够表达任意的逻辑框架。",
    href: "/docs/prg/features/stage-object/association",
    demo: "https://assets.graphif.dev/videos/structures.webm",
  },
  {
    icon: Type,
    title: "多样的节点类型",
    description:
      "文本、LaTeX 公式、图片、SVG、引用块、分组框……覆盖各种表达需求。",
    href: "/docs/prg/features/stage-object/entity",
    demo: "https://assets.graphif.dev/videos/entities.webm",
  },
  {
    icon: Link2,
    title: "双向引用",
    description: "双链 + 孪生关系，节点间可建立双向关联，打破层级束缚。",
    href: "/docs/prg/features/stage-object/association/sync-association",
    demo: "https://assets.graphif.dev/videos/sync-association.webm",
  },
  {
    icon: Puzzle,
    title: "外部集成",
    description: "与 Xmind、Draw.io、Obsidian、VSCode、Joplin 等工具无缝对接。",
    href: "/docs/prg/features/integration",
    demo: "https://assets.graphif.dev/videos/obsidian.webm",
  },
  {
    icon: Keyboard,
    title: "快捷键系统",
    description:
      "支持自定义快捷键、有按键序列的快捷键、还支持续按住的操作、可绑定右键菜单和菜单栏。",
    href: "/docs/prg/features/feature/shortcut-key",
    demo: "https://assets.graphif.dev/videos/keybinds.webm",
  },
  {
    icon: TreePine,
    title: "节点树",
    description:
      "可以通过纯键盘操作，朝着任意方向生长节点、可以做出多层次不同方向结构的树，且具有自适应布局功能。",
    href: "/docs/prg/features/feature/tree",
    demo: "https://assets.graphif.dev/videos/tree.webm",
  },
  {
    icon: Download,
    title: "一键导出 / 导入",
    description:
      "单文件分发，支持与 Meramid、纯文本等多种格式互导入导出，方便与 AI 进行交互。",
    href: "/docs/prg/features/feature/export",
    demo: "https://assets.graphif.dev/videos/export-plain-text.webm",
  },
];

const apiFeatures = [
  {
    icon: Keyboard,
    title: "快捷键",
    description: "注册自定义快捷键，支持组合键和按键序列。",
    code: 'await prg.keybinds_register("id", icon, "C-S-A-t", handler)',
    href: "/docs/extension/api/keybinds",
    demo: "",
  },
  {
    icon: MessageCircle,
    title: "对话框",
    description: "确认、输入、复制、自定义按钮，灵活的用户交互。",
    code: 'const ok = await prg.dialog_confirm("你确定？")',
    href: "/docs/extension/api/dialog",
    demo: "",
  },
  {
    icon: Box,
    title: "自定义实体",
    description: "注册全新节点类型，定义碰撞箱和渲染函数。",
    code: "await prg.entity_registerType(id, data, collision, render)",
    href: "/docs/extension/api/entity",
    demo: "",
  },
  {
    icon: Globe,
    title: "网络请求",
    description: "Fetch API 包装，无视 CORS，内置 JSON 和二进制支持。",
    code: "const data = await prg.fetch_json(url)",
    href: "/docs/extension/api/fetch",
    demo: "",
  },
  {
    icon: File,
    title: "表单",
    description: "基于 Zod + JSON Schema 构建动态表单，类型安全。",
    code: "const data = await prg.form(schema, options)",
    href: "/docs/extension/api/form",
    demo: "",
  },
  {
    icon: Palette,
    title: "自定义主题",
    description: "注册深色/浅色主题，覆盖 Shadcn UI 和画布颜色。",
    code: "await prg.themes_register(id, name, desc, type, colors)",
    href: "/docs/extension/api/themes",
    demo: "",
  },
  {
    icon: MessageCircleDashed,
    title: "Toast 通知",
    description: "成功、错误、警告、普通消息，向用户实时反馈。",
    code: 'await prg.toast_success("操作成功")',
    href: "/docs/extension/api/toast",
    demo: "",
  },
  {
    icon: ArrowRight,
    title: "标签页",
    description: "获取并操作更底层的 Project 对象。",
    code: "const project = await prg.tabs_getCurrentProject()",
    href: "/docs/extension/api/tabs",
    demo: "",
  },
];

const comments = [
  {
    name: "安安",
    comment:
      "真的很感谢这个产品，自去年开始用以来已经给八本书做了思维导图，可以说我能养成阅读的习惯很大程度上就是因为它。",
  },
  {
    name: "wei",
    comment: "独辟蹊径，非常实用。",
  },
  {
    name: "zko",
    comment:
      "用了有一阵子了，终于发现最适合自己的笔记工具。祝各位开发者身体健康～",
  },
  {
    name: "tiepi",
    comment: "加油！",
  },
  {
    name: "寒武纪J",
    comment: "这款开源导图软件让我学习以及研究某些知识时变得游刃有余。",
  },
  {
    name: "yuametal",
    comment: "太棒了，一下子成为我的工作流的核心之一。",
  },
  {
    name: "HARRY",
    comment: "功能齐全，特效炫酷，给用obsidian的我带来了很大的震撼。",
  },
  {
    name: "Hα 木羽",
    comment: "“国内最强开源思维导图大纲工具” ——欸我这么说是对的吧（-v-）",
  },
  {
    name: "Lin Qiu",
    comment: "非常牛逼得软件，制作者大佬更是顶中顶，软件很酷",
  },
  {
    name: "Ecl1pse_",
    comment: "最顺手的一个软件！加油！",
  },
  {
    name: "Xizarque",
    comment: "又有记笔记的动力啦！",
  },
  {
    name: "缘起",
    comment:
      "牛逼克拉斯！！！这就是智慧的力量！！！这就是宇宙天地造化大师！！！",
  },
];

// ─── Hover Preview ────────────────────────────────────

function isVideoUrl(url: string): boolean {
  return url.endsWith(".webm") || url.endsWith(".mp4");
}

// ─── Component ────────────────────────────────────

export function Hero({ stats }: { stats: StatsData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("Read https://graphif.dev/llms.txt");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-neutral-950 text-white selection:bg-emerald-500 selection:text-white">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="ticks-neutral-700 relative mx-auto max-w-(--fd-layout-width) border border-b-0 border-neutral-700 px-32 pt-32 pb-24 md:pt-36 md:pb-32">
          <h1 className="mb-6 max-w-4xl text-5xl leading-tight font-semibold tracking-tight text-white md:text-7xl">
            无限画布的节点图绘制工具
            <br />
            以扩展驱动无限可能
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed opacity-50 md:text-xl">
            Project Graph 是一款专注于快速绘制节点图的桌面工具。 全新的 v3.0
            扩展系统让开发者可以自定义快捷键、对话框、节点类型、主题……
            将软件的能力延伸到任何你需要的方向。
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/release/latest"
              className="group flex items-center gap-2 rounded-xl border-4 border-emerald-500 px-5 py-1 font-bold text-white transition-all hover:border-8 hover:bg-emerald-800 active:scale-95"
            >
              <Download className="h-5 w-5" />
              立即下载
            </Link>
            <Link
              href="/docs/prg"
              className="flex items-center gap-2 rounded-xl border-4 border-blue-500 px-5 py-1 font-bold text-white transition-all hover:border-8 hover:bg-blue-800 active:scale-95"
            >
              <BookOpen className="h-5 w-5" />
              阅读文档
            </Link>
            <Link
              href="/donate"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <Heart className="h-5 w-5" />
              赞助
            </Link>
            <Link
              href="https://github.com/graphif"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <GithubIcon className="h-5 w-5" />
              GitHub
              {stats.githubStars > 0 && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium opacity-75">
                  {stats.githubStars.toLocaleString()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Core Features ─── */}
      <section className="ticks-neutral-700 mx-auto flex max-w-(--fd-layout-width) flex-col items-center gap-6 border border-b-0 border-neutral-700 px-32 py-24">
        <h2 className="text-3xl font-semibold text-white md:text-6xl">
          核心功能
        </h2>
        <p className="opacity-50">
          无论你是设计师、开发者、教师还是研究者，Project Graph
          都能帮你快速绘制清晰的分析框架图。
        </p>
      </section>
      <section className="ticks-neutral-700 divide-nickel mx-auto grid max-w-(--fd-layout-width) grid-cols-1 divide-x divide-y divide-neutral-700 border border-b-0 border-neutral-700 sm:grid-cols-2">
        {coreFeatures.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="relative flex flex-col gap-2 p-8 nth-last-[-n+2]:border-b-0"
          >
            <h3 className="text-2xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="opacity-50">{feature.description}</p>
            {isVideoUrl(feature.demo) ? (
              <video
                src={feature.demo}
                autoPlay
                muted
                loop
                playsInline
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23111'/%3E%3Ccircle cx='400' cy='200' r='30' fill='none' stroke='%23ffffff' stroke-width='4' stroke-dasharray='150' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 400 200' to='360 400 200' dur='1s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ctext x='400' y='280' font-family='Arial' font-size='20' fill='%23999' text-anchor='middle'%3E视频加载中%3C/text%3E%3C/svg%3E"
                className="mt-4 w-full rounded-lg border border-white/10"
              />
            ) : (
              feature.demo && (
                <img
                  src={feature.demo}
                  alt=""
                  className="mt-4 w-full rounded-lg border border-white/10"
                />
              )
            )}

            <feature.icon className="absolute top-8 right-8 size-16 text-emerald-400 opacity-25" />
          </Link>
        ))}
      </section>

      {/* ─── Extension API ─── */}
      <section className="ticks-neutral-700 mx-auto flex max-w-(--fd-layout-width) flex-col items-center gap-6 border border-b-0 border-neutral-700 px-32 py-24">
        <h2 className="text-3xl font-semibold text-white md:text-6xl">
          扩展系统
        </h2>
        <p className="opacity-50">
          v3.0 引入的扩展系统，让开发者可以通过 JavaScript 为软件添加任意功能。
          所有 API 通过{" "}
          <code className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-sm text-emerald-400">
            await prg.xxx()
          </code>{" "}
          调用。
        </p>
      </section>
      <section className="ticks-neutral-700 divide-nickel mx-auto grid max-w-(--fd-layout-width) grid-cols-1 divide-x divide-y divide-neutral-700 border border-b-0 border-neutral-700 sm:grid-cols-4">
        {apiFeatures.map((api) => (
          <Link
            key={api.href}
            href={api.href}
            className="relative flex flex-col gap-2 p-8 nth-last-[-n+4]:border-b-0"
          >
            <h3 className="text-2xl font-semibold text-white">{api.title}</h3>
            <p className="opacity-50">{api.description}</p>
            <div className="overflow-x-auto rounded-lg bg-neutral-900 px-3 py-2 font-mono text-xs text-emerald-400/80">
              {api.code}
            </div>

            <api.icon className="absolute top-8 right-8 size-6 text-emerald-400 opacity-25" />
          </Link>
        ))}
      </section>

      {/* Comments */}
      <section className="ticks-neutral-700 mx-auto flex max-w-(--fd-layout-width) flex-col items-center gap-6 border border-b-0 border-neutral-700 px-32 py-24">
        <h2 className="text-3xl font-semibold text-white md:text-6xl">
          深受社区喜爱
        </h2>
        <p className="opacity-50">不要只听我们说，来听听用户的声音</p>
      </section>
      <section className="ticks-neutral-700 relative mx-auto flex max-w-(--fd-layout-width) flex-col items-center gap-4 border border-b-0 border-neutral-700 px-8 py-16 md:px-32">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {comments.map((item, i) => (
            <div
              key={i}
              className="mb-6 inline-block w-full rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]"
            >
              <p className="mb-3 text-xl leading-relaxed opacity-75">
                {item.comment}
              </p>
              <p className="text-right text-emerald-400/80">— {item.name}</p>
            </div>
          ))}
        </div>
        <Link
          href="/donate"
          className="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
        >
          <Heart className="h-5 w-5" />
          查看更多
        </Link>
      </section>
      <section className="ticks-neutral-700 relative mx-auto grid max-w-(--fd-layout-width) grid-cols-3 flex-col items-center gap-6 border border-neutral-700 px-32 py-24">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-2xl font-medium opacity-50 md:text-3xl">
            总用户数
          </h3>
          <span className="text-4xl md:text-6xl">{stats.totalUsers}</span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-2xl font-medium opacity-50 md:text-3xl">
            日均活跃用户
          </h3>
          <span className="text-4xl md:text-6xl">{stats.averageDau}</span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-2xl font-medium opacity-50 md:text-3xl">
            GitHub Stars
          </h3>
          <span className="text-4xl md:text-6xl">{stats.githubStars}</span>
        </div>

        <div className="absolute bottom-2 left-2 flex flex-col text-xs opacity-25">
          <p>数据可能与实际数据存在差异。</p>
          <p>
            总用户数：自 2025 年 8 月 26 日起，所有启动过 Project Graph
            的用户数量总和。数据来源于 Project Graph 的匿名统计系统。
          </p>
          <p>
            日均活跃用户：过去 60 天内所有在 Project Graph
            中打开文件的记录，按天和用户去重，再按天统计独立用户数，最后取天数的算术平均值。数据来源于
            Project Graph 的匿名统计系统。
          </p>
          <p>
            GitHub Stars：graphif/project-graph 仓库的 Star 数量。数据来源于
            GitHub API。
          </p>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="mx-auto mt-16 max-w-7xl px-6 pb-24">
        <div className="flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-24 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            开始使用 Project Graph
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/release/latest"
              className="group flex items-center gap-2 rounded-xl border-4 border-emerald-500 px-5 py-1 font-bold text-white transition-all hover:border-8 hover:bg-emerald-800 active:scale-95"
            >
              <Download className="h-5 w-5" />
              立即下载
            </Link>
            <Link
              href="/docs/prg"
              className="flex items-center gap-2 rounded-xl border-4 border-blue-500 px-5 py-1 font-bold text-white transition-all hover:border-8 hover:bg-blue-800 active:scale-95"
            >
              <BookOpen className="h-5 w-5" />
              阅读文档
            </Link>
            <Link
              href="/docs/extension"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <Sparkles className="h-5 w-5" />
              开发扩展
            </Link>
            <Link
              href="/donate"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <Heart className="h-5 w-5" />
              前往赞助
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Icons ─────────────────────────────────────────────

const GithubIcon = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<"svg">>(
  function GithubIcon(props, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.426 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.344-3.369-1.344-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.56 9.56 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .269.18.58.688.481A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
      </svg>
    );
  },
);
