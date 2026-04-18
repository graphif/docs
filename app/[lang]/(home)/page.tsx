import { octo } from "@/app/octo";
import PageClient from "./page.client";

export type StatsData = {
  totalUsers: number;
  averageDau: number;
  githubStars: number;
};

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
