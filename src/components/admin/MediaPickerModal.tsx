import { useState, useRef } from 'react';
import { X, Upload, Check, Image as ImageIcon, Search, Loader2 } from 'lucide-react';
import { AdminUser, MediaFolder, MediaItem } from '@/types/cms';
import { uploadMediaFile } from '@/services/cmsService';

interface MediaPickerModalProps {
  open: boolean;
  mediaList: MediaItem[];
  admin: AdminUser;
  defaultFolder?: MediaFolder;
  onSelect: (item: { url: string; alt: string }) => void;
  onClose: () => void;
  onNotify?: (type: 'success' | 'error', msg: string) => void;
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

export function MediaPickerModal({
  open,
  mediaList,
  admin,
  defaultFolder = 'general',
  onSelect,
  onClose,
  onNotify,
}: MediaPickerModalProps) {
  const [search, setSearch] = useState('');
  const [folderFilter, setFolderFilter] = useState<MediaFolder | 'all'>('all');
  const [uploading, setUploading] = useState(false);
  const [newAlt, setNewAlt] = useState('');
  const [uploadFolder, setUploadFolder] = useState<MediaFolder>(defaultFolder);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const filtered = mediaList.filter((m) => {
    const matchFolder = folderFilter === 'all' || m.folder === folderFilter;
    const matchQuery =
      !search.trim() ||
      m.fileName.toLowerCase().includes(search.toLowerCase()) ||
      m.alt.toLowerCase().includes(search.toLowerCase());
    return matchFolder && matchQuery;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const created = await uploadMediaFile(
        file,
        uploadFolder,
        newAlt.trim() || file.name.replace(/\.[^/.]+$/, ''),
        admin
      );
      onNotify?.('success', `Image « ${created.fileName} » optimisée et importée.`);
      onSelect({ url: created.url, alt: created.alt });
      onClose();
    } catch (err: any) {
      onNotify?.('error', err?.message || "Erreur lors de l'importation.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className="fixed inset-0 z-[190] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl border border-slate-200 max-w-4xl w-full max-h-[88vh] flex flex-col shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#0B2C5C]">
              Sélectionner ou importer une image
            </h3>
            <p className="text-xs text-slate-500">
              Les images importées sont automatiquement compressées et optimisées en WebP.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barre import rapide */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={newAlt}
            onChange={(e) => setNewAlt(e.target.value)}
            placeholder="Description alternative (ALT) avant import..."
            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
          />
          <select
            value={uploadFolder}
            onChange={(e) => setUploadFolder(e.target.value as MediaFolder)}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-700"
          >
            {FOLDERS.filter((f) => f.value !== 'all').map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B2C5C] text-white text-sm font-semibold hover:bg-[#0E3E7E] transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Optimisation…</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Importer depuis l&apos;ordinateur</span>
              </>
            )}
          </button>
        </div>

        {/* Recherche & filtres */}
        <div className="px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom ou texte ALT..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FOLDERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFolderFilter(f.value)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
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

        {/* Grille */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">
                Aucune image dans cette vue
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Utilisez le bouton « Importer depuis l&apos;ordinateur » ci-dessus pour ajouter une image.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelect({ url: item.url, alt: item.alt });
                    onClose();
                  }}
                  className="group text-left rounded-lg border border-slate-200 overflow-hidden hover:border-[#F5A623] transition-all cursor-pointer bg-white"
                >
                  <div className="relative h-28 bg-slate-100">
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0B2C5C]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-[#0B2C5C] text-xs font-bold">
                        <Check className="w-3.5 h-3.5" /> Choisir
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-slate-800 truncate">{item.fileName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{item.alt}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
