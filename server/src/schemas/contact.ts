import { z } from 'zod';

/**
 * Contact form payload. Keep in sync with client/src/lib/validation.ts.
 * `website` is a honeypot: real users never see or fill it.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  subject: z.string().trim().min(3, 'Please add a subject.').max(150),
  message: z.string().trim().min(10, 'Please write at least 10 characters.').max(2000),
  website: z.string().max(200).optional().default(''),
});

export type ContactInput = z.infer<typeof contactSchema>;
