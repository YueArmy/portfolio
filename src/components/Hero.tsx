'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ParticleCanvas } from '@/components/ParticleCanvas';

const letterVariants = {
  initial: { y: '110%', opacity: 0 },
  animate: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.15 + i * 0.04,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function AnimatedWord({
  text,
  className,
  startIndex = 0,
}: {
  text: string;
  className?: string;
  startIndex?: number;
}) {
  return (
    <span className={className} style={{ display: 'block', overflow: 'hidden' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={letterVariants}
          initial="initial"
          animate="animate"
          custom={startIndex + i}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      {/* Particle network background */}
      <ParticleCanvas />

      {/* Grid lines (decorative) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-[var(--color-text)]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-text)]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-[var(--color-text)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          {/* Left — asymmetric push */}
          <div className="space-y-8 md:-mt-16">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-12 origin-left bg-[var(--color-accent)]"
            />

            <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              <AnimatedWord text="Build." className="text-[var(--color-text)]" startIndex={0} />
              <AnimatedWord text="Explore." className="text-[var(--color-accent)]" startIndex={6} />
              <AnimatedWord text="Ship." className="text-[var(--color-text)]" startIndex={14} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md text-[var(--color-text-muted)]"
            >
              何を作ったかだけでなく、どう辿り着いたか。
              <br />
              探索のプロセスを含むポートフォリオ。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4"
            >
              <Link href="/projects">
                <Button>Projects</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary">About</Button>
              </Link>
            </motion.div>
          </div>

          {/* Right — abstract frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <div className="relative aspect-square">
              <div className="absolute inset-8 border border-[var(--color-border)] rotate-12" />
              <div className="absolute inset-16 border border-[var(--color-accent)]/20 -rotate-6" />
              <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]" />
              <div className="absolute top-0 left-0 h-6 w-px bg-[var(--color-accent)]/40" />
              <div className="absolute top-0 left-0 h-px w-6 bg-[var(--color-accent)]/40" />
              <div className="absolute bottom-0 right-0 h-6 w-px bg-[var(--color-accent)]/40" />
              <div className="absolute bottom-0 right-0 h-px w-6 bg-[var(--color-accent)]/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
