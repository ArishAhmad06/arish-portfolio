import { Fragment } from 'react';
import { site } from '@/config';
import { useClock } from '@/hooks/useClock';
import { ButtonLink } from '@/components/ui/Button';
import { StatusPill } from '@/components/ui/StatusPill';
import { HeroDiagram } from './HeroDiagram';
import './Hero.css';

export function Hero() {
  const time = useClock(site.timezone);

  return (
    <div className="wrap">
      <div className="hero" id="top">
        <div className="hero__content">
          <p className="mono hero__eyebrow">{site.hero.eyebrow}</p>

          <h1 className="hero__name">{site.name}</h1>

          <p className="hero__tagline">
            {site.hero.headline.map((part, index) => (
              <Fragment key={index}>{'emphasis' in part && part.emphasis ? <em>{part.text}</em> : part.text}</Fragment>
            ))}
          </p>

          <p className="hero__intro">{site.hero.intro}</p>

          <div className="row hero__actions">
            <ButtonLink variant="primary" href="#projects">
              Explore My Work
            </ButtonLink>
            <ButtonLink href="#contact">Let’s Connect</ButtonLink>
            {site.resumeUrl && (
              <ButtonLink href={site.resumeUrl} download>
                Download Resume ↓
              </ButtonLink>
            )}
          </div>

          <div className="hero__footer mono">
            <div className="row">
              <span>{site.shortLocation}</span>
              <span>{time} IST</span>
              <StatusPill />
            </div>
            <div className="row">
              <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              {site.linkedinUrl && (
                <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              <a href={`mailto:${site.email}`}>Email</a>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <HeroDiagram />
        </div>
      </div>
    </div>
  );
}