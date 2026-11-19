import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { HttpError } from '../lib-errors.js';
import type { ContactInput } from '../schemas/contact.js';

const UNCONFIGURED = 'The contact service is not configured yet. Please email me directly.';
const FAILED = 'The message could not be delivered. Please email me directly.';

const hasResend = () => Boolean(env.RESEND_API_KEY && env.CONTACT_TO_EMAIL);
const hasSmtp = () => Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.CONTACT_TO_EMAIL);

export function isMailConfigured(): boolean {
  return hasResend() || hasSmtp();
}

/** Strips line breaks so user input can never inject extra email headers. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

function buildMessage(input: ContactInput) {
  return {
    subject: `[Portfolio] ${oneLine(input.subject)}`,
    text: `From: ${oneLine(input.name)} <${input.email}>\n\n${input.message}`,
  };
}

async function sendWithResend(input: ContactInput): Promise<void> {
  const { subject, text } = buildMessage(input);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: [env.CONTACT_TO_EMAIL],
      reply_to: input.email,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    logger.error({ status: response.status, body: await response.text() }, 'Resend rejected the message');
    throw new HttpError(502, FAILED);
  }
}

let transporter: Transporter | null = null;

async function sendWithSmtp(input: ContactInput): Promise<void> {
  transporter ??= nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: env.CONTACT_FROM_EMAIL ?? env.SMTP_USER,
    to: env.CONTACT_TO_EMAIL,
    replyTo: { name: oneLine(input.name), address: input.email },
    ...buildMessage(input),
  });
}

export async function sendContactEmail(input: ContactInput): Promise<void> {
  if (!isMailConfigured()) throw new HttpError(503, UNCONFIGURED);

  try {
    if (hasResend()) await sendWithResend(input);
    else await sendWithSmtp(input);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    logger.error({ err: error }, 'Sending contact email failed');
    throw new HttpError(502, FAILED);
  }
}