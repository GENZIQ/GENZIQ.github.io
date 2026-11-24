import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Code2,
  Sparkles,
  Bot,
  LineChart,
  Globe2,
  Compass,
  Eye,
  CheckCircle2,
  ArrowUpRight,
  Layers,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { STATIONS } from "@/components/universe/stations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GENZIQ — Intelligence. Innovation. Infinite Possibilities." },
      {
        name: "description",
        content:
          "GENZIQ is an AI and software company building practical technology solutions: AI & Machine Learning, Custom Software Development, Generative AI & LLM Applications, AI Agents & Automation, Data Science & Analytics, and Web Application Development.",
      },
      { property: "og:title", content: "GENZIQ — Building what's next, from day one." },
      {
        property: "og:description",
        content:
          "AI and software company building practical technology solutions. Explore our AI services, active projects, and partnership opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const OFFERINGS = [
  {
    icon: Brain,
    title: "AI & Machine Learning Solutions",
    description:
      "Custom machine learning models, computer vision systems, and predictive algorithms engineered to solve high-value operational challenges.",
    highlights: ["Predictive Modeling", "Computer Vision & YOLO", "Model Fine-Tuning & MLOps"],
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Full-cycle bespoke software engineering. Scalable backend architectures, resilient microservices, robust APIs, and cloud-native integrations.",
    highlights: ["Clean Architecture", "Scalable APIs", "Enterprise Security & Speed"],
  },
  {
    icon: Sparkles,
    title: "Generative AI & LLM Applications",
    description:
      "Production-ready LLM systems, domain-tailored RAG pipelines, contextual semantic search, and custom intelligent copilot interfaces.",
    highlights: [
      "Enterprise RAG Pipelines",
      "Vector Search & Embeddings",
      "Custom Prompt Workflows",
    ],
  },
  {
    icon: Bot,
    title: "AI Agents and Automation",
    description:
      "Autonomous multi-agent systems and intelligent workflow automation bots that perform multi-step tasks, research, and data operations around the clock.",
    highlights: [
      "Autonomous Agent Swarms",
      "Tool Calling & Function Orchestration",
      "Workflow Automation",
    ],
  },
  {
    icon: LineChart,
    title: "Data Science & Analytics",
    description:
      "Transforming raw telemetry and business records into interactive decision intelligence, predictive models, and real-time visualization dashboards.",
    highlights: ["Automated Data Pipelines", "Statistical Modeling", "Executive BI Dashboards"],
  },
  {
    icon: Globe2,
    title: "Web Application Development",
    description:
      "Modern, ultra-fast web platforms, SaaS interfaces, and interactive 3D web applications designed for maximum responsiveness, SEO, and user conversion.",
    highlights: [
      "React, TypeScript & Modern UI",
      "Interactive 3D / Spatial Web",
      "Mobile-First Responsiveness",
    ],
  },
];

const BELIEFS = [
  {
    icon: Sparkles,
    title: "Intelligence",
    text: "Technology should make people sharper, automate mundane friction, and amplify human judgment.",
  },
  {
    icon: Compass,
    title: "Innovation",
    text: "We build with real engineering depth rather than copy-pasting hype. We test, measure, and refine.",
  },
  {
    icon: Eye,
    title: "Honesty",
    text: "No invented logos, inflated headcounts, or false claims. What you see is where we actually are.",
  },
];

const LOG = [
  {
    when: "Now",
    what: "GENZIQ is founded. Active hiring for engineering interns and launching dedicated client AI & software services.",
    state: "live",
  },
  {
    when: "Active",
    what: "Engineering prototypes: AI Data Analyst Bot, Highway Inspection, Job Agent, and AURA assistant.",
    state: "live",
  },
  {
    when: "Next",
    what: "Deploying client solutions, expanding technology partnerships, and rolling out production releases.",
    state: "soon",
  },
];

const FEATURED_PROJECTS = [
  {
    name: "AI Data Analyst Bot",
    badge: "RAG Assistant",
    desc: "Autonomous conversational analyst for SQL, data parsing, and instant visual chart generation.",
  },
  {
    name: "Highway Inspection",
    badge: "Computer Vision",
    desc: "AI road damage and pothole detection using deep learning on video streams.",
  },
  {
    name: "Personalized Job Agent",
    badge: "AI Agent",
    desc: "Intelligent career discovery engine that matches skills, analyzes postings, and optimizes applications.",
  },
  {
    name: "AURA",
    badge: "Personal Assistant",
    desc: "Next-generation ambient AI assistant with tool-calling capabilities and voice interaction.",
  },
];

