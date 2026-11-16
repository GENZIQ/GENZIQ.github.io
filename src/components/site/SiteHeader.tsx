import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import logo from "@/assets/genziq-logo.png";
import { STATIONS } from "@/components/universe/stations";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-2 pr-2 md:pr-3">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="GENZIQ logo" className="h-10 w-10 rounded-full transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110" width={40} height={40} />
          <span className="font-display text-sm font-semibold tracking-[0.25em] text-chrome">GENZIQ</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {STATIONS.map((s) => (
            <Link
              key={s.id}
              to={s.path}
              className="jelly-hover group flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
              activeOptions={{ exact: true }}
            >
              <span className="font-mono text-[0.65rem] text-champagne">0{s.index}</span>
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="sm" className="hidden px-5 sm:inline-flex">
            <Link to="/contact">Say hello</Link>
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="glass-strong animate-rise mx-auto mt-3 max-w-6xl rounded-3xl p-3 lg:hidden" aria-label="Mobile">
          {STATIONS.map((s) => (
            <Link
              key={s.id}
              to={s.path}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-4 text-foreground transition-colors hover:bg-accent"
              activeProps={{ className: "bg-accent" }}
              activeOptions={{ exact: true }}
            >
              <span className="font-display text-lg">{s.label}</span>
              <span className="font-mono text-xs text-champagne">0{s.index} · {s.codename}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
