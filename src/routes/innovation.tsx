import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { Slider } from "@/components/ui/slider";
import { labState } from "@/components/universe/lab-state";

export const Route = createFileRoute("/innovation")({
  head: () => ({
    meta: [
      { title: "Innovation — Inside the GENZIQ lab" },
      { name: "description", content: "How GENZIQ approaches innovation: ask, prototype, test, share. Play with the live 3D lab experiment." },
      { property: "og:title", content: "Inside the GENZIQ lab" },
      { property: "og:description", content: "Ask, prototype, test, share — and play with our live 3D experiment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Innovation,
});

const STEPS = [
  { n: "01", title: "Ask", text: "Start with a real question someone actually has, not a technology looking for a use." },
  { n: "02", title: "Prototype", text: "Build the smallest thing that can prove or disprove the idea — fast." },
  { n: "03", title: "Test", text: "Put it in front of real people. Keep what works, drop what doesn't." },
  { n: "04", title: "Share", text: "Publish what we learn." },
];

function LabControls() {
  const [distort, setDistort] = useState(labState.distort);
  const [speed, setSpeed] = useState(labState.speed);

  return (
    <div className="glass-panel w-full max-w-sm p-6">
      <div className="flex items-center gap-2">
        <span className="animate-pulse-dot h-2 w-2 rounded-full bg-primary-glow" />
        <p className="eyebrow">Live experiment · Matter</p>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Reshape the object in the lab. Hover it to excite it.</p>
      <label className="mt-6 block">
        <span className="flex justify-between font-mono text-xs text-muted-foreground">
          Distortion <span className="text-foreground">{distort.toFixed(2)}</span>
        </span>
        <Slider
          className="mt-3"
          min={0}
          max={0.9}
          step={0.01}
          value={[distort]}
          onValueChange={([v = 0]) => {
            setDistort(v);
            labState.distort = v;
          }}
          aria-label="Distortion"
        />
      </label>
      <label className="mt-6 block">
        <span className="flex justify-between font-mono text-xs text-muted-foreground">
          Energy <span className="text-foreground">{speed.toFixed(1)}</span>
        </span>
        <Slider
          className="mt-3"
          min={0.2}
          max={6}
          step={0.1}
          value={[speed]}
          onValueChange={([v = 1]) => {
            setSpeed(v);
            labState.speed = v;
          }}
          aria-label="Energy"
        />
      </label>
    </div>
  );
}

function Innovation() {
  return (
    <>
      <PageIntro
        eyebrow="Station 04 · Lab"
        title={
          <>
            <span className="text-chrome">Innovation is a habit,</span> <span className="text-iris">not a slogan.</span>
          </>
        }
        actions={<LabControls />}
      >
        <p>
          At GENZIQ, innovating means asking better questions, building small and learning in public.
          The shape on the right is a live experiment — go ahead and play with it.
        </p>
      </PageIntro>

      <Section>
        <p className="eyebrow">Our process</p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-4xl">Four steps, repeated as often as it takes.</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <TiltCard key={s.n} className="p-7" >
              <div className="depth-1">
                <span className="font-display text-4xl text-iris">{s.n}</span>
                <h3 className="mt-6 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <div className="mt-6 h-1 rounded-full bg-muted">
                  <div className="h-1 rounded-full bg-iris" style={{ width: `${(i + 1) * 25}%` }} />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-panel scanline p-8 md:p-12">
          <p className="eyebrow">Where we're looking</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              ["Human-centred AI", "Tools that amplify judgement instead of replacing it."],
              ["Spatial interfaces", "Using depth and motion to make complex ideas easier to grasp."],
              ["Lightweight software", "Fast, simple products that respect people's time and devices."],
            ].map(([t, d]) => (
              <div key={t} className="border-l border-aurora/50 pl-5">
                <h3 className="text-lg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
