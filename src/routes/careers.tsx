import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at GENZIQ — Not hiring yet, building AI services" },
      {
        name: "description",
        content: "GENZIQ isn't hiring right now. Meanwhile we provide AI services — see what we can build with you.",
      },
      { property: "og:title", content: "Careers at GENZIQ — No openings currently" },
      { property: "og:description", content: "No openings currently. GENZIQ provides AI services in the meantime." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Careers,
});

const SERVICES = [
  { n: "01", title: "AI integration", text: "Add language or image AI to an existing website, app or workflow." },
  { n: "02", title: "Custom AI assistants", text: "Chat assistants shaped around your content, tone and tasks." },
  { n: "03", title: "Automation & prototypes", text: "Quick AI-powered demos and automations to test an idea before you invest." },
];

function Careers() {
  return (
    <>
      <PageIntro
        eyebrow="Station 05 · Launchpad"
        title={
          <>
            <span className="text-chrome">No openings</span> <span className="text-iris">currently.</span>
          </>
        }
        actions={
          <>
            <Button asChild variant="hero" size="xl">
              <a href="#services">
                See our AI services <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={SITE.github} target="_blank" rel="noreferrer">
                Follow on GitHub <Github />
              </a>
            </Button>
          </>
        }
      >
      </PageIntro>

      <Section>
        <div id="services" className="scroll-mt-28">
          <p className="eyebrow">What we do today</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold md:text-4xl">
            <span className="text-chrome">We provide</span> <span className="text-iris">AI services.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            While the team is still just getting started, GENZIQ works directly with people and businesses who want to
            put AI to real use.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SERVICES.map((x) => (
              <TiltCard key={x.n} className="p-7">
                <div className="depth-1">
                  <span className="font-display text-3xl text-iris">{x.n}</span>
                  <h3 className="mt-4 text-lg">{x.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.text}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel flex flex-col items-start gap-6 p-8 md:p-10">
            <p className="eyebrow">Have an AI idea?</p>
            <h3 className="text-2xl font-semibold">Tell us what you'd like to build.</h3>
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">
                Talk about AI services <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="glass-panel flex flex-col items-start gap-6 p-8 md:p-10">
            <p className="eyebrow">Want to join later?</p>
            <h3 className="text-2xl font-semibold">Stay close to the launch.</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Follow GenzIQ on GitHub or connect with our founder on LinkedIn to hear when the first seat opens.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="glass" size="lg">
                <a href={SITE.github} target="_blank" rel="noreferrer">
                  <Github /> GitHub
                </a>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href={SITE.founder.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin /> LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
