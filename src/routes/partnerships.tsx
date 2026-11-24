import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Handshake,
  Cpu,
  Code2,
  Building2,
  Briefcase,
  Share2,
  CheckCircle2,
  Send,
  Mail,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partnerships")({
  head: () => ({
    meta: [
      { title: "Partnerships — Let's Build Together | GENZIQ" },
      {
        name: "description",
        content:
          "Partner with GENZIQ. Explore Technology Partnerships, Development Partnerships, Vendor Partnerships, Business Collaborations, and Joint Project Opportunities.",
      },
      { property: "og:title", content: "GENZIQ Partnerships — Let's Build Together" },
      {
        property: "og:description",
        content:
          "Strategic partnerships and collaborations with GENZIQ in AI, custom software, and emerging technology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnershipsPage,
});

const PARTNERSHIP_AREAS = [
  {
    icon: Cpu,
    title: "Technology Partnerships",
    subtitle: "Platforms, Model Providers & Toolchains",
    description:
      "Integrate cutting-edge AI architectures, foundation model APIs, vector databases, and cloud infrastructure with our applied engineering capabilities to deliver seamless, state-of-the-art solutions.",
    benefits: [
      "Deep integration with frontier AI models and LLM providers",
      "Benchmarked vector search and hybrid retrieval architectures",
      "Co-marketing and joint technical case study publication",
    ],
  },
  {
    icon: Code2,
    title: "Development Partnerships",
    subtitle: "Agencies, Studios & Consultancies",
    description:
      "We partner with software agencies, digital product studios, and IT consultancies to provide specialized AI, machine learning, and computer vision firepower for client deliverables.",
    benefits: [
      "White-label or co-branded AI development capacity",
      "Rapid prototyping sprints for client pitches and RFPs",
      "Seamless code handoffs with documentation and clean git history",
    ],
  },
  {
    icon: Building2,
    title: "Vendor Partnerships",
    subtitle: "Hardware, Cloud & SaaS Providers",
    description:
      "Collaborate with edge compute manufacturers, camera sensor providers, GPU cloud platforms, and enterprise data providers to build certified, end-to-end hardware-software systems.",
    benefits: [
      "Hardware-optimized model quantization (ONNX, TensorRT)",
      "Edge-to-cloud automated deployment pipelines",
      "Verified enterprise interoperability and technical testing",
    ],
  },
  {
    icon: Briefcase,
    title: "Business Collaborations",
    subtitle: "Enterprises & Domain Leaders",
    description:
      "Team up with forward-thinking businesses across logistics, infrastructure, finance, and commerce looking to automate complex operational workflows with custom proprietary AI.",
    benefits: [
      "Direct technical consultation with zero agency bureaucracy",
      "Custom workflow automation designed for your exact domain",
      "Measurable efficiency gains and rapid return on investment",
    ],
  },
  {
    icon: Share2,
    title: "Joint Project Opportunities",
    subtitle: "Co-Development & Shared IP",
    description:
      "Collaborative co-creation of innovative commercial software products, open-source AI libraries, and applied research experiments where both parties share equity, risk, and upside.",
    benefits: [
      "Pooled engineering talent and shared development risk",
      "Co-ownership of innovative technology and intellectual property",
      "Accelerated launch timelines through shared focus",
    ],
  },
];

const PARTNER_BENEFITS = [
  {
    title: "Agile & Direct Velocity",
    desc: "Work directly with hands-on engineers and founders. No account managers, bureaucracy, or endless slide decks.",
  },
  {
    title: "Applied AI Expertise",
    desc: "From RAG pipelines and autonomous agents to computer vision edge models, we build what actually works.",
  },
  {
    title: "Building in the Open",
    desc: "Transparent roadmaps, honest feasibility evaluations, and complete shared accountability from day one.",
  },
];

function PartnershipsPage() {
  const [partnerType, setPartnerType] = useState("Technology Partnerships");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in your name and email address.");
      return;
    }

    const subject = `[Partner Inquiry] ${partnerType} - ${name} (${organization || "Independent"})`;
    const body = `Hi GENZIQ Team,\n\nI would like to explore a partnership with GENZIQ.\n\nName: ${name}\nEmail: ${email}\nOrganization: ${organization || "N/A"}\nPartnership Category: ${partnerType}\n\nCollaboration Details:\n${message}\n\nBest regards,\n${name}`;

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Partnership transmission prepared", {
      description: "Opening your email app to transmit to genziq.team@gmail.com",
    });
  };

  return (
    <>
      <PageIntro
        eyebrow="Station 07 · Alliance — Strategic Collaborations"
        title={
          <>
            <span className="text-chrome">Let's Build</span>{" "}
            <span className="text-iris">Together.</span>
          </>
        }
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#partner-form">
                Become a Partner <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          GENZIQ partners with innovative enterprises, digital agencies, model providers, and
          independent builders to co-create high-impact AI systems and scalable software. We believe
          the most transformative technology is built through shared ambition and complementary
          strengths.
        </p>
      </PageIntro>

      {/* Partnership Categories */}
      <Section className="-mt-8 md:-mt-16">
        <div>
          <p className="eyebrow">Collaboration Streams</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
            <span className="text-chrome">Five Pathways</span>{" "}
            <span className="text-iris">to Partner with GENZIQ.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Explore our partnership models. We tailor every relationship for maximum mutual value.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PARTNERSHIP_AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <TiltCard key={area.title} className="flex flex-col justify-between p-8">
                <div className="depth-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-aurora shadow-glow">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">{area.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-champagne">
                    {area.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-border/60 pt-5">
                    <p className="font-mono text-[0.7rem] uppercase tracking-wider text-aurora">
                      Mutual Advantages:
                    </p>
                    {area.benefits.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-2 text-xs leading-relaxed text-foreground/90"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aurora" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="depth-1 mt-6 border-t border-border/40 pt-4">
                  <a
                    href="#partner-form"
                    onClick={() => setPartnerType(area.title)}
                    className="inline-flex items-center gap-1 font-mono text-xs text-aurora transition-colors hover:text-white"
                  >
                    Select this stream <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </Section>

      {/* Why Partner with Us */}
      <Section>
        <div>
          <p className="eyebrow">The GENZIQ Advantage</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
            <span className="text-chrome">Why Leading Builders</span>{" "}
            <span className="text-iris">Choose to Align with Us.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PARTNER_BENEFITS.map((b) => (
            <TiltCard key={b.title} className="p-8">
              <div className="depth-1">
                <h3 className="text-xl font-semibold text-foreground">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Become a Partner Form */}
      <Section>
        <div id="partner-form" className="scroll-mt-28">
          <div className="glass-panel scanline mx-auto max-w-3xl p-8 md:p-12">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-aurora" />
              <p className="eyebrow">Initiate an Alliance</p>
            </div>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Become a Partner</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Tell us about your organization and how you envision collaborating. All partnership
              inquiries are reviewed directly by our founding engineering team.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-champagne mb-2">
                  Select Partnership Stream
                </label>
                <div className="flex flex-wrap gap-2">
                  {PARTNERSHIP_AREAS.map((a) => (
                    <button
                      key={a.title}
                      type="button"
                      onClick={() => setPartnerType(a.title)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                        partnerType === a.title
                          ? "border-aurora bg-accent text-foreground font-medium"
                          : "border-border text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {a.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  Your Name *
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Sharma"
                    className="mt-2 rounded-xl border-border bg-glass-strong"
                  />
                </label>
                <label className="block text-sm">
                  Work Email *
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="mt-2 rounded-xl border-border bg-glass-strong"
                  />
                </label>
              </div>

              <label className="block text-sm">
                Company / Organization / Project Name
                <Input
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Acme Tech Studio / Independent"
                  className="mt-2 rounded-xl border-border bg-glass-strong"
                />
              </label>

              <label className="block text-sm">
                How would you like to build together?
                <Textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe your proposal, project scope, or technological synergy..."
                  className="mt-2 rounded-xl border-border bg-glass-strong"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <Button type="submit" variant="hero" size="xl">
                  Become a Partner <Send className="ml-1.5 h-4 w-4" />
                </Button>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-aurora hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" /> Direct email: {SITE.email}
                </a>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
