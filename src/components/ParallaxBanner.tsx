import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ChevronRight } from 'lucide-react';

interface ParallaxBannerProps {
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  currentPageLabel: string;
  onNavigateHome: () => void;
}

export const ParallaxBanner: React.FC<ParallaxBannerProps> = ({
  title,
  subtitle,
  image,
  badge,
  currentPageLabel,
  onNavigateHome
}) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setOffsetY(0);
      return;
    }

    const handleScroll = () => {
      // 0.3x parallax factor as requested
      setOffsetY(window.scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[320px] sm:h-[400px] overflow-hidden bg-[#0B2C5C] flex items-center">
      {/* Background Image with 0.3x Parallax Translation */}
      <div 
        className="absolute inset-0 w-full h-[140%] -top-[20%] will-change-transform"
        style={{
          transform: `translateY(${offsetY}px)`,
        }}
      >
        <img
          src={image}
          alt={`DA-TO GUINEE SA Guinée - ${title}`}
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B2C5C]/95 via-[#0B2C5C]/80 to-[#0B2C5C]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C5C] via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-4" aria-label="Fil d'Ariane">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#F5A623] transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#F5A623]" />
          <span className="text-white font-medium">{currentPageLabel}</span>
        </nav>

        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F5A623] text-xs font-semibold mb-3">
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display max-w-3xl leading-tight mb-3">
          {title}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Subtle bottom border accent in Guinea corporate colors */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8102E] via-[#F5A623] to-[#1F7A3A]" />
    </section>
  );
};
