import type { SkillCategory } from './types';

/** Skills are listed without ratings on purpose: no invented proficiency numbers. */
export const skillCategories: SkillCategory[] = [
  { name: 'Languages', skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
  {
    name: 'Backend & Software Engineering',
    skills: [
      'Node.js',
      'Express.js',
      'FastAPI',
      'REST API Development',
      'JWT Authentication',
      'Pydantic',
      'API Integration',
      'Debugging',
    ],
  },
  {
    name: 'Data Science & ML',
    skills: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Data Cleaning',
      'Data Preprocessing',
      'EDA',
      'Feature Engineering',
      'Model Training',
      'Model Evaluation',
      'Logistic Regression',
      'Decision Trees',
      'Random Forest',
      'XGBoost',
    ],
  },
  {
    name: 'AI & NLP',
    skills: ['Large Language Models', 'Prompt Engineering', 'NLP Fundamentals', 'LLM API Integration'],
  },
  {
    name: 'Databases & Tools',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma ORM', 'Git', 'GitHub', 'Docker', 'Joblib', 'Pytest'],
  },
];
