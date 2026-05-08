import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  serverExternalPackages: ["typescript", "twoslash"],
  // output: "export",
  async redirects() {
    return [
      {
        source: "/:lang(en|zh-CN)/donate",
        destination: "https://api.graphif.dev/ext/donate",
        permanent: true,
      },
      {
        source: "/donate",
        destination: "https://api.graphif.dev/ext/donate",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
