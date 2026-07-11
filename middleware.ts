import { i18n } from "@/lib/i18n";
import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

const i18nMiddleware = createI18nMiddleware(i18n);
const { rewrite: rewriteLLM } = rewritePath(
  "/docs{/*path}",
  "/llms.mdx/docs{/*path}",
);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
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
