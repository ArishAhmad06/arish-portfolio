import 'dotenv/config';
import { z } from 'zod';

/**
 * Every environment variable the server reads is declared and validated here.
 * A bad value fails at startup instead of surfacing later as a confusing bug.
 */
const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),

  /** Allowed browser origin(s) in development, comma separated. */
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),

  /** Optional override for where the built client lives. */
  CLIENT_DIST: z.preprocess(emptyToUndefined, z.string().optional()),

  // Email delivery (SMTP). All of these must be set for the contact form to work.
  SMTP_HOST: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_PORT: z.preprocess(emptyToUndefined, z.coerce.number().int().positive().default(587)),
  SMTP_USER: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_PASS: z.preprocess(emptyToUndefined, z.string().optional()),
  RESEND_API_KEY: z.preprocess(emptyToUndefined, z.string().optional()),
  CONTACT_TO_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
  CONTACT_FROM_EMAIL: z.preprocess(emptyToUndefined, z.string().optional()),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === 'production';
