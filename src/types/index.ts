export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  emoji: string;
  description: string;
  longDescription: string;
  role: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  videoUrl?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
  scoreType: string;
  status: 'Current' | 'Completed';
}

export interface AcademicFocusItem {
  id: string;
  title: string;
  status: string;
  description: string;
  details: string;
  cert: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  aboutText: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  stats: {
    cgpa: string;
    projectsCount: number;
    certsCount: number;
  };
}
