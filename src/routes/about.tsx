import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GENZIQ — Every big thing starts as a single point" },
      { name: "description", content: "The story, values and honest starting point of GENZIQ, a new technology company." },
      { property: "og:title", content: "About GENZIQ" },
      { property: "og:description", content: "Every big thing starts as a single point. This is ours." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const VALUES = [
  { n: "01", title: "Honest by default", text: "We describe things as they are — including what we haven't built yet." },
  { n: "02", title: "Curious, always", text: "Questions first. The best ideas tend to hide behind the obvious answer." },
  { n: "03", title: "Built to last", text: "We'd rather ship one thing that truly works than ten that look good in a slide." },
  { n: "04", title: "People over hype", text: "Technology is only interesting when it makes someone's day genuinely better." },
];

function About() {
  return (
    <>
      <PageIntro
        eyebrow="Station 02 · Origin"
        title={
          <>
            <span className="text-chrome">Every big thing starts as</span>{" "}
            <span className="text-iris">a single point.</span>
          </>
        }
      >
        <p>
          GENZIQ is that point. A young technology brand with a simple ambition: to explore what
          intelligence and imagination can build together — and to be honest about every step of the journey.
        </p>
      </PageIntro>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel p-8 md:p-10">
            <p className="eyebrow">Why GENZIQ</p>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">A new generation of IQ.</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              The name blends <span className="text-foreground">Gen</span> — generation, generative, genesis — with{" "}
              <span className="text-foreground">IQ</span>. It stands for technology that thinks a little further ahead,
              made by people who grew up with the internet and want to build its next chapter.
            </p>
          </div>
          <div className="glass-panel p-8 md:p-10">
            <p className="eyebrow">What we're not</p>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">Bigger than we are.</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              You won't find invented customer logos, inflated team numbers or made-up awards here. GENZIQ is at the
              beginning — and we think a genuine start is more interesting than a pretend finish line.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="glass-panel grid gap-8 p-8 md:grid-cols-[auto_1fr] md:items-center md:p-10">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-iris shadow-glow">
            <span className="font-display text-4xl font-semibold text-primary-foreground">
              {SITE.founder.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="eyebrow">The founder</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              <span className="text-chrome">{SITE.founder.name}</span>
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {SITE.founder.role} · GENZIQ · Founded {SITE.foundingYear}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Founded in {SITE.foundingYear} by {SITE.founder.name}, GENZIQ began with one
              person and one idea. Follow the work as it happens.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="glass" size="lg">
                <a href={SITE.founder.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin /> LinkedIn
                </a>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href={SITE.github} target="_blank" rel="noreferrer">
                  <Github /> GenzIQ on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <p className="eyebrow">Our values</p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-4xl">The rules we set before writing a single line of code.</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <TiltCard key={v.n} className="p-7">
              <div className="depth-1 flex gap-6">
                <span className="font-display text-3xl text-iris">{v.n}</span>
                <div>
                  <h3 className="text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-panel flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
          <h2 className="max-w-lg text-2xl font-semibold">Want to be part of the early story?</h2>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Get in touch <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
