import { useEffect, useRef } from "react";

import { spawnBurst } from "@/lib/burst";

// A soft glow that follows the mouse and leaves a trail of tiny four-point sparkles (like the logo's).
export function CursorSparkles() {
  const glow = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  // Every click/tap pops a tiny ring of sparkles and hearts.
  useEffect(() => {
    const onDown = (e: PointerEvent) => spawnBurst(e.clientX, e.clientY, 6);
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    let x = -400, y = -400, gx = x, gy = y, last = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const now = performance.now();
      if (now - last < 70 || !layer.current) return;
      last = now;
      const s = document.createElement("span");
      s.className = "cursor-sparkle";
      s.textContent = "✦";
      const size = 8 + Math.random() * 8;
      s.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;--dx:${(Math.random() - 0.5) * 40}px;--dy:${12 + Math.random() * 26}px`;
      layer.current.appendChild(s);
      window.setTimeout(() => s.remove(), 900);
    };
    const tick = () => {
      gx += (x - gx) * 0.14;
      gy += (y - gy) * 0.14;
      if (glow.current) glow.current.style.transform = `translate3d(${gx - 160}px, ${gy - 160}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      <div ref={glow} className="cursor-glow" />
      <div ref={layer} />
    </div>
  );
}
