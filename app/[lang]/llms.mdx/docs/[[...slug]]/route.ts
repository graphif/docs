import { getLLMText } from "@/lib/getLLMText";
import { source } from "@/lib/source";
import { NextResponse } from "next/server";

export const revalidate = false;

function redirectAppSlug(
  slug: string[] | undefined,
  requestUrl: string,
): NextResponse | null {
  if (slug?.[0] === "app") {
    const rest = slug.slice(1).join("/");
    const path = rest ? `/docs/prg/${rest}` : "/docs/prg";
    return NextResponse.redirect(new URL(path, requestUrl), 307);
  }
  return null;
}

export async function GET(
  request: Request,
  props: { params: Promise<{ lang: string; slug?: string[] }> },
) {
  const params = await props.params;
  const redir = redirectAppSlug(params.slug, request.url);
  if (redir) return redir;

  const page = source.getPage(params.slug, params.lang);
  if (!page) return new Response("Not Found", { status: 404 });

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
