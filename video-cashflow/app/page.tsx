'use client';

import Link from 'next/link';
import Graph from '@/components/Graph';
import { generateDummyData } from '@/lib/calc';

export default function Home() {
  const dummyData = generateDummyData();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            動画編集資金計算ツール
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            売上はあるのにお金が残らない人へ
          </p>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            将来の残高推移を可視化して、資金ショートを事前に把握しましょう。<br/>
            以下は資金ショートの例です。
          </p>
        </div>

        {/* ダミーデータグラフ */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <Graph 
            data={dummyData.balanceHistory} 
            title="資金推移の例（危険パターン）" 
          />
          {dummyData.daysUntilShortage && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-bold text-lg text-center">
                ⚠️ あと{dummyData.daysUntilShortage}日で残高が0円になります
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/input"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-200 shadow-lg hover:shadow-xl"
          >
            自分のデータで試す
          </Link>
          <p className="text-gray-600 mt-4">
            現在の残高と入金予定を入力して、資金ショートリスクを確認できます
          </p>
        </div>

        {/* フッター */}
        <div className="text-center mt-16 text-gray-500">
          <p>&copy; 2026 動画編集資金計算ツール</p>
        </div>
      </div>
    </main>
  );
}
