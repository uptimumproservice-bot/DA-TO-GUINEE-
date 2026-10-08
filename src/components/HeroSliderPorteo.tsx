import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, ShieldCheck } from 'lucide-react';
import { home } from 'virtual:content';

interface SlideData {
  id: string;
  tag: string;
  titre: string;
  titreAccent: string;
  description: string;
  image: string;
  link: string;
  statLabel: string;
  statValue: string;
}

const slides: SlideData[] = [
  {
    id: 'btp',
    tag: 'Pôle 01 • BTP & Infrastructures',
    titre: 'Bâtir des infrastructures solides,',
    titreAccent: 'structurer l’avenir de la Guinée.',
    description:
      'Conception et réalisation de routes, ponts, bâtiments résidentiels et complexes administratifs aux normes internationales les plus exigeantes.',
    image: '/src/assets/images/btp_building_construction_1791408048105.jpg',
    link: '/nos-activites#btp',
    statLabel: 'Projets BTP & Voiries',
    statValue: '100% Maîtrisés',
  },
  {
    id: 'foncier',
    tag: 'Pôle 02 • Développement Foncier',
    titre: 'Aménager, sécuriser et',
    titreAccent: 'valoriser le foncier guinéen.',
    description:
      'Opérations d’envergure de lotissement, viabilisation, terrassement et viabilisation des réseaux divers (VRD) pour des territoires durables.',
    image: '/src/assets/images/pole_foncier_survey_1791447799775.jpg',
    link: '/nos-activites#foncier',
    statLabel: 'Sécurisation Foncière',
    statValue: 'Cadastre & Normes',
  },
  {
    id: 'immobilier',
    tag: 'Pôle 03 • Immobilier & Promotion',
    titre: 'Créer de nouveaux cadres de vie,',
    titreAccent: 'modernes et accessibles.',
    description:
      'Programmes immobiliers neufs, promotion durable et valorisation patrimoniale répondant aux besoins croissants des entreprises et familles.',
    image: '/src/assets/images/pole_immobilier_residence_1791447808970.jpg',
    link: '/nos-activites#immobilier',
    statLabel: 'Actifs & Logements',
    statValue: 'Haute Valeur',
  },
];

export const HeroSliderPorteo: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const slideDuration = 6000; // 6s per slide, like Porteo

  // Handle slide auto-rotation and progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const step = (intervalTime / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, current]);

  const handleNext = () => {
    setProgress(0);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setProgress(0);
    setCurrent(index);
  };

  const activeSlide = slides[current];

  return (
    <section className="relative min-h-[90vh] md:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#07172E] text-white">
      {/* ── Slide Background with Ken Burns Pan/Zoom Animation (Porteo style) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.titre}
            className="w-full h-full object-cover object-center filter brightness-[0.78]"
          />
          {/* Multi-layered cinematic gradient inspired by Porteo Group */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07172E]/95 via-[#0B2C5C]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07172E] via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* ── Top Dynamic Progress Bar (Porteo Style) ── */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/15">
        <div
          className="h-full bg-[#F5A623] transition-all duration-75 ease-linear shadow-[0_0_12px_#F5A623]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-20 container mx-auto px-4 lg:px-10 py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Official Logo Banner & Status Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            {/* Cloned Official Logo */}
            <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/40 shadow-xl inline-flex items-center">
              <img
                src="/logo.png"
                alt="DA-TO GUINEE SA"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>{activeSlide.tag}</span>
            </div>
          </motion.div>

          {/* Animated Headline with Dynamic Accent (Porteo Style) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight font-display">
                <span>{activeSlide.titre}</span>
                <br />
                <span className="text-[#F5A623] drop-shadow-md">
                  {activeSlide.titreAccent}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl leading-relaxed">
                {activeSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-8"
          >
            <Link
              to={activeSlide.link}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-lg bg-[#F5A623] hover:bg-[#e09415] text-[#07172E] font-bold text-sm sm:text-base shadow-xl transition-all duration-300 hover:shadow-[0_10px_25px_rgba(245,166,35,0.4)] hover:-translate-y-0.5"
            >
              <span>Découvrir ce Pôle</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Parler d'un projet</span>
            </Link>

            {/* Quick Stat Pill */}
            <div className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-white/20 py-1">
              <div>
                <div className="text-xs text-slate-300 uppercase tracking-wider">
                  {activeSlide.statLabel}
                </div>
                <div className="text-sm font-bold text-[#F5A623]">
                  {activeSlide.statValue}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Slide Numbers & Controls Widget (Porteo Style) ── */}
      <div className="absolute right-6 sm:right-12 bottom-24 md:bottom-28 z-20 hidden md:flex items-center gap-4 bg-[#07172E]/70 backdrop-blur-md p-2.5 rounded-xl border border-white/15 shadow-2xl">
        <div className="flex items-center gap-1.5 px-3">
          <span className="text-2xl font-black text-[#F5A623] font-display">
            0{current + 1}
          </span>
          <span className="text-sm text-white/40 font-mono">/ 0{slides.length}</span>
        </div>

        <div className="h-6 w-px bg-white/20" />

        <button
          onClick={handlePrev}
          aria-label="Slide précédente"
          className="p-2 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Mettre en pause' : 'Lecture'}
          className="p-2 rounded-lg hover:bg-white/15 text-[#F5A623] transition-all duration-200"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={handleNext}
          aria-label="Slide suivante"
          className="p-2 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Bottom Interactive Tab Bar (Porteo Style) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#07172E] via-[#07172E]/80 to-transparent pt-6 pb-4">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/15 pt-3">
            {slides.map((s, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`text-left group py-2 px-2.5 sm:px-4 rounded-lg transition-all duration-300 relative ${
                    isActive
                      ? 'bg-white/10 border-b-2 border-[#F5A623]'
                      : 'hover:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? 'text-[#F5A623]' : 'text-slate-400'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold truncate text-white">
                      {s.tag.replace(/^Pôle \d+ • /, '')}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute -top-[13px] left-0 right-0 h-0.5 bg-[#F5A623]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
