import { z } from "zod";

export const CONTACT_CATEGORIES = [
  "Business Enquiries",
  "Project Discussions",
  "Vendor Partnerships",
  "Recruitment",
  "Technical Collaborations",
  "General Enquiries",
] as const;

export type ContactCategory = (typeof CONTACT_CATEGORIES)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  organization: z.string().trim().max(100).optional(),
  category: z.string().trim().min(1, "Please choose a category").max(100),
  message: z.string().trim().min(1, "Please write a message").max(3000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function buildMailto(to: string, data: ContactInput): string {
  const org = data.organization ? ` (${data.organization})` : "";
  const subject = `[GENZIQ: ${data.category}] From ${data.name}${org}`;
  const body = `Hi GENZIQ Team,\n\nCategory: ${data.category}\nName: ${data.name}\nEmail: ${data.email}\nOrganization: ${data.organization || "N/A"}\n\nMessage:\n${data.message}\n\n— Sent via genziq.in contact signal`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
