"use client";

import { cn } from "@/lib/cn";
import { Crown, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import { DonationData } from "./page";

export default function DonatePageClient({
  donations,
}: {
  donations: DonationData[];
}) {
  // Calculate total amount
  const totalAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  // Sort by amount for Top Donors
  const sortedByAmount = [...donations].sort((a, b) => b.amount - a.amount);
  const topDonors = sortedByAmount.slice(0, 3);

  // Sort by time (assuming original array is chronological, so reverse it) for Timeline
  // Filter out top donors from the timeline to avoid duplication if desired,
  // or just show everyone. Let's show everyone in timeline but highlight top donors separately.
  const recentDonations = [...donations].reverse();

  return (
    <main className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-200 blur-3xl dark:bg-emerald-900/20" />
          <div className="absolute top-1/2 right-0 h-64 w-64 rounded-full bg-blue-200 blur-3xl dark:bg-blue-900/20" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            <Heart className="h-4 w-4 fill-current" />
            Support Open Source
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            为 Graphif 注入动力
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            您的每一笔捐赠都将直接支持核心开发者维护服务器、购买域名以及投入更多时间开发新功能。
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-6">
        {/* Developer Cards */}
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <DeveloperCard
            name="阿岳"
            handle="@Littlefean"
            role="Windows/macOS Maintainer"
            imageSrc="/images/donate-littlefean.png"
            description="负责客户端核心逻辑、交互体验优化、多平台适配以及视频教程制作。"
            color="blue"
          />
          <DeveloperCard
            name="ZTY"
            handle="@zty012"
            role="Linux Maintainer & Fullstack"
            imageSrc="/images/donate-zty012.png"
            description="负责 Linux 版本维护、官网部署、服务器运维以及云同步架构设计。"
            color="emerald"
          />
        </div>

        {/* Donors Section */}
        <div className="mt-24">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              感谢支持者
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              每一份支持都是我们前进的燃料。
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-6 w-6" />
              <span>累计收到捐赠 ¥{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Top Donors Podium */}
          {topDonors.length > 0 && (
            <div className="mx-auto mb-24 max-w-4xl">
              <h3 className="mb-12 text-center text-xl font-semibold text-slate-900 dark:text-white">
                🏆 慷慨榜
              </h3>
              <div className="flex justify-center gap-4">
                {topDonors[1] && (
                  <PodiumItem donation={topDonors[1]} rank={2} />
                )}
                {topDonors[0] && (
                  <PodiumItem donation={topDonors[0]} rank={1} />
                )}
                {topDonors[2] && (
                  <PodiumItem donation={topDonors[2]} rank={3} />
                )}
              </div>
            </div>
          )}

          {/* Recent Donations Timeline */}
          <div className="mx-auto max-w-xl">
            <h3 className="mb-8 text-center text-xl font-semibold text-slate-900 dark:text-white">
              ⏳ 最新捐赠
            </h3>
            <div className="relative border-l border-slate-200 pl-8 dark:border-slate-800">
              {recentDonations.length > 0 ? (
                recentDonations.map((donation, index) => (
                  <TimelineItem key={index} donation={donation} />
                ))
              ) : (
                <div className="py-12 text-slate-500">
                  暂无捐赠数据，期待您的支持！
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              * 捐赠列表数据可能存在短暂延迟，通常会在 24 小时内更新。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function DeveloperCard({
  name,
  handle,
  role,
  imageSrc,
  description,
  color,
}: {
  name: string;
  handle: string;
  role: string;
  imageSrc: string;
  description: string;
  color: "emerald" | "blue";
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-2 shadow-xl ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 dark:ring-slate-800">
      <div
        className={cn(
          "absolute top-0 left-0 h-32 w-full opacity-10 blur-xl transition-opacity group-hover:opacity-20",
          color === "emerald" ? "bg-emerald-500" : "bg-blue-500",
        )}
      />

      <div className="relative flex flex-col items-center p-6 text-center">
        <div className="mb-6 overflow-hidden rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
          <div className="relative h-48 w-48 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950">
            <Image
              src={imageSrc}
              alt={`Donate to ${name}`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {name}
        </h3>
        <p
          className={cn(
            "text-sm font-medium",
            color === "emerald"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-blue-600 dark:text-blue-400",
          )}
        >
          {handle}
        </p>

        <div className="mt-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {role}
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function PodiumItem({
  donation,
  rank,
  className,
}: {
  donation: DonationData;
  rank: 1 | 2 | 3;
  className?: string;
}) {
  const heightClass =
    rank === 1 ? "h-48 sm:h-64" : rank === 2 ? "h-40 sm:h-52" : "h-32 sm:h-40";
  const colorClass =
    rank === 1
      ? "bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700/30 dark:text-yellow-400"
      : rank === 2
        ? "bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
        : "bg-orange-100 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-700/30 dark:text-orange-400";

  return (
    <div
      className={cn("flex w-16 flex-col items-center justify-end", className)}
    >
      <div className="mb-3 flex flex-col items-center text-center">
        {rank === 1 && <Crown className="mb-2 h-8 w-8 text-yellow-500" />}
        <span className="font-bold text-slate-900 dark:text-white">
          {donation.user}
        </span>
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          ¥{donation.amount}
        </span>
      </div>
      <div
        className={cn(
          "flex w-full items-end justify-center rounded-t-xl border-x border-t p-4 transition-all hover:opacity-90",
          heightClass,
          colorClass,
        )}
      >
        <span className="text-4xl font-bold opacity-20">{rank}</span>
      </div>
    </div>
  );
}

function TimelineItem({ donation }: { donation: DonationData }) {
  return (
    <div className="relative mb-8 last:mb-0">
      <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-white dark:bg-emerald-900 dark:ring-slate-900">
        <Heart className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
      </span>
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-emerald-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-white">
              {donation.user}
            </span>
            {/*<span className="text-xs text-slate-400">donated</span>*/}
          </div>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
            ¥{donation.amount}
          </span>
        </div>
        {donation.note && (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            "{donation.note}"
          </p>
        )}
      </div>
    </div>
  );
}
