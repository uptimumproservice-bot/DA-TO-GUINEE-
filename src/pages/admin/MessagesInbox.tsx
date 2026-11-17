import { useState, useEffect } from 'react';
import {
  Mail,
  MailOpen,
  CheckCircle2,
  Trash2,
  Search,
  Phone,
  User,
  Clock,
} from 'lucide-react';
import { AdminUser, ContactMessage, MessageStatus } from '@/types/cms';
import { deleteContactMessage, updateMessageStatus } from '@/services/cmsService';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

interface MessagesInboxProps {
  admin: AdminUser;
  messages: ContactMessage[];
  onNotify: (type: 'success' | 'error', msg: string) => void;
}

const STATUS_BADGES: Record<MessageStatus, { label: string; tone: string }> = {
  unread: { label: 'Nouveau / Non lu', tone: 'bg-red-100 text-red-800' },
  read: { label: 'Lu', tone: 'bg-slate-100 text-slate-700' },
  handled: { label: 'Traité', tone: 'bg-emerald-100 text-emerald-800' },
};

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
  });
}

export function MessagesInbox({ admin, messages, onNotify }: MessagesInboxProps) {
  const [filter, setFilter] = useState<'all' | MessageStatus>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const [msgToDelete, setMsgToDelete] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = messages.filter((m) => {
    const matchStatus = filter === 'all' || m.status === filter;
    const matchQuery =
      !search.trim() ||
      m.nom.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.sujet.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchQuery;
  });

  const selected = filtered.find((m) => m.id === selectedId) || filtered[0] || null;

  useEffect(() => {
    if (selected) {
      setNotes(selected.adminNotes || '');
    }
  }, [selected?.id]);

  const handleStatusChange = async (msg: ContactMessage, nextStatus: MessageStatus) => {
    setSaving(true);
    try {
      await updateMessageStatus(msg, nextStatus, notes, admin);
      onNotify('success', `Message de ${msg.nom} marqué comme « ${STATUS_BADGES[nextStatus].label} ».`);
    } catch (err: any) {
      onNotify('error', err?.message || 'Erreur lors de la mise à jour du message.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateMessageStatus(selected, selected.status, notes, admin);
      onNotify('success', 'Note interne enregistrée.');
    } catch (err: any) {
      onNotify('error', err?.message || "Impossible d'enregistrer la note.");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!msgToDelete) return;
    setDeleting(true);
    try {
      await deleteContactMessage(msgToDelete, admin);
      onNotify('success', `Message de ${msgToDelete.nom} supprimé.`);
      if (selectedId === msgToDelete.id) setSelectedId(null);
    } catch (err: any) {
      onNotify('error', err?.message || 'Erreur lors de la suppression.');
    } finally {
      setDeleting(false);
      setMsgToDelete(null);
    }
  };

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-4">
      {/* Barre supérieure filtres */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: `Tous (${messages.length})` },
            { id: 'unread', label: `Non lus (${unreadCount})` },
            { id: 'read', label: 'Lus' },
            { id: 'handled', label: 'Traités' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#0B2C5C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un expéditeur, sujet..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-sm bg-white"
          />
        </div>
      </div>

      {/* Vue boîte de réception */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <Mail className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">Aucun message</h3>
          <p className="text-xs text-slate-500 mt-1">
            Les demandes envoyées depuis la page Contact du site public apparaissent automatiquement ici.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Liste des messages */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 max-h-[680px] overflow-y-auto">
            {filtered.map((msg) => {
              const isSelected = selected?.id === msg.id;
              const badge = STATUS_BADGES[msg.status];
              return (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => setSelectedId(msg.id)}
                  className={`w-full text-left p-4 transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#0B2C5C]/5 border-l-4 border-l-[#0B2C5C]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-sm truncate ${
                        msg.status === 'unread' ? 'font-extrabold text-[#0B2C5C]' : 'font-semibold text-slate-800'
                      }`}
                    >
                      {msg.nom}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${badge.tone}`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 truncate">{msg.sujet}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{msg.message}</p>
                  <p className="text-[11px] font-mono text-slate-400 mt-1.5 tabular-nums">
                    {formatDateTime(msg.createdAt)}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Détail du message sélectionné */}
          {selected && (
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-2 ${
                      STATUS_BADGES[selected.status].tone
                    }`}
                  >
                    {STATUS_BADGES[selected.status].label}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B2C5C]">{selected.sujet}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                      <User className="w-3.5 h-3.5 text-[#F5A623]" />
                      {selected.nom}
                    </span>
                    <a
                      href={`mailto:${selected.email}`}
                      className="inline-flex items-center gap-1.5 text-[#0B2C5C] hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {selected.email}
                    </a>
                    {selected.telephone && (
                      <span className="inline-flex items-center gap-1.5 font-mono">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {selected.telephone}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 font-mono text-slate-400 tabular-nums">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDateTime(selected.createdAt)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMsgToDelete(selected)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Supprimer</span>
                </button>
              </div>

              {/* Corps du message */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>

              {/* Actions de statut */}
              <div className="flex flex-wrap items-center gap-2">
                {selected.status !== 'read' && (
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleStatusChange(selected, 'read')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <MailOpen className="w-3.5 h-3.5" />
                    <span>Marquer comme lu</span>
                  </button>
                )}
                {selected.status !== 'unread' && (
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleStatusChange(selected, 'unread')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Marquer comme non lu</span>
                  </button>
                )}
                {selected.status !== 'handled' && (
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleStatusChange(selected, 'handled')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Marquer comme traité</span>
                  </button>
                )}
              </div>

              {/* Notes internes */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Suivi interne / Notes de traitement
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez une note de suivi (visible uniquement par l'équipe d'administration)..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={handleSaveNotes}
                    className="px-4 py-2 rounded-lg bg-[#0B2C5C] text-white text-xs font-semibold hover:bg-[#0E3E7E] cursor-pointer disabled:opacity-50"
                  >
                    Enregistrer la note
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation suppression */}
      <ConfirmModal
        open={!!msgToDelete}
        title="Supprimer ce message ?"
        description={`Le message envoyé par « ${msgToDelete?.nom || ''} » sera définitivement supprimé de la base de données.`}
        confirmLabel="Supprimer définitivement"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setMsgToDelete(null)}
      />
    </div>
  );
}
