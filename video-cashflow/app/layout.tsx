import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "動画編集資金計算ツール | Video Editor Cash Flow Calculator",
  description: "動画編集者向けの資金管理ツール。将来の残高推移を可視化して、資金ショートを事前に把握できます。",
  keywords: "動画編集, 資金管理, キャッシュフロー, フリーランス, 資金計算",
  authors: [{ name: "動画編集資金計算ツール" }],
  openGraph: {
    title: "動画編集資金計算ツール",
    description: "売上はあるのにお金が残らない人へ - 将来の残高推移を可視化",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
