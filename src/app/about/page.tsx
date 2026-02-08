import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionTitle } from '@/components/SectionTitle';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { RadarChart } from '@/components/about/RadarChart';
import { ScenarioCard } from '@/components/about/ScenarioCard';
import { StrengthItem } from '@/components/about/StrengthItem';
import { WorkStyleBlock } from '@/components/about/WorkStyleBlock';
import { SkillGroup } from '@/components/about/SkillGroup';
import { ForceGraph } from '@/components/about/ForceGraph';

export const metadata: Metadata = {
  title: 'About',
  description: '「"こんなの作れる？" を "できた" に変える人」— 強み・働き方・スキルセット',
};

const scenarios = [
  {
    challenge: '「こんなアプリが欲しいんだけど…」',
    solution: '一緒に考えるところから始めて、形にするまで伴走します。',
  },
  {
    challenge: '「今の業務フロー、もっと楽にならない？」',
    solution: '手作業のボトルネックを見つけて、自動化ツールで解消します。',
  },
  {
    challenge: '「AIを使って何かできないかな？」',
    solution: '目的に合ったAI活用法を提案し、プロトタイプまで素早く作ります。',
  },
  {
    challenge: '「とりあえず動くものが見たい」',
    solution: '最速でMVPを作って、触りながら方向性を決めていきます。',
  },
];

const strengths = [
  { ability: '全体設計力', meaning: '技術選定からUI設計まで、一人で完結できる' },
  { ability: 'スピード実装', meaning: '「まず動くもの」を最短で届ける' },
  { ability: '曖昧さの翻訳', meaning: 'ふわっとした要望を具体的な仕様に変換する' },
  { ability: '先回り提案', meaning: '聞かれる前に「これも要りますよね」を出す' },
  { ability: '探索的アプローチ', meaning: '正解がない問題を試行錯誤で突破する' },
];

const workStyles = [
  {
    number: 1,
    title: '一人完結型',
    description: '企画・設計・実装・テスト・デプロイまで、一人で回せるのが基本スタイル。チームでもソロでも動ける。',
  },
  {
    number: 2,
    title: '動くもの派',
    description: '議論より先にプロトタイプ。「これでどう？」を早く見せて、フィードバックループを高速で回す。',
  },
  {
    number: 3,
    title: '探索型開発',
    description: '最初から正解を決め打ちしない。複数のアプローチを試して、最も筋の良い道を選ぶ。',
  },
  {
    number: 4,
    title: '新しい挑戦好き',
    description: '未経験の技術やドメインこそ面白い。学びながら作る速度には自信がある。',
  },
];

const skillGroups = [
  {
    category: 'Mobile',
    skills: ['Swift', 'SwiftUI', 'SwiftData', 'UIKit', 'Xcode', 'StoreKit'],
  },
  {
    category: 'Web',
    skills: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Prisma', 'Node.js'],
  },
  {
    category: 'AI / ML',
    skills: ['OpenAI API', 'プロンプトエンジニアリング', 'Claude API', 'RAG'],
  },
  {
    category: '業務自動化',
    skills: ['Python', 'Google Apps Script', 'Slack Bot', 'データ分析'],
  },
  {
    category: '開発ツール',
    skills: ['Git', 'GitHub', 'Vercel', 'Docker', 'Figma', 'Claude Code'],
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Section 1: About Hero */}
      <section className="relative flex min-h-[60vh] items-center">
        {/* Gradient mesh */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full opacity-[0.06]"
            style={{
              background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
              animation: 'mesh-drift 22s ease-in-out infinite',
            }}
          />
          <div
            className="absolute -bottom-1/4 -left-1/6 h-[400px] w-[400px] rounded-full opacity-[0.03]"
            style={{
              background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
              animation: 'mesh-drift 28s ease-in-out infinite reverse',
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div className="space-y-6 md:-mt-8">
              <div className="h-px w-12 bg-[var(--color-accent)]" />

              <h1
                className="text-[clamp(1.8rem,5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                &ldquo;こんなの作れる？&rdquo;
                <br />
                を{' '}
                <span className="text-[var(--color-accent)]">&ldquo;できた&rdquo;</span>
                {' '}に変える人
              </h1>

              <p
                className="max-w-md text-[15px] leading-relaxed text-[var(--color-text-muted)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                企画から設計、実装、デプロイまで一人で回せるフルスタック開発者。
                <br />
                「まず動くものを見せる」を信条に、アイデアを最速で形にします。
              </p>
            </div>

            {/* Abstract frame decoration */}
            <div className="hidden md:block">
              <div className="relative aspect-square">
                <div className="absolute inset-12 border border-[var(--color-border)] rotate-6" />
                <div className="absolute inset-20 border border-[var(--color-accent)]/15 -rotate-3" />
                <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]" />
                <div className="absolute top-0 left-0 h-6 w-px bg-[var(--color-accent)]/30" />
                <div className="absolute top-0 left-0 h-px w-6 bg-[var(--color-accent)]/30" />
                <div className="absolute bottom-0 right-0 h-6 w-px bg-[var(--color-accent)]/30" />
                <div className="absolute bottom-0 right-0 h-px w-6 bg-[var(--color-accent)]/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: こんな時に頼んでください */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionTitle>こんな時に頼んでください</SectionTitle>
        <ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {scenarios.map((s) => (
              <ScenarioCard key={s.challenge} challenge={s.challenge} solution={s.solution} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: 強み + レーダーチャート */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionTitle>Strengths</SectionTitle>
        <ScrollReveal>
          <div className="grid items-start gap-10 md:grid-cols-[1fr_1.2fr]">
            <RadarChart />
            <div>
              {strengths.map((s) => (
                <StrengthItem key={s.ability} ability={s.ability} meaning={s.meaning} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: 働き方 */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionTitle>Work Style</SectionTitle>
        <ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {workStyles.map((ws) => (
              <WorkStyleBlock
                key={ws.number}
                number={ws.number}
                title={ws.title}
                description={ws.description}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: Skill Map (Force Graph) */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionTitle>Skill Map</SectionTitle>
        <ScrollReveal>
          <ForceGraph />
        </ScrollReveal>
      </section>

      {/* Section 5b: スキルセット (badge fallback) */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <ScrollReveal>
          <div className="space-y-8">
            {skillGroups.map((sg) => (
              <SkillGroup key={sg.category} category={sg.category} skills={sg.skills} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <p
              className="text-sm uppercase tracking-[0.15em] text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              興味を持っていただけたら
            </p>
            <div className="flex gap-4">
              <Link href="/projects">
                <Button>Projects を見る</Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary">Contact</Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
