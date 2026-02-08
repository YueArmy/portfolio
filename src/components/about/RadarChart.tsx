'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Axis {
  label: string;
  value: number; // 1-10
}

const axes: Axis[] = [
  { label: 'ひらめき', value: 8 },
  { label: 'スピード', value: 9 },
  { label: '曖昧さ耐性', value: 9 },
  { label: '先回り', value: 8 },
  { label: '整理力', value: 8 },
  { label: '完成イメージ力', value: 8 },
];

const SIZE = 300;
const CENTER = SIZE / 2;
const MAX_RADIUS = 110;
const LEVELS = 3;

function polarToCartesian(angle: number, radius: number): [number, number] {
  // Start from top (-90deg), go clockwise
  const rad = ((angle - 90) * Math.PI) / 180;
  return [CENTER + radius * Math.cos(rad), CENTER + radius * Math.sin(rad)];
}

function getPolygonPoints(values: number[], maxValue: number): string {
  const step = 360 / values.length;
  return values
    .map((v, i) => {
      const radius = (v / maxValue) * MAX_RADIUS;
      const [x, y] = polarToCartesian(step * i, radius);
      return `${x},${y}`;
    })
    .join(' ');
}

function getGridPolygon(level: number): string {
  const radius = (MAX_RADIUS / LEVELS) * (level + 1);
  const step = 360 / axes.length;
  return axes
    .map((_, i) => {
      const [x, y] = polarToCartesian(step * i, radius);
      return `${x},${y}`;
    })
    .join(' ');
}

export function RadarChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const step = 360 / axes.length;
  const dataPoints = getPolygonPoints(
    axes.map((a) => a.value),
    10
  );

  return (
    <div ref={ref} className="mx-auto w-full max-w-[280px] md:max-w-[320px]">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full">
        {/* Grid levels */}
        {Array.from({ length: LEVELS }, (_, level) => (
          <polygon
            key={level}
            points={getGridPolygon(level)}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={level === LEVELS - 1 ? 1 : 0.5}
          />
        ))}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const [x, y] = polarToCartesian(step * i, MAX_RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="var(--color-border)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={dataPoints}
          fill="var(--color-accent)"
          fillOpacity={0.12}
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {/* Data points */}
        {axes.map((a, i) => {
          const radius = (a.value / 10) * MAX_RADIUS;
          const [x, y] = polarToCartesian(step * i, radius);
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={3}
              fill="var(--color-accent)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            />
          );
        })}

        {/* Labels */}
        {axes.map((a, i) => {
          const labelRadius = MAX_RADIUS + 22;
          const [x, y] = polarToCartesian(step * i, labelRadius);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--color-text-muted)"
              fontSize={11}
              fontFamily="var(--font-body)"
            >
              {a.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
