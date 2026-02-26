"use client";

import { cn } from "@/lib/cn";
import { Copy, Crown, Heart, Sparkles, Wallet } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DonationData } from "./page";

const t = {
  "zh-CN": {
    badge: "支持开源",
    heroTitle: "为 Graphif 注入动力",
    heroDesc:
      "您的每一笔捐赠都将直接支持核心开发者维护服务器、购买域名以及投入更多时间开发新功能。",
    dev1Name: "阿岳",
    dev1Desc: "负责客户端核心逻辑、交互体验优化、多平台适配以及视频教程制作。",
    dev2Desc: "负责 Linux 版本维护、官网部署、服务器运维以及云同步架构设计。",
    thankTitle: "感谢支持者",
    thankDesc: "每一份支持都是我们前进的燃料。",
    totalDonations: (amount: string) => `累计收到捐赠 ¥${amount}`,
    topDonors: "🏆 慷慨榜",
    recentDonations: "⏳ 最新捐赠",
    noDonations: "暂无捐赠数据，期待您的支持！",
    disclaimer: "* 捐赠列表数据可能存在短暂延迟，通常会在 24 小时内更新。",
    cryptoTitle: "💰 加密货币捐赠",
    cryptoDesc: "您也可以通过以下加密货币地址进行捐赠：",
    copied: "已复制！",
    copyAddress: "复制地址",
  },
  en: {
    badge: "Support Open Source",
    heroTitle: "Power Up Graphif",
    heroDesc:
      "Every donation directly supports core developers in maintaining servers, purchasing domains, and dedicating more time to building new features.",
    dev1Name: "Littlefean",
    dev1Desc:
      "Responsible for core client logic, interaction experience optimization, multi-platform adaptation, and video tutorials.",
    dev2Desc:
      "Responsible for Linux version maintenance, website deployment, server operations, and cloud sync architecture design.",
    thankTitle: "Thank Our Supporters",
    thankDesc: "Every contribution fuels our progress.",
    totalDonations: (amount: string) => `Total Donations Received: ¥${amount}`,
    topDonors: "🏆 Top Donors",
    recentDonations: "⏳ Recent Donations",
    noDonations: "No donations yet. Be the first to support us!",
    disclaimer:
      "* Donation data may have a brief delay and is typically updated within 24 hours.",
    cryptoTitle: "💰 Crypto Donations",
    cryptoDesc: "You can also donate via the following cryptocurrency addresses:",
    copied: "Copied!",
    copyAddress: "Copy address",
  },
};

function getT(lang: string) {
  return lang === "zh-CN" ? t["zh-CN"] : t.en;
}

const cryptoAddresses = [
  {
    name: "Ethereum / Base / BNB Smart Chain / Polygon",
    address: "0xaf019F37Cd962aAd0b5C8C18549F5244eaBc2ae1",
    color: "bg-indigo-500",
  },
  {
    name: "Tron (TRX/TRC-20)",
    address: "TNz1L8QQSiHkvFpHK18twSeivJj6cAeibM",
    color: "bg-red-500",
  },
  {
    name: "Bitcoin (BTC)",
    address: "bc1q8xksecqyydtu28frazfytv8w37vvlmat05k4au",
    color: "bg-orange-500",
  },
  {
    name: "Solana (SOL)",
    address: "Hm62saxVNMPSHnStSJ3538HUzXck3HTQhnsX4WZmkdZp",
    color: "bg-purple-500",
  },
];

export default function DonatePageClient({
  donations,
  lang,
}: {
  donations: DonationData[];
  lang: string;
}) {
  const i = getT(lang);
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
            {i.badge}
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {i.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {i.heroDesc}
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-6">
        {/* Developer Cards / Crypto Addresses */}
        {lang === "zh-CN" ? (
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <DeveloperCard
              name={i.dev1Name}
              handle="@Littlefean"
              role="Windows/macOS Maintainer"
              imageSrc="/images/donate-littlefean.png"
              description={i.dev1Desc}
              color="blue"
            />
            <DeveloperCard
              name="ZTY"
              handle="@zty012"
              role="Linux Maintainer & Fullstack"
              imageSrc="/images/donate-zty012.png"
              description={i.dev2Desc}
              color="emerald"
            />
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {i.cryptoTitle}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                {i.cryptoDesc}
              </p>
            </div>
            <div className="grid gap-4">
              {cryptoAddresses.map((crypto) => (
                <CryptoAddressCard key={crypto.name} crypto={crypto} lang={lang} />
              ))}
            </div>
          </div>
        )}

        {/* Donors Section (zh-CN only) */}
        {lang === "zh-CN" && (
        <div className="mt-24">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {i.thankTitle}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              {i.thankDesc}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-6 w-6" />
              <span>{i.totalDonations(totalAmount.toFixed(2))}</span>
            </div>
          </div>

          {/* Top Donors Podium */}
          {topDonors.length > 0 && (
            <div className="mx-auto mb-24 max-w-4xl">
              <h3 className="mb-12 text-center text-xl font-semibold text-slate-900 dark:text-white">
                {i.topDonors}
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
              {i.recentDonations}
            </h3>
            <div className="relative border-l border-slate-200 pl-8 dark:border-slate-800">
              {recentDonations.length > 0 ? (
                recentDonations.map((donation, index) => (
                  <TimelineItem key={index} donation={donation} />
                ))
              ) : (
                <div className="py-12 text-slate-500">
                  {i.noDonations}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {i.disclaimer}
            </p>
          </div>
        </div>
        )}

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

function CryptoAddressCard({
  crypto,
  lang,
}: {
  crypto: (typeof cryptoAddresses)[number];
  lang: string;
}) {
  const i = getT(lang);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(crypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-emerald-900">
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white",
          crypto.color,
        )}
      >
        <Wallet className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">
          {crypto.name}
        </div>
        <div className="truncate font-mono text-xs text-slate-500 dark:text-slate-400">
          {crypto.address}
        </div>
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
          copied
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
        )}
      >
        <Copy className="h-3.5 w-3.5" />
        {copied ? i.copied : i.copyAddress}
      </button>
    </div>
  );
}
