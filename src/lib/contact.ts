import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  topic: z.string().trim().max(60),
  message: z.string().trim().min(1, "Please write a message").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function buildMailto(to: string, data: ContactInput): string {
  const subject = `[GENZIQ] ${data.topic || "Hello"} — from ${data.name}`;
  const body = `${data.message}\n\n— ${data.name} (${data.email})`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
