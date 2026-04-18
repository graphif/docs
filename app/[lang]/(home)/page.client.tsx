"use client";

import { Hero } from "@/app/components/home/Hero";

export default function PageClient({
  stats,
}: {
  stats: { totalUsers: number; averageDau: number; githubStars: number };
}) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white selection:bg-emerald-500 selection:text-white">
      <Hero />
    </main>
  );
}
