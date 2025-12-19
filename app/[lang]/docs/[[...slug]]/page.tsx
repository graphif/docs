import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/layout/page";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;

  if (params.slug && params.slug[0] === "app") {
    // 重定向到/docs/prg/...
    redirect(`/docs/prg/${params.slug.slice(1).join("/")}`);
  }

  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
        single: false,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: `https://graphif.dev${page.url}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
    },
    alternates: {
      canonical: `https://graphif.dev${page.url}`,
    },
  };
}

// export function generateStaticParams() {
//   return source.generateParams();
// }
