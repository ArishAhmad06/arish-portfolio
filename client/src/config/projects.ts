
import type { Project } from './types';

/**
 * To add a project: append an object here (and a cover in ProjectCover.tsx if you want new artwork).
 * Leave githubUrl / liveUrl as null until a real link exists: the buttons appear automatically.
 */
export const projects: Project[] = [
  {
    slug: 'alprint-studio',
    title: 'Alprint Studio',
    category: 'Full-Stack Development',
    status: 'In Development',
    description:
      'Custom printing e-commerce platform to explore pre-designed products and personalize merchandise: T-shirts, hoodies, mugs, caps, bottles, frames, keychains. Includes authentication, product and category management, and owner-controlled administration.',
    stack: ['Node.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Zod'],
    githubUrl: "https://github.com/ArishAhmad06/alprint-studio",
    liveUrl: null,
    accent: '#e0328c',
    cover: 'print',
  },
  {
    slug: 'canteencast-ai',
    title: 'CanteenCast-AI',
    category: 'Machine Learning · Predictive Analytics',
    status: null,
    description:
      'Next-day food demand forecasting for college canteens, per food item, using historical sales plus weather, weekend, examination-period and festival features. Models are compared with RMSE, MAE and R² to support inventory planning and reduce food wastage.',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    // TODO(Arish): add the repository URL.
    githubUrl: "https://github.com/ArishAhmad06/canteencast-ai",
    liveUrl: null,
    accent: '#f5a524',
    cover: 'forecast',
  },
  {
    slug: 'bank-churn-prediction',
    title: 'Bank Customer Churn Prediction System',
    category: 'End-to-End Machine Learning',
    status: null,
    description:
      'Predicts customer churn from historical banking data. Logistic Regression and Decision Tree models are compared on Precision, Recall, F1-score and ROC-AUC, then served through a FastAPI endpoint with Pydantic validation, Joblib persistence, Docker and Pytest.',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'FastAPI', 'Pydantic', 'Joblib', 'Docker', 'Pytest'],
    // TODO(Arish): add the repository URL.
    githubUrl: "https://github.com/ArishAhmad06/bank-customer-churn-prediction",
    liveUrl: null,
    accent: '#14b8a6',
    cover: 'roc',
  },
  {
    slug: 'blog-application',
    title: 'BlogApplication',
    category: 'Backend Engineering',
    status: null,
    description:
      'Modular backend with REST APIs for users, posts and comments: JWT authentication with refresh token rotation, request validation, centralized error handling, and image uploads through Cloudinary and Multer.',
    stack: ['Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'JWT Authentication', 'Zod', 'Cloudinary'],
    // TODO(Arish): add the repository URL.
    githubUrl: "https://github.com/ArishAhmad06/blogapplication",
    liveUrl: null,
    accent: '#3b82f6',
    cover: 'tokens',
  },
  {
    slug: 'zylostays',
    title: 'ZyloStays',
    category: 'Full-Stack Development',
    status: 'In Development',
    description:
      'Travel and accommodation platform for discovering and booking hotels, villas and apartments, with listings management, ratings and reviews.',
    stack: ['Node.js', 'Express.js', 'JavaScript', 'REST API Development'],
    // TODO(Arish): add the repository URL and update the status to match real progress.
    githubUrl: "https://github.com/ArishAhmad06/WonderLust_Project",
    liveUrl: null,
    accent: '#ff6f61',
    cover: 'map',
  },
];
