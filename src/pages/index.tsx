import { useRef } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView } from 'motion/react';
import {
  Star,
  Leaf,
  Settings2,
  TrendingUp,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { home } from 'virtual:content';
import { StatsPorteo } from '@/components/StatsPorteo';

// ─── Fade-in wrapper with smooth ease ──────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Pole image slots ────────────────────────────────────────────────────────
const poleImages = [
  '/airo-assets/images/pages/home/pole-btp.jpg',
  '/airo-assets/images/pages/home/pole-foncier.png',
  '/airo-assets/images/pages/home/pole-immobilier.jpg',
];

const poleHrefs = [
  '/nos-activites#btp',
  '/nos-activites#foncier',
  '/nos-activites#immobilier',
];

// ─── Atout icons ─────────────────────────────────────────────────────────────
const atoutIcons = [Star, Leaf, Settings2, TrendingUp];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>DA-TO GUINEE SA — BTP • Développement Foncier • Immobilier</title>
        <meta
          name="description"
          content="DA-TO GUINEE SA est une entreprise guinéenne spécialisée dans le BTP, le développement foncier et l'immobilier. Réalisations durables et créatrices de valeur en Guinée."
        />
        <link rel="canonical" href="https://datoguinee.com/" />
        <meta property="og:title" content="DA-TO GUINEE SA — BTP • Développement Foncier • Immobilier" />
        <meta
          property="og:description"
          content="Entreprise guinéenne spécialisée dans le BTP, le développement foncier et l'immobilier."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://datoguinee.com/" />
      </Helmet>

      <main className="bg-slate-50 dark:bg-[#071933] transition-colors">
        {/* ── 1. HERO BANNER ─────────────────────────────────────────────────── */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background video & high-def poster */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/airo-assets/images/pages/home/hero-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover scale-105"
            >
              <source src="/airo-assets/images/pages/home/hero.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 bg-cover bg-center -z-10"
              style={{ backgroundImage: 'url(/airo-assets/images/pages/home/hero-poster.jpg)' }}
            />
          </div>

          {/* Deep corporate gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--primary) / 0.88) 0%, hsl(var(--primary) / 0.72) 100%)',
            }}
          />

          {/* Ambient luminous moving orbs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl animate-ambient-glow pointer-events-none" />
          <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-[#F5A623]/20 blur-3xl animate-float-reverse pointer-events-none" />

          <div className="relative z-10 container mx-auto px-4 lg:px-8 flex flex-col items-center text-center gap-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white/80 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
                <span>{home.hero.tagline}</span>
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl tracking-tight">
                <span>{home.hero.titre}</span>{' '}
                <span style={{ color: 'hsl(var(--accent))' }}>{home.hero.titreAccent}</span>
              </h1>
              <p className="text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
                <span>{home.hero.sousTitre}</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center gap-4 mt-2"
            >
              <Link
                to="/nos-activites"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl transition-all duration-300 hover:brightness-110 hover:scale-105 select-none"
                style={{ background: 'hsl(var(--accent))' }}
              >
                <span>{home.hero.cta}</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-all select-none"
              >
                <span>Contactez-nous</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── 2. DYNAMIC TICKER RIBBON ───────────────────────────────────────── */}
        <div className="relative py-3 bg-[#0B2C5C] text-white overflow-hidden border-y border-white/10 shadow-md">
          <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-100">
            {[1, 2].map((k) => (
              <span key={k} className="inline-flex items-center gap-8">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
                  BTP & Infrastructures Routières
                </span>
                <span className="text-[#F5A623]">✦</span>
                <span>Génie Civil & VRD</span>
                <span className="text-[#F5A623]">✦</span>
                <span>Aménagement & Sécurisation Foncière</span>
                <span className="text-[#F5A623]">✦</span>
                <span>Programmes Immobiliers Durables</span>
                <span className="text-[#F5A623]">✦</span>
                <span>Normes & Sécurité HSE ISO</span>
                <span className="text-[#F5A623]">✦</span>
                <span>Conakry • République de Guinée</span>
                <span className="text-[#F5A623]">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── 3. ACCROCHE STRATÉGIQUE ────────────────────────────────────────── */}
        <section className="py-14 bg-white dark:bg-[#071933] transition-colors">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
            <FadeIn>
              <div
                className="w-12 h-1 mx-auto mb-6 rounded-full"
                style={{ background: 'hsl(var(--accent))' }}
              />
              <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-relaxed mb-3">
                <span>{home.accroche.ligne1}</span>
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <span>{home.accroche.ligne2}</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── 4. NOS 3 PÔLES D'ACTIVITÉ ─────────────────────────────────────── */}
        <section className="py-16 bg-slate-100 dark:bg-[#0C254B]/50 transition-colors">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-10">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'hsl(var(--accent))' }}
              >
                <span>{home.poles.eyebrow}</span>
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2C5C] dark:text-white">
                <span>{home.poles.titre}</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {home.poles.items.map((pole: any, i: number) => (
                <FadeIn key={pole.id} delay={i * 0.1}>
                  <Link
                    to={poleHrefs[i]}
                    className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#0C254B] border border-slate-200 dark:border-white/10 hover:border-[#F5A623]"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={poleImages[i]}
                        alt={pole.titre}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C5C]/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    </div>
                    <div className="p-5 flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#0B2C5C] dark:text-white group-hover:text-[#F5A623] transition-colors">
                        <span>{pole.titre}</span>
                      </h3>
                      <ChevronRight
                        size={18}
                        className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1 text-[#F5A623]"
                      />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. CHIFFRES CLÉS & COMPTEUR ANIMÉ CONTINU ────────────────────── */}
        <StatsPorteo />

        {/* Dynamic Glowing Divider Line */}
        <div className="w-full h-[2px] glow-line-animated" />

        {/* ── 6. ENGAGEMENTS ET ATOUTS ──────────────────────────────────────── */}
        <section className="py-16 bg-[#0B2C5C] text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-12">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'hsl(var(--accent))' }}
              >
                <span>{home.atouts.eyebrow}</span>
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                <span>{home.atouts.titre}</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {home.atouts.items.map((atout: any, i: number) => {
                const Icon = atoutIcons[i];
                return (
                  <FadeIn key={atout.id} delay={i * 0.1}>
                    <div className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#F5A623]/50 transition-all duration-300 group">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110"
                        style={{ background: 'hsl(var(--accent) / 0.15)' }}
                      >
                        <Icon size={24} style={{ color: 'hsl(var(--accent))' }} />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#F5A623] transition-colors">
                        <span>{atout.titre}</span>
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <span>{atout.desc}</span>
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7. CTA CONTACT ────────────────────────────────────────────────── */}
        <section className="py-16 bg-white dark:bg-[#071933] transition-colors">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row border border-slate-200 dark:border-white/10">
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center gap-4 bg-[#F5A623] dark:!bg-[#0C254B] transition-colors">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/90">
                    <span>{home.ctaContact.eyebrow}</span>
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    <span>{home.ctaContact.titre}</span>
                  </h2>
                  <p className="text-sm text-white/90 max-w-md leading-relaxed font-normal">
                    <span>{home.ctaContact.desc}</span>
                  </p>
                  <div className="mt-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-[#0B2C5C] bg-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <span>{home.ctaContact.cta}</span> <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-[#0B2C5C] dark:!bg-[#071933] transition-colors text-center">
                  <div>
                    <div className="text-5xl font-black text-white/10 leading-none mb-3">
                      DA-TO
                    </div>
                    <p className="text-base font-bold text-white/80 italic">
                      <span>{home.ctaContact.slogan}</span>
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
