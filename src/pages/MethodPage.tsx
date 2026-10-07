import React, { useState } from 'react';
import { PageId } from '../types';
import { ParallaxBanner } from '../components/ParallaxBanner';
import { METHOD_TIMELINE } from '../data/siteData';
import { 
  CheckCircle, 
  ArrowRight, 
  FileSpreadsheet, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  ClipboardList
} from 'lucide-react';

interface MethodPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const MethodPage: React.FC<MethodPageProps> = ({ 
  onNavigate, 
  onOpenQuoteModal 
}) => {
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);
  const activeStep = METHOD_TIMELINE[selectedStepIdx];

  return (
    <div className="w-full bg-white">
      {/* 1. Parallax Banner with African Engineer */}
      <ParallaxBanner
        title="Notre Méthode d'Intervention"
        subtitle="Un processus d'ingénierie rigoureux en 7 étapes chronologiques pour garantir sécurité, respect des délais et qualité d'exécution."
        image="/uploaded-images/methode_engineer_1790975139598.jpg"
        badge="PROCESSUS QUALITÉ DE BOUT EN BOUT"
        currentPageLabel="Notre Méthode"
        onNavigateHome={() => onNavigate('accueil')}
      />

      {/* 2. Intro overview */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase mb-1 block font-display">
            Standard Opérationnel DA-TO
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2C5C] font-display">
            De l'Étude Préalable à la Réception d'Ouvrage
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Chaque projet est conduit selon une démarche d'assurance qualité éprouvée, adaptée aux spécificités hydrographiques, climatiques et réglementaires de la Guinée.
          </p>
        </div>
      </section>

      {/* 3. Interactive Chronological Timeline (01 to 07) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Steps Selector for Desktop & Tablets */}
        <div className="hidden lg:grid grid-cols-7 gap-2 mb-12 relative">
          {/* Subtle line behind step numbers */}
          <div className="absolute top-7 left-6 right-6 h-1 bg-slate-200 -z-0" />

          {METHOD_TIMELINE.map((step, idx) => {
            const isSelected = idx === selectedStepIdx;
            return (
              <button
                key={step.number}
                onClick={() => setSelectedStepIdx(idx)}
                className="relative z-10 flex flex-col items-center text-center group cursor-pointer focus:outline-none"
              >
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-base transition-all duration-300 shadow-sm ${
                    isSelected
                      ? 'bg-[#0B2C5C] text-[#F5A623] scale-110 shadow-lg ring-4 ring-[#F5A623]/30'
                      : 'bg-white border-2 border-slate-300 text-slate-600 group-hover:border-[#0B2C5C] group-hover:text-[#0B2C5C]'
                  }`}
                >
                  {step.number}
                </div>

                <span className={`text-xs font-bold font-display mt-3 tracking-wide ${
                  isSelected ? 'text-[#0B2C5C]' : 'text-slate-600 group-hover:text-slate-900'
                }`}>
                  {step.title}
                </span>

                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-[#F5A623] mt-1"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile / Tablet Horizontal Scroll */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {METHOD_TIMELINE.map((step, idx) => {
            const isSelected = idx === selectedStepIdx;
            return (
              <button
                key={step.number}
                onClick={() => setSelectedStepIdx(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#0B2C5C] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className={isSelected ? 'text-[#F5A623]' : 'text-slate-600'}>
                  {step.number}.
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Focus Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Header / Key Description (5 cols) */}
            <div className="lg:col-span-5 bg-[#0B2C5C] text-white p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-[#F5A623] text-xs font-mono font-bold tracking-wider mb-4 border border-white/10">
                  <span>PHASE OPÉRATIONNELLE</span>
                  <span>·</span>
                  <span>ÉTAPE {activeStep.number}/07</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-white mb-4">
                  {activeStep.number}. {activeStep.title}
                </h3>
                
                <p className="text-base text-[#F5A623] font-medium mb-4 leading-snug">
                  {activeStep.shortDesc}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              <div className="pt-8 border-t border-white/15 mt-8 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1F7A3A]" />
                  Contrôle Qualité Intégré
                </span>

                <div className="flex items-center gap-1">
                  <button
                    disabled={selectedStepIdx === 0}
                    onClick={() => setSelectedStepIdx(prev => Math.max(0, prev - 1))}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Étape précédente"
                  >
                    &larr;
                  </button>
                  <button
                    disabled={selectedStepIdx === METHOD_TIMELINE.length - 1}
                    onClick={() => setSelectedStepIdx(prev => Math.min(METHOD_TIMELINE.length - 1, prev + 1))}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Étape suivante"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Right Deliverables & Tools Column (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-10 bg-slate-50/50 flex flex-col justify-between space-y-8">
              
              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-bold text-[#0B2C5C] uppercase tracking-wider font-display mb-4 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-[#F5A623]" />
                  Livrables Techniques & Documents Fournis
                </h4>
                
                <div className="space-y-3">
                  {activeStep.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-800">
                        {del}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Resources */}
              <div>
                <h4 className="text-xs font-bold text-[#0B2C5C] uppercase tracking-wider font-display mb-4 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#F5A623]" />
                  Outils, Équipements & Protocoles Mobilisés
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeStep.tools.map((tool, tIdx) => (
                    <div key={tIdx} className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                      <span className="text-xs text-slate-700 font-medium">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Besoin d'un audit sur votre chantier en cours ?
                </span>
                <button
                  onClick={onOpenQuoteModal}
                  className="btn-accent px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Chiffrer mon projet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 4. Complete 01 to 07 Summary Table */}
        <div className="mt-16">
          <h3 className="text-lg font-bold text-[#0B2C5C] font-display mb-6">
            Vue Synthétique des 7 Jalons du DA-TO GUINEE SA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {METHOD_TIMELINE.map((step, idx) => (
              <div 
                key={step.number}
                onClick={() => setSelectedStepIdx(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer card-hover ${
                  selectedStepIdx === idx
                    ? 'border-[#F5A623] bg-amber-50/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#F5A623] font-display">
                    ÉTAPE {step.number}
                  </span>
                  <span className="text-xs text-slate-600 font-mono">
                    0{idx + 1}/07
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#0B2C5C] font-display mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {step.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};
