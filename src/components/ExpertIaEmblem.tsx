import React, { useState } from 'react';

interface ExpertIaEmblemProps {
  className?: string;
  variant?: 'auto' | 'jour' | 'nuit';
}

/**
 * DA-TO GUINEE SA - Expert IA Emblem
 * Renders PNG emblems configured for Day mode and Night mode:
 * - Day mode: /expert-ia-emblem-jour.png (and /expert-ia-emblem-light.png)
 * - Night mode: /expert-ia-emblem-nuit.png (and /expert-ia-emblem-dark.png)
 * Can be replaced directly in GitHub.
 */
export const ExpertIaEmblem: React.FC<ExpertIaEmblemProps> = ({ 
  className = "w-full h-full",
  variant = 'auto'
}) => {
  const [jourError, setJourError] = useState(false);
  const [nuitError, setNuitError] = useState(false);

  // SVG Fallback in case PNG is still being customized or loaded
  const renderSvgFallback = (color: string) => (
    <svg 
      viewBox="0 0 280 400" 
      fill={color} 
      className="w-full h-full object-contain"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(-25, -15)">
        <path d="M 165,25 L 35,215 L 165,405 L 165,355 L 75,215 L 165,75 Z" />
        <path d="M 165,25 L 295,98 L 295,146 L 165,73 Z" />
        <path d="M 165,88 L 295,160 L 295,208 L 165,136 Z" />
        <path d="M 100,173 L 150,144 L 150,334 L 100,363 Z" />
        <path d="M 163,192 L 213,163 L 213,353 L 163,382 Z" />
        <path d="M 240,250 L 295,282 L 295,320 L 240,288 Z" />
      </g>
    </svg>
  );

  if (variant === 'jour') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {!jourError ? (
          <img 
            src="/expert-ia-emblem-jour.png" 
            alt="Emblème Expert IA DA-TO (Mode Jour)"
            className="w-full h-full object-contain pointer-events-none select-none"
            onError={() => setJourError(true)}
            loading="eager"
          />
        ) : (
          renderSvgFallback("#0B2C5C")
        )}
      </div>
    );
  }

  if (variant === 'nuit') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {!nuitError ? (
          <img 
            src="/expert-ia-emblem-nuit.png" 
            alt="Emblème Expert IA DA-TO (Mode Nuit)"
            className="w-full h-full object-contain pointer-events-none select-none"
            onError={() => setNuitError(true)}
            loading="eager"
          />
        ) : (
          renderSvgFallback("#FFFFFF")
        )}
      </div>
    );
  }

  // Variant 'auto': switches automatically according to light / dark theme
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Day Mode PNG */}
      {!jourError ? (
        <img 
          src="/expert-ia-emblem-jour.png" 
          alt="Emblème Expert IA DA-TO (Mode Jour)"
          className="w-full h-full object-contain block dark:hidden pointer-events-none select-none"
          onError={() => setJourError(true)}
          loading="eager"
        />
      ) : (
        <div className="w-full h-full block dark:hidden">
          {renderSvgFallback("#0B2C5C")}
        </div>
      )}

      {/* Night Mode PNG */}
      {!nuitError ? (
        <img 
          src="/expert-ia-emblem-nuit.png" 
          alt="Emblème Expert IA DA-TO (Mode Nuit)"
          className="w-full h-full object-contain hidden dark:block pointer-events-none select-none"
          onError={() => setNuitError(true)}
          loading="eager"
        />
      ) : (
        <div className="w-full h-full hidden dark:block">
          {renderSvgFallback("#FFFFFF")}
        </div>
      )}
    </div>
  );
};

export default ExpertIaEmblem;
