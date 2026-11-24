import { describe, expect, it } from "vitest";

import { STATIONS, stationForPath } from "@/components/universe/stations";
import { buildMailto, contactSchema } from "@/lib/contact";
import { SITE } from "@/lib/site";

describe("site stations", () => {
  it("has the 8 core navigation stations", () => {
    expect(STATIONS.map((s) => s.path)).toEqual([
      "/",
      "/about",
      "/services",
      "/products",
      "/innovation",
      "/careers",
      "/partnerships",
      "/contact",
    ]);
  });

  it("maps each page (with or without trailing slash) to its own station", () => {
    expect(stationForPath("/about").id).toBe("about");
    expect(stationForPath("/services").id).toBe("services");
    expect(stationForPath("/products").id).toBe("products");
    expect(stationForPath("/careers/").id).toBe("careers");
    expect(stationForPath("/partnerships").id).toBe("partnerships");
    expect(stationForPath("/contact/").id).toBe("contact");
    expect(stationForPath("/nowhere").id).toBe("home");
  });
});

describe("contact form", () => {
  it("rejects an invalid email", () => {
    const r = contactSchema.safeParse({
      name: "Alex",
      email: "invalid-email",
      category: "Business Enquiries",
      message: "Hello GENZIQ team",
    });
    expect(r.success).toBe(false);
  });

  it("accepts a valid message with category", () => {
    const base = {
      name: "Alex",
      email: "alex@example.com",
      category: "Project Discussions",
    };
    expect(contactSchema.safeParse({ ...base, message: "Looking for an AI solution" }).success).toBe(
      true
    );
    expect(contactSchema.safeParse({ ...base, message: "   " }).success).toBe(false);
  });

  it("builds a mailto addressed to the official inbox with category in subject", () => {
    const url = buildMailto("genziq.team@gmail.com", {
      name: "Ria",
      email: "ria@example.com",
      category: "Business Enquiries",
      message: "Interested in AI solutions",
    });
    expect(url.startsWith("mailto:genziq.team@gmail.com?subject=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Business Enquiries");
    expect(decodeURIComponent(url)).toContain("ria@example.com");
  });
});

describe("company facts", () => {
  it("links the founder's LinkedIn, official company LinkedIn, and GENZIQ GitHub organization", () => {
    expect(SITE.founder.linkedin).toBe("https://www.linkedin.com/in/anushree-n-488756238");
    expect(SITE.github).toBe("https://github.com/GENZIQ");
    expect(SITE.linkedin).toBe("https://www.linkedin.com/company/144165173/");
    expect(SITE.email).toBe("genziq.team@gmail.com");
    expect(SITE.url).toBe("https://genziq.in");
  });

  it("is actively hiring with open internship positions", () => {
    expect(SITE.openRoles.length).toBeGreaterThan(0);
    expect(SITE.openRoles).toContain("AI & ML Intern");
    expect(SITE.openRoles).toContain("Python Developer Intern");
    expect(SITE.openRoles).toContain("Full Stack Developer Intern");
  });
});
