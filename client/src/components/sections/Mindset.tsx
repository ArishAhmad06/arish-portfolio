import { site } from '@/config';
import { Section } from '@/components/ui/Section';
import { QuoteRotator } from './QuoteRotator';
import { Terminal } from './Terminal';
import './Mindset.css';

interface MindsetProps {
  onToggleTheme: () => void;
}

export function Mindset({ onToggleTheme }: MindsetProps) {
  const { mindset } = site;

  return (
    <Section id="mindset" index="06" label="MINDSET" title={mindset.heading}>
      <div className="mindset__left">
        <Terminal onToggleTheme={onToggleTheme} />
      </div>

      <div className="mindset__right">
        <QuoteRotator quotes={mindset.statements} />
        <ul className="mindset__interests">
          {mindset.interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
