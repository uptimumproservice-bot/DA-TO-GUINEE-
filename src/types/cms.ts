import { Timestamp } from '@firebase/firestore';

export type AdminRole = 'super_admin' | 'editor';

export interface AdminUser {
  uid: string;
  email: string;
  username?: string;
  displayName: string;
  role: AdminRole;
  active: boolean;
  inviteId?: string;
  createdBy: string;
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
}

export interface AdminInvite {
  id: string;
  email: string;
  username?: string;
  displayName: string;
  role: AdminRole;
  active: boolean;
  invitedBy: string;
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
}

export type SitePageId =
  | 'accueil'
  | 'a-propos'
  | 'nos-activites'
  | 'nos-projets'
  | 'notre-approche'
  | 'nos-engagements'
  | 'actualites'
  | 'contact';

export type PageStatus = 'published' | 'draft' | 'pending_publish';

export interface CustomSection {
  id: string;
  eyebrow?: string;
  titre: string;
  contenu: string;
  imageUrl?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  theme?: 'light' | 'muted' | 'navy';
}

export interface SitePageDoc {
  pageId: SitePageId;
  title: string;
  slug: string;
  status: PageStatus;
  hasUnpublishedChanges: boolean;
  publishedContent: Record<string, any>;
  draftContent: Record<string, any>;
  lastEditedBy: string;
  lastEditedByName: string;
  publishedAt?: Timestamp | Date | null;
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
}

export type ProjectCategory = 'btp' | 'foncier' | 'immobilier';
export type ProjectExecutionStatus = 'en_cours' | 'acheve' | 'a_venir';
export type ProjectPublicationStatus = 'draft' | 'pending_publish' | 'published';

export interface ProjectGalleryItem {
  url: string;
  alt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  description: string;
  executionStatus: ProjectExecutionStatus;
  publicationStatus: ProjectPublicationStatus;
  mainImageUrl?: string;
  mainImageAlt?: string;
  gallery?: ProjectGalleryItem[];
  client?: string;
  startDate?: string;
  completionDate?: string;
  authorId: string;
  publishedAt?: Timestamp | Date | null;
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
}

export type MediaFolder =
  | 'general'
  | 'accueil'
  | 'a-propos'
  | 'activites'
  | 'projets'
  | 'engagements'
  | 'actualites'
  | 'branding';

export interface MediaItem {
  id: string;
  fileName: string;
  url: string;
  alt: string;
  folder: MediaFolder;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  uploadedBy: string;
  uploadedByName?: string;
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
}

export type MessageStatus = 'unread' | 'read' | 'handled';

export interface ContactMessage {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
  status: MessageStatus;
  adminNotes?: string;
  handledBy?: string;
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
}

export interface SiteSettings {
  companyName: string;
  legalName?: string;
  slogan: string;
  logoLightUrl?: string;
  logoDarkUrl?: string;
  phone: string;
  email: string;
  address: string;
  headquarters?: string;
  hours?: string;
  footerCopyright?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
    youtube?: string;
  };
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;
  updatedBy: string;
  updatedAt?: Timestamp | Date | null;
}

export type ActivityTargetType =
  | 'page'
  | 'project'
  | 'media'
  | 'message'
  | 'settings'
  | 'admin'
  | 'auth';

export interface ActivityLog {
  id: string;
  actorUid: string;
  actorEmail: string;
  actorName: string;
  actorRole: AdminRole;
  action: string;
  targetType: ActivityTargetType;
  targetId: string;
  details: string;
  createdAt?: Timestamp | Date | null;
}
