import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, Mail } from "lucide-react";

import { PageIntro, Section } from "@/components/site/PageIntro";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — GENZIQ" },
      {
        name: "description",
        content:
          "GENZIQ Terms of Service and Conditions. Understand the terms governing the use of our website and services.",
      },
      { property: "og:title", content: "Terms and Conditions — GENZIQ" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal & Trust · Website Terms"
        title={
          <>
            <span className="text-chrome">Terms &amp;</span>{" "}
            <span className="text-iris">Conditions.</span>
          </>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          Last updated: November 2026. These terms govern your access to and use of the GENZIQ
          website, prototypes, and public software resources.
        </p>
      </PageIntro>

      <Section className="-mt-16 md:-mt-28">
        <div className="glass-panel mx-auto max-w-4xl p-8 md:p-12 rounded-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-aurora" /> 1. Acceptance of Terms
            </h2>
            <p className="mt-3">
              By accessing or using{" "}
              <a href={SITE.url} className="text-aurora hover:underline font-mono">
                {SITE.url}
              </a>
              , you agree to comply with and be bound by these Terms and Conditions. If you do not
              agree with any part of these terms, please discontinue using the website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Intellectual Property</h2>
            <p className="mt-3">
              Unless otherwise explicitly stated in an open-source license file, all content,
              graphics, 3D assets, logos, code snippets, and branding on this site are the
              intellectual property of GENZIQ and are protected by applicable copyright and
              trademark laws. Open-source repositories hosted on our GitHub organization are
              governed by their respective repository licenses (e.g., MIT, Apache 2.0).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              3. Prototypes and Experimental Builds
            </h2>
            <p className="mt-3">
              GENZIQ builds in public and frequently showcases active engineering prototypes,
              research bots, and proof-of-concepts. These prototypes are provided &quot;as-is&quot;
              for informational and testing purposes. Unless covered by a formal written client
              service agreement, prototypes may change or be updated without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              4. Client Services &amp; Contracts
            </h2>
            <p className="mt-3">
              Formal engineering engagements, software deliverables, custom AI integrations, and
              payment terms are governed by executed Master Services Agreements (MSA) and Statements
              of Work (SOW) entered into between GENZIQ and the respective client.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by applicable law, GENZIQ and its founders shall not
              be liable for any indirect, incidental, or consequential damages resulting from your
              use of this website or reliance on any material displayed herein.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Modifications to Terms</h2>
            <p className="mt-3">
              We reserve the right to revise these Terms and Conditions at any time. Continued use
              of our website following the posting of revisions constitutes your acceptance of the
              updated terms.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-foreground">7. Contact Information</h2>
            <p className="mt-3">
              If you have any questions or require legal clarification regarding these terms, please
              contact:
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
