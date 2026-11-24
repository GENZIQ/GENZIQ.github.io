import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield, Mail } from "lucide-react";

import { PageIntro, Section } from "@/components/site/PageIntro";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — GENZIQ" },
      {
        name: "description",
        content:
          "GENZIQ Privacy Policy. Honest, transparent information regarding how we handle your data.",
      },
      { property: "og:title", content: "Privacy Policy — GENZIQ" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal & Trust · Data Protection"
        title={
          <>
            <span className="text-chrome">Privacy</span> <span className="text-iris">Policy.</span>
          </>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          Last updated: November 2026. We believe in privacy by default and radical transparency.
          Here is how GENZIQ treats your data when you visit our website or interact with our
          services.
        </p>
      </PageIntro>

      <Section className="-mt-16 md:-mt-28">
        <div className="glass-panel mx-auto max-w-4xl p-8 md:p-12 rounded-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-aurora" /> 1. Commitment to Privacy
            </h2>
            <p className="mt-3">
              GENZIQ (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website{" "}
              <a href={SITE.url} className="text-aurora hover:underline font-mono">
                {SITE.url}
              </a>
              . We do not sell your personal data, we do not deploy invasive advertising trackers,
              and we collect only the minimal information necessary to deliver our services,
              evaluate candidate applications, and respond to direct inquiries.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Information We Collect</h2>
            <p className="mt-3">
              When you use our website or contact us, we may collect the following information:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1.5 pl-2">
              <li>
                <strong className="text-foreground">Voluntary Contact Information:</strong> Your
                name, email address, organization name, and message content submitted through our
                contact and partnership forms.
              </li>
              <li>
                <strong className="text-foreground">Job Application Details:</strong> Resumes,
                portfolio links, GitHub profiles, and statements submitted via our careers form or
                email.
              </li>
              <li>
                <strong className="text-foreground">Technical Log Data:</strong> Minimal server logs
                (e.g., standard IP address, browser type) generated automatically by hosting
                providers for security and performance purposes.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              3. How We Use Your Information
            </h2>
            <p className="mt-3">
              We process your data strictly for legitimate business and engineering operations:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1.5 pl-2">
              <li>
                To evaluate and respond to client project requests, partnership proposals, and
                inquiries.
              </li>
              <li>
                To review candidate qualifications and manage internship and recruitment processes.
              </li>
              <li>
                To maintain website security, prevent spam, and improve infrastructure performance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Cookies and Tracking</h2>
            <p className="mt-3">
              We do not use third-party marketing cookies, targeted advertising pixels, or
              cross-site tracking tools. Any client-side storage used is strictly functional (such
              as remembering visual UI state or 3D scene parameters).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              5. Data Retention &amp; Security
            </h2>
            <p className="mt-3">
              We retain correspondence and project documentation only for as long as needed to
              fulfill the inquiry or collaborative agreement. We implement standard encryption and
              access control protocols to protect your information against unauthorized access or
              disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
            <p className="mt-3">
              You have the right to request access to the personal data we hold about you, request
              corrections, or ask for complete deletion of your records from our systems at any
              time.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-foreground">7. Contact Regarding Privacy</h2>
            <p className="mt-3">
              For any questions, data access requests, or privacy concerns, please contact our team
              directly at:
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-aurora">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${SITE.email}`} className="hover:underline">
                {SITE.email}
              </a>
            </div>
          </div>

          <div className="pt-4">
            <Button asChild variant="glass" size="lg">
              <Link to="/">
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
