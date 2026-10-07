import { useRef } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { about } from 'virtual:content';
import { formatBrandText } from '@/components/BrandText';

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

export default function AProposPage() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const parallaxY = useTransform(scrollY, (value) => (prefersReducedMotion ? 0 : value * 0.3));

  return (
    <>
      <Helmet>
        <title>À Propos — DA-TO GUINEE SA</title>
        <meta name="description" content="Découvrez la vision, la mission, les domaines d'intervention et la philosophie du DA-TO GUINEE SA, entreprise guinéenne spécialisée dans le BTP, le développement foncier et l'immobilier." />
        <link rel="canonical" href="https://groupe-dato.com/a-propos" />
        <meta property="og:title" content="À Propos — DA-TO GUINEE SA" />
        <meta property="og:description" content="Vision, mission et philosophie du DA-TO GUINEE SA en Guinée." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groupe-dato.com/a-propos" />
      </Helmet>

      <main>
        {/* ── BANNIÈRE ─────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[520px] flex items-center overflow-hidden">
          <motion.div
            className="absolute -top-[15%] left-0 right-0 h-[130%] bg-cover bg-center will-change-transform"
            style={{ 
              backgroundImage: 'url(/airo-assets/images/pages/about/banner)',
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
                <span>{about.banner.sousTitre}</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                <span>{about.banner.titre}</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── VISION ───────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <FadeIn>
                <div className="w-12 h-1 mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
                <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  <span>{about.vision.eyebrow}</span>
                </p>
                <blockquote className="text-xl md:text-2xl font-medium text-primary leading-relaxed italic border-l-4 pl-6" style={{ borderColor: 'hsl(var(--accent))' }}>
                  <span>{about.vision.texte}</span>
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="rounded-2xl overflow-hidden shadow-xl h-80">
                  <img
                    src="/src/assets/images/vision_urban_btp_1791407884147.jpg"
                    alt="Vision DA-TO GUINEE SA - Aménagement urbain et infrastructures durables"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── MISSION ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'hsl(var(--accent))' }}>
                <span>{about.mission.eyebrow}</span>
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                <span>{about.mission.texte}</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── DOMAINES D'INTERVENTION ──────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-14">
              <div className="w-12 h-1 mx-auto mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
                <span>{about.domaines.eyebrow}</span>
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {about.domaines.items.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.07}>
                  <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4 h-full hover:shadow-md transition-shadow duration-200">
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--accent))' }} />
                    <p className="text-sm font-medium text-foreground leading-snug">
                      <span>{item.texte}</span>
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPROCHE INTÉGRÉE ────────────────────────────────────────────── */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--accent))' }}>
                <span>{about.approche.eyebrow}</span>
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
                <span>{about.approche.titre}</span>
              </h2>
            </FadeIn>

            {/* Frise horizontale scrollable */}
            <FadeIn>
              <div className="flex items-center gap-0 overflow-x-auto pb-4">
                {about.approche.etapes.map((etape, i) => (
                  <div key={etape.id} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                        style={{ background: i === 0 || i === about.approche.etapes.length - 1 ? 'hsl(var(--accent))' : 'hsl(var(--primary))' }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-xs font-semibold text-center text-primary whitespace-nowrap px-1">
                        <span>{etape.label}</span>
                      </span>
                    </div>
                    {i < about.approche.etapes.length - 1 && (
                      <div className="w-8 md:w-14 h-0.5 flex-shrink-0 mx-1" style={{ background: 'hsl(var(--primary) / 0.2)' }} />
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PHILOSOPHIE ──────────────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/airo-assets/images/pages/about/team-construction)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'hsl(var(--primary) / 0.88)' }}
          />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
            <FadeIn>
              <div className="w-12 h-1 mb-8 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: 'hsl(var(--accent))' }}>
                <span>{about.philosophie.eyebrow}</span>
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {about.philosophie.lignes.map((ligne) => (
                  <p key={ligne.id} className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
                    <span>{ligne.texte}</span>
                  </p>
                ))}
              </div>
              <p className="text-base text-white/75 leading-relaxed mb-10 max-w-xl">
                <span>{formatBrandText(about.philosophie.conclusion)}</span>
              </p>
              <Link
                to="/nos-activites"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold text-white border border-white/30 hover:border-white/70 transition-all duration-200 hover:-translate-y-0.5"
              >
                Découvrir nos activités <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
