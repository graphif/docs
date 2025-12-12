import { octo } from "@/app/octo";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/layout/page";
import Link from "fumadocs-core/link";
import { remarkHeading } from "fumadocs-core/mdx-plugins";
import {
  AlertTriangle,
  Command,
  ExternalLink,
  Monitor,
  Package,
  Terminal,
} from "lucide-react";
import { notFound } from "next/navigation";
import production from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export default async function Page(props: {
  params: Promise<{ tag: string; lang: string }>;
}) {
  const { tag, lang } = await props.params;
  const releaseResponse = await octo.request(
    tag === "latest"
      ? "GET /repos/{owner}/{repo}/releases/latest"
      : "GET /repos/{owner}/{repo}/releases/tags/{tag}",
    {
      owner: "graphif",
      repo: "project-graph",
      tag,
    },
  );
  if (releaseResponse.status !== 200) {
    notFound();
  }
  const release = releaseResponse.data;

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkHeading)
    .use(remarkRehype)
    .use(rehypeReact, production);
  const md = await processor.process(release.body);

  const isZh = lang === "zh-CN";

  const assets = {
    windows: release.assets.filter((a) => a.name.endsWith(".exe")),
    mac: release.assets.filter((a) => a.name.endsWith(".dmg")),
    linux: release.assets.filter(
      (a) =>
        a.name.endsWith(".AppImage") ||
        a.name.endsWith(".deb") ||
        a.name.endsWith(".rpm"),
    ),
  };

  return (
    <DocsPage toc={md.data.toc}>
      <DocsTitle>{release.name}</DocsTitle>
      <DocsDescription className="mb-2">
        {new Date(release.published_at ?? "").toLocaleString(
          isZh ? "zh-Hans-CN" : "en-US",
        )}
      </DocsDescription>

      <DocsBody>
        <div className="not-prose mt-6 grid gap-4 md:grid-cols-3">
          {/* Windows */}
          <PlatformCard
            title="Windows"
            icon={<Monitor className="size-5" />}
            color="text-blue-500"
          >
            {assets.windows.map((asset) => (
              <DownloadLink
                key={asset.name}
                href={asset.browser_download_url}
                fileName="Installer (.exe)"
                fileSize={asset.size}
                proxy={isZh}
              />
            ))}
            {assets.windows.length === 0 && (
              <EmptyState text={isZh ? "暂无构建" : "No assets"} />
            )}
          </PlatformCard>

          {/* macOS */}
          <PlatformCard
            title="macOS"
            icon={<Command className="size-5" />}
            color="text-slate-800 dark:text-white"
          >
            {assets.mac.length > 0 && (
              <div className="mb-3 rounded-md bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                <div className="mb-1 flex items-center gap-1 font-bold">
                  <AlertTriangle className="size-3" />
                  {isZh ? "注意" : "Note"}
                </div>
                {isZh
                  ? "如果提示“应用已损坏”，请在 Finder 中右键点击 dmg 文件并选择“打开”。"
                  : "If 'App is damaged' appears, right-click the dmg file in Finder and select 'Open'."}
              </div>
            )}
            {assets.mac.map((asset) => (
              <DownloadLink
                key={asset.name}
                href={asset.browser_download_url}
                fileName="Disk Image (.dmg)"
                fileSize={asset.size}
                proxy={isZh}
              />
            ))}
            {assets.mac.length === 0 && (
              <EmptyState text={isZh ? "暂无构建" : "No assets"} />
            )}
          </PlatformCard>

          {/* Linux */}
          <PlatformCard
            title="Linux"
            icon={<Terminal className="size-5" />}
            color="text-orange-500"
          >
            {assets.linux.map((asset) => (
              <DownloadLink
                key={asset.name}
                href={asset.browser_download_url}
                fileName={
                  asset.name.endsWith(".AppImage")
                    ? "AppImage"
                    : asset.name.endsWith(".deb")
                      ? "Debian (.deb)"
                      : "RedHat (.rpm)"
                }
                fileSize={asset.size}
                proxy={isZh}
              />
            ))}
            <Link
              href="https://aur.archlinux.org/packages/project-graph-bin"
              className="group flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-900/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white shadow-sm dark:bg-slate-800">
                  <ExternalLink className="size-4 text-slate-500" />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  AUR
                </span>
              </div>
              <span className="text-xs text-slate-400">Arch Linux</span>
            </Link>
            {assets.linux.length === 0 && (
              <EmptyState text={isZh ? "暂无构建" : "No assets"} />
            )}
          </PlatformCard>
        </div>

        <hr className="my-8 border-slate-200 dark:border-slate-800" />

        {md.result}
      </DocsBody>
    </DocsPage>
  );
}

function PlatformCard({
  title,
  icon,
  children,
  color,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className={`mb-4 flex items-center gap-2 font-semibold ${color}`}>
        {icon}
        {title}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function DownloadLink({
  href,
  fileName,
  fileSize,
  proxy,
}: {
  href?: string;
  fileName: string;
  fileSize?: number;
  proxy?: boolean;
}) {
  if (!href) return null;
  const url = proxy ? `https://ghproxy.net/${href}` : href;

  return (
    <Link
      href={url}
      className="group flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-900/20"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white shadow-sm dark:bg-slate-800">
          <Package className="size-4 text-slate-500" />
        </div>
        <span className="truncate font-medium text-slate-700 dark:text-slate-200">
          {fileName}
        </span>
      </div>
      {fileSize && (
        <span className="ml-2 shrink-0 text-xs text-slate-400">
          {(fileSize / (1024 * 1024)).toFixed(1)} MB
        </span>
      )}
    </Link>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900/50">
      {text}
    </div>
  );
}
