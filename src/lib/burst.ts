// Pops a tiny ring of sparkles and hearts at a screen point. Pure DOM so it never re-renders React.
const BITS = ["✦", "♡", "✧", "✦", "♡", "·"];

export function spawnBurst(x: number, y: number, count = 8) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 28 + Math.random() * 30;
    s.className = "burst-bit";
    s.textContent = BITS[i % BITS.length] ?? "✦";
    s.setAttribute("aria-hidden", "true");
    s.style.cssText = `left:${x}px;top:${y}px;font-size:${9 + Math.random() * 8}px;--bx:${Math.cos(angle) * dist}px;--by:${Math.sin(angle) * dist}px`;
    document.body.appendChild(s);
    window.setTimeout(() => s.remove(), 800);
  }
}
