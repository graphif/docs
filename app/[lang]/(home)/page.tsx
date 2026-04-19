import { octo } from "@/app/octo";
import PageClient from "./page.client";
import { Metadata } from "next";

export type StatsData = {
  totalUsers: number;
  averageDau: number;
  githubStars: number;
};

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const isEn = params.lang === "en";

  const title = isEn
    ? "Graphif - Modern Graph Visualization & Analysis"
    : "Graphif - 现代图可视化与分析平台";
  const description = isEn
    ? "An open-source, high-performance graph visualization and analysis platform for developers and researchers."
    : "面向开发者和研究者的开源、高性能图可视化与分析平台。";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://graphif.dev/${params.lang}`,
      siteName: "Graphif",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://graphif.dev/${params.lang}`,
    },
  };
}

export default async function Page() {
  let telemetryStats = { data: { totalUsers: 0, averageDau: 0 } };
  try {
    const res = await fetch("https://api.project-graph.top/api/stats", {
      next: { revalidate: 3600 },
    });
    telemetryStats = await res.json();
  } catch (e) {
    console.error("Failed to fetch telemetry stats", e);
  }

  let githubStars = 0;
  try {
    const res = await octo.request("GET /repos/{owner}/{repo}", {
      owner: "graphif",
      repo: "project-graph",
    });
    githubStars = res.data.stargazers_count;
  } catch (e) {
    console.error("Failed to fetch GitHub stars", e);
  }

  return (
    <PageClient
      stats={{
        ...(telemetryStats.data as { totalUsers: number; averageDau: number }),
        githubStars,
      }}
    />
  );
}
