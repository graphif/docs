"use client";

import Link from "fumadocs-core/link";
import {
  ArrowUpRight,
  CloudUpload,
  Code,
  LayoutDashboard,
  MonitorCog,
  Palette,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { StatsData } from "./page";

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
  }[];
};

const featureRows: Feature[] = [
  {
    title: "多模态创意画布",
    description:
      "在单一工作区里完成笔记、头脑风暴、流程图与思维导图切换，结构化块与自由节点随心融合。",
    icon: LayoutDashboard,
    accent:
      "from-emerald-500 via-cyan-500 to-blue-500 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-500",
  },
  {
    title: "桌面端原生体验",
    description:
      "跨 macOS / Windows / Linux 的高保真桌面端 App，离线可用，配合云同步实现团队协作。",
    icon: MonitorCog,
    accent:
      "from-amber-400 via-orange-400 to-pink-500 dark:from-amber-300 dark:via-orange-400 dark:to-pink-500",
  },
  {
    title: "WebDAV 云同步",
    description:
      "兼容主流云存储服务的 WebDAV 协议，轻松连接 Nextcloud、OwnCloud、Box.com 等，实现跨设备数据同步。",
    icon: CloudUpload,
    accent:
      "from-purple-500 via-fuchsia-500 to-rose-500 dark:from-purple-400 dark:via-fuchsia-400 dark:to-rose-500",
  },
  {
    title: "简洁流畅的 UI",
    description:
      "基于 shadcn/ui 和自研多窗口系统打造的现代化界面，支持用户自定义主题颜色以及多窗口布局。",
    icon: Palette,
    accent:
      "from-blue-500 via-indigo-500 to-slate-500 dark:from-blue-300 dark:via-indigo-400 dark:to-slate-500",
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
  // {
  //   name: "Studio",
  //   price: "¥89 / 月 / 席位",
  //   subtitle: "面向专业工作室与创新团队的托管服务。",
  //   highlight: "最受团队欢迎",
  //   features: [
  //     "团队空间与权限矩阵",
  //     "云端实时协同",
  //     "Graphif Serializer 企业支持",
  //     "优先路线图通道与顾问",
  //   ],
  //   cta: "预约团队演示",
  // },
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
      {
        label: "GitHub",
        to: "https://github.com/Littlefean",
      },
      {
        label: "Blog",
        to: "https://littlefean.github.io",
      },
      {
        label: "Bilibili",
        to: "https://space.bilibili.com/480804525",
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
      {
        label: "GitHub",
        to: "https://github.com/zty012",
      },
      {
        label: "Blog",
        to: "https://2y.nz",
      },
      {
        label: "X",
        to: "https://x.com/@zty012x",
      },
    ],
  },
  {
    name: "小劫",
    handle: "Rutubet",
    roles: ["项目提出者", "CR 流程与贝塞尔曲线设计", "递归紧密堆积算法设计"],
    links: [
      {
        label: "GitHub",
        to: "https://github.com/Rutubet",
      },
      {
        label: "Blog",
        to: "https://rutubet.top",
      },
    ],
  },
];

export default function HomePage({ stats }: { stats: StatsData }) {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <Hero stats={stats} />
      <FeatureRows />
      <ModeShowcase />
      <DeveloperShowcase />
      <Pricing />
      <FinalCTA />
    </main>
  );
}

