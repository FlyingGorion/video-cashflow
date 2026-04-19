import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的サイト生成とSSRの最適化
  experimental: {
    optimizePackageImports: ['recharts', 'date-fns']
  },
  // 画像最適化の設定（Vercel以外での静的サイトの場合）
  images: {
    unoptimized: true
  }
};

export default nextConfig;
