import type { ReactNode } from "react";

import { Reveal } from "./Reveal";

// First screen of every page: copy on the left, the 3D station shows on the right.
export function PageIntro({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[100svh] items-center px-4 pb-16 pt-32 md:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-xl">
          <p className="eyebrow animate-rise">{eyebrow}</p>
          <h1 className="animate-rise mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl" style={{ animationDelay: "80ms" }}>
            {title}
          </h1>
          {children && (
            <div className="animate-rise mt-6 text-base leading-relaxed text-muted-foreground md:text-lg" style={{ animationDelay: "160ms" }}>
              {children}
            </div>
          )}
          {actions && (
            <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative px-4 py-16 md:px-6 md:py-24 ${className}`}>
      <Reveal className="mx-auto max-w-6xl">
        <div className="r3d-soft">{children}</div>
      </Reveal>
    </section>
  );
}
