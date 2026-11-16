import { Link } from "@tanstack/react-router";

import logo from "@/assets/genziq-logo.png";
import { STATIONS } from "@/components/universe/stations";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 px-4 pb-10 pt-24 md:px-6">
      <div className="glass-panel mx-auto flex max-w-6xl flex-col gap-10 p-8 md:flex-row md:items-end md:justify-between md:p-10">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-full" width={48} height={48} loading="lazy" />
            <span className="font-display text-lg tracking-[0.25em] text-chrome">GENZIQ</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{SITE.tagline}</p>
          <p className="mt-2 text-xs text-muted-foreground">A new technology company, just getting started.</p>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm" aria-label="Footer">
          {STATIONS.map((s) => (
            <Link key={s.id} to={s.path} className="text-muted-foreground transition-colors hover:text-aurora">
              {s.label}
            </Link>
          ))}
          <a href={SITE.github} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-aurora">
            GitHub
          </a>
          <a href={SITE.founder.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-aurora">
            Founder on LinkedIn
          </a>
          <a href={`mailto:${SITE.email}`} className="text-muted-foreground transition-colors hover:text-aurora">
            {SITE.email}
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-center font-mono text-[0.65rem] tracking-widest text-muted-foreground">
        © {new Date().getFullYear()} GENZIQ · DAY ONE OF MANY
      </p>
    </footer>
  );
}
