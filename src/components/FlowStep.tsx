'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { FlowChip } from '@/components/FlowChip';

interface Choice {
  label: string;
  next: string;
}

interface FlowStepProps {
  message: string;
  content?: ReactNode;
  choices: Choice[];
  onSelect: (next: string) => void;
  isHistory?: boolean;
  selectedChoice?: string;
}

export function FlowStep({
  message,
  content,
  choices,
  onSelect,
  isHistory,
  selectedChoice,
}: FlowStepProps) {
  if (isHistory) {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <p
          className="text-[13px] text-[var(--color-text-dim)]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {message}
        </p>
        {selectedChoice && (
          <span
            className="mt-2 inline-block rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-[12px] text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {selectedChoice}
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8"
    >
      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-[15px] leading-relaxed text-[var(--color-text)]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {message}
      </motion.p>

      {/* Rich content */}
      {content && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          {content}
        </motion.div>
      )}

      {/* Choices */}
      {choices.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {choices.map((choice, i) => (
            <FlowChip
              key={choice.label}
              label={choice.label}
              index={i}
              onClick={() => onSelect(choice.next)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
