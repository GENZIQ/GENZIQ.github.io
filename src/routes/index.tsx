import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Sparkles, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { STATIONS } from "@/components/universe/stations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GENZIQ — Intelligence. Innovation. Infinite Possibilities." },
      { name: "description", content: "GENZIQ is a new technology company exploring applied intelligence and immersive software — built honestly, from day one." },
      { property: "og:title", content: "GENZIQ — Intelligence. Innovation. Infinite Possibilities." },
      { property: "og:description", content: "A new technology company exploring applied intelligence and immersive software." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const BELIEFS = [
  { icon: Sparkles, title: "Intelligence", text: "Technology should make people sharper, not replace their judgement." },
  { icon: Compass, title: "Innovation", text: "We would rather try something new and learn than copy what already exists." },
  { icon: Eye, title: "Honesty", text: "No invented numbers, logos or testimonials. What you see is where we really are." },
];

const LOG = [
  { when: "Now", what: "GENZIQ is founded. Brand, vision and this website go live.", state: "live" },
  { when: "Next", what: "First prototypes in applied AI and immersive web.", state: "soon" },
  { when: "Later", what: "Real products, shaped by the people who use them.", state: "future" },
];

function Home() {
  return (
    <>
      <PageIntro
        eyebrow="Station 01 · Orbit — a technology company at day one"
        title={
          <>
            <span className="text-chrome">Building what's next,</span>{" "}
            <span className="text-iris">from day one.</span>
          </>
        }
        actions={
          <>
            <Button asChild variant="hero" size="xl">
              <Link to="/innovation">
                Enter the lab <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/about">Our story</Link>
            </Button>
          </>
        }
      >
        <p>
          GENZIQ is a new technology company exploring applied intelligence and immersive software.
          We're early — and we're building in the open.
        </p>
      </PageIntro>

      <Section>
        <p className="eyebrow">What we believe</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold md:text-4xl">Three words in our logo. Three promises we hold ourselves to.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BELIEFS.map(({ icon: Icon, title, text }) => (
            <TiltCard key={title} className="p-7">
              <div className="depth-1">
                <span className="animate-float flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-aurora shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-panel scanline grid gap-10 p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
          <div>
            <p className="eyebrow">Mission log</p>
            <h2 className="mt-4 text-3xl font-semibold">Where GENZIQ really is.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              No big claims. Just an honest status report we'll keep updating as we grow.
            </p>
          </div>
          <ol className="space-y-4">
            {LOG.map((item) => (
              <li key={item.when} className="flex gap-5 rounded-2xl border border-border p-5">
                <span className="w-14 shrink-0 font-mono text-xs uppercase tracking-widest text-champagne">{item.when}</span>
                <span className="flex-1 text-sm text-foreground">{item.what}</span>
                {item.state === "live" && <span className="animate-pulse-dot mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-glow" />}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <p className="eyebrow">Choose a destination</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATIONS.slice(1).map((s) => (
            <Link key={s.id} to={s.path} className="group">
              <TiltCard className="h-full p-6 transition-colors group-hover:border-aurora">
                <span className="font-mono text-xs text-champagne">0{s.index} · {s.codename}</span>
                <span className="mt-8 flex items-center justify-between font-display text-lg">
                  {s.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </TiltCard>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
