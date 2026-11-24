import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";

import logo from "@/assets/genziq-logo.png";
import { STATIONS } from "@/components/universe/stations";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className="glass-strong mx-auto flex max-w-7xl items-center justify-between rounded-full py-1.5 pl-2 pr-2 md:py-2 md:pl-3 md:pr-3">
        <Link
          to="/"
          className="group flex items-center gap-2.5 md:gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="GENZIQ logo"
            className="h-9 w-9 rounded-full transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110 md:h-10 md:w-10"
            width={40}
            height={40}
          />
          <span className="font-display text-xs font-semibold tracking-[0.25em] text-chrome sm:text-sm">
            GENZIQ
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:gap-1 lg:flex" aria-label="Main">
          {STATIONS.map((s) => (
            <Link
              key={s.id}
              to={s.path}
              className="jelly-hover group flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground xl:px-3.5 xl:text-sm"
              activeProps={{ className: "bg-accent text-foreground shadow-sm" }}
              activeOptions={{ exact: true }}
            >
              <span className="font-mono text-[0.6rem] text-champagne xl:text-[0.65rem]">
                0{s.index}
              </span>
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="hero"
            size="sm"
            className="hidden px-4 text-xs font-medium sm:inline-flex md:px-5 md:text-sm"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="h-9 w-9 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          className="glass-strong animate-rise mx-auto mt-2 max-w-lg rounded-3xl p-3 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {STATIONS.map((s) => (
              <Link
                key={s.id}
                to={s.path}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-foreground transition-colors hover:bg-accent"
                activeProps={{ className: "bg-accent font-semibold text-aurora" }}
                activeOptions={{ exact: true }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-champagne">0{s.index}</span>
                  <span className="font-display text-base">{s.label}</span>
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  {s.codename}
                </span>
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              <Button asChild variant="hero" size="lg" className="w-full justify-center">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Start a Project <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
