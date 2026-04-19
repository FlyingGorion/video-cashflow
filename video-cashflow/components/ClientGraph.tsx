'use client';

import dynamic from 'next/dynamic';
import { BalanceData } from '@/lib/calc';

// Graphコンポーネントをクライアントサイドでのみロード
const DynamicGraph = dynamic(() => import('./Graph'), {
  ssr: false, // サーバーサイドレンダリングを無効化
  loading: () => (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center">グラフ読み込み中...</h2>
      <div className="h-64 sm:h-80 md:h-96 w-full flex items-center justify-center bg-gray-50 rounded-lg animate-pulse">
        <div className="text-gray-500">グラフを読み込み中...</div>
      </div>
    </div>
  ),
});

interface ClientGraphProps {
  data: BalanceData[];
  title?: string;
}

export default function ClientGraph({ data, title }: ClientGraphProps) {
  return <DynamicGraph data={data} title={title} />;
}