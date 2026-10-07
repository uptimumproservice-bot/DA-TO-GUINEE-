import React from 'react';

interface BrandedImageProps {
  src: string;
  alt: string;
  className?: string;
  showSafetyBadge?: boolean;
  badgeText?: string;
}

export const BrandedImage: React.FC<BrandedImageProps> = ({
  src,
  alt,
  className = '',
  showSafetyBadge = false,
  badgeText = 'DA-TO GUINEE SA • Sécurité & Équipement Chantier'
}) => {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        loading="lazy"
      />
      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C5C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Official DA-TO GUINEE SA Safety & Hard Hat / Vest Branding Badge */}
      {showSafetyBadge && (
        <div className="absolute top-3 left-3 z-20 bg-[#0B2C5C]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-[#F5A623]/60 shadow-lg backdrop-blur-md flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
          <span>{badgeText}</span>
        </div>
      )}

      {/* Watermark Seal in bottom right */}
      <div className="absolute bottom-3 right-3 z-20 bg-white/90 text-[#0B2C5C] text-[10px] font-extrabold px-2.5 py-1 rounded shadow backdrop-blur-sm border border-slate-200">
        DA-TO GUINEE SA
      </div>
    </div>
  );
};
