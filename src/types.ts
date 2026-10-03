export type PageId = 
  | 'accueil' 
  | 'a-propos' 
  | 'activites' 
  | 'methode' 
  | 'hse' 
  | 'actualites' 
  | 'contact';

export interface NavItem {
  id: PageId;
  label: string;
}

export interface ActivityPole {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  image: string;
  services: string[];
  keyFigures: { label: string; value: string }[];
  accentColor: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  keyword: string;
  description: string;
  iconName: string;
}

export interface TimelineStep {
  number: string;
  title: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface HseCommitment {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  image: string;
  quote?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  pole: string;
  projectType: string;
  location: string;
  budgetRange: string;
  description: string;
}
