import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Briefcase,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
  Code2,
  Users,
  Compass,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — We're Hiring! Join GENZIQ" },
      {
        name: "description",
        content:
          "We're Hiring at GENZIQ! Explore open positions: AI & ML Intern, Python Developer Intern, Full Stack Developer Intern, and Generative AI Research Intern. Apply now.",
      },
      { property: "og:title", content: "We're Hiring — Join GENZIQ" },
      {
        property: "og:description",
        content:
          "Join our team at GENZIQ. Explore internship, freelance, and collaboration opportunities in AI and software engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

interface JobOpening {
  id: string;
  role: string;
  type: string;
  duration: string;
  workMode: string;
  deadline: string;
  responsibilities: string[];
  requiredSkills: string[];
  applyUrl: string;
}

const OPEN_ROLES: JobOpening[] = [
  {
    id: "ai-ml-intern",
    role: "AI & ML Intern",
    type: "Internship",
    duration: "3 – 6 Months",
    workMode: "Remote / Hybrid",
    deadline: "Open / Rolling Applications",
    responsibilities: [
      "Research, train, and evaluate machine learning models and computer vision pipelines (PyTorch, YOLO, OpenCV).",
      "Implement and test Retrieval-Augmented Generation (RAG) architectures and embedding pipelines.",
      "Clean, curate, and preprocess tabular, text, and image datasets for training and benchmarking.",
      "Collaborate with the lead engineer on active client AI prototypes and open-source models.",
    ],
    requiredSkills: [
      "Strong Python programming foundation and experience with PyTorch, TensorFlow, or Scikit-learn.",
      "Solid understanding of core ML fundamentals, NLP, and modern LLM APIs (OpenAI, Gemini).",
      "Familiarity with Pandas, NumPy, OpenCV, and Git version control.",
      "Curiosity, problem-solving mindset, and passion for building functional AI tools.",
    ],
    applyUrl: SITE.careersFormUrl,
  },
  {
    id: "python-dev-intern",
    role: "Python Developer Intern",
    type: "Internship",
    duration: "3 – 6 Months",
    workMode: "Remote / Hybrid",
    deadline: "Open / Rolling Applications",
    responsibilities: [
      "Write clean, modular, and performant Python code for backend APIs, microservices, and background tasks.",
      "Integrate third-party APIs, vector databases, and asynchronous task queues (Redis, Celery).",
      "Design and maintain relational database schemas (PostgreSQL, SQLite) and write optimized queries.",
      "Build automated data scrapers, pipelines, and test suites with pytest.",
    ],
    requiredSkills: [
      "Solid command of Python 3.10+, OOP design patterns, and asynchronous programming (asyncio).",
      "Hands-on experience with backend frameworks such as FastAPI, Flask, or Django.",
      "Understanding of RESTful APIs, JSON protocols, and relational database querying (SQL).",
      "Good understanding of Git, virtual environments, and debugging practices.",
    ],
    applyUrl: SITE.careersFormUrl,
  },
  {
    id: "fullstack-dev-intern",
    role: "Full Stack Developer Intern",
    type: "Internship",
    duration: "3 – 6 Months",
    workMode: "Remote / Hybrid",
    deadline: "Open / Rolling Applications",
    responsibilities: [
      "Build responsive, visually compelling user interfaces using React, TypeScript, and Tailwind CSS.",
      "Connect frontend interfaces to backend RESTful endpoints and real-time streaming sockets.",
      "Optimize web application loading speeds, accessibility, and cross-browser responsiveness.",
      "Collaborate on UI design components, rapid prototyping, and shipping live features.",
    ],
    requiredSkills: [
      "Proficiency in TypeScript, modern JavaScript (ES6+), HTML5, and CSS3.",
      "Practical experience with modern React (hooks, state management) and Tailwind CSS.",
      "Basic understanding of backend APIs, Node.js or Python, and HTTP protocols.",
      "Keen eye for aesthetic design, typography, micro-interactions, and mobile responsiveness.",
    ],
    applyUrl: SITE.careersFormUrl,
  },
  {
    id: "genai-research-intern",
    role: "Generative AI Research Intern",
    type: "Internship",
    duration: "3 – 6 Months",
    workMode: "Remote / Hybrid",
    deadline: "Open / Rolling Applications",
    responsibilities: [
      "Benchmark emerging foundation models, agentic frameworks (LangGraph, CrewAI), and prompt techniques.",
      "Design experimental multi-agent workflows with tool-calling and autonomous reasoning capabilities.",
      "Conduct error analysis on RAG architectures and evaluate hallucination mitigation strategies.",
      "Document experimental outcomes and contribute to open research repositories.",
    ],
    requiredSkills: [
      "Hands-on experience with prompt engineering, embeddings, and vector databases (ChromaDB, FAISS).",
      "Familiarity with LangChain, LlamaIndex, or agentic frameworks.",
      "Python scripting skills and deep interest in cutting-edge artificial intelligence.",
      "Strong analytical writing and ability to structure clear technical findings.",
    ],
    applyUrl: SITE.careersFormUrl,
  },
];

const OPPORTUNITIES = [
  {
    icon: Briefcase,
    title: "Internship Opportunities",
    tag: "High Growth",
    description:
      "Direct technical mentorship with real code shipped to production. You work directly with the founder and lead engineers, gaining invaluable early-stage experience and portfolio builds.",
  },
  {
    icon: Code2,
    title: "Freelance Opportunities",
    tag: "Flexible Contracts",
    description:
      "We partner with specialized freelance developers, UI/UX designers, and ML practitioners on specific client deliverables and sprint-based modules with competitive compensation.",
  },
  {
    icon: Users,
    title: "Collaboration Opportunities",
    tag: "Open Source & Research",
    description:
      "Open to academic researchers, open-source contributors, and independent developers interested in co-building experimental tools, publishing findings, or joint development.",
  },
];

function CareersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Station 06 · Launchpad — We Are Hiring"
        title={
          <>
            <span className="text-chrome">We're Hiring —</span>{" "}
            <span className="text-iris">Join GENZIQ.</span>
          </>
        }
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#openings">
                View Open Positions <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={`mailto:${SITE.email}?subject=Careers%20Inquiry%20-%20GENZIQ`}>
                <Mail className="mr-1.5 h-4 w-4" /> Email Us Directly
              </a>
            </Button>
          </div>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          Be part of an early-stage AI and software company building practical technology from day
          one. We are actively looking for curious, driven builders who want to write real code,
          experiment with autonomous systems, and ship impactful software.
        </p>
      </PageIntro>

      {/* Open Roles Section */}
      <Section className="-mt-8 md:-mt-16">
        <div id="openings" className="scroll-mt-28">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Current Openings</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
                <span className="text-chrome">Active Positions</span>{" "}
                <span className="text-iris">Now Accepting Applications.</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                We hire for curiosity, grit, and hands-on ability. Review the open roles below and
                apply via our form.
              </p>
            </div>
            <div className="rounded-full border border-aurora/40 bg-accent/30 px-4 py-1.5 font-mono text-xs text-aurora">
              ● 4 Positions Genuinely Open
            </div>
          </div>

          <div className="mt-10 space-y-8">
            {OPEN_ROLES.map((job) => (
              <div
                key={job.id}
                className="glass-panel relative rounded-3xl p-8 md:p-10 transition-all hover:border-aurora/50"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center">
                  <div>
                    <span className="rounded-full border border-aurora/40 bg-accent/30 px-3 py-1 font-mono text-xs uppercase tracking-wider text-aurora">
                      {job.type}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
                      {job.role}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button asChild variant="hero" size="lg">
                      <a href={job.applyUrl} target="_blank" rel="noreferrer">
                        Apply Now <ArrowUpRight className="ml-1.5 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="glass" size="lg">
                      <a
                        href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                          `[Application] ${job.role} - My Application`,
                        )}&body=${encodeURIComponent(
                          `Hi GENZIQ Team,\n\nI am applying for the ${job.role} position.\n\nName:\nPhone / WhatsApp:\nLinkedIn / GitHub:\nPortfolio / Projects:\nWhy I want to join GENZIQ:\n\nThank you!`,
                        )}`}
                      >
                        <Mail className="mr-1.5 h-4 w-4" /> Apply via Email
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Job Metadata Pills */}
                <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-champagne">
                  <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-glass px-3 py-1.5">
                    <Clock className="h-3.5 w-3.5 text-aurora" />
                    <span>Duration: {job.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-glass px-3 py-1.5">
                    <MapPin className="h-3.5 w-3.5 text-aurora" />
                    <span>Mode: {job.workMode}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-glass px-3 py-1.5">
                    <Calendar className="h-3.5 w-3.5 text-aurora" />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-aurora">
                      Key Responsibilities
                    </h4>
                    <ul className="mt-4 space-y-2.5">
                      {job.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground md:text-sm"
                        >
                          <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-aurora" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-champagne">
                      Required Skills &amp; Qualifications
                    </h4>
                    <ul className="mt-4 space-y-2.5">
                      {job.requiredSkills.map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground md:text-sm"
                        >
                          <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-champagne" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Other Opportunities */}
      <Section>
        <div>
          <p className="eyebrow">More Ways to Join Us</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
            <span className="text-chrome">Flexible Pathways</span>{" "}
            <span className="text-iris">to Build Together.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Whether you want a structured internship, project-based freelance sprints, or joint
            technical research.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {OPPORTUNITIES.map((op) => {
            const Icon = op.icon;
            return (
              <TiltCard key={op.title} className="p-8">
                <div className="depth-1 flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-aurora shadow-glow">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full border border-aurora/40 bg-accent/20 px-2.5 py-0.5 font-mono text-[0.65rem] text-aurora">
                        {op.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-foreground">{op.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {op.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4">
                    <Button asChild variant="glass" size="sm" className="w-full justify-between">
                      <Link to="/contact">
                        Express Interest <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </Section>

      {/* Direct Application Banner */}
      <Section>
        <div className="glass-panel scanline p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="eyebrow">Direct Application</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Don't see your exact role? Pitch us what you can build.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                We are always excited to hear from exceptional builders, researchers, and designers.
                Send your resume, GitHub profile, or portfolio directly to our official company
                inbox:
              </p>
              <div className="mt-4">
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-mono text-sm text-aurora hover:underline"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <a href={SITE.careersFormUrl} target="_blank" rel="noreferrer">
                  Open Application Form <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
