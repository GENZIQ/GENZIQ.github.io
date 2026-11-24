import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouterState } from "@tanstack/react-router";

import { spawnBurst } from "@/lib/burst";
import {
  BOOP_LINES,
  CATCH_LINES,
  reactionForPath,
  scrollMilestone,
  type ScrollMilestone,
  type ZiqAnim,
  type ZiqMood,
} from "@/lib/ziq";

// Ziq: a tiny glossy orb buddy in the corner. It greets every page, reacts to scrolling,
// dozes off when left alone, and releases sparkles you can catch. Purely decorative.
type Floater = { id: number; x: number; delay: number };
const SLEEP_AFTER_MS = 25000;

export function ZiqBuddy() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const root = useRef<HTMLButtonElement>(null);
  const eyes = useRef<SVGGElement>(null);
  const [mood, setMood] = useState<ZiqMood>("idle");
  const [anim, setAnim] = useState<{ name: ZiqAnim; key: number }>({ name: "none", key: 0 });
  const [line, setLine] = useState<{ text: string; key: number } | null>(null);
  const [blink, setBlink] = useState(false);
  const [floaters, setFloaters] = useState<Floater[]>([]);

  const timers = useRef({ mood: 0, line: 0, sleep: 0 });
  const boopCount = useRef(0);
  const taps = useRef<number[]>([]);
  const caught = useRef(0);
  const floaterId = useRef(0);
  const sleeping = useRef(false);
  const lookUntil = useRef(0);

  const say = useCallback((text: string, ms = 3200) => {
    window.clearTimeout(timers.current.line);
    setLine({ text, key: Date.now() });
    timers.current.line = window.setTimeout(() => setLine(null), ms);
  }, []);

  const react = useCallback(
    (nextMood: ZiqMood, nextAnim: ZiqAnim, text?: string, ms = 1800) => {
      window.clearTimeout(timers.current.mood);
      setMood(nextMood);
      setAnim((a) => ({ name: nextAnim, key: a.key + 1 }));
      if (text) say(text);
      if (nextMood !== "sleepy") {
        timers.current.mood = window.setTimeout(() => setMood("idle"), ms);
      }
    },
    [say],
  );

  // Doze off after a while with no activity; wake up surprised.
  const poke = useCallback(() => {
    window.clearTimeout(timers.current.sleep);
    if (sleeping.current) {
      sleeping.current = false;
      react("wow", "hop", "Oh! You're back ✦");
    }
    timers.current.sleep = window.setTimeout(() => {
      sleeping.current = true;
      react("sleepy", "none", "zzz… wake me with a wiggle", 0);
    }, SLEEP_AFTER_MS);
  }, [react]);

  // Page entrance: each page gets its own move, face and line.
  useEffect(() => {
    const r = reactionForPath(pathname);
    sleeping.current = false;
    react(r.mood, r.anim, r.line, 2200);
    poke();
  }, [pathname, react, poke]);

  // Eyes follow the pointer; any activity keeps Ziq awake.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      poke();
      const el = root.current;
      const g = eyes.current;
      if (!el || !g || performance.now() < lookUntil.current) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.max(1, Math.hypot(dx, dy));
      const k = Math.min(1, d / 260);
      g.style.transform = `translate(${((dx / d) * 4 * k).toFixed(2)}px, ${((dy / d) * 4 * k).toFixed(2)}px)`;
    };
    const onKey = () => poke();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [poke]);

  // Scroll reactions: eyes follow the scroll, fast flicks make Ziq spin, milestones get a cheer.
  useEffect(() => {
    const seen = new Set<ScrollMilestone>();
    let lastY = window.scrollY;
    let lastT = performance.now();
    let maxY = lastY;
    let lastWhee = 0;
    const onScroll = () => {
      poke();
      const y = window.scrollY;
      const now = performance.now();
      const v = (y - lastY) / Math.max(16, now - lastT);
      lastY = y;
      lastT = now;
      maxY = Math.max(maxY, y);

      if (eyes.current) {
        eyes.current.style.transform = `translate(0px, ${v > 0 ? 4 : -4}px)`;
        lookUntil.current = now + 500;
      }

      const m = scrollMilestone(
        y,
        window.innerHeight,
        document.documentElement.scrollHeight,
        seen,
        maxY,
      );
      if (m) {
        seen.add(m);
        if (m === "half") react("star", "hop", "Halfway there ✧ keep going!");
        if (m === "end") react("love", "flip", "You made it to the end! ♡");
        if (m === "top") react("happy", "hop", "Back to the top ✦");
        return;
      }
      if (Math.abs(v) > 3 && now - lastWhee > 5000) {
        lastWhee = now;
        react("dizzy", "spin", v > 0 ? "Wheee, so fast! ✧" : "Zoom zoom ✦", 1400);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, poke, react]);

  // Random blinks.
  useEffect(() => {
    let t = 0;
    const loop = () => {
      t = window.setTimeout(
        () => {
          setBlink(true);
          window.setTimeout(() => setBlink(false), 150);
          loop();
        },
        2200 + Math.random() * 3200,
      );
    };
    loop();
    const ts = timers.current;
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(ts.mood);
      window.clearTimeout(ts.line);
      window.clearTimeout(ts.sleep);
    };
  }, []);

  const releaseSparkles = () => {
    caught.current = 0;
    const batch = [0, 1, 2].map((i) => ({
      id: ++floaterId.current,
      x: -54 + i * 30 + Math.random() * 10,
      delay: i * 120,
    }));
    setFloaters((f) => [...f, ...batch]);
  };

  const onBoop = (e: MouseEvent<HTMLButtonElement>) => {
    poke();
    const r = root.current?.getBoundingClientRect();
    const now = performance.now();
    taps.current = [...taps.current.filter((t) => now - t < 2000), now];

    // Tapped the sparkle on its antenna.
    if ((e.target as Element).closest(".ziq-star")) {
      if (r) spawnBurst(r.left + r.width / 2, r.top + 4, 14);
      react("star", "spin", "My sparkle! ✦ catch the little ones");
      releaseSparkles();
      return;
    }
    if (taps.current.length >= 5) {
      taps.current = [];
      react("dizzy", "dizzy", "Whoa… so dizzy ✧✧", 2200);
      return;
    }
    if (r) spawnBurst(r.left + r.width / 2, r.top + r.height / 3, 10);
    react(
      "happy",
      "squish",
      BOOP_LINES[boopCount.current++ % BOOP_LINES.length] ?? "Boop! ♡",
      1000,
    );
    if (boopCount.current % 3 === 0) releaseSparkles();
  };

  const catchSparkle = (id: number, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    spawnBurst(e.clientX, e.clientY, 10);
    setFloaters((f) => f.filter((x) => x.id !== id));
    const n = Math.min(caught.current, CATCH_LINES.length - 1);
    caught.current += 1;
    if (n >= 2) react("love", "hop", CATCH_LINES[n], 2200);
    else react("wow", "squish", CATCH_LINES[n], 1200);
  };

  const closed = blink && (mood === "idle" || mood === "wow");

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end gap-2 md:bottom-6 md:right-6">
      {line && (
        <div
          key={line.key}
          role="status"
          className="ziq-bubble glass-strong max-w-[13rem] rounded-2xl rounded-br-md px-4 py-2.5 text-xs leading-snug text-foreground shadow-glow"
        >
          {line.text}
        </div>
      )}
      <div className="relative">
        {floaters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-label="Catch a sparkle"
            onClick={(e) => catchSparkle(f.id, e)}
            onAnimationEnd={() => setFloaters((all) => all.filter((x) => x.id !== f.id))}
            className="ziq-floater absolute bottom-full flex h-9 w-9 items-center justify-center text-lg"
            style={{ left: `calc(50% + ${f.x}px)`, animationDelay: `${f.delay}ms` }}
          >
            ✦
          </button>
        ))}
        <button
          ref={root}
          type="button"
          onClick={onBoop}
          aria-label="Ziq, the GENZIQ buddy. Click to say hi, or tap its sparkle."
          className={`ziq ziq-mood-${mood} h-16 w-16 shrink-0 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-[4.5rem] md:w-[4.5rem]`}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden>
            <defs>
              <radialGradient id="ziq-body" cx="36%" cy="30%" r="75%">
                <stop offset="0%" style={{ stopColor: "var(--chrome)" }} />
                <stop offset="28%" style={{ stopColor: "var(--primary-glow)" }} />
                <stop offset="68%" style={{ stopColor: "var(--primary)" }} />
                <stop offset="100%" style={{ stopColor: "var(--rose)" }} />
              </radialGradient>
            </defs>
            <ellipse
              className="ziq-shadow"
              cx="50"
              cy="96"
              rx="22"
              ry="3.5"
              style={{ fill: "var(--primary)" }}
              opacity="0.35"
            />
            <g key={anim.key} className={`ziq-act ziq-act-${anim.name}`}>
              <g className="ziq-body">
                <path
                  d="M50 24 Q48 16 52 10"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ stroke: "var(--primary-glow)" }}
                />
                {/* generous invisible hit area so the antenna sparkle is easy to tap */}
                <g className="ziq-star">
                  <circle cx="52" cy="9" r="11" fill="transparent" />
                  <path
                    d="M52 1 L54 7 L60 9 L54 11 L52 17 L50 11 L44 9 L50 7 Z"
                    style={{ fill: "var(--chrome)" }}
                  />
                </g>
                <circle cx="50" cy="56" r="33" fill="url(#ziq-body)" />
                <ellipse
                  cx="38"
                  cy="40"
                  rx="10"
                  ry="6"
                  transform="rotate(-25 38 40)"
                  style={{ fill: "var(--chrome)" }}
                  opacity="0.55"
                />
                <ellipse
                  className="ziq-cheek"
                  cx="31"
                  cy="66"
                  rx="6"
                  ry="3.5"
                  style={{ fill: "var(--blush)" }}
                />
                <ellipse
                  className="ziq-cheek"
                  cx="69"
                  cy="66"
                  rx="6"
                  ry="3.5"
                  style={{ fill: "var(--blush)" }}
                />
                <g ref={eyes} className="ziq-eyes">
                  <Eyes mood={mood} closed={closed} />
                </g>
                <Mouth mood={mood} />
                {mood === "sleepy" && (
                  <g style={{ fill: "var(--chrome)" }} className="font-display">
                    <text className="ziq-z" x="76" y="30" fontSize="11">
                      z
                    </text>
                    <text className="ziq-z ziq-z2" x="84" y="20" fontSize="8">
                      z
                    </text>
                  </g>
                )}
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

