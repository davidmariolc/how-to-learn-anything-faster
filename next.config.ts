import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  redirects: () =>
    Promise.resolve([{ destination: "/en", permanent: false, source: "/" }]),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default function configureNext(): NextConfig {
  return createNextIntlPlugin()(nextConfig);
}
