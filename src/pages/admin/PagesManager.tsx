import { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  Send,
  Eye,
  RotateCcw,
  Plus,
  Trash2,
  Image as ImageIcon,
  Monitor,
  Tablet,
  Smartphone,
  X,
  CheckCircle2,
  Clock,
  FileEdit,
  Layers,
} from 'lucide-react';
import {
  AdminUser,
  CustomSection,
  MediaFolder,
  MediaItem,
  SitePageDoc,
  SitePageId,
} from '@/types/cms';
import { ADMIN_PAGE_LIST, DEFAULT_PAGES_SEED } from '@/data/defaultCmsContent';
import { discardPageDraft, publishPage, savePageDraft } from '@/services/cmsService';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

interface PagesManagerProps {
  admin: AdminUser;
  pages: SitePageDoc[];
  mediaList: MediaItem[];
  onNotify: (type: 'success' | 'error', msg: string) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function setNestedValue(obj: Record<string, any>, path: string, value: any): Record<string, any> {
  const clone = deepClone(obj);
  const parts = path.split('.');
  let curr: any = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (curr[key] === undefined || curr[key] === null || typeof curr[key] !== 'object') {
      curr[key] = {};
    }
    curr = curr[key];
  }
  curr[parts[parts.length - 1]] = value;
  return clone;
}

function getNestedValue(obj: Record<string, any>, path: string): any {
  const parts = path.split('.');
  let curr: any = obj;
  for (const key of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[key];
  }
  return curr;
}

const PAGE_MEDIA_FOLDERS: Record<SitePageId, MediaFolder> = {
  accueil: 'accueil',
  'a-propos': 'a-propos',
  'nos-activites': 'activites',
  'nos-projets': 'projets',
  'notre-approche': 'general',
  'nos-engagements': 'engagements',
  actualites: 'actualites',
  contact: 'general',
};

