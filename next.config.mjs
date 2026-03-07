/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 커스텀 도메인(루트 경로) 사용을 위해 basePath 제거
  basePath: '', 
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
