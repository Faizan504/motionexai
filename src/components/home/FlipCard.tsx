'use client';

import { useState } from 'react';

/** Flip card with tap support (hover/focus flipping is handled in CSS). */
export default function FlipCard({ label, children }: { label: string; children: React.ReactNode }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`flip${flipped ? ' flipped' : ''}`}>
      <div className="flip-inner">{children}</div>
      <button className="flip-btn" aria-label={label} aria-pressed={flipped} onClick={() => setFlipped((f) => !f)} />
    </div>
  );
}
