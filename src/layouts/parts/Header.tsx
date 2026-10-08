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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#070e1c]/95 backdrop-blur-xl shadow-[0_10px_35px_-8px_rgba(11,44,92,0.18)] dark:shadow-[0_14px_40px_-10px_rgba(0,0,0,0.85)] border-b border-slate-200/80 dark:border-white/10' 
          : 'bg-white/98 dark:bg-[#070e1c]/98 backdrop-blur-md shadow-xs border-b border-slate-100 dark:border-white/5'
      }`}
    >
      {/* Signature dynamic gold accent glow line on bottom of fixed header */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 pointer-events-none ${
          isScrolled 
            ? 'opacity-100 bg-gradient-to-r from-transparent via-[#F5A623] to-transparent shadow-[0_1px_8px_rgba(245,166,35,0.6)]' 
            : 'opacity-0'
        }`} 
      />

      <div className="container mx-auto px-4 lg:px-8">
        <div className={`flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 ${
          isScrolled ? 'h-[64px] sm:h-[72px]' : 'h-[78px] sm:h-[88px]'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center transition-transform duration-300 hover:scale-[1.02]">
            <img
              src={darkMode ? "/logo-dark.png" : "/logo.png"}
              alt="DA-TO GUINEE SA"
              className={`block w-auto max-w-[160px] sm:max-w-[220px] md:max-w-[260px] object-contain select-none transition-all duration-300 ${
                isScrolled ? 'h-[40px] sm:h-[48px] md:h-[54px]' : 'h-[44px] sm:h-[54px] md:h-[60px]'
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm px-3 py-2 rounded whitespace-nowrap cursor-pointer relative transition-colors duration-300 ${
                    isActive
                      ? 'text-[#F5A623] font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[3px] after:bg-[#F5A623] after:rounded-full'
                      : 'text-[#0B2C5C] dark:text-slate-200 font-medium no-underline bg-transparent hover:text-[#F5A623] dark:hover:text-[#F5A623]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle & CTA */}
          <div className="hidden xl:flex items-center gap-3">
            {setDarkMode && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-[#0B2C5C] dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer border border-transparent dark:border-white/10"
                aria-label="Basculer le mode sombre"
                title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {darkMode ? <Sun size={18} className="text-[#F5A623]" /> : <Moon size={18} />}
              </button>
            )}

            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 rounded text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
              style={{ background: 'hsl(var(--accent))' }}
            >
              Contactez-nous
            </Link>
          </div>

          {/* Mobile hamburger & theme */}
          <div className="xl:hidden flex items-center gap-2.5">
            {setDarkMode && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-lg transition-colors border cursor-pointer ${
                  darkMode
                    ? 'bg-[#122444] text-[#F5A623] border-[#F5A623]/40 hover:bg-[#1a3360]'
                    : 'bg-slate-100 text-[#0B2C5C] border-slate-200 hover:bg-slate-200'
                }`}
                aria-label="Basculer le mode sombre"
                title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {darkMode ? <Sun size={20} className="text-[#F5A623]" /> : <Moon size={20} className="text-[#0B2C5C]" />}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`mobile-menu-btn p-2.5 rounded-lg transition-all duration-200 border cursor-pointer ${
                darkMode
                  ? 'bg-[#122444] text-[#F5A623] border-[#F5A623]/50 hover:bg-[#1a3360] shadow-[0_0_12px_rgba(245,166,35,0.25)]'
                  : 'bg-slate-100 text-[#0B2C5C] border-slate-200 hover:bg-slate-200 shadow-sm'
              }`}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? (
                <X size={24} className={darkMode ? 'text-[#F5A623] stroke-[2.5]' : 'text-[#0B2C5C] stroke-[2.5]'} />
              ) : (
                <Menu size={24} className={darkMode ? 'text-[#F5A623] stroke-[2.5]' : 'text-[#0B2C5C] stroke-[2.5]'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-border dark:border-white/10 bg-white/98 dark:bg-[#0d1b33]/98 backdrop-blur-2xl shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm py-3 px-3.5 rounded cursor-pointer transition-colors duration-300 ${
                    isActive
                      ? 'text-[#F5A623] bg-[#F5A623]/10 font-semibold border-l-4 border-[#F5A623]'
                      : 'text-[#0B2C5C] dark:text-slate-200 font-medium no-underline bg-transparent hover:text-[#F5A623] hover:bg-[#F5A623]/5 dark:hover:bg-white/5'
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
              className="mt-3 inline-flex items-center justify-center px-5 py-3 rounded text-sm font-semibold text-white transition-all duration-200"
              style={{ background: 'hsl(var(--accent))' }}
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
