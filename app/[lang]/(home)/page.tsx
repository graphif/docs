import { octo } from "@/app/octo";
import HomePage from "./page.client";

export type StatsData = {
  totalUsers: number;
  averageDau: number;
  githubStars: number;
};

export default async function Page() {
  const telemetryStats = await (
    await fetch("https://api.project-graph.top/api/stats")
  ).json();
  const githubStars = (
    await octo.request("GET /repos/{owner}/{repo}", {
      owner: "graphif",
      repo: "project-graph",
    })
  ).data.stargazers_count;

  return (
    <HomePage
      stats={{
        ...(telemetryStats.data as StatsData),
        githubStars,
      }}
    />
  );
}
