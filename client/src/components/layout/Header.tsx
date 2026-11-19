import { useEffect, useState } from 'react';
import { site } from '@/config';
import { Button, ButtonLink } from '@/components/ui/Button';
import { cx } from '@/lib/classNames';
import { navItems } from './navigation';
import './Header.css';
import { Logo } from '@/components/ui/Logo';

interface HeaderProps {
  activeId: string | null;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Header({ activeId, theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="wrap header__bar">
        <a className="header__logo" href="#top" aria-label={`${site.name}, back to top`}>
            <Logo />
        </a>

        <nav
          id="primary-nav"
          className={cx('header__nav', menuOpen && 'is-open')}
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cx(activeId === item.id && 'is-active')}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <Button onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            Theme
          </Button>
          {site.resumeUrl && (
            <ButtonLink className="header__resume" href={site.resumeUrl} download>
              Resume
            </ButtonLink>
          )}
          <Button
            className="header__menu"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </Button>
        </div>
      </div>
    </header>
  );
}
