'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

// ─── Types ───

type NodeType = 'project' | 'category' | 'skill';

interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  slug?: string; // For project nodes (clickable)
}

interface GraphEdge {
  source: string;
  target: string;
}

// ─── Graph Data ───

const NODE_DEFS: { id: string; label: string; type: NodeType; slug?: string }[] = [
  // Projects
  { id: 'labbit', label: 'Labbit', type: 'project', slug: 'labbit' },
  { id: 'biz-tools', label: '業務ツール', type: 'project', slug: 'business-tools' },
  // Categories
  { id: 'mobile', label: 'Mobile', type: 'category' },
  { id: 'web', label: 'Web', type: 'category' },
  { id: 'ai-ml', label: 'AI/ML', type: 'category' },
  { id: 'automation', label: '業務自動化', type: 'category' },
  { id: 'dev-tools', label: '開発ツール', type: 'category' },
  // Skills
  { id: 'swift', label: 'Swift', type: 'skill' },
  { id: 'swiftui', label: 'SwiftUI', type: 'skill' },
  { id: 'swiftdata', label: 'SwiftData', type: 'skill' },
  { id: 'openai', label: 'OpenAI API', type: 'skill' },
  { id: 'nl', label: 'NaturalLanguage', type: 'skill' },
  { id: 'gas', label: 'GAS', type: 'skill' },
  { id: 'sheets', label: 'Sheets', type: 'skill' },
  { id: 'figma-api', label: 'Figma API', type: 'skill' },
  { id: 'uikit', label: 'UIKit', type: 'skill' },
  { id: 'xcode', label: 'Xcode', type: 'skill' },
  { id: 'storekit', label: 'StoreKit', type: 'skill' },
  { id: 'typescript', label: 'TypeScript', type: 'skill' },
  { id: 'react', label: 'React', type: 'skill' },
  { id: 'nextjs', label: 'Next.js', type: 'skill' },
  { id: 'tailwind', label: 'Tailwind', type: 'skill' },
  { id: 'prisma', label: 'Prisma', type: 'skill' },
  { id: 'nodejs', label: 'Node.js', type: 'skill' },
  { id: 'claude-api', label: 'Claude API', type: 'skill' },
  { id: 'prompt-eng', label: 'プロンプト設計', type: 'skill' },
  { id: 'rag', label: 'RAG', type: 'skill' },
  { id: 'python', label: 'Python', type: 'skill' },
  { id: 'slack-bot', label: 'Slack Bot', type: 'skill' },
  { id: 'data-analysis', label: 'データ分析', type: 'skill' },
  { id: 'git', label: 'Git', type: 'skill' },
  { id: 'github', label: 'GitHub', type: 'skill' },
  { id: 'vercel', label: 'Vercel', type: 'skill' },
  { id: 'docker', label: 'Docker', type: 'skill' },
  { id: 'figma', label: 'Figma', type: 'skill' },
  { id: 'claude-code', label: 'Claude Code', type: 'skill' },
];

const EDGE_DEFS: [string, string][] = [
  // Labbit connections
  ['labbit', 'swift'], ['labbit', 'swiftui'], ['labbit', 'swiftdata'],
  ['labbit', 'openai'], ['labbit', 'nl'],
  // Business tools connections
  ['biz-tools', 'gas'], ['biz-tools', 'sheets'], ['biz-tools', 'figma-api'],
  // Mobile category
  ['mobile', 'swift'], ['mobile', 'swiftui'], ['mobile', 'swiftdata'],
  ['mobile', 'uikit'], ['mobile', 'xcode'], ['mobile', 'storekit'],
  // Web category
  ['web', 'typescript'], ['web', 'react'], ['web', 'nextjs'],
  ['web', 'tailwind'], ['web', 'prisma'], ['web', 'nodejs'],
  // AI/ML category
  ['ai-ml', 'openai'], ['ai-ml', 'prompt-eng'], ['ai-ml', 'claude-api'], ['ai-ml', 'rag'],
  // Automation category
  ['automation', 'python'], ['automation', 'gas'], ['automation', 'slack-bot'], ['automation', 'data-analysis'],
  // Dev tools category
  ['dev-tools', 'git'], ['dev-tools', 'github'], ['dev-tools', 'vercel'],
  ['dev-tools', 'docker'], ['dev-tools', 'figma'], ['dev-tools', 'claude-code'],
];

// ─── Physics Constants ───

const REPULSION_K = 3000;
const SPRING_K = 0.008;
const SPRING_REST = 80;
const CENTER_GRAVITY = 0.01;
const DAMPING = 0.9;
const COOLING_RATE = 0.997;
const MIN_TEMP = 0.01;

