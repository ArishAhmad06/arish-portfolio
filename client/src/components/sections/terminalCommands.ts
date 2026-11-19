import { projects, site, skillCategories } from '@/config';

/**
 * Commands for the interactive terminal. Each returns plain text built from the real config,
 * so the terminal can never show anything the rest of the site does not. Add a command by adding a key.
 * `clear` and `theme` are handled by the Terminal component because they affect the UI.
 */
export const commands: Record<string, () => string> = {
  help: () => 'Commands: help, about, skills, projects, contact, theme, clear',
  about: () =>
    `${site.name} — AI/ML Engineer, Software Development Engineer, Backend Developer.\nB.Tech AI & ML, LNCT University, Bhopal.`,
  skills: () => skillCategories.map((c) => `${c.name}: ${c.skills.join(', ')}`).join('\n'),
  projects: () =>
    projects.map((p) => `${p.title}${p.status ? ` (${p.status})` : ''} — ${p.category}`).join('\n'),
  contact: () => [site.email, site.githubUrl, site.linkedinUrl].filter(Boolean).join(' · '),
};

export const suggestedCommands = ['help', 'about', 'skills', 'projects', 'contact', 'theme', 'clear'];
