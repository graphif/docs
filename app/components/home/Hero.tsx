"use client";

import Link from "fumadocs-core/link";
import {
  ArrowRight,
  BookOpen,
  Box,
  Cpu,
  ExternalLink,
  Github,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  Workflow,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import type { StatsData } from "../../[lang]/(home)/page.client";

export function Hero({ stats }: { stats: StatsData }) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse parallax
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Mouse parallax transforms
  const videoMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ["1%", "-1%"]);
  const videoMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ["1%", "-1%"]);
  const contentMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ["-2%", "2%"]);
  const contentMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ["-2%", "2%"]);

  // Mouse scale/tilt effects for content
  const contentScale = useTransform(
    smoothMouseY,
    [-0.5, 0, 0.5],
    [0.98, 1, 0.98],
  );
  const contentRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const contentRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      containerRef.current.getBoundingClientRect();

    // Normalize coordinates to -0.5 to 0.5
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-20"
    >
      {/* Background Video */}
      <motion.div
        style={{
          y: videoY,
          scale: videoScale,
          x: videoMouseX,
          translateY: videoMouseY,
        }}
        className="absolute -inset-10"
      >
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
        <div className="absolute -inset-10 bg-slate-950/60" />
      </motion.div>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      </div>

      <motion.div
        style={{
          y: contentY,
          x: contentMouseX,
          translateY: contentMouseY,
          scale: contentScale,
          rotateX: contentRotateX,
          rotateY: contentRotateY,
          perspective: 1000,
        }}
        className="mx-auto grid w-full max-w-7xl auto-rows-[minmax(160px,auto)] grid-cols-1 gap-6 md:grid-cols-12"
      >
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
              {stats.githubStars > 0 && (
                <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-slate-300">
                  {stats.githubStars.toLocaleString()}
                </span>
              )}
            </Link>
            <Link
              href="/docs/prg"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <BookOpen className="h-5 w-5" /> 文档
            </Link>
          </div>
        </motion.div>

        {/* Feature Bento: Engine - Medium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group flex h-64 flex-col justify-between rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl md:col-span-4 md:row-span-1"
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
          className="group flex h-64 flex-col justify-between rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl md:col-span-4 md:row-span-1"
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
          className="group flex h-64 flex-col justify-between rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl md:col-span-4 md:row-span-1"
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

        {/* Stats Bento - Multi-metric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="group flex flex-col justify-center rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl md:col-span-8 md:row-span-1"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
        </motion.div>
      </motion.div>

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
