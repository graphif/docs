import { source } from "@/lib/source";
import { NextResponse } from "next/server";

export const revalidate = false;

export async function GET() {
  return new NextResponse(
    [
      "https://graphif.dev/",
      ...source.getPages().map((page) => `https://graphif.dev${page.url}`),
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
}