function Home() {
  return (
    <>
      <PageIntro
        eyebrow="Station 01 · Orbit — Practical AI & Software Solutions"
        title={
          <>
            <span className="text-chrome">Building what's next,</span>{" "}
            <span className="text-iris">from day one.</span>
          </>
        }
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/services">
                Explore Our Services <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/partnerships">Partner With Us</Link>
            </Button>
          </div>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          GENZIQ is an AI and software engineering company focused on building practical,
          high-impact technology solutions. From autonomous AI agents and enterprise generative AI
          to custom web applications and predictive machine learning models, we engineer software
          that delivers real results.
        </p>
      </PageIntro>

      {/* 5-Second Clarity: What GENZIQ Does */}
      <Section className="-mt-8 md:-mt-16">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">What We Offer</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
              <span className="text-chrome">End-to-End Capabilities</span>{" "}
              <span className="text-iris">for Modern Businesses.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Whether you need to automate critical workflows with AI agents or engineer custom
              full-stack software, GENZIQ provides the technical expertise to turn your goals into
              working systems.
            </p>
          </div>
          <Button asChild variant="glass" size="lg">
            <Link to="/services" className="inline-flex items-center gap-1.5">
              View Detailed Services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map(({ icon: Icon, title, description, highlights }) => (
            <TiltCard key={title} className="flex flex-col justify-between p-7">
              <div className="depth-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-aurora shadow-glow">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <div className="mt-5 space-y-2 border-t border-border/60 pt-4">
                  {highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-2 font-mono text-xs text-champagne"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-aurora shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="depth-1 mt-6 pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 font-mono text-xs text-aurora transition-colors hover:text-white"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Featured Projects Preview */}
      <Section>
        <div className="glass-panel scanline p-8 md:p-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Projects & Research</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                <span className="text-chrome">Active Engineering</span>{" "}
                <span className="text-iris">Prototypes.</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                We believe in building in public. Explore our current research and active software
                builds.
              </p>
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/products">
                Explore All Projects <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PROJECTS.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-border/80 bg-glass/60 p-5 transition-all hover:border-aurora/60"
              >
                <span className="inline-block rounded-full border border-aurora/40 bg-accent/30 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-aurora">
                  {p.badge}
                </span>
                <h4 className="mt-3 font-display text-base font-semibold text-foreground">
                  {p.name}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-4">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-champagne hover:text-white"
                  >
                    View details <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What We Believe */}
      <Section>
        <p className="eyebrow">Our Philosophy</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold md:text-4xl">
          Three words in our emblem. Three promises we hold ourselves to.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BELIEFS.map(({ icon: Icon, title, text }) => (
            <TiltCard key={title} className="p-7">
              <div className="depth-1">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-aurora shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Mission Log */}
      <Section>
        <div className="glass-panel scanline grid gap-10 p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
          <div>
            <p className="eyebrow">Mission Log</p>
            <h2 className="mt-4 text-3xl font-semibold">Where GENZIQ really is.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              No big claims. Just an honest status report as we build intelligent technology one day
              at a time.
            </p>
            <div className="mt-6">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 rounded-xl border border-aurora/40 bg-accent/20 px-4 py-2.5 text-xs text-aurora transition-colors hover:bg-accent"
              >
                <Sparkles className="h-3.5 w-3.5" /> We are currently hiring interns — Apply Now
              </Link>
            </div>
          </div>
          <ol className="space-y-4">
            {LOG.map((item) => (
              <li key={item.when} className="flex gap-5 rounded-2xl border border-border p-5">
                <span className="w-16 shrink-0 font-mono text-xs uppercase tracking-widest text-champagne">
                  {item.when}
                </span>
                <span className="flex-1 text-sm text-foreground">{item.what}</span>
                {item.state === "live" && (
                  <span className="animate-pulse-dot mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-glow" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Choose a Destination */}
      <Section>
        <div className="flex items-center justify-between">
          <p className="eyebrow">Explore the Universe</p>
          <span className="font-mono text-xs text-muted-foreground">8 Stations</span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATIONS.slice(1).map((s) => (
            <Link key={s.id} to={s.path} className="group">
              <TiltCard className="h-full p-6 transition-colors group-hover:border-aurora">
                <span className="font-mono text-xs text-champagne">
                  0{s.index} · {s.codename}
                </span>
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
