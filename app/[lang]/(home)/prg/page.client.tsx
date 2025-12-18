"use client";

import { cn } from "@/lib/cn";
import Link from "fumadocs-core/link";
import {
  ArrowUpRight,
  Box,
  Check,
  CheckCircle2,
  CloudUpload,
  GitBranch,
  Github,
  Globe,
  LayoutDashboard,
  MonitorCog,
  Palette,
  Shield,
  Terminal,
  Twitter,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { ReactNode, useEffect, useRef } from "react";
import { StatsData } from "./page";

// --- Types ---

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

type Tier = {
  name: string;
  price: string;
  subtitle: string;
  highlight?: string;
  features: string[];
  cta: string;
  to: string;
};

type Developer = {
  name: string;
  handle: string;
  roles: string[];
  links: {
    label: string;
    to: string;
    icon?: LucideIcon;
  }[];
};

// --- Data ---

const featureRows: Feature[] = [
  {
    title: "多模态创意画布",
    description:
      "在单一工作区里完成笔记、头脑风暴、思维导图与分析框架图切换，结构化块与自由节点随心融合。",
    icon: LayoutDashboard,
    accent: "text-emerald-500",
  },
  {
    title: "桌面端原生体验",
    description:
      "跨 macOS / Windows / Linux 的高保真桌面端 App，离线可用，配合云同步实现团队协作。",
    icon: MonitorCog,
    accent: "text-amber-500",
  },
  {
    title: "WebDAV 云同步",
    description:
      "兼容主流云存储服务的 WebDAV 协议，轻松连接 Nextcloud、OwnCloud、Box.com 等，实现跨设备数据同步。",
    icon: CloudUpload,
    accent: "text-purple-500",
  },
  {
    title: "简洁流畅的 UI",
    description:
      "基于 shadcn/ui 和自研多窗口系统打造的现代化界面，支持用户自定义主题颜色以及多窗口布局。",
    icon: Palette,
    accent: "text-blue-500",
  },
];

const tiers: Tier[] = [
  {
    name: "OSS",
    price: "免费 · 开源",
    subtitle: "GPL 3.0 开源授权，适合个人与独立创作者。",
    features: [
      "完整桌面端应用",
      "无限节点与画布",
      "插件与主题系统",
      "本地加密与版本历史",
    ],
    cta: "立即下载",
    to: "/release/latest",
  },
];

const developers: Developer[] = [
  {
    name: "阿岳",
    handle: "Littlefean",
    roles: [
      "Windows 与 macOS 版本维护者",
      "逻辑节点开发与 1.7 无向边实现",
      "基础功能与 Mac 触摸板体验打磨",
      "快捷键、秘籍键、音效与特效设计",
      "视频教程与新手引导制作发布",
    ],
    links: [
      { label: "GitHub", to: "https://github.com/Littlefean", icon: Github },
      { label: "Blog", to: "https://littlefean.github.io", icon: Globe },
      {
        label: "Bilibili",
        to: "https://space.bilibili.com/480804525",
        icon: MonitorCog,
      },
    ],
  },
  {
    name: "ZTY",
    handle: "zty012",
    roles: [
      "Linux 版本维护者",
      "1.8-2.0 重构与多标签页功能",
      "PRG 文件格式设计",
      "服务器与域名采购、官网与文档部署",
      "云存储规划与 UI 设计",
      "PyQt 到 1.0 Tauri 重构开创者",
    ],
    links: [
      { label: "GitHub", to: "https://github.com/zty012", icon: Github },
      { label: "Blog", to: "https://2y.nz", icon: Globe },
      { label: "X", to: "https://x.com/@zty012x", icon: Twitter },
    ],
  },
  {
    name: "小劫",
    handle: "Rutubet",
    roles: ["项目提出者", "CR 流程与贝塞尔曲线设计", "递归紧密堆积算法设计"],
    links: [
      { label: "GitHub", to: "https://github.com/Rutubet", icon: Github },
      { label: "Blog", to: "https://rutubet.top", icon: Globe },
    ],
  },
];

// --- Animation Components ---

function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 32 : direction === "down" ? -32 : 0,
      x: direction === "left" ? 32 : direction === "right" ? -32 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "50px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

function CountUp({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, end, {
        duration: duration / 1000,
        ease: [0.16, 1, 0.3, 1],
      });
    }
  }, [isInView, end, duration, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// --- Main Page Component ---

export default function HomePage({ stats }: { stats: StatsData }) {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 dark:bg-slate-950 dark:text-white dark:selection:bg-emerald-900 dark:selection:text-emerald-100">
      <Hero stats={stats} />
      <FeatureRows />
      <FormatShowcase />
      <DeveloperShowcase />
      <Pricing />
      <FinalCTA />
    </main>
  );
}

// --- Sections ---

