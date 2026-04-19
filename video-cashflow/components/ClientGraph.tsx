'use client';

import { useState, useEffect } from 'react';
import { BalanceData } from '@/lib/calc';
import GraphErrorBoundary from './GraphErrorBoundary';

interface ClientGraphProps {
  data: BalanceData[];
  title?: string;
}

export default function ClientGraph({ data, title }: ClientGraphProps) {
  const [GraphComponent, setGraphComponent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // クライアントサイドでのみGrafコンポーネントをロード
    const loadGraph = async () => {
      try {
        const { default: Graph } = await import('./Graph');
        setGraphComponent(() => Graph);
      } catch (error) {
        console.error('グラフコンポーネントの読み込みに失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGraph();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full">
        {title && <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center">{title}</h2>}
        <div className="h-64 sm:h-80 md:h-96 w-full flex items-center justify-center bg-gray-50 rounded-lg animate-pulse">
          <div className="text-gray-500">グラフを読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!GraphComponent) {
    return (
      <div className="w-full">
        {title && <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center">{title}</h2>}
        <div className="h-64 sm:h-80 md:h-96 w-full flex items-center justify-center bg-red-50 rounded-lg">
          <div className="text-red-600">グラフの読み込みに失敗しました</div>
        </div>
      </div>
    );
  }

  return (
    <GraphErrorBoundary>
      <GraphComponent data={data} title={title} />
    </GraphErrorBoundary>
  );
}