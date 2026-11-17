import { useState } from 'react';
import { Link } from 'react-router';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  UserPlus,
  RefreshCw,
} from 'lucide-react';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  User,
} from '@firebase/auth';
import { auth } from '@/lib/firebase';
import {
  bootstrapFirstSuperAdmin,
  logActivity,
  resolveOrClaimAdminProfile,
} from '@/services/cmsService';
import { AdminUser } from '@/types/cms';

interface AdminLoginProps {
  bootstrapInitialized: boolean;
  pendingVerifyUser: User | null;
  onRefreshVerify: () => Promise<void>;
  onAuthenticated: (admin: AdminUser) => void;
}

export function AdminLogin({
  bootstrapInitialized,
  pendingVerifyUser,
  onRefreshVerify,
  onAuthenticated,
}: AdminLoginProps) {
  const [mode, setMode] = useState<'login' | 'reset' | 'bootstrap'>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // First admin bootstrap state
  const [bootstrapName, setBootstrapName] = useState('');
  const [bootstrapUsername, setBootstrapUsername] = useState('');
  const [bootstrapEmail, setBootstrapEmail] = useState('');
  const [bootstrapPassword, setBootstrapPassword] = useState('');
  const [bootstrapConfirm, setBootstrapConfirm] = useState('');

  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [showProviderGuide, setShowProviderGuide] = useState(false);

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setInfoMsg('');
    setShowProviderGuide(false);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      const profile = await resolveOrClaimAdminProfile(cred.user);
      if (!profile) {
        await signOut(auth);
        setErrorMsg(
          "Accès refusé : ce compte Google n'est pas autorisé dans la liste des administrateurs DA-TO GUINÉE."
        );
        return;
      }
      await logActivity(
        profile,
        'admin_login',
        'auth',
        profile.uid,
        `Connexion réussie via Google (${profile.email})`
      );
      onAuthenticated(profile);
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Fenêtre de connexion fermée avant la fin.');
      } else {
        setErrorMsg(err?.message || 'Erreur lors de la connexion Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setShowProviderGuide(false);

    const idVal = identifier.trim();
    if (!idVal || !password) {
      setErrorMsg('Veuillez renseigner votre identifiant/e-mail et votre mot de passe.');
      return;
    }

    setLoading(true);
    try {
      let targetEmail = idVal;
      if (!idVal.includes('@')) {
        // Resolve username securely via server endpoint that verifies password before returning email
        const res = await fetch('/api/auth/login-username', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: idVal, password }),
        });
        const data = await res.json();
        if (!res.ok || !data.email) {
          setErrorMsg(data.error || 'Identifiant ou mot de passe incorrect.');
          return;
        }
        targetEmail = data.email;
      }

      const cred = await signInWithEmailAndPassword(auth, targetEmail, password);
      if (!cred.user.emailVerified) {
        await sendEmailVerification(cred.user).catch(() => {});
        setInfoMsg(
          "Votre adresse e-mail n'est pas encore vérifiée. Un e-mail de vérification vient d'être envoyé."
        );
        return;
      }

      const profile = await resolveOrClaimAdminProfile(cred.user);
      if (!profile) {
        await signOut(auth);
        setErrorMsg("Accès refusé : aucun profil administrateur actif n'est associé à ce compte.");
        return;
      }

      await logActivity(
        profile,
        'admin_login',
        'auth',
        profile.uid,
        `Connexion réussie par mot de passe (${profile.email})`
      );
      onAuthenticated(profile);
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/operation-not-allowed') {
        setShowProviderGuide(true);
        setErrorMsg(
          "La connexion par e-mail/mot de passe doit d'abord être activée dans la console Firebase Authentication. En attendant, vous pouvez vous connecter avec Google."
        );
      } else if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        setErrorMsg('Identifiant ou mot de passe incorrect.');
      } else if (code === 'auth/too-many-requests') {
        setErrorMsg('Trop de tentatives échouées. Veuillez patienter quelques minutes.');
      } else {
        setErrorMsg(err?.message || 'Erreur lors de la connexion.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBootstrapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setShowProviderGuide(false);

    if (!bootstrapName.trim() || !bootstrapEmail.trim() || bootstrapPassword.length < 8) {
      setErrorMsg('Nom complet, e-mail valide et mot de passe (8 caractères minimum) requis.');
      return;
    }
    if (bootstrapPassword !== bootstrapConfirm) {
      setErrorMsg('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        bootstrapEmail.trim().toLowerCase(),
        bootstrapPassword
      );
      await sendEmailVerification(cred.user);
      setInfoMsg(
        'Compte créé ! Vérifiez votre boîte mail et cliquez sur le lien de confirmation, puis cliquez sur « J’ai vérifié mon e-mail » pour finaliser l’initialisation du premier Super Administrateur.'
      );
      // Save pending displayName/username in sessionStorage temporarily so after email verification it finishes cleanly
      sessionStorage.setItem(
        'dato_pending_bootstrap',
        JSON.stringify({
          displayName: bootstrapName.trim(),
          username: bootstrapUsername.trim(),
        })
      );
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed') {
        setShowProviderGuide(true);
        setErrorMsg(
          "L'inscription par e-mail/mot de passe n'est pas encore activée dans Firebase Console. Utilisez « Initialiser avec Google » ci-dessous ou activez Email/Mot de passe dans Firebase Authentication."
        );
      } else if (err?.code === 'auth/email-already-in-use') {
        setErrorMsg('Cette adresse e-mail est déjà utilisée. Connectez-vous normalement.');
      } else {
        setErrorMsg(err?.message || 'Impossible de créer le premier administrateur.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBootstrapWithGoogle = async () => {
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      const profile = await bootstrapFirstSuperAdmin(
        cred.user,
        bootstrapName.trim() || cred.user.displayName || 'Super Administrateur',
        bootstrapUsername.trim()
      );
      onAuthenticated(profile);
    } catch (err: any) {
      setErrorMsg(err?.message || "Erreur lors de l'initialisation via Google.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    if (!resetEmail.trim()) {
      setErrorMsg('Veuillez saisir votre adresse e-mail.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim().toLowerCase());
      setInfoMsg(
        'Si un compte existe pour cette adresse e-mail, un lien de réinitialisation vient d’être envoyé.'
      );
    } catch (err: any) {
      setErrorMsg(err?.message || "Impossible d'envoyer l'e-mail de réinitialisation.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!pendingVerifyUser) return;
    setLoading(true);
    setErrorMsg('');
    try {
      await sendEmailVerification(pendingVerifyUser);
      setInfoMsg('E-mail de vérification renvoyé.');
    } catch (err: any) {
      setErrorMsg(err?.message || "Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  // Écran dédié si l'utilisateur vient de s'inscrire par e-mail et doit confirmer son adresse
  if (pendingVerifyUser && !pendingVerifyUser.emailVerified) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-center mb-6">
            <img src="/logo.png" alt="DA-TO GUINEE SA" className="h-12 object-contain" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F5A623] flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-[#0B2C5C] text-center mb-2">
            Vérification d&apos;adresse e-mail requise
          </h1>
          <p className="text-sm text-slate-600 text-center mb-6 leading-relaxed">
            Un lien de confirmation a été envoyé à{' '}
            <strong className="text-slate-900">{pendingVerifyUser.email}</strong>. Cliquez dessus
            pour valider votre identité avant d&apos;accéder au back-office.
          </p>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {infoMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{infoMsg}</span>
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onRefreshVerify}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#0B2C5C] text-white text-sm font-semibold hover:bg-[#0E3E7E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              J&apos;ai vérifié mon e-mail (Continuer)
            </button>
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Renvoyer l&apos;e-mail de vérification
            </button>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Changer de compte
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0B2C5C]">
          ← Retour au site public DA-TO GUINÉE
        </Link>
        <span className="text-xs font-mono text-slate-400">PORTAIL ADMINISTRATION</span>
      </div>

      <div className="flex-1 flex items-center justify-center py-6">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Header logo */}
          <div className="text-center mb-6">
            <img
              src="/logo.png"
              alt="DA-TO GUINEE SA"
              className="h-12 w-auto object-contain mx-auto mb-4"
            />
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0B2C5C] bg-slate-100 px-3 py-1 rounded-md mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Accès Sécurisé Back-Office</span>
            </div>
            <h1 className="text-xl font-bold text-[#0B2C5C]">
              {mode === 'login'
                ? 'Connexion Administrateur'
                : mode === 'reset'
                  ? 'Réinitialiser le mot de passe'
                  : 'Créer le premier Super Administrateur'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'login'
                ? 'Connectez-vous pour gérer les pages, projets, médias et messages.'
                : mode === 'reset'
                  ? 'Recevez un lien sécurisé pour définir un nouveau mot de passe.'
                  : 'Initialisation unique du premier compte Super Administrateur.'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {showProviderGuide && (
            <div className="mb-4 p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
              <p className="font-bold mb-1">Configuration Firebase Console requise :</p>
              <p>
                Pour activer l&apos;authentification par e-mail/mot de passe, ouvrez Firebase Console →{' '}
                <strong>Authentication → Sign-in method → Adresse e-mail/Mot de passe → Activer</strong>.
                La connexion via <strong>Google</strong> est déjà opérationnelle immédiatement.
              </p>
            </div>
          )}

          {infoMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{infoMsg}</span>
            </div>
          )}

          {mode === 'login' && (
            <>
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Identifiant ou adresse e-mail
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      autoComplete="username"
                      placeholder="admin@datoguinee.com ou identifiant"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Mot de passe
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg('');
                        setInfoMsg('');
                        setMode('reset');
                      }}
                      className="text-xs font-semibold text-[#0B2C5C] hover:text-[#F5A623] cursor-pointer"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#0B2C5C] hover:bg-[#0E3E7E] text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>{loading ? 'Vérification…' : 'Se connecter'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-semibold">ou</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continuer avec Google</span>
              </button>

              {!bootstrapInitialized && (
                <div className="mt-5 pt-4 border-t border-slate-200 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg('');
                      setInfoMsg('');
                      setMode('bootstrap');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B2C5C] hover:text-[#F5A623] cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Première installation ? Créer le premier Super Administrateur</span>
                  </button>
                </div>
              )}
            </>
          )}

          {mode === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Adresse e-mail du compte administrateur
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    placeholder="admin@datoguinee.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-[#0B2C5C] hover:bg-[#0E3E7E] text-white text-sm font-bold transition-colors cursor-pointer disabled:opacity-60"
              >
                {loading ? 'Envoi…' : 'Envoyer le lien de réinitialisation'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setInfoMsg('');
                  setMode('login');
                }}
                className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-[#0B2C5C] cursor-pointer"
              >
                ← Retour à la connexion
              </button>
            </form>
          )}

          {mode === 'bootstrap' && !bootstrapInitialized && (
            <div className="space-y-4">
              <form onSubmit={handleBootstrapSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={bootstrapName}
                    onChange={(e) => setBootstrapName(e.target.value)}
                    required
                    placeholder="Ex : Direction Générale"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Identifiant (optionnel)
                  </label>
                  <input
                    type="text"
                    value={bootstrapUsername}
                    onChange={(e) => setBootstrapUsername(e.target.value)}
                    placeholder="ex : admin_dato"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    value={bootstrapEmail}
                    onChange={(e) => setBootstrapEmail(e.target.value)}
                    required
                    placeholder="directeur@datoguinee.com"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mot de passe
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={bootstrapPassword}
                      onChange={(e) => setBootstrapPassword(e.target.value)}
                      required
                      minLength={8}
                      placeholder="Min. 8 caractères"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Confirmation
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={bootstrapConfirm}
                      onChange={(e) => setBootstrapConfirm(e.target.value)}
                      required
                      minLength={8}
                      placeholder="Confirmer"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#F5A623] hover:bg-[#e0951a] text-white text-sm font-bold transition-colors cursor-pointer disabled:opacity-60"
                >
                  {loading ? 'Création…' : 'Créer le compte Super Administrateur'}
                </button>
              </form>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400">ou</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBootstrapWithGoogle}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors cursor-pointer"
              >
                Initialiser en 1 clic avec Google
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setInfoMsg('');
                  setMode('login');
                }}
                className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-[#0B2C5C] cursor-pointer"
              >
                ← Retour à la connexion
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-[11px] text-slate-400 py-2">
        © {new Date().getFullYear()} DA-TO GUINEE SA — Administration sécurisée
      </p>
    </div>
  );
}
