import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { collection, doc, onSnapshot, query, where } from '@firebase/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { db, auth } from '../lib/firebase';
import {
  DEFAULT_PAGES_SEED,
  DEFAULT_SITE_SETTINGS,
} from '../data/defaultCmsContent';
import {
  ProjectItem,
  SitePageDoc,
  SitePageId,
  SiteSettings,
} from '../types/cms';

interface SiteContentContextValue {
  settings: Omit<SiteSettings, 'updatedBy' | 'updatedAt'>;
  pagesMap: Partial<Record<SitePageId, SitePageDoc>>;
  publishedProjects: ProjectItem[];
  isPreviewMode: boolean;
  getPageContent: <T = Record<string, any>>(pageId: SitePageId) => T;
  loading: boolean;
}

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

function mergeDeep(target: any, source: any): any {
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return source !== undefined ? source : target;
  }
  const output: Record<string, any> = { ...(target || {}) };
  for (const key of Object.keys(source)) {
    const val = source[key];
    if (val && typeof val === 'object' && !Array.isArray(val) && target?.[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      output[key] = mergeDeep(target[key], val);
    } else if (val !== undefined) {
      output[key] = val;
    }
  }
  return output;
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Omit<SiteSettings, 'updatedBy' | 'updatedAt'>>(
    DEFAULT_SITE_SETTINGS
  );
  const [pagesMap, setPagesMap] = useState<Partial<Record<SitePageId, SitePageDoc>>>({});
  const [publishedProjects, setPublishedProjects] = useState<ProjectItem[]>([]);
  const [isSignedInAdmin, setIsSignedInAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérifier si ?preview=draft est demandé dans l'URL
  const [wantsPreview, setWantsPreview] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('preview') === 'draft';
  });

  useEffect(() => {
    const onPopState = () => {
      setWantsPreview(new URLSearchParams(window.location.search).get('preview') === 'draft');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setIsSignedInAdmin(Boolean(user && user.emailVerified));
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'site'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as SiteSettings;
          setSettings({
            ...DEFAULT_SITE_SETTINGS,
            ...data,
            socialLinks: {
              ...DEFAULT_SITE_SETTINGS.socialLinks,
              ...(data.socialLinks || {}),
            },
          });
        }
      },
      (err) => {
        console.warn('Settings snapshot fallback:', err.message);
      }
    );

    const unsubPages = onSnapshot(
      collection(db, 'pages'),
      (snap) => {
        const next: Partial<Record<SitePageId, SitePageDoc>> = {};
        snap.forEach((docSnap) => {
          const data = docSnap.data() as SitePageDoc;
          next[data.pageId || (docSnap.id as SitePageId)] = data;
        });
        setPagesMap(next);
        setLoading(false);
      },
      (err) => {
        console.warn('Pages snapshot fallback:', err.message);
        setLoading(false);
      }
    );

    const projectsQuery = query(
      collection(db, 'projects'),
      where('publicationStatus', '==', 'published')
    );
    const unsubProjects = onSnapshot(
      projectsQuery,
      (snap) => {
        const list: ProjectItem[] = [];
        snap.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProjectItem, 'id'>) });
        });
        list.sort((a, b) => {
          const tA = (a.updatedAt as any)?.toMillis?.() || 0;
          const tB = (b.updatedAt as any)?.toMillis?.() || 0;
          return tB - tA;
        });
        setPublishedProjects(list);
      },
      (err) => {
        console.warn('Projects snapshot warning:', err.message);
      }
    );

    return () => {
      unsubSettings();
      unsubPages();
      unsubProjects();
    };
  }, []);

  const isPreviewMode = wantsPreview && isSignedInAdmin;

  const value = useMemo<SiteContentContextValue>(() => {
    const getPageContent = <T = Record<string, any>>(pageId: SitePageId): T => {
      const seed = DEFAULT_PAGES_SEED[pageId]?.content || {};
      const pageDoc = pagesMap[pageId];
      if (!pageDoc) return seed as T;
      const sourceContent = isPreviewMode ? pageDoc.draftContent : pageDoc.publishedContent;
      return mergeDeep(seed, sourceContent) as T;
    };

    return {
      settings,
      pagesMap,
      publishedProjects,
      isPreviewMode,
      getPageContent,
      loading,
    };
  }, [settings, pagesMap, publishedProjects, isPreviewMode, loading]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used inside SiteContentProvider');
  }
  return ctx;
}
