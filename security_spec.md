# Spécification de Sécurité Firestore — DA-TO GUINÉE SA

## 1. Invariants de Données (Data Invariants)
1. **Zéro Escalade de Privilèges** : Aucun utilisateur non authentifié ou éditeur ne peut créer, modifier ou supprimer un document `/admins/{uid}`. Seul un `super_admin` actif (avec e-mail vérifié) ou le compte bootstrap vérifié (`sagnomichel2026@gmail.com` lorsque la collection est initialisée ou pour son propre profil bootstrap) peut gérer les comptes administrateurs.
2. **Isolation PII** : Les collections `/admins/{uid}` et `/messages/{messageId}` contiennent des données personnelles (`email`, `telephone`, `nom`, `message`). Leur lecture (`get` et `list`) est strictement interdite aux visiteurs publics et aux comptes non-administrateurs.
3. **Intégrité des Projets Publiés** : Les visiteurs publics ne peuvent lire (`get` ou `list`) que les projets dont `publicationStatus == 'published'`. Les brouillons et projets en attente restent strictement réservés aux administrateurs authentifiés.
4. **Intégrité Temporelle & Immutabilité** : Tous les champs `createdAt` doivent être égaux à `request.time` à la création et restent immuables à la mise à jour ; `updatedAt` doit être égal à `request.time` à chaque écriture.
5. **Journal d'Audit Immuable** : Les entrées de `/activityLogs/{logId}` ne peuvent jamais être modifiées ni supprimées côté client (`update: false, delete: false`). L'`actorUid` doit strictement correspondre à `request.auth.uid`.
6. **Soumission Publique Sécurisée du Formulaire de Contact** : Un visiteur anonyme ne peut créer un message dans `/messages/{messageId}` que si le statut initial est strictement `'unread'`, sans champs fantômes, avec bornes de longueur strictes sur chaque champ et `createdAt == request.time`.
7. **Restriction de Rôle Éditeur** : Un compte ayant le rôle `'editor'` peut gérer `/pages`, `/projects`, `/media` et `/messages`, mais ne peut pas modifier `/admins` ni `/settings` (paramètres généraux sensibles et SEO).

## 2. Les 12 Payloads Malveillants ("Dirty Dozen")
1. **Escalade de rôle par auto-inscription** : Un utilisateur authentifié non-admin tente `create` sur `/admins/{uid}` avec `{ role: "super_admin", active: true }`.
2. **Modification de son propre rôle par un Éditeur** : Un utilisateur avec rôle `'editor'` tente `update` sur `/admins/{sonUid}` avec `{ role: "super_admin" }`.
3. **Spoofing d'e-mail administrateur non vérifié** : Un compte avec `email: "sagnomichel2026@gmail.com"` mais `email_verified: false` tente une lecture/écriture admin.
4. **Lecture PII de messages par un utilisateur lambda** : Un client non-admin tente `get` ou `list` sur `/messages`.
5. **Liste non filtrée de projets par un visiteur** : Un client public exécute `list` sur `/projects` sans filtre `publicationStatus == 'published'` (tentative de lecture des brouillons).
6. **Injection de champ fantôme (Shadow Update)** : Un attaquant envoie `{ nom: "Test", ..., status: "unread", isAdminOverride: true }` sur `/messages/{id}`.
7. **Falsification de statut initial sur Contact** : Un visiteur tente de créer un message dans `/messages/{id}` avec `{ status: "handled" }`.
8. **Injection de chaîne géante (Resource Poisoning)** : Un utilisateur tente d'écrire une chaîne de 100 Ko dans `nom` ou un ID de document invalide (`../../admin` ou >128 caractères).
9. **Modification des paramètres globaux par un Éditeur** : Un `'editor'` tente `update` sur `/settings/site`.
10. **Altération du journal d'audit** : Même un `super_admin` tente `update` ou `delete` sur `/activityLogs/{logId}`.
11. **Usurpation d'identité dans le journal** : Un éditeur tente de créer un log dans `/activityLogs/{logId}` avec `actorUid: "autre_admin_uid"`.
12. **Falsification d'horodatage (`createdAt` / `updatedAt`)** : Une requête client envoie un `createdAt` ou `updatedAt` différent de `request.time`.
