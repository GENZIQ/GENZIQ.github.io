import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Github,
  ExternalLink,
  Bot,
  Activity,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  Terminal,
  Cpu,
  Eye,
  Sliders,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Projects — Built by GENZIQ" },
      {
        name: "description",
        content:
          "Showcasing GENZIQ projects: AI Data Analyst Bot, Highway Inspection, Personalized Job Agent, and AURA assistant. Clearly distinguished prototypes and finished solutions.",
      },
      { property: "og:title", content: "GENZIQ Projects — AI Solutions & Prototypes" },
      {
        property: "og:description",
        content:
          "Explore active projects and prototypes engineered at GENZIQ, including RAG bots, computer vision systems, and autonomous agents.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

interface Project {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  status: "Finished Product" | "Active Prototype" | "Field Testing" | "Early Prototype";
  statusColor: string;
  technologies: string[];
  keyFeatures: string[];
  githubUrl: string;
  mockupType: "analyst" | "highway" | "jobAgent" | "aura";
}

const PROJECTS: Project[] = [
  {
    id: "data-analyst",
    code: "GZ-PRJ-01",
    title: "AI Data Analyst Bot",
    subtitle: "RAG-based AI data analysis assistant",
    description:
      "A conversational business intelligence and data science assistant powered by Retrieval-Augmented Generation (RAG). Translates complex natural language prompts into optimized SQL and Python queries, performs instant exploratory data analysis across large tabular datasets, and automatically renders interactive charts and executive summaries.",
    status: "Active Prototype",
    statusColor: "border-aurora/50 text-aurora bg-aurora/10",
    technologies: [
      "Python",
      "LangChain",
      "RAG",
      "OpenAI / Gemini API",
      "Pandas",
      "DuckDB",
      "FastAPI",
      "Streamlit",
    ],
    keyFeatures: [
      "Natural language to analytical SQL & Pandas syntax execution",
      "Dynamic schema inspection and semantic column matching",
      "Automated outlier detection and automated chart generation",
      "Interactive conversational memory with verification guardrails",
    ],
    githubUrl: `${SITE.github}`,
    mockupType: "analyst",
  },
  {
    id: "highway-inspection",
    code: "GZ-PRJ-02",
    title: "Highway Inspection",
    subtitle: "AI-powered road damage detection",
    description:
      "A deep learning computer vision system engineered for automated transportation infrastructure monitoring. Analyzes continuous video feeds from dashcams, drones, and inspection vehicles to detect, classify, and geolocate potholes, asphalt fissures, and surface anomalies in real time.",
    status: "Field Testing",
    statusColor: "border-champagne/50 text-champagne bg-champagne/10",
    technologies: ["Computer Vision", "PyTorch", "YOLOv8", "OpenCV", "Python", "CUDA", "GeoJSON"],
    keyFeatures: [
      "Real-time object detection with YOLOv8 optimized for asphalt damage",
      "Severe pothole vs. superficial crack severity classification",
      "Frame-by-frame telemetry correlation with GPS coordinates",
      "Exportable GIS & GeoJSON mapping layers for highway authorities",
    ],
    githubUrl: `${SITE.github}`,
    mockupType: "highway",
  },
  {
    id: "job-agent",
    code: "GZ-PRJ-03",
    title: "Personalized Job Agent",
    subtitle: "AI-powered job discovery and assistance",
    description:
      "An autonomous job search and application copilot that matches candidates to ideal opportunities. Continuously scrapes and parses multi-board listings, measures semantic alignment against candidate resumes via vector embeddings, and drafts hyper-personalized cover letters tailored to company mission statements.",
    status: "Active Prototype",
    statusColor: "border-aurora/50 text-aurora bg-aurora/10",
    technologies: [
      "LLM Agents",
      "Vector Search",
      "ChromaDB",
      "Web Scraping",
      "Python",
      "LangGraph",
      "FastAPI",
    ],
    keyFeatures: [
      "Automated job board parsing and semantic resume alignment scoring",
      "Vector embeddings search for role and tech stack compatibility",
      "AI-tailored cover letter and resume bullet customization",
      "Application deadline tracking and follow-up alert scheduling",
    ],
    githubUrl: `${SITE.github}`,
    mockupType: "jobAgent",
  },
  {
    id: "aura",
    code: "GZ-PRJ-04",
    title: "AURA",
    subtitle: "AI-powered personal assistant",
    description:
      "An intelligent ambient personal assistant designed for natural, context-rich human interaction. Features continuous contextual memory, voice interaction via speech-to-text, and autonomous tool calling to manage calendar agendas, extract meeting takeaways, and orchestrate daily workflows.",
    status: "Early Prototype",
    statusColor: "border-rose/50 text-orchid bg-rose/10",
    technologies: [
      "Conversational AI",
      "Speech Recognition (Whisper)",
      "Tool Calling",
      "Python",
      "Vector Memory",
      "FastAPI",
    ],
    keyFeatures: [
      "Ambient speech understanding and low-latency audio response",
      "Persistent user preferences and associative contextual memory",
      "External tool calling for notes, calendars, and web search",
      "Privacy-first offline execution modes for sensitive data",
    ],
    githubUrl: `${SITE.github}`,
    mockupType: "aura",
  },
];

function ProjectMockup({ type }: { type: Project["mockupType"] }) {
  if (type === "analyst") {
    return (
      <div className="rounded-xl border border-border/80 bg-background/80 p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <span className="flex items-center gap-1.5 text-champagne">
            <Bot className="h-3.5 w-3.5" /> analyst_session.py
          </span>
          <span className="text-[0.65rem] text-muted-foreground">RAG Engine: v1.4</span>
        </div>
        <div className="mt-3 space-y-2 text-[0.7rem]">
          <p className="text-muted-foreground">
            &gt; query: &quot;Find quarterly revenue drops &gt; 12%&quot;
          </p>
          <div className="rounded bg-accent/30 p-2 text-aurora">
            SELECT region, quarter, drop_pct FROM revenue_tbl WHERE drop_pct &gt; 0.12 ORDER BY
            drop_pct DESC;
          </div>
          <p className="text-emerald-400">
            ✓ 3 clusters identified. Generating distribution visualizer...
          </p>
        </div>
      </div>
    );
  }

  if (type === "highway") {
    return (
      <div className="rounded-xl border border-border/80 bg-background/80 p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <span className="flex items-center gap-1.5 text-champagne">
            <Eye className="h-3.5 w-3.5" /> cv_stream_frame_1420
          </span>
          <span className="text-[0.65rem] text-emerald-400">60 FPS · CUDA</span>
        </div>
        <div className="relative mt-3 h-20 rounded border border-dashed border-aurora/40 bg-accent/20 p-2">
          <div className="absolute left-6 top-3 rounded border border-red-500/80 bg-red-500/20 px-2 py-0.5 text-[0.65rem] text-red-300">
            [Pothole: 94.8% conf]
          </div>
          <div className="absolute right-8 bottom-3 rounded border border-amber-500/80 bg-amber-500/20 px-2 py-0.5 text-[0.65rem] text-amber-300">
            [Surface Crack: 88.2%]
          </div>
        </div>
        <p className="mt-2 text-[0.65rem] text-muted-foreground">
          Lat: 12.9716° N, Lon: 77.5946° E · Logged to GeoJSON
        </p>
      </div>
    );
  }

  if (type === "jobAgent") {
    return (
      <div className="rounded-xl border border-border/80 bg-background/80 p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <span className="flex items-center gap-1.5 text-champagne">
            <Activity className="h-3.5 w-3.5" /> agent_matcher.py
          </span>
          <span className="text-[0.65rem] text-aurora">Match: 96.2%</span>
        </div>
        <div className="mt-3 space-y-1.5 text-[0.7rem]">
          <div className="flex justify-between text-muted-foreground">
            <span>Target: AI Systems Engineer</span>
            <span className="text-emerald-400">Skills Aligned</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-border">
            <div className="h-1.5 rounded-full bg-iris" style={{ width: "96%" }} />
          </div>
          <p className="pt-1 text-[0.65rem] text-champagne">
            &gt; Cover letter generated based on candidate experience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/80 bg-background/80 p-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <span className="flex items-center gap-1.5 text-champagne">
          <Sparkles className="h-3.5 w-3.5" /> aura_runtime_node
        </span>
        <span className="text-[0.65rem] text-orchid">Ambient Listening</span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1 py-2">
        {[14, 28, 42, 20, 36, 12, 30, 48, 22, 10].map((h, i) => (
          <span key={i} className="w-1.5 rounded-full bg-iris" style={{ height: `${h}px` }} />
        ))}
      </div>
      <p className="mt-2 text-center text-[0.65rem] text-muted-foreground">
        &quot;Drafting summary of the afternoon sync...&quot;
      </p>
    </div>
  );
}

function ProductsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Station 04 · Projects & Showcase — Applied Engineering"
        title={
          <>
            <span className="text-chrome">Our Projects &</span>{" "}
            <span className="text-iris">Active Builds.</span>
          </>
        }
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <a href={SITE.github} target="_blank" rel="noreferrer">
                <Github className="mr-1.5 h-4 w-4" /> View GitHub Org
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/contact">Discuss a Build</Link>
            </Button>
          </div>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          Explore the projects and prototypes engineered at GENZIQ. We build practical artificial
          intelligence systems and software in the open. Below, each project clearly indicates its
          development status — distinguishing functional prototypes from completed solutions.
        </p>
      </PageIntro>

      {/* Status Legend */}
      <Section className="-mt-8 md:-mt-16">
        <div className="glass-panel flex flex-wrap items-center justify-between gap-4 p-5 md:p-6">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-aurora" />
            <span className="font-mono text-xs uppercase tracking-wider text-champagne">
              Development Status Guide:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-aurora/40 bg-aurora/10 px-3 py-1 font-mono text-aurora">
              ● Active Prototype (Functional Demo)
            </span>
            <span className="rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 font-mono text-champagne">
              ● Field Testing (Benchmark Phase)
            </span>
            <span className="rounded-full border border-rose/40 bg-rose/10 px-3 py-1 font-mono text-orchid">
              ● Early Prototype (Active R&amp;D)
            </span>
          </div>
        </div>
      </Section>

      {/* Projects Showcase */}
      <Section>
        <div className="space-y-10">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-12 transition-all hover:border-aurora/40"
            >
              <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-champagne">
                      {project.code}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider ${project.statusColor}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                    <span className="text-chrome">{project.title}</span>
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-aurora">
                    {project.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {project.description}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-border/60 pt-5">
                    <p className="font-mono text-[0.7rem] uppercase tracking-wider text-champagne">
                      Key Capabilities:
                    </p>
                    {project.keyFeatures.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-start gap-2 text-xs leading-relaxed text-foreground/90"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aurora" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-border/40 pt-4">
                    <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                      Technologies Used:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/70 bg-glass px-2.5 py-1 font-mono text-[0.7rem] text-champagne"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button asChild variant="hero" size="lg">
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <Github className="mr-1.5 h-4 w-4" /> View on GitHub
                      </a>
                    </Button>
                    <Button asChild variant="glass" size="lg">
                      <Link to="/contact">
                        Inquire About This Build <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl border border-border/70 bg-glass/60 p-5 shadow-2xl">
                    <p className="font-mono text-xs text-muted-foreground mb-3">
                      Live Architecture Preview
                    </p>
                    <ProjectMockup type={project.mockupType} />
                  </div>
                  <div className="rounded-xl border border-border/40 bg-glass/30 p-4 text-center">
                    <p className="font-mono text-[0.7rem] text-muted-foreground">
                      Development Stage:{" "}
                      <span className="text-foreground font-semibold">{project.status}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Collaboration CTA */}
      <Section>
        <div className="glass-panel scanline p-8 md:p-12 text-center">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold md:text-3xl">
            Have a custom problem one of these systems could solve?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            We adapt these prototypes for specific client use cases or build entirely new custom AI
            applications. Tell us about your technical challenges.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Share Your Requirements <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/services">Explore Client Services</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
