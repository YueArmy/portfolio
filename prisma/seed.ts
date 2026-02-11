import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Markdown コンテンツ ---

const LABBIT_CONTENT = `## 概要

読書を通じて語彙力を伸ばすiOSアプリ。AIが読み手のレベルに合わせたコンテンツを生成し、気になった単語を単語帳に追加してフラッシュカードで反復学習できます。

App Storeで公開中。

## 主な機能

- **AI読書**: ジャンルやキーワードを選ぶと、AIがレベルに合った文章を生成
- **語彙学習**: 気になった単語を単語帳に追加 → フラッシュカードで反復学習
- **多言語対応**: 日本語・英語
- **継続の仕組み**: ストリーク（連続学習記録）で習慣化をサポート

## 技術的なポイント

- SwiftUI + SwiftData によるモダンなiOSアーキテクチャ
- OpenAI API を使ったコンテンツ生成（コスト最適化込み）
- Apple の NaturalLanguage フレームワークで多言語テキスト解析
- StoreKit 2 によるサブスクリプション管理

## リンク

- [App Store](https://apps.apple.com/us/app/labbit/id6752617165)`;

const GAS_CONTENT = `## 概要

業務で使う社内ツールの企画・開発を担当。ユーザーから直接要望を聞き、形にし、先回りで「これも必要ですよね」を提案するサイクルを週次で回しています。

## やっていること

- ユーザーの抽象的な要望をヒアリング → 具体的なツールに変換
- 前例のない仕組みも、仮説と検証で形にする
- 「頼まれたもの」だけでなく「次に必要になるもの」を先回りで提案

## 特徴

社内ツールのため詳細は非公開ですが、「それできるの？」と言われるような仕組みを仮説検証で作り上げるプロセスが特徴です。`;

const ONE_MINUTE_HABIT_CONTENT = `## 概要

「1分だけやる」をコンセプトにした習慣トラッカーアプリ。行動科学の知見を活かし、習慣化のハードルを極限まで下げることで、三日坊主を防ぎます。

完全オフライン動作。アカウント不要、個人情報収集なし。

## 主な機能

- **1分タイマー**: まず1分だけ始める → 自然と続けたくなる仕組み
- **習慣トラッキング**: 日々の達成を記録・可視化
- **リマインダー通知**: ローカル通知で忘れ防止（外部サービス不使用）
- **シンプルUI**: 迷わない、開いてすぐ使える設計

## 技術的なポイント

- React Native + Expo によるクロスプラットフォーム開発
- AsyncStorage による完全ローカルデータ管理（サーバー通信なし）
- プライバシーファースト設計: 個人情報の収集・送信ゼロ

## リンク

- [サポート・お問い合わせ](/apps/one-minute-habit/support)
- [プライバシーポリシー](/apps/one-minute-habit/privacy)
- [利用規約](/apps/one-minute-habit/terms)`;

// --- 探索ログ ---

const LABBIT_LOGS = [
  { step: 1, title: 'きっかけ', body: '「読書しながら単語も覚えられたら面白いかも」という発想から' },
  { step: 2, title: 'プロトタイプ', body: 'SwiftUI で基本的な読書画面と単語帳を試作。手応えを確認' },
  { step: 3, title: 'AI統合', body: 'OpenAI API を組み込み、レベル別のコンテンツ生成を実装' },
  { step: 4, title: 'リリース', body: '約4〜5ヶ月の開発を経てApp Storeに公開' },
];

// --- Main ---

async function main() {
  // Labbit
  const labbit = await prisma.project.upsert({
    where: { slug: 'labbit' },
    update: { content: LABBIT_CONTENT },
    create: {
      title: 'Labbit',
      slug: 'labbit',
      description: 'AIを活用した読書×語彙学習iOSアプリ。企画・設計・開発・リリースまで一人で担当。',
      content: LABBIT_CONTENT,
      techStack: ['Swift', 'SwiftUI', 'SwiftData', 'OpenAI API', 'NaturalLanguage.framework'],
      imageUrl: null,
      status: 'published',
      featured: true,
      publishedAt: new Date('2025-06-01'),
    },
  });

  // Labbit 探索ログ — deleteMany + create で冪等
  await prisma.explorationLog.deleteMany({
    where: { projectId: labbit.id },
  });
  for (const log of LABBIT_LOGS) {
    await prisma.explorationLog.create({
      data: { ...log, projectId: labbit.id },
    });
  }

  console.log(`✔ Labbit (id: ${labbit.id}) + ${LABBIT_LOGS.length} exploration logs`);

  // 業務ツール開発
  const businessTools = await prisma.project.upsert({
    where: { slug: 'business-tools' },
    update: {},
    create: {
      title: '業務ツール開発',
      slug: 'business-tools',
      description: 'ユーザーの要望をヒアリングし、業務効率化ツールを企画・開発。週次サイクルで改善を回している。',
      content: GAS_CONTENT,
      techStack: ['Google Apps Script', 'Google Sheets', 'Figma API'],
      imageUrl: null,
      status: 'published',
      featured: false,
      publishedAt: new Date('2025-01-01'),
    },
  });

  console.log(`✔ 業務ツール開発 (id: ${businessTools.id})`);

  // 1分習慣
  const oneMinuteHabit = await prisma.project.upsert({
    where: { slug: 'one-minute-habit' },
    update: {},
    create: {
      title: '1分習慣',
      slug: 'one-minute-habit',
      description: '「毎日たった1分」から始める習慣トラッカーアプリ。小さな積み重ねが大きな変化を生む、行動科学ベースのシンプルなiOSアプリ。',
      content: ONE_MINUTE_HABIT_CONTENT,
      techStack: ['React Native', 'Expo', 'AsyncStorage'],
      imageUrl: null,
      status: 'published',
      featured: false,
      publishedAt: new Date('2026-02-10'),
    },
  });

  console.log(`✔ 1分習慣 (id: ${oneMinuteHabit.id})`);
  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
