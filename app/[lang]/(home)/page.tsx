import { octo } from "@/app/octo";
import { Metadata } from "next";
import PageClient from "./page.client";

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
    ? "Graphif v3.0 - Open-Source Graph Visualization Platform with Extension System"
    : "Graphif v3.0 - 开源图分析框架，扩展系统驱动无限可能";
  const description = isEn
    ? "Project Graph 3.0 is an open-source, high-performance graph visualization and analysis platform. The new extension system lets you customize everything with TypeScript — shortcuts, dialogs, custom entity types, themes, and more."
    : "Project Graph 3.0 是一款开源、高性能的图可视化与分析平台。全新的扩展系统让你通过 TypeScript 自定义快捷键、对话框、节点类型、主题等一切功能。";

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
