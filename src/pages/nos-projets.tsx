import { useState } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import {
  MapPin,
  ArrowRight,
  Building2,
  Calendar,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
} from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { ProjectExecutionStatus, ProjectItem } from '@/types/cms';
import { CustomSectionsRenderer } from '@/components/CustomSectionsRenderer';

const EXECUTION_LABELS: Record<ProjectExecutionStatus, { label: string; badgeClass: string }> = {
  en_cours: {
    label: 'En cours',
    badgeClass: 'bg-[#F5A623] text-[#0B2C5C]',
  },
  acheve: {
    label: 'Achevé',
    badgeClass: 'bg-emerald-600 text-white',
  },
  a_venir: {
    label: 'À venir',
    badgeClass: 'bg-[#0B2C5C] text-white border border-white/25',
  },
};

export default function NosProjetsPage() {
  const { getPageContent, publishedProjects, settings } = useSiteContent();
  const pageData = getPageContent('nos-projets');
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const parallaxY = useTransform(scrollY, (value) => (prefersReducedMotion ? 0 : value * 0.3));

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'btp' | 'foncier' | 'immobilier'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const filtered =
    categoryFilter === 'all'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === categoryFilter);

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setGalleryIndex(0);
  };

  const getModalImages = (project: ProjectItem) => {
    const imgs: { url: string; alt: string }[] = [];
    if (project.mainImageUrl) {
      imgs.push({ url: project.mainImageUrl, alt: project.mainImageAlt || project.title });
    }
    if (project.gallery) {
      for (const g of project.gallery) {
        if (g.url && g.url !== project.mainImageUrl) {
          imgs.push({ url: g.url, alt: g.alt || project.title });
        }
      }
    }
    return imgs;
  };

  return (
    <>
      <Helmet>
        <title>Nos Projets — {settings.companyName}</title>
        <meta
          name="description"
          content={`Découvrez les projets officiels de ${settings.companyName} en BTP, développement foncier et immobilier en République de Guinée.`}
        />
      </Helmet>

      <main className="bg-slate-50 dark:bg-[#071933] transition-colors">
        {/* ── BANNIÈRE ─────────────────────────────────────────────────────── */}
        <section className="relative h-[380px] md:h-[460px] flex items-center overflow-hidden">
          <motion.div
            className="absolute -top-[15%] left-0 right-0 h-[130%] bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${pageData.banner?.image || '/airo-assets/images/pages/activites/banner.jpg'})`,
              y: parallaxY,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--primary) / 0.92) 0%, hsl(var(--primary) / 0.68) 100%)',
            }}
          />
          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-[#F5A623]">
                {pageData.banner?.sousTitre}
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {pageData.banner?.titre || 'Nos Projets'}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── INTRODUCTION & FILTRES ──────────────────────────────────────── */}
        <section className="py-14 bg-white dark:bg-[#071933] border-b border-slate-200/80 dark:border-white/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
            <div className="w-12 h-1 mx-auto mb-5 rounded-full bg-[#F5A623]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#F5A623] mb-2">
              {pageData.intro?.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2C5C] dark:text-white mb-4">
              {pageData.intro?.titre}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              {pageData.intro?.texte}
            </p>

            {/* Filtres */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {[
                { id: 'all', label: 'Tous les pôles' },
                { id: 'btp', label: 'BTP & Infrastructures' },
                { id: 'foncier', label: 'Développement Foncier' },
                { id: 'immobilier', label: 'Immobilier & Valorisation' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    categoryFilter === tab.id
                      ? 'bg-[#0B2C5C] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-[#0C254B] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#143468]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── GRILLE DES PROJETS PUBLIÉS ───────────────────────────────────── */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {filtered.length === 0 ? (
              <div className="max-w-2xl mx-auto bg-white dark:bg-[#0C254B] border border-slate-200 dark:border-white/10 rounded-2xl p-10 text-center shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0B2C5C]/10 dark:bg-white/10 text-[#0B2C5C] dark:text-white flex items-center justify-center mx-auto mb-5">
                  <FolderOpen className="w-7 h-7 text-[#F5A623]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2C5C] dark:text-white mb-3">
                  {publishedProjects.length === 0
                    ? pageData.emptyState?.titre || 'Portefeuille en cours de mise à jour'
                    : 'Aucun projet publié dans cette catégorie'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {publishedProjects.length === 0
                    ? pageData.emptyState?.texte
                    : 'Sélectionnez une autre catégorie ou contactez notre équipe pour toute demande.'}
                </p>
                <Link
                  to={pageData.emptyState?.ctaHref || '/contact'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#F5A623] hover:bg-[#e0951a] transition-colors"
                >
                  <span>{pageData.emptyState?.ctaLabel || 'Nous contacter'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filtered.map((project) => {
                  const statusMeta = EXECUTION_LABELS[project.executionStatus] || EXECUTION_LABELS.en_cours;
                  const photoCount =
                    (project.mainImageUrl ? 1 : 0) +
                    (project.gallery?.filter((g) => g.url !== project.mainImageUrl).length || 0);

                  return (
                    <article
                      key={project.id}
                      onClick={() => openProjectModal(project)}
                      className="group bg-white dark:bg-[#0C254B] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                    >
                      <div className="relative h-60 bg-slate-900 overflow-hidden">
                        {project.mainImageUrl ? (
                          <img
                            src={project.mainImageUrl}
                            alt={project.mainImageAlt || project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#0B2C5C]/90 text-white/40">
                            <Building2 className="w-12 h-12" />
                          </div>
                        )}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#0B2C5C]/90 text-white border border-white/15">
                            {project.categoryLabel}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-md text-xs font-bold ${statusMeta.badgeClass}`}
                          >
                            {statusMeta.label}
                          </span>
                        </div>
                        {photoCount > 1 && (
                          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/65 text-white text-xs font-semibold flex items-center gap-1.5">
                            <Images size={13} />
                            <span>{photoCount} photos</span>
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5A623] mb-2">
                            <MapPin size={14} />
                            <span>{project.location}</span>
                          </div>
                          <h3 className="text-lg font-extrabold text-[#0B2C5C] dark:text-white mb-2 group-hover:text-[#F5A623] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#0B2C5C] dark:text-blue-200">
                          <span>Consulter la fiche détaillée</span>
                          <ArrowRight size={15} className="text-[#F5A623]" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <CustomSectionsRenderer sections={pageData.customSections} />
      </main>

      {/* ── MODALE FICHE PROJET DÉTAILLÉE ────────────────────────────────── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white dark:bg-[#0C254B] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const images = getModalImages(selectedProject);
              const current = images[galleryIndex];
              const statusMeta =
                EXECUTION_LABELS[selectedProject.executionStatus] || EXECUTION_LABELS.en_cours;

              return (
                <>
                  <div className="relative h-72 sm:h-96 bg-slate-900">
                    {current ? (
                      <img
                        src={current.url}
                        alt={current.alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30">
                        <Building2 className="w-16 h-16" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                      aria-label="Fermer"
                    >
                      <X size={20} />
                    </button>

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryIndex((i) => (i - 1 + images.length) % images.length)
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                          aria-label="Image précédente"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setGalleryIndex((i) => (i + 1) % images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                          aria-label="Image suivante"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {images.length > 1 && (
                    <div className="flex gap-2 p-3 bg-slate-100 dark:bg-[#071933] overflow-x-auto">
                      {images.map((img, idx) => (
                        <button
                          key={img.url + idx}
                          type="button"
                          onClick={() => setGalleryIndex(idx)}
                          className={`w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                            idx === galleryIndex
                              ? 'border-[#F5A623]'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#0B2C5C] text-white">
                        {selectedProject.categoryLabel}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-bold ${statusMeta.badgeClass}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-[#0B2C5C] dark:text-white mb-3">
                      {selectedProject.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300 mb-5">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <MapPin size={14} className="text-[#F5A623]" />
                        {selectedProject.location}
                      </span>
                      {(selectedProject.startDate || selectedProject.completionDate) && (
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <Calendar size={14} className="text-[#F5A623]" />
                          {[selectedProject.startDate, selectedProject.completionDate]
                            .filter(Boolean)
                            .join(' → ')}
                        </span>
                      )}
                      {selectedProject.client && (
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <Building2 size={14} className="text-[#F5A623]" />
                          Maître d&apos;ouvrage : {selectedProject.client}
                        </span>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line mb-6">
                      {selectedProject.description}
                    </p>

                    <div className="flex justify-end">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#F5A623] hover:bg-[#e0951a] transition-colors"
                      >
                        <span>Demander des informations</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}
