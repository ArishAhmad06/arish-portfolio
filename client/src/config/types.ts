/** Shared content types. Every piece of site content is typed here, so edits are checked by the compiler. */

export type Availability = 'open-to-internships' | 'open-to-opportunities' | 'busy';

export type CoverKind = 'print' | 'forecast' | 'roc' | 'tokens' | 'map';

export interface Project {
  slug: string;
  title: string;
  category: string;
  /** Shown exactly as written, e.g. "In Development". Use null when there is no status to show. */
  status: string | null;
  description: string;
  /** Names should match entries in skills.ts to enable the skill <-> project highlighting. */
  stack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  /** Accent colour used in the cover artwork. */
  accent: string;
  cover: CoverKind;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  /** Free text such as "2025" or "September 2025". null hides the date. */
  issuedOn: string | null;
  /** Small label such as "Participation". */
  tag: string | null;
  credentialId: string | null;
  verifyUrl: string | null;
  /** Path under client/public, e.g. "/certificates/cisco-iot.png". */
  image: string | null;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organisation: string;
  type: string;
  /** Date range, e.g. "2025 – Present". null hides it. */
  period: string | null;
  highlights: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: string;
  scores: { label: string; value: string }[];
}

export interface FocusArea {
  number: string;
  title: string;
  description: string;
}

export interface HeadlineSegment {
  text: string;
  emphasis?: boolean;
}
