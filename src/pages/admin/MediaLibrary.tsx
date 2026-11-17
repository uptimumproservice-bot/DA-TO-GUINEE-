import { useState, useRef, useMemo } from 'react';
import {
  Upload,
  Search,
  Trash2,
  RefreshCw,
  Eye,
  Edit3,
  Check,
  X,
  Image as ImageIcon,
  Loader2,
  Copy,
} from 'lucide-react';
import {
  AdminUser,
  MediaFolder,
  MediaItem,
  ProjectItem,
  SitePageDoc,
  SiteSettings,
} from '@/types/cms';
import {
  deleteMediaFile,
  replaceMediaFile,
  updateMediaMetadata,
  uploadMediaFile,
} from '@/services/cmsService';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

interface MediaLibraryProps {
  admin: AdminUser;
  mediaList: MediaItem[];
  pages: SitePageDoc[];
  projects: ProjectItem[];
  settings: Omit<SiteSettings, 'updatedBy' | 'updatedAt'>;
  onNotify: (type: 'success' | 'error', msg: string) => void;
}

const FOLDERS: { value: MediaFolder | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'accueil', label: 'Accueil' },
  { value: 'a-propos', label: 'À propos' },
  { value: 'activites', label: 'Activités' },
  { value: 'projets', label: 'Projets' },
  { value: 'engagements', label: 'Engagements' },
  { value: 'actualites', label: 'Actualités' },
  { value: 'branding', label: 'Logos & Marque' },
  { value: 'general', label: 'Général' },
];

