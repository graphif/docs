import { octo } from "@/app/octo";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    stars: (
      await octo.request("GET /repos/{owner}/{repo}", {
        owner: "graphif",
        repo: "project-graph",
      })
    ).data.stargazers_count,
  });
}
