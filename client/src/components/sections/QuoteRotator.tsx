import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface QuoteRotatorProps {
  quotes: readonly string[];
}

/** Cycles through statements every few seconds. With reduced motion, all of them are shown as a list. */
export function QuoteRotator({ quotes }: QuoteRotatorProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % quotes.length), 4500);
    return () => window.clearInterval(id);
  }, [reduced, quotes.length]);

  if (reduced) {
    return (
      <ul className="mindset__quotes">
        {quotes.map((quote) => (
          <li key={quote}>{quote}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="mindset__quote" key={index}>
      <span className="mono">&gt; </span>
      {quotes[index]}
    </p>
  );
}
