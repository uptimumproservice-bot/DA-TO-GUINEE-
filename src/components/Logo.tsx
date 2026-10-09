import React from 'react';
import { useLogo } from '../context/LogoContext';

interface LogoProps {
  variant?: 'header' | 'hero' | 'footer' | 'standalone';
  className?: string;
  showSlogan?: boolean;
}

/**
 * Renders the exact official corporate emblem of DA-TO GUINEE SA
 * from the original uploaded file (PNG 1774x887).
 */
export const Logo: React.FC<LogoProps> = ({ 
  variant = 'header', 
  className = '' 
}) => {
  const { customLogoUrl } = useLogo();
  const logoSrc = customLogoUrl || '/logo.png';

  // Hero variant: Displayed prominently on white card in the hero carousel
  if (variant === 'hero') {
    return (
      <div 
        data-logo-zone="true"
        className={`bg-white dark:!bg-black p-4 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-2xl inline-block backdrop-blur-md transition-all duration-300 hover:shadow-3xl ${className}`}
        role="img"
        aria-label="Logo officiel DA-TO GUINEE SA"
      >
        <img 
          src={logoSrc} 
          alt="DA-TO GUINEE SA — Construire durablement. Créer de la valeur." 
          className="dark:hidden h-28 sm:h-36 md:h-40 max-w-[90vw] w-auto object-contain select-none"
        />
        <img 
          src="/logo-dark.png" 
          alt="DA-TO GUINEE SA — Construire durablement. Créer de la valeur." 
          className="hidden dark:block h-28 sm:h-36 md:h-40 max-w-[90vw] w-auto object-contain select-none bg-black"
          style={{ backgroundColor: '#000000' }}
        />
      </div>
    );
  }

  // Footer variant
  if (variant === 'footer') {
    return (
      <div 
        data-logo-zone="true"
        className={`bg-white dark:!bg-black p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-md inline-block transition-all hover:scale-[1.01] ${className}`}
        role="img"
        aria-label="Logo officiel DA-TO GUINEE SA"
      >
        <img 
          src={logoSrc} 
          alt="DA-TO GUINEE SA" 
          className="dark:hidden h-16 sm:h-24 w-auto object-contain select-none"
        />
        <img 
          src="/logo-dark.png" 
          alt="DA-TO GUINEE SA" 
          className="hidden dark:block h-16 sm:h-24 w-auto object-contain select-none bg-black"
          style={{ backgroundColor: '#000000' }}
        />
      </div>
    );
  }

  // Header default variant: Clean, crisp, perfectly fitted for navbar, full header height, seamless transparent background
  return (
    <div 
      data-logo-zone="true"
      className={`flex items-center bg-transparent dark:!bg-black rounded-lg transition-all duration-300 hover:opacity-95 ${className}`}
      role="img"
      aria-label="Logo officiel DA-TO GUINEE SA"
    >
      <img 
        src={logoSrc} 
        alt="DA-TO GUINEE SA" 
        className="dark:hidden h-[51px] sm:h-[61px] md:h-[68px] w-auto max-w-[176px] sm:max-w-[234px] md:max-w-[287px] object-contain select-none"
      />
      <img 
        src="/logo-dark.png" 
        alt="DA-TO GUINEE SA" 
        className="hidden dark:block h-[51px] sm:h-[61px] md:h-[68px] w-auto max-w-[176px] sm:max-w-[234px] md:max-w-[287px] object-contain select-none bg-black"
        style={{ backgroundColor: '#000000' }}
      />
    </div>
  );
};