function Hero({ stats }: { stats: StatsData }) {
  return (
    <section className="relative isolate flex min-h-[90vh] flex-col justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-emerald-200/30 mix-blend-multiply blur-[120px] dark:bg-emerald-500/10 dark:mix-blend-screen" />
        <div className="absolute right-0 bottom-0 h-[600px] w-[800px] rounded-full bg-blue-200/30 mix-blend-multiply blur-[120px] dark:bg-blue-500/10 dark:mix-blend-screen" />
        <div className="absolute top-1/2 left-0 h-[400px] w-[600px] rounded-full bg-purple-200/30 mix-blend-multiply blur-[100px] dark:bg-purple-500/10 dark:mix-blend-screen" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:px-8 lg:pt-32">
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={0}>
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 backdrop-blur-sm dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-200">
              <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
              v2.0 is now available
            </div>
          </FadeIn>

          <FadeIn delay={100} className="mt-8 max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl dark:text-white">
              Project{" "}
              <span className="bg-linear-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-blue-500">
                Graph
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              无限画布上的思维操作系统。融合笔记、思维导图与系统分析，
              用图论拓扑重构你的知识网络。
            </p>
          </FadeIn>

          <FadeIn
            delay={200}
            className="mt-10 flex flex-col items-center gap-6 sm:flex-row"
          >
            <Link
              href="/release/latest"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-slate-800 hover:shadow-xl hover:shadow-emerald-500/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              下载桌面端
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link
              href="/docs/prg"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-slate-900 transition-all hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
            >
              浏览文档
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </FadeIn>

          <FadeIn
            delay={400}
            className="mt-16 grid grid-cols-2 gap-8 border-t border-slate-200/60 pt-10 sm:grid-cols-3 lg:gap-16 dark:border-white/10"
          >
            <StatItem label="创作者" value={stats.totalUsers} />
            <StatItem label="活跃用户" value={stats.averageDau} />
            <StatItem label="GitHub Stars" value={stats.githubStars} />
          </FadeIn>
        </div>
      </div>

      {/* Decorative UI Mockup hint */}
      <div className="pointer-events-none mx-auto mt-16 max-w-7xl px-6 opacity-50 select-none lg:px-8 dark:opacity-30">
        {/*<div className="relative rounded-xl bg-slate-900/5 p-2 ring-1 ring-slate-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-white/5 dark:ring-white/10">
          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-md bg-white/50 shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-800/50 dark:ring-white/10">
            <div className="text-sm text-slate-400">
              Application Interface Preview
            </div>
          </div>
        </div>*/}
      </div>
    </section>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-y-2">
      <dt className="text-sm leading-6 text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
        <CountUp end={value} />
      </dd>
    </div>
  );
}

