import type { ContactFormValues } from './validation';

export interface ContactResult {
  ok: boolean;
  message: string;
}

/**
 * Sends the contact form to the server.
 * Resolves with ok = true ONLY when the server confirms the email was delivered.
 */
export async function sendContactMessage(values: ContactFormValues): Promise<ContactResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = (await response.json().catch(() => null)) as Partial<ContactResult> | null;
    if (response.ok && data?.ok) {
      return { ok: true, message: data.message ?? 'Message sent.' };
    }
    return { ok: false, message: data?.message ?? 'The message could not be sent.' };
  } catch {
    return { ok: false, message: 'Could not reach the server. Please check your connection.' };
  }
}
