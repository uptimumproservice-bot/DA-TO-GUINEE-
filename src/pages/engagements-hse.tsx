import { useRef } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ShieldCheck, CheckCircle2, Cpu, ArrowRight } from 'lucide-react';
import { engagements } from 'virtual:content';

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

const engIcons = [ShieldCheck, ShieldCheck, ShieldCheck, ShieldCheck, ShieldCheck, ShieldCheck, ShieldCheck];

export default function EngagementsHSEPage() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const parallaxY = useTransform(scrollY, (value) => (prefersReducedMotion ? 0 : value * 0.3));

  return (
    <>
      <Helmet>
        <title>Engagements & HSE — DA-TO GUINEE SA</title>
        <meta name="description" content="Découvrez les engagements du DA-TO GUINEE SA : qualité, durabilité, sécurité, transparence et responsabilité sur chaque projet en Guinée." />
        <link rel="canonical" href="https://groupe-dato.com/engagements-hse" />
        <meta property="og:title" content="Engagements & HSE — DA-TO GUINEE SA" />
        <meta property="og:description" content="Les 7 engagements fondamentaux et la politique HSE du DA-TO GUINEE SA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groupe-dato.com/engagements-hse" />
      </Helmet>

      <main>
        {/* ── BANNIÈRE ─────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[520px] flex items-center overflow-hidden">
          <motion.div
            className="absolute -top-[15%] left-0 right-0 h-[130%] bg-cover bg-center will-change-transform"
            style={{ 
              backgroundImage: 'url(/airo-assets/images/pages/engagements/banner.jpg)',
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'hsl(var(--accent))' }}>
                <span>{engagements.banner.sousTitre}</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                <span>{engagements.banner.titre}</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── NOS ENGAGEMENTS ──────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-14">
              <div className="w-12 h-1 mx-auto mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--accent))' }}>
                <span>{engagements.engagements.eyebrow}</span>
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
                <span>{engagements.engagements.titre}</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {engagements.engagements.items.map((item, i) => {
                const Icon = engIcons[i % engIcons.length];
                return (
                  <FadeIn key={item.id} delay={i * 0.07}>
                    <div className="bg-muted rounded-xl p-7 h-full flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'hsl(var(--accent) / 0.12)' }}
                      >
                        <Icon size={22} style={{ color: 'hsl(var(--accent))' }} />
                      </div>
                      <h3 className="text-lg font-bold text-primary">
                        <span>{item.titre}</span>
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span>{item.desc}</span>
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HSE ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <FadeIn>
                <div className="w-12 h-1 mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--accent))' }}>
                  <span>{engagements.hse.eyebrow}</span>
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight">
                  <span>{engagements.hse.titre}</span>
                </h2>
                <div className="flex flex-col gap-3 mb-8">
                  {engagements.hse.pratiques.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                      <p className="text-sm text-white/80">
                        <span>{p.texte}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="p-5 rounded-xl border-l-4"
                  style={{ borderColor: 'hsl(var(--accent))', background: 'hsl(var(--accent) / 0.08)' }}
                >
                  <p className="text-sm font-semibold text-white/90 italic">
                    <span>{engagements.hse.objectif}</span>
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="rounded-2xl overflow-hidden shadow-2xl h-[480px] sm:h-[540px] lg:h-[580px] w-full border border-white/15">
                  <img
                    src="/assets/images/professional_site_inspector_ppe_1791409620212.jpg"
                    alt="Ingénieur de chantier et agent HSE avec EPI complet et harnais - DA-TO GUINEE SA"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGIE ──────────────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <FadeIn>
                <div className="rounded-2xl overflow-hidden shadow-xl h-80">
                  <img
                    src="/assets/images/african_engineers_office_digital_1791410135615.jpg"
                    alt="Ingénieurs africains au bureau travaillant sur les solutions numériques - DA-TO GUINEE SA"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="w-12 h-1 mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--accent))' }}>
                  <span>{engagements.technologie.eyebrow}</span>
                </p>
                <h2 className="text-3xl font-extrabold text-primary mb-8 leading-tight">
                  <span>{engagements.technologie.titre}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {engagements.technologie.domaines.map((d) => (
                    <div key={d.id} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                      <Cpu size={15} className="flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                      <p className="text-sm font-medium text-foreground">
                        <span>{d.texte}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold text-primary mb-4">Un projet qui respecte ces engagements ?</h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Contactez-nous pour discuter de votre projet et découvrir comment DA-TO GUINEE SA peut vous accompagner.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded text-base font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: 'hsl(var(--accent))' }}
              >
                Contactez-nous <ArrowRight size={18} />
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
