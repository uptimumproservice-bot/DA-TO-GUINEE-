import { useState } from 'react';
import { History, Search } from 'lucide-react';
import { ActivityLog, ActivityTargetType } from '@/types/cms';

interface ActivityLogsViewProps {
  logs: ActivityLog[];
}

const TARGET_TYPES: { value: 'all' | ActivityTargetType; label: string }[] = [
  { value: 'all', label: 'Toutes opérations' },
  { value: 'page', label: 'Pages' },
  { value: 'project', label: 'Projets' },
  { value: 'media', label: 'Médias' },
  { value: 'message', label: 'Messages' },
  { value: 'settings', label: 'Paramètres' },
  { value: 'admin', label: 'Utilisateurs' },
  { value: 'auth', label: 'Connexions' },
];

function formatDateTime(date?: any): string {
  if (!date) return '—';
  const d = date?.toDate ? date.toDate() : date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function ActivityLogsView({ logs }: ActivityLogsViewProps) {
  const [targetFilter, setTargetFilter] = useState<'all' | ActivityTargetType>('all');
  const [search, setSearch] = useState('');

  const filtered = logs.filter((log) => {
    const matchTarget = targetFilter === 'all' || log.targetType === targetFilter;
    const matchQuery =
      !search.trim() ||
      log.actorName.toLowerCase().includes(search.toLowerCase()) ||
      log.actorEmail.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());
    return matchTarget && matchQuery;
  });

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {TARGET_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTargetFilter(t.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                targetFilter === t.value
                  ? 'bg-[#0B2C5C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative min-w-[230px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrer par utilisateur ou action..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-sm bg-white"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
          <History className="w-4 h-4 text-[#F5A623]" />
          <h3 className="text-sm font-bold text-[#0B2C5C]">
            Journal d&apos;audit complet ({filtered.length} entrée(s))
          </h3>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Aucune entrée correspondante dans le journal.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-4">Date &amp; Heure</th>
                  <th className="py-2.5 px-4">Utilisateur</th>
                  <th className="py-2.5 px-4">Rôle</th>
                  <th className="py-2.5 px-4">Module</th>
                  <th className="py-2.5 px-4">Action</th>
                  <th className="py-2.5 px-4">Nature de la modification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-mono text-slate-600 tabular-nums whitespace-nowrap">
                      {formatDateTime(log.createdAt)}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-slate-800">{log.actorName}</div>
                      <div className="text-[11px] text-slate-400">{log.actorEmail}</div>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {log.actorRole === 'super_admin' ? 'Super Admin' : 'Éditeur'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                      {log.targetType}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[#0B2C5C] whitespace-nowrap">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-4 text-slate-700">{log.details}</td>
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
