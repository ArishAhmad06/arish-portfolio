import { site } from '@/config';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import './About.css';

export function About() {
  const { about } = site;

  return (
    <Section id="about" index="01" label="ABOUT">
      <div className="about__spec">
        <h2>{about.heading}</h2>
        <dl className="mono about__facts">
          {about.specSheet.map((fact) => (
            <div key={fact.label} className="about__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="about__body">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="about__focus">
          {about.focusAreas.map((area) => (
            <Reveal key={area.number} className="focus">
              <span className="focus__number mono">{area.number}</span>
              <div>
                <b>{area.title}</b>
                <p>{area.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
