'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputForm from '@/components/InputForm';
import { CashFlowInput } from '@/lib/calc';

export default function Input() {
  const router = useRouter();

  const handleSubmit = (data: CashFlowInput) => {
    // セッションストレージに保存
    sessionStorage.setItem('cashFlowData', JSON.stringify(data));
    // 結果ページに遷移
    router.push('/result');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-6 md:mb-8">
          <Link 
            href="/" 
            className="text-blue-500 hover:text-blue-700 text-base md:text-lg font-medium inline-block mb-4"
          >
            ← トップページに戻る
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            資金状況の入力
          </h1>
          <p className="text-gray-600 text-base md:text-lg px-4">
            現在の残高と今後の入金予定を入力してください
          </p>
        </div>

        {/* 入力フォーム */}
        <div className="flex justify-center">
          <InputForm onSubmit={handleSubmit} />
        </div>

        {/* 注意事項 */}
        <div className="w-full max-w-lg mx-auto mt-6 md:mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2 text-sm md:text-base">ご注意</h3>
          <ul className="text-xs md:text-sm text-blue-800 space-y-1">
            <li>・入力されたデータはブラウザに一時保存されます</li>
            <li>・金額は正確に入力してください</li>
            <li>・入金日は60日以内の日付を選択してください</li>
          </ul>
        </div>
      </div>
    </main>
  );
}