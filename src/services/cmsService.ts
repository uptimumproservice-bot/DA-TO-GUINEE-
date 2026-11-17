import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from '@firebase/firestore';
import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from '@firebase/auth';
import { db, auth, secondaryAuth, OperationType, handleFirestoreError } from '../lib/firebase';
import {
  ActivityLog,
  ActivityTargetType,
  AdminInvite,
  AdminRole,
  AdminUser,
  ContactMessage,
  MediaFolder,
  MediaItem,
  MessageStatus,
  ProjectItem,
  ProjectPublicationStatus,
  SitePageDoc,
  SitePageId,
  SiteSettings,
} from '../types/cms';
import {
  ADMIN_PAGE_LIST,
  DEFAULT_PAGES_SEED,
  DEFAULT_SITE_SETTINGS,
} from '../data/defaultCmsContent';

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || `item-${Date.now()}`
  );
}

// ─── Journal d'activités ───────────────────────────────────────────────────────
export async function logActivity(
  actor: Pick<AdminUser, 'uid' | 'email' | 'displayName' | 'role'>,
  action: string,
  targetType: ActivityTargetType,
  targetId: string,
  details: string
): Promise<void> {
  const path = 'activityLogs';
  try {
    await addDoc(collection(db, path), {
      actorUid: actor.uid,
      actorEmail: actor.email,
      actorName: actor.displayName || actor.email,
      actorRole: actor.role,
      action,
      targetType,
      targetId: targetId.slice(0, 128),
      details: details.slice(0, 500),
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Activity log error:', err);
  }
}

// ─── Bootstrap & Résolution du profil Admin ──────────────────────────────────
export async function checkBootstrapInitialized(): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, 'settings', 'bootstrapLock'));
    return snap.exists() && snap.data()?.initialized === true;
  } catch {
    return false;
  }
}

export async function registerUsernameServer(
  username: string | undefined,
  email: string
): Promise<void> {
  if (!username || !username.trim()) return;
  try {
    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) return;
    await fetch('/api/auth/register-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ username: username.trim(), email: email.trim().toLowerCase() }),
    });
  } catch {
    // non-fatal
  }
}

