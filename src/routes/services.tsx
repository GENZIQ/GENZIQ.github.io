import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Sparkles,
  Bot,
  Code2,
  Globe2,
  LineChart,
  CheckCircle2,
  Layers,
  Cpu,
  Zap,
  ArrowUpRight,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AI & Custom Software Engineering | GENZIQ" },
      {
        name: "description",
        content:
          "What you can hire GENZIQ to build: AI/ML Development, Generative AI & RAG systems, AI Agents & Automation, Custom Software, Web Development, and Data Analytics.",
      },
      { property: "og:title", content: "GENZIQ Services — AI & Software Solutions" },
      {
        property: "og:description",
        content:
          "Hire GENZIQ to build custom AI models, RAG pipelines, autonomous agents, web apps, and enterprise software.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    id: "ai-ml",
    icon: Brain,
    title: "AI/ML Development",
    tagline: "Custom machine learning solutions",
    description:
      "We design, train, and deploy custom machine learning algorithms and computer vision systems tailored to your unique data and domain requirements.",
    capabilities: [
      "Custom predictive modeling, classification, and regression",
      "Computer vision systems (object detection, YOLO, OCR, tracking)",
      "Anomaly detection and quality control inspection models",
      "Model quantization, inference optimization, and containerized deployment",
    ],
    tech: ["Python", "PyTorch", "TensorFlow", "OpenCV", "Scikit-Learn", "Hugging Face"],
  },
  {
    id: "gen-ai",
    icon: Sparkles,
    title: "Generative AI",
    tagline: "LLM applications and RAG systems",
    description:
      "Turn frontier large language models into secure, reliable enterprise tools with contextual retrieval-augmented generation (RAG) and domain-specific fine-tuning.",
    capabilities: [
      "Enterprise RAG pipelines over internal documents and knowledge bases",
      "Contextual customer support and internal research copilots",
      "Semantic vector search and hybrid dense/sparse retrieval",
      "Prompt engineering, structured output validation, and safety guardrails",
    ],
    tech: ["OpenAI API", "Gemini API", "LangChain", "LlamaIndex", "ChromaDB", "pgvector"],
  },
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI Agents",
    tagline: "Intelligent task automation",
    description:
      "Autonomous agent systems that can reason through complex workflows, call external APIs, query databases, and execute multi-step operations without human intervention.",
    capabilities: [
      "Multi-agent collaborative swarms with specialized role distribution",
      "Tool-calling agents integrated with Slack, CRMs, email, and internal APIs",
      "Intelligent web scraping, data extraction, and competitive monitoring",
      "Autonomous background research and automated summary dispatch",
    ],
    tech: ["LangGraph", "Python", "Tool Calling", "Webhooks", "Redis", "Celery"],
  },
  {
    id: "software-dev",
    icon: Code2,
    title: "Software Development",
    tagline: "Custom applications",
    description:
      "Full-cycle custom software engineering engineered with clean architecture, high scalability, and robust security from day one.",
    capabilities: [
      "Bespoke backend architectures and microservice ecosystems",
      "High-throughput RESTful and GraphQL API design and documentation",
      "Relational and NoSQL database modeling, optimization, and migration",
      "Cloud-native deployment, CI/CD automation, and monitoring setups",
    ],
    tech: ["TypeScript", "Python", "Node.js", "PostgreSQL", "Docker", "REST / GraphQL"],
  },
  {
    id: "web-dev",
    icon: Globe2,
    title: "Web Development",
    tagline: "Business websites and web apps",
    description:
      "High-performance, beautifully designed web applications and corporate websites built to convert visitors and deliver exceptional user experiences.",
    capabilities: [
      "Modern Single Page Applications (SPA) and server-rendered web portals",
      "Interactive 3D / WebGL immersive graphics and responsive UI",
      "SEO-optimized architecture with lightning-fast Core Web Vitals",
      "Mobile-first responsive design tested across all screen resolutions",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Three.js", "Vite", "TanStack Router"],
  },
  {
    id: "data-analytics",
    icon: LineChart,
    title: "Data Analytics",
    tagline: "Data processing and insights",
    description:
      "Transform messy operational logs and disparate data tables into clean, structured analytics pipelines and interactive executive dashboards.",
    capabilities: [
      "Automated ETL and ELT data pipelines from multiple sources",
      "Data cleaning, deduplication, schema normalization, and validation",
      "Interactive visual KPI dashboards and business intelligence reports",
      "Statistical trend forecasting and exploratory data analysis",
    ],
    tech: ["Python", "Pandas", "DuckDB", "SQL", "Apache Arrow", "Recharts"],
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "MVP & Proof-of-Concept",
    duration: "2 – 4 Weeks",
    desc: "Rapid prototyping sprint to validate your AI or software concept with functional, tested code before large capital investment.",
  },
  {
    title: "End-to-End Build",
    duration: "Milestone-Based",
    desc: "Complete development lifecycle from technical architecture to design, full-stack implementation, testing, and production deployment.",
  },
  {
    title: "Dedicated Engineering",
    duration: "Monthly Retainer",
    desc: "Direct technical partnership providing ongoing sprint capacity, feature iteration, model fine-tuning, and infrastructure maintenance.",
  },
];

