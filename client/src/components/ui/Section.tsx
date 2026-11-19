import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  /** Number shown in the blueprint marker, e.g. "01". */
  index: string;
  /** Short label shown in the marker, e.g. "ABOUT". */
  label: string;
  /** Optional full-width heading. Omit it when the section lays out its own heading. */
  title?: string;
  /** Optional text shown after the marker. */
  hint?: string;
  children: ReactNode;
}

export function Section({ id, index, label, title, hint, children }: SectionProps) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-heading`}>
      <div className="wrap">
        <div className="section__grid">
          <p className="section__mark mono">
            <span>
              [ {index} / {label} ]
            </span>{' '}
            {hint}
          </p>
          {title ? (
            <h2 id={`${id}-heading`} className="section__title">
              {title}
            </h2>
          ) : (
            <span id={`${id}-heading`} className="visually-hidden">
              {label}
            </span>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
