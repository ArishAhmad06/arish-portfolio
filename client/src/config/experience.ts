import type { EducationEntry, ExperienceEntry } from './types';

export const experience: ExperienceEntry[] = [
  {
    id: 'taleem-e-tech',
    role: 'Data Science Tutor',
    organisation: 'Taleem-E-Tech',
    type: 'Part-time teaching',
    period: 'Oct 2026 – Present',
    highlights: [
      'Teaching Python programming and Data Science fundamentals.',
      'Explaining programming concepts through practical examples.',
      'Guiding students through functions, loops, data structures, and problem-solving.',
      'Preparing coding exercises and assignments.',
      'Helping students develop programming fundamentals.',
    ],
  },
];

export const education: EducationEntry[] = [
  {
    id: 'btech',
    degree: 'B.Tech, Artificial Intelligence & Machine Learning',
    institution: 'LNCT University, Bhopal',
    period: '2024–2028',
    status: 'Ongoing',
    scores: [
      { label: 'Class XII', value: '76%' },
      { label: 'Class X', value: '84.25%' },
    ],
  },
];