function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Station 03 · Solutions — Client Services & Engineering"
        title={
          <>
            <span className="text-chrome">Engineering intelligent solutions</span>{" "}
            <span className="text-iris">for real business challenges.</span>
          </>
        }
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Start a Project <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/partnerships">Partner With Us</Link>
            </Button>
          </div>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          What you can hire GENZIQ to build. We partner with founders, businesses, and engineering
          teams to turn ideas into production-ready AI systems, automated agents, and custom
          software. Direct communication with technical builders, zero fluff.
        </p>
      </PageIntro>

      {/* Services Grid */}
      <Section className="-mt-8 md:-mt-16">
        <div>
          <p className="eyebrow">Service Catalog</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
            <span className="text-chrome">Comprehensive Capabilities,</span>{" "}
            <span className="text-iris">Tailored Execution.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Explore our six core services. Every engagement is shaped around your specific goals and
            architecture.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <TiltCard key={s.id} className="flex flex-col justify-between p-8">
                <div className="depth-1">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-aurora shadow-glow">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-champagne">
                      {s.tagline}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>

                  <div className="mt-6 space-y-2.5 border-t border-border/60 pt-5">
                    <p className="font-mono text-[0.7rem] uppercase tracking-wider text-aurora">
                      Key Capabilities:
                    </p>
                    {s.capabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-start gap-2 text-xs leading-relaxed text-foreground/90"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aurora" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-border/40 pt-4">
                    <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                      Technologies:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border/60 bg-glass px-2 py-0.5 font-mono text-[0.65rem] text-champagne"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="depth-1 mt-6 border-t border-border/40 pt-4">
                  <Button asChild variant="glass" size="sm" className="w-full justify-between">
                    <Link to="/contact">
                      Inquire About This Service <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </Section>

      {/* Engagement Models */}
      <Section>
        <div>
          <p className="eyebrow">How We Work Together</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
            <span className="text-chrome">Flexible Engagement Models</span>{" "}
            <span className="text-iris">for Every Stage.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Whether you need a quick prototype to validate a hypothesis or a dedicated partner for
            long-term development.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((m) => (
            <TiltCard key={m.title} className="p-8">
              <div className="depth-1 flex h-full flex-col justify-between">
                <div>
                  <span className="rounded-full border border-aurora/40 bg-accent/30 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-aurora">
                    {m.duration}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
                <div className="mt-6 pt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-aurora transition-colors hover:text-white"
                  >
                    Discuss this model <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Direct CTA */}
      <Section>
        <div className="glass-panel scanline p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="eyebrow">Ready to Build?</p>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                Let's talk about what we can build for your business.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Send us an email or use our contact transmission form. We respond with technical
                insights and honest feasibility assessments within 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Send Transmission <Send className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href={`mailto:${SITE.email}`}>Email: {SITE.email}</a>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
