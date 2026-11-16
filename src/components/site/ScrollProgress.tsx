import { useEffect, useRef } from "react";

// Thin shimmering bar along the top edge that fills as you scroll.
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div ref={bar} className="bg-iris pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left" style={{ transform: "scaleX(0)" }} aria-hidden />;
}
