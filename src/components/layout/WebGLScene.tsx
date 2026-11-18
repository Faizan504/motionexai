'use client';

import { useEffect } from 'react';
import { prefersReducedMotion, scene as S } from '@/lib/motion';

/**
 * Morphing particle field behind the page (Three.js), driven by the shared scene state.
 * Shapes: 0 neural sphere → 1 torus knot → 2 spiral galaxy → 3 wave grid → 4 sphere.
 * Loaded lazily; if WebGL is unavailable the CSS gradient orbs remain as a fallback.
 */
export default function WebGLScene() {
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (disposed) return;
      const canvas = document.getElementById('webgl') as HTMLCanvasElement | null;
      if (!canvas) return;
      const reduce = prefersReducedMotion();

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
      } catch {
        canvas.remove();
        return;
      }

      const isMobile = window.matchMedia('(max-width: 700px)').matches;
      const DPR = Math.min(devicePixelRatio, isMobile ? 1.5 : 1.75);
      renderer.setPixelRatio(DPR);
      renderer.setSize(innerWidth, innerHeight, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
      camera.position.set(0, 0, 7);

      const N = isMobile ? 4500 : 9000;
      const rand = (a: number, b: number) => a + Math.random() * (b - a);

      /* ---------- Shape generators ---------- */
      function sphere() {
        const a = new Float32Array(N * 3);
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < N; i++) {
          if (i % 10 < 7) {
            const y = 1 - (i / (N - 1)) * 2,
              rad = Math.sqrt(1 - y * y),
              th = golden * i;
            const r = 1.9 + rand(-0.03, 0.03);
            a.set([Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r], i * 3);
          } else {
            const u = Math.random(),
              v = Math.random(),
              th = 2 * Math.PI * u,
              ph = Math.acos(2 * v - 1),
              rr = Math.cbrt(Math.random()) * 1.45;
            a.set([rr * Math.sin(ph) * Math.cos(th), rr * Math.cos(ph), rr * Math.sin(ph) * Math.sin(th)], i * 3);
          }
        }
        return a;
      }
      function torusKnot() {
        const a = new Float32Array(N * 3),
          p = 2,
          q = 3;
        for (let i = 0; i < N; i++) {
          const u = (i / N) * Math.PI * 2;
          const r = 1.25 + 0.55 * Math.cos(q * u);
          const cx = r * Math.cos(p * u),
            cy = r * Math.sin(p * u),
            cz = 0.55 * Math.sin(q * u);
          const j = 0.22,
            ang = Math.random() * Math.PI * 2,
            rr = Math.sqrt(Math.random()) * j;
          a.set([cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, cz + rand(-j, j)], i * 3);
        }
        return a;
      }
      function galaxy() {
        const a = new Float32Array(N * 3),
          arms = 4;
        const sgn = () => (Math.random() < 0.5 ? 1 : -1);
        for (let i = 0; i < N; i++) {
          const r = Math.pow(Math.random(), 1.4) * 3.4;
          const arm = ((i % arms) / arms) * Math.PI * 2;
          const spin = r * 1.25;
          const sc = Math.pow(Math.random(), 3) * sgn() * 0.45 * (1 + r * 0.2);
          const sc2 = Math.pow(Math.random(), 3) * sgn() * 0.45;
          const sc3 = Math.pow(Math.random(), 3) * sgn() * 0.45 * (1 + r * 0.2);
          a.set([Math.cos(arm + spin) * r + sc, sc2 * 0.6, Math.sin(arm + spin) * r + sc3], i * 3);
        }
        return a;
      }
      function waveGrid() {
        const a = new Float32Array(N * 3),
          cols = Math.round(Math.sqrt(N * 1.8)),
          rows = Math.ceil(N / cols);
        for (let i = 0; i < N; i++) {
          const cx = i % cols,
            cy = Math.floor(i / cols);
          const x = (cx / (cols - 1) - 0.5) * 11,
            z = (cy / (rows - 1) - 0.5) * 6.5;
          const y = Math.sin(x * 0.7) * 0.35 + Math.cos(z * 1.1) * 0.3;
          a.set([x, y - 1.2, z], i * 3);
        }
        return a;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(sphere(), 3));
      geo.setAttribute('aS1', new THREE.BufferAttribute(torusKnot(), 3));
      geo.setAttribute('aS2', new THREE.BufferAttribute(galaxy(), 3));
      geo.setAttribute('aS3', new THREE.BufferAttribute(waveGrid(), 3));
      const rnd = new Float32Array(N);
      for (let i = 0; i < N; i++) rnd[i] = Math.random();
      geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uMorph: { value: 0 },
          uSize: { value: isMobile ? 22 : 26 },
          uPixel: { value: DPR },
          uOpacity: { value: 1 },
          uC1: { value: new THREE.Color('#4f8cff') },
          uC2: { value: new THREE.Color('#8b5cf6') },
          uC3: { value: new THREE.Color('#2ee6f6') },
        },
        vertexShader: /* glsl */ `
          uniform float uTime, uMorph, uSize, uPixel;
          uniform vec3 uC1, uC2, uC3;
          attribute vec3 aS1, aS2, aS3; attribute float aRand;
          varying vec3 vColor; varying float vA;
          float st(float m, float k){ return smoothstep(0., 1., clamp(m - k + (aRand - .5) * .35, 0., 1.)); }
          void main(){
            float m = uMorph;
            vec3 p = position;
            p = mix(p, aS1, st(m, 0.));
            p = mix(p, aS2, st(m, 1.));
            p = mix(p, aS3, st(m, 2.));
            p = mix(p, position, st(m, 3.));
            float w = st(m, 2.) * (1. - st(m, 3.));
            p.y += w * (sin(p.x * 1.2 + uTime * 1.2) * .18 + cos(p.z * 1.5 + uTime) * .12);
            p += .045 * vec3(sin(uTime * .7 + aRand * 40.), cos(uTime * .6 + aRand * 30.), sin(uTime * .5 + aRand * 20.));
            vec4 mv = modelViewMatrix * vec4(p, 1.);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * uPixel * (.35 + aRand * .9) / -mv.z;
            float h = clamp(p.y * .35 + .5, 0., 1.);
            vColor = mix(uC1, uC2, h);
            vColor = mix(vColor, uC3, step(.9, aRand));
            vA = .55 + .45 * sin(uTime * 2. + aRand * 60.);
          }`,
        fragmentShader: /* glsl */ `
          uniform float uOpacity;
          varying vec3 vColor; varying float vA;
          void main(){
            float d = length(gl_PointCoord - .5);
            float a = smoothstep(.5, 0., d);
            a = pow(a, 1.6);
            gl_FragColor = vec4(vColor * 1.25, a * vA * uOpacity);
          }`,
      });
      const points = new THREE.Points(geo, mat);
      const group = new THREE.Group();
      group.add(points);

      /* Glowing wireframe core (visible in hero) */
      const coreMat = new THREE.LineBasicMaterial({ color: 0x6aa0ff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending });
      const core = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.05, 1)), coreMat);
      group.add(core);

      /* Orbit rings */
      const rings: { line: InstanceType<typeof THREE.LineLoop>; mat: InstanceType<typeof THREE.LineBasicMaterial> }[] = [];
      (
        [
          [2.5, 0.8, 0x4f8cff],
          [2.8, -0.5, 0x8b5cf6],
          [3.1, 0.25, 0x2ee6f6],
        ] as const
      ).forEach(([r, tilt, c]) => {
        const g = new THREE.BufferGeometry().setFromPoints(
          new THREE.EllipseCurve(0, 0, r, r).getPoints(160).map((p) => new THREE.Vector3(p.x, p.y, 0)),
        );
        const m = new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending });
        const l = new THREE.LineLoop(g, m);
        l.rotation.x = Math.PI / 2 + tilt;
        l.rotation.y = tilt * 0.6;
        rings.push({ line: l, mat: m });
        group.add(l);
      });
      scene.add(group);

      const resize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight, false);
      };
      window.addEventListener('resize', resize);

      const clock = new THREE.Clock();
      let mx = 0,
        my = 0,
        morph = 0,
        shift = 1,
        dim = 1,
        running = true,
        raf = 0;

      const tick = () => {
        if (!running) return;
        const dt = Math.min(clock.getDelta(), 0.05),
          t = clock.elapsedTime;
        morph += (S.morph - morph) * 0.06;
        shift += (S.shift - shift) * 0.05;
        dim += (S.dim - dim) * 0.05;
        mx += (S.mouseX - mx) * 0.05;
        my += (S.mouseY - my) * 0.05;

        mat.uniforms.uTime.value = reduce ? 0 : t;
        mat.uniforms.uMorph.value = morph;
        const desktop = innerWidth > 1100;
        const heroBoost = Math.max(0, 1 - morph * 1.6);
        mat.uniforms.uOpacity.value = (desktop ? 0.55 + 0.45 * heroBoost : 0.45 + 0.2 * heroBoost) * dim;

        group.position.x = desktop ? shift * 2.35 : 0;
        group.position.y = desktop ? 0 : shift * 0.6;
        group.scale.setScalar(desktop ? 1 : 0.78);

        const spin = reduce ? 0 : dt;
        points.rotation.y += spin * (0.08 + (morph > 1.5 && morph < 2.6 ? 0.1 : 0));
        group.rotation.x =
          my * 0.25 + (morph > 2.4 ? 0.35 * Math.min(1, morph - 2.4) : 0) * (morph < 3.6 ? 1 : Math.max(0, 4 - morph) * 2.5);
        group.rotation.y = mx * 0.35;
        points.rotation.z = Math.sin(t * 0.1) * 0.1;

        core.rotation.x += spin * 0.25;
        core.rotation.y += spin * 0.35;
        coreMat.opacity = 0.35 * Math.max(0, 1 - morph * 2) + 0.35 * Math.max(0, morph - 3.5) * 2;
        core.scale.setScalar(1 + Math.sin(t * 1.5) * 0.03);
        rings.forEach((r, i) => {
          r.line.rotation.z += spin * (0.1 + i * 0.05);
          r.mat.opacity = 0.2 * Math.max(0, 1 - morph * 1.5) + 0.2 * Math.max(0, morph - 3.5) * 2;
        });

        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };

      const onVis = () => {
        running = !document.hidden;
        if (running) {
          clock.getDelta();
          tick();
        } else cancelAnimationFrame(raf);
      };
      document.addEventListener('visibilitychange', onVis);
      tick();

      cleanup = () => {
        running = false;
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVis);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return null;
}
