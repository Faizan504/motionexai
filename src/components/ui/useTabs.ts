'use client';

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Sliding tab indicator + arrow-key navigation for a `.tabs` container
 * (same behaviour as the prototype's bindTabs()).
 */
export function useTabs(selected: number, count: number, onSelect: (i: number) => void) {
  const listRef = useRef<HTMLDivElement>(null);

  const moveInd = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const ind = list.querySelector<HTMLElement>('.tab-ind');
    const sel = list.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!ind || !sel) return;
    ind.style.left = sel.offsetLeft + 'px';
    ind.style.top = sel.offsetTop + 'px';
    ind.style.width = sel.offsetWidth + 'px';
    ind.style.height = sel.offsetHeight + 'px';
  }, []);

  useIso(() => {
    moveInd();
  }, [selected, moveInd]);

  useEffect(() => {
    window.addEventListener('resize', moveInd);
    document.fonts?.ready.then(moveInd);
    return () => window.removeEventListener('resize', moveInd);
  }, [moveInd]);

  const onKeyDown = (i: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    let n: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % count;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + count) % count;
    if (n === null) return;
    e.preventDefault();
    onSelect(n);
    const btns = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    btns?.[n]?.focus();
  };

  return { listRef, onKeyDown };
}
