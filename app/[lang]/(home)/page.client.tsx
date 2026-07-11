"use client";

import { Hero } from "@/app/components/home/Hero";

export type StatsData = {
  totalUsers: number;
  averageDau: number;
  githubStars: number;
};

export default function PageClient({ stats }: { stats: StatsData }) {
  return <Hero stats={stats} />;
}
