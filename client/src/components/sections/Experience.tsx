import { education, experience } from '@/config';
import { Section } from '@/components/ui/Section';
import './Experience.css';

export function Experience() {
  return (
    <Section id="experience" index="04" label="TEACHING & EDUCATION" title="Teaching and study">
      <div className="timeline">
        {experience.map((entry) => (
          <article key={entry.id} className="timeline__item">
            <p className="mono">
              {entry.type.toUpperCase()} <span className="timeline__tag">TEACHING</span>
              {entry.period ? ` · ${entry.period}` : ' · DATES NOT ADDED'}
            </p>
            <h3>
              {entry.role}, {entry.organisation}
            </h3>
            <ul>
              {entry.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}

        {education.map((entry) => (
          <article key={entry.id} className="timeline__item">
            <p className="mono">
              {entry.period} <span className="timeline__tag">{entry.status.toUpperCase()}</span>
            </p>
            <h3>{entry.degree}</h3>
            <p className="timeline__sub">{entry.institution}</p>
            <table className="mono">
              <tbody>
                {entry.scores.map((score) => (
                  <tr key={score.label}>
                    <td>{score.label}</td>
                    <td>{score.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        ))}
      </div>
    </Section>
  );
}
