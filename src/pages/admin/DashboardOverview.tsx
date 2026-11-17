import {
  FileText,
  FolderKanban,
  Mail,
  MailWarning,
  Clock,
  ArrowRight,
  Image as ImageIcon,
  Settings,
  Plus,
} from 'lucide-react';
import {
  ActivityLog,
  AdminUser,
  ContactMessage,
  ProjectItem,
  SitePageDoc,
} from '@/types/cms';
import { ADMIN_PAGE_LIST } from '@/data/defaultCmsContent';

export type AdminTab =
  | 'dashboard'
  | 'pages'
  | 'projects'
  | 'media'
  | 'messages'
  | 'settings'
  | 'users'
  | 'logs';

interface DashboardOverviewProps {
  admin: AdminUser;
  pages: SitePageDoc[];
  projects: ProjectItem[];
  messages: ContactMessage[];
  logs: ActivityLog[];
  lastModifiedDate: Date | null;
  onNavigate: (tab: AdminTab) => void;
}

function formatDateTimeFr(date?: any): string {
  if (!date) return '—';
  const d: Date = date?.toDate ? date.toDate() : date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function DashboardOverview({
  admin,
  pages,
  projects,
  messages,
  logs,
  lastModifiedDate,
  onNavigate,
}: DashboardOverviewProps) {
  const totalPages = Math.max(pages.length, ADMIN_PAGE_LIST.length);
  const publishedProjectsCount = projects.filter((p) => p.publicationStatus === 'published').length;
  const draftProjectsCount = projects.filter((p) => p.publicationStatus !== 'published').length;
  const totalMessages = messages.length;
  const unreadMessages = messages.filter((m) => m.status === 'unread').length;

  const kpis = [
    {
      label: 'Pages du site',
      value: totalPages,
      sub: `${pages.filter((p) => p.hasUnpublishedChanges).length} en attente de publication`,
      icon: FileText,
      tone: 'text-[#0B2C5C] bg-slate-100',
    },
    {
      label: 'Projets publiés',
      value: publishedProjectsCount,
      sub: 'Visibles sur le site public',
      icon: FolderKanban,
      tone: 'text-emerald-700 bg-emerald-50',
    },
    {
      label: 'Projets en brouillon',
      value: draftProjectsCount,
      sub: 'En préparation ou masqués',
      icon: FolderKanban,
      tone: 'text-amber-700 bg-amber-50',
    },
    {
      label: 'Messages reçus',
      value: totalMessages,
      sub: `${messages.filter((m) => m.status === 'handled').length} traités`,
      icon: Mail,
      tone: 'text-[#0B2C5C] bg-slate-100',
    },
    {
      label: 'Messages non lus',
      value: unreadMessages,
      sub: unreadMessages > 0 ? 'À consulter en priorité' : 'Aucun nouveau message',
      icon: MailWarning,
      tone: unreadMessages > 0 ? 'text-red-700 bg-red-50' : 'text-slate-600 bg-slate-100',
    },
  ];

  const shortcuts = [
    {
      label: 'Modifier les pages',
      desc: 'Textes, images & prévisualisation',
      tab: 'pages' as AdminTab,
      icon: FileText,
    },
    {
      label: 'Gérer les projets',
      desc: 'Ajouter ou publier un chantier',
      tab: 'projects' as AdminTab,
      icon: Plus,
    },
    {
      label: 'Bibliothèque multimédia',
      desc: 'Importer & optimiser des images',
      tab: 'media' as AdminTab,
      icon: ImageIcon,
    },
    {
      label: 'Messages reçus',
      desc: `${unreadMessages} non lu(s)`,
      tab: 'messages' as AdminTab,
      icon: Mail,
    },
    ...(admin.role === 'super_admin'
      ? [
          {
            label: 'Paramètres généraux',
            desc: 'Coordonnées, logo & SEO',
            tab: 'settings' as AdminTab,
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      {/* Bannière d'état dernière modification */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#0B2C5C]">
            Bienvenue, {admin.displayName}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilotez les contenus, réalisations et demandes clients de DA-TO GUINÉE SA en temps réel.
          </p>
        </div>
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
          <Clock className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
          <div>
            <span className="text-slate-500 block leading-none mb-0.5">
              Dernière modification du site
            </span>
            <span className="font-mono font-semibold text-slate-800 tabular-nums">
              {formatDateTimeFr(lastModifiedDate)}
            </span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.tone}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#0B2C5C] tabular-nums font-mono">
                  {kpi.value}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Raccourcis rapides */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Raccourcis rapides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {shortcuts.map((sc) => {
            const Icon = sc.icon;
            return (
              <button
                key={sc.tab}
                type="button"
                onClick={() => onNavigate(sc.tab)}
                className="group bg-white border border-slate-200 hover:border-[#F5A623] rounded-xl p-4 text-left transition-all cursor-pointer flex items-start justify-between gap-2"
              >
                <div>
                  <Icon className="w-4 h-4 text-[#F5A623] mb-2" />
                  <p className="text-sm font-bold text-[#0B2C5C] group-hover:text-[#F5A623] transition-colors">
                    {sc.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{sc.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#F5A623] flex-shrink-0 mt-1" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Historique des dernières activités */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0B2C5C]">
              Historique des dernières activités administratives
            </h3>
            <p className="text-xs text-slate-500">
              Traçabilité des modifications effectuées sur le back-office
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('logs')}
            className="text-xs font-semibold text-[#0B2C5C] hover:text-[#F5A623] cursor-pointer"
          >
            Voir tout le journal →
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Aucune activité enregistrée pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-4">Date &amp; Heure</th>
                  <th className="py-2.5 px-4">Administrateur</th>
                  <th className="py-2.5 px-4">Opération</th>
                  <th className="py-2.5 px-4">Détails</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {logs.slice(0, 8).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-mono text-slate-600 tabular-nums whitespace-nowrap">
                      {formatDateTimeFr(log.createdAt)}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                      {log.actorName}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[#0B2C5C] whitespace-nowrap">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