function FeatureRows() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base leading-7 font-semibold text-emerald-600 dark:text-emerald-400">
              更快，更强，更自由
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              为专业思考者打造的工具箱
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              不仅仅是绘图工具，更是一个完整的知识管理环境。
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {featureRows.map((feature, index) => (
              <FadeIn
                key={feature.title}
                delay={index * 100}
                className="flex flex-col"
              >
                <div className="group relative flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-emerald-500/50 dark:bg-slate-800/50 dark:ring-white/10 dark:hover:ring-emerald-400/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-emerald-50 dark:bg-slate-900 dark:group-hover:bg-emerald-900/30">
                    <feature.icon
                      className={cn(
                        "h-6 w-6 transition-colors",
                        feature.accent,
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-xl leading-7 font-semibold text-slate-900 dark:text-white">
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-300">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function FormatShowcase() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <FadeIn direction="right">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base leading-7 font-semibold text-emerald-600 dark:text-emerald-400">
                  Format & Share
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  特有的 .prg 文件格式
                </p>
                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                  采用 ZIP + MsgPack 双层封装，让结构化数据与素材一起打包。
                  文件体积极小，解析速度极快。
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-600 dark:text-slate-300">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-slate-900 dark:text-white">
                      <Box className="absolute top-1 left-1 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      随时拎走整个项目
                    </dt>
                    <dd className="inline">
                      {" "}
                      · 单一文件保存图表、标签、评论与历史版本。
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-slate-900 dark:text-white">
                      <Zap className="absolute top-1 left-1 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      ZIP + MsgPack
                    </dt>
                    <dd className="inline">
                      {" "}
                      · 对比 JSON 更节省 40% 以上空间，二进制解析极快。
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-slate-900 dark:text-white">
                      <GitBranch className="absolute top-1 left-1 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      适合自动化协作
                    </dt>
                    <dd className="inline">
                      {" "}
                      · 完美支持 Git LFS 与 CI/CD 流水线。
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={200}>
            <div className="relative rounded-3xl bg-slate-900 p-8 shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-800 dark:ring-white/10">
              <div className="pointer-events-none absolute top-0 left-0 h-full w-full rounded-3xl bg-linear-to-br from-emerald-500/10 to-blue-500/10" />
              <div className="space-y-6 font-mono text-sm text-slate-300">
                <div className="flex items-center gap-2 border-b border-slate-700 pb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-slate-500">
                    project.prg — Hex View
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 opacity-80 **:font-mono">
                  <div>00000000</div>
                  <div className="col-span-3 text-emerald-400">
                    50 4B 03 04 14 00 00 00 08 00 ...
                  </div>
                  <div>00000010</div>
                  <div className="col-span-3 text-blue-400">
                    81 A4 72 6F 6F 74 93 A4 6E 6F ...
                  </div>
                  <div>00000020</div>
                  <div className="col-span-3 text-purple-400">
                    A4 64 61 74 61 C4 10 00 11 22 ...
                  </div>
                </div>
                <div className="rounded bg-slate-950/50 p-4 text-xs">
                  <p className="text-slate-500"># Metadata</p>
                  <p>
                    <span className="text-blue-400">Content-Type:</span>{" "}
                    application/vnd.project-graph
                  </p>
                  <p>
                    <span className="text-blue-400">Compression:</span> Deflate
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function DeveloperShowcase() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              核心开发者
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Project Graph
              由核心贡献者持续迭代，将开源精神与高质量体验编织进每个版本。
            </p>
          </div>
        </FadeIn>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {developers.map((dev, index) => (
            <FadeIn
              key={dev.name}
              delay={index * 150}
              className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-2 hover:shadow-lg dark:bg-slate-800 dark:ring-white/10"
            >
              <div>
                <div className="flex items-center gap-x-4">
                  <img
                    className="h-16 w-16 rounded-full bg-slate-50 ring-2 ring-white dark:ring-slate-700"
                    src={`https://github.com/${dev.handle}.png`}
                    alt=""
                  />
                  <div>
                    <h3 className="text-lg leading-7 font-semibold tracking-tight text-slate-900 dark:text-white">
                      {dev.name}
                    </h3>
                    <p className="text-sm leading-6 font-semibold text-emerald-600 dark:text-emerald-400">
                      @{dev.handle}
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  {dev.roles.map((role) => (
                    <div
                      key={role}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex gap-4 border-t border-slate-100 pt-6 dark:border-slate-700">
                {dev.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.to}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 transition-colors hover:text-emerald-500"
                  >
                    <span className="sr-only">{link.label}</span>
                    {link.icon ? (
                      <link.icon className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </a>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={400} className="mt-12 text-center">
          <Link
            href="/docs/prg/misc/donate"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
          >
            查看完整捐赠与贡献详情 <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              开源基因，灵活选择
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              作为开源项目，你可以自由 fork
              与自定义；而付费计划提供了开箱即用的云同步功能和专业支持。
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-slate-50/50 ring-1 ring-slate-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none dark:bg-slate-900/50 dark:ring-white/10">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              OSS Community
            </h3>
            <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-300">
              GPL 3.0
              开源授权，适合个人与独立创作者。拥有完整的本地功能，无任何功能阉割。
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm leading-6 font-semibold text-emerald-600 dark:text-emerald-400">
                包含功能
              </h4>
              <div className="h-px flex-auto bg-slate-200 dark:bg-slate-700" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-slate-600 sm:grid-cols-2 sm:gap-6 dark:text-slate-300"
            >
              {tiers[0].features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check
                    className="h-6 w-5 flex-none text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
            <div className="rounded-2xl bg-slate-50 py-10 text-center ring-1 ring-slate-900/5 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16 dark:bg-slate-800/50 dark:ring-white/10">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-slate-600 dark:text-slate-400">
                  完全免费
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Free
                  </span>
                  <span className="text-sm leading-6 font-semibold tracking-wide text-slate-600 dark:text-slate-400">
                    / Forever
                  </span>
                </p>
                <Link
                  href="/release/latest"
                  className="mt-10 block w-full rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  立即下载
                </Link>
                <p className="mt-6 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  遵循 GPL 3.0 协议
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900 py-16 sm:py-24 lg:py-32 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              准备好开始了吗？
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              将灵感、流程与知识全部编织在一个画布里。立即体验 Project Graph
              的高保真桌面端，用几何化的秩序守护无限的创造力。
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <Link
                href="/release/latest"
                className="flex-none rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                免费下载
              </Link>
              <Link
                href="/docs/prg"
                className="flex-none rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                阅读文档
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <Terminal className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">开发者友好</dt>
              <dd className="mt-2 leading-7 text-slate-400">
                提供丰富的插件 API 与自定义脚本支持，让工具适应你的工作流。
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <Shield className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">隐私优先</dt>
              <dd className="mt-2 leading-7 text-slate-400">
                本地优先存储，数据完全掌握在自己手中，无任何隐式上传。
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}
