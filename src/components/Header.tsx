import React, { useState, useEffect } from 'react';
import { PageId, NavItem } from '../types';
import { LogoPlaceholder } from './LogoPlaceholder';
import { Menu, X, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'activites', label: 'Nos Activités' },
  { id: 'methode', label: 'Notre Méthode' },
  { id: 'hse', label: 'Engagements & HSE' },
  { id: 'actualites', label: 'Actualités' },
];

export const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenQuoteModal 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#071d3d] text-slate-300 text-xs py-1.5 px-4 hidden lg:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#1F7A3A] inline-block animate-pulse"></span>
              Conakry, République de Guinée · Bureau d'études & Travaux
            </span>
            <span className="text-slate-400">|</span>
            <a 
              href="tel:+224628883030" 
              className="hover:text-[#F5A623] transition-colors flex items-center gap-1 text-slate-300"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
              +224 628 88 30 30
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
              Certification & Sécurité HSE 100%
            </span>
            <span className="text-slate-500">·</span>
            <a href="mailto:contact@datoguinee.com" className="hover:text-[#F5A623] transition-colors">
              contact@datoguinee.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 bg-[#0B2C5C] text-white border-b border-blue-900/60 h-[78px] sm:h-[92px] flex items-center ${
          isScrolled ? 'shadow-xl' : ''
        }`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Zone (Left) */}
          <button 
            onClick={() => handleNavClick('accueil')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] rounded-md transition-opacity hover:opacity-95 flex-shrink-0 -ml-2 sm:ml-0"
            title="Retour à l'accueil DA-TO GUINEE SA"
          >
            <LogoPlaceholder variant="header" />
          </button>

          {/* Desktop Navigation Links (Center) */}
          <nav 
            className="hidden xl:flex items-center gap-1 lg:gap-2 text-sm font-medium"
            aria-label="Navigation principale"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] ${
                    isActive
                      ? 'text-[#F5A623] font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-3 right-3 h-[3px] bg-[#F5A623] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Mobile Hamburger (Right) */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="hidden sm:flex btn-accent px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Demander un devis</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline-block" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#071f42] border-t border-blue-900/80 px-4 pt-3 pb-6 animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl">
            <nav className="flex flex-col space-y-1.5" aria-label="Navigation mobile">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#F5A623]/15 text-[#F5A623] font-semibold border-l-4 border-[#F5A623]'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>}
                  </button>
                );
              })}
              
              <div className="pt-3 border-t border-blue-900/50 mt-2 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full btn-accent py-2.5 px-4 rounded-lg text-sm font-bold text-center block shadow-md"
                >
                  Demander un devis gratuit
                </button>
                <div className="text-center text-xs text-slate-400 pt-1">
                  Urgence chantier : +224 628 88 30 30
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
