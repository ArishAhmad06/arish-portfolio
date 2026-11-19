import { projects, type Project } from '@/config';
import { ButtonLink } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { cx } from '@/lib/classNames';
import { ProjectCover } from './ProjectCover';
import './Projects.css';

interface ProjectsProps {
  activeSkill: string | null;
  onProjectChange: (slug: string | null) => void;
}

export function Projects({ activeSkill, onProjectChange }: ProjectsProps) {
  return (
    <Section id="projects" index="03" label="PROJECTS" title="Selected work">
      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            number={index + 1}
            dimmed={activeSkill !== null && !project.stack.includes(activeSkill)}
            onHover={onProjectChange}
          />
        ))}
      </div>
    </Section>
  );
}

interface ProjectCardProps {
  project: Project;
  number: number;
  dimmed: boolean;
  onHover: (slug: string | null) => void;
}

function ProjectCard({ project, number, dimmed, onHover }: ProjectCardProps) {
  const header = [`PROJECT ${String(number).padStart(2, '0')}`, project.category, project.status]
    .filter(Boolean)
    .join(' · ')
    .toUpperCase();

  return (
    <Reveal
      as="article"
      className={cx('project', dimmed && 'is-dimmed')}
    >
      <div
        className="project__inner"
        onMouseEnter={() => onHover(project.slug)}
        onMouseLeave={() => onHover(null)}
      >
        <div className="framed project__cover">
          <ProjectCover kind={project.cover} accent={project.accent} />
        </div>

        <div className="project__text">
          <p className="mono">{header}</p>
          <h3>{project.title}</h3>
          <p className="project__description">{project.description}</p>

          <div className="chips project__stack">
            {project.stack.map((tech) => (
              <Chip key={tech} label={tech} />
            ))}
          </div>

          <div className="row">
            {project.githubUrl ? (
              <ButtonLink href={project.githubUrl}>GitHub</ButtonLink>
            ) : (
              <span className="mono">GitHub link not added yet</span>
            )}
            {project.liveUrl && <ButtonLink variant="primary" href={project.liveUrl}>Live Demo</ButtonLink>}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
