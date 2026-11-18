'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { EVENTS, emit, prefersReducedMotion, scene, setLenis } from '@/lib/motion';

const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => Array.from(c.querySelectorAll<T>(s));

/**
 * Port of the prototype's motion script: preloader, Lenis smooth scrolling, cursor glow,
 * card tilt, hero intro, counters and all GSAP ScrollTrigger animations.
 * Renders nothing; runs once after the page has mounted.
 */
export default function MotionController() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = prefersReducedMotion();
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window, ev: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(ev, fn, opts);
      cleanups.push(() => t.removeEventListener(ev, fn));
    };

    /* ---------- Counters ---------- */
    const runCounters = (scope: ParentNode | null) => {
      if (!scope) return;
      $$<HTMLElement>('[data-count]', scope).forEach((el) => {
        if (el.dataset.done) return;
        el.dataset.done = '1';
        const end = +(el.dataset.count || 0);
        if (reduce) {
          el.textContent = String(end);
          return;
        }
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => {
            el.textContent = String(Math.round(o.v));
          },
        });
      });
    };
    const ringFill = () => {
      const r = $<SVGCircleElement>('.ring-p');
      if (r) {
        r.style.transition = 'stroke-dashoffset 2s cubic-bezier(.22,1,.36,1)';
        r.style.strokeDashoffset = String(94.2 * (1 - 0.72));
      }
    };

    /* ---------- Hero intro ---------- */
    const heroIntro = () => {
      if (reduce) {
        $$<HTMLElement>('[data-hero], .hero h1 .w, .float-card').forEach((el) => (el.style.opacity = '1'));
        runCounters($('.hero-trust'));
        ringFill();
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.hero h1 .w', { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.08 })
        .from('[data-hero]', { y: 30, opacity: 0, duration: 1.1, stagger: 0.1 }, '-=1.1')
        .from('.float-card', { y: 60, opacity: 0, scale: 0.9, duration: 1.3, stagger: 0.14 }, '-=1.1')
        .from('.header', { y: -30, opacity: 0, duration: 1, clearProps: 'transform,opacity' }, 0)
        .add(() => {
          runCounters($('.hero-trust'));
          ringFill();
        }, '-=.8');
    };

    /* ---------- Preloader ---------- */
    const loader = $('.loader');
    const lp = $('.lp');
    const lb = $('.loader-bar i');
    let pct = 0;
    const tick = setInterval(
      () => {
        pct = Math.min(100, pct + Math.random() * 22 + 8);
        if (lp) lp.textContent = String(Math.floor(pct));
        if (lb) lb.style.width = pct + '%';
        if (pct >= 100) {
          clearInterval(tick);
          setTimeout(() => {
            loader?.classList.add('done');
            heroIntro();
          }, 180);
        }
      },
      reduce ? 10 : 90,
    );
    cleanups.push(() => clearInterval(tick));

    /* ---------- Smooth scroll (Lenis) ---------- */
    let lenis: Lenis | null = null;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
      cleanups.push(() => {
        gsap.ticker.remove(raf);
        lenis?.destroy();
        setLenis(null);
      });
    }

    /* ---------- In-page anchor links (delegated, so dynamic content works too) ---------- */
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.closest('[data-industry]')) return;
      const id = a.getAttribute('href') || '';
      if (id.length < 2) return;
      const t = document.querySelector<HTMLElement>(id);
      if (!t) return;
      e.preventDefault();
      emit(EVENTS.closeOverlays);
      if (lenis) lenis.scrollTo(t, { offset: -70 });
      else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    };
    document.addEventListener('click', onAnchor);
    cleanups.push(() => document.removeEventListener('click', onAnchor));

    /* ---------- Cursor glow + mouse for WebGL ---------- */
    const glow = $('.cursor-glow');
    const hover = window.matchMedia('(hover:hover)').matches;
    if (glow && hover && !reduce) {
      let gx = innerWidth / 2,
        gy = innerHeight / 2,
        cx = gx,
        cy = gy,
        raf = 0;
      on(window, 'mousemove', (e) => {
        gx = e.clientX;
        gy = e.clientY;
        glow.style.opacity = '1';
        scene.mouseX = (e.clientX / innerWidth) * 2 - 1;
        scene.mouseY = -((e.clientY / innerHeight) * 2 - 1);
      });
      const loop = () => {
        cx += (gx - cx) * 0.12;
        cy += (gy - cy) * 0.12;
        glow.style.transform = `translate(${cx}px,${cy}px)`;
        raf = requestAnimationFrame(loop);
      };
      loop();
      cleanups.push(() => cancelAnimationFrame(raf));
    }

    /* ---------- Tilt + spotlight cards ---------- */
    $$<HTMLElement>('.card').forEach((c) => {
      const move = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        c.style.setProperty('--mx', x + 'px');
        c.style.setProperty('--my', y + 'px');
        if (c.classList.contains('tilt') && !reduce && e.pointerType === 'mouse') {
          const rx = (y / r.height - 0.5) * -8;
          const ry = (x / r.width - 0.5) * 8;
          c.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
        }
      };
      const leave = () => (c.style.transform = '');
      c.addEventListener('pointermove', move);
      c.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        c.removeEventListener('pointermove', move);
        c.removeEventListener('pointerleave', leave);
      });
    });

    /* ============================================================
       SCROLL ANIMATIONS (GSAP)
       ============================================================ */
    const ctx = gsap.context(() => {
      // Section → WebGL morph / shift / dim
      $$<HTMLElement>('[data-morph]').forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (!self.isActive) return;
            gsap.to(scene, {
              morph: +(sec.dataset.morph || 0),
              shift: +(sec.dataset.shift || 0),
              dim: +(sec.dataset.dim || 1),
              duration: reduce ? 0 : 2.2,
              ease: 'power3.inOut',
              overwrite: 'auto',
            });
          },
        });
      });

      if (reduce) {
        $$('.step-i').forEach((s) => s.classList.add('on'));
        runCounters(document);
        return;
      }

      // Generic reveal
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, overwrite: true }),
      });

      // Hero parallax on scroll
      gsap.to('.hero-grid > div:first-child', {
        yPercent: 18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      $$<HTMLElement>('.float-card').forEach((c) =>
        gsap.to(c, {
          y: -140 * +(c.dataset.depth || 0),
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        }),
      );

      // Intro word-by-word reveal (scrubbed)
      const intro = $('[data-words]');
      if (intro) {
        gsap.to($$('.rw', intro), {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: intro, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        });
      }

      // Section headings: clip reveal
      $$('.sec-head h2').forEach((h) =>
        gsap.from(h, { yPercent: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } }),
      );

      // Bento cards: 3D entrance
      gsap.from('.bento .card', {
        rotateX: 18,
        y: 80,
        opacity: 0,
        transformOrigin: '50% 100%',
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.08,
        clearProps: 'transform',
        scrollTrigger: { trigger: '.bento', start: 'top 82%' },
      });

      // P1 / P2 industry cards
      gsap.from('.p1-grid .card', {
        y: 60,
        opacity: 0,
        rotateX: 14,
        transformPerspective: 1000,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: '.p1-grid', start: 'top 88%' },
      });
      gsap.from('.p2-row', { y: 50, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.p2-row', start: 'top 90%' } });

      // Flip cards cascade
      gsap.from('.flip', {
        y: 80,
        rotateY: -25,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.flip-grid', start: 'top 82%' },
      });

      // Products: pinned horizontal scroll (desktop)
      const mm = gsap.matchMedia();
      mm.add('(min-width: 701px)', () => {
        const track = $('.p-track');
        if (!track) return;
        const dist = () => Math.max(0, track.scrollWidth - innerWidth + 24);
        const bar = $('.p-progress .bar i');
        const tw = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.products',
            start: 'top top',
            end: () => '+=' + dist(),
            pin: '.products-pin',
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (s) => {
              if (bar) bar.style.transform = `scaleX(${s.progress})`;
            },
          },
        });
        $$('.p-card').forEach((c) =>
          gsap.from(c, {
            rotateY: -18,
            scale: 0.92,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left 100%', end: 'left 55%', scrub: true },
          }),
        );
      });

      // Draw chart lines
      $$<SVGPathElement>('.mock-chart path.draw').forEach((p) => {
        const L = p.getTotalLength();
        p.style.strokeDasharray = String(L);
        p.style.strokeDashoffset = String(L);
        gsap.to(p, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: '.products', start: 'top 60%' } });
      });

      // Industries panel entrance
      gsap.from('.ind-panel', { y: 60, opacity: 0, rotateX: 8, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.ind-wrap', start: 'top 80%' } });
      gsap.from('.ind-btn', { x: -30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: '.ind-wrap', start: 'top 80%' } });

      // Approach line draw + step activation
      const progLine = $<SVGLineElement>('.steps-line .prog');
      const baseLine = $<SVGLineElement>('.steps-line .base');
      if (progLine && baseLine) {
        mm.add('(min-width: 1101px)', () => {
          progLine.setAttribute('x1', '0');
          progLine.setAttribute('y1', '2');
          progLine.setAttribute('y2', '2');
          baseLine.setAttribute('x1', '0');
          baseLine.setAttribute('y1', '2');
          baseLine.setAttribute('x2', '100%');
          baseLine.setAttribute('y2', '2');
          gsap.set(progLine, { attr: { x2: '0%' } });
          gsap.to(progLine, { attr: { x2: '100%' }, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 45%', scrub: 0.8 } });
        });
        mm.add('(max-width: 1100px)', () => {
          progLine.setAttribute('x1', '2');
          progLine.setAttribute('x2', '2');
          progLine.setAttribute('y1', '0');
          gsap.set(progLine, { attr: { y2: '0%' } });
          baseLine.setAttribute('x2', '2');
          baseLine.setAttribute('y2', '100%');
          baseLine.setAttribute('x1', '2');
          baseLine.setAttribute('y1', '0');
          gsap.to(progLine, { attr: { y2: '100%' }, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 70%', end: 'bottom 50%', scrub: 0.8 } });
        });
      }
      $$('.step-i').forEach((s, i) => {
        gsap.from(s, { y: 50, opacity: 0, duration: 1, ease: 'expo.out', delay: i * 0.05, scrollTrigger: { trigger: '.steps', start: 'top 80%' } });
        ScrollTrigger.create({
          trigger: '.steps',
          start: () => `top+=${i * 18}% 72%`,
          onEnter: () => s.classList.add('on'),
          onLeaveBack: () => s.classList.remove('on'),
        });
      });

      // Stats counters
      ScrollTrigger.create({ trigger: '.stats', start: 'top 85%', once: true, onEnter: () => runCounters($('.stats')) });

      // Engagement cards: lift in 3D
      gsap.from('.eng-card', {
        y: 100,
        rotateX: 20,
        opacity: 0,
        transformPerspective: 1200,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.eng', start: 'top 82%' },
      });

      // CTA box zoom-in
      gsap.from('.cta-box', { scale: 0.9, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '#contact', start: 'top 80%' } });

      // Giant footer word parallax
      gsap.from('.f-big', { yPercent: 40, opacity: 0, ease: 'none', scrollTrigger: { trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

      // Marquee skew reacts to scroll velocity
      const skewTo = gsap.quickTo('.marquee-track', 'skewX', { duration: 0.4, ease: 'power3' });
      ScrollTrigger.create({ onUpdate: (self) => skewTo(gsap.utils.clamp(-8, 8, self.getVelocity() / -300)) });
    });
    cleanups.push(() => ctx.revert());

    // Float cards: mouse parallax
    if (!reduce && hover) {
      const cards = $$<HTMLElement>('.float-card');
      on(window, 'mousemove', (e) => {
        const x = e.clientX / innerWidth - 0.5;
        const y = e.clientY / innerHeight - 0.5;
        cards.forEach((c) => {
          const d = +(c.dataset.depth || 0);
          gsap.to(c, { xPercent: x * 14 * d, rotateY: x * 10 * d, rotateX: -y * 10 * d, duration: 1.2, ease: 'power3.out', overwrite: 'auto' });
        });
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    on(window, 'load', refresh);
    document.fonts?.ready.then(refresh);

    return () => cleanups.reverse().forEach((fn) => fn());
  }, []);

  return null;
}
