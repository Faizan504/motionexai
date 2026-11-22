'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { INDUSTRIES, byPriority, industryUrl } from '@/content/industries';
import { SERVICES } from '@/content/site';
import { EVENTS, getLenis, scene } from '@/lib/motion';

type MegaId = 'mega-ind' | 'mega-services' | null;

const MEGA_IND_SUBS: Record<string, string> = {
  'construction-aec': 'BIM automation & engineering AI',
  'recruitment-hr': 'AI hiring agents & HR automation',
  'real-estate': 'Property AI assistants & CRM',
  'finance-fintech': 'Secure financial automation',
  'retail-ecommerce': 'AI customer & sales agents',
  'logistics-supply-chain': 'Forecasting & operations AI',
  healthcare: 'Administrative AI & scheduling',
  'education-edtech': 'Learning assistants & LMS',
};

/** Menu labels in the mega menu use the full industry name for priority sectors. */
const megaLabel = (slug: string, fallback: string) =>
  ({
    'construction-aec': 'Construction, Engineering & AEC',
    'recruitment-hr': 'Recruitment & HR',
    'real-estate': 'Real Estate',
    'logistics-supply-chain': 'Logistics & Supply Chain',
    healthcare: 'Healthcare',
    'legal-professional-services': 'Legal & Professional Services',
  })[slug] || fallback;

