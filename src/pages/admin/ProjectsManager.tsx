import { useState } from 'react';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Image as ImageIcon,
  X,
  Star,
  FolderKanban,
} from 'lucide-react';
import {
  AdminUser,
  MediaItem,
  ProjectCategory,
  ProjectExecutionStatus,
  ProjectGalleryItem,
  ProjectItem,
  ProjectPublicationStatus,
} from '@/types/cms';
import {
  deleteProjectItem,
  saveProject,
  slugify,
  toggleProjectPublication,
} from '@/services/cmsService';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

interface ProjectsManagerProps {
  admin: AdminUser;
  projects: ProjectItem[];
  mediaList: MediaItem[];
  onNotify: (type: 'success' | 'error', msg: string) => void;
}

const CATEGORY_OPTIONS: { value: ProjectCategory; label: string }[] = [
  { value: 'btp', label: 'BTP & Infrastructures' },
  { value: 'foncier', label: 'Développement Foncier' },
  { value: 'immobilier', label: 'Immobilier & Valorisation' },
];

const EXECUTION_LABELS: Record<ProjectExecutionStatus, { label: string; tone: string }> = {
  en_cours: { label: 'En cours', tone: 'bg-blue-50 text-blue-700 border-blue-200' },
  acheve: { label: 'Achevé', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  a_venir: { label: 'À venir', tone: 'bg-amber-50 text-amber-800 border-amber-200' },
};

const PUBLICATION_LABELS: Record<ProjectPublicationStatus, { label: string; tone: string }> = {
  published: { label: 'Publié', tone: 'bg-emerald-100 text-emerald-800' },
  pending_publish: { label: 'En attente', tone: 'bg-amber-100 text-amber-800' },
  draft: { label: 'Brouillon', tone: 'bg-slate-200 text-slate-700' },
};

interface ProjectFormState {
  id?: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  location: string;
  description: string;
  executionStatus: ProjectExecutionStatus;
  publicationStatus: ProjectPublicationStatus;
  mainImageUrl: string;
  mainImageAlt: string;
  gallery: ProjectGalleryItem[];
  client: string;
  startDate: string;
  completionDate: string;
}

const EMPTY_FORM: ProjectFormState = {
  title: '',
  slug: '',
  category: 'btp',
  location: 'Conakry, Guinée',
  description: '',
  executionStatus: 'en_cours',
  publicationStatus: 'draft',
  mainImageUrl: '',
  mainImageAlt: '',
  gallery: [],
  client: '',
  startDate: '',
  completionDate: '',
};

export function ProjectsManager({
  admin,
  projects,
  mediaList,
  onNotify,
}: ProjectsManagerProps) {
  const [search, setSearch] = useState('');
  const [pubFilter, setPubFilter] = useState<'all' | ProjectPublicationStatus>('all');
  const [catFilter, setCatFilter] = useState<'all' | ProjectCategory>('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<ProjectFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [pickerMode, setPickerMode] = useState<'main' | 'gallery' | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<ProjectItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = projects.filter((p) => {
    const matchPub = pubFilter === 'all' || p.publicationStatus === pubFilter;
    const matchCat = catFilter === 'all' || p.category === catFilter;
    const matchQuery =
      !search.trim() ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchPub && matchCat && matchQuery;
  });

  const openNewModal = () => {
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setForm({
      id: project.id,
      title: project.title,
      slug: project.slug,
      category: project.category,
      location: project.location,
      description: project.description,
      executionStatus: project.executionStatus,
      publicationStatus: project.publicationStatus,
      mainImageUrl: project.mainImageUrl || '',
      mainImageAlt: project.mainImageAlt || project.title,
      gallery: project.gallery || [],
      client: project.client || '',
      startDate: project.startDate || '',
      completionDate: project.completionDate || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.description.trim()) {
      onNotify('error', 'Veuillez renseigner le nom, la localisation et la description du projet.');
      return;
    }

    setSaving(true);
    try {
      const catObj = CATEGORY_OPTIONS.find((c) => c.value === form.category)!;
      await saveProject(
        {
          id: form.id,
          title: form.title,
          slug: form.slug || slugify(form.title),
          category: form.category,
          categoryLabel: catObj.label,
          location: form.location,
          description: form.description,
          executionStatus: form.executionStatus,
          publicationStatus: form.publicationStatus,
          mainImageUrl: form.mainImageUrl,
          mainImageAlt: form.mainImageAlt || form.title,
          gallery: form.gallery,
          client: form.client,
          startDate: form.startDate,
          completionDate: form.completionDate,
        },
        admin
      );
      onNotify(
        'success',
        form.id
          ? `Projet « ${form.title} » mis à jour.`
          : `Projet « ${form.title} » créé avec succès.`
      );
      setModalOpen(false);
    } catch (err: any) {
      onNotify('error', err?.message || 'Erreur lors de la sauvegarde du projet.');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublication = async (project: ProjectItem) => {
    const nextStatus: ProjectPublicationStatus =
      project.publicationStatus === 'published' ? 'draft' : 'published';
    try {
      await toggleProjectPublication(project, nextStatus, admin);
      onNotify(
        'success',
        nextStatus === 'published'
          ? `Projet « ${project.title} » publié sur la page Nos Projets.`
          : `Projet « ${project.title} » retiré de la vitrine publique (brouillon).`
      );
    } catch (err: any) {
      onNotify('error', err?.message || 'Erreur lors du changement de statut.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    setDeleting(true);
    try {
      await deleteProjectItem(projectToDelete, admin);
      onNotify('success', `Projet « ${projectToDelete.title} » supprimé.`);
    } catch (err: any) {
      onNotify('error', err?.message || 'Impossible de supprimer le projet.');
    } finally {
      setDeleting(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* En-tête + bouton création */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#0B2C5C]">
            Portefeuille des projets ({projects.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Seuls les projets au statut « Publié » sont affichés sur la rubrique publique Nos projets.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B2C5C] text-white text-sm font-semibold hover:bg-[#0E3E7E] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau projet</span>
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par titre ou localisation..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="all">Toutes catégories</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={pubFilter}
            onChange={(e) => setPubFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="all">Tous statuts de publication</option>
            <option value="published">Publiés uniquement</option>
            <option value="draft">Brouillons uniquement</option>
            <option value="pending_publish">En attente</option>
          </select>
        </div>
      </div>

      {/* Liste / Tableau */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <FolderKanban className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">Aucun projet trouvé</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
            Aucun chantier réel ne correspond à ces critères. Cliquez sur « Nouveau projet » pour
            ajouter une opération officielle de DA-TO GUINÉE SA.
          </p>
          <button
            type="button"
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5A623] text-[#0B2C5C] text-xs font-bold hover:bg-[#e59819] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un premier projet</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => {
            const execInfo = EXECUTION_LABELS[project.executionStatus];
            const pubInfo = PUBLICATION_LABELS[project.publicationStatus];
            return (
              <div
                key={project.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-slate-100">
                    {project.mainImageUrl ? (
                      <img
                        src={project.mainImageUrl}
                        alt={project.mainImageAlt || project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${pubInfo.tone}`}>
                        {pubInfo.label}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${execInfo.tone}`}
                      >
                        {execInfo.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5A623]">
                      {project.categoryLabel}
                    </span>
                    <h3 className="text-sm font-bold text-[#0B2C5C] mt-1 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.location}</span>
                    </p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{project.description}</p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleTogglePublication(project)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      project.publicationStatus === 'published'
                        ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    {project.publicationStatus === 'published' ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Dépublier</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Publier</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      className="p-2 rounded-lg text-slate-600 hover:text-[#0B2C5C] hover:bg-slate-200/70 cursor-pointer"
                      title="Modifier"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setProjectToDelete(project)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal création / édition projet */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[180] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0B2C5C]">
                {form.id ? `Modifier : ${form.title}` : 'Ajouter un nouveau projet'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nom du projet *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Aménagement et voirie de la résidence..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Catégorie *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, category: e.target.value as ProjectCategory }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Localisation *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Ex: Conakry, Commune de Ratoma"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Avancement du chantier
                  </label>
                  <select
                    value={form.executionStatus}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        executionStatus: e.target.value as ProjectExecutionStatus,
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    <option value="en_cours">En cours</option>
                    <option value="acheve">Achevé</option>
                    <option value="a_venir">À venir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Visibilité sur le site
                  </label>
                  <select
                    value={form.publicationStatus}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        publicationStatus: e.target.value as ProjectPublicationStatus,
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    <option value="draft">Brouillon (masqué)</option>
                    <option value="pending_publish">En attente de validation</option>
                    <option value="published">Publié (visible sur Nos Projets)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client / Maître d&apos;ouvrage (optionnel)
                  </label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={(e) => setForm((prev) => ({ ...prev, client: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date début
                    </label>
                    <input
                      type="text"
                      value={form.startDate}
                      onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
                      placeholder="Ex: Jan 2025"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Livraison
                    </label>
                    <input
                      type="text"
                      value={form.completionDate}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, completionDate: e.target.value }))
                      }
                      placeholder="Ex: Déc 2026"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description détaillée *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez la nature des travaux, les enjeux techniques et les résultats obtenus..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                />
              </div>

              {/* Image principale */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B2C5C]">Image principale</span>
                  <button
                    type="button"
                    onClick={() => setPickerMode('main')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2C5C] text-white text-xs font-semibold cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Choisir / Importer</span>
                  </button>
                </div>
                {form.mainImageUrl && (
                  <div className="flex items-center gap-3">
                    <img
                      src={form.mainImageUrl}
                      alt={form.mainImageAlt}
                      className="w-24 h-16 rounded-lg object-cover border border-slate-200 bg-white"
                    />
                    <input
                      type="text"
                      value={form.mainImageAlt}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, mainImageAlt: e.target.value }))
                      }
                      placeholder="Description ALT de l'image principale"
                      className="flex-1 px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Galerie multi-photos */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B2C5C]">
                    Galerie photos ({form.gallery.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setPickerMode('gallery')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-[#0B2C5C] hover:bg-slate-100 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter une photo</span>
                  </button>
                </div>
                {form.gallery.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {form.gallery.map((g, idx) => (
                      <div
                        key={`${g.url}-${idx}`}
                        className="rounded-lg border border-slate-200 bg-white overflow-hidden"
                      >
                        <img src={g.url} alt={g.alt} className="w-full h-24 object-cover" />
                        <div className="p-2 flex items-center justify-between gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                mainImageUrl: g.url,
                                mainImageAlt: g.alt,
                              }))
                            }
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B2C5C] hover:text-[#F5A623] cursor-pointer"
                            title="Définir comme image principale"
                          >
                            <Star className="w-3 h-3" />
                            <span>Principale</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter((_, i) => i !== idx),
                              }))
                            }
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                            title="Retirer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-[#0B2C5C] text-white text-sm font-semibold hover:bg-[#0E3E7E] cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Enregistrement…' : 'Enregistrer le projet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sélecteur d'image */}
      <MediaPickerModal
        open={!!pickerMode}
        mediaList={mediaList}
        admin={admin}
        defaultFolder="projets"
        onSelect={({ url, alt }) => {
          if (pickerMode === 'main') {
            setForm((prev) => ({ ...prev, mainImageUrl: url, mainImageAlt: alt }));
          } else if (pickerMode === 'gallery') {
            setForm((prev) => ({
              ...prev,
              mainImageUrl: prev.mainImageUrl || url,
              mainImageAlt: prev.mainImageAlt || alt,
              gallery: [...prev.gallery, { url, alt }],
            }));
          }
        }}
        onClose={() => setPickerMode(null)}
        onNotify={onNotify}
      />

      {/* Confirmation suppression */}
      <ConfirmModal
        open={!!projectToDelete}
        title="Supprimer ce projet ?"
        description={`Le projet « ${projectToDelete?.title || ''} » sera définitivement supprimé de la base de données et de la vitrine publique.`}
        confirmLabel="Supprimer définitivement"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  );
}
