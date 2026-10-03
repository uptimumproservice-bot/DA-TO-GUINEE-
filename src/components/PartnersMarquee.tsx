import React from 'react';
import { Briefcase, Landmark, Shield, Building, Award, CheckCircle } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const partners: Partner[] = [
  { id: '1', name: 'Direction Nationale du Cadastre', category: 'Institutionnel Foncier', icon: Landmark },
  { id: '2', name: 'Ministère des Travaux Publics', category: 'Infrastructures & BTP', icon: Building },
  { id: '3', name: 'Bureaux d’Études & Géomètres Agréés', category: 'Ingénierie & VRD', icon: Shield },
  { id: '4', name: 'Partenaires Bancaires & Financiers', category: 'Financement de Projets', icon: Briefcase },
  { id: '5', name: 'Architectes & Urbanistes Conseils', category: 'Design & Maîtrise d’œuvre', icon: Award },
  { id: '6', name: 'Fournisseurs de Matériaux Certifiés', category: 'Bétons & Aciers Normes ISO', icon: CheckCircle },
  { id: '7', name: 'Promoteurs & Investisseurs Privés', category: 'Programmes Immobiliers', icon: Building },
];

export const PartnersMarquee: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-slate-200/70 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
          Ils nous font confiance & collaborent avec nous sur le territoire guinéen
        </p>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient edge masks for smooth fade in/out */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 animate-marquee items-center gap-6 sm:gap-8 whitespace-nowrap">
          {[...partners, ...partners].map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={`${p.id}-${idx}`}
                className="inline-flex items-center gap-3.5 px-6 py-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 hover:border-[#F5A623] hover:bg-white shadow-2xs transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0B2C5C]/10 text-[#0B2C5C] group-hover:bg-[#F5A623] group-hover:text-[#0B2C5C] flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-[#0B2C5C]">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {p.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