function Hero({ stats }: { stats: StatsData }) {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-emerald-100 via-sky-100 to-indigo-100 dark:from-emerald-800 dark:via-slate-900 dark:to-indigo-900">
      <div className="absolute inset-0 opacity-60 dark:opacity-40">
        <div className="absolute top-20 -left-24 h-64 w-64 rounded-full bg-emerald-300 blur-[120px] dark:bg-emerald-400" />
        <div className="absolute top-0 right-10 h-72 w-72 rounded-full bg-cyan-300 blur-[160px] dark:bg-cyan-500" />
        <div className="absolute bottom-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-purple-300 blur-[140px] dark:bg-purple-500" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pt-28 pb-24 lg:flex-row lg:items-center lg:pt-36">
        <div className="w-full space-y-10 lg:w-1/2">
          <span className="text-xs tracking-[0.4em] text-emerald-700 uppercase dark:text-emerald-200">
            Graphif
          </span>
          <h1 className="text-4xl leading-tight text-balance text-slate-900 sm:text-5xl lg:text-[4.5rem] dark:text-white">
            Project Graph
          </h1>
          <p className="text-lg text-slate-600 dark:text-white/80">
            这是一款由 Graphif
            组织打造的桌面端创意工作台，在一个画布中完成笔记、头脑风暴、流程图与思维导图的纵深协作。基于图论的拓扑布局帮助你掌控复杂知识网络，并保持灵感流动。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/release/latest"
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:translate-y-0.5 hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-emerald-100"
            >
              下载桌面端
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/docs/app"
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-900/20 px-6 py-3 font-semibold text-slate-900 transition hover:border-slate-900 dark:border-white/30 dark:text-white dark:hover:border-white"
            >
              浏览文档
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-slate-500 dark:text-white/70">
            <Stat label="创作者" value={stats.totalUsers} />
            <Stat label="活跃用户" value={stats.averageDau} />
            <Stat label="Stars" value={stats.githubStars} />
          </div>
        </div>
        {/*<div className="w-full lg:w-1/3">
          <div className="relative rounded-4xl border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur dark:border-white/15 dark:bg-white/10">
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-flex size-3 rounded-full bg-rose-400" />
              <span className="inline-flex size-3 rounded-full bg-amber-300" />
              <span className="inline-flex size-3 rounded-full bg-emerald-300" />
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 dark:border-white/15 dark:bg-white/5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.35em] text-slate-500 uppercase dark:text-white/60">
                      引用块开发
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      细节优化
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {roadmap.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div
                        className={`mt-1 size-2 rounded-full ${
                          item.highlight
                            ? "bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                            : "bg-slate-400 dark:bg-white/30"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-white/60">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    </section>
  );
}

function formatStatValue(value: number) {
  if (value >= 10000) {
    const display =
      value % 10000 === 0
        ? (value / 10000).toString()
        : (value / 10000).toFixed(1).replace(/\.0$/, "");
    return `${display}万+`;
  }
  if (value >= 100) {
    const rounded = Math.round(value / 100) * 100;
    return `${rounded}+`;
  }
  return `${value}+`;
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-2xl font-semibold text-slate-900 dark:text-white">
        {formatStatValue(value)}
      </p>
      <p className="text-xs tracking-[0.3em] text-slate-500 uppercase dark:text-white/60">
        {label}
      </p>
    </div>
  );
}

function FeatureRows() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {featureRows.map((feature) => (
            <article
              key={feature.title}
              className="group flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 p-8 transition hover:-translate-y-1 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white">
                <feature.icon className="size-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-base text-slate-600 dark:text-white/70">
                  {feature.description}
                </p>
              </div>
              <div
                className={`h-px w-full bg-linear-to-r ${feature.accent} opacity-70`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModeShowcase() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col gap-10 text-center">
          <div>
            <p className="text-sm tracking-[0.4em] text-slate-500 uppercase dark:text-white/60">
              Light & Dark
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
              双重光感，永远保持平衡
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-white/70">
              Project Graph
              的高保真界面为明暗模式各自设计独立网格体系，保证色彩一致与对比度安全。
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ModeCard
              title="明亮"
              description="白底黑字的极简主题，类似白纸的质感，适合白天的会议记录与笔记整理。"
              theme="light"
            />
            <ModeCard
              title="黑夜"
              description="深色画布搭配彩色色块，在夜间头脑风暴中保持沉浸与聚焦。"
              theme="dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ModeCard({
  title,
  description,
  theme,
}: {
  title: string;
  description: string;
  theme: "light" | "dark";
}) {
  const isLight = theme === "light";
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-left dark:border-white/10 dark:bg-white/5">
      <div
        className={`rounded-2xl border p-6 shadow-2xl ${
          isLight
            ? "border-slate-200 bg-white text-slate-900"
            : "border-slate-700 bg-slate-900 text-white"
        }`}
      >
        <div className="mb-4 flex gap-2">
          <span className="inline-flex size-3 rounded-full bg-rose-400" />
          <span className="inline-flex size-3 rounded-full bg-amber-300" />
          <span className="inline-flex size-3 rounded-full bg-emerald-300" />
        </div>
        <div className="space-y-4">
          <div className="grid gap-3">
            <div
              className={`h-3 w-24 rounded-full ${isLight ? "bg-slate-200" : "bg-white/40"}`}
            />
            <div
              className={`h-6 w-44 rounded-full ${isLight ? "bg-slate-900/10" : "bg-white/20"}`}
            />
          </div>
          <div
            className={`h-40 rounded-2xl border p-4 ${isLight ? "border-slate-100" : "border-white/10"}`}
          >
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className={`h-16 rounded-xl ${
                    isLight
                      ? "bg-linear-to-br from-emerald-100 to-cyan-100"
                      : "bg-linear-to-br from-emerald-500/30 to-cyan-500/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-slate-600 dark:text-white/70">{description}</p>
    </div>
  );
}

function DeveloperShowcase() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-sm tracking-[0.4em] text-slate-500 uppercase dark:text-white/60">
          Developers
        </p>
        <h2 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
          核心开发者
        </h2>
        <p className="mt-4 text-base text-slate-600 dark:text-white/70">
          Project Graph
          由核心贡献者持续迭代，他们把开源精神与高质量体验编织进每个版本。
        </p>
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4">
          {developers.map((dev) => (
            <article
              key={dev.name}
              className="flex flex-1 flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 p-8 text-left dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://github.com/${dev.handle}.png`}
                  alt={`${dev.name} avatar`}
                  className="size-20 rounded-full border border-slate-200 object-cover dark:border-white/10"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {dev.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-white/60">
                    @{dev.handle}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <ul className="space-y-2 text-sm text-slate-600 dark:text-white/70">
                  {dev.roles.map((role) => (
                    <li key={role} className="flex items-center gap-2">
                      <Code className="size-4 text-emerald-400 dark:text-emerald-300" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                {dev.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.to}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300"
                  >
                    <ArrowUpRight size={16} />
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/docs/app/misc/donate"
          className="mt-8 inline-flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-300"
        >
          查看完整捐赠与贡献详情
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col gap-6 text-center">
          <p className="text-sm tracking-[0.4em] text-slate-500 uppercase dark:text-white/60">
            Pricing
          </p>
          <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">
            开源基因，配合灵活付费计划
          </h2>
          <p className="text-base text-slate-600 dark:text-white/70">
            作为开源项目，你可以自由 fork
            与自定义；而付费计划提供了开箱即用的云同步功能和专业支持，满足团队协作需求。
          </p>
        </div>
        <div className="mt-12 flex justify-center gap-6">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`relative flex flex-col rounded-3xl border border-slate-200 p-8 dark:border-white/10 ${
                tier.highlight
                  ? "bg-linear-to-br from-emerald-200/60 to-blue-200/40 dark:from-emerald-500/20 dark:to-blue-500/10"
                  : "bg-white/90 dark:bg-white/5"
              }`}
            >
              {tier.highlight && (
                <span className="absolute top-6 right-6 rounded-full bg-slate-900/5 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-slate-700 uppercase dark:bg-white/15 dark:text-white">
                  {tier.highlight}
                </span>
              )}
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {tier.name}
                </h3>
                <p className="text-3xl font-semibold text-slate-900 dark:text-white">
                  {tier.price}
                </p>
                <p className="text-sm text-slate-600 dark:text-white/70">
                  {tier.subtitle}
                </p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-white/80">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Shield className="size-4 text-emerald-400 dark:text-emerald-300" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href={tier.to}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
                >
                  {tier.cta}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-linear-to-br from-emerald-200 via-slate-100 to-indigo-200 text-slate-900 dark:from-emerald-700 dark:via-slate-900 dark:to-indigo-900 dark:text-white">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-xs tracking-[0.5em] text-slate-500 uppercase dark:text-white/60">
          Ready
        </p>
        <h2 className="mt-6 text-5xl font-semibold">
          用 Project Graph 打造属于你的图谱操作系统
        </h2>
        <p className="mt-6 text-lg text-slate-600 dark:text-white/80">
          将灵感、流程与知识全部编织在一个画布里。立即体验 Project Graph
          的高保真桌面端，用几何化的秩序守护无限的创造力。
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/release/latest"
            className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white dark:bg-white dark:text-slate-900"
          >
            免费下载
            <ArrowUpRight className="size-4" />
          </Link>
          {/*<Link
            href="/demo"
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-900/40 px-6 py-3 text-base font-semibold text-slate-900 dark:border-white/40 dark:text-white"
          >
            预约 Studio 演示
          </Link>*/}
        </div>
      </div>
    </section>
  );
}
