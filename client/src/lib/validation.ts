export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot. Must stay empty. */
  website: string;
}

export type ContactErrors = Partial<Record<keyof Omit<ContactFormValues, 'website'>, string>>;

/** Mirrors server/src/schemas/contact.ts. The server re-validates everything. */
export function validateContact(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.subject.trim().length < 3) errors.subject = 'Please add a subject.';
  if (values.message.trim().length < 10) errors.message = 'Please write at least 10 characters.';
  return errors;
}
