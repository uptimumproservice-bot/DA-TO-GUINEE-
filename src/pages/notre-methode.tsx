import { useRef } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { methode } from 'virtual:content';

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

export default function NotreMethodePage() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const parallaxY = useTransform(scrollY, (value) => (prefersReducedMotion ? 0 : value * 0.3));

  return (
    <>
      <Helmet>
        <title>Notre Méthode — DA-TO GUINEE SA</title>
        <meta name="description" content="Découvrez la méthode de travail du DA-TO GUINEE SA : un processus en 7 étapes, du besoin à la livraison, pour des projets maîtrisés et durables." />
        <link rel="canonical" href="https://groupe-dato.com/notre-methode" />
        <meta property="og:title" content="Notre Méthode — DA-TO GUINEE SA" />
        <meta property="og:description" content="7 étapes pour des projets maîtrisés : Comprendre, Étudier, Concevoir, Planifier, Exécuter, Contrôler, Livrer." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groupe-dato.com/notre-methode" />
      </Helmet>

      <main>
        {/* ── BANNIÈRE ─────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[520px] flex items-center overflow-hidden">
          <motion.div
            className="absolute -top-[15%] left-0 right-0 h-[130%] bg-cover bg-center will-change-transform"
            style={{ 
              backgroundImage: 'url(/airo-assets/images/pages/methode/banner.jpg)',
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
                <span>{methode.banner.sousTitre}</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                <span>{methode.banner.titre}</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── INTRO ────────────────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
            <FadeIn>
              <div className="w-12 h-1 mx-auto mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'hsl(var(--accent))' }}>
                <span>{methode.intro.eyebrow}</span>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span>{methode.intro.texte}</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── FRISE CHRONOLOGIQUE ──────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col gap-0">
              {methode.etapes.map((etape, i) => {
                const isEven = i % 2 === 0;
                return (
                  <FadeIn key={etape.id} delay={i * 0.08}>
                    <div className={`flex flex-col lg:flex-row items-stretch gap-0 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                      {/* Number block */}
                      <div
                        className="flex-shrink-0 w-full lg:w-48 flex items-center justify-center py-8 lg:py-12"
                        style={{ background: 'hsl(var(--primary))' }}
                      >
                        <div className="text-center">
                          <div className="text-5xl font-extrabold leading-none" style={{ color: 'hsl(var(--accent))' }}>
                            <span>{etape.num}</span>
                          </div>
                        </div>
                      </div>
                      {/* Content block */}
                      <div className="flex-1 bg-white p-8 lg:p-12 flex flex-col justify-center">
                        <h3 className="text-2xl font-extrabold text-primary mb-3">
                          <span>{etape.titre}</span>
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                          <span>{etape.desc}</span>
                        </p>
                      </div>
                      {/* Accent stripe */}
                      <div className="flex-shrink-0 w-full lg:w-3" style={{ background: 'hsl(var(--accent))' }} />
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── IMAGE LIVRAISON ──────────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/images/project_delivery_success_1791408340290.jpg)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'hsl(var(--primary) / 0.85)' }}
          />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl text-center">
            <FadeIn>
              <div className="w-12 h-1 mx-auto mb-8 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                Un projet livré est un projet réussi.
              </h2>
              <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl mx-auto">
                Notre méthode garantit que chaque projet est livré dans les délais, dans le budget et avec la qualité attendue.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded text-base font-bold text-primary bg-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                Discuter de votre projet <ArrowRight size={18} />
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
