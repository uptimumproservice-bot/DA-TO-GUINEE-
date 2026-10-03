import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES } from '../data/siteData';
import { LogoPlaceholder } from './LogoPlaceholder';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface HeroCarouselProps {
  onDiscoverClick: () => void;
  onOpenQuoteModal: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  onDiscoverClick,
  onOpenQuoteModal 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION_MS = 6000;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, DURATION_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  return (
    <section 
      className="relative w-full h-[90vh] min-h-[620px] max-h-[920px] bg-[#07172E] overflow-hidden select-none"
      aria-label="Carrousel d'accueil des expertises du DA-TO GUINEE SA"
    >
      {/* Slides with crossfade transition */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image with contrast scrim */}
            <img
              key={isActive ? `img-${currentIndex}` : `img-inactive-${idx}`}
              src={slide.image}
              alt={`Professionnels africains DA-TO GUINEE SA en Guinée - ${slide.category}`}
              className={`w-full h-full object-cover object-center ${
                isActive ? 'animate-[kenBurnsZoom_6s_ease-out_forwards]' : 'scale-100'
              }`}
              style={{
                animationDuration: `${DURATION_MS}ms`,
                animationPlayState: isPlaying ? 'running' : 'paused',
              }}
              referrerPolicy="no-referrer"
            />
            
            {/* Cinematic Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B2C5C]/90 via-[#0B2C5C]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C5C] via-transparent to-black/40" />
          </div>
        );
      })}

      {/* Hero Content Overlay: Logo Centered + Slogan + CTAs */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        
        {/* Centered Logo in White Box */}
        <div className="mb-6 transform transition-all duration-700 animate-in fade-in zoom-in-95">
          <LogoPlaceholder variant="hero" />
        </div>

        {/* Category tag, Slogan & Buttons with 0.5s delayed fade + vertical translation after image */}
        <div 
          key={`hero-text-${currentIndex}`}
          className="flex flex-col items-center"
          style={{ animation: 'heroTextFadeUp 0.7s ease-out 0.5s backwards' }}
        >
          {/* Category tag */}
          <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse"></span>
            <span>{HERO_SLIDES[currentIndex].category}</span>
          </div>

          {/* Slogan & Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-display max-w-4xl leading-tight mb-4 drop-shadow-md text-balance">
            Construire durablement. <br className="hidden sm:inline" />
            <span className="text-[#F5A623]">Créer de la valeur.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl font-light mb-8 drop-shadow leading-relaxed text-balance">
            {HERO_SLIDES[currentIndex].subtitle}
          </p>

          {/* Buttons: Primary "Découvrir nos activités" & Quote CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onDiscoverClick}
              className="btn-accent px-8 py-3.5 rounded-lg text-sm sm:text-base font-bold shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Découvrir nos activités</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              Demander une étude projet
            </button>
          </div>
        </div>

      </div>

      {/* Carousel Controls: Arrows (Left/Right) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-[#0B2C5C] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] hidden sm:flex"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-[#0B2C5C] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] hidden sm:flex"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Progress Bars & Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 max-w-xl mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/15 flex items-center justify-between gap-4">
          
          {/* Pause / Play button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label={isPlaying ? 'Mettre en pause le carrousel' : 'Reprendre le carrousel'}
            title={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#F5A623]" /> : <Play className="w-3.5 h-3.5 text-white" />}
          </button>

          {/* 3 Progress Bars */}
          <div className="flex-1 flex items-center gap-3">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className="flex-1 h-2 rounded-full overflow-hidden bg-white/25 relative group cursor-pointer focus:outline-none"
                  aria-label={`Aller au slide ${index + 1} : ${slide.category}`}
                >
                  {isActive && (
                    <div 
                      key={`progress-${currentIndex}-${isPlaying}`}
                      className="absolute inset-0 bg-[#F5A623] rounded-full"
                      style={{
                        animation: isPlaying ? `heroProgress ${DURATION_MS}ms linear forwards` : 'none',
                        width: isPlaying ? undefined : '100%'
                      }}
                    />
                  )}
                  {!isActive && (
                    <div className="absolute inset-0 bg-transparent group-hover:bg-white/40 transition-colors" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Slide index count */}
          <div className="text-[11px] font-mono tabular-nums text-slate-300 shrink-0 font-medium">
            0{currentIndex + 1} / 0{HERO_SLIDES.length}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes heroTextFadeUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes kenBurnsZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
};
