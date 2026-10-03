import React, { useState } from 'react';
import { PageId } from '../types';
import { ParallaxBanner } from '../components/ParallaxBanner';
import { ACTIVITY_POLES } from '../data/siteData';
import { 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  HardHat, 
  Landmark, 
  Hammer, 
  Layers, 
  FileCheck2 
} from 'lucide-react';

interface ActivitiesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: (poleName?: string) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ 
  onNavigate, 
  onOpenQuoteModal 
}) => {
  const [selectedPoleTab, setSelectedPoleTab] = useState<string>('all');

  const filteredPoles = selectedPoleTab === 'all' 
    ? ACTIVITY_POLES 
    : ACTIVITY_POLES.filter(p => p.id === selectedPoleTab);

  return (
    <div className="w-full bg-white">
      {/* 1. Parallax Banner */}
      <ParallaxBanner
        title="Nos Activités & Domaines d'Expertise"
        subtitle="Trois pôles d'excellence complémentaires pour bâtir la Guinée moderne avec sécurité, rigueur et performance."
        image="/src/assets/images/hero_real_estate_1790975118410.jpg"
        badge="EXPERTISE BTP & VALORISATION EN GUINÉE"
        currentPageLabel="Nos Activités"
        onNavigateHome={() => onNavigate('accueil')}
      />

      {/* 2. Interactive Pole Selector Tabs */}
      <div className="border-b border-slate-200 sticky top-[69px] z-30 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPoleTab('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedPoleTab === 'all'
                  ? 'bg-[#0B2C5C] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Tous nos pôles
            </button>
            {ACTIVITY_POLES.map((pole) => (
              <button
                key={pole.id}
                onClick={() => setSelectedPoleTab(pole.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedPoleTab === pole.id
                    ? 'bg-[#0B2C5C] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {pole.shortTitle}
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenQuoteModal()}
            className="hidden sm:inline-flex btn-accent px-4 py-2 rounded-lg text-xs font-bold items-center gap-1.5 shrink-0 ml-4"
          >
            <span>Devis projet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Detailed Sections for each Pole */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {filteredPoles.map((pole, index) => {
          const isEven = index % 2 === 1;

          return (
            <section 
              key={pole.id} 
              id={pole.id}
              className="scroll-mt-32"
              aria-labelledby={`heading-${pole.id}`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Left/Right Media Column (5 cols) */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                    <img
                      src={pole.image}
                      alt={`DA-TO GUINEE SA Guinée - ${pole.title}`}
                      className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    
                    {/* Key figures overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {pole.keyFigures.map((fig, fIdx) => (
                          <div key={fIdx} className="border-r last:border-r-0 border-slate-200">
                            <span className="block text-base font-extrabold text-[#0B2C5C] font-display">
                              {fig.value}
                            </span>
                            <span className="block text-[10px] text-slate-500 font-medium">
                              {fig.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left/Right Content Column (7 cols) */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0B2C5C]/10 text-[#0B2C5C] text-xs font-bold uppercase tracking-wider mb-2">
                      <span>Pôle Spécialisé 0{index + 1}</span>
                    </div>
                    <h2 id={`heading-${pole.id}`} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2C5C] font-display leading-tight">
                      {pole.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#F5A623] mt-1">
                      {pole.tagline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {pole.description}
                  </p>

                  {/* List of services in this pole */}
                  <div className="bg-[#F5F5F5] rounded-2xl p-6 border border-slate-200/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2C5C] font-display mb-4 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#F5A623]" />
                      Services & Prestations Clés
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pole.services.map((service, sIndex) => (
                        <div key={sIndex} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#1F7A3A] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pole CTA Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onOpenQuoteModal(pole.title)}
                      className="btn-accent px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2"
                    >
                      <span>Demander un devis sur ce pôle</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('methode');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-[#0B2C5C] bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Découvrir notre méthode de suivi
                    </button>
                  </div>

                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* 4. Bottom Support Bar */}
      <div className="bg-[#0B2C5C] text-white py-12 border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between">
          <div className="text-left mb-4 sm:mb-0">
            <h3 className="text-lg font-bold font-display text-white">
              Besoin d'un montage technique ou financier spécifique ?
            </h3>
            <p className="text-xs text-slate-300">
              Nos ingénieurs et juristes fonciers étudient les cahiers des charges complexes sur l'ensemble de la Guinée.
            </p>
          </div>
          <button
            onClick={() => onOpenQuoteModal()}
            className="btn-accent px-6 py-3 rounded-lg text-xs font-bold shrink-0"
          >
            Prendre contact avec la direction technique
          </button>
        </div>
      </div>
    </div>
  );
};
