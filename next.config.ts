import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  // Keep full build-time type checks via the compiler API; detached CLI
  // subprocess output is unavailable in this execution environment.
  experimental: { useTypeScriptCli: false },
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
