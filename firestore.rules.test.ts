/**
 * Suite de vérification des invariants de sécurité Firestore (Dirty Dozen)
 * À exécuter avec l'émulateur Firestore (@firebase/rules-unit-testing).
 */

export interface SecurityTestCase {
  id: number;
  name: string;
  collection: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  actor: 'anonymous' | 'unverified_bootstrapped_email' | 'editor' | 'super_admin';
  payload?: Record<string, unknown>;
  expected: 'PERMISSION_DENIED' | 'ALLOW';
}

export const dirtyDozenTests: SecurityTestCase[] = [
  {
    id: 1,
    name: 'Escalade de privilèges par auto-inscription dans /admins',
    collection: '/admins/attacker_uid',
    operation: 'create',
    actor: 'anonymous',
    payload: {
      uid: 'attacker_uid',
      email: 'attacker@example.com',
      displayName: 'Attacker',
      role: 'super_admin',
      active: true,
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Auto-promotion de rôle par un Éditeur',
    collection: '/admins/editor_uid',
    operation: 'update',
    actor: 'editor',
    payload: { role: 'super_admin' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Spoofing e-mail administrateur avec email_verified=false',
    collection: '/messages',
    operation: 'list',
    actor: 'unverified_bootstrapped_email',
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Lecture PII /messages par utilisateur non-admin',
    collection: '/messages',
    operation: 'list',
    actor: 'anonymous',
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Lecture de projets en brouillon par un visiteur public',
    collection: '/projects/draft_proj_1',
    operation: 'get',
    actor: 'anonymous',
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Shadow Update (champ fantôme) lors de soumission Contact',
    collection: '/messages/msg_shadow',
    operation: 'create',
    actor: 'anonymous',
    payload: {
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+224628000000',
      sujet: 'Demande de devis',
      message: 'Bonjour, je souhaite un devis.',
      status: 'unread',
      isVerified: true,
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Falsification du statut initial Contact (handled au lieu de unread)',
    collection: '/messages/msg_bad_status',
    operation: 'create',
    actor: 'anonymous',
    payload: {
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+224628000000',
      sujet: 'Demande de devis',
      message: 'Bonjour, je souhaite un devis.',
      status: 'handled',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Injection d ID malveillant / empoisonnement de ressource',
    collection: '/messages/' + 'A'.repeat(200),
    operation: 'create',
    actor: 'anonymous',
    payload: {
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+224628000000',
      sujet: 'Demande de devis',
      message: 'Test empoisonnement.',
      status: 'unread',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Modification des paramètres globaux /settings par un Éditeur',
    collection: '/settings/site',
    operation: 'update',
    actor: 'editor',
    payload: { companyName: 'Pirate Corp' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Tentative de suppression du journal d audit par Super Admin',
    collection: '/activityLogs/log_1',
    operation: 'delete',
    actor: 'super_admin',
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Usurpation d actorUid dans /activityLogs',
    collection: '/activityLogs/log_spoof',
    operation: 'create',
    actor: 'editor',
    payload: {
      actorUid: 'another_admin_uid',
      actorEmail: 'other@datoguinee.com',
      actorName: 'Other',
      actorRole: 'super_admin',
      action: 'page_published',
      targetType: 'page',
      targetId: 'accueil',
      details: 'Test usurpation',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Soumission Contact légitime sans champs superflus',
    collection: '/messages/msg_valid_1',
    operation: 'create',
    actor: 'anonymous',
    payload: {
      nom: 'Amadou Diallo',
      email: 'amadou@example.gn',
      telephone: '+224 628 00 11 22',
      sujet: 'Information sur un projet',
      message: 'Bonjour, nous souhaitons en savoir plus sur vos services BTP.',
      status: 'unread',
    },
    expected: 'ALLOW',
  },
];
