import Link from 'next/link';

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <Link 
              href="/" 
              className="text-blue-500 hover:text-blue-700 text-base md:text-lg font-medium inline-block mb-4"
            >
              ← トップページに戻る
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              プライバシーポリシー
            </h1>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. 基本方針</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                動画編集資金計算ツール（以下「当サービス」）は、ユーザーの皆様の個人情報保護の重要性を認識し、
                個人情報の保護に関する法律、その他関係法令等を遵守し、適切に取り扱うものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. 収集する情報</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">当サービスでは、以下の情報を収集する場合があります：</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>アクセスログ情報（IPアドレス、閲覧ページ、アクセス時刻など）</li>
                  <li>デバイス情報（ブラウザの種類、OS、画面解像度など）</li>
                  <li>利用行動情報（ページ滞在時間、クリック情報など）</li>
                  <li>入力された財務情報（ブラウザ内でのみ保存、サーバーには送信されません）</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Google Analytics について</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  当サービスではサービス向上のために、Googleが提供するアクセス解析ツール
                  「Google Analytics」を利用しています。
                </p>
                <p className="mb-4">
                  Google Analyticsはデータ収集のためにCookieを使用することがあります。
                  このデータは匿名で収集されており、個人を特定するものではありません。
                </p>
                <p className="mb-4">
                  この機能はCookieを無効化することで拒否することができます。
                  詳細については、
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Googleのプライバシーポリシー
                  </a>
                  をご確認ください。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. 情報の利用目的</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">収集した情報は以下の目的で利用します：</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>サービスの提供・運営・改善</li>
                  <li>利用状況の分析</li>
                  <li>不正利用の防止</li>
                  <li>サービスの品質向上</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. データの保存について</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  ユーザーが入力された残高や案件情報などの財務データは、お客様のブラウザ内
                  （sessionStorage）にのみ保存され、当サービスのサーバーには送信・保存されません。
                </p>
                <p className="mb-4">
                  これらのデータはブラウザを閉じた時点で自動的に削除されます。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. 第三者への提供</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                当サービスは、ユーザーの個人情報を、ユーザーの同意なく第三者に提供することはありません。
                ただし、Google Analyticsによる匿名化されたデータ収集は除きます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Cookieについて</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  当サービスでは、Google Analyticsの利用に必要なCookieを使用する場合があります。
                </p>
                <p className="mb-4">
                  Cookieは、ブラウザの設定により無効化することが可能です。ただし、
                  一部機能が制限される場合があります。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. プライバシーポリシーの変更</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                当サービスは、法令の制定・改廃、その他必要に応じて、プライバシーポリシーを変更する場合があります。
                変更後のプライバシーポリシーは、当サービス上に表示した時点から効力を生じるものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. お問い合わせ</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本プライバシーポリシーに関するお問い合わせは、
                当サービスのお問い合わせフォームよりご連絡ください。
              </p>
            </section>

            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                最終更新日: 2026年4月18日
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}