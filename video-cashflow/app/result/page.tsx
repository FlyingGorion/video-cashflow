'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Graph from '@/components/Graph';
import { calculateCashFlow, CashFlowInput, CashFlowResult } from '@/lib/calc';
import { trackPageView, trackCashFlowCalculation } from '@/lib/analytics';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function Result() {
  const router = useRouter();
  const [result, setResult] = useState<CashFlowResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('result');
    
    // セッションストレージからデータを取得
    const savedData = sessionStorage.getItem('cashFlowData');
    
    if (!savedData) {
      // データがない場合は入力ページにリダイレクト
      router.push('/input');
      return;
    }

    try {
      const inputData: CashFlowInput = JSON.parse(savedData);
      const calculatedResult = calculateCashFlow(inputData);
      setResult(calculatedResult);
      
      // Google Analyticsで計算イベントをトラッキング
      trackCashFlowCalculation(inputData.currentBalance, inputData.projects.length);
    } catch (error) {
      console.error('データの解析に失敗しました:', error);
      router.push('/input');
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">計算中...</p>
        </div>
      </main>
    );
  }

  if (!result) {
    return null;
  }

  const formatShortageDate = (dateStr: string) => {
    return format(parseISO(dateStr), 'M月d日(E)', { locale: ja });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-6 md:mb-8">
          <Link 
            href="/input" 
            className="text-blue-500 hover:text-blue-700 text-base md:text-lg font-medium inline-block mb-4"
          >
            ← 入力を修正する
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            資金推移シミュレーション結果
          </h1>
        </div>

        {/* 資金ショート警告 */}
        {result.daysUntilShortage ? (
          <div className="mb-6 md:mb-8 p-4 md:p-6 bg-red-50 border-2 border-red-200 rounded-xl">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-red-800 mb-2">⚠️ 資金ショートの危険性</h2>
              <p className="text-red-700 text-lg md:text-xl font-semibold">
                あと<span className="text-2xl md:text-3xl font-bold">{result.daysUntilShortage}</span>日で残高が0円になります
              </p>
              {result.shortageDate && (
                <p className="text-red-600 mt-2 text-sm md:text-base">
                  予想資金ショート日: {formatShortageDate(result.shortageDate)}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-6 md:mb-8 p-4 md:p-6 bg-green-50 border-2 border-green-200 rounded-xl">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-2">✅ 資金に余裕があります</h2>
              <p className="text-green-700 text-lg md:text-xl">
                60日間、残高は0円を下回りません
              </p>
            </div>
          </div>
        )}

        {/* グラフ */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <Graph 
            data={result.balanceHistory} 
            title="今後60日間の残高推移" 
          />
        </div>

        {/* 最終残高表示 */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold text-center mb-4">60日後の予想残高</h3>
          <p className="text-2xl md:text-3xl font-bold text-center text-blue-600">
            {result.balanceHistory[result.balanceHistory.length - 1]?.balance.toLocaleString()}円
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/input"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-center transition duration-200"
          >
            別の条件でシミュレーション
          </Link>
          <Link 
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-center transition duration-200"
          >
            トップページに戻る
          </Link>
        </div>

        {/* 注意事項 */}
        <div className="mt-6 md:mt-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-medium text-yellow-900 mb-2 text-sm md:text-base">シミュレーション結果について</h3>
          <ul className="text-xs md:text-sm text-yellow-800 space-y-1">
            <li>・この結果は入力されたデータに基づく予測です</li>
            <li>・実際の収支と異なる場合があります</li>
            <li>・定期的にシミュレーションを見直すことをお勧めします</li>
          </ul>
        </div>
      </div>
    </main>
  );
}