export function PagesManager({ admin, pages, mediaList, onNotify }: PagesManagerProps) {
  const [selectedPageId, setSelectedPageId] = useState<SitePageId>('accueil');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState<Record<string, any>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [discarding, setDiscarding] = useState(false);
  const [confirmDiscardOpen, setConfirmDiscardOpen] = useState(false);

  // Preview Modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewViewport, setPreviewViewport] = useState<ViewportMode>('desktop');
  const [previewNonce, setPreviewNonce] = useState(0);

  // Media picker targeting a specific path or custom section index
  const [mediaTarget, setMediaTarget] = useState<{
    kind: 'path' | 'custom' | 'array';
    path: string;
    altPath?: string;
    index?: number;
  } | null>(null);

  const selectedMeta =
    ADMIN_PAGE_LIST.find((p) => p.pageId === selectedPageId) || ADMIN_PAGE_LIST[0];
  const currentDoc = pages.find((p) => p.pageId === selectedPageId);

  useEffect(() => {
    const seed = DEFAULT_PAGES_SEED[selectedPageId];
    const sourceContent =
      currentDoc?.draftContent && Object.keys(currentDoc.draftContent).length > 0
        ? currentDoc.draftContent
        : seed.content;
    setDraftTitle(currentDoc?.title || seed.title);
    setDraftContent(deepClone(sourceContent));
    setIsDirty(false);
  }, [selectedPageId, currentDoc?.updatedAt]);

  const updateField = (path: string, value: any) => {
    setDraftContent((prev) => setNestedValue(prev, path, value));
    setIsDirty(true);
  };

  const handleSaveDraft = async (asDraftOnly = false) => {
    setSaving(true);
    try {
      await savePageDraft(
        selectedPageId,
        draftTitle.trim() || selectedMeta.label,
        selectedMeta.route,
        draftContent,
        admin,
        asDraftOnly
      );
      setIsDirty(false);
      onNotify(
        'success',
        `Brouillon de « ${selectedMeta.label} » enregistré. Prévisualisez ou publiez pour appliquer sur le site public.`
      );
    } catch (err: any) {
      onNotify('error', err?.message || "Erreur lors de l'enregistrement du brouillon.");
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = async () => {
    if (isDirty) {
      setSaving(true);
      try {
        await savePageDraft(
          selectedPageId,
          draftTitle.trim() || selectedMeta.label,
          selectedMeta.route,
          draftContent,
          admin,
          false
        );
        setIsDirty(false);
      } catch (err: any) {
        onNotify('error', err?.message || 'Impossible de préparer la prévisualisation.');
        setSaving(false);
        return;
      } finally {
        setSaving(false);
      }
    }
    setPreviewNonce((n) => n + 1);
    setPreviewOpen(true);
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await publishPage(
        selectedPageId,
        draftTitle.trim() || selectedMeta.label,
        selectedMeta.route,
        draftContent,
        admin
      );
      setIsDirty(false);
      onNotify('success', `Page « ${selectedMeta.label} » publiée et visible sur le site public.`);
    } catch (err: any) {
      onNotify('error', err?.message || 'Erreur lors de la publication.');
    } finally {
      setPublishing(false);
    }
  };

  const handleConfirmDiscard = async () => {
    if (!currentDoc) {
      setConfirmDiscardOpen(false);
      return;
    }
    setDiscarding(true);
    try {
      await discardPageDraft(currentDoc, admin);
      setDraftContent(deepClone(currentDoc.publishedContent));
      setIsDirty(false);
      onNotify('success', `Brouillon de « ${selectedMeta.label} » annulé et restauré.`);
    } catch (err: any) {
      onNotify('error', err?.message || "Impossible d'annuler le brouillon.");
    } finally {
      setDiscarding(false);
      setConfirmDiscardOpen(false);
    }
  };

  // Custom sections CRUD
  const customSections: CustomSection[] = Array.isArray(draftContent.customSections)
    ? draftContent.customSections
    : [];

  const addCustomSection = () => {
    const next: CustomSection = {
      id: `sec_${Date.now()}`,
      eyebrow: 'Nouvelle rubrique',
      titre: 'Titre de la section',
      contenu: 'Saisissez ici le contenu détaillé de cette section.',
      theme: 'light',
    };
    updateField('customSections', [...customSections, next]);
  };

  const updateCustomSection = (index: number, patch: Partial<CustomSection>) => {
    const next = [...customSections];
    next[index] = { ...next[index], ...patch };
    updateField('customSections', next);
  };

  const removeCustomSection = (index: number) => {
    const next = customSections.filter((_, i) => i !== index);
    updateField('customSections', next);
  };

  // Render helpers
  const renderTextField = (label: string, path: string, placeholder = '') => {
    const val = String(getNestedValue(draftContent, path) ?? '');
    return (
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
        <input
          type="text"
          value={val}
          onChange={(e) => updateField(path, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
        />
      </div>
    );
  };

  const renderTextArea = (label: string, path: string, rows = 3) => {
    const val = String(getNestedValue(draftContent, path) ?? '');
    return (
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
        <textarea
          rows={rows}
          value={val}
          onChange={(e) => updateField(path, e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2C5C] resize-y"
        />
      </div>
    );
  };

  const renderImageField = (label: string, path: string, altPath?: string) => {
    const imgUrl = String(getNestedValue(draftContent, path) ?? '');
    const imgAlt = altPath ? String(getNestedValue(draftContent, altPath) ?? '') : '';
    return (
      <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-700">{label}</span>
          <button
            type="button"
            onClick={() => setMediaTarget({ kind: 'path', path, altPath })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2C5C] text-white text-xs font-semibold hover:bg-[#0E3E7E] cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Changer l&apos;image</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={imgAlt || label}
              className="w-20 h-14 object-cover rounded-md border border-slate-200 bg-white flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-14 rounded-md border border-dashed border-slate-300 bg-white flex items-center justify-center text-slate-400 flex-shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
          <div className="flex-1 min-w-0 space-y-1.5">
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => updateField(path, e.target.value)}
              placeholder="URL de l'image..."
              className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs text-slate-700 bg-white"
            />
            {altPath && (
              <input
                type="text"
                value={imgAlt}
                onChange={(e) => updateField(altPath, e.target.value)}
                placeholder="Description alternative (ALT)"
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs text-slate-700 bg-white"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSimpleTextList = (
    sectionTitle: string,
    arrayPath: string,
    itemKey: 'texte' | 'label' = 'texte',
    addDefaultLabel = 'Nouvel élément'
  ) => {
    const items: any[] = Array.isArray(getNestedValue(draftContent, arrayPath))
      ? getNestedValue(draftContent, arrayPath)
      : [];

    const updateItem = (idx: number, val: string) => {
      const next = items.map((it, i) => (i === idx ? { ...it, [itemKey]: val } : it));
      updateField(arrayPath, next);
    };

    const addItem = () => {
      const next = [...items, { id: `item_${Date.now()}`, [itemKey]: addDefaultLabel }];
      updateField(arrayPath, next);
    };

    const removeItem = (idx: number) => {
      const next = items.filter((_, i) => i !== idx);
      updateField(arrayPath, next);
    };

    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {sectionTitle} ({items.length})
          </span>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[#0B2C5C] text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter</span>
          </button>
        </div>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 w-6 text-right tabular-nums">
                {idx + 1}.
              </span>
              <input
                type="text"
                value={item[itemKey] || ''}
                onChange={(e) => updateItem(idx, e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white"
              />
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                title="Supprimer cet élément"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCardList = (
    sectionTitle: string,
    arrayPath: string,
    fields: { key: string; label: string; multiline?: boolean; isImage?: boolean }[],
    defaultFactory: () => Record<string, any>
  ) => {
    const items: any[] = Array.isArray(getNestedValue(draftContent, arrayPath))
      ? getNestedValue(draftContent, arrayPath)
      : [];

    const updateCardField = (idx: number, key: string, val: string) => {
      const next = items.map((it, i) => (i === idx ? { ...it, [key]: val } : it));
      updateField(arrayPath, next);
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {sectionTitle} ({items.length})
          </span>
          <button
            type="button"
            onClick={() => updateField(arrayPath, [...items, defaultFactory()])}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[#0B2C5C] text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter un bloc</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B2C5C]">Bloc #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => updateField(arrayPath, items.filter((_, i) => i !== idx))}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Supprimer</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fields.map((f) => {
                  if (f.isImage) {
                    const url = item[f.key] || '';
                    return (
                      <div key={f.key} className="md:col-span-2 flex items-center gap-3">
                        {url && (
                          <img
                            src={url}
                            alt=""
                            className="w-16 h-12 rounded object-cover border border-slate-200"
                          />
                        )}
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => updateCardField(idx, f.key, e.target.value)}
                          placeholder={f.label}
                          className="flex-1 px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setMediaTarget({
                              kind: 'array',
                              path: `${arrayPath}.${idx}.${f.key}`,
                            })
                          }
                          className="px-2.5 py-1.5 rounded bg-[#0B2C5C] text-white text-xs font-semibold cursor-pointer"
                        >
                          Image…
                        </button>
                      </div>
                    );
                  }
                  if (f.multiline) {
                    return (
                      <div key={f.key} className="md:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          {f.label}
                        </label>
                        <textarea
                          rows={2}
                          value={item[f.key] || ''}
                          onChange={(e) => updateCardField(idx, f.key, e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-sm bg-white"
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={f.key}>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {f.label}
                      </label>
                      <input
                        type="text"
                        value={item[f.key] || ''}
                        onChange={(e) => updateCardField(idx, f.key, e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-sm bg-white"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStatusPill = (doc?: SitePageDoc) => {
    if (!doc) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
          Par défaut
        </span>
      );
    }
    if (doc.hasUnpublishedChanges || doc.status === 'pending_publish') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
          <Clock className="w-3 h-3" /> En attente de pub.
        </span>
      );
    }
    if (doc.status === 'draft') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-700">
          <FileEdit className="w-3 h-3" /> Brouillon
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
        <CheckCircle2 className="w-3 h-3" /> Publiée
      </span>
    );
  };

  return (
    <div className="space-y-5">
      {/* Sélecteur des 8 pages */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-sm font-bold text-[#0B2C5C]">Pages du site web</h2>
            <p className="text-xs text-slate-500">
              Sélectionnez une page pour modifier ses titres, textes, boutons, images ou ajouter des sections.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Route publique : <strong className="text-[#0B2C5C]">{selectedMeta.route}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {ADMIN_PAGE_LIST.map((p) => {
            const pDoc = pages.find((d) => d.pageId === p.pageId);
            const active = p.pageId === selectedPageId;
            return (
              <button
                key={p.pageId}
                type="button"
                onClick={() => setSelectedPageId(p.pageId)}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer flex flex-col justify-between gap-2 ${
                  active
                    ? 'border-[#0B2C5C] bg-[#0B2C5C]/5 ring-1 ring-[#0B2C5C]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <FileText
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      active ? 'text-[#0B2C5C]' : 'text-slate-400'
                    }`}
                  />
                  <span className="text-xs font-bold text-slate-800 truncate">{p.label}</span>
                </div>
                <div>{renderStatusPill(pDoc)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Barre d'actions sticky */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 sticky top-16 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#0B2C5C]">
                Édition : {selectedMeta.label}
              </h3>
              {renderStatusPill(currentDoc)}
              {isDirty && (
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold">
                  Modifications non enregistrées
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Enregistrez en brouillon et prévisualisez avant de publier sur le site public.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(currentDoc?.hasUnpublishedChanges || isDirty) && (
            <button
              type="button"
              onClick={() => setConfirmDiscardOpen(true)}
              disabled={discarding || saving || publishing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Annuler brouillon</span>
            </button>
          )}
          <button
            type="button"
            onClick={handlePreview}
            disabled={saving || publishing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#0B2C5C] text-xs font-semibold text-[#0B2C5C] hover:bg-[#0B2C5C]/5 cursor-pointer disabled:opacity-50"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Prévisualiser</span>
          </button>
          <button
            type="button"
            onClick={() => handleSaveDraft(false)}
            disabled={saving || publishing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Enregistrement…' : 'Enregistrer brouillon'}</span>
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing || saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F5A623] text-[#0B2C5C] text-xs font-bold hover:bg-[#e59819] cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{publishing ? 'Publication…' : 'Publier sur le site'}</span>
          </button>
        </div>
      </div>

      {/* Formulaires structurés par page */}
      <div className="space-y-5">
        {/* Titre administratif / SEO de page */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h4 className="text-sm font-bold text-[#0B2C5C] mb-3">Informations générales de la page</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Titre de la page
              </label>
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => {
                  setDraftTitle(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adresse publique (URL)
              </label>
              <input
                type="text"
                value={selectedMeta.route}
                disabled
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-500 bg-slate-50 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Formulaire spécifique selon pageId */}
        {selectedPageId === 'accueil' && (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Section Héro (Haut de page)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre (Tagline)', 'hero.tagline')}
                {renderTextField('Titre principal', 'hero.titre')}
                {renderTextField('Titre accentué (Or)', 'hero.titreAccent')}
                {renderTextField('Libellé bouton principal', 'hero.cta')}
                {renderTextField('Lien bouton principal', 'hero.ctaHref')}
                {renderTextField('Libellé bouton secondaire', 'hero.secondaryCtaLabel')}
                {renderTextField('Lien bouton secondaire', 'hero.secondaryCtaHref')}
              </div>
              {renderTextArea('Sous-titre descriptif', 'hero.sousTitre', 2)}
              {renderImageField('Image de couverture Héro', 'hero.posterImage')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Accroche institutionnelle</h4>
              {renderTextArea('Paragraphe 1 (en gras)', 'accroche.ligne1', 2)}
              {renderTextArea('Paragraphe 2', 'accroche.ligne2', 2)}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Nos Pôles d&apos;Activité</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre (Eyebrow)', 'poles.eyebrow')}
                {renderTextField('Titre de la section', 'poles.titre')}
              </div>
              {renderCardList(
                'Cartes des pôles',
                'poles.items',
                [
                  { key: 'titre', label: 'Titre du pôle' },
                  { key: 'href', label: 'Lien cible (ex: /nos-activites#btp)' },
                  { key: 'image', label: 'Image du pôle', isImage: true },
                ],
                () => ({
                  id: `pole_${Date.now()}`,
                  titre: 'Nouveau pôle',
                  href: '/nos-activites',
                  image: '/airo-assets/images/pages/home/pole-btp.jpg',
                })
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Pourquoi nous choisir ? (Atouts)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre (Eyebrow)', 'atouts.eyebrow')}
                {renderTextField('Titre de la section', 'atouts.titre')}
              </div>
              {renderCardList(
                'Atouts affichés',
                'atouts.items',
                [
                  { key: 'titre', label: 'Titre' },
                  { key: 'desc', label: 'Description', multiline: true },
                ],
                () => ({
                  id: `atout_${Date.now()}`,
                  titre: 'Nouvel atout',
                  desc: 'Description courte de la valeur ajoutée.',
                })
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Appel à l&apos;action (Contact)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre (Eyebrow)', 'ctaContact.eyebrow')}
                {renderTextField('Titre CTA', 'ctaContact.titre')}
                {renderTextField('Libellé bouton CTA', 'ctaContact.cta')}
                {renderTextField('Lien bouton CTA', 'ctaContact.ctaHref')}
              </div>
              {renderTextArea('Description CTA', 'ctaContact.desc', 2)}
              {renderTextField('Slogan en pied de bloc', 'ctaContact.slogan')}
            </div>
          </>
        )}

        {selectedPageId === 'a-propos' && (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Bannière de page</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre bannière', 'banner.titre')}
                {renderTextField('Sous-titre bannière', 'banner.sousTitre')}
              </div>
              {renderImageField('Image de bannière', 'banner.image')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Section Qui sommes-nous ?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre', 'quiSommesNous.titre')}
                {renderTextField('Slogan mis en avant', 'quiSommesNous.slogan')}
              </div>
              {renderTextArea('Paragraphe 1', 'quiSommesNous.paragraphe1', 3)}
              {renderTextArea('Paragraphe 2', 'quiSommesNous.paragraphe2', 3)}
              {renderTextArea('Encadré Notre force', 'quiSommesNous.accroche', 2)}
              {renderImageField('Photo illustration équipe/chantier', 'quiSommesNous.image', 'quiSommesNous.imageAlt')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Vision &amp; Mission</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre Vision', 'vision.eyebrow')}
                {renderTextField('Sur-titre Mission', 'mission.eyebrow')}
                {renderTextArea('Texte Vision', 'vision.texte', 3)}
                {renderTextArea('Texte Mission', 'mission.texte', 3)}
              </div>
              {renderImageField('Image Vision', 'vision.image', 'vision.imageAlt')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Notre Philosophie</h4>
              {renderTextField('Titre', 'philosophieSection.titre')}
              {renderTextArea('Paragraphe principal', 'philosophieSection.paragraphe', 3)}
              {renderTextArea('Citation', 'philosophieSection.citation', 2)}
              {renderImageField('Image philosophie', 'philosophieSection.image', 'philosophieSection.imageAlt')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Domaines &amp; Approche Intégrée</h4>
              {renderTextField('Sur-titre Domaines', 'domaines.eyebrow')}
              {renderSimpleTextList("Liste des domaines d'intervention", 'domaines.items', 'texte')}
              <hr className="border-slate-200 my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre Approche', 'approche.eyebrow')}
                {renderTextField('Titre Approche', 'approche.titre')}
              </div>
              {renderSimpleTextList('Étapes de la chaîne de valeur', 'approche.etapes', 'label')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Bandeau d&apos;engagement bas de page</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre', 'engagementCta.eyebrow')}
                {renderTextField('Titre', 'engagementCta.titre')}
                {renderTextField('Libellé bouton', 'engagementCta.ctaLabel')}
                {renderTextField('Lien bouton', 'engagementCta.ctaHref')}
              </div>
              {renderTextArea('Texte', 'engagementCta.texte', 2)}
              {renderImageField('Image de fond', 'engagementCta.image')}
            </div>
          </>
        )}

        {selectedPageId === 'nos-activites' && (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Bannière &amp; Introduction</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre bannière', 'banner.titre')}
                {renderTextField('Sous-titre bannière', 'banner.sousTitre')}
              </div>
              {renderImageField('Image de bannière', 'banner.image')}
              {renderTextField('Titre introduction', 'intro.titre')}
              {renderTextArea('Texte introduction', 'intro.texte', 3)}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Pôle 1 : BTP &amp; Infrastructures</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre', 'btp.eyebrow')}
                {renderTextField('Titre du pôle', 'btp.titre')}
              </div>
              {renderTextArea('Présentation détaillée', 'btp.intro', 3)}
              {renderTextArea('Objectif / Encadré', 'btp.objectif', 2)}
              {renderCardList(
                'Prestations BTP',
                'btp.services',
                [
                  { key: 'titre', label: 'Titre prestation' },
                  { key: 'desc', label: 'Description', multiline: true },
                ],
                () => ({
                  id: `btp_${Date.now()}`,
                  titre: 'Nouvelle prestation',
                  desc: 'Description technique.',
                })
              )}
              {renderImageField('Image principale BTP (Slide 1)', 'btp.images.0')}
              {renderImageField('Image secondaire BTP (Slide 2)', 'btp.images.1')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Pôle 2 : Développement Foncier</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre', 'foncier.eyebrow')}
                {renderTextField('Titre du pôle', 'foncier.titre')}
              </div>
              {renderTextArea('Présentation', 'foncier.intro', 3)}
              {renderTextArea('Conclusion', 'foncier.conclusion', 2)}
              {renderSimpleTextList('Prestations foncières', 'foncier.services', 'texte')}
              {renderImageField('Image principale Foncier', 'foncier.images.0')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Pôle 3 : Immobilier &amp; Valorisation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre', 'immobilier.eyebrow')}
                {renderTextField('Titre du pôle', 'immobilier.titre')}
              </div>
              {renderTextArea('Présentation', 'immobilier.intro', 3)}
              {renderTextArea('Conclusion', 'immobilier.conclusion', 2)}
              {renderSimpleTextList('Prestations immobilières', 'immobilier.services', 'texte')}
              {renderImageField('Image principale Immobilier', 'immobilier.images.0')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Appel à l&apos;action bas de page</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre', 'cta.titre')}
                {renderTextField('Libellé bouton', 'cta.ctaLabel')}
                {renderTextField('Lien bouton', 'cta.ctaHref')}
              </div>
              {renderTextArea('Texte', 'cta.texte', 2)}
            </div>
          </>
        )}

        {selectedPageId === 'nos-projets' && (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Bannière de la page Projets</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre bannière', 'banner.titre')}
                {renderTextField('Sous-titre bannière', 'banner.sousTitre')}
              </div>
              {renderImageField('Image de bannière', 'banner.image')}
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Introduction &amp; Message d&apos;état vide</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre', 'intro.eyebrow')}
                {renderTextField('Titre d&apos;introduction', 'intro.titre')}
              </div>
              {renderTextArea('Texte d&apos;introduction', 'intro.texte', 3)}
              <hr className="border-slate-200" />
              {renderTextField("Titre si aucun projet publié", 'emptyState.titre')}
              {renderTextArea("Texte si aucun projet publié", 'emptyState.texte', 2)}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Libellé bouton', 'emptyState.ctaLabel')}
                {renderTextField('Lien bouton', 'emptyState.ctaHref')}
              </div>
            </div>
          </>
        )}

        {selectedPageId === 'notre-approche' && (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Bannière &amp; Introduction</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre bannière', 'banner.titre')}
                {renderTextField('Sous-titre bannière', 'banner.sousTitre')}
              </div>
              {renderImageField('Image de bannière', 'banner.image')}
              {renderTextField('Sur-titre introduction', 'intro.eyebrow')}
              {renderTextArea('Texte introduction', 'intro.texte', 3)}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Les 7 Étapes de notre Méthode</h4>
              {renderCardList(
                'Étapes méthodologiques',
                'etapes',
                [
                  { key: 'num', label: 'Numéro (ex: 01)' },
                  { key: 'titre', label: 'Titre étape' },
                  { key: 'subtitle', label: 'Sous-titre' },
                  { key: 'desc', label: 'Description', multiline: true },
                ],
                () => ({
                  id: `m_${Date.now()}`,
                  num: '08',
                  titre: 'Nouvelle étape',
                  subtitle: 'Objectif clé',
                  desc: 'Description de l’étape.',
                })
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Conclusion &amp; Appel à l&apos;action</h4>
              {renderTextField('Titre conclusion', 'conclusionSection.titre')}
              {renderTextArea('Texte conclusion', 'conclusionSection.texte', 3)}
              <hr className="border-slate-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre CTA', 'ctaSection.titre')}
                {renderTextField('Libellé bouton', 'ctaSection.ctaLabel')}
                {renderTextField('Lien bouton', 'ctaSection.ctaHref')}
              </div>
              {renderTextArea('Texte CTA', 'ctaSection.texte', 2)}
              {renderImageField('Image de fond CTA', 'ctaSection.image')}
            </div>
          </>
        )}

        {selectedPageId === 'nos-engagements' && (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Bannière</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre bannière', 'banner.titre')}
                {renderTextField('Sous-titre bannière', 'banner.sousTitre')}
              </div>
              {renderImageField('Image de bannière', 'banner.image')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Nos Engagements Fondamentaux</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre', 'engagements.eyebrow')}
                {renderTextField('Titre de section', 'engagements.titre')}
              </div>
              {renderCardList(
                'Liste des engagements',
                'engagements.items',
                [
                  { key: 'titre', label: 'Titre' },
                  { key: 'desc', label: 'Description', multiline: true },
                ],
                () => ({
                  id: `eng_${Date.now()}`,
                  titre: 'Nouvel engagement',
                  desc: 'Détail de notre engagement.',
                })
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Qualité, Sécurité &amp; HSE</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre HSE', 'hse.eyebrow')}
                {renderTextField('Titre HSE', 'hse.titre')}
              </div>
              {renderSimpleTextList('Pratiques HSE sur chantier', 'hse.pratiques', 'texte')}
              {renderTextArea('Objectif HSE', 'hse.objectif', 2)}
              {renderImageField('Illustration HSE (Ingénieur EPI)', 'hse.image', 'hse.imageAlt')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Technologie &amp; Digital</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre Technologie', 'technologie.eyebrow')}
                {renderTextField('Titre Technologie', 'technologie.titre')}
              </div>
              {renderSimpleTextList("Domaines d'application", 'technologie.domaines', 'texte')}
              {renderImageField('Image Bureau Ingénieurs', 'technologie.image', 'technologie.imageAlt')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Appel à l&apos;action</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre', 'cta.titre')}
                {renderTextField('Libellé bouton', 'cta.ctaLabel')}
                {renderTextField('Lien bouton', 'cta.ctaHref')}
              </div>
              {renderTextArea('Texte', 'cta.texte', 2)}
            </div>
          </>
        )}

        {selectedPageId === 'actualites' && (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Bannière Actualités</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre bannière', 'banner.titre')}
                {renderTextField('Sous-titre bannière', 'banner.sousTitre')}
              </div>
              {renderImageField('Image de bannière', 'banner.image')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Articles &amp; Communiqués</h4>
              {renderCardList(
                'Articles publiés',
                'articles',
                [
                  { key: 'date', label: 'Date affichée' },
                  { key: 'titre', label: 'Titre de l’article' },
                  { key: 'resume', label: 'Résumé / Contenu', multiline: true },
                  { key: 'image', label: 'Image de couverture', isImage: true },
                ],
                () => ({
                  id: `art_${Date.now()}`,
                  date: new Date().toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }),
                  titre: 'Nouvelle actualité DA-TO GUINÉE SA',
                  resume: 'Résumé de l’annonce ou du projet.',
                  slug: `actualite-${Date.now()}`,
                  image: '/airo-assets/images/pages/actualites/article-immobilier.jpg',
                })
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Encart Restez informé</h4>
              {renderTextField('Titre', 'newsletter.titre')}
              {renderTextArea('Texte', 'newsletter.texte', 2)}
            </div>
          </>
        )}

        {selectedPageId === 'contact' && (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Bannière Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre bannière', 'banner.titre')}
                {renderTextField('Sous-titre bannière', 'banner.sousTitre')}
              </div>
              {renderImageField('Image de bannière', 'banner.image')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Formulaire &amp; Image Bureau</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Titre du formulaire', 'formulaire.titre')}
                {renderTextField('Libellé bouton envoi', 'formulaire.boutonLabel')}
                {renderTextField('Titre confirmation envoi', 'formulaire.messageSuccesTitre')}
                {renderTextField('Message confirmation', 'formulaire.messageSuccesTexte')}
              </div>
              {renderImageField('Photo bureau / accueil client', 'formulaire.imageBureau', 'formulaire.imageBureauAlt')}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#0B2C5C]">Clients, Partenaires &amp; Contribution</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTextField('Sur-titre Clients & Partenaires', 'clients.eyebrow')}
                {renderTextField('Titre Clients & Partenaires', 'clients.titre')}
              </div>
              {renderSimpleTextList('Types de clients', 'clients.clients.items', 'texte')}
              {renderSimpleTextList('Types de partenaires', 'clients.partenaires.items', 'texte')}
              <hr className="border-slate-200" />
              {renderTextField('Sur-titre Contribution Guinée', 'contribution.eyebrow')}
              {renderSimpleTextList('Points de contribution', 'contribution.items', 'texte')}
              {renderImageField('Image de fond Contribution', 'contribution.backgroundImage')}
            </div>
          </>
        )}

        {/* Module universel : Sections personnalisées additionnelles */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#F5A623]" />
              <div>
                <h4 className="text-sm font-bold text-[#0B2C5C]">
                  Sections personnalisées ({customSections.length})
                </h4>
                <p className="text-xs text-slate-500">
                  Ajoutez ou supprimez librement des blocs de contenu supplémentaires sur cette page.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={addCustomSection}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2C5C] text-white text-xs font-semibold hover:bg-[#0E3E7E] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter une section</span>
            </button>
          </div>

          {customSections.length === 0 ? (
            <div className="p-6 rounded-lg border border-dashed border-slate-200 text-center text-xs text-slate-500">
              Aucune section personnalisée ajoutée sur cette page.
            </div>
          ) : (
            <div className="space-y-4">
              {customSections.map((sec, idx) => (
                <div
                  key={sec.id || idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B2C5C]">
                      Section personnalisée #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCustomSection(idx)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer cette section</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Sur-titre (optionnel)
                      </label>
                      <input
                        type="text"
                        value={sec.eyebrow || ''}
                        onChange={(e) => updateCustomSection(idx, { eyebrow: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Titre de section *
                      </label>
                      <input
                        type="text"
                        value={sec.titre}
                        onChange={(e) => updateCustomSection(idx, { titre: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Apparence visuelle
                      </label>
                      <select
                        value={sec.theme || 'light'}
                        onChange={(e) =>
                          updateCustomSection(idx, {
                            theme: e.target.value as CustomSection['theme'],
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-sm bg-white"
                      >
                        <option value="light">Fond blanc</option>
                        <option value="muted">Fond gris clair</option>
                        <option value="navy">Fond Bleu DA-TO</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Contenu / Paragraphe
                    </label>
                    <textarea
                      rows={3}
                      value={sec.contenu}
                      onChange={(e) => updateCustomSection(idx, { contenu: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-sm bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Libellé du bouton (optionnel)
                      </label>
                      <input
                        type="text"
                        value={sec.ctaLabel || ''}
                        onChange={(e) => updateCustomSection(idx, { ctaLabel: e.target.value })}
                        placeholder="Ex: En savoir plus"
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Lien du bouton (optionnel)
                      </label>
                      <input
                        type="text"
                        value={sec.ctaHref || ''}
                        onChange={(e) => updateCustomSection(idx, { ctaHref: e.target.value })}
                        placeholder="Ex: /contact"
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {sec.imageUrl && (
                      <img
                        src={sec.imageUrl}
                        alt={sec.imageAlt || sec.titre}
                        className="w-16 h-12 rounded object-cover border border-slate-200"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setMediaTarget({ kind: 'custom', path: String(idx), index: idx })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B2C5C] text-white text-xs font-semibold cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{sec.imageUrl ? 'Remplacer image' : 'Ajouter une image'}</span>
                    </button>
                    {sec.imageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          updateCustomSection(idx, { imageUrl: '', imageAlt: '' })
                        }
                        className="text-xs text-red-600 hover:underline cursor-pointer"
                      >
                        Retirer l&apos;image
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sélecteur d'images */}
      <MediaPickerModal
        open={!!mediaTarget}
        mediaList={mediaList}
        admin={admin}
        defaultFolder={PAGE_MEDIA_FOLDERS[selectedPageId] || 'general'}
        onSelect={({ url, alt }) => {
          if (!mediaTarget) return;
          if (mediaTarget.kind === 'custom' && typeof mediaTarget.index === 'number') {
            updateCustomSection(mediaTarget.index, { imageUrl: url, imageAlt: alt });
          } else {
            updateField(mediaTarget.path, url);
            if (mediaTarget.altPath) {
              updateField(mediaTarget.altPath, alt);
            }
          }
        }}
        onClose={() => setMediaTarget(null)}
        onNotify={onNotify}
      />

      {/* Confirmation annulation brouillon */}
      <ConfirmModal
        open={confirmDiscardOpen}
        title="Annuler les modifications en brouillon ?"
        description="Toutes les modifications non publiées sur cette page seront remplacées par la version actuellement en ligne sur le site public."
        confirmLabel="Oui, restaurer"
        loading={discarding}
        onConfirm={handleConfirmDiscard}
        onCancel={() => setConfirmDiscardOpen(false)}
      />

      {/* Prévisualisation plein écran avant publication */}
      {previewOpen && (
        <div className="fixed inset-0 z-[210] bg-slate-950/75 flex flex-col">
          <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold">
                Prévisualisation brouillon
              </span>
              <span className="text-sm font-bold text-[#0B2C5C] hidden sm:inline">
                {selectedMeta.label} ({selectedMeta.route})
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setPreviewViewport('desktop')}
                className={`p-1.5 rounded ${
                  previewViewport === 'desktop'
                    ? 'bg-white text-[#0B2C5C] shadow-xs'
                    : 'text-slate-500'
                } cursor-pointer`}
                title="Ordinateur"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewViewport('tablet')}
                className={`p-1.5 rounded ${
                  previewViewport === 'tablet'
                    ? 'bg-white text-[#0B2C5C] shadow-xs'
                    : 'text-slate-500'
                } cursor-pointer`}
                title="Tablette"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewViewport('mobile')}
                className={`p-1.5 rounded ${
                  previewViewport === 'mobile'
                    ? 'bg-white text-[#0B2C5C] shadow-xs'
                    : 'text-slate-500'
                } cursor-pointer`}
                title="Mobile"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={async () => {
                  await handlePublish();
                  setPreviewOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F5A623] text-[#0B2C5C] text-xs font-bold hover:bg-[#e59819] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publier maintenant</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                aria-label="Fermer la prévisualisation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 flex justify-center bg-slate-900">
            <iframe
              key={`${selectedPageId}-${previewNonce}`}
              title={`Prévisualisation ${selectedMeta.label}`}
              src={`${selectedMeta.route}?preview=draft&_t=${previewNonce}`}
              className="bg-white rounded-lg shadow-2xl border border-slate-700 transition-all duration-200 h-full"
              style={{
                width:
                  previewViewport === 'desktop'
                    ? '100%'
                    : previewViewport === 'tablet'
                      ? '768px'
                      : '390px',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
