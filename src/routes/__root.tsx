import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StationHud } from "@/components/site/StationCard";
import { CursorSparkles } from "@/components/site/CursorGlow";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { ZiqBuddy } from "@/components/site/ZiqBuddy";
import { UniverseMount } from "@/components/universe/UniverseMount";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-transparent px-4">
      <div className="glass-panel mx-auto max-w-md p-8 text-center md:p-10">
        <span className="font-mono text-xs uppercase tracking-widest text-champagne">
          Error 404 · Deep Space
        </span>
        <h1 className="mt-4 bg-gradient-to-r from-white via-orchid to-iris bg-clip-text text-6xl font-bold tracking-tight text-transparent">
          404
        </h1>
        <h2 className="mt-3 text-xl font-semibold text-foreground">Lost in Deep Space</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The coordinate you're seeking doesn't exist or has moved beyond our current orbit.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:bg-primary/90 hover:scale-105"
          >
            Return Home
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full border border-border bg-glass px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-accent"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Each content route sets its own head(). Never add og:image or twitter:image here.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GENZIQ — Intelligence. Innovation. Infinite Possibilities." },
      {
        name: "description",
        content:
          "GENZIQ is an AI and software company building practical technology solutions, custom software, LLM applications, autonomous agents, and web applications.",
      },
      { name: "author", content: "GENZIQ" },
      {
        name: "google-site-verification",
        content: "NZAVSOMUm0VUQRpLGNsMtYrNVCQ6N5LGp5us2rhGDg4",
      },
      { name: "theme-color", content: "#04060d" },
      {
        property: "og:title",
        content: "GENZIQ — Intelligence. Innovation. Infinite Possibilities.",
      },
      {
        property: "og:description",
        content:
          "AI & Machine Learning, Custom Software, Generative AI & LLM Applications, AI Agents, and Scalable Web Solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          description:
            "GENZIQ is an AI and software company focused on building practical technology solutions, intelligent systems, and scalable web software.",
          foundingDate: SITE.foundingYear,
          email: SITE.email,
          sameAs: [SITE.github, SITE.linkedin, SITE.founder.linkedin],
          founder: {
            "@type": "Person",
            name: SITE.founder.name,
            url: SITE.founder.linkedin,
            sameAs: [SITE.founder.linkedin],
          },
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Unbounded:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <UniverseMount />
      <SiteHeader />
      <main className="relative z-10">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
      <StationHud />
      <ScrollProgress />
      <CursorSparkles />
      <ZiqBuddy />
      <Toaster position="bottom-left" />
    </QueryClientProvider>
  );
}
