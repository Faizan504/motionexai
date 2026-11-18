'use client';

import type Lenis from 'lenis';

/** Shared state between the scroll controller and the WebGL particle scene. */
export interface SceneState {
  morph: number;
  shift: number;
  dim: number;
  mouseX: number;
  mouseY: number;
  scroll: number;
}

export const scene: SceneState = { morph: 0, shift: 1, dim: 1, mouseX: 0, mouseY: 0, scroll: 0 };

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth-scroll to a selector or element, accounting for the fixed header. */
export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Cross-component events (header ↔ assistant ↔ demo center ↔ lead form). */
export const EVENTS = {
  closeOverlays: 'mx:close-overlays',
  runDemo: 'mx:run-demo',
} as const;

export const emit = (name: string, detail?: unknown) => window.dispatchEvent(new CustomEvent(name, { detail }));

export const escapeHtml = (s: string) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);
