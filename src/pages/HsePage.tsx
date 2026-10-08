import React from 'react';
import { PageId } from '../types';
import { ParallaxBanner } from '../components/ParallaxBanner';
import { HSE_COMMITMENTS } from '../data/siteData';
import { 
  ShieldAlert, 
  Leaf, 
  Users, 
  FileCheck, 
  Boxes, 
  HeartHandshake, 
  SunMedium, 
  HardHat, 
  Cpu, 
  CheckCircle2, 
  Activity, 
  Camera, 
  Radio, 
  Award,
  ArrowRight
} from 'lucide-react';

interface HsePageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const HsePage: React.FC<HsePageProps> = ({ 
  onNavigate, 
  onOpenQuoteModal 
}) => {
  const getHseIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-[#C8102E]" />;
      case 'Leaf': return <Leaf className="w-6 h-6 text-[#1F7A3A]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#0B2C5C]" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-[#F5A623]" />;
      case 'Boxes': return <Boxes className="w-6 h-6 text-[#0B2C5C]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-[#1F7A3A]" />;
      case 'SunMedium': return <SunMedium className="w-6 h-6 text-[#F5A623]" />;
      default: return <HardHat className="w-6 h-6 text-[#F5A623]" />;
    }
  };

  return (
    <div className="w-full bg-white">
      {/* 1. Parallax Banner with Safety Team */}
      <ParallaxBanner
        title="Engagements & Politique HSE"
        subtitle="Hygiène, Sécurité, Environnement et RSE : la protection de la vie humaine et la préservation de la nature au cœur de chacun de nos chantiers."
        image="/src/assets/images/professional_site_inspector_ppe_1791409620212.jpg"
        badge="SÉCURITÉ INDUSTRIELLE & RESPONSABILITÉ SOCIÉTALE"
        currentPageLabel="Engagements & HSE"
        onNavigateHome={() => onNavigate('accueil')}
      />

      {/* 2. Intro overview with Key Stats */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7">
            <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase mb-2 block font-display">
              Charte Éthique & Sécurité
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2C5C] font-display tracking-tight leading-tight">
              Une culture de la prévention proactive et de la responsabilité
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Pour le DA-TO GUINEE SA, l'ambition économique est indissociable de la rigueur humaine. En République de Guinée, nous appliquons les standards internationaux de sécurité pour offrir à nos ouvriers, ingénieurs et sous-traitants un cadre de travail protecteur et stimulant.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#0B2C5C] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-900">
            <h3 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#F5A623]" />
              Indicateurs de Performance HSE
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs text-slate-300">Taux de fréquence accidents</span>
                <span className="font-extrabold text-[#F5A623] font-mono">0.00 (Zéro)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs text-slate-300">Port des EPI certifiés</span>
                <span className="font-extrabold text-[#F5A623] font-mono">100% Obligatoire</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs text-slate-300">Causeries sécurité (1/4h hebdo)</span>
                <span className="font-extrabold text-[#F5A623] font-mono">Hebdomadaire</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Recyclage des déblais de terrassement</span>
                <span className="font-extrabold text-[#F5A623] font-mono">&gt; 85% Valorisé</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. 7 Engagements en Grille Bento */}
      <section className="py-16 bg-[#F5F5F5] border-y border-slate-200" aria-labelledby="bento-hse-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#0B2C5C] tracking-widest uppercase mb-1 block font-display">
              7 Piliers Fondateurs
            </span>
            <h2 id="bento-hse-heading" className="text-2xl sm:text-4xl font-extrabold text-[#0B2C5C] font-display">
              Nos 7 Engagements Majeurs
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Des principes inaltérables intégrés à l'ensemble de nos processus d'études et de chantiers.
            </p>
          </div>

          {/* Bento grid layout: First card spans 2 cols, others distributed */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HSE_COMMITMENTS.map((com, index) => {
              const isMarquee = index === 0; // First commitment has special emphasis
              return (
                <div
                  key={com.id}
                  className={`bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm card-hover flex flex-col justify-between ${
                    isMarquee ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white to-amber-50/20 border-[#F5A623]/40' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        {getHseIcon(com.iconName)}
                      </div>
                      {com.badge && (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#0B2C5C]/5 text-[#0B2C5C] border border-[#0B2C5C]/10 font-display">
                          {com.badge}
                        </span>
                      )}
                    </div>

                    <h3 className={`font-bold font-display text-[#0B2C5C] mb-2 ${
                      isMarquee ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                    }`}>
                      {com.title}
                    </h3>

                    <p className={`text-slate-600 leading-relaxed ${
                      isMarquee ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                    }`}>
                      {com.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span>Engagement DA-TO</span>
                    <span className="font-bold text-[#0B2C5C]">0{index + 1}/07</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Section Qualité, Sécurité & Protocoles HSE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1F7A3A]/10 text-[#1F7A3A] text-xs font-bold uppercase tracking-wider mb-3">
              <Activity className="w-4 h-4" />
              <span>Système de Management QHSE</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2C5C] font-display leading-tight mb-4">
              Protocoles de Sécurité & Gestion Environnementale
            </h2>
            
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Nos chantiers sont audités de manière inopinée par notre responsable QHSE dédié. Chaque ouvrier et encadrant dispose d'un droit d'alerte et de retrait en cas de danger grave et imminent.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1F7A3A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Plan d'Assurance Qualité (PAQ) & PPSPS</h4>
                  <p className="text-xs text-slate-600">Document contractuel remis avant tout premier coup de pioche détaillant les filières de secours et les évacuations d'urgence.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1F7A3A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Gestion des Eaux & Sédiments</h4>
                  <p className="text-xs text-slate-600">Dispositifs anti-ravinement et décanteurs pour éviter la pollution des nappes phréatiques côtières et des cours d'eau.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1F7A3A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Équipements Ergonomiques Tropicalisés</h4>
                  <p className="text-xs text-slate-600">Gilets haute visibilité micro-aérés, casques ventilés et chaussures de sécurité répondant aux chaleurs humides de Conakry.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0B2C5C] rounded-3xl p-8 text-white space-y-6">
            <h3 className="text-xl font-bold font-display text-white border-b border-blue-900 pb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#F5A623]" />
              Formation Continue des Équipes Guinéennes
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Le DA-TO GUINEE SA investit plus de 5% de sa masse salariale dans le renforcement continu des compétences des travailleurs guinéens :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <span className="text-[#F5A623] font-bold text-lg block mb-1">CACES & Engins</span>
                <p className="text-xs text-slate-300">Conduite sécurisée de pelles, chargeuses et niveleuses en terrain difficile.</p>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <span className="text-[#F5A623] font-bold text-lg block mb-1">Sauvetage Secourisme</span>
                <p className="text-xs text-slate-300">Certification SST (Sauveteur Secouriste du Travail) pour les chefs d'équipes.</p>
              </div>
            </div>

            <button
              onClick={() => onOpenQuoteModal()}
              className="btn-accent w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Consulter notre cahier des charges HSE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. Section Technologie & Ingénierie Moderne */}
      <section className="py-16 bg-[#07172E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase mb-1 block font-display">
              Innovation & Numérique
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Technologie & Outils de Pointe
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              L'ingénierie moderne au service de la précision géométrique et de la pérennité structurelle en Guinée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#F5A623]/50 transition-all">
              <Camera className="w-8 h-8 text-[#F5A623] mb-4" />
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Drones de Topographie RTK
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cartographie aérienne de grande précision, modélisation de MNT (Modèle Numérique de Terrain) et calculs volumétriques de déblais/remblais au centimètre près.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#F5A623]/50 transition-all">
              <Cpu className="w-8 h-8 text-[#F5A623] mb-4" />
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Modélisation BIM 3D & Synthèse
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Détection anticipée des interférences entre fluides, structures et réseaux techniques avant le démarrage du coulage béton pour éliminer les retards.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#F5A623]/50 transition-all">
              <Radio className="w-8 h-8 text-[#F5A623] mb-4" />
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Stations Totales & GNSS Géodésique
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Implantation géoréférencée conforme au système de projection national guinéen, garantissant l'inattaquabilité des limites parcellaires et de voirie.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
