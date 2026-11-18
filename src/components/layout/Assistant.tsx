'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { ASSISTANT_REPLIES } from '@/content/site';
import { scrollToTarget } from '@/lib/motion';

type Msg = { id: number; who: 'bot' | 'me'; text: string; typing?: boolean; link?: boolean };

const QUICK = [
  { q: 'industries', label: 'Which industries?' },
  { q: 'aec', label: 'AI for construction' },
  { q: 'hr', label: 'AI for recruitment' },
  { q: 'book', label: 'Book a call' },
];

const classify = (v: string) => {
  const l = v.toLowerCase();
  if (/construct|bim|aec|engineer/.test(l)) return 'aec';
  if (/recruit|hr\b|hiring|cv|candidate/.test(l)) return 'hr';
  if (/industr|sector/.test(l)) return 'industries';
  if (/book|call|meet|consult|price|cost/.test(l)) return 'book';
  return 'fallback';
};

/** Scripted AI assistant preview. Connects to an approved knowledge base in a later phase. */
export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [value, setValue] = useState('');
  const greeted = useRef(false);
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (m: Omit<Msg, 'id'>) => {
    const id = ++idRef.current;
    setMsgs((cur) => [...cur, { ...m, id }]);
    return id;
  };

  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [msgs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function openAssist() {
    setOpen(true);
    if (!greeted.current) {
      greeted.current = true;
      push({ who: 'bot', text: "Hi 👋 I'm the MotionexAI assistant. Tell me your industry and I'll show you relevant AI solutions." });
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  }

  function botReply(key: string) {
    const typingId = push({ who: 'bot', text: '', typing: true });
    setTimeout(() => {
      setMsgs((cur) => cur.filter((m) => m.id !== typingId));
      push({ who: 'bot', text: ASSISTANT_REPLIES[key] || ASSISTANT_REPLIES.fallback });
      if (key === 'book') push({ who: 'bot', text: '→ Open inquiry form', link: true });
    }, 900);
  }

  function ask(text: string, key: string) {
    push({ who: 'me', text });
    botReply(key);
  }

  return (
    <>
      <button
        className="assist-btn"
        aria-label="Open AI assistant"
        aria-expanded={open}
        aria-controls="assist"
        onClick={() => (open ? setOpen(false) : openAssist())}
      >
        <Icon id="i-bot" />
      </button>
      <div className={`assist${open ? ' open' : ''}`} id="assist" role="dialog" aria-label="AI assistant">
        <div className="assist-h">
          <div className="av">
            <Icon id="i-bot" />
          </div>
          <div>
            <b>MotionexAI Assistant</b>
            <small>● Online · answers from approved content</small>
          </div>
          <button aria-label="Close assistant" className="assist-close" onClick={() => setOpen(false)}>
            <Icon id="i-x" style={{ width: 18, height: 18 }} />
          </button>
        </div>
        <div className="assist-b" id="assist-b" ref={bodyRef} data-lenis-prevent="">
          {msgs.map((m) =>
            m.typing ? (
              <div key={m.id} className="msg bot typing">
                <i></i>
                <i></i>
                <i></i>
              </div>
            ) : m.link ? (
              <div key={m.id} className="msg bot">
                <a
                  href="#contact"
                  style={{ color: 'var(--cyan)', fontWeight: 600 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(false);
                    scrollToTarget('#contact');
                  }}
                >
                  {m.text}
                </a>
              </div>
            ) : (
              <div key={m.id} className={`msg ${m.who}`}>
                {m.text}
              </div>
            ),
          )}
        </div>
        <div className="assist-q">
          {QUICK.map((b) => (
            <button key={b.q} data-q={b.q} onClick={() => ask(b.label, b.q)}>
              {b.label}
            </button>
          ))}
        </div>
        <form
          className="assist-f"
          id="assist-f"
          onSubmit={(e) => {
            e.preventDefault();
            const v = value.trim();
            if (!v) return;
            setValue('');
            ask(v, classify(v));
          }}
        >
          <label className="sr-only" htmlFor="aq">
            Message
          </label>
          <input
            id="aq"
            ref={inputRef}
            placeholder="Ask about your industry…"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button aria-label="Send">
            <Icon id="i-send" />
          </button>
        </form>
        <div className="assist-note">Preview assistant. Escalates to a human for project specifics.</div>
      </div>
    </>
  );
}
