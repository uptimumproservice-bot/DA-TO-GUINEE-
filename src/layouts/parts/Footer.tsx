import React from 'react';
import { Link } from 'react-router';
import { MapPin, Phone, Mail, Facebook, Linkedin, Youtube } from 'lucide-react';

// Official TikTok SVG Icon
function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.9-4.52V8.41a8.28 8.28 0 0 0 4.87 1.57V6.69h-.18z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const liensRapides = [
    { href: '/', label: 'Accueil' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/nos-activites', label: 'Nos Activités' },
    { href: '/notre-methode', label: 'Notre Méthode' },
    { href: '/engagements-hse', label: 'Engagements & HSE' },
    { href: '/actualites', label: 'Actualités' },
    { href: '/contact', label: 'Contact' },
  ];

  const activites = [
    { href: '/nos-activites#btp', label: 'BTP & Infrastructures' },
    { href: '/nos-activites#foncier', label: 'Développement Foncier' },
    { href: '/nos-activites#immobilier', label: 'Immobilier & Valorisation' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      icon: Facebook,
      label: 'Suivez DA-TO GUINEE SA sur Facebook',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: Linkedin,
      label: 'Suivez DA-TO GUINEE SA sur LinkedIn',
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com',
      icon: TikTokIcon,
      label: 'Suivez DA-TO GUINEE SA sur TikTok',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      icon: Youtube,
      label: 'Chaîne YouTube de DA-TO GUINEE SA',
    },
  ];

  return (
    <footer className="relative">
      {/* Animated continuous glow border at top of footer */}
      <div className="w-full h-[2px] glow-line-animated" />

      {/* Logo band — white in light, pure black in dark for seamless blend with logo */}
      <div 
        data-logo-zone="true"
        className="bg-white dark:!bg-black border-b border-border dark:border-white/10 py-8 transition-colors duration-200"
      >
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <Link 
            to="/" 
            data-logo-zone="true"
            className="inline-block bg-transparent dark:!bg-black rounded-lg"
          >
            <img
              src="/logo.png"
              alt="DA-TO GUINEE SA"
              className="dark:hidden block h-20 sm:h-28 w-auto max-w-[340px] object-contain select-none"
            />
            <img
              src="/logo-dark.png"
              alt="DA-TO GUINEE SA"
              className="hidden dark:block h-20 sm:h-28 w-auto max-w-[340px] object-contain select-none bg-black"
              style={{ backgroundColor: '#000000' }}
            />
          </Link>
          <p className="text-sm font-medium text-muted-foreground dark:text-blue-100 italic text-center sm:text-right">
            "Construire durablement. Créer de la valeur."
          </p>
        </div>
      </div>

      {/* Main footer — deep corporate blue */}
      <div className="bg-[#0B2C5C] dark:bg-[#071933] text-white transition-colors duration-200">
        <div className="container mx-auto px-4 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Liens rapides */}
            <div>
              <h3
                className="text-sm font-semibold uppercase tracking-widest mb-5"
                style={{ color: 'hsl(var(--accent))' }}
              >
                Liens rapides
              </h3>
              <ul className="space-y-2">
                {liensRapides.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-white/75 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nos Activités */}
            <div>
              <h3
                className="text-sm font-semibold uppercase tracking-widest mb-5"
                style={{ color: 'hsl(var(--accent))' }}
              >
                Nos Activités
              </h3>
              <ul className="space-y-2">
                {activites.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-white/75 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordonnées & Réseaux Sociaux */}
            <div>
              <h3
                className="text-sm font-semibold uppercase tracking-widest mb-5"
                style={{ color: 'hsl(var(--accent))' }}
              >
                Coordonnées
              </h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 flex-shrink-0 w-4 h-4"
                    style={{ color: 'hsl(var(--accent))' }}
                  />
                  <span className="text-sm text-white/75">
                    Conakry, Lambanyi, Carrefour TMI
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone
                    className="flex-shrink-0 w-4 h-4"
                    style={{ color: 'hsl(var(--accent))' }}
                  />
                  <a
                    href="tel:+224628883030"
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    +224 628 88 30 30
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail
                    className="flex-shrink-0 w-4 h-4"
                    style={{ color: 'hsl(var(--accent))' }}
                  />
                  <a
                    href="mailto:contact@datoguinee.com"
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    contact@datoguinee.com
                  </a>
                </li>
              </ul>

              {/* Réseaux Sociaux officiels */}
              <div className="pt-5 border-t border-white/10">
                <h4
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: 'hsl(var(--accent))' }}
                >
                  Suivez-nous
                </h4>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        title={social.label}
                        className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F5A623] hover:text-[#0B2C5C] dark:hover:bg-[#0E3E7E] dark:hover:text-white dark:hover:border-white/40 text-white flex items-center justify-center transition-colors duration-200 border border-white/15 hover:border-[#F5A623] shadow-sm cursor-pointer select-none"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50 text-center md:text-left">
              © 2026 DA-TO GUINEE SA. Tous droits réservés.
            </p>

            <div className="flex gap-5 text-center">
              <Link
                to="/mentions-legales"
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                to="/politique-confidentialite"
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
