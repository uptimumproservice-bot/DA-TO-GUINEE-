import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Image as ImageIcon,
  Mail,
  Settings,
  Users,
  History,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { onAuthStateChanged, signOut, User } from '@firebase/auth';
import { collection, onSnapshot, orderBy, query, limit } from '@firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '@/lib/firebase';
import {
  ActivityLog,
  AdminInvite,
  AdminUser,
  ContactMessage,
  MediaItem,
  ProjectItem,
  SitePageDoc,
} from '@/types/cms';
import {
  bootstrapFirstSuperAdmin,
  checkBootstrapInitialized,
  ensureDefaultCmsSeed,
  logActivity,
  resolveOrClaimAdminProfile,
} from '@/services/cmsService';
import { useSiteContent } from '@/contexts/SiteContentContext';

import { AdminLogin } from './AdminLogin';
import { DashboardOverview, AdminTab } from './DashboardOverview';
import { PagesManager } from './PagesManager';
import { ProjectsManager } from './ProjectsManager';
import { MediaLibrary } from './MediaLibrary';
import { MessagesInbox } from './MessagesInbox';
import { SiteSettingsManager } from './SiteSettingsManager';
import { UsersManager } from './UsersManager';
import { ActivityLogsView } from './ActivityLogsView';

export default function AdminApp() {
  const { settings } = useSiteContent();

  const [authChecking, setAuthChecking] = useState(true);
  const [bootstrapInitialized, setBootstrapInitialized] = useState(true);
  const [pendingVerifyUser, setPendingVerifyUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [authDeniedMsg, setAuthDeniedMsg] = useState('');

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live collections
  const [pages, setPages] = useState<SitePageDoc[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [invites, setInvites] = useState<AdminInvite[]>([]);

  // Toast notifications
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const notify = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const evaluateUser = async (user: User | null) => {
    setAuthDeniedMsg('');
    if (!user) {
      setAdmin(null);
      setPendingVerifyUser(null);
      const initialized = await checkBootstrapInitialized();
      setBootstrapInitialized(initialized);
      setAuthChecking(false);
      return;
    }

    if (!user.emailVerified) {
      setPendingVerifyUser(user);
      setAdmin(null);
      setAuthChecking(false);
      return;
    }

    setPendingVerifyUser(null);

    try {
      // Finaliser un bootstrap en attente si l'utilisateur vient juste de vérifier son e-mail
      const pendingRaw = sessionStorage.getItem('dato_pending_bootstrap');
      if (pendingRaw) {
        const initialized = await checkBootstrapInitialized();
        if (!initialized) {
          const parsed = JSON.parse(pendingRaw);
          const bootstrapped = await bootstrapFirstSuperAdmin(
            user,
            parsed.displayName || user.displayName || 'Super Administrateur',
            parsed.username
          );
          sessionStorage.removeItem('dato_pending_bootstrap');
          setAdmin(bootstrapped);
          setBootstrapInitialized(true);
          setAuthChecking(false);
          return;
        }
        sessionStorage.removeItem('dato_pending_bootstrap');
      }

      const profile = await resolveOrClaimAdminProfile(user);
      if (!profile) {
        await signOut(auth);
        setAdmin(null);
        setAuthDeniedMsg(
          "Accès refusé : votre compte n'est pas autorisé ou a été suspendu."
        );
        const initialized = await checkBootstrapInitialized();
        setBootstrapInitialized(initialized);
      } else {
        setAdmin(profile);
        setBootstrapInitialized(true);
      }
    } catch (err: any) {
      console.error('Auth resolution error:', err);
      setAdmin(null);
      setAuthDeniedMsg(err?.message || 'Erreur lors de la vérification des droits administrateur.');
    } finally {
      setAuthChecking(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      evaluateUser(user);
    });
    return () => unsub();
  }, []);

  const handleRefreshVerify = async () => {
    if (!auth.currentUser) return;
    await auth.currentUser.reload();
    await evaluateUser(auth.currentUser);
  };

  // Initialisation CMS non-destructive & abonnements Firestore temps réel
  useEffect(() => {
    if (!admin) return;

    ensureDefaultCmsSeed(admin).catch((err) => {
      console.warn('CMS seed check:', err);
    });

    const unsubs: (() => void)[] = [];

    unsubs.push(
      onSnapshot(
        collection(db, 'pages'),
        (snap) => {
          const list: SitePageDoc[] = [];
          snap.forEach((d) => list.push(d.data() as SitePageDoc));
          setPages(list);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'pages')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'projects'), orderBy('updatedAt', 'desc')),
        (snap) => {
          const list: ProjectItem[] = [];
          snap.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<ProjectItem, 'id'>) }));
          setProjects(list);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'projects')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'media'), orderBy('createdAt', 'desc')),
        (snap) => {
          const list: MediaItem[] = [];
          snap.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<MediaItem, 'id'>) }));
          setMediaList(list);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'media')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'messages'), orderBy('createdAt', 'desc')),
        (snap) => {
          const list: ContactMessage[] = [];
          snap.forEach((d) =>
            list.push({ id: d.id, ...(d.data() as Omit<ContactMessage, 'id'>) })
          );
          setMessages(list);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'messages')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'activityLogs'), orderBy('createdAt', 'desc'), limit(100)),
        (snap) => {
          const list: ActivityLog[] = [];
          snap.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<ActivityLog, 'id'>) }));
          setLogs(list);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'activityLogs')
      )
    );

    if (admin.role === 'super_admin') {
      unsubs.push(
        onSnapshot(
          collection(db, 'admins'),
          (snap) => {
            const list: AdminUser[] = [];
            snap.forEach((d) => list.push({ ...(d.data() as AdminUser), uid: d.id }));
            setAdmins(list);
          },
          (err) => handleFirestoreError(err, OperationType.LIST, 'admins')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'adminInvites'),
          (snap) => {
            const list: AdminInvite[] = [];
            snap.forEach((d) =>
              list.push({ id: d.id, ...(d.data() as Omit<AdminInvite, 'id'>) })
            );
            setInvites(list);
          },
          (err) => handleFirestoreError(err, OperationType.LIST, 'adminInvites')
        )
      );
    }

    return () => {
      unsubs.forEach((u) => u());
    };
  }, [admin?.uid, admin?.role]);

  const lastModifiedDate = useMemo(() => {
    const timestamps: number[] = [];
    const pushTs = (val: any) => {
      const ms = val?.toMillis?.() ?? (val instanceof Date ? val.getTime() : 0);
      if (ms > 0) timestamps.push(ms);
    };
    pages.forEach((p) => pushTs(p.updatedAt));
    projects.forEach((p) => pushTs(p.updatedAt));
    logs.forEach((l) => pushTs(l.createdAt));
    if (timestamps.length === 0) return null;
    return new Date(Math.max(...timestamps));
  }, [pages, projects, logs]);

  const unreadMessagesCount = useMemo(
    () => messages.filter((m) => m.status === 'unread').length,
    [messages]
  );

  const handleLogout = async () => {
    if (admin) {
      await logActivity(admin, 'admin_logout', 'auth', admin.uid, `Déconnexion de ${admin.email}`);
    }
    await signOut(auth);
    setAdmin(null);
  };

  if (authChecking) {
    return (
      <div className="admin-portal min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-[#0B2C5C] animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">
          Vérification de la session administrateur…
        </p>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="admin-portal">
        {authDeniedMsg && (
          <div className="bg-red-600 text-white text-xs font-semibold text-center py-2.5 px-4">
            {authDeniedMsg}
          </div>
        )}
        <AdminLogin
          bootstrapInitialized={bootstrapInitialized}
          pendingVerifyUser={pendingVerifyUser}
          onRefreshVerify={handleRefreshVerify}
          onAuthenticated={(profile) => setAdmin(profile)}
        />
      </div>
    );
  }

  const navItems: {
    id: AdminTab;
    label: string;
    icon: any;
    badge?: number;
    superOnly?: boolean;
  }[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'pages', label: 'Pages & Contenus', icon: FileText },
    { id: 'projects', label: 'Nos Projets', icon: FolderKanban },
    { id: 'media', label: 'Médias & Images', icon: ImageIcon },
    {
      id: 'messages',
      label: 'Messages reçus',
      icon: Mail,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    { id: 'logs', label: "Journal d'activités", icon: History },
    { id: 'settings', label: 'Paramètres du site', icon: Settings, superOnly: true },
    { id: 'users', label: 'Administrateurs', icon: Users, superOnly: true },
  ];

  const visibleNavItems = navItems.filter(
    (item) => !item.superOnly || admin.role === 'super_admin'
  );

  const activeNavLabel =
    navItems.find((i) => i.id === activeTab)?.label || 'Tableau de bord';

  return (
    <div className="admin-portal min-h-screen bg-[#F8FAFC] text-slate-900 flex">
      {/* Overlay mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Barre latérale */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B2C5C] text-white flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & En-tête Sidebar */}
          <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="/logo-dark.png"
                alt="DA-TO GUINEE SA"
                className="h-8 w-auto object-contain flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-extrabold tracking-wide truncate">DA-TO GUINÉE</p>
                <p className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                  Back-Office CMS
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 text-white/70 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#F5A623] text-[#0B2C5C] font-bold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </span>
                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums ${
                        isActive ? 'bg-[#0B2C5C] text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pied de sidebar */}
        <div className="p-4 border-t border-white/10 space-y-2.5">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Voir le site public</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/15 hover:bg-red-500/20 hover:border-red-400/40 text-white/90 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Espace central */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Barre supérieure */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-[#0B2C5C] leading-tight">
                {activeNavLabel}
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Administration officielle — {settings.companyName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">{admin.displayName}</p>
              <p className="text-[11px] text-slate-500">{admin.email}</p>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                admin.role === 'super_admin'
                  ? 'bg-[#0B2C5C] text-white'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>{admin.role === 'super_admin' ? 'Super Admin' : 'Éditeur'}</span>
            </span>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              admin={admin}
              pages={pages}
              projects={projects}
              messages={messages}
              logs={logs}
              lastModifiedDate={lastModifiedDate}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'pages' && (
            <PagesManager
              admin={admin}
              pages={pages}
              mediaList={mediaList}
              onNotify={notify}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsManager
              admin={admin}
              projects={projects}
              mediaList={mediaList}
              onNotify={notify}
            />
          )}

          {activeTab === 'media' && (
            <MediaLibrary
              admin={admin}
              mediaList={mediaList}
              pages={pages}
              projects={projects}
              settings={settings}
              onNotify={notify}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesInbox admin={admin} messages={messages} onNotify={notify} />
          )}

          {activeTab === 'settings' && (
            <SiteSettingsManager
              admin={admin}
              settings={settings}
              mediaList={mediaList}
              onNotify={notify}
            />
          )}

          {activeTab === 'users' && (
            <UsersManager
              currentAdmin={admin}
              admins={admins}
              invites={invites}
              onNotify={notify}
            />
          )}

          {activeTab === 'logs' && <ActivityLogsView logs={logs} />}
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[250] max-w-md animate-in fade-in slide-in-from-bottom-2">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-xs font-semibold ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : 'bg-red-900 text-white border-red-700'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-300 flex-shrink-0" />
            )}
            <span>{toast.msg}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-2 p-0.5 rounded hover:bg-white/10 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
