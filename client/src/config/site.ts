import type { Availability, FocusArea, HeadlineSegment } from "./types";

/**
 * Personal details and page copy.
 * This is the first file to edit: values marked TODO(Arish) are the ones you should fill in.
 */
export const site = {
  name: "Arish Ahmad",
  initials: "AA",
  location: "Bhopal, Madhya Pradesh, India",
  shortLocation: "Bhopal, India",
  timezone: "Asia/Kolkata",

  email: "ahmad.aris0987@gmail.com",
  githubUrl: "https://github.com/ArishAhmad06",
  linkedinUrl: "https://www.linkedin.com/in/arish-ahmad0987/" as string | null,
  // TODO(Arish): put your PDF in client/public/ and set e.g. '/Arish-Ahmad-Resume.pdf'.
  // While null, the Resume buttons are hidden.
  resumeUrl: "/Arish-Ahmad-Resume.pdf" as string | null,

  availability: "open-to-internships" as Availability,

  hero: {
    eyebrow: "AI/ML ENGINEER • SOFTWARE DEVELOPER • PROBLEM SOLVER",
    headline: [
      { text: "Building " },
      { text: "Intelligent", emphasis: true },
      { text: " Systems. Engineering " },
      { text: "Real-World", emphasis: true },
      { text: " Solutions." },
    ] satisfies HeadlineSegment[],
    intro:
      "I’m Arish Ahmad, an aspiring Software Development Engineer and AI/ML Engineer passionate about building scalable applications, intelligent systems, and meaningful technology.",
  },

  about: {
    heading: "Beyond writing code.",
    specSheet: [
      { label: "LOCATION", value: "Bhopal, MP, India" },
      { label: "DEGREE", value: "B.Tech AI & ML" },
      { label: "FOCUS", value: "Backend · ML" },
      { label: "STATUS", value: "Student, 2024–2028" },
    ],
    paragraphs: [
      "I’m a B.Tech student specializing in Artificial Intelligence and Machine Learning at LNCT University, Bhopal.",
      "My journey revolves around two interconnected interests: engineering scalable software systems and building intelligent solutions using data and machine learning.",
      "I enjoy understanding how systems work internally, designing backend architectures, solving algorithmic problems, and transforming raw data into meaningful insights.",
      "From developing full-stack platforms and REST APIs to building predictive machine learning pipelines, I focus on learning by building real projects.",
      "My long-term goal is to become an exceptional Software Development Engineer and AI Engineer capable of solving complex real-world problems.",
    ],
    focusAreas: [
      {
        number: "01",
        title: "Software Engineering",
        description:
          "Backend architecture, REST APIs, databases, authentication, and scalable applications.",
      },
      {
        number: "02",
        title: "Artificial Intelligence",
        description:
          "Machine learning, predictive modeling, data science, and intelligent applications.",
      },
      {
        number: "03",
        title: "Problem Solving",
        description:
          "Data structures, algorithms, object-oriented programming, and system design.",
      },
    ] satisfies FocusArea[],
  },

  mindset: {
    heading: "Always learning. Always building.",
    statements: [
      "Building is the best way to understand technology.",
      "Every complex system starts with a simple idea.",
      "Learn deeply. Build consistently. Improve continuously.",
    ],
    interests: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "SOLID Principles",
      "Low-Level Design",
      "High-Level Design",
      "Backend Architecture",
      "Machine Learning Fundamentals",
      "Continuous Technical Learning",
    ],
  },

  contact: {
    heading: "Have an interesting problem to solve?",
    text: "I’m always interested in connecting with engineers, developers, recruiters, and people building meaningful technology. Let’s discuss ideas, collaborate, or create something impactful.",
  },

  footer: {
    line1: "Designed & Engineered by Arish Ahmad.",
    line2: "Turning curiosity into code and ideas into intelligent solutions.",
  },
} as const;

export const availabilityLabels: Record<Availability, string> = {
  "open-to-internships": "Open to internships",
  "open-to-opportunities": "Open to opportunities",
  busy: "Currently busy",
};
