import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Send,
  Mail,
  Linkedin,
  Github,
  Check,
  Copy,
  Building2,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { labState } from "@/components/universe/lab-state";
import {
  CONTACT_CATEGORIES,
  buildMailto,
  contactSchema,
  type ContactCategory,
} from "@/lib/contact";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact GENZIQ — Get in Touch & Enquiries" },
      {
        name: "description",
        content:
          "Contact GENZIQ for Business Enquiries, Project Discussions, Vendor Partnerships, Recruitment, Technical Collaborations, and General Enquiries. Official email: genziq.team@gmail.com.",
      },
      { property: "og:title", content: "Contact GENZIQ — Send a Transmission" },
      {
        property: "og:description",
        content:
          "Reach out to GENZIQ at genziq.team@gmail.com. We welcome project discussions, collaborations, and hiring inquiries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [category, setCategory] = useState<ContactCategory>(CONTACT_CATEGORIES[0]);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    toast.success("Email copied to clipboard", {
      description: SITE.email,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      organization: fd.get("organization") || undefined,
      category,
      message: fd.get("message"),
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      return;
    }

    setErrors({});
    labState.pulseAt = performance.now();
    window.location.href = buildMailto(SITE.email, parsed.data);
    toast.success("Transmission prepared", {
      description: `Opening your email client to send to ${SITE.email}`,
    });
  };

  const field = "mt-2 rounded-xl border-border bg-glass-strong";

  return (
    <>
      <PageIntro
        eyebrow="Station 08 · Beacon — Direct Transmissions"
        title={
          <>
            <span className="text-chrome">Get in touch with</span>{" "}
            <span className="text-iris">GENZIQ.</span>
          </>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          Business enquiries, project discussions, vendor partnerships, recruitment, technical
          collaborations, or general questions — every message is read by our core engineering team.
        </p>

        {/* Email Pill Card */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-aurora/50 bg-accent/40 px-4 py-2 font-mono text-sm text-foreground shadow-glow">
            <Mail className="h-4 w-4 text-aurora" />
            <a href={`mailto:${SITE.email}`} className="hover:underline">
              {SITE.email}
            </a>
          </div>
          <Button
            type="button"
            variant="glass"
            size="sm"
            onClick={handleCopyEmail}
            className="rounded-full px-4"
          >
            {copied ? (
              <>
                <Check className="mr-1 h-3.5 w-3.5 text-emerald-400" /> Copied
              </>
            ) : (
              <>
                <Copy className="mr-1 h-3.5 w-3.5" /> Copy Email
              </>
            )}
          </Button>
        </div>
      </PageIntro>

      {/* Main Grid: Form + Direct Channels */}
      <Section className="-mt-16 md:-mt-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Transmission Form */}
          <form onSubmit={onSubmit} noValidate className="glass-panel p-8 md:p-12 rounded-3xl">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-aurora" />
              <p className="eyebrow">Send Transmission</p>
            </div>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Select Enquiry Category</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose the category that best matches your message so it reaches the right specialist.
            </p>

            <div
              className="mt-6 flex flex-wrap gap-2"
              role="radiogroup"
              aria-label="Contact Category"
            >
              {CONTACT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="radio"
                  aria-checked={category === cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs transition-colors",
                    category === cat
                      ? "border-aurora bg-accent text-foreground font-semibold shadow-glow"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                Full Name *
                <Input
                  name="name"
                  autoComplete="name"
                  placeholder="e.g. John Doe"
                  className={field}
                  aria-invalid={!!errors["name"]}
                />
                {errors["name"] && (
                  <span className="mt-1 block text-xs text-destructive">{errors["name"]}</span>
                )}
              </label>

              <label className="block text-sm">
                Email Address *
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  className={field}
                  aria-invalid={!!errors["email"]}
                />
                {errors["email"] && (
                  <span className="mt-1 block text-xs text-destructive">{errors["email"]}</span>
                )}
              </label>
            </div>

            <label className="mt-5 block text-sm">
              Organization / Company (Optional)
              <Input
                name="organization"
                placeholder="e.g. Startup Lab / Company Name"
                className={field}
              />
            </label>

            <label className="mt-5 block text-sm">
              Your Message *
              <Textarea
                name="message"
                rows={6}
                placeholder={`Tell us about your requirements, project scope, or what you'd like to achieve regarding ${category}...`}
                className={field}
                aria-invalid={!!errors["message"]}
              />
              {errors["message"] && (
                <span className="mt-1 block text-xs text-destructive">{errors["message"]}</span>
              )}
            </label>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Button type="submit" variant="hero" size="xl">
                Transmit Signal <Send className="ml-1.5 h-4 w-4" />
              </Button>
              <span className="font-mono text-xs text-muted-foreground">
                Destination: <span className="text-aurora">{SITE.email}</span>
              </span>
            </div>
          </form>

          {/* Official Details & Channels */}
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-3xl">
              <p className="eyebrow">Official Communications</p>
              <h3 className="mt-2 text-xl font-semibold">Company Inquiries</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                All business communications, project inquiries, and career applications should be
                directed to our official mailbox:
              </p>
              <div className="mt-4 rounded-xl border border-border/80 bg-glass/60 p-4">
                <span className="block font-mono text-xs text-champagne">Official Email</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-1 block font-mono text-sm font-semibold text-aurora hover:underline"
                >
                  {SITE.email}
                </a>
              </div>

              <div className="mt-4 rounded-xl border border-border/80 bg-glass/60 p-4">
                <span className="block font-mono text-xs text-champagne">Response SLA</span>
                <p className="mt-1 text-xs text-muted-foreground">
                  We reply within 24 business hours.
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl">
              <p className="eyebrow">Social &amp; Networks</p>
              <h3 className="mt-2 text-xl font-semibold">Official Channels</h3>
              <div className="mt-5 space-y-3">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-glass/50 p-4 transition-colors hover:border-aurora hover:bg-accent/40"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-aurora" />
                    <div>
                      <span className="block text-sm font-semibold">GENZIQ on LinkedIn</span>
                      <span className="text-xs text-muted-foreground">
                        Company Updates &amp; Hiring
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-glass/50 p-4 transition-colors hover:border-aurora hover:bg-accent/40"
                >
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-aurora" />
                    <div>
                      <span className="block text-sm font-semibold">GENZIQ on GitHub</span>
                      <span className="text-xs text-muted-foreground">
                        Open-Source Code &amp; Repos
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href={SITE.founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-glass/50 p-4 transition-colors hover:border-aurora hover:bg-accent/40"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-champagne" />
                    <div>
                      <span className="block text-sm font-semibold">Founder on LinkedIn</span>
                      <span className="text-xs text-muted-foreground">{SITE.founder.name}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
