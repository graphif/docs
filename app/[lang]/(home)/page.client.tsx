"use client";

import { cn } from "@/lib/cn";
import Link from "fumadocs-core/link";
import {
  ArrowRight,
  Box,
  Code2,
  Github,
  Globe,
  Layers,
  Layout,
  Terminal,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// --- Types ---

type ProductSlide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  image?: string;
  color: string;
  textGradient: string;
  bgGradient: string;
  cta: string;
  href: string;
  links: { label: string; href: string }[];
};

// --- Data ---

const products: ProductSlide[] = [
  {
    id: "prg",
    title: "Project Graph",
    subtitle: "无限画布的节点图绘制工具",
    description:
      "一个在无限画布上的革命性思维操作系统。将笔记、思维导图和系统分析与图论拓扑相结合，重构你的知识网络。",
    icon: Layout,
    image: "https://assets.graphif.dev/icon.png",
    color: "text-emerald-500",
    textGradient:
      "bg-gradient-to-br from-white via-emerald-100 to-emerald-500 bg-clip-text text-transparent",
    bgGradient: "from-emerald-500/20 via-slate-900 to-slate-900",
    cta: "探索 Project Graph",
    href: "/prg",
    links: [
      { label: "文档", href: "/docs/prg" },
      { label: "GitHub", href: "https://github.com/graphif/project-graph" },
      { label: "示例", href: "/docs/prg/examples" },
    ],
  },
  {
    id: "fs",
    title: "@graphif/fs",
    subtitle: "抽象的文件系统接口",
    description:
      "现代 Web 的抽象文件系统接口。通过统一的 API 无缝切换本地、内存和远程文件系统，让数据自由流动。",
    icon: Layers,
    color: "text-blue-500",
    textGradient:
      "bg-gradient-to-br from-white via-blue-100 to-blue-500 bg-clip-text text-transparent",
    bgGradient: "from-blue-500/20 via-slate-900 to-slate-900",
    cta: "查看文档",
    href: "/docs/fs",
    links: [],
  },
  {
    id: "serializer",
    title: "@graphif/serializer",
    subtitle: "比 class-transformer 更强大的序列化库",
    description:
      "为复杂对象图设计的下一代序列化库。类型安全，支持循环引用，速度极快，专为高性能场景打造。",
    icon: Box,
    color: "text-purple-500",
    textGradient:
      "bg-gradient-to-br from-white via-purple-100 to-purple-500 bg-clip-text text-transparent",
    bgGradient: "from-purple-500/20 via-slate-900 to-slate-900",
    cta: "了解更多",
    href: "/docs/serializer",
    links: [],
  },
];

const features = [
  {
    title: "开源核心",
    description: "建立在透明和社区信任之上。我们的核心技术开放供审查和贡献。",
    icon: Github,
  },
  {
    title: "原生性能",
    description: "使用 Rust 和现代 Web 技术优化速度。体验零延迟的交互快感。",
    icon: Zap,
  },
  {
    title: "开发者优先",
    description: "具有丰富 API 的可扩展架构。轻松构建插件、主题和集成。",
    icon: Terminal,
  },
];

// --- Components ---

export default function PageClient() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-white selection:bg-emerald-500/30">
      <MainHero />
      <ProductCarousel />
      <PhilosophySection />
      <EcosystemGrid />
      <CallToAction />
    </main>
  );
}

