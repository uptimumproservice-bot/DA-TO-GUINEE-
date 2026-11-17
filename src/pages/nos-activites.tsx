import { useRef } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CheckCircle2, ArrowRight, Target } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { formatBrandText } from '@/components/BrandText';
import { CustomSectionsRenderer } from '@/components/CustomSectionsRenderer';

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
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function NosActivitesPage() {
  const { getPageContent, settings } = useSiteContent();
  const activites = getPageContent('nos-activites');

  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const parallaxY = useTransform(scrollY, (value) => (prefersReducedMotion ? 0 : value * 0.3));

  const btpImages: string[] = activites.btp?.images || [
    '/assets/images/btp_building_construction_1791408048105.jpg',
    '/assets/images/road_asphalt_paving_crew_1791411346218.jpg',
    '/assets/images/pont_en_construction.jpg',
  ];
  const foncierImages: string[] = activites.foncier?.images || [
    '/airo-assets/images/pages/activites/pole-foncier.jpg',
    '/assets/images/amenagement_foncier.jpg',
  ];
  const immoImages: string[] = activites.immobilier?.images || [
    '/airo-assets/images/pages/activites/pole-immobilier.jpg',
    '/airo-assets/images/pages/home/carousel-immobilier.jpg',
  ];

  return (
    <>
      <Helmet>
        <title>Nos Activités — {settings.companyName}</title>
        <meta name="description" content={`Découvrez les 3 pôles d'activité de ${settings.companyName} : BTP & Infrastructures, Développement Foncier & Aménagement, Immobilier & Valorisation.`} />
        <link rel="canonical" href="https://groupe-dato.com/nos-activites" />
        <meta property="og:title" content={`Nos Activités — ${settings.companyName}`} />
        <meta property="og:description" content={`BTP, Développement Foncier et Immobilier — les 3 pôles d'expertise de ${settings.companyName} en Guinée.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groupe-dato.com/nos-activites" />
      </Helmet>

      <main>
        {/* ── BANNIÈRE ─────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[520px] flex items-center overflow-hidden">
          <motion.div
            className="absolute -top-[15%] left-0 right-0 h-[130%] bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${activites.banner?.image || '/airo-assets/images/pages/activites/banner.jpg'})`,
              y: parallaxY,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.90) 0%, hsl(var(--primary) / 0.65) 100%)' }}
          />
          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                <span>{activites.banner.titre}</span>
              </h1>
              <div
                className="w-16 h-1 mt-4 rounded-full"
                style={{ background: 'hsl(var(--accent, 35 92% 55%))' }}
              />
            </motion.div>
          </div>
        </section>

        {/* ── INTRODUCTION NOS ACTIVITÉS ────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[#F8F9FA] dark:bg-[#071933]/60 border-b border-slate-200/80 dark:border-white/10 transition-colors">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <FadeIn className="text-center">
              <div
                className="w-12 h-1 mx-auto mb-6 rounded-full"
                style={{ background: 'hsl(var(--accent, 35 92% 55%))' }}
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2C5C] dark:text-white mb-6 tracking-tight">
                {activites.intro?.titre || 'Trois pôles d’activité. Une même exigence de réalisation.'}
              </h2>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl mx-auto font-normal">
                {activites.intro?.texte}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                <a
                  href="#btp"
                  className="p-5 rounded-xl bg-white dark:bg-[#0C254B] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#F5A623] transition-all text-left group"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5A623] block mb-1">
                    {activites.btp.eyebrow}
                  </span>
                  <span className="text-base font-bold text-[#0B2C5C] dark:text-white group-hover:text-[#F5A623] transition-colors block">
                    {activites.btp.titre} →
                  </span>
                </a>
                <a
                  href="#foncier"
                  className="p-5 rounded-xl bg-white dark:bg-[#0C254B] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#F5A623] transition-all text-left group"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5A623] block mb-1">
                    {activites.foncier.eyebrow}
                  </span>
                  <span className="text-base font-bold text-[#0B2C5C] dark:text-white group-hover:text-[#F5A623] transition-colors block">
                    {activites.foncier.titre} →
                  </span>
                </a>
                <a
                  href="#immobilier"
                  className="p-5 rounded-xl bg-white dark:bg-[#0C254B] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#F5A623] transition-all text-left group"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5A623] block mb-1">
                    {activites.immobilier.eyebrow}
                  </span>
                  <span className="text-base font-bold text-[#0B2C5C] dark:text-white group-hover:text-[#F5A623] transition-colors block">
                    {activites.immobilier.titre} →
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PÔLE 1 — BTP ─────────────────────────────────────────────────── */}
        <section id="btp" className="py-20 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              <FadeIn>
                <div className="flex flex-col gap-6 sticky top-24">
                  {btpImages.map((imgUrl, idx) => (
                    <div key={imgUrl + idx} className="relative rounded-2xl overflow-hidden shadow-xl h-64 sm:h-72 group border border-slate-100">
                      <img
                        src={imgUrl}
                        alt={`${activites.btp.titre} - ${settings.companyName}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="w-12 h-1 mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
                <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'hsl(var(--accent))' }}>
                  <span>{activites.btp.eyebrow}</span>
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 leading-tight">
                  <span>{activites.btp.titre}</span>
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  <span>{formatBrandText(activites.btp.intro)}</span>
                </p>
                <div className="flex flex-col gap-5 mb-8">
                  {(activites.btp.services || []).map((s: any) => (
                    <div key={s.id} className="flex items-start gap-4 p-5 rounded-xl bg-muted hover:shadow-sm transition-shadow duration-200">
                      <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--accent))' }} />
                      <div>
                        <p className="text-sm font-bold text-primary mb-1"><span>{s.titre}</span></p>
                        <p className="text-sm text-muted-foreground leading-relaxed"><span>{s.desc}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl border-l-4 border-[#0B2C5C] bg-white dark:!bg-white shadow-sm border border-slate-200/80">
                  <Target size={18} className="flex-shrink-0 mt-0.5 text-[#0B2C5C] dark:!text-[#0B2C5C] text-forced-blue" style={{ color: '#0B2C5C' }} />
                  <p className="text-sm font-bold text-[#0B2C5C] dark:!text-[#0B2C5C] text-forced-blue italic leading-relaxed" style={{ color: '#0B2C5C' }}>
                    <span>{activites.btp.objectif}</span>
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── PÔLE 2 — FONCIER ─────────────────────────────────────────────── */}
        <section id="foncier" className="py-20 bg-muted scroll-mt-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              <FadeIn>
                <div className="w-12 h-1 mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
                <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'hsl(var(--accent))' }}>
                  <span>{activites.foncier.eyebrow}</span>
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 leading-tight">
                  <span>{activites.foncier.titre}</span>
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  <span>{formatBrandText(activites.foncier.intro)}</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {(activites.foncier.services || []).map((s: any) => (
                    <div key={s.id} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                      <p className="text-sm font-medium text-foreground"><span>{s.texte}</span></p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic border-l-4 pl-4" style={{ borderColor: 'hsl(var(--accent))' }}>
                  <span>{activites.foncier.conclusion}</span>
                </p>
              </FadeIn>
              <FadeIn>
                <div className="flex flex-col gap-6 sticky top-24">
                  {foncierImages.map((imgUrl, idx) => (
                    <div key={imgUrl + idx} className="relative rounded-2xl overflow-hidden shadow-xl h-64 sm:h-72 group border border-slate-100">
                      <img
                        src={imgUrl}
                        alt={`${activites.foncier.titre} - ${settings.companyName}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── PÔLE 3 — IMMOBILIER ──────────────────────────────────────────── */}
        <section id="immobilier" className="py-20 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              <FadeIn>
                <div className="flex flex-col gap-6 sticky top-24">
                  {immoImages.map((imgUrl, idx) => (
                    <div key={imgUrl + idx} className="relative rounded-2xl overflow-hidden shadow-xl h-64 sm:h-72 group border border-slate-100">
                      <img
                        src={imgUrl}
                        alt={`${activites.immobilier.titre} - ${settings.companyName}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="w-12 h-1 mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
                <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'hsl(var(--accent))' }}>
                  <span>{activites.immobilier.eyebrow}</span>
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 leading-tight">
                  <span>{activites.immobilier.titre}</span>
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  <span>{formatBrandText(activites.immobilier.intro)}</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {(activites.immobilier.services || []).map((s: any) => (
                    <div key={s.id} className="flex items-center gap-3 bg-muted rounded-lg p-4">
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                      <p className="text-sm font-medium text-foreground"><span>{s.texte}</span></p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic border-l-4 pl-4" style={{ borderColor: 'hsl(var(--accent))' }}>
                  <span>{activites.immobilier.conclusion}</span>
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <CustomSectionsRenderer sections={activites.customSections} />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                {activites.cta?.titre || 'Un projet en tête ?'}
              </h2>
              <p className="text-base text-white/70 mb-8 leading-relaxed">
                {activites.cta?.texte}
              </p>
              <Link
                to={activites.cta?.ctaHref || '/contact'}
                className="inline-flex items-center gap-2 px-8 py-4 rounded text-base font-bold text-primary bg-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                {activites.cta?.ctaLabel || 'Contactez-nous'} <ArrowRight size={18} />
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
