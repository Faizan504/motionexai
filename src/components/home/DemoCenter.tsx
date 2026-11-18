'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Icon from '@/components/ui/Icon';
import { useTabs } from '@/components/ui/useTabs';
import { DEMOS } from '@/content/demos';
import type { Demo } from '@/content/types';
import { EVENTS, prefersReducedMotion, scrollToTarget } from '@/lib/motion';

type LogEntry = { id: string; kind: string; ts: string; tag: string; text: string };

function LogLine({ entry }: { entry: LogEntry }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => ref.current?.classList.add('show'));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div ref={ref} className={`log ${entry.kind}`}>
      <span className="t">{entry.ts}</span>
      <span className="tag">[{entry.tag}]</span> {entry.text}
    </div>
  );
}

/** 6. Interactive demonstrations — animated agent workflow + console log, on synthetic data */
export default function DemoCenter() {
  const [mode, setMode] = useState(0);
  const [run, setRun] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const flowRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const packetRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const startedRef = useRef(false);
  const visibleRef = useRef(false);
  const d: Demo = DEMOS[mode];

  const select = useCallback((i: number) => {
    setMode(i);
    if (startedRef.current) setRun((r) => r + 1);
  }, []);
  const { listRef, onKeyDown } = useTabs(mode, DEMOS.length, select);

  // Run the workflow animation + console log
  useEffect(() => {
    if (run === 0) return;
    const flow = flowRef.current!;
    const wrapEl = nodesRef.current!;
    const svg = svgRef.current!;
    const packet = packetRef.current!;
    const nodes = Array.from(wrapEl.querySelectorAll<HTMLElement>('.fnode'));
    const reduce = prefersReducedMotion();

    // Connector paths between nodes
    const wrap = wrapEl.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${wrap.width} ${wrap.height}`);
    let html = '';
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i].getBoundingClientRect();
      const b = nodes[i + 1].getBoundingClientRect();
      const ax = a.left - wrap.left + a.width / 2;
      const ay = a.top - wrap.top + a.height / 2;
      const bx = b.left - wrap.left + b.width / 2;
      const by = b.top - wrap.top + b.height / 2;
      const midY = (ay + by) / 2;
      const p = Math.abs(ay - by) < 5 ? `M${ax} ${ay} L${bx} ${by}` : `M${ax} ${ay} C ${ax} ${midY + 40}, ${bx} ${midY - 40}, ${bx} ${by}`;
      html += `<path d="${p}" data-i="${i}"/>`;
    }
    svg.innerHTML = html;

    // Console log lines
    setLogs([]);
    const start = Date.now();
    const timers = d.log.map((l, i) =>
      setTimeout(
        () =>
          setLogs((cur) => [
            ...cur,
            { id: `${run}-${i}`, kind: l.kind, tag: l.tag, text: l.text, ts: new Date(start + i * 900).toTimeString().slice(0, 8) },
          ]),
        reduce ? 0 : i * 900,
      ),
    );

    // Packet travelling through the nodes
    tlRef.current?.kill();
    nodes.forEach((n) => n.classList.remove('active'));
    if (reduce) {
      nodes.forEach((n) => n.classList.add('active'));
    } else {
      const centerOf = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        const f = flow.getBoundingClientRect();
        return { x: r.left - f.left + r.width / 2, y: r.top - f.top + r.height / 2 };
      };
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      nodes.forEach((n, k) => {
        const c = centerOf(n);
        if (k === 0) tl.set(packet, { x: c.x, y: c.y, opacity: 1 });
        else tl.to(packet, { x: c.x, y: c.y, duration: 0.75, ease: 'power2.inOut' });
        tl.add(() => {
          n.classList.add('active');
          svg.querySelector(`path[data-i="${k - 1}"]`)?.classList.add('lit');
        });
        tl.to({}, { duration: 0.35 });
      });
      tl.to(packet, { opacity: 0, duration: 0.3 }).add(() => {
        nodes.forEach((n) => n.classList.remove('active'));
        svg.querySelectorAll('path').forEach((p) => p.classList.remove('lit'));
      });
      if (!visibleRef.current) tl.pause();
      tlRef.current = tl;
    }

    return () => timers.forEach(clearTimeout);
  }, [run, d]);

  // Start when visible; pause when off-screen
  useEffect(() => {
    const flow = flowRef.current!;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          visibleRef.current = e.isIntersecting;
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            setRun((r) => r + 1);
          }
          if (tlRef.current) (e.isIntersecting ? tlRef.current.play() : tlRef.current.pause());
        }),
      { threshold: 0.25 },
    );
    io.observe(flow);
    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(() => startedRef.current && setRun((r) => r + 1), 250);
    };
    window.addEventListener('resize', onResize);
    return () => {
      io.disconnect();
      window.removeEventListener('resize', onResize);
      tlRef.current?.kill();
    };
  }, []);

  // "Run this demo" from the industry explorer
  useEffect(() => {
    const onRun = (e: Event) => {
      const key = (e as CustomEvent<string>).detail;
      const i = DEMOS.findIndex((x) => x.key === key);
      if (i >= 0) {
        startedRef.current = true;
        setMode(i);
        setRun((r) => r + 1);
      }
      scrollToTarget('#demos');
    };
    window.addEventListener(EVENTS.runDemo, onRun);
    return () => window.removeEventListener(EVENTS.runDemo, onRun);
  }, []);

  return (
    <section id="demos" data-morph="2.4" data-shift="0" aria-labelledby="dm-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Interactive demonstrations</span>
          <h2 id="dm-title">
            Watch industry AI <span className="grad-text">work, step by step</span>
          </h2>
          <p>Pick an industry to run its workflow. Every demonstration uses synthetic data and ends with a human review step.</p>
        </div>

        <div className="tabs" role="tablist" aria-label="Demonstration" id="demo-tabs" ref={listRef}>
          <span className="tab-ind" aria-hidden="true"></span>
          {DEMOS.map((x, i) => (
            <button
              key={x.key}
              className="tab"
              role="tab"
              aria-selected={i === mode}
              tabIndex={i === mode ? 0 : -1}
              data-mode={x.key}
              onClick={() => select(i)}
              onKeyDown={onKeyDown(i)}
            >
              {x.tab}
            </button>
          ))}
        </div>

        <div className="agent-wrap">
          <div className="flow glass" aria-live="polite" ref={flowRef}>
            <div className="flow-title">
              <span id="flow-name">{d.name}</span>
              <span className="live">RUNNING</span>
            </div>
            <div className="flow-nodes" ref={nodesRef}>
              <svg className="flow-svg" aria-hidden="true" ref={svgRef}></svg>
              {d.nodes.map((n, i) => (
                <div className="fnode" data-n={i} key={`${d.key}-${i}`}>
                  <span className="step">0{i + 1}</span>
                  <div className="fi">
                    <Icon id={n.icon} />
                  </div>
                  <b>{n.title}</b>
                  <small>{n.sub}</small>
                </div>
              ))}
            </div>
            <div className="packet" aria-hidden="true" ref={packetRef}></div>
            <p className="demo-note">
              <Icon id="i-sparkle" />
              <span id="demo-desc">{d.desc}</span>
            </p>
          </div>

          <div className="console glass">
            <div className="console-head">
              <i></i>
              <i></i>
              <i></i>
              <span id="console-name">{d.file}</span>
              <span className="demo-badge">Demonstration concept · synthetic data</span>
            </div>
            <div className="console-body" id="console">
              {logs.map((l) => (
                <LogLine key={l.id} entry={l} />
              ))}
            </div>
          </div>
        </div>

        <div className="agent-compare">
          <div className="glass" data-reveal="">
            <h4>
              <Icon id="i-user-check" style={{ width: 18, height: 18, color: 'var(--cyan)' }} />
              Human review
            </h4>
            <p>Critical outputs go to a person for approval: BIM managers, recruiters, finance or claims teams.</p>
          </div>
          <div className="glass" data-reveal="">
            <h4>
              <Icon id="i-book" style={{ width: 18, height: 18, color: 'var(--cyan)' }} />
              Source references
            </h4>
            <p>Document answers cite the clause, page or record they came from, so results can be checked.</p>
          </div>
          <div className="glass" data-reveal="">
            <h4>
              <Icon id="i-lock" style={{ width: 18, height: 18, color: 'var(--cyan)' }} />
              Synthetic data only
            </h4>
            <p>Demos run on fictional records, with usage limits and monitoring. No customer data.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
