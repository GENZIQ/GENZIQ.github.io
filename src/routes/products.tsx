import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, Section } from "@/components/site/PageIntro";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — What GENZIQ is building toward" },
      { name: "description", content: "GENZIQ hasn't shipped a product yet. These are the product directions we're exploring, shared openly." },
      { property: "og:title", content: "GENZIQ Products — in the making" },
      { property: "og:description", content: "The product directions GENZIQ is exploring, shared honestly at concept stage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

const CONCEPTS = [
  {
    icon: Bot,
    code: "GZ-01",
    title: "Applied AI tools",
    text: "Practical assistants that help people think, write and decide faster — without taking the human out of the loop.",
  },
  {
    icon: Workflow,
    code: "GZ-03",
    title: "Smart automation",
    text: "Quiet workflows that remove repetitive tasks, giving small teams and solo makers back their time.",
  },
];

function Products() {
  return (
    <>
      <PageIntro
        eyebrow="Station 03 · Blueprint"
        title={
          <>
            <span className="text-chrome">Products in</span> <span className="text-iris">the making.</span>
          </>
        }
      >
        <p>
          These capsules are blueprints — the directions we're exploring. We'll share each one here as it moves from idea to something you can actually use.
        </p>
      </PageIntro>

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {CONCEPTS.map(({ icon: Icon, code, title, text }) => (
            <TiltCard key={code} className="scanline flex flex-col p-7">
              <div className="depth-1 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{code}</span>
                <span className="rounded-full border border-aurora/50 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-aurora">
                  Concept
                </span>
              </div>
              <span className="depth-1 mt-8 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-aurora">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="depth-1 mt-6 text-xl">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </TiltCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold">Have a problem one of these could solve?</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Early conversations shape what we build. Tell us what you'd want.
          </p>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <Link to="/contact">
              Share an idea <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
