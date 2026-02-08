'use client';

import { motion } from 'framer-motion';

interface FlowChipProps {
  label: string;
  index: number;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export function FlowChip({ label, index, onClick, disabled, selected }: FlowChipProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.3 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full border px-4 py-2 text-[13px] transition-all duration-200
        ${selected
          ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg)] font-medium'
          : disabled
            ? 'border-[var(--color-border)] text-[var(--color-text-dim)] cursor-default'
            : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer'
        }
      `}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {label}
    </motion.button>
  );
}
