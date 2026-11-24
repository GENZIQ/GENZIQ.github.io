import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Target,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Code2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GENZIQ — AI & Software Company | Our Story & Vision" },
      {
        name: "description",
        content:
          "Learn about GENZIQ: an AI and software company focused on building practical technology solutions. Discover our vision, mission, approach, and founder.",
      },
      { property: "og:title", content: "About GENZIQ — Practical AI & Software Solutions" },
      {
        property: "og:description",
        content:
          "Our vision, mission, what we do, our approach, and founder introduction. Honest early-stage technology company building in public.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const WHAT_WE_DO = [
  {
    icon: Sparkles,
    title: "AI & Machine Learning Solutions",
    text: "Building custom predictive models, data extraction pipelines, and computer vision algorithms tailored to concrete business challenges.",
  },
  {
    icon: Cpu,
    title: "Generative AI & LLM Systems",
    text: "Designing enterprise RAG systems, semantic knowledge bases, and domain-adapted AI chatbots that augment team productivity.",
  },
  {
    icon: Zap,
    title: "AI Agents & Autonomous Automation",
    text: "Orchestrating intelligent agent workflows that execute multi-step research, data scraping, and task automation independently.",
  },
  {
    icon: Code2,
    title: "Custom Software & Web Engineering",
    text: "Crafting scalable, modern web applications, robust REST/GraphQL APIs, and high-performance databases with clean code.",
  },
];

const APPROACH_STEPS = [
  {
    n: "01",
    title: "Problem-First Pragmatism",
    text: "We never force AI where simple logic works. We isolate the true operational bottleneck first, choosing the most reliable and cost-effective architecture.",
  },
  {
    n: "02",
    title: "Rapid Prototyping & Real-World Validation",
    text: "Rather than multi-month hypothetical specs, we engineer working software prototypes fast, validate with actual users, and iterate based on data.",
  },
  {
    n: "03",
    title: "Production Standards from Day One",
    text: "Even early prototypes adhere to clean architecture, type safety, modular design, and robust error handling so they scale cleanly into production.",
  },
  {
    n: "04",
    title: "Radical Transparency",
    text: "No inflated headcount numbers, fabricated logos, or exaggerated benchmarks. We communicate clearly about what is built, what is in testing, and what is next.",
  },
];

function About() {
  return (
    <>
      <PageIntro
        eyebrow="Station 02 · Origin — Company Overview"
        title={
          <>
            <span className="text-chrome">Practical AI & Software.</span>{" "}
            <span className="text-iris">Built with purpose.</span>
          </>
        }
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/services">
                Explore Services <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          GENZIQ is an AI and software company dedicated to building practical, reliable technology
          solutions. We are in our early stage — and we embrace it with pride. Instead of bloated
          overhead or corporate bureaucracy, we bring relentless energy, hands-on engineering, and
          transparent execution to every project.
        </p>
      </PageIntro>

      {/* Vision & Mission */}
      <Section className="-mt-8 md:-mt-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel relative overflow-hidden p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-aurora shadow-glow">
                <Target className="h-5 w-5" />
              </span>
              <p className="eyebrow">Our Vision</p>
            </div>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
              Democratizing Practical Intelligence.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              We envision a future where artificial intelligence and custom software are not
              complex, cost-prohibitive luxuries reserved for tech giants, but practical, everyday
              tools that empower small businesses, startups, and forward-thinking teams to operate
              with the efficiency of large enterprises.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Technology should sharpen human capability, automate friction, and unlock creative
              potential.
            </p>
          </div>

          <div className="glass-panel relative overflow-hidden p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-aurora shadow-glow">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <p className="eyebrow">Our Mission</p>
            </div>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
              Delivering Tangible, High-Impact Solutions.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Our mission is to design, develop, and deploy production-grade software and AI
              applications that deliver measurable value from day one. We believe in writing clean
              code, maintaining complete transparency with our collaborators, and building
              technology that stands up to real-world demands.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We replace hype with working code, and promises with demonstrable prototypes.
            </p>
          </div>
        </div>
      </Section>

      {/* What We Do */}
      <Section>
        <div>
          <p className="eyebrow">Core Capabilities</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
            <span className="text-chrome">What We Do at</span>{" "}
            <span className="text-iris">GENZIQ.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            We operate at the intersection of modern full-stack software development and practical
            machine learning engineering.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {WHAT_WE_DO.map(({ icon: Icon, title, text }) => (
            <TiltCard key={title} className="p-8">
              <div className="depth-1 flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-aurora shadow-glow">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Our Approach */}
      <Section>
        <div>
          <p className="eyebrow">Engineering Method</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
            <span className="text-chrome">Our Approach to</span>{" "}
            <span className="text-iris">Every Build.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            How we translate abstract requirements into high-performance, maintainable software.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH_STEPS.map((s) => (
            <TiltCard key={s.n} className="p-7">
              <div className="depth-1 flex h-full flex-col justify-between">
                <div>
                  <span className="font-display text-3xl font-bold text-iris">{s.n}</span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {s.text}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Founder Introduction */}
      <Section>
        <div className="glass-panel grid gap-8 p-8 md:grid-cols-[auto_1fr] md:items-center md:p-12">
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-iris via-rose to-deep shadow-glow ring-2 ring-aurora/30">
            <span className="font-display text-5xl font-bold text-primary-foreground">
              {SITE.founder.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Founder Introduction</p>
              <span className="rounded-full border border-border bg-glass px-3 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-champagne">
                Founded {SITE.foundingYear}
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
              <span className="text-chrome">{SITE.founder.name}</span>
            </h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-aurora">
              Founder & Lead Engineer · GENZIQ
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              GENZIQ was founded in {SITE.foundingYear} by Anushree with a clear objective: to cut
              through the speculation surrounding AI and build practical, dependable software that
              delivers real-world utility. With a background in software development and artificial
              intelligence, Anushree leads the company's technical roadmap, architecture, and
              open-source research initiatives.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              "We don't believe in vanity metrics or pretending we have hundreds of employees. We
              are an agile, engineering-focused team that cares deeply about clean code, honest
              relationships, and building what's next."
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="glass" size="lg">
                <a href={SITE.founder.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-1.5 h-4 w-4" /> Founder on LinkedIn
                </a>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href={SITE.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-1.5 h-4 w-4" /> Company LinkedIn
                </a>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href={SITE.github} target="_blank" rel="noreferrer">
                  <Github className="mr-1.5 h-4 w-4" /> GENZIQ on GitHub
                </a>
              </Button>
              <Button asChild variant="hero" size="lg">
                <a href={`mailto:${SITE.email}`}>
                  <Mail className="mr-1.5 h-4 w-4" /> Contact Founder
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Honest Early-Stage Positioning Callout */}
      <Section>
        <div className="glass-panel scanline p-8 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="eyebrow">Early-Stage Commitment</p>
              <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
                Why working with an early-stage company is your advantage.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You work directly with the builders — no account managers or layers of agency
                middle-management. You get high velocity, rapid prototyping, direct engineering
                accountability, and competitive flexibility.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/partnerships">
                  Partner With Us <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
