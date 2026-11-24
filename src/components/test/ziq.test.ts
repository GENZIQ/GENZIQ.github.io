import { describe, expect, it } from "vitest";

import { reactionForPath, scrollMilestone, type ScrollMilestone } from "@/lib/ziq";

describe("Ziq scroll milestones", () => {
  it("says nothing on pages too short to scroll", () => {
    expect(scrollMilestone(0, 800, 900, new Set(), 0)).toBeNull();
  });

  it("cheers halfway, then at the end, each only once", () => {
    const seen = new Set<ScrollMilestone>();
    expect(scrollMilestone(1100, 800, 3000, seen, 1100)).toBe("half");
    seen.add("half");
    expect(scrollMilestone(1200, 800, 3000, seen, 1200)).toBeNull();
    expect(scrollMilestone(2190, 800, 3000, seen, 2190)).toBe("end");
    seen.add("end");
    expect(scrollMilestone(2200, 800, 3000, seen, 2200)).toBeNull();
  });

  it("only welcomes you back to the top after scrolling at least 600px", () => {
    expect(scrollMilestone(0, 800, 3000, new Set(), 400)).toBeNull();
    expect(scrollMilestone(0, 800, 3000, new Set(), 700)).toBe("top");
  });
});

describe("Ziq page greetings", () => {
  it("has its own greeting for every core page and a fallback", () => {
    for (const p of [
      "/",
      "/about",
      "/services",
      "/products",
      "/innovation",
      "/careers",
      "/partnerships",
      "/contact",
      "/privacy",
      "/terms",
    ]) {
      expect(reactionForPath(p).line).not.toBe(reactionForPath("/nowhere").line);
    }
  });
});
