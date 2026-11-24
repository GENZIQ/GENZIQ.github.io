import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, BriefcaseBusiness, Globe2, Route as RouteIcon, ExternalLink, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [
    { title: "GENZIQ Projects — AI Products and Prototypes" },
    { name: "description", content: "Explore GENZIQ projects including AI data analysis, highway inspection, job assistance, and a personal AI assistant." },
  ] }),
  component: Products,
});

const PROJECTS = [
  { icon: Bot, title: "AI Data Analyst Bot", description: "A RAG-based AI data analysis assistant for querying, interpreting, and summarizing data.", technologies: ["Python", "LLM", "RAG", "Vector Search"], status: "Prototype", links: [] as string[] },
  { icon: RouteIcon, title: "Highway Inspection", description: "An AI-powered road damage detection system for identifying and analysing highway surface issues.", technologies: ["Python", "Computer Vision", "Deep Learning"], status: "Prototype", links: [] as string[] },
  { icon: BriefcaseBusiness, title: "Personalized Job Agent", description: "An AI-powered job discovery and assistance agent that helps users find and evaluate opportunities.", technologies: ["Python", "LLM", "Agents", "Web APIs"], status: "Prototype", links: [] as string[] },
  { icon: Globe2, title: "AURA", description: "An AI-powered personal assistant designed to help users manage tasks and interact more naturally.", technologies: ["LLM", "AI Agents", "Python", "Web App"], status: "Prototype", links: [] as string[] },
];

function Products() {
  return (
    <>
      <PageIntro eyebrow="Projects" title={<>Building and <span className="text-iris">testing real ideas.</span></>}>
        <p>These are active GENZIQ projects and prototypes. They are presented clearly without presenting prototypes as finished commercial products.</p>
      </PageIntro>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map(({ icon: Icon, title, description, technologies, status, links }) => (
            <TiltCard key={title} className="scanline flex flex-col p-7">
              <div className="depth-1 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-aurora"><Icon /></span>
                <span className="rounded-full border border-aurora/50 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-aurora">{status}</span>
              </div>
              <h2 className="depth-1 mt-6 text-xl">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {technologies.map((technology) => <span key={technology} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{technology}</span>)}
              </div>
              <div className="mt-6 flex gap-3">
                {links.length ? links.map((link) => <Button key={link} asChild variant="glass" size="sm"><a href={link} target="_blank" rel="noreferrer"><ExternalLink /> View project</a></Button>) : <span className="text-xs text-muted-foreground">Demo / GitHub link coming soon</span>}
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="mx-auto max-w-2xl text-3xl">Have a problem you'd like us to prototype?</h2>
          <Button asChild variant="hero" size="xl" className="mt-8"><Link to="/contact">Start a project discussion <ArrowRight /></Link></Button>
        </div>
      </Section>
    </>
  );
}
