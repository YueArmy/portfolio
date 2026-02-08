'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
}

const SPRING_K = 0.015;
const DAMPING = 0.95;
const MOUSE_RADIUS = 120;
const MOUSE_FORCE = 8000;
const CONNECTION_DIST = 130;
const PARTICLE_RADIUS = 1.8;
const GLOW_RADIUS = 4;

const ACCENT_RGB = '232, 197, 71';

function createParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      homeX: x,
      homeY: y,
    });
  }
  return particles;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const getCount = useCallback((w: number) => {
    // Mobile: ~50, Desktop: ~110
    if (w < 640) return 50;
    if (w < 1024) return 80;
    return 110;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = parent.clientHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = getCount(w);
    const prev = sizeRef.current;

    if (prev.w === 0 || Math.abs(prev.w - w) > 100 || Math.abs(prev.h - h) > 100) {
      particlesRef.current = createParticles(w, h, count);
    }

    sizeRef.current = { w, h };
  }, [getCount]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Listen on parent since canvas has pointer-events: none
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
      parent.addEventListener('touchmove', handleTouchMove, { passive: true });
      parent.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
        parent.removeEventListener('touchmove', handleTouchMove);
        parent.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function tick() {
      const { w, h } = sizeRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx!.clearRect(0, 0, w, h);

      // Physics update
      for (const p of particles) {
        // Spring force toward home
        const dx = p.homeX - p.x;
        const dy = p.homeY - p.y;
        p.vx += dx * SPRING_K;
        p.vy += dy * SPRING_K;

        // Mouse repulsion (inverse-square)
        const mx = p.x - mouse.x;
        const my = p.y - mouse.y;
        const mDist = Math.sqrt(mx * mx + my * my);
        if (mDist < MOUSE_RADIUS && mDist > 1) {
          const force = MOUSE_FORCE / (mDist * mDist);
          p.vx += (mx / mDist) * force;
          p.vy += (my / mDist) * force;
        }

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        // Euler integration
        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${ACCENT_RGB}, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        // Glow
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, GLOW_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT_RGB}, 0.08)`;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT_RGB}, 0.6)`;
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
