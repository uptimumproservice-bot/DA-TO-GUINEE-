import React, { useEffect, useRef } from 'react';
import { PageId } from '../types';
import { HeroCarousel } from '../components/HeroCarousel';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ACTIVITY_POLES, WHY_CHOOSE_US, GUINEA_CONTRIBUTION_STATS } from '../data/siteData';
import { 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  CheckCircle,
  Building2,
  HardHat,
  Compass,
  FileCheck2
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: (pole?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenQuoteModal 
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Setup intersection observer for stagger fade-in effect on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = containerRef.current?.querySelectorAll('.reveal-init');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getWhyChooseUsIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-8 h-8 text-[#F5A623]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-[#1F7A3A]" />;
      case 'Target': return <Target className="w-8 h-8 text-[#C8102E]" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-[#0B2C5C]" />;
      default: return <Award className="w-8 h-8 text-[#F5A623]" />;
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      
      {/* 1. Hero Carousel */}
      <HeroCarousel 
        onDiscoverClick={() => {
          onNavigate('activites');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuoteModal={() => onOpenQuoteModal()}
      />

      {/* 2. Section "Nos 3 pôles d'activité" : Grille bento à 3 colonnes */}
      <section className="py-20 bg-white" aria-labelledby="poles-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 reveal-init">
            <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase mb-2 block font-display">
              Architecture & Ingénierie Intégrée
            </span>
            <h2 id="poles-heading" className="text-2xl sm:text-4xl font-extrabold text-[#0B2C5C] font-display tracking-tight text-balance">
              Nos 3 Pôles d'Activité Majeurs
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
              Une chaîne de valeur complète et synergique pour concevoir, structurer et concrétiser les projets immobiliers et d'infrastructures les plus exigeants en Guinée.
            </p>
          </div>

          {/* Bento Grid 3 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ACTIVITY_POLES.map((pole, index) => (
              <div
                key={pole.id}
                className="group reveal-init bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm card-hover flex flex-col"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Image Container with high contrast badge */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={pole.image}
                    alt={`Pôle ${pole.title} - DA-TO GUINEE SA Guinée`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  {/* Subtle badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded bg-[#0B2C5C]/90 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
                      Pôle 0{index + 1}
                    </span>
                  </div>

                  {/* Title overlay at the bottom of image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white font-display leading-tight drop-shadow">
                      {pole.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#F5A623] mb-2">
                      {pole.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pole.description}
                    </p>
                  </div>

                  {/* 3 bullet highlights */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {pole.services.slice(0, 3).map((serv, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1F7A3A] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{serv}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onNavigate('activites');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-[#0B2C5C] group-hover:text-[#F5A623] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Découvrir les expertises</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => onOpenQuoteModal(pole.title)}
                      className="px-3 py-1.5 rounded bg-slate-100 hover:bg-[#F5A623] hover:text-[#0B2C5C] text-slate-700 text-xs font-semibold transition-all"
                    >
                      Devis
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Section "Pourquoi nous choisir" : Grille bento à 4 blocs */}
      <section className="py-20 bg-[#F5F5F5] border-y border-slate-200/80" aria-labelledby="why-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 reveal-init">
            <span className="text-xs font-bold text-[#0B2C5C] tracking-widest uppercase mb-2 block font-display">
              Garantie d'Excellence & Méthode
            </span>
            <h2 id="why-heading" className="text-2xl sm:text-4xl font-extrabold text-[#0B2C5C] font-display tracking-tight text-balance">
              Pourquoi choisir le DA-TO GUINEE SA ?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
              Quatre engagements fondamentaux qui structurent chacune de nos interventions techniques, de la conception architecturale à la remise des clés.
            </p>
          </div>

          {/* Bento Grid 4 blocs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm card-hover reveal-init flex flex-col justify-between"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 hover:rotate-6 hover:scale-110">
                    {getWhyChooseUsIcon(item.iconName)}
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F5A623] font-display">
                      {item.keyword}
                    </span>
                    <h3 className="text-lg font-bold text-[#0B2C5C] font-display mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                  <span>Norme DA-TO GUINEE SA Standard</span>
                  <span className="font-bold text-[#0B2C5C]">0{index + 1}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Section "Notre contribution au développement de la Guinée" : texte court + 4 compteurs animés */}
      <section className="py-20 bg-[#0B2C5C] text-white relative overflow-hidden" aria-labelledby="guinea-stats-heading">
        
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-7 reveal-init">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-[#F5A623] text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#1F7A3A]"></span>
                <span>Impact National & Ancrage Local</span>
              </div>
              <h2 id="guinea-stats-heading" className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight text-balance">
                Notre contribution au développement de la République de Guinée
              </h2>
            </div>
            
            <div className="lg:col-span-5 reveal-init text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Le DA-TO GUINEE SA s'investit chaque jour aux côtés de l'État, des institutions et des investisseurs pour bâtir des infrastructures pérennes, assainir le foncier et former la jeunesse guinéenne aux métiers d'avenir du BTP.
              </p>
            </div>
          </div>

          {/* 4 Animated Counters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUINEA_CONTRIBUTION_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#F5A623]/50 transition-all reveal-init flex flex-col justify-between"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5A623] tracking-tight mb-2">
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix} 
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display leading-snug">
                    {stat.label}
                  </h3>
                </div>
                <p className="mt-3 text-xs text-slate-400 border-t border-white/10 pt-3">
                  {stat.subtext}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Pre-footer Interactive CTA Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0B2C5C] to-[#123d7d] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="max-w-2xl">
              <span className="text-[#F5A623] font-bold text-xs uppercase tracking-wider font-display block mb-2">
                Partenariat & Réalisation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-white mb-3">
                Vous avez un projet de construction ou de viabilisation foncière ?
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Contactez notre bureau d'études basé à Conakry pour une visite de site ou un chiffrage prévisionnel rigoureux.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onOpenQuoteModal()}
                className="btn-accent w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <span>Demander un devis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-center"
              >
                Nous contacter
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
