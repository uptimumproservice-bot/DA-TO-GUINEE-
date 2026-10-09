import React from 'react';

interface ExpertIaEmblemProps {
  className?: string;
  color?: string;
}

/**
 * Exact geometric hexagon emblem of DA-TO GUINEE SA
 * from the user uploaded screenshot Capture d'écran 2026-10-09 101413.png.
 */
export const ExpertIaEmblem: React.FC<ExpertIaEmblemProps> = ({ 
  className = "w-full h-full", 
  color = "currentColor" 
}) => {
  return (
    <svg 
      viewBox="0 0 280 400" 
      fill={color} 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(-25, -15)">
        {/* Left outer chevron / shell */}
        <path d="M 165,25 L 35,215 L 165,405 L 165,355 L 75,215 L 165,75 Z" />

        {/* Top right facet */}
        <path d="M 165,25 L 295,98 L 295,146 L 165,73 Z" />

        {/* Inner roof facet */}
        <path d="M 165,88 L 295,160 L 295,208 L 165,136 Z" />

        {/* 1st inner column */}
        <path d="M 100,173 L 150,144 L 150,334 L 100,363 Z" />

        {/* 2nd inner column */}
        <path d="M 163,192 L 213,163 L 213,353 L 163,382 Z" />

        {/* 3rd inner block */}
        <path d="M 240,250 L 295,282 L 295,320 L 240,288 Z" />
      </g>
    </svg>
  );
};

export default ExpertIaEmblem;
