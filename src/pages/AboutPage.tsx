import React, { useState } from 'react';
import { PageId } from '../types';
import { ParallaxBanner } from '../components/ParallaxBanner';
import { ScrollFadeIn } from '../components/ScrollFadeIn';
import { 
  VALUE_CHAIN_STEPS, 
  ABOUT_INTERVENTION_DOMAINS 
} from '../data/siteData';
import { 
  Building2, 
  Target, 
  Eye, 
  Compass, 
  CheckCircle, 
  ArrowRight,
  HardHat,
  Trees,
  MapPin,
  Layers,
  Briefcase,
  CheckCircle2,
  BarChart3,
  ShieldCheck
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ 
  onNavigate, 
  onOpenQuoteModal 
}) => {
  const [activeStep, setActiveStep] = useState<string>('1');

  const getDomainIcon = (icon: string) => {
    switch (icon) {
      case 'HardHat': return <HardHat className="w-5 h-5 text-[#F5A623]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#0B2C5C]" />;
      case 'Trees': return <Trees className="w-5 h-5 text-[#1F7A3A]" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-[#C8102E]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#0B2C5C]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#F5A623]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-[#1F7A3A]" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-[#0B2C5C]" />;
      default: return <Building2 className="w-5 h-5 text-[#0B2C5C]" />;
    }
  };

  const selectedStepData = VALUE_CHAIN_STEPS.find(s => s.id === activeStep) || VALUE_CHAIN_STEPS[0];

  return (
    <div className="w-full bg-white">
      {/* 1. Parallax Banner */}
      <ParallaxBanner
        title="À Propos du DA-TO GUINEE SA"
        subtitle="Un bâtisseur guinéen engagé pour un développement urbain et territorial durable, rigoureux et porteur de valeur."
        image="/uploaded-images/hero_btp_engineers_1790975106455.jpg"
        badge="IDENTITÉ & ENGAGEMENT INSTITUTIONNEL"
        currentPageLabel="À Propos"
        onNavigateHome={() => onNavigate('accueil')}
      />

      {/* 2. Vision & Mission (2 high-impact cards) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card Vision */}
            <div className="bg-[#0B2C5C] text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-[#F5A623]">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase mb-2 block font-display">
                  Notre Ambition Stratégique
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight mb-4 text-white">
                  Notre Vision
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Devenir l’acteur de référence incontournable en République de Guinée et dans la sous-région ouest-africaine pour l'aménagement foncier sécurisé, la réalisation d'infrastructures de génie civil durables et la promotion immobilière d'excellence.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                <span>Conformité absolue aux règles d'urbanisme guinéennes</span>
              </div>
            </div>

            {/* Card Mission */}
            <div className="bg-[#F5F5F5] text-slate-800 rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col justify-between card-hover">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0B2C5C] flex items-center justify-center mb-6 text-[#F5A623]">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#0B2C5C] tracking-widest uppercase mb-2 block font-display">
                  Notre Raison d'Être
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2C5C] font-display leading-tight mb-4">
                  Notre Mission
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Transformer le potentiel foncier guinéen en cadres de vie ordonnés, sécurisés et viabilisés. Nous apportons des solutions techniques complètes aux particuliers, aux entreprises et à l'État en combinant rigueur juridique, génie civil de pointe et respect strict des plannings.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-3 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-[#1F7A3A]" />
                <span>Garantie de traçabilité et de parfait achèvement des ouvrages</span>
              </div>
            </div>

          </div>
        </ScrollFadeIn>
      </section>

      {/* 3. Frise visuelle : FONCIER → AMÉNAGEMENT → VIABILISATION → CONSTRUCTION → PROMOTION → GESTION → VALORISATION */}
      <section className="py-16 bg-[#071d3d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase mb-2 block font-display">
              Chaîne de Valeur Intégrée
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Notre Cycle Complet de Valorisation
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Une maîtrise de bout en bout : du terrain brut jusqu'à la gestion patrimoniale pérenne. Cliquez sur chaque étape pour en explorer les détails.
            </p>
          </div>

          {/* Interactive Steps Horizontal Strip */}
          <div className="overflow-x-auto pb-4 pt-2">
            <div className="flex items-center min-w-[850px] justify-between gap-2 relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-white/10 -translate-y-1/2 z-0" />

              {VALUE_CHAIN_STEPS.map((step, idx) => {
                const isSelected = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                    aria-label={`Étape ${idx + 1} : ${step.name}`}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-extrabold text-xs transition-all duration-300 ${
                        isSelected 
                          ? 'bg-[#F5A623] text-[#0B2C5C] scale-110 shadow-lg shadow-[#F5A623]/30 ring-4 ring-white/20' 
                          : 'bg-[#0B2C5C] border-2 border-white/20 text-slate-300 group-hover:border-[#F5A623] group-hover:text-white'
                      }`}
                    >
                      0{idx + 1}
                    </div>

                    <span className={`text-[11px] font-bold tracking-wider mt-2 uppercase ${
                      isSelected ? 'text-[#F5A623]' : 'text-slate-300 group-hover:text-white'
                    }`}>
                      {step.name}
                    </span>

                    {/* Arrow indicator if selected */}
                    {isSelected && (
                      <span className="w-2 h-2 rotate-45 bg-[#F5A623] mt-1"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Showcase Card */}
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#F5A623] uppercase tracking-wider block mb-1">
                  Étape 0{selectedStepData.id} de la chaîne de valeur
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Phase {selectedStepData.name}
                </h3>
                <p className="mt-2 text-sm text-slate-200 max-w-3xl leading-relaxed">
                  {selectedStepData.desc}
                </p>
              </div>

              <button
                onClick={() => onOpenQuoteModal()}
                className="btn-accent px-5 py-2.5 rounded-lg text-xs font-bold shrink-0 self-start md:self-center"
              >
                Consulter sur cette phase
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Domaines d'intervention (8 points en grille) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase mb-2 block font-display">
            Champs d'Action
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2C5C] font-display tracking-tight">
            Nos 8 Domaines d'Intervention en Guinée
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Une palette d'ingénierie multidisciplinaire répondant aux enjeux d'aménagement du secteur public et privé.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_INTERVENTION_DOMAINS.map((domain, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                  {getDomainIcon(domain.icon)}
                </div>
                <h3 className="text-base font-bold text-[#0B2C5C] font-display mb-2 leading-snug">
                  {domain.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {domain.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-600 font-semibold uppercase tracking-wider flex items-center justify-between">
                <span>Norme Guinéenne & ISO</span>
                <span>#{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Philosophie d'entreprise */}
      <section className="py-16 bg-[#F5F5F5] border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0B2C5C] text-[#F5A623] mx-auto shadow-md">
            <Compass className="w-6 h-6" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2C5C] font-display">
            Notre Philosophie de Travail
          </h2>
          
          <blockquote className="text-base sm:text-xl text-slate-700 font-normal italic leading-relaxed max-w-3xl mx-auto">
            « Nous croyons fermement que l'essor économique de la Guinée repose sur des fondations solides. Notre engagement est de ne jamais transiger sur la qualité des matériaux, la transparence contractuelle et la sécurité des hommes qui façonnent nos ouvrages. »
          </blockquote>

          <div className="pt-2 text-xs font-bold text-[#0B2C5C] uppercase tracking-wider font-display">
            Direction Générale · DA-TO GUINEE SA Conakry
          </div>
        </div>
      </section>

    </div>
  );
};
