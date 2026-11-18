import type { CSSProperties } from 'react';
import type { IconId } from '@/content/types';

/** Renders an icon from the inline SVG sprite (see IconSprite). */
export default function Icon({ id, className = '', style }: { id: IconId; className?: string; style?: CSSProperties }) {
  return (
    <svg className={`ico${className ? ' ' + className : ''}`} style={style} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}
