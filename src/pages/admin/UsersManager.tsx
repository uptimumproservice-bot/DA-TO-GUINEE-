import { useState } from 'react';
import {
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  CheckCircle2,
  Clock,
  Ban,
  AlertTriangle,
} from 'lucide-react';
import { AdminInvite, AdminRole, AdminUser } from '@/types/cms';
import {
  cancelAdminInvite,
  createOrInviteAdminUser,
  revokeAdminUser,
  updateAdminUserAccount,
} from '@/services/cmsService';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

interface UsersManagerProps {
  currentAdmin: AdminUser;
  admins: AdminUser[];
  invites: AdminInvite[];
  onNotify: (type: 'success' | 'error', msg: string) => void;
}

export function UsersManager({
  currentAdmin,
  admins,
  invites,
  onNotify,
}: UsersManagerProps) {
  const isSuperAdmin = currentAdmin.role === 'super_admin';

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<AdminRole>('editor');
  const [tempPassword, setTempPassword] = useState('');
  const [creating, setCreating] = useState(false);
  const [providerHint, setProviderHint] = useState(false);

  const [targetToRevoke, setTargetToRevoke] = useState<AdminUser | null>(null);
  const [inviteToCancel, setInviteToCancel] = useState<AdminInvite | null>(null);
  const [processing, setProcessing] = useState(false);

  if (!isSuperAdmin) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center max-w-xl mx-auto">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-[#0B2C5C]">Accès réservé au Super Administrateur</h3>
        <p className="text-sm text-slate-600 mt-1">
          Votre compte possède le rôle Éditeur. Seul un Super Administrateur peut créer, modifier ou
          révoquer des comptes administrateurs.
        </p>
      </div>
    );
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !email.trim()) {
      onNotify('error', 'Nom complet et adresse e-mail obligatoires.');
      return;
    }
    setCreating(true);
    setProviderHint(false);
    try {
      const res = await createOrInviteAdminUser(
        {
          displayName,
          email,
          username: username.trim() || undefined,
          role,
          tempPassword: tempPassword.trim() || undefined,
        },
        currentAdmin
      );

      if (res.emailProviderMissing) {
        setProviderHint(true);
        onNotify(
          'success',
          `Invitation créée pour ${email}. L'utilisateur peut se connecter avec Google immédiatement.`
        );
      } else if (res.method === 'auth_created') {
        onNotify(
          'success',
          `Compte créé pour ${email}. Un e-mail de vérification et de réinitialisation a été envoyé.`
        );
      } else {
        onNotify(
          'success',
          `Accès autorisé (invitation) créé pour ${email}. Dès sa première connexion Google ou e-mail vérifié, son rôle « ${role === 'super_admin' ? 'Super administrateur' : 'Éditeur'} » sera activé.`
        );
      }
      setDisplayName('');
      setEmail('');
      setUsername('');
      setTempPassword('');
      setRole('editor');
    } catch (err: any) {
      onNotify('error', err?.message || "Erreur lors de l'ajout de l'administrateur.");
    } finally {
      setCreating(false);
    }
  };

  const handleRoleToggle = async (target: AdminUser, newRole: AdminRole) => {
    if (target.uid === currentAdmin.uid && newRole !== 'super_admin') {
      onNotify('error', 'Vous ne pouvez pas retirer vos propres droits de Super Administrateur.');
      return;
    }
    try {
      await updateAdminUserAccount(
        target.uid,
        {
          displayName: target.displayName,
          username: target.username,
          role: newRole,
          active: target.active,
        },
        currentAdmin
      );
      onNotify('success', `Rôle de ${target.displayName} mis à jour.`);
    } catch (err: any) {
      onNotify('error', err?.message || 'Erreur lors de la modification du rôle.');
    }
  };

  const handleActiveToggle = async (target: AdminUser) => {
    if (target.uid === currentAdmin.uid) {
      onNotify('error', 'Vous ne pouvez pas désactiver votre propre compte.');
      return;
    }
    try {
      await updateAdminUserAccount(
        target.uid,
        {
          displayName: target.displayName,
          username: target.username,
          role: target.role,
          active: !target.active,
        },
        currentAdmin
      );
      onNotify(
        'success',
        target.active
          ? `Compte de ${target.displayName} suspendu.`
          : `Compte de ${target.displayName} réactivé.`
      );
    } catch (err: any) {
      onNotify('error', err?.message || 'Erreur lors de la mise à jour du statut.');
    }
  };

  const handleConfirmRevoke = async () => {
    if (!targetToRevoke) return;
    setProcessing(true);
    try {
      await revokeAdminUser(targetToRevoke, currentAdmin);
      onNotify('success', `Accès de ${targetToRevoke.email} révoqué.`);
    } catch (err: any) {
      onNotify('error', err?.message || 'Erreur lors de la révocation.');
    } finally {
      setProcessing(false);
      setTargetToRevoke(null);
    }
  };

  const handleConfirmCancelInvite = async () => {
    if (!inviteToCancel) return;
    setProcessing(true);
    try {
      await cancelAdminInvite(inviteToCancel, currentAdmin);
      onNotify('success', `Invitation pour ${inviteToCancel.email} annulée.`);
    } catch (err: any) {
      onNotify('error', err?.message || "Impossible d'annuler l'invitation.");
    } finally {
      setProcessing(false);
      setInviteToCancel(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire ajout / invitation */}
      <form
        onSubmit={handleCreate}
        className="bg-white border border-slate-200 rounded-xl p-5 space-y-4"
      >
        <div className="flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-[#F5A623]" />
          <div>
            <h3 className="text-sm font-bold text-[#0B2C5C]">
              Ajouter ou inviter un administrateur
            </h3>
            <p className="text-xs text-slate-500">
              Accordez un accès Super Administrateur ou Éditeur en toute sécurité.
            </p>
          </div>
        </div>

        {providerHint && (
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              La méthode Email/Mot de passe n&apos;est pas encore activée dans Firebase Console :
              une invitation sécurisée a été créée afin que l&apos;utilisateur puisse se connecter
              via Google dès maintenant.
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet *</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ex: Amadou Diallo"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Adresse e-mail *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nom@datoguinee.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Identifiant (optionnel)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ex: adiallo"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Rôle *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            >
              <option value="editor">Éditeur (Contenus, Projets, Médias, Messages)</option>
              <option value="super_admin">Super administrateur (Accès complet)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mot de passe temp. (optionnel)
            </label>
            <input
              type="password"
              minLength={6}
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              placeholder="Vide = Connexion Google"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={creating}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B2C5C] text-white text-xs font-bold hover:bg-[#0E3E7E] cursor-pointer disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{creating ? 'Traitement…' : 'Autoriser cet administrateur'}</span>
          </button>
        </div>
      </form>

      {/* Liste des administrateurs actifs */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-[#0B2C5C]">
            Comptes administrateurs ({admins.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-4">Administrateur</th>
                <th className="py-2.5 px-4">E-mail / Identifiant</th>
                <th className="py-2.5 px-4">Rôle</th>
                <th className="py-2.5 px-4">Statut</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {admins.map((adm) => {
                const isSelf = adm.uid === currentAdmin.uid;
                return (
                  <tr key={adm.uid} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {adm.displayName}{' '}
                      {isSelf && (
                        <span className="ml-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold">
                          Vous
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{adm.email}</div>
                      {adm.username && (
                        <div className="text-[11px] font-mono text-slate-400">@{adm.username}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        disabled={isSelf}
                        value={adm.role}
                        onChange={(e) => handleRoleToggle(adm, e.target.value as AdminRole)}
                        className="px-2.5 py-1 rounded border border-slate-300 text-xs font-semibold bg-white disabled:opacity-60"
                      >
                        <option value="super_admin">Super administrateur</option>
                        <option value="editor">Éditeur</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      {adm.active ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[11px] font-bold">
                          <Ban className="w-3 h-3" /> Suspendu
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {!isSelf && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleActiveToggle(adm)}
                            className="px-2.5 py-1 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            {adm.active ? 'Suspendre' : 'Réactiver'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setTargetToRevoke(adm)}
                            className="p-1.5 rounded text-red-600 hover:bg-red-50 cursor-pointer inline-flex items-center"
                            title="Révoquer définitivement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invitations en attente */}
      {invites.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="text-sm font-bold text-[#0B2C5C]">
              Invitations en attente d&apos;activation ({invites.length})
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="font-bold text-slate-800">
                      {inv.displayName} ({inv.email})
                    </p>
                    <p className="text-slate-500">
                      Rôle attribué :{' '}
                      <strong>
                        {inv.role === 'super_admin' ? 'Super administrateur' : 'Éditeur'}
                      </strong>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInviteToCancel(inv)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 font-semibold cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Annuler invitation</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmations */}
      <ConfirmModal
        open={!!targetToRevoke}
        title="Révoquer cet administrateur ?"
        description={`Le compte de « ${targetToRevoke?.email || ''} » perdra immédiatement tout accès au back-office DA-TO GUINÉE.`}
        confirmLabel="Révoquer l'accès"
        loading={processing}
        onConfirm={handleConfirmRevoke}
        onCancel={() => setTargetToRevoke(null)}
      />

      <ConfirmModal
        open={!!inviteToCancel}
        title="Annuler cette invitation ?"
        description={`L'adresse « ${inviteToCancel?.email || ''} » ne pourra plus activer de compte administrateur.`}
        confirmLabel="Annuler l'invitation"
        loading={processing}
        onConfirm={handleConfirmCancelInvite}
        onCancel={() => setInviteToCancel(null)}
      />
    </div>
  );
}
