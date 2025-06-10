/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'standalone', 

  compress: true, 

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', 
    },
    optimizePackageImports: [ 
      '@radix-ui/react-*', 
      'lucide-react'
    ]
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    loader: 'default', 
    domains: ['images.unsplash.com'],
  }
}

export default nextConfig