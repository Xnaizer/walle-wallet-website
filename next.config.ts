import { env } from "process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config: {
    module: {
      rules: Array<{
        test?: { test?: (path: string) => boolean } | RegExp;
        issuer?: unknown;
        resourceQuery?: { not?: unknown[] } | RegExp;
        exclude?: RegExp;
        use?: string[];
        [key: string]: unknown;
      }>;
    };
    [key: string]: unknown;
  }) {
    // Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule: {
        test?: { test?: (path: string) => boolean } | RegExp;
        issuer?: unknown;
        resourceQuery?: { not?: unknown[] } | RegExp;
        exclude?: RegExp;
        use?: string[];
        [key: string]: unknown;
      }) => rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule?.issuer,
        resourceQuery: {
          not: [
            ...(fileLoaderRule?.resourceQuery &&
            typeof fileLoaderRule.resourceQuery === "object" &&
            "not" in fileLoaderRule.resourceQuery
              ? fileLoaderRule.resourceQuery.not || []
              : []),
            /url/,
          ],
        }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

  images: {
    domains: ["localhost"],
    formats: ["image/webp", "image/avif"],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: env.NEXT_PUBLIC_API_BASE_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
