'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Graph from '@/components/Graph';
import { generateDummyData } from '@/lib/calc';
import { trackPageView, trackButtonClick } from '@/lib/analytics';

export default function Home() {
  const dummyData = generateDummyData();

  useEffect(() => {
    trackPageView('home');
  }, []);

  const handleTryButtonClick = () => {
    trackButtonClick('try_with_data', 'home');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            動画編集資金計算ツール
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-8">
            売上はあるのにお金が残らない人へ
          </p>
          <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            将来の残高推移を可視化して、資金ショートを事前に把握しましょう。<br className="hidden sm:block"/>
            <span className="block sm:inline">以下は資金ショートの例です。</span>
          </p>
        </div>

        {/* ダミーデータグラフ */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
          <Graph 
            data={dummyData.balanceHistory} 
            title="資金推移の例（危険パターン）" 
          />
          {dummyData.daysUntilShortage && (
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-bold text-base md:text-lg text-center">
                ⚠️ あと{dummyData.daysUntilShortage}日で残高が0円になります
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/input"
            onClick={handleTryButtonClick}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-lg md:text-xl transition duration-200 shadow-lg hover:shadow-xl"
          >
            自分のデータで試す
          </Link>
          <p className="text-gray-600 mt-4 text-sm md:text-base px-4">
            現在の残高と入金予定を入力して、資金ショートリスクを確認できます
          </p>
        </div>

        {/* フッター */}
        <div className="text-center mt-16 text-gray-500">
          <div className="mb-2">
            <Link 
              href="/privacy" 
              className="text-gray-500 hover:text-gray-700 text-sm underline mr-4"
            >
              プライバシーポリシー
            </Link>
          </div>
          <p>&copy; 2026 動画編集資金計算ツール</p>
        </div>
      </div>
    </main>
  );
}
