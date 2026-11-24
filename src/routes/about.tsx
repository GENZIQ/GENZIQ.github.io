import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About GENZIQ — AI & Software Company" },
    { name: "description", content: "Learn about GENZIQ's vision, mission, approach, work, and early-stage founder-led journey." },
  ] }),
  component: About,
});

const SECTIONS = [
  ["Our Vision", "To make useful AI and software accessible through practical, responsible, human-centred technology."],
  ["Our Mission", "To design, prototype and build solutions that solve real problems without unnecessary complexity."],
  ["What We Do", "We develop AI and ML systems, generative AI applications, AI agents, automation, data solutions, and custom web applications."],
  ["Our Approach", "We start with the problem, validate assumptions, build an early prototype, test with users, and improve iteratively."],
];

function About() {
  return (
    <>
      <PageIntro eyebrow="About GENZIQ" title={<>An early-stage <span className="text-iris">AI & software company.</span></>}>
        <p>GENZIQ is focused on building practical technology solutions. We are founder-led and early-stage — honest about our size, progress, and the work we are building.</p>
      </PageIntro>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {SECTIONS.map(([title, text], i) => (
            <TiltCard key={title} className="p-8">
              <div className="depth-1">
                <p className="font-mono text-xs text-champagne">0{i + 1}</p>
                <h2 className="mt-4 text-2xl">{title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-panel grid gap-8 p-8 md:grid-cols-[auto_1fr] md:items-center md:p-10">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-iris shadow-glow"><span className="font-display text-4xl text-primary-foreground">A</span></div>
          <div>
            <p className="eyebrow">Founder Introduction</p>
            <h2 className="mt-3 text-3xl">{SITE.founder.name}</h2>
            <p className="mt-2 font-mono text-xs text-muted-foreground">FOUNDER · GENZIQ</p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">Founded in 2026, GENZIQ began as a founder-led effort to turn AI and software ideas into useful working solutions. The company is growing through hands-on projects, experimentation, internships, and collaborations.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="glass"><a href={SITE.founder.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a></Button>
              <Button asChild variant="glass"><a href={SITE.github} target="_blank" rel="noreferrer"><Github /> GitHub</a></Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="glass-panel flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
          <h2 className="text-2xl">Want to discuss a problem or opportunity?</h2>
          <Button asChild variant="hero" size="xl"><Link to="/contact">Get in touch <ArrowRight /></Link></Button>
        </div>
      </Section>
    </>
  );
}
