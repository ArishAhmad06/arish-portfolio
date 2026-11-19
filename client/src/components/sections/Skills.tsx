import { projects, skillCategories } from '@/config';
import { Section } from '@/components/ui/Section';
import { cx } from '@/lib/classNames';
import './Skills.css';

interface SkillsProps {
  activeSkill: string | null;
  activeProjectSlug: string | null;
  onSkillChange: (skill: string | null) => void;
}

export function Skills({ activeSkill, activeProjectSlug, onSkillChange }: SkillsProps) {
  const activeProject = projects.find((p) => p.slug === activeProjectSlug);

  return (
    <Section
      id="skills"
      index="02"
      label="SKILLS"
      title="Stack index"
      hint="Hover a skill to see which projects use it."
    >
      <div className="skills">
        {skillCategories.map((category) => (
          <div key={category.name} className="skills__category">
            <h3 className="mono">{category.name}</h3>
            <div className="chips">
              {category.skills.map((skill) => {
                const lit = activeSkill === skill || Boolean(activeProject?.stack.includes(skill));
                return (
                  <button
                    key={skill}
                    type="button"
                    className={cx('chip', lit && 'is-hit')}
                    onMouseEnter={() => onSkillChange(skill)}
                    onMouseLeave={() => onSkillChange(null)}
                    onFocus={() => onSkillChange(skill)}
                    onBlur={() => onSkillChange(null)}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
