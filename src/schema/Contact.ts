import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1),
  company: z.string().optional(),
});

export type Contact = z.infer<typeof contactSchema>;