const ACCENT = '#e8c547';
const ACCENT_RGB = '232, 197, 71';
const TEXT_COLOR = '#ededef';
const TEXT_MUTED = '#8a8a8e';
const BORDER_COLOR = '#252529';
const SURFACE_COLOR = '#111114';

// ─── Helpers ───

function nodeRadius(type: NodeType): number {
  switch (type) {
    case 'project': return 22;
    case 'category': return 16;
    case 'skill': return 10;
  }
}

function nodeFill(type: NodeType, hovered: boolean): string {
  if (hovered) return ACCENT;
  switch (type) {
    case 'project': return ACCENT;
    case 'category': return SURFACE_COLOR;
    case 'skill': return SURFACE_COLOR;
  }
}

function nodeStroke(type: NodeType, hovered: boolean): string {
  if (hovered) return ACCENT;
  switch (type) {
    case 'project': return ACCENT;
    case 'category': return ACCENT;
    case 'skill': return BORDER_COLOR;
  }
}

function labelColor(type: NodeType, hovered: boolean): string {
  if (hovered) return ACCENT;
  switch (type) {
    case 'project': return TEXT_COLOR;
    case 'category': return TEXT_COLOR;
    case 'skill': return TEXT_MUTED;
  }
}

// ─── Component ───

export function ForceGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const edgesRef = useRef<GraphEdge[]>([]);
  const animRef = useRef<number>(0);
  const tempRef = useRef(1.0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const dragRef = useRef<{ nodeId: string | null; offsetX: number; offsetY: number }>({
    nodeId: null, offsetX: 0, offsetY: 0,
  });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    hoveredRef.current = hoveredNode;
  }, [hoveredNode]);

  const initGraph = useCallback((w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;

    nodesRef.current = NODE_DEFS.map((def) => ({
      ...def,
      x: cx + (Math.random() - 0.5) * w * 0.6,
      y: cy + (Math.random() - 0.5) * h * 0.6,
      vx: 0,
      vy: 0,
      radius: nodeRadius(def.type),
    }));

    edgesRef.current = EDGE_DEFS.map(([source, target]) => ({ source, target }));
    tempRef.current = 1.0;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = Math.max(400, Math.min(600, w * 0.65));

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (sizeRef.current.w === 0) {
      initGraph(w, h);
    }
    sizeRef.current = { w, h };
  }, [initGraph]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // ─── Mouse / Touch Interaction ───

  const getCanvasPos = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const findNodeAt = useCallback((x: number, y: number): GraphNode | null => {
    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const dx = n.x - x;
      const dy = n.y - y;
      if (dx * dx + dy * dy < (n.radius + 5) * (n.radius + 5)) {
        return n;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerDown = (e: PointerEvent) => {
      const pos = getCanvasPos(e.clientX, e.clientY);
      const node = findNodeAt(pos.x, pos.y);
      if (node) {
        dragRef.current = {
          nodeId: node.id,
          offsetX: pos.x - node.x,
          offsetY: pos.y - node.y,
        };
        canvas.setPointerCapture(e.pointerId);
        // Reset temperature for re-layout
        tempRef.current = Math.max(tempRef.current, 0.3);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const pos = getCanvasPos(e.clientX, e.clientY);
      const drag = dragRef.current;

      if (drag.nodeId) {
        const node = nodesRef.current.find((n) => n.id === drag.nodeId);
        if (node) {
          node.x = pos.x - drag.offsetX;
          node.y = pos.y - drag.offsetY;
          node.vx = 0;
          node.vy = 0;
        }
      } else {
        const node = findNodeAt(pos.x, pos.y);
        const newHovered = node?.id ?? null;
        if (newHovered !== hoveredRef.current) {
          setHoveredNode(newHovered);
        }
        canvas.style.cursor = node
          ? (node.type === 'project' ? 'pointer' : 'grab')
          : 'default';
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (drag.nodeId) {
        // Check if it was a click (not a drag)
        const node = nodesRef.current.find((n) => n.id === drag.nodeId);
        if (node?.type === 'project' && node.slug) {
          const pos = getCanvasPos(e.clientX, e.clientY);
          const dx = pos.x - (node.x + drag.offsetX);
          const dy = pos.y - (node.y + drag.offsetY);
          if (Math.abs(dx) < 3 && Math.abs(dy) < 3) {
            window.location.href = `/projects/${node.slug}`;
          }
        }
        dragRef.current = { nodeId: null, offsetX: 0, offsetY: 0 };
      }
    };

    const handlePointerLeave = () => {
      setHoveredNode(null);
      canvas.style.cursor = 'default';
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [getCanvasPos, findNodeAt]);

  // ─── Animation Loop ───

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Build adjacency set for quick lookup
    const adjacency = new Set<string>();
    function edgeKey(a: string, b: string) {
      return a < b ? `${a}|${b}` : `${b}|${a}`;
    }
    for (const e of edgesRef.current) {
      adjacency.add(edgeKey(e.source, e.target));
    }

    function getConnected(nodeId: string): Set<string> {
      const connected = new Set<string>();
      for (const e of edgesRef.current) {
        if (e.source === nodeId) connected.add(e.target);
        if (e.target === nodeId) connected.add(e.source);
      }
      return connected;
    }

    function tick() {
      const { w, h } = sizeRef.current;
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const temp = tempRef.current;
      const hovered = hoveredRef.current;

      ctx!.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // ─── Physics ───

      if (temp > MIN_TEMP) {
        // Repulsion (Coulomb)
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 1) dist = 1;
            const force = REPULSION_K / (dist * dist);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (dragRef.current.nodeId !== a.id) { a.vx += fx; a.vy += fy; }
            if (dragRef.current.nodeId !== b.id) { b.vx -= fx; b.vy -= fy; }
          }
        }

        // Spring (Hooke) along edges
        const nodeMap = new Map(nodes.map((n) => [n.id, n]));
        for (const edge of edges) {
          const a = nodeMap.get(edge.source);
          const b = nodeMap.get(edge.target);
          if (!a || !b) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 1) dist = 1;
          const displacement = dist - SPRING_REST;
          const force = SPRING_K * displacement;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (dragRef.current.nodeId !== a.id) { a.vx += fx; a.vy += fy; }
          if (dragRef.current.nodeId !== b.id) { b.vx -= fx; b.vy -= fy; }
        }

        // Center gravity
        for (const n of nodes) {
          if (dragRef.current.nodeId === n.id) continue;
          n.vx += (cx - n.x) * CENTER_GRAVITY;
          n.vy += (cy - n.y) * CENTER_GRAVITY;
        }

        // Integration + damping
        for (const n of nodes) {
          if (dragRef.current.nodeId === n.id) continue;
          n.vx *= DAMPING;
          n.vy *= DAMPING;
          n.x += n.vx * temp;
          n.y += n.vy * temp;

          // Boundary clamp
          const pad = n.radius + 20;
          n.x = Math.max(pad, Math.min(w - pad, n.x));
          n.y = Math.max(pad, Math.min(h - pad, n.y));
        }

        tempRef.current *= COOLING_RATE;
      }

      // ─── Render ───

      const connectedToHover = hovered ? getConnected(hovered) : new Set<string>();

      // Edges
      for (const edge of edges) {
        const a = nodes.find((n) => n.id === edge.source);
        const b = nodes.find((n) => n.id === edge.target);
        if (!a || !b) continue;

        const isHighlighted = hovered && (
          edge.source === hovered || edge.target === hovered
        );
        const isDimmed = hovered && !isHighlighted;

        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.strokeStyle = isHighlighted
          ? `rgba(${ACCENT_RGB}, 0.5)`
          : isDimmed
            ? `rgba(${ACCENT_RGB}, 0.03)`
            : `rgba(${ACCENT_RGB}, 0.12)`;
        ctx!.lineWidth = isHighlighted ? 1.5 : 0.5;
        ctx!.stroke();
      }

      // Nodes
      for (const n of nodes) {
        const isHovered = n.id === hovered;
        const isConnected = connectedToHover.has(n.id);
        const isDimmed = hovered && !isHovered && !isConnected;

        const alpha = isDimmed ? 0.2 : 1;

        // Glow for project/hovered
        if ((n.type === 'project' || isHovered) && !isDimmed) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.radius + 8, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${ACCENT_RGB}, 0.06)`;
          ctx!.fill();
        }

        // Node circle
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fillStyle = nodeFill(n.type, isHovered);
        ctx!.globalAlpha = alpha;
        ctx!.fill();
        ctx!.strokeStyle = nodeStroke(n.type, isHovered);
        ctx!.lineWidth = isHovered ? 2 : 1;
        ctx!.stroke();
        ctx!.globalAlpha = 1;

        // Label
        const fontSize = n.type === 'project' ? 11 : n.type === 'category' ? 10 : 9;
        ctx!.font = `${n.type === 'project' ? '600' : '400'} ${fontSize}px 'Syne', system-ui, sans-serif`;
        ctx!.textAlign = 'center';
        ctx!.textBaseline = 'middle';

        // For projects, label inside; for others, label below
        if (n.type === 'project') {
          ctx!.fillStyle = isDimmed ? `rgba(8,8,10, ${alpha})` : '#08080a';
          ctx!.fillText(n.label, n.x, n.y);
        } else {
          ctx!.fillStyle = labelColor(n.type, isHovered);
          ctx!.globalAlpha = alpha;
          ctx!.fillText(n.label, n.x, n.y + n.radius + 12);
          ctx!.globalAlpha = 1;
        }
      }

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full touch-none"
        style={{ display: 'block' }}
      />
    </div>
  );
}
