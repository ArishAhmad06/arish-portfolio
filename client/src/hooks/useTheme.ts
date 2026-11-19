import { useCallback, useState } from 'react';

type Theme = 'dark' | 'light';

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

/** Reads the theme set by /theme-init.js and lets the user toggle and persist it. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* storage blocked: the theme still changes for this visit */
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
