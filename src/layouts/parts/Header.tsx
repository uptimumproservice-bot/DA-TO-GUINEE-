import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
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
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-32 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center h-full py-2 transition-all duration-300 hover:opacity-95">
            <img
              src="/logo.png"
              alt="DA-TO GUINEE SA"
              className="block h-28 sm:h-[116px] w-auto object-contain select-none"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium px-3 py-2 rounded transition-colors whitespace-nowrap relative ${
                  location.pathname === item.href
                    ? 'text-[#F5A623] font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#F5A623]'
                    : 'text-[#0B2C5C] hover:text-[#F5A623]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden xl:inline-flex items-center px-5 py-2.5 rounded text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
            style={{ background: 'hsl(var(--accent))' }}
          >
            Contactez-nous
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-md transition-colors hover:bg-muted"
            aria-label="Ouvrir le menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-border bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium py-3 px-3 rounded transition-colors ${
                  location.pathname === item.href
                    ? 'text-[#F5A623] bg-muted font-semibold border-l-4 border-[#F5A623]'
                    : 'text-[#0B2C5C] hover:text-[#F5A623] hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
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