export function MediaLibrary({
  admin,
  mediaList,
  pages,
  projects,
  settings,
  onNotify,
}: MediaLibraryProps) {
  const [search, setSearch] = useState('');
  const [folderFilter, setFolderFilter] = useState<MediaFolder | 'all'>('all');
  const [unusedOnly, setUnusedOnly] = useState(false);

  const [uploadFolder, setUploadFolder] = useState<MediaFolder>('general');
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploading, setUploading] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [itemToReplace, setItemToReplace] = useState<MediaItem | null>(null);

  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editAlt, setEditAlt] = useState('');
  const [editFolder, setEditFolder] = useState<MediaFolder>('general');

  const [itemToDelete, setItemToDelete] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Détecter les URLs actuellement utilisées sur les pages, projets et paramètres
  const usedUrls = useMemo(() => {
    const urls = new Set<string>();
    const scanValue = (val: any) => {
      if (!val) return;
      if (typeof val === 'string') {
        if (val.startsWith('/')) urls.add(val);
        return;
      }
      if (Array.isArray(val)) {
        val.forEach(scanValue);
        return;
      }
      if (typeof val === 'object') {
        Object.values(val).forEach(scanValue);
      }
    };
    pages.forEach((p) => {
      scanValue(p.publishedContent);
      scanValue(p.draftContent);
    });
    projects.forEach((pr) => {
      if (pr.mainImageUrl) urls.add(pr.mainImageUrl);
      pr.gallery?.forEach((g) => urls.add(g.url));
    });
    if (settings.logoLightUrl) urls.add(settings.logoLightUrl);
    if (settings.logoDarkUrl) urls.add(settings.logoDarkUrl);
    return urls;
  }, [pages, projects, settings]);

  const filtered = mediaList.filter((m) => {
    const matchFolder = folderFilter === 'all' || m.folder === folderFilter;
    const matchQuery =
      !search.trim() ||
      m.fileName.toLowerCase().includes(search.toLowerCase()) ||
      m.alt.toLowerCase().includes(search.toLowerCase());
    const matchUnused = !unusedOnly || !usedUrls.has(m.url);
    return matchFolder && matchQuery && matchUnused;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const created = await uploadMediaFile(
        file,
        uploadFolder,
        uploadAlt.trim() || file.name.replace(/\.[^/.]+$/, ''),
        admin
      );
      setUploadAlt('');
      onNotify(
        'success',
        `Image « ${created.fileName} » optimisée en WebP (${Math.round(
          created.sizeBytes / 1024
        )} Ko) et ajoutée.`
      );
    } catch (err: any) {
      onNotify('error', err?.message || "Erreur lors de l'importation.");
    } finally {
      setUploading(false);
      if (uploadInputRef.current) uploadInputRef.current.value = '';
    }
  };

  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !itemToReplace) return;
    setUploading(true);
    try {
      await replaceMediaFile(itemToReplace, file, itemToReplace.alt, admin);
      onNotify('success', `Image « ${itemToReplace.fileName} » remplacée avec succès.`);
    } catch (err: any) {
      onNotify('error', err?.message || "Erreur lors du remplacement.");
    } finally {
      setUploading(false);
      setItemToReplace(null);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const handleSaveMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      await updateMediaMetadata(editingItem.id, editAlt, editFolder, admin);
      onNotify('success', 'Balise ALT et dossier mis à jour.');
      setEditingItem(null);
    } catch (err: any) {
      onNotify('error', err?.message || 'Impossible de mettre à jour le média.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await deleteMediaFile(itemToDelete, admin);
      onNotify('success', `Image « ${itemToDelete.fileName} » supprimée.`);
    } catch (err: any) {
      onNotify('error', err?.message || 'Impossible de supprimer le fichier.');
    } finally {
      setDeleting(false);
      setItemToDelete(null);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      onNotify('success', 'Chemin de l’image copié dans le presse-papiers.');
    } catch {
      onNotify('error', 'Copie impossible.');
    }
  };

  return (
    <div className="space-y-5">
      {/* Zone d'importation optimisée */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#0B2C5C]">
            Bibliothèque multimédia ({mediaList.length} fichier(s))
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Importez vos images depuis votre ordinateur. Elles sont automatiquement redimensionnées
            et compressées en WebP côté serveur pour un chargement rapide.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <input
            type="text"
            value={uploadAlt}
            onChange={(e) => setUploadAlt(e.target.value)}
            placeholder="Description alternative (balise ALT) pour le SEO..."
            className="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
          />
          <select
            value={uploadFolder}
            onChange={(e) => setUploadFolder(e.target.value as MediaFolder)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
          >
            {FOLDERS.filter((f) => f.value !== 'all').map((f) => (
              <option key={f.value} value={f.value}>
                Dossier : {f.label}
              </option>
            ))}
          </select>
          <input
            ref={uploadInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            className="hidden"
          />
          <input
            ref={replaceInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleReplaceFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => uploadInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B2C5C] text-white text-sm font-semibold hover:bg-[#0E3E7E] cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Optimisation en cours…</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Importer une image</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom de fichier ou balise ALT..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={unusedOnly}
              onChange={(e) => setUnusedOnly(e.target.checked)}
              className="rounded border-slate-300 text-[#0B2C5C]"
            />
            <span>Afficher uniquement les images inutilisées</span>
          </label>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {FOLDERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFolderFilter(f.value)}
              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                folderFilter === f.value
                  ? 'bg-[#0B2C5C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des médias */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-800">Aucune image correspondante</p>
          <p className="text-xs text-slate-500 mt-1">
            Importez une image depuis votre ordinateur ou modifiez les filtres.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const isUsed = usedUrls.has(item.url);
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 bg-slate-100 group">
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="px-2 py-0.5 rounded bg-slate-900/75 text-white text-[10px] font-semibold">
                        {item.folder}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isUsed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isUsed ? 'Utilisée' : 'Inutilisée'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewItem(item)}
                      className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/90 text-[#0B2C5C] hover:bg-white shadow-xs cursor-pointer"
                      title="Visualiser en grand"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 space-y-1">
                    <p className="text-xs font-bold text-slate-800 truncate">{item.fileName}</p>
                    <p className="text-[11px] text-slate-500 truncate">ALT : {item.alt || '—'}</p>
                    <p className="text-[11px] font-mono text-slate-400 tabular-nums">
                      {item.width ? `${item.width}×${item.height}px · ` : ''}
                      {Math.max(1, Math.round((item.sizeBytes || 0) / 1024))} Ko
                    </p>
                  </div>
                </div>

                <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="p-1.5 rounded text-slate-500 hover:text-[#0B2C5C] hover:bg-slate-200/70 cursor-pointer"
                    title="Copier le lien"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(item);
                      setEditAlt(item.alt);
                      setEditFolder(item.folder);
                    }}
                    className="p-1.5 rounded text-slate-500 hover:text-[#0B2C5C] hover:bg-slate-200/70 cursor-pointer"
                    title="Modifier ALT & dossier"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setItemToReplace(item);
                      replaceInputRef.current?.click();
                    }}
                    className="p-1.5 rounded text-slate-500 hover:text-[#0B2C5C] hover:bg-slate-200/70 cursor-pointer"
                    title="Remplacer le fichier image"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="p-1.5 rounded text-slate-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal édition ALT & Dossier */}
      {editingItem && (
        <div
          className="fixed inset-0 z-[190] bg-slate-950/60 flex items-center justify-center p-4"
          onClick={() => setEditingItem(null)}
        >
          <form
            onSubmit={handleSaveMetadata}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0B2C5C]">Métadonnées de l&apos;image</h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description alternative (ALT)
              </label>
              <input
                type="text"
                required
                value={editAlt}
                onChange={(e) => setEditAlt(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Dossier</label>
              <select
                value={editFolder}
                onChange={(e) => setEditFolder(e.target.value as MediaFolder)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                {FOLDERS.filter((f) => f.value !== 'all').map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#0B2C5C] text-white text-xs font-semibold cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Enregistrer</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal prévisualisation grand format */}
      {previewItem && (
        <div
          className="fixed inset-0 z-[200] bg-slate-950/85 flex items-center justify-center p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#0B2C5C]">{previewItem.fileName}</p>
                <p className="text-xs text-slate-500">ALT : {previewItem.alt}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-slate-900 flex items-center justify-center max-h-[75vh] overflow-hidden p-4">
              <img
                src={previewItem.url}
                alt={previewItem.alt}
                className="max-h-[70vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression */}
      <ConfirmModal
        open={!!itemToDelete}
        title="Supprimer cette image ?"
        description={
          itemToDelete && usedUrls.has(itemToDelete.url)
            ? `Attention : « ${itemToDelete.fileName} » semble actuellement utilisée sur une page ou un projet. Voulez-vous vraiment la supprimer ?`
            : `Le fichier « ${itemToDelete?.fileName || ''} » sera définitivement supprimé de la bibliothèque.`
        }
        confirmLabel="Supprimer l'image"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}