const INK = { fill: "var(--background)" };
const INK_STROKE = { stroke: "var(--background)" };

function heart(cx: number, cy: number) {
  return `M${cx} ${cy + 5} C${cx - 9} ${cy - 1} ${cx - 5} ${cy - 9} ${cx} ${cy - 3} C${cx + 5} ${cy - 9} ${cx + 9} ${cy - 1} ${cx} ${cy + 5} Z`;
}
function star(cx: number, cy: number) {
  return `M${cx} ${cy - 8} L${cx + 2.2} ${cy - 2.2} L${cx + 8} ${cy} L${cx + 2.2} ${cy + 2.2} L${cx} ${cy + 8} L${cx - 2.2} ${cy + 2.2} L${cx - 8} ${cy} L${cx - 2.2} ${cy - 2.2} Z`;
}
const arc = (cx: number) => `M${cx - 5} 58 Q${cx} 51 ${cx + 5} 58`;

function OpenEye({ cx, closed }: { cx: number; closed?: boolean }) {
  return (
    <g className={closed ? "ziq-blink" : ""} style={{ transformOrigin: `${cx}px 56px` }}>
      <ellipse cx={cx} cy="56" rx="5.2" ry="7" style={INK} />
      <circle cx={cx + 2} cy="53" r="1.9" style={{ fill: "var(--chrome)" }} />
    </g>
  );
}

