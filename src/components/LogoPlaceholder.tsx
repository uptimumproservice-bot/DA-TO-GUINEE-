import React from 'react';
import { Logo } from './Logo';

interface LogoPlaceholderProps {
  variant?: 'header' | 'hero' | 'footer' | 'standalone';
  className?: string;
  showSlogan?: boolean;
}

/**
 * LogoPlaceholder now renders the official corporate logo of DA-TO GUINEE SA
 * with the 3D hexagon emblem, chevron 'A' wordmark, and slogan on a clean white background.
 */
export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({ 
  variant = 'header',
  className = '',
  showSlogan = true
}) => {
  return (
    <Logo 
      variant={variant} 
      className={className} 
      showSlogan={showSlogan} 
    />
  );
};