function MainHero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 pt-20 pb-32 text-center lg:pt-32">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]" />

      {/* Radial Gradient */}
      <div className="absolute top-0 right-0 left-0 h-[500px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 backdrop-blur-md">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            全新官网首页已上线
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            续写
          </span>
          未竟之章
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
        >
          Graphif 是一个开源组织，旨在打造次世代的应用和拥有现代开发体验的库。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-emerald-400 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
          >
            开始探索
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            href="https://github.com/graphif"
            className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/10 transition-all hover:bg-white/10"
          >
            <Github className="h-4 w-4" />
            访问 GitHub
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-sm text-slate-500">
          <span className="text-xs tracking-widest uppercase">滚动</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-slate-500 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slide = products[current];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
      opacity: 0,
      scale: 0.92,
      filter: "blur(8px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.92,
      filter: "blur(8px)",
    }),
  };

  return (
    <section
      id="products"
      className="relative h-[95vh] w-full overflow-hidden bg-slate-950"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]" />

      <AnimatePresence custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", ease: [0.19, 1, 0.22, 1], duration: 1.2 },
            opacity: { duration: 0.8 },
            scale: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
            filter: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Background Gradient */}
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-br opacity-10 transition-colors duration-1000",
              slide.bgGradient,
            )}
          />

          {/* Content */}
          <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 gap-8 px-6 pt-20 pb-32 lg:grid-cols-2 lg:px-8 lg:pt-0 lg:pb-0">
            {/* Left: Illustration */}
            <div className="flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                {slide.image ? (
                  <>
                    <img
                      src={slide.image}
                      alt=""
                      crossOrigin="anonymous"
                      className="pointer-events-none absolute top-1/2 left-1/2 h-[200%] w-[200%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[100px]"
                    />
                    <img
                      src={slide.image}
                      alt={slide.title}
                      crossOrigin="anonymous"
                      className="relative h-64 w-64 drop-shadow-2xl lg:h-[500px] lg:w-[500px]"
                    />
                  </>
                ) : (
                  <>
                    <div
                      className={cn(
                        "pointer-events-none absolute top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[120px]",
                        slide.color.replace("text-", "bg-"),
                      )}
                    />
                    <slide.icon
                      className={cn(
                        "relative h-64 w-64 drop-shadow-2xl lg:h-[500px] lg:w-[500px]",
                        slide.color,
                      )}
                    />
                  </>
                )}
              </motion.div>
            </div>

            {/* Right: Text */}
            <div className="relative z-10 flex flex-col justify-center text-center lg:items-start lg:text-left">
              <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={cn(
                  "text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl",
                  slide.textGradient,
                )}
              >
                {slide.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={cn(
                  "mt-4 text-2xl font-bold tracking-wide",
                  slide.color,
                )}
              >
                {slide.subtitle}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
              >
                <Link
                  href={slide.href}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-lg",
                    "bg-white/10 ring-1 ring-white/20 hover:bg-white/20",
                  )}
                >
                  {slide.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex gap-4 text-sm font-medium text-slate-500">
                  {slide.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="cursor-pointer transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Thumbnails */}
      <div className="absolute right-0 bottom-8 left-0 z-20 flex justify-center px-4">
        <div className="flex max-w-full gap-2 overflow-x-auto rounded-2xl bg-slate-900/80 p-2 ring-1 ring-white/10 backdrop-blur-md">
          {products.map((product, idx) => (
            <button
              key={product.id}
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              className={cn(
                "group relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl transition-all duration-300",
                idx === current
                  ? "bg-white/10 ring-1 ring-white/20"
                  : "opacity-60 hover:bg-white/5 hover:opacity-100",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 opacity-20 transition-colors",
                  product.bgGradient,
                )}
              />
              <product.icon
                className={cn(
                  "h-6 w-6 transition-transform duration-300 group-hover:scale-110",
                  product.color,
                )}
              />
              {idx === current && (
                <motion.div
                  layoutId="active-slide"
                  className="absolute inset-0 rounded-xl ring-2 ring-emerald-500/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base leading-7 font-semibold text-emerald-400">
            我们的理念
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            赋能下一代工具
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            在 Graphif，我们致力于构建尊重用户智慧和开发者时间的软件。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-white">
                  <feature.icon
                    className="h-5 w-5 flex-none text-emerald-400"
                    aria-hidden="true"
                  />
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function EcosystemGrid() {
  return (
    <section className="bg-slate-900/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Graphif 生态系统
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            一套互联的工具，旨在解决数据可视化、存储和序列化中的复杂问题。
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          <Card
            title="@graphif/fs"
            description="数据处理的基石。一个统一的文件系统接口，可在任何 JavaScript 运行的地方运行。"
            icon={Layers}
            href="/docs/fs"
            tag="基础设施"
          />
          <Card
            title="@graphif/serializer"
            description="将复杂的内存结构转化为可移植的字节。轻松处理循环引用和自定义类型。"
            icon={Box}
            href="/docs/serializer"
            tag="核心库"
          />
          <Card
            title="Project Graph"
            description="我们技术的终极体现。为知识工作者打造的强大桌面应用程序。"
            icon={Layout}
            href="/docs/prg"
            tag="应用程序"
          />
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  description,
  icon: Icon,
  href,
  tag,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  tag: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-emerald-500/50"
    >
      <div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="rounded-lg bg-slate-900 p-2 ring-1 ring-white/10">
            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
            {tag}
          </span>
        </div>
        <h3 className="mt-6 text-lg leading-8 font-semibold text-white">
          {title}
        </h3>
        <p className="mt-2 text-base leading-7 text-slate-400">{description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-400">
        了解更多 <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              准备好构建未来了吗？
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              无论您是寻找更好思考方式的用户，还是寻找强大库的开发者，Graphif
              都能满足您的需求。
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <Link
                href="https://github.com/graphif"
                className="flex-none rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                访问 GitHub
              </Link>
              <Link
                href="/docs/prg"
                className="flex-none rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                阅读文档
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <Globe className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">全球社区</dt>
              <dd className="mt-2 leading-7 text-slate-400">
                加入来自世界各地的开发者和思想者。
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <Code2 className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">现代技术栈</dt>
              <dd className="mt-2 leading-7 text-slate-400">
                基于 React, Rust 和 TypeScript 构建。
              </dd>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
