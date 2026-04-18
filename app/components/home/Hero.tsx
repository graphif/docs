"use client";

import Link from "fumadocs-core/link";
import {
  ArrowRight,
  Box,
  Cpu,
  ExternalLink,
  Github,
  Layout,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  Workflow,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-20">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="https://assets.graphif.dev/videos/launch.webm"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl auto-rows-[minmax(160px,auto)] grid-cols-1 gap-6 md:grid-cols-12">
        {/* Main Brand Bento - Large */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative flex flex-col justify-center overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 shadow-2xl backdrop-blur-3xl md:col-span-8 md:row-span-2 md:p-16"
        >
          <div className="absolute top-0 right-0 h-64 w-64 bg-emerald-500/5 blur-[100px] transition-colors group-hover:bg-emerald-500/10" />

          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-400 uppercase">
            <Sparkles className="h-3 w-3 fill-emerald-400/20" />
            Project Graph v2.0
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-black tracking-tight text-white md:text-6xl">
            续写<span className="text-emerald-400">未竟</span>之章
            <br />
            重构你的
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              知识网络
            </span>
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed font-medium text-slate-400 md:text-xl">
            不仅仅是绘图工具，更是一个无限深度的思维操作系统。用图论拓扑的力量，将碎片化的灵感编织成有序的智慧。
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/release/latest"
              className="group flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 font-bold text-white transition-all hover:bg-emerald-400 hover:shadow-lg active:scale-95"
            >
              立即下载{" "}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="https://github.com/graphif"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <ProjectGithubIcon className="h-5 w-5" /> GITHUB
            </Link>
          </div>
        </motion.div>

        {/* Feature Bento: Engine - Medium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group flex flex-col justify-between rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl md:col-span-4 md:row-span-1"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 transition-all group-hover:bg-blue-500 group-hover:text-white">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">高性能渲染</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              Canvas 2D 底层驱动，提供丝滑顺畅的节点交互与视觉反馈。
            </p>
          </div>
        </motion.div>

        {/* Feature Bento: Format - Medium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group flex flex-col justify-between rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl md:col-span-4 md:row-span-1"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 transition-all group-hover:bg-purple-500 group-hover:text-white">
            <Box className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">.PRG 容器</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              MsgPack 二进制序列化，比 JSON 节省 40% 空间，极速解析。
            </p>
          </div>
        </motion.div>

        {/* Feature Bento: Topology - Medium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group flex flex-col justify-between rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl md:col-span-4 md:row-span-1"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 transition-all group-hover:bg-amber-500 group-hover:text-white">
            <Workflow className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">无限拓扑</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              支持嵌套图结构与双向关联，打破传统层级思维束缚。
            </p>
          </div>
        </motion.div>

        {/* Feature Bento: Zen UI - Large Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="group flex flex-col items-center gap-8 rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl md:col-span-8 md:row-span-1 md:flex-row"
        >
          <div className="flex-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 transition-all group-hover:bg-emerald-500 group-hover:text-white">
              <Layout className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">禅意界面设计</h3>
            <p className="leading-relaxed text-slate-500">
              零干扰设计语言。移除所有不必要的 UI
              元素，让你与你的思想独处，沉浸在纯粹的逻辑之美中。
            </p>
          </div>
          <div className="relative flex aspect-video w-full flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-slate-950">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
            <Zap className="h-12 w-12 animate-pulse text-slate-800" />
            <div className="absolute right-4 bottom-3 font-mono text-[10px] tracking-widest text-slate-700 uppercase">
              Zen Mode Active
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Controls - Fixed Bottom Right */}
      <div className="fixed right-10 bottom-10 z-50 flex gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="rounded-full border border-white/10 bg-white/5 p-4 text-white shadow-2xl backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className="rounded-full border border-white/10 bg-white/5 p-4 text-white shadow-2xl backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
          aria-label={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>
        <a
          href="https://www.bilibili.com/video/BV1W4k7YqEgU"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 bg-white/5 p-4 text-white shadow-2xl backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
          aria-label="Open Bilibili Video"
        >
          <ExternalLink className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function ProjectGithubIcon({ className }: { className?: string }) {
  return <Github className={className} />;
}
