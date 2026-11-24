import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, Code2, Database, Handshake, Bot, Globe2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GENZIQ — AI & Software Development Company" },
      { name: "description", content: "GENZIQ builds AI and machine learning solutions, custom software, generative AI applications, AI agents, data analytics, and web applications." },
      { property: "og:title", content: "GENZIQ — AI & Software Solutions" },
      { property: "og:description", content: "Practical AI and software solutions for ambitious ideas." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const OFFERINGS = [
  { icon: BrainCircuit, title: "AI & Machine Learning Solutions" },
  { icon: Code2, title: "Custom Software Development" },
  { icon: Bot, title: "Generative AI & LLM Applications" },
  { icon: Bot, title: "AI Agents and Automation" },
  { icon: Database, title: "Data Science & Analytics" },
  { icon: Globe2, title: "Web Application Development" },
];

function Home() {
  return (
    <>
      <PageIntro
        eyebrow="AI and software company · Building from day one"
        title={
          <>
            <span className="text-chrome">Building what's next,</span>{" "}
            <span className="text-iris">from day one.</span>
          </>
        }
        actions={
          <>
            <Button asChild variant="hero" size="xl">
              <Link to="/services">Explore Our Services <ArrowRight /></Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/partnerships">Partner With Us <Handshake /></Link>
            </Button>
          </>
        }
      >
        <p>
          GENZIQ is an AI and software company focused on building practical technology solutions — from machine learning and intelligent agents to custom web and software applications.
        </p>
      </PageIntro>

      <Section>
        <p className="eyebrow">What we build</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map(({ icon: Icon, title }) => (
            <TiltCard key={title} className="p-7">
              <div className="depth-1 flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-aurora"><Icon /></span>
                <h2 className="text-base font-semibold">{title}</h2>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>
    </>
  );
}
