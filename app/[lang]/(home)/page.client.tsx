"use client";

import { Hero } from "@/app/components/home/Hero";
import { MouseFollower } from "@/app/components/home/MouseFollower";

export type StatsData = {
  totalUsers: number;
  averageDau: number;
  githubStars: number;
};

export default function PageClient({ stats }: { stats: StatsData }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white selection:bg-emerald-500 selection:text-white">
      <MouseFollower />
      <Hero stats={stats} />
    </main>
  );
}
