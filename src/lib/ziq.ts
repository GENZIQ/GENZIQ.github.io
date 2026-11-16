// Pure helpers for Ziq, the decorative buddy: what it does on each page and while scrolling.
export type ZiqMood = "idle" | "happy" | "wink" | "love" | "star" | "wow" | "dizzy" | "sleepy";
export type ZiqAnim = "none" | "hop" | "spin" | "flip" | "shake" | "wave" | "squish" | "dizzy" | "enter";

export interface ZiqReaction {
  mood: ZiqMood;
  anim: ZiqAnim;
  line: string;
}

export const PAGE_REACTIONS: Record<string, ZiqReaction> = {
  "/": { mood: "happy", anim: "enter", line: "Hi, I'm Ziq ✦ welcome to GENZIQ!" },
  "/about": { mood: "wink", anim: "flip", line: "This is where it all began ✦" },
  "/products": { mood: "star", anim: "spin", line: "Ideas brewing here… all still concepts!" },
  "/innovation": { mood: "wow", anim: "shake", line: "Psst — drag the sliders and squish the blob!" },
  "/careers": { mood: "happy", anim: "wave", line: "No openings right now, but say hi anyway ♡" },
  "/contact": { mood: "love", anim: "hop", line: "Even a one-letter hello works ♡" },
};
const NEW_PAGE: ZiqReaction = { mood: "wow", anim: "hop", line: "Ooh, a new corner of the universe ✦" };

export function reactionForPath(path: string): ZiqReaction {
  return PAGE_REACTIONS[path] ?? NEW_PAGE;
}

export const BOOP_LINES = ["Boop! ♡", "Hehe, that tickles ✦", "Infinite possibilities!", "You found me ♡", "Wheee ✧"];
export const CATCH_LINES = ["Got one! ✦", "Two! You're quick ✧", "All three! Sparkle master ♡"];

export type ScrollMilestone = "half" | "end" | "top";

/**
 * Which scroll milestone (if any) was just reached. Each fires once per page,
 * except "top", which needs the visitor to have travelled at least 600px first.
 */
export function scrollMilestone(
  y: number,
  viewport: number,
  total: number,
  seen: Set<ScrollMilestone>,
  maxY: number,
): ScrollMilestone | null {
  const room = total - viewport;
  if (room < 300) return null;
  if (!seen.has("end") && y >= room - 40) return "end";
  if (!seen.has("half") && y >= room / 2 && y < room - 40) return "half";
  if (!seen.has("top") && y < 40 && maxY > 600) return "top";
  return null;
}
