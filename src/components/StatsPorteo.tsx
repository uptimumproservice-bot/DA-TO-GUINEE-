import React from 'react';
import { motion } from 'motion/react';
import { AnimatedCounter } from './AnimatedCounter';
import { Award, Building2, HardHat, Users, CheckCircle2 } from 'lucide-react';

interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: StatItem[] = [
  {
    id: 'exp',
    value: 15,
    suffix: '+',
    label: "Années d'Expertise",
    subtext: 'Au service du développement des infrastructures en Guinée',
    icon: Award,
  },
  {
    id: 'projects',
    value: 50,
    suffix: '+',
    label: 'Projets & Chantiers',
    subtext: 'Bâtiments, voiries, VRD et lotissements sécurisés',
    icon: Building2,
  },
  {
    id: 'hse',
    value: 100,
    suffix: '%',
    label: 'Conformité HSE & Qualité',
    subtext: 'Sécurité rigoureuse et matériaux conformes aux normes',
    icon: HardHat,
  },
  {
    id: 'jobs',
    value: 250,
    suffix: '+',
    label: 'Emplois Locaux Créés',
    subtext: 'Valorisation des talents et compétences guinéennes',
    icon: Users,
  },
];

export const StatsPorteo: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#0B2C5C] to-[#07172E] text-white overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#F5A623] uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Notre Impact & Nos Chiffres Clés</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            L'excellence opérationnelle au cœur de chaque chantier
          </h2>
          <div className="w-12 h-1 bg-[#F5A623] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F5A623]/50 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5A623]/15 text-[#F5A623] flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-white/30">0{idx + 1}</span>
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2 font-display">
                    <AnimatedCounter
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      duration={1800}
                    />
                  </div>
                  <h3 className="text-base font-bold text-[#F5A623] mb-1">
                    {s.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                    {s.subtext}
                  </p>
                </div>

                {/* Bottom accent glow */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#F5A623]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
