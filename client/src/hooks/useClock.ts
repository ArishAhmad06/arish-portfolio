import { useEffect, useState } from 'react';

const format = (timezone: string) =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

/** Returns the current local time (HH:MM) for a time zone, refreshed every 30 seconds. */
export function useClock(timezone: string): string {
  const [time, setTime] = useState(() => format(timezone));

  useEffect(() => {
    const id = window.setInterval(() => setTime(format(timezone)), 30_000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return time;
}
