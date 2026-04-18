# 動画編集資金計算ツール (Video Editor Cash Flow Calculator)

動画編集者向けの資金管理ツールです。将来の残高推移を可視化して、資金ショートを事前に把握できます。

## 機能

- 現在残高と入金予定の入力
- 60日間の資金推移シミュレーション
- グラフによる視覚的な残高表示
- 資金ショート日の予測と警告
- レスポンシブデザイン（モバイル対応）

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイル**: Tailwind CSS
- **グラフ**: Recharts
- **分析**: Google Analytics 4
- **日付処理**: date-fns

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成:

```bash
# Google Analytics 測定ID（オプション）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## Google Analytics の設定

ユーザー解析を行いたい場合は、`ANALYTICS_SETUP.md` を参照してGoogle Analytics 4を設定してください。

## ページ構成

- `/` - トップページ（ダミーデータでのデモ）
- `/input` - 資金状況入力ページ
- `/result` - シミュレーション結果表示ページ
- `/privacy` - プライバシーポリシーページ

## プロダクション環境でのデプロイ

```bash
npm run build
npm start
```

## ライセンス

MIT License
