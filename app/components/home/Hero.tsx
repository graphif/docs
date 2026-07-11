"use client";

import Link from "fumadocs-core/link";
import {
  ArrowRight,
  BookOpen,
  Box,
  Check,
  Copy,
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
import {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import type { StatsData } from "../../[lang]/(home)/page.client";

// ─── Data ─────────────────────────────────────────────

const coreFeatures = [
  {
    icon: Scaling,
    title: "自由布局",
    description: "随心拖拽、自由缩放，像在白板上构思一样无拘无束。",
    href: "/docs/prg/features/feature/camera",
    demo: "https://assets.graphif.dev/videos/demo-scale.webm",
  },
  {
    icon: GitBranch,
    title: "丰富的连线样式",
    description: "直线、曲线、贝塞尔、折线、弧形线……多种连线类型适配不同场景。",
    href: "/docs/prg/features/stage-object/association",
    demo: "",
  },
  {
    icon: Type,
    title: "多样的节点类型",
    description: "文本、LaTeX 公式、图片、SVG、引用块、框……覆盖各种表达需求。",
    href: "/docs/prg/features/stage-object/entity",
    demo: "",
  },
  {
    icon: Link2,
    title: "双向引用",
    description: "双链 + 孪生关系，节点间可建立双向关联，打破层级束缚。",
    href: "/docs/prg/features/stage-object/association/sync-association",
    demo: "https://assets.graphif.dev/videos/sync-association.mp4",
  },
  {
    icon: Puzzle,
    title: "外部集成",
    description: "与 Xmind、Draw.io、Obsidian、VSCode、Joplin 等工具无缝对接。",
    href: "/docs/prg/features/integration",
    demo: "",
  },
  {
    icon: Keyboard,
    title: "快捷键系统",
    description: "支持按键序列（C-S-A-t），可自定义、可绑定右键菜单和菜单栏。",
    href: "/docs/prg/features/feature/shortcut-key",
    demo: "",
  },
  {
    icon: TreePine,
    title: "节点树",
    description: "以树形结构总览所有节点，快速定位和导航复杂画布内容。",
    href: "/docs/prg/features/feature/tree",
    demo: "",
  },
  {
    icon: Download,
    title: "一键导出 / 导入",
    description: "单文件分发，支持与 Draw.io、幕布等多格式互导。",
    href: "/docs/prg/features/feature/export",
    demo: "",
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

// ─── Hover Preview ────────────────────────────────────

function isVideoUrl(url: string): boolean {
  return url.endsWith(".webm") || url.endsWith(".mp4");
}

function CardWithPreview({
  demo,
  children,
}: {
  demo?: string;
  children: ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative size-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && demo && (
        <div className="absolute left-1/2 z-50 mt-2 -translate-x-1/2">
          <div className="w-96 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
            {isVideoUrl(demo) ? (
              <video src={demo} autoPlay muted loop playsInline />
            ) : (
              <img src={demo} alt="" className="h-96 w-auto" />
            )}
          </div>
        </div>
      )}
    </div>
  );
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
    <main className="bg-slate-950 text-white selection:bg-emerald-500 selection:text-white">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,oklch(76.5%_0.177_163.223/12%),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,oklch(70.7%_0.165_254.624/5%),transparent_20%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-400 uppercase">
            <Sparkles className="h-3 w-3" />
            Project Graph v3.0 · 扩展系统已发布
          </div>

          <h1 className="mb-6 max-w-4xl text-5xl leading-tight font-black tracking-tight text-white md:text-7xl">
            <span className="text-emerald-400">无限画布</span>的节点图绘制工具
            <br />以<span className="text-blue-400">扩展</span>驱动无限可能
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Project Graph 是一款专注于快速绘制节点图的桌面工具。 全新的 v3.0
            扩展系统让开发者可以自定义快捷键、对话框、节点类型、主题……
            将软件的能力延伸到任何你需要的方向。
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/release/latest"
              className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-bold text-white transition-all hover:bg-emerald-400 active:scale-95"
            >
              立即下载
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs/prg"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-blue-500 px-8 py-4 font-bold text-white transition-all hover:bg-blue-400 active:scale-95"
            >
              <BookOpen className="h-5 w-5" />
              阅读文档
            </Link>
            <Link
              href="/donate"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <Heart className="h-5 w-5" />
              赞助
            </Link>
            <Link
              href="https://github.com/graphif"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <GithubIcon className="h-5 w-5" />
              GitHub
              {stats.githubStars > 0 && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-slate-300">
                  {stats.githubStars.toLocaleString()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Core Features ─── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          核心功能
        </h2>
        <p className="mb-12 max-w-2xl text-slate-400">
          无论你是设计师、开发者、教师还是研究者，Project Graph
          都能帮你快速绘制清晰的分析框架图。
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <CardWithPreview key={feature.href} demo={feature.demo}>
              <Link
                href={feature.href}
                className="group block size-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:bg-white/5 active:scale-[0.98]"
              >
                <feature.icon className="mb-4 h-6 w-6 text-emerald-400" />
                <h3 className="mb-2 font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </Link>
            </CardWithPreview>
          ))}
        </div>
      </section>

      {/* ─── Extension API ─── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          扩展系统 · API 能力
        </h2>
        <p className="mb-12 max-w-2xl text-slate-400">
          v3.0 引入的扩展系统，让开发者可以通过 JavaScript 为软件添加任意功能。
          所有 API 通过{" "}
          <code className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-sm text-emerald-400">
            await prg.xxx()
          </code>{" "}
          调用。
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {apiFeatures.map((api) => (
            <CardWithPreview key={api.href} demo={api.demo}>
              <Link
                href={api.href}
                className="group block size-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:bg-white/5 active:scale-[0.98]"
              >
                <api.icon className="mb-4 h-6 w-6 text-emerald-400" />
                <h3 className="mb-2 font-bold text-white">{api.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-slate-500">
                  {api.description}
                </p>
                <div className="overflow-x-auto rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-emerald-400/80">
                  {api.code}
                </div>
              </Link>
            </CardWithPreview>
          ))}
        </div>
      </section>

      {/* ─── Dev Workflow ─── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          快速上手扩展开发
        </h2>
        <p className="mb-12 max-w-2xl text-slate-400">
          使用官方提供的{" "}
          <code className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-sm text-emerald-400">
            extprg
          </code>{" "}
          工具链，几分钟即可创建你的第一个扩展。
        </p>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            {
              step: "01",
              title: "创建项目",
              cmd: "pnpm create extprg",
              desc: "运行命令，按照提示输入名称、作者等信息，生成扩展项目。",
              href: "/docs/extension/extprg",
            },
            {
              step: "02",
              title: "编写代码",
              cmd: "pnpm dev",
              desc: "边开发边自动编译，享受 TypeScript 类型提示和自动安装。",
              href: "/docs/extension/extprg",
            },
            {
              step: "03",
              title: "打包分发",
              cmd: "pnpm package",
              desc: "打包成 .prg 文件，发布到 GitHub Release。",
              href: "/docs/extension/extprg",
            },
            {
              step: "04",
              title: "扩展市场",
              cmd: "自动收录",
              desc: "开源扩展设置 extprg Topic 即可自动被扩展市场收录。",
              href: "/docs/extension/distribution/marketplace",
            },
          ].map((item) => (
            <Link
              key={item.step}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:bg-white/5 active:scale-[0.98]"
            >
              <span className="mb-3 block text-3xl font-black text-emerald-500/30">
                {item.step}
              </span>
              <h3 className="mb-2 font-bold text-white">{item.title}</h3>
              <div className="mb-2 rounded-lg bg-slate-900 px-3 py-2 font-mono text-sm text-emerald-400/80">
                {item.cmd}
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-10 md:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              不会写代码？让 AI 帮你写
            </h2>
            <p className="mb-8 text-slate-400">
              将以下提示词发送给 OpenCode, Codex, Claude Code 等 Agent
              工具，它们就能了解 Project Graph 的全部功能并为你编写扩展。
            </p>

            <div className="mb-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-6 py-4 font-mono text-sm text-emerald-400">
              <span>Read https://graphif.dev/llms.txt</span>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-lg border border-white/10 p-1.5 text-slate-400 transition-all hover:bg-white/5 hover:text-white active:scale-90"
                aria-label="复制提示词"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/docs/extension"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            查看扩展开发文档
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-10 md:grid-cols-3 md:p-14">
          <div className="flex flex-col items-center border-white/5 md:border-r">
            <span className="mb-1 text-sm font-bold text-emerald-500 uppercase">
              总用户数
            </span>
            <span className="text-4xl font-black text-white">
              {stats.totalUsers.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center border-white/5 md:border-r">
            <span className="mb-1 text-sm font-bold text-blue-500 uppercase">
              日均活跃用户
            </span>
            <span className="text-4xl font-black text-white">
              {stats.averageDau.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-1 text-sm font-bold text-purple-500 uppercase">
              GitHub Stars
            </span>
            <span className="text-4xl font-black text-white">
              {stats.githubStars.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-14 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            开始使用 Project Graph
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/release/latest"
              className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-bold text-white transition-all hover:bg-emerald-400 active:scale-95"
            >
              下载最新版
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs/prg"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <BookOpen className="h-5 w-5" />
              阅读文档
            </Link>
            <Link
              href="/docs/extension"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <Sparkles className="h-5 w-5" />
              开发扩展
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
