import { baseOptions } from "@/app/layout.config";
import { octo } from "@/app/octo";
import { DocsLayout } from "@/components/layout/docs";
import { Tag, TestTube2 } from "lucide-react";
import { type ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const releases = (
    await octo.request("GET /repos/{owner}/{repo}/releases", {
      owner: "graphif",
      repo: "project-graph",
      per_page: 500,
    })
  ).data;

  return (
    <DocsLayout
      {...baseOptions(lang)}
      tree={{
        name: "",
        children: [
          {
            type: "folder",
            name: "测试版",
            icon: <TestTube2 />,
            defaultOpen: false,
            children: releases
              .filter((release) => release.prerelease)
              .map((release) => ({
                type: "page",
                name: `${release.name} (${relativeTime(new Date(release.published_at ?? ""))})`,
                url: `/release/${release.tag_name}`,
              })),
          },
          {
            type: "folder",
            name: "正式版",
            icon: <Tag />,
            defaultOpen: true,
            children: releases
              .filter((release) => !release.prerelease)
              .map((release) => ({
                type: "page",
                name: `${release.name} (${relativeTime(new Date(release.published_at ?? ""))})`,
                url: `/release/${release.tag_name}`,
              })),
          },
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}

function relativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (years > 0) {
    return `${years} 年前`;
  } else if (months > 0) {
    return `${months} 个月前`;
  } else if (weeks > 0) {
    return `${weeks} 周前`;
  } else if (days > 0) {
    return `${days} 天前`;
  } else if (hours > 0) {
    return `${hours} 小时前`;
  } else if (minutes > 0) {
    return `${minutes} 分钟前`;
  } else {
    return `${seconds} 秒前`;
  }
}
