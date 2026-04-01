# CLAUDE.md — ブログプロジェクト仕様書

このファイルはClaude Codeが読み込む仕様書。作業前に必ず参照すること。

---

## プロジェクト概要

個人技術ブログ。1人運用、週1〜月1更新の小規模サイト。
参考デザイン: https://nyosegawa.com/（シンプル・ミニマル系）

---

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フロントエンド | TypeScript + Next.js (App Router) |
| スタイリング | Tailwind CSS |
| 記事管理 | Markdownファイル + Gitリポジトリ管理 |
| 検索 | Fuse.js（クライアントサイド全文検索） |
| デプロイ | Vercel |
| バックエンド | **なし（将来Spring Bootを追加予定）** |

> Spring Bootは将来コメント・いいね・認証などの機能追加時に導入する。現時点では不要。

---

## ディレクトリ構成

```
/
├── CLAUDE.md                    ← この仕様書
├── posts/                       ← Markdownファイルを置く場所
│   └── example-post.md
├── public/
├── src/
│   └── app/
│       ├── page.tsx             ← トップページ
│       ├── blog/
│       │   ├── page.tsx         ← 記事一覧（検索・タグ絞り込み）
│       │   ├── [slug]/
│       │   │   └── page.tsx     ← 記事詳細
│       │   └── tags/
│       │       └── [tag]/
│       │           └── page.tsx ← タグ別記事一覧
│       ├── works/
│       │   └── page.tsx         ← ポートフォリオ・作品紹介
│       └── about/
│           └── page.tsx         ← プロフィール
├── src/
│   ├── components/              ← 共通コンポーネント
│   ├── lib/
│   │   ├── posts.ts             ← Markdownパース・記事取得ロジック
│   │   └── search.ts            ← Fuse.js検索ロジック
│   └── types/
│       └── post.ts              ← 型定義
```

---

## 記事のMarkdownフロントマター仕様

```markdown
---
title: "記事タイトル"
date: "2026-04-01"
tags: ["Next.js", "TypeScript"]
description: "記事の概要文（OGPにも使用）"
---

本文（Markdown形式）
```

| フィールド | 型 | 必須 | 用途 |
|---|---|---|---|
| title | string | ✅ | 表示・OGP |
| date | string (YYYY-MM-DD) | ✅ | ソート・表示 |
| tags | string[] | ✅ | タグ絞り込み |
| description | string | ✅ | 一覧表示・OGP |

---

## 各ページの仕様

### トップページ (`/`)
- 最新記事 5件の一覧
- プロフィール概要（名前・一言）
- ポートフォリオ抜粋（注目作品 2〜3件）

### ブログ一覧 (`/blog`)
- 全記事一覧（日付降順）
- タグ絞り込み（複数選択可）
- Fuse.jsによるクライアントサイド検索

### 記事詳細 (`/blog/[slug]`)
- Markdownレンダリング
- タグ表示・リンク
- 前後記事へのナビゲーション
- OGP対応（title / description / og:image）

### タグ別一覧 (`/blog/tags/[tag]`)
- 指定タグを含む記事の一覧

### ポートフォリオ (`/works`)
- 作品・プロジェクト紹介
- データはハードコードまたは別Markdownで管理

### プロフィール (`/about`)
- 自己紹介文
- SNSリンクなど

---

## 検索の実装方針

**Fuse.js（クライアントサイド）を使う。**

- ビルド時に全記事データをJSONとして生成
- ブラウザ側でFuse.jsが全文検索
- 記事数が数百件程度なら十分な速度
- サーバー不要・Algoliaなどの外部サービス不要

```bash
npm install fuse.js
```

---

## コーディング規約

- TypeScript strict mode を有効にする
- コンポーネントはすべて関数コンポーネント（FC）
- `any` 型は使わない
- パス: `@/` エイリアスを使う（`src/` 配下）

---

## デザイン方針

- シンプル・ミニマル（nyosegawa.com 参考）
- 余白を十分に取る
- フォント: システムフォント or Geist
- カラー: モノトーン基調（ダークモード対応推奨）

---

## 実装の優先順位

1. 環境構築（Next.js + Tailwind）
2. Markdownパース・記事詳細ページ
3. 記事一覧ページ
4. タグ絞り込み
5. 検索機能（Fuse.js）
6. プロフィール・ポートフォリオページ
7. デザイン仕上げ・OGP対応

---

## 将来の拡張予定（現時点では実装しない）

- Spring Boot REST API（コメント・いいね・認証）
- PostgreSQL（記事のDB管理）
- 管理画面（ブラウザから記事投稿）

---

## よく使うコマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # ビルド
npm run lint     # Lint
```