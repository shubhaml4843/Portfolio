import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { palette } from '../theme';

// Agent-graph backdrop: nodes stand in for agents, edges light up as a
// message pulses from one to the next. Drawn on a single canvas so the
// node count stays cheap no matter how many edges are live.
const NODE_COUNT = 24;
const LINK_DIST = 300;
const MAX_PULSES = 14;

const BackgroundEffects = () => {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes = [];
    let pulses = [];
    let raf = null;
    let running = true;

    const rand = (min, max) => min + Math.random() * (max - min);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: reduced ? 0 : rand(-0.16, 0.16),
        vy: reduced ? 0 : rand(-0.16, 0.16),
        r: i % 5 === 0 ? rand(4.8, 6.2) : rand(2.4, 3.4),
        // a few nodes read as "orchestrators" and glow warmer
        hub: i % 5 === 0,
        phase: rand(0, Math.PI * 2),
      }));
      pulses = [];
    };

    const neighbours = (i) => {
      const out = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) out.push(j);
      }
      return out;
    };

    const spawnPulse = () => {
      if (pulses.length >= MAX_PULSES) return;
      const from = Math.floor(rand(0, nodes.length));
      const options = neighbours(from);
      if (!options.length) return;
      const to = options[Math.floor(rand(0, options.length))];
      pulses.push({ from, to, t: 0, speed: rand(0.006, 0.013) });
    };

    let sinceSpawn = 0;

    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -40) n.x = w + 40;
        if (n.x > w + 40) n.x = -40;
        if (n.y < -40) n.y = h + 40;
        if (n.y > h + 40) n.y = -40;
      }

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const d = Math.sqrt(d2);
          const fade = 1 - d / LINK_DIST;

          // edges near the cursor brighten, so the graph feels alive
          const mx = (a.x + b.x) / 2 - pointer.current.x;
          const my = (a.y + b.y) / 2 - pointer.current.y;
          const near = Math.max(0, 1 - Math.sqrt(mx * mx + my * my) / 320);

          ctx.strokeStyle = `rgba(34, 211, 238, ${(fade * 0.30 + near * 0.45).toFixed(3)})`;
          ctx.lineWidth = 1.15;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // message pulses riding the edges
      if (!reduced) {
        sinceSpawn += dt;
        if (sinceSpawn > 300) {
          sinceSpawn = 0;
          spawnPulse();
        }
        pulses = pulses.filter((p) => p.t <= 1);
        for (const p of pulses) {
          const a = nodes[p.from];
          const b = nodes[p.to];
          if (!a || !b) continue;
          p.t += p.speed;
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          const alpha = Math.sin(Math.min(p.t, 1) * Math.PI);

          ctx.strokeStyle = `rgba(139, 92, 246, ${(alpha * 0.62).toFixed(3)})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(x, y);
          ctx.stroke();

          const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
          g.addColorStop(0, `rgba(167, 139, 250, ${alpha.toFixed(3)})`);
          g.addColorStop(1, 'rgba(167, 139, 250, 0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // nodes
      const now = performance.now() / 1000;
      for (const n of nodes) {
        const breathe = reduced ? 1 : 0.75 + Math.sin(now * 1.1 + n.phase) * 0.25;
        const r = n.r * breathe;
        const colour = n.hub ? '52, 211, 153' : '34, 211, 238';

        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        glow.addColorStop(0, `rgba(${colour}, 0.42)`);
        glow.addColorStop(1, `rgba(${colour}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${colour}, 0.95)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        // orchestrator agents carry a ring so the hierarchy is legible
        if (n.hub) {
          ctx.strokeStyle = `rgba(${colour}, 0.5)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    let last = performance.now();
    const loop = (now) => {
      if (!running) return;
      const dt = now - last;
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 };
    };
    // no point burning frames on a hidden tab
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    const onResize = () => {
      resize();
      seed();
    };

    resize();
    seed();
    raf = requestAnimationFrame(loop);

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: palette.bgDeep,
      }}
    >
      {/* depth wash so the graph never sits on flat black */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(900px circle at 12% 8%, rgba(139, 92, 246, 0.16), transparent 60%),
            radial-gradient(1000px circle at 88% 22%, rgba(34, 211, 238, 0.13), transparent 62%),
            radial-gradient(800px circle at 50% 100%, rgba(52, 211, 153, 0.09), transparent 60%)
          `,
        }}
      />

      <Box
        component="canvas"
        ref={canvasRef}
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* grain kills gradient banding on wide dark panels */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </Box>
  );
};

export default BackgroundEffects;