function Eyes({ mood, closed }: { mood: ZiqMood; closed: boolean }) {
  const sw = { strokeWidth: 3, strokeLinecap: "round" as const, fill: "none" };
  switch (mood) {
    case "happy":
      return (
        <>
          <path d={arc(40)} {...sw} style={INK_STROKE} />
          <path d={arc(60)} {...sw} style={INK_STROKE} />
        </>
      );
    case "wink":
      return (
        <>
          <path d={arc(40)} {...sw} style={INK_STROKE} />
          <OpenEye cx={60} />
        </>
      );
    case "love":
      return (
        <g className="ziq-pulse">
          <path
            d={heart(40, 56)}
            style={{ fill: "var(--blush)", stroke: "var(--background)", strokeWidth: 1.4 }}
          />
          <path
            d={heart(60, 56)}
            style={{ fill: "var(--blush)", stroke: "var(--background)", strokeWidth: 1.4 }}
          />
        </g>
      );
    case "star":
      return (
        <g className="ziq-pulse">
          <path d={star(40, 56)} style={{ ...INK, stroke: "var(--chrome)", strokeWidth: 0.8 }} />
          <path d={star(60, 56)} style={{ ...INK, stroke: "var(--chrome)", strokeWidth: 0.8 }} />
        </g>
      );
    case "wow":
      return (
        <g className={closed ? "ziq-blink" : ""} style={{ transformOrigin: "50px 56px" }}>
          <circle cx="40" cy="55" r="7" style={INK} />
          <circle cx="60" cy="55" r="7" style={INK} />
          <circle cx="42.5" cy="52.5" r="2.5" style={{ fill: "var(--chrome)" }} />
          <circle cx="62.5" cy="52.5" r="2.5" style={{ fill: "var(--chrome)" }} />
        </g>
      );
    case "dizzy":
      return (
        <g {...sw} style={INK_STROKE}>
          <path d="M36 52 L44 60 M44 52 L36 60" />
          <path d="M56 52 L64 60 M64 52 L56 60" />
        </g>
      );
    case "sleepy":
      return (
        <g {...sw} style={INK_STROKE}>
          <path d="M35 56 Q40 61 45 56" />
          <path d="M55 56 Q60 61 65 56" />
        </g>
      );
    default:
      return (
        <>
          <OpenEye cx={40} closed={closed} />
          <OpenEye cx={60} closed={closed} />
        </>
      );
  }
}

function Mouth({ mood }: { mood: ZiqMood }) {
  if (mood === "happy" || mood === "love" || mood === "star") {
    return (
      <g>
        <path d="M43 65 Q50 77 57 65 Z" style={INK} />
        <path d="M46.5 70.5 Q50 74 53.5 70.5 Q50 69 46.5 70.5 Z" style={{ fill: "var(--blush)" }} />
      </g>
    );
  }
  if (mood === "wow") return <ellipse cx="50" cy="69" rx="3.6" ry="4.6" style={INK} />;
  if (mood === "sleepy") return <circle cx="50" cy="68" r="2" style={INK} />;
  if (mood === "dizzy")
    return (
      <path
        d="M43 68 Q46.5 64.5 50 68 Q53.5 71.5 57 68"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={INK_STROKE}
      />
    );
  return (
    <path
      d="M45.5 67 Q50 71 54.5 67"
      fill="none"
      strokeWidth="2.2"
      strokeLinecap="round"
      style={INK_STROKE}
    />
  );
}
