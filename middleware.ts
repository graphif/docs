import { i18n } from "@/lib/i18n";
import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { getNegotiator, isMarkdownPreferred } from "fumadocs-core/negotiation";
import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";

const COOKIE = "FD_LOCALE";

const i18nMiddleware = createI18nMiddleware(i18n);

function getLocaleFromRequest(request: NextRequest): string {
  const { languages, defaultLanguage } = i18n;
  const preferred = getNegotiator(request).languages();
  for (const p of preferred) {
    const exact = languages.find((l) => l.toLowerCase() === p.toLowerCase());
    if (exact) return exact;
    const prefix = p.split("-")[0]?.toLowerCase();
    if (!prefix) continue;
    const loose = languages.find(
      (l) =>
        l.toLowerCase() === prefix || l.toLowerCase().startsWith(`${prefix}-`),
    );
    if (loose) return loose;
  }
  return defaultLanguage;
}

function resolveLocale(request: NextRequest): string {
  return request.cookies.get(COOKIE)?.value ?? getLocaleFromRequest(request);
}

type DocsPathMatch = { docPath: string; langFromPath?: string };

function matchDocsMdx(pathname: string): DocsPathMatch | null {
  const m = pathname.match(/^\/docs\/(.+)\.mdx$/);
  if (m) return { docPath: m[1] };
  const m2 = pathname.match(/^\/(zh-CN|en)\/docs\/(.+)\.mdx$/);
  if (m2) return { docPath: m2[2], langFromPath: m2[1] };
  return null;
}

function matchDocsHtmlPath(pathname: string): DocsPathMatch | null {
  const m = pathname.match(/^\/docs\/(.+)$/);
  if (m && !m[1].endsWith(".mdx")) return { docPath: m[1] };
  const m2 = pathname.match(/^\/(zh-CN|en)\/docs\/(.+)$/);
  if (m2 && !m2[2].endsWith(".mdx"))
    return { docPath: m2[2], langFromPath: m2[1] };
  return null;
}

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const pathname = request.nextUrl.pathname;

  const mdx = matchDocsMdx(pathname);
  if (mdx) {
    const lang = mdx.langFromPath ?? resolveLocale(request);
    const url = request.nextUrl.clone();
    const segments = mdx.docPath.split("/").filter(Boolean);
    url.pathname = `/${lang}/llms.mdx/docs/${segments.join("/")}`;
    return NextResponse.rewrite(url);
  }

  if (isMarkdownPreferred(request)) {
    const doc = matchDocsHtmlPath(pathname);
    if (doc && doc.docPath.length > 0) {
      const lang = doc.langFromPath ?? resolveLocale(request);
      const url = request.nextUrl.clone();
      const segments = doc.docPath.split("/").filter(Boolean);
      url.pathname = `/${lang}/llms.mdx/docs/${segments.join("/")}`;
      return NextResponse.rewrite(url);
    }
  }

  return i18nMiddleware(request, event);
}

export const config = {
  // 匹配器忽略：
  // 1. /api/ 路由
  // 2. /_next/ 内部文件 (已包含 static 和 image)
  // 3. 常见静态文件扩展名 (.ico, .png, .jpg, .jpeg, .svg, .css, .js, .json, .webmanifest 等)
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|css|js|json|webmanifest)$).*)",
  ],
};