export default function Header() {
  const [open, setOpen] = useState<MegaId>(null);
  const [drawer, setDrawer] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const openRef = useRef<MegaId>(null);
  openRef.current = open;

  const closeDrawer = useCallback(() => setDrawer(false), []);

  // Body class + Lenis lock for the mobile drawer
  useEffect(() => {
    document.body.classList.toggle('nav-open', drawer);
    const l = getLenis();
    if (l) (drawer ? l.stop() : l.start());
  }, [drawer]);

  // Header: scrolled / hide-on-scroll / reading progress
  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const header = headerRef.current;
      const prog = progRef.current;
      if (!header || !prog) return;
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      header.classList.toggle('scrolled', y > 20);
      header.classList.toggle(
        'hide',
        y > lastY && y > 400 && !openRef.current && !document.body.classList.contains('nav-open'),
      );
      lastY = y;
      prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
      scene.scroll = h > 0 ? y / h : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Global close: Escape, outside click, anchor navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.has-mega')) setOpen(null);
    };
    const onClose = () => {
      setOpen(null);
      setDrawer(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    window.addEventListener(EVENTS.closeOverlays, onClose);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      window.removeEventListener(EVENTS.closeOverlays, onClose);
    };
  }, []);

  const hoverable = () => window.matchMedia('(hover:hover)').matches;
  const megaHandlers = (id: Exclude<MegaId, null>) => ({
    onMouseEnter: () => {
      if (!hoverable()) return;
      clearTimeout(closeTimer.current);
      setOpen(id);
    },
    onMouseLeave: () => {
      if (!hoverable()) return;
      closeTimer.current = setTimeout(() => setOpen((cur) => (cur === id ? null : cur)), 160);
    },
  });
  const toggle = (id: Exclude<MegaId, null>) => {
    clearTimeout(closeTimer.current);
    setOpen((cur) => (cur === id ? null : id));
  };

  const p0 = byPriority('P0');
  const p1 = byPriority('P1');
  const p2 = byPriority('P2');

  return (
    <>
      <div className="progress" ref={progRef} aria-hidden="true" />
      <header className="header" id="header" ref={headerRef}>
        <div className="container nav">
          <a href="/" className="logo" aria-label="MotionexAI home">
            <svg>
              <use href="#i-logo" />
            </svg>
            <span>
              Motionex
              <span className="grad-text" style={{ animation: 'none' }}>
                AI
              </span>
            </span>
          </a>

          <nav aria-label="Primary">
            <ul className="menu">
              <li className={`has-mega${open === 'mega-ind' ? ' open' : ''}`} {...megaHandlers('mega-ind')}>
                <button
                  className="menu-link"
                  aria-expanded={open === 'mega-ind'}
                  aria-controls="mega-ind"
                  onClick={() => toggle('mega-ind')}
                >
                  Industries <Icon id="i-chev" className="chev" />
                </button>
                <div className="mega" id="mega-ind">
                  <div className="mega-inner">
                    <div className="mega-panel">
                      <div className="mega-col">
                        <h4>Priority industries</h4>
                        {p0.map((d) => (
                          <a key={d.slug} href={industryUrl(d.slug)}>
                            <span className="mi">
                              <Icon id={d.icon} />
                            </span>
                            <span>
                              <b>{megaLabel(d.slug, d.short)}</b>
                              <small>{MEGA_IND_SUBS[d.slug]}</small>
                            </span>
                          </a>
                        ))}
                      </div>
                      <div className="mega-col">
                        <h4>Growth industries</h4>
                        {p1.map((d) => (
                          <a key={d.slug} href={industryUrl(d.slug)}>
                            <span className="mi">
                              <Icon id={d.icon} />
                            </span>
                            <span>
                              <b>{megaLabel(d.slug, d.short)}</b>
                              <small>{MEGA_IND_SUBS[d.slug]}</small>
                            </span>
                          </a>
                        ))}
                      </div>
                      <div className="mega-col">
                        <h4>More industries</h4>
                        <div className="mega-list" style={{ gridTemplateColumns: '1fr' }}>
                          {p2.map((d) => (
                            <a key={d.slug} href={industryUrl(d.slug)}>
                              <span className="mi">
                                <Icon id={d.icon} />
                              </span>
                              <span>
                                <b>{megaLabel(d.slug, d.short)}</b>
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="mega-feature">
                        <div>
                          <span className="eyebrow">Find your fit</span>
                          <h5>Explore AI solutions for your industry</h5>
                          <p>Challenges, AI solutions, demos and next steps for {INDUSTRIES.length} sectors.</p>
                        </div>
                        <a href="/industries/" className="btn btn-ghost btn-sm">
                          All industries <Icon id="i-arrow" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className={`has-mega${open === 'mega-services' ? ' open' : ''}`} {...megaHandlers('mega-services')}>
                <button
                  className="menu-link"
                  aria-expanded={open === 'mega-services'}
                  aria-controls="mega-services"
                  onClick={() => toggle('mega-services')}
                >
                  Solutions <Icon id="i-chev" className="chev" />
                </button>
                <div className="mega" id="mega-services">
                  <div className="mega-inner">
                    <div className="mega-panel">
                      {SERVICES.map((g) => (
                        <div className="mega-col" key={g.group}>
                          <h4>{g.group}</h4>
                          {g.items.map((s) => (
                            <a key={s.href} href={s.href}>
                              <span className="mi">
                                <Icon id={s.icon} />
                              </span>
                              <span>
                                <b>{s.label}</b>
                                <small>{s.sub}</small>
                              </span>
                            </a>
                          ))}
                        </div>
                      ))}
                      <div className="mega-feature">
                        <div>
                          <span className="eyebrow">Demo center</span>
                          <h5>See industry AI in action</h5>
                          <p>BIM issues, hiring workflows, property advice, invoices and more, all on synthetic data.</p>
                        </div>
                        <a href="/demos/" className="btn btn-ghost btn-sm">
                          Try demos <Icon id="i-arrow" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a className="menu-link" href="/demos/">
                  Demos
                </a>
              </li>
              <li>
                <a className="menu-link" href="/products/">
                  Products
                </a>
              </li>
              <li>
                <a className="menu-link" href="/insights/">
                  Insights
                </a>
              </li>
              <li>
                <a className="menu-link" href="/about/">
                  Company
                </a>
              </li>
            </ul>
          </nav>

          <div className="nav-cta">
            <a href="/industries/" className="btn btn-ghost btn-sm">
              Find Your Industry
            </a>
            <a href="/contact/" data-contact-link="" className="btn btn-primary btn-sm">
              Discuss Your Project <Icon id="i-arrow" />
            </a>
            <button
              className="burger"
              aria-label={drawer ? 'Close menu' : 'Open menu'}
              aria-expanded={drawer}
              aria-controls="drawer"
              onClick={() => setDrawer((o) => !o)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className="drawer" id="drawer" onClick={(e) => (e.target as HTMLElement).closest('a') && closeDrawer()}>
        <details>
          <summary>
            Industries <Icon id="i-chev" className="chev" />
          </summary>
          <div>
            {INDUSTRIES.map((d) => (
              <a key={d.slug} href={industryUrl(d.slug)}>
                {megaLabel(d.slug, d.name)}
              </a>
            ))}
          </div>
        </details>
        <details>
          <summary>
            Solutions <Icon id="i-chev" className="chev" />
          </summary>
          <div>
            {SERVICES.flatMap((g) => g.items)
              .filter((s) => s.label !== 'Web & Mobile' && s.label !== 'Security & Governance' && s.label !== 'Data & Analytics')
              .map((s) => (
                <a key={s.href} href={s.href}>
                  {s.label}
                </a>
              ))}
          </div>
        </details>
        <a href="/demos/">Demos</a>
        <a href="/products/">Products</a>
        <a href="/insights/">Insights</a>
        <a href="/about/">Company</a>
        <a href="/contact/" data-contact-link="" className="btn btn-primary">
          Discuss Your Project <Icon id="i-arrow" />
        </a>
      </div>
    </>
  );
}
