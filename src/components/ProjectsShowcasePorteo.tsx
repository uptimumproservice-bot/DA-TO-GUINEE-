import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, ArrowUpRight, MapPin, Layers, CheckCircle } from 'lucide-react';

interface Project {
  id: string;
  category: 'btp' | 'foncier' | 'immobilier';
  categoryLabel: string;
  title: string;
  location: string;
  status: 'Livré' | 'En cours' | 'Phase finale';
  image: string;
  desc: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 'p1',
    category: 'btp',
    categoryLabel: 'BTP & Voirie',
    title: 'Aménagement de Voiries Urbaines & Assainissement',
    location: 'Grand Conakry',
    status: 'Livré',
    image: '/airo-assets/images/pages/activites/pole-btp',
    desc: 'Terrassement lourd, pose de caniveaux en béton armé et bitumage de voies de désenclavement.',
    link: '/nos-activites#btp',
  },
  {
    id: 'p2',
    category: 'foncier',
    categoryLabel: 'Développement Foncier',
    title: 'Projet de Lotissement & Viabilisation Intégrée',
    location: 'Zone Coyah - Dubréka',
    status: 'En cours',
    image: '/airo-assets/images/pages/activites/pole-foncier',
    desc: 'Bornage contradictoire, sécurisation cadastrale et viabilisation complète (eau, électricité, voies).',
    link: '/nos-activites#foncier',
  },
  {
    id: 'p3',
    category: 'immobilier',
    categoryLabel: 'Promotion Immobilière',
    title: 'Résidences Modernes Haut Standing',
    location: 'Lambanyi, Conakry',
    status: 'Phase finale',
    image: '/airo-assets/images/pages/activites/pole-immobilier',
    desc: 'Immeubles collectifs et villas contemporaines conçus avec des matériaux durables et certifiés.',
    link: '/nos-activites#immobilier',
  },
  {
    id: 'p4',
    category: 'btp',
    categoryLabel: 'Génie Civil',
    title: 'Construction de Plateformes Logistiques & Entrepôts',
    location: 'Zone Industrielle',
    status: 'Livré',
    image: '/airo-assets/images/pages/about/team-construction',
    desc: 'Bâtiments industriels modulaires avec dalles haute résistance et voiries lourdes pour poids lourds.',
    link: '/nos-activites#btp',
  },
  {
    id: 'p5',
    category: 'foncier',
    categoryLabel: 'Aménagement',
    title: 'Création de Parcs d’Activités & Espaces Aménagés',
    location: 'Périphérie Conakry',
    status: 'En cours',
    image: '/airo-assets/images/pages/actualites/article-viabilisation',
    desc: 'Développement d’espaces structurés répondant aux besoins d’expansion des entreprises.',
    link: '/nos-activites#foncier',
  },
  {
    id: 'p6',
    category: 'immobilier',
    categoryLabel: 'Immobilier',
    title: 'Complexe Tertiaire & Espaces Commerciaux',
    location: 'Conakry Centre',
    status: 'Livré',
    image: '/airo-assets/images/pages/actualites/article-immobilier',
    desc: 'Espaces de bureaux et commerces répondant aux standards internationaux d’ergonomie et de sécurité.',
    link: '/nos-activites#immobilier',
  },
];

type FilterType = 'all' | 'btp' | 'foncier' | 'immobilier';

export const ProjectsShowcasePorteo: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [startIndex, setStartIndex] = useState(0);

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  const visibleCount = 3;
  const maxIndex = Math.max(0, filteredProjects.length - visibleCount);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const filterTabs = [
    { id: 'all', label: 'Toutes nos réalisations' },
    { id: 'btp', label: 'BTP & Infrastructures' },
    { id: 'foncier', label: 'Développement Foncier' },
    { id: 'immobilier', label: 'Immobilier & Valorisation' },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2C5C]/10 text-xs font-semibold text-[#0B2C5C] uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Nos Projets & Réalisations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C5C] tracking-tight">
              Des réalisations concrètes qui transforment le paysage guinéen
            </h2>
            <p className="text-slate-600 mt-2 max-w-xl text-sm sm:text-base">
              Découvrez un aperçu de nos projets d'infrastructures, d'aménagements fonciers et de programmes immobiliers à travers la Guinée.
            </p>
          </div>

          {/* Navigation Arrows (Porteo style) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="p-3 rounded-full border border-slate-300 bg-white text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none shadow-xs"
              aria-label="Projets précédents"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= maxIndex}
              className="p-3 rounded-full border border-slate-300 bg-white text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none shadow-xs"
              aria-label="Projets suivants"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs (Porteo style) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-2 border-b border-slate-200">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id as FilterType);
                  setStartIndex(0);
                }}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0B2C5C] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid / Carousel */}
        <div className="relative">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects
                .slice(startIndex, startIndex + visibleCount)
                .map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/80 transition-all duration-300 flex flex-col"
                  >
                    {/* Image with zoom on hover (Porteo style) */}
                    <div className="relative h-64 overflow-hidden bg-slate-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B2C5C]/90 backdrop-blur-md text-white border border-white/20">
                          {project.categoryLabel}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 ${
                            project.status === 'Livré'
                              ? 'bg-emerald-600/90 text-white'
                              : 'bg-[#F5A623]/95 text-[#0B2C5C] font-bold'
                          }`}
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>{project.status}</span>
                        </span>
                      </div>

                      {/* Location Bar overlay */}
                      <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
                        <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#0B2C5C] mb-2 leading-snug group-hover:text-[#F5A623] transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                          {project.desc}
                        </p>
                      </div>

                      {/* Card Footer Link with dynamic expanding arrow */}
                      <Link
                        to={project.link}
                        className="inline-flex items-center justify-between pt-4 border-t border-slate-100 text-xs sm:text-sm font-bold text-[#0B2C5C] group-hover:text-[#F5A623] transition-colors"
                      >
                        <span>En savoir plus sur ce pôle</span>
                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#F5A623] text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
