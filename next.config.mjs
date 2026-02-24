/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/pnpHealth_web', // GitHub Pages 레포지토리 이름
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
