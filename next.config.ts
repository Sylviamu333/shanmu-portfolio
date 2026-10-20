import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  // Keep full build-time type checks via the compiler API; detached CLI
  // subprocess output is unavailable in this execution environment.
  experimental: { useTypeScriptCli: false },
  trailingSlash: true,
  // Responsive derivatives are generated ahead of time; keep static hosting support.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/media/image-loader.ts",
    deviceSizes: [480, 800, 1200, 1600, 1920],
    imageSizes: [96, 240],
  },
};
export default nextConfig;
