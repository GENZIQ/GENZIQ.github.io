import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles } from "lucide-react";

import logo from "@/assets/genziq-logo.png";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 px-4 pb-12 pt-28 md:px-6">
      <div className="glass-panel mx-auto max-w-7xl rounded-3xl p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="group inline-flex items-center gap-3">
              <img
                src={logo}
                alt="GENZIQ Logo"
                className="h-12 w-12 rounded-full transition-transform duration-500 group-hover:rotate-180"
                width={48}
                height={48}
                loading="lazy"
              />
              <span className="font-display text-xl font-bold tracking-[0.25em] text-chrome">
                GENZIQ
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline}
            </p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
              An AI and software engineering company focused on building practical, production-ready
              technology solutions.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-glass px-3.5 py-1.5 font-mono text-xs text-aurora transition-colors hover:border-aurora hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                {SITE.email}
              </a>
              <Link
                to="/careers"
                className="inline-flex items-center gap-1.5 rounded-full border border-aurora/40 bg-accent/30 px-3.5 py-1.5 text-xs text-aurora transition-colors hover:bg-accent"
              >
                <Sparkles className="h-3 w-3" />
                We're Hiring
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-champagne">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-aurora">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground transition-colors hover:text-aurora"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground transition-colors hover:text-aurora"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground transition-colors hover:text-aurora"
                >
                  Projects & Products
                </Link>
              </li>
              <li>
                <Link
                  to="/innovation"
                  className="text-muted-foreground transition-colors hover:text-aurora"
                >
                  Innovation Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Collaborate */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-champagne">
              Collaborate
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground transition-colors hover:text-aurora"
                >
                  Careers & Hiring
                </Link>
              </li>
              <li>
                <Link
                  to="/partnerships"
                  className="text-muted-foreground transition-colors hover:text-aurora"
                >
                  Partnerships
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground transition-colors hover:text-aurora"
                >
                  Contact & Enquiries
                </Link>
              </li>
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-aurora"
                >
                  GitHub <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-aurora"
                >
                  LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-champagne">
              Legal & Trust
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground transition-colors hover:text-aurora"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground transition-colors hover:text-aurora"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a
                  href={SITE.founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-aurora"
                >
                  Founder LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GENZIQ GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-aurora hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="GENZIQ LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-aurora hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="GENZIQ Email"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-aurora hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p className="font-mono tracking-wider">
            © {new Date().getFullYear()} GENZIQ · All rights reserved.
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-champagne">
            genziq.in · Building what's next, from day one
          </p>
        </div>
      </div>
    </footer>
  );
}
