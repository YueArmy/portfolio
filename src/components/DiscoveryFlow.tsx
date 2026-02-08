'use client';

import { useReducer, useRef, useEffect, useMemo, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FlowStep } from '@/components/FlowStep';
import { Badge } from '@/components/ui/Badge';
import { WorkStyleBlock } from '@/components/about/WorkStyleBlock';
import { StrengthItem } from '@/components/about/StrengthItem';

// ─── Types ───

type FlowState =
  | 'welcome'
  | 'projects'
  | 'about'
  | 'skills'
  | 'workstyle'
  | 'labbit-detail'
  | 'contact';

interface Choice {
  label: string;
  next: FlowState;
}

interface FlowStepDef {
  id: FlowState;
  message: string;
  content?: ReactNode;
  choices: Choice[];
}

// ─── State Machine ───

interface State {
  history: { state: FlowState; selectedLabel: string }[];
  current: FlowState;
}

type Action = { type: 'SELECT'; next: FlowState; label: string };

function reducer(state: State, action: Action): State {
  return {
    history: [
      ...state.history,
      { state: state.current, selectedLabel: action.label },
    ],
    current: action.next,
  };
}

// ─── Content Components ───

function ProjectCards() {
  const projects = [
    {
      title: 'Labbit',
      description: 'AIを活用した読書×語彙学習iOSアプリ',
      tags: ['Swift', 'SwiftUI', 'OpenAI API'],
      slug: 'labbit',
    },
    {
      title: '業務ツール開発',
      description: 'ユーザーの要望をヒアリングし、業務効率化ツールを企画・開発',
      tags: ['Google Apps Script', 'Figma API'],
      slug: 'business-tools',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3 + i * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link href={`/projects/${project.slug}`} className="group block">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:border-[var(--color-border-accent)] hover:shadow-[0_0_30px_var(--color-accent-glow)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/0 to-transparent transition-all duration-500 group-hover:via-[var(--color-accent)]/60" />
              <h3
                className="text-base font-semibold text-[var(--color-text)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {project.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function AboutContent() {
  const strengths = [
    { ability: '全体設計力', meaning: '技術選定からUI設計まで、一人で完結できる' },
    { ability: 'スピード実装', meaning: '「まず動くもの」を最短で届ける' },
    { ability: '曖昧さの翻訳', meaning: 'ふわっとした要望を具体的な仕様に変換する' },
    { ability: '先回り提案', meaning: '聞かれる前に「これも要りますよね」を出す' },
  ];

  return (
    <div>
      {strengths.map((s, i) => (
        <motion.div
          key={s.ability}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.3 + i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <StrengthItem ability={s.ability} meaning={s.meaning} />
        </motion.div>
      ))}
    </div>
  );
}

function SkillsContent() {
  const skillGroups = [
    { category: 'Mobile', skills: ['Swift', 'SwiftUI', 'SwiftData', 'UIKit', 'StoreKit'] },
    { category: 'Web', skills: ['TypeScript', 'React', 'Next.js', 'Tailwind', 'Prisma'] },
    { category: 'AI / ML', skills: ['OpenAI API', 'Claude API', 'プロンプトエンジニアリング'] },
    { category: '業務自動化', skills: ['Python', 'GAS', 'Slack Bot'] },
    { category: '開発ツール', skills: ['Git', 'GitHub', 'Vercel', 'Docker', 'Claude Code'] },
  ];

  return (
    <div className="space-y-6">
      {skillGroups.map((group, gi) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.3 + gi * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h4
            className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {group.category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WorkStyleContent() {
  const styles = [
    { number: 1, title: '一人完結型', description: '企画・設計・実装・テスト・デプロイまで、一人で回せるのが基本スタイル。' },
    { number: 2, title: '動くもの派', description: '議論より先にプロトタイプ。「これでどう？」を早く見せて、フィードバックループを高速で回す。' },
    { number: 3, title: '探索型開発', description: '最初から正解を決め打ちしない。複数のアプローチを試して、最も筋の良い道を選ぶ。' },
    { number: 4, title: '新しい挑戦好き', description: '未経験の技術やドメインこそ面白い。学びながら作る速度には自信がある。' },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {styles.map((ws, i) => (
        <motion.div
          key={ws.number}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.3 + i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <WorkStyleBlock
            number={ws.number}
            title={ws.title}
            description={ws.description}
          />
        </motion.div>
      ))}
    </div>
  );
}

function LabbitDetail() {
  const timeline = [
    { step: 1, title: 'きっかけ', body: '「読書しながら単語も覚えられたら面白いかも」という発想から' },
    { step: 2, title: 'プロトタイプ', body: 'SwiftUI で基本的な読書画面と単語帳を試作。手応えを確認' },
    { step: 3, title: 'AI統合', body: 'OpenAI API を組み込み、レベル別のコンテンツ生成を実装' },
    { step: 4, title: 'リリース', body: '約4〜5ヶ月の開発を経てApp Storeに公開' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">
          読書を通じて語彙力を伸ばすiOSアプリ。AIが読み手のレベルに合わせたコンテンツを生成し、読んだ文章から自動で単語を抽出してフラッシュカードに変換します。
        </p>
        <div className="flex flex-wrap gap-2">
          {['Swift', 'SwiftUI', 'SwiftData', 'OpenAI API', 'NaturalLanguage'].map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>

      <div className="space-y-0">
        {timeline.map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.4 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex gap-4 py-3 border-b border-[var(--color-border)] last:border-b-0"
          >
            <span
              className="shrink-0 text-lg font-extrabold text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {String(item.step).padStart(2, '0')}
            </span>
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                {item.title}
              </h4>
              <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">{item.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Link
        href="/projects/labbit"
        className="inline-block text-[13px] text-[var(--color-accent)] hover:underline"
      >
        詳しく見る &rarr;
      </Link>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-[13px] text-[var(--color-text-muted)]">
        プロジェクトのご相談、お仕事のご依頼など、お気軽にどうぞ。
      </p>
      <Link
        href="/contact"
        className="rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-2.5 text-[13px] font-medium text-[var(--color-bg)] transition-all duration-200 hover:bg-transparent hover:text-[var(--color-accent)]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Contact
      </Link>
    </div>
  );
}

// ─── Flow Definition ───

function useFlowSteps(): FlowStepDef[] {
  return useMemo(() => [
    {
      id: 'welcome',
      message: 'はじめまして。何を探していますか？',
      choices: [
        { label: '作ったものが見たい', next: 'projects' },
        { label: 'どんな人か知りたい', next: 'about' },
        { label: 'スキルを見たい', next: 'skills' },
        { label: '仕事の相談', next: 'contact' },
      ],
    },
    {
      id: 'projects',
      message: 'AIを使ったiOSアプリから、業務効率化ツールまで。',
      content: <ProjectCards />,
      choices: [
        { label: 'Labbitについて詳しく', next: 'labbit-detail' },
        { label: '技術スタックが気になる', next: 'skills' },
        { label: '相談したい', next: 'contact' },
      ],
    },
    {
      id: 'about',
      message: '「こんなの作れる？」を「できた」に変える人です。',
      content: <AboutContent />,
      choices: [
        { label: 'どうやって仕事するの？', next: 'workstyle' },
        { label: 'プロジェクトが見たい', next: 'projects' },
        { label: 'スキルセットは？', next: 'skills' },
      ],
    },
    {
      id: 'skills',
      message: 'Mobile、Web、AI、業務自動化。',
      content: <SkillsContent />,
      choices: [
        { label: 'プロジェクトが見たい', next: 'projects' },
        { label: '相談したい', next: 'contact' },
      ],
    },
    {
      id: 'workstyle',
      message: '一人完結型。議論より先にプロトタイプ。',
      content: <WorkStyleContent />,
      choices: [
        { label: 'プロジェクトが見たい', next: 'projects' },
        { label: '相談したい', next: 'contact' },
      ],
    },
    {
      id: 'labbit-detail',
      message: 'Labbit — AIを活用した読書×語彙学習アプリ。',
      content: <LabbitDetail />,
      choices: [
        { label: '他のプロジェクトも見る', next: 'projects' },
        { label: '相談したい', next: 'contact' },
      ],
    },
    {
      id: 'contact',
      message: 'お気軽にどうぞ。',
      content: <ContactContent />,
      choices: [],
    },
  ], []);
}

// ─── Main Component ───

export function DiscoveryFlow() {
  const flowSteps = useFlowSteps();
  const [state, dispatch] = useReducer(reducer, {
    history: [],
    current: 'welcome' as FlowState,
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.history.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.history.length]);

  const currentStep = flowSteps.find((s) => s.id === state.current);

  const handleSelect = (next: FlowState, label: string) => {
    dispatch({ type: 'SELECT', next, label });
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      {/* Conversation indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-8 flex items-center gap-3"
      >
        <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        <span
          className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-dim)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Discovery Flow
        </span>
      </motion.div>

      {/* History */}
      <AnimatePresence mode="sync">
        {state.history.map((entry, i) => {
          const step = flowSteps.find((s) => s.id === entry.state);
          if (!step) return null;
          return (
            <FlowStep
              key={`history-${i}`}
              message={step.message}
              choices={step.choices}
              onSelect={() => {}}
              isHistory
              selectedChoice={entry.selectedLabel}
            />
          );
        })}
      </AnimatePresence>

      {/* Current step */}
      {currentStep && (
        <div ref={bottomRef}>
          <FlowStep
            key={state.current}
            message={currentStep.message}
            content={currentStep.content}
            choices={currentStep.choices}
            onSelect={(next) => {
              const choice = currentStep.choices.find((c) => c.next === next);
              handleSelect(next as FlowState, choice?.label ?? '');
            }}
          />
        </div>
      )}
    </section>
  );
}
