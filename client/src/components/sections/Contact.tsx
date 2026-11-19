import { useState, type ChangeEvent, type FormEvent } from 'react';
import { site } from '@/config';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { sendContactMessage } from '@/lib/api';
import { validateContact, type ContactErrors, type ContactFormValues } from '@/lib/validation';
import './Contact.css';

type Status =
  | { state: 'idle' }
  | { state: 'sending' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };

const emptyForm: ContactFormValues = { name: '', email: '', subject: '', message: '', website: '' };
const MAX_MESSAGE = 2000;

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle');

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ state: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    setStatus({ state: 'sending' });
    const result = await sendContactMessage(values);

    if (result.ok) {
      setStatus({ state: 'success', message: result.message });
      setValues(emptyForm);
    } else {
      setStatus({ state: 'error', message: result.message });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied('done');
    } catch {
      setCopied('failed');
    }
  };

  const sending = status.state === 'sending';

  return (
    <Section id="contact" index="07" label="CONTACT">
      <div className="contact__intro">
        <h2>{site.contact.heading}</h2>
        <p className="contact__text">{site.contact.text}</p>

        <div className="row">
          <Button onClick={copyEmail}>Copy email</Button>
          <ButtonLink href={site.githubUrl}>GitHub</ButtonLink>
          {site.linkedinUrl && <ButtonLink href={site.linkedinUrl}>LinkedIn</ButtonLink>}
        </div>

        <p className="mono contact__email" aria-live="polite">
          {copied === 'done' ? 'Copied' : copied === 'failed' ? `Copy failed. Email: ${site.email}` : site.email}
        </p>
        <p className="mono">{site.location}</p>
      </div>

      <form className="contact__form" onSubmit={onSubmit} noValidate>
        <Field label="Name" name="name" value={values.name} error={errors.name} onChange={onChange} autoComplete="name" />
        <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={onChange} autoComplete="email" />
        <Field label="Subject" name="subject" value={values.subject} error={errors.subject} onChange={onChange} />

        <label>
          Message
          <textarea
            name="message"
            rows={5}
            maxLength={MAX_MESSAGE}
            value={values.message}
            onChange={onChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          <span className="mono contact__counter">
            {values.message.length}/{MAX_MESSAGE}
          </span>
          {errors.message && (
            <span id="message-error" className="contact__error">
              {errors.message}
            </span>
          )}
        </label>

        {/* Honeypot: hidden from people, tempting to bots. */}
        <input
          className="contact__honeypot"
          name="website"
          value={values.website}
          onChange={onChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <Button type="submit" variant="primary" disabled={sending}>
          {sending ? 'Sending…' : 'Send message'}
        </Button>

        <p className={`contact__status contact__status--${status.state}`} role="status" aria-live="polite">
          {status.state === 'success' && status.message}
          {status.state === 'error' && (
            <>
              {status.message} You can also email{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </>
          )}
        </p>
      </form>
    </Section>
  );
}

interface FieldProps {
  label: string;
  name: 'name' | 'email' | 'subject';
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Field({ label, name, value, error, type = 'text', autoComplete, onChange }: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <label>
      {label}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} className="contact__error">
          {error}
        </span>
      )}
    </label>
  );
}