export async function bootstrapFirstSuperAdmin(
  user: User,
  displayName: string,
  username?: string
): Promise<AdminUser> {
  const email = (user.email || '').toLowerCase();
  const cleanName = displayName.trim() || user.displayName || email.split('@')[0] || 'Super Administrateur';
  const adminRef = doc(db, 'admins', user.uid);
  const lockRef = doc(db, 'settings', 'bootstrapLock');

  const payload: Record<string, any> = {
    uid: user.uid,
    email,
    displayName: cleanName.slice(0, 100),
    role: 'super_admin' as AdminRole,
    active: true,
    createdBy: user.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (username && username.trim()) {
    payload.username = username.trim().slice(0, 60);
  }

  try {
    const batch = writeBatch(db);
    batch.set(adminRef, payload);
    batch.set(lockRef, {
      initialized: true,
      createdAt: serverTimestamp(),
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `admins/${user.uid}`);
  }

  const resolved: AdminUser = {
    uid: user.uid,
    email,
    username: payload.username,
    displayName: cleanName,
    role: 'super_admin',
    active: true,
    createdBy: user.uid,
  };

  await registerUsernameServer(payload.username, email);
  await logActivity(
    resolved,
    'admin_bootstrap',
    'admin',
    user.uid,
    `Initialisation du premier compte Super Administrateur (${email})`
  );

  return resolved;
}

export async function resolveOrClaimAdminProfile(user: User): Promise<AdminUser | null> {
  if (!user.email || !user.emailVerified) return null;
  const email = user.email.toLowerCase();

  // 1. Vérifier si le profil existe déjà dans /admins/{uid}
  const adminRef = doc(db, 'admins', user.uid);
  try {
    const existingSnap = await getDoc(adminRef);
    if (existingSnap.exists()) {
      const data = existingSnap.data() as AdminUser;
      if (!data.active) return null;
      return { ...data, uid: user.uid };
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `admins/${user.uid}`);
  }

  // 2. Compte Super Admin d'amorçage prédéfini (runtime metadata)
  if (email === 'sagnomichel2026@gmail.com') {
    const lockInitialized = await checkBootstrapInitialized();
    const displayName = user.displayName || 'Super Administrateur DA-TO';
    if (!lockInitialized) {
      return bootstrapFirstSuperAdmin(user, displayName);
    }
    try {
      await setDoc(adminRef, {
        uid: user.uid,
        email,
        displayName,
        role: 'super_admin',
        active: true,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return {
        uid: user.uid,
        email,
        displayName,
        role: 'super_admin',
        active: true,
        createdBy: user.uid,
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `admins/${user.uid}`);
    }
  }

  // 3. Vérifier une invitation en attente dans /adminInvites
  try {
    const invitesQ = query(collection(db, 'adminInvites'), where('email', '==', email));
    const invitesSnap = await getDocs(invitesQ);
    if (!invitesSnap.empty) {
      const inviteDoc = invitesSnap.docs[0];
      const inviteData = inviteDoc.data() as Omit<AdminInvite, 'id'>;
      if (inviteData.active) {
        const profilePayload: Record<string, any> = {
          uid: user.uid,
          email,
          displayName: inviteData.displayName || user.displayName || email.split('@')[0],
          role: inviteData.role,
          active: true,
          inviteId: inviteDoc.id,
          createdBy: inviteData.invitedBy,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        if (inviteData.username) {
          profilePayload.username = inviteData.username;
        }
        await setDoc(adminRef, profilePayload);
        await deleteDoc(doc(db, 'adminInvites', inviteDoc.id));
        const profile: AdminUser = {
          uid: user.uid,
          email,
          username: inviteData.username,
          displayName: profilePayload.displayName,
          role: inviteData.role,
          active: true,
          inviteId: inviteDoc.id,
          createdBy: inviteData.invitedBy,
        };
        await registerUsernameServer(inviteData.username, email);
        await logActivity(
          profile,
          'admin_invite_claimed',
          'admin',
          user.uid,
          `Activation du compte administrateur invité (${email}, rôle: ${inviteData.role})`
        );
        return profile;
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'adminInvites');
  }

  return null;
}

// ─── Initialisation non-destructive des pages et paramètres par défaut ─────────
export async function ensureDefaultCmsSeed(admin: AdminUser): Promise<void> {
  // Pages par défaut
  for (const pageMeta of ADMIN_PAGE_LIST) {
    const seed = DEFAULT_PAGES_SEED[pageMeta.pageId];
    const pageRef = doc(db, 'pages', pageMeta.pageId);
    try {
      const snap = await getDoc(pageRef);
      if (!snap.exists()) {
        await setDoc(pageRef, {
          pageId: seed.pageId,
          title: seed.title,
          slug: seed.slug,
          status: 'published',
          hasUnpublishedChanges: false,
          publishedContent: seed.content,
          draftContent: seed.content,
          lastEditedBy: admin.uid,
          lastEditedByName: admin.displayName || admin.email,
          publishedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `pages/${pageMeta.pageId}`);
    }
  }

  // Paramètres généraux par défaut (Super Admin uniquement pour écriture)
  if (admin.role === 'super_admin') {
    const settingsRef = doc(db, 'settings', 'site');
    try {
      const settingsSnap = await getDoc(settingsRef);
      if (!settingsSnap.exists()) {
        await setDoc(settingsRef, {
          ...DEFAULT_SITE_SETTINGS,
          updatedBy: admin.uid,
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/site');
    }
  }
}

// ─── Gestion des Pages CMS ─────────────────────────────────────────────────────
export async function savePageDraft(
  pageId: SitePageId,
  title: string,
  slug: string,
  draftContent: Record<string, any>,
  admin: AdminUser,
  isDraftOnly = false
): Promise<void> {
  const path = `pages/${pageId}`;
  try {
    const ref = doc(db, 'pages', pageId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const seed = DEFAULT_PAGES_SEED[pageId];
      await setDoc(ref, {
        pageId,
        title,
        slug,
        status: isDraftOnly ? 'draft' : 'pending_publish',
        hasUnpublishedChanges: true,
        publishedContent: seed.content,
        draftContent,
        lastEditedBy: admin.uid,
        lastEditedByName: admin.displayName || admin.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(ref, {
        title,
        slug,
        status: isDraftOnly ? 'draft' : 'pending_publish',
        hasUnpublishedChanges: true,
        draftContent,
        lastEditedBy: admin.uid,
        lastEditedByName: admin.displayName || admin.email,
        updatedAt: serverTimestamp(),
      });
    }
    await logActivity(
      admin,
      'page_draft_saved',
      'page',
      pageId,
      `Enregistrement du brouillon de la page « ${title} »`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function publishPage(
  pageId: SitePageId,
  title: string,
  slug: string,
  contentToPublish: Record<string, any>,
  admin: AdminUser
): Promise<void> {
  const path = `pages/${pageId}`;
  try {
    const ref = doc(db, 'pages', pageId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        pageId,
        title,
        slug,
        status: 'published',
        hasUnpublishedChanges: false,
        publishedContent: contentToPublish,
        draftContent: contentToPublish,
        lastEditedBy: admin.uid,
        lastEditedByName: admin.displayName || admin.email,
        publishedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(ref, {
        title,
        slug,
        status: 'published',
        hasUnpublishedChanges: false,
        publishedContent: contentToPublish,
        draftContent: contentToPublish,
        lastEditedBy: admin.uid,
        lastEditedByName: admin.displayName || admin.email,
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    await logActivity(
      admin,
      'page_published',
      'page',
      pageId,
      `Publication de la page « ${title} » sur le site public`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function discardPageDraft(page: SitePageDoc, admin: AdminUser): Promise<void> {
  const path = `pages/${page.pageId}`;
  try {
    await updateDoc(doc(db, 'pages', page.pageId), {
      title: page.title,
      slug: page.slug,
      status: 'published',
      hasUnpublishedChanges: false,
      draftContent: page.publishedContent,
      lastEditedBy: admin.uid,
      lastEditedByName: admin.displayName || admin.email,
      updatedAt: serverTimestamp(),
    });
    await logActivity(
      admin,
      'page_draft_discarded',
      'page',
      page.pageId,
      `Annulation des modifications en brouillon de la page « ${page.title} »`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// ─── Gestion des Projets ───────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<ProjectItem['category'], string> = {
  btp: 'BTP & Infrastructures',
  foncier: 'Développement Foncier',
  immobilier: 'Immobilier & Valorisation',
};

export async function saveProject(
  projectData: Omit<ProjectItem, 'id' | 'authorId' | 'createdAt' | 'updatedAt' | 'publishedAt'> & {
    id?: string;
  },
  admin: AdminUser
): Promise<string> {
  const isNew = !projectData.id;
  const projectId = projectData.id || `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const path = `projects/${projectId}`;

  const cleanPayload: Record<string, any> = {
    title: projectData.title.trim().slice(0, 160),
    slug: slugify(projectData.slug || projectData.title),
    category: projectData.category,
    categoryLabel: CATEGORY_LABELS[projectData.category] || 'BTP & Infrastructures',
    location: projectData.location.trim().slice(0, 140),
    description: projectData.description.trim().slice(0, 6000),
    executionStatus: projectData.executionStatus,
    publicationStatus: projectData.publicationStatus,
    mainImageUrl: (projectData.mainImageUrl || '').trim().slice(0, 500),
    mainImageAlt: (projectData.mainImageAlt || projectData.title).trim().slice(0, 250),
    gallery: (projectData.gallery || []).slice(0, 12),
    client: (projectData.client || '').trim().slice(0, 160),
    startDate: (projectData.startDate || '').trim().slice(0, 40),
    completionDate: (projectData.completionDate || '').trim().slice(0, 40),
    updatedAt: serverTimestamp(),
  };

  if (projectData.publicationStatus === 'published') {
    cleanPayload.publishedAt = serverTimestamp();
  }

  try {
    if (isNew) {
      await setDoc(doc(db, 'projects', projectId), {
        ...cleanPayload,
        authorId: admin.uid,
        createdAt: serverTimestamp(),
      });
      await logActivity(
        admin,
        'project_created',
        'project',
        projectId,
        `Création du projet « ${cleanPayload.title} » (${cleanPayload.publicationStatus})`
      );
    } else {
      await updateDoc(doc(db, 'projects', projectId), cleanPayload);
      await logActivity(
        admin,
        'project_updated',
        'project',
        projectId,
        `Mise à jour du projet « ${cleanPayload.title} » (${cleanPayload.publicationStatus})`
      );
    }
    return projectId;
  } catch (error) {
    handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, path);
  }
}

export async function toggleProjectPublication(
  project: ProjectItem,
  nextStatus: ProjectPublicationStatus,
  admin: AdminUser
): Promise<void> {
  const path = `projects/${project.id}`;
  try {
    const updatePayload: Record<string, any> = {
      publicationStatus: nextStatus,
      updatedAt: serverTimestamp(),
    };
    if (nextStatus === 'published') {
      updatePayload.publishedAt = serverTimestamp();
    }
    await updateDoc(doc(db, 'projects', project.id), updatePayload);
    await logActivity(
      admin,
      nextStatus === 'published' ? 'project_published' : 'project_unpublished',
      'project',
      project.id,
      `Statut de publication du projet « ${project.title} » changé en : ${nextStatus}`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteProjectItem(project: ProjectItem, admin: AdminUser): Promise<void> {
  const path = `projects/${project.id}`;
  try {
    await deleteDoc(doc(db, 'projects', project.id));
    await logActivity(
      admin,
      'project_deleted',
      'project',
      project.id,
      `Suppression du projet « ${project.title} »`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ─── Bibliothèque Multimédia ───────────────────────────────────────────────────
function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Impossible de lire le fichier sélectionné.'));
    reader.readAsDataURL(file);
  });
}

async function optimizeImageForUpload(file: File): Promise<{
  base64Data: string;
  mimeType: string;
  width: number;
  height: number;
}> {
  const rawDataUrl = await readFileAsBase64(file);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 1600;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const scale = Math.min(maxDim / width, maxDim / height);
        width = Math.max(1, Math.round(width * scale));
        height = Math.max(1, Math.round(height * scale));
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({ base64Data: rawDataUrl, mimeType: file.type || 'image/jpeg', width, height });
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      const webpUrl = canvas.toDataURL('image/webp', 0.84);
      if (webpUrl.startsWith('data:image/webp')) {
        resolve({ base64Data: webpUrl, mimeType: 'image/webp', width, height });
      } else {
        resolve({ base64Data: rawDataUrl, mimeType: file.type || 'image/jpeg', width, height });
      }
    };
    img.onerror = () => {
      resolve({ base64Data: rawDataUrl, mimeType: file.type || 'image/jpeg', width: 0, height: 0 });
    };
    img.src = rawDataUrl;
  });
}

export async function uploadMediaFile(
  file: File,
  folder: MediaFolder,
  alt: string,
  admin: AdminUser
): Promise<MediaItem> {
  const idToken = await auth.currentUser?.getIdToken(true);
  if (!idToken) throw new Error('Session administrateur expirée.');

  const optimized = await optimizeImageForUpload(file);
  const res = await fetch('/api/media/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      base64Data: optimized.base64Data,
      mimeType: optimized.mimeType,
      width: optimized.width,
      height: optimized.height,
      folder,
    }),
  });

  const payload = await res.json();
  if (!res.ok) {
    throw new Error(payload.error || "Échec du téléversement de l'image.");
  }

  const mediaId = `med_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const docData = {
    fileName: payload.fileName,
    url: payload.url,
    alt: (alt || file.name.replace(/\.[^/.]+$/, '')).trim().slice(0, 250),
    folder,
    mimeType: payload.mimeType || 'image/webp',
    sizeBytes: Number(payload.sizeBytes || 0),
    width: Number(payload.width || 0),
    height: Number(payload.height || 0),
    uploadedBy: admin.uid,
    uploadedByName: admin.displayName || admin.email,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'media', mediaId), docData);
    await logActivity(
      admin,
      'media_uploaded',
      'media',
      mediaId,
      `Importation et optimisation de l'image « ${docData.fileName} » dans le dossier ${folder}`
    );
    return { id: mediaId, ...docData } as MediaItem;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `media/${mediaId}`);
  }
}

export async function replaceMediaFile(
  existing: MediaItem,
  newFile: File,
  alt: string,
  admin: AdminUser
): Promise<void> {
  const idToken = await auth.currentUser?.getIdToken(true);
  if (!idToken) throw new Error('Session administrateur expirée.');

  const optimized = await optimizeImageForUpload(newFile);
  const res = await fetch('/api/media/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      fileName: newFile.name,
      base64Data: optimized.base64Data,
      mimeType: optimized.mimeType,
      width: optimized.width,
      height: optimized.height,
      folder: existing.folder,
    }),
  });

  const payload = await res.json();
  if (!res.ok) throw new Error(payload.error || "Échec du remplacement de l'image.");

  const oldUrl = existing.url;
  try {
    await updateDoc(doc(db, 'media', existing.id), {
      fileName: payload.fileName,
      url: payload.url,
      alt: (alt || existing.alt).trim().slice(0, 250),
      mimeType: payload.mimeType || 'image/webp',
      sizeBytes: Number(payload.sizeBytes || 0),
      width: Number(payload.width || 0),
      height: Number(payload.height || 0),
      updatedAt: serverTimestamp(),
    });

    if (oldUrl && oldUrl.startsWith('/uploaded-images/') && oldUrl !== payload.url) {
      await fetch('/api/media/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ url: oldUrl }),
      });
    }

    await logActivity(
      admin,
      'media_replaced',
      'media',
      existing.id,
      `Remplacement de l'image « ${existing.fileName} » par « ${payload.fileName} »`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `media/${existing.id}`);
  }
}

export async function updateMediaMetadata(
  mediaId: string,
  alt: string,
  folder: MediaFolder,
  admin: AdminUser
): Promise<void> {
  const path = `media/${mediaId}`;
  try {
    await updateDoc(doc(db, 'media', mediaId), {
      alt: alt.trim().slice(0, 250),
      folder,
      updatedAt: serverTimestamp(),
    });
    await logActivity(
      admin,
      'media_updated',
      'media',
      mediaId,
      `Mise à jour des métadonnées ALT / dossier du média (${mediaId})`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteMediaFile(media: MediaItem, admin: AdminUser): Promise<void> {
  const path = `media/${media.id}`;
  try {
    const idToken = await auth.currentUser?.getIdToken();
    await deleteDoc(doc(db, 'media', media.id));
    if (idToken && media.url.startsWith('/uploaded-images/')) {
      await fetch('/api/media/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ url: media.url }),
      }).catch(() => {});
    }
    await logActivity(
      admin,
      'media_deleted',
      'media',
      media.id,
      `Suppression du média « ${media.fileName} »`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ─── Messages & Formulaire de Contact ──────────────────────────────────────────
export async function submitContactMessage(data: {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
}): Promise<void> {
  const path = 'messages';
  try {
    await addDoc(collection(db, path), {
      nom: data.nom.trim().slice(0, 120),
      email: data.email.trim().toLowerCase().slice(0, 160),
      telephone: data.telephone.trim().slice(0, 40),
      sujet: data.sujet.trim().slice(0, 120),
      message: data.message.trim().slice(0, 4000),
      status: 'unread',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateMessageStatus(
  msg: ContactMessage,
  status: MessageStatus,
  adminNotes: string | undefined,
  admin: AdminUser
): Promise<void> {
  const path = `messages/${msg.id}`;
  try {
    const updatePayload: Record<string, any> = {
      status,
      handledBy: admin.uid,
      updatedAt: serverTimestamp(),
    };
    if (adminNotes !== undefined) {
      updatePayload.adminNotes = adminNotes.slice(0, 2000);
    }
    await updateDoc(doc(db, 'messages', msg.id), updatePayload);
    await logActivity(
      admin,
      'message_status_updated',
      'message',
      msg.id,
      `Message de ${msg.nom} marqué comme « ${status} »`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteContactMessage(msg: ContactMessage, admin: AdminUser): Promise<void> {
  const path = `messages/${msg.id}`;
  try {
    await deleteDoc(doc(db, 'messages', msg.id));
    await logActivity(
      admin,
      'message_deleted',
      'message',
      msg.id,
      `Suppression du message de ${msg.nom} (${msg.sujet})`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ─── Paramètres Généraux du Site (Super Admin) ─────────────────────────────────
export async function saveSiteSettings(
  settings: Omit<SiteSettings, 'updatedBy' | 'updatedAt'>,
  admin: AdminUser
): Promise<void> {
  const path = 'settings/site';
  const cleanPayload = {
    companyName: settings.companyName.trim().slice(0, 120),
    legalName: (settings.legalName || '').trim().slice(0, 200),
    slogan: settings.slogan.trim().slice(0, 200),
    logoLightUrl: (settings.logoLightUrl || '/logo.png').trim().slice(0, 500),
    logoDarkUrl: (settings.logoDarkUrl || '/logo-dark.png').trim().slice(0, 500),
    phone: settings.phone.trim().slice(0, 50),
    email: settings.email.trim().slice(0, 160),
    address: settings.address.trim().slice(0, 250),
    headquarters: (settings.headquarters || '').trim().slice(0, 300),
    hours: (settings.hours || '').trim().slice(0, 160),
    footerCopyright: (settings.footerCopyright || '').trim().slice(0, 250),
    socialLinks: {
      facebook: settings.socialLinks?.facebook || '',
      linkedin: settings.socialLinks?.linkedin || '',
      tiktok: settings.socialLinks?.tiktok || '',
      youtube: settings.socialLinks?.youtube || '',
    },
    seoTitle: settings.seoTitle.trim().slice(0, 140),
    seoDescription: settings.seoDescription.trim().slice(0, 320),
    seoKeywords: (settings.seoKeywords || '').trim().slice(0, 300),
    updatedBy: admin.uid,
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'settings', 'site'), cleanPayload, { merge: false });
    await logActivity(
      admin,
      'settings_updated',
      'settings',
      'site',
      'Mise à jour des paramètres généraux et SEO du site'
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ─── Gestion des Utilisateurs Administrateurs (Super Admin) ────────────────────
export async function createOrInviteAdminUser(
  params: {
    email: string;
    username?: string;
    displayName: string;
    role: AdminRole;
    tempPassword?: string;
  },
  superAdmin: AdminUser
): Promise<{ method: 'auth_created' | 'invite_created'; emailProviderMissing?: boolean }> {
  const cleanEmail = params.email.trim().toLowerCase();
  const cleanName = params.displayName.trim();
  const cleanUsername = params.username?.trim();

  // Si un mot de passe temporaire est fourni, tenter création directe Firebase Auth via instance secondaire
  if (params.tempPassword && params.tempPassword.length >= 6) {
    try {
      const cred = await createUserWithEmailAndPassword(
        secondaryAuth,
        cleanEmail,
        params.tempPassword
      );
      await sendEmailVerification(cred.user).catch(() => {});
      await sendPasswordResetEmail(secondaryAuth, cleanEmail).catch(() => {});
      const newUid = cred.user.uid;
      await signOut(secondaryAuth).catch(() => {});

      const payload: Record<string, any> = {
        uid: newUid,
        email: cleanEmail,
        displayName: cleanName.slice(0, 100),
        role: params.role,
        active: true,
        createdBy: superAdmin.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      if (cleanUsername) payload.username = cleanUsername.slice(0, 60);

      await setDoc(doc(db, 'admins', newUid), payload);
      await registerUsernameServer(cleanUsername, cleanEmail);
      await logActivity(
        superAdmin,
        'admin_created',
        'admin',
        newUid,
        `Création du compte ${params.role} pour ${cleanEmail}`
      );
      return { method: 'auth_created' };
    } catch (err: any) {
      const code = err?.code || '';
      if (code !== 'auth/operation-not-allowed' && code !== 'auth/email-already-in-use') {
        throw err;
      }
      // Repli propre sur invitation vérifiée si le fournisseur Email/Mot de passe n'est pas encore activé ou si le compte Auth existe déjà
      const inviteId = `inv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const invitePayload: Record<string, any> = {
        email: cleanEmail,
        displayName: cleanName.slice(0, 100),
        role: params.role,
        active: true,
        invitedBy: superAdmin.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      if (cleanUsername) invitePayload.username = cleanUsername.slice(0, 60);
      await setDoc(doc(db, 'adminInvites', inviteId), invitePayload);
      await logActivity(
        superAdmin,
        'admin_invited',
        'admin',
        inviteId,
        `Invitation administrateur créée pour ${cleanEmail} (rôle: ${params.role})`
      );
      return {
        method: 'invite_created',
        emailProviderMissing: code === 'auth/operation-not-allowed',
      };
    }
  }

  // Sinon créer une invitation directe (connexion Google ou Email vérifié)
  const inviteId = `inv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const invitePayload: Record<string, any> = {
    email: cleanEmail,
    displayName: cleanName.slice(0, 100),
    role: params.role,
    active: true,
    invitedBy: superAdmin.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (cleanUsername) invitePayload.username = cleanUsername.slice(0, 60);

  try {
    await setDoc(doc(db, 'adminInvites', inviteId), invitePayload);
    await logActivity(
      superAdmin,
      'admin_invited',
      'admin',
      inviteId,
      `Invitation administrateur créée pour ${cleanEmail} (rôle: ${params.role})`
    );
    return { method: 'invite_created' };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `adminInvites/${inviteId}`);
  }
}

export async function updateAdminUserAccount(
  targetUid: string,
  updates: { displayName: string; username?: string; role: AdminRole; active: boolean },
  superAdmin: AdminUser
): Promise<void> {
  const path = `admins/${targetUid}`;
  try {
    const payload: Record<string, any> = {
      displayName: updates.displayName.trim().slice(0, 100),
      role: updates.role,
      active: updates.active,
      updatedAt: serverTimestamp(),
    };
    if (updates.username !== undefined) {
      payload.username = updates.username.trim().slice(0, 60);
    }
    await updateDoc(doc(db, 'admins', targetUid), payload);
    await logActivity(
      superAdmin,
      'admin_role_updated',
      'admin',
      targetUid,
      `Mise à jour des permissions de ${updates.displayName} (rôle: ${updates.role}, actif: ${updates.active ? 'oui' : 'non'})`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function revokeAdminUser(target: AdminUser, superAdmin: AdminUser): Promise<void> {
  const path = `admins/${target.uid}`;
  try {
    await deleteDoc(doc(db, 'admins', target.uid));
    await logActivity(
      superAdmin,
      'admin_revoked',
      'admin',
      target.uid,
      `Révocation du compte administrateur ${target.email}`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function cancelAdminInvite(invite: AdminInvite, superAdmin: AdminUser): Promise<void> {
  const path = `adminInvites/${invite.id}`;
  try {
    await deleteDoc(doc(db, 'adminInvites', invite.id));
    await logActivity(
      superAdmin,
      'admin_invite_cancelled',
      'admin',
      invite.id,
      `Annulation de l'invitation pour ${invite.email}`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export type { ActivityLog };
