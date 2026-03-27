/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/v0/rsemeah-addfa863",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  serverExternalPackages: ["@supabase/ssr"],
}

export default nextConfig
