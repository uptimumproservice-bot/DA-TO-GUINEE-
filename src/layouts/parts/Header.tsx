import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
}

export default function Header({ darkMode = false, setDarkMode }: HeaderProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/nos-activites', label: 'Nos Activités' },
    { href: '/notre-methode', label: 'Notre Méthode' },
    { href: '/engagements-hse', label: 'Engagements & HSE' },
    { href: '/actualites', label: 'Actualités' },
  ];

  return (
    <header
      data-logo-zone="true"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 header-logo-zone ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#071933]/95 backdrop-blur-md shadow-lg dark:shadow-[0_10px_35px_-8px_rgba(0,0,0,0.5)] border-b border-slate-200/80 dark:border-white/10 py-2 sm:py-3' 
          : 'bg-white/95 dark:bg-[#071933]/95 backdrop-blur-md shadow-xs border-b border-slate-100 dark:border-white/10 py-3 sm:py-4'
      }`}
    >
      {/* Signature dynamic line on bottom of fixed header */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 pointer-events-none ${
          isScrolled 
            ? 'opacity-100 bg-gradient-to-r from-transparent via-[#F5A623] dark:via-amber-400 to-transparent shadow-[0_1px_8px_rgba(245,166,35,0.6)]' 
            : 'opacity-0'
        }`} 
      />

      <div className="container mx-auto px-4 lg:px-8">
        <div className={`flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 ${
          isScrolled ? 'h-[64px] sm:h-[72px]' : 'h-[78px] sm:h-[88px]'
        }`}>
          {/* Logo — crisp and clear in both light and dark mode */}
          <Link 
            to="/" 
            data-logo-zone="true"
            className="flex-shrink-0 flex items-center bg-transparent rounded-lg transition-opacity duration-200 hover:opacity-95"
          >
            <img
              src="/logo.png"
              alt="DA-TO GUINEE SA"
              className={`dark:hidden block w-auto max-w-[160px] sm:max-w-[220px] md:max-w-[260px] object-contain select-none transition-all duration-300 ${
                isScrolled ? 'h-[40px] sm:h-[48px] md:h-[54px]' : 'h-[44px] sm:h-[54px] md:h-[60px]'
              }`}
            />
            <img
              src="/logo-dark.png"
              alt="DA-TO GUINEE SA"
              className={`hidden dark:block w-auto max-w-[160px] sm:max-w-[220px] md:max-w-[260px] object-contain select-none transition-all duration-300 ${
                isScrolled ? 'h-[40px] sm:h-[48px] md:h-[54px]' : 'h-[44px] sm:h-[54px] md:h-[60px]'
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1.5" data-no-anim="true">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap cursor-pointer relative transition-colors duration-200 select-none ${
                    isActive
                      ? 'text-[#F5A623] dark:text-[#F5A623] font-bold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-[#F5A623] after:rounded-full'
                      : 'text-[#0B2C5C] dark:text-white/90 font-medium no-underline hover:text-[#F5A623] dark:hover:text-[#F5A623] dark:hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle & CTA */}
          <div className="hidden xl:flex items-center gap-3" data-no-anim="true">
            {setDarkMode && (
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-[#0C254B] text-[#0B2C5C] dark:text-white hover:bg-slate-200 dark:hover:bg-[#143468] transition-colors duration-200 shadow-sm cursor-pointer border border-transparent dark:border-white/20 select-none"
                aria-label="Basculer le mode sombre"
                title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {darkMode ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} />}
              </button>
            )}

            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 hover:shadow-md flex-shrink-0 bg-[#F5A623] hover:bg-[#e0951a] text-white shadow-sm select-none"
            >
              Contactez-nous
            </Link>
          </div>

          {/* Mobile hamburger & theme */}
          <div className="xl:hidden flex items-center gap-2.5" data-no-anim="true">
            {setDarkMode && (
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-lg transition-colors duration-200 border cursor-pointer select-none touch-manipulation ${
                  darkMode
                    ? 'bg-[#0C254B] text-amber-300 border-white/20 hover:bg-[#143468]'
                    : 'bg-slate-100 text-[#0B2C5C] border-slate-200 hover:bg-slate-200'
                }`}
                aria-label="Basculer le mode sombre"
                title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {darkMode ? <Sun size={20} className="text-amber-300" /> : <Moon size={20} className="text-[#0B2C5C]" />}
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className={`mobile-menu-btn p-2.5 rounded-lg transition-colors duration-200 border cursor-pointer select-none touch-manipulation ${
                darkMode
                  ? 'bg-[#0C254B] text-white border-white/20 hover:bg-[#143468]'
                  : 'bg-slate-100 text-[#0B2C5C] border-slate-200 hover:bg-slate-200 shadow-sm'
              }`}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? (
                <X size={24} className={darkMode ? 'text-white stroke-[2.5]' : 'text-[#0B2C5C] stroke-[2.5]'} />
              ) : (
                <Menu size={24} className={darkMode ? 'text-white stroke-[2.5]' : 'text-[#0B2C5C] stroke-[2.5]'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="xl:hidden border-t border-slate-200/80 dark:border-white/15 bg-white/98 dark:bg-[#071933]/98 backdrop-blur-2xl shadow-2xl max-h-[85vh] overflow-y-auto overscroll-contain"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm py-3 px-3.5 rounded-lg cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? 'text-[#F5A623] bg-[#F5A623]/10 dark:text-amber-300 dark:bg-white/10 font-bold border-l-4 border-[#F5A623]'
                      : 'text-[#0B2C5C] dark:text-white/90 font-medium hover:text-[#F5A623] dark:hover:text-[#F5A623] hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="mt-3 inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-bold text-white bg-[#F5A623] hover:bg-[#e0951a] shadow-md transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contactez-nous
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
