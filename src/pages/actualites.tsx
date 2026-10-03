import { useRef } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { actualites } from 'virtual:content';

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

const articleImages = [
  '/airo-assets/images/pages/actualites/article-immobilier',
  '/airo-assets/images/pages/actualites/article-viabilisation',
  '/airo-assets/images/pages/actualites/article-partenariat',
];

export default function ActualitesPage() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const parallaxY = useTransform(scrollY, (value) => (prefersReducedMotion ? 0 : value * 0.3));

  return (
    <>
      <Helmet>
        <title>Actualités — DA-TO GUINEE SA</title>
        <meta name="description" content="Suivez les dernières actualités du DA-TO GUINEE SA : projets en cours, réalisations, partenariats et annonces en Guinée." />
        <link rel="canonical" href="https://groupe-dato.com/actualites" />
        <meta property="og:title" content="Actualités — DA-TO GUINEE SA" />
        <meta property="og:description" content="Projets, réalisations et annonces du DA-TO GUINEE SA en Guinée." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groupe-dato.com/actualites" />
      </Helmet>

      <main>
        {/* ── BANNIÈRE ─────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[520px] flex items-center overflow-hidden">
          <motion.div
            className="absolute -top-[15%] left-0 right-0 h-[130%] bg-cover bg-center will-change-transform"
            style={{ 
              backgroundImage: 'url(/airo-assets/images/pages/actualites/banner)',
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
                <span>{actualites.banner.sousTitre}</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                <span>{actualites.banner.titre}</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── ARTICLES ─────────────────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {actualites.articles.map((article, i) => (
                <FadeIn key={article.id} delay={i * 0.1}>
                  <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={articleImages[i]}
                        alt={article.titre}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'hsl(var(--primary) / 0.2)' }}
                      />
                    </div>
                    <div className="p-7 flex flex-col flex-1 gap-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar size={13} style={{ color: 'hsl(var(--accent))' }} />
                        <time dateTime={article.date}>
                          <span>{article.date}</span>
                        </time>
                      </div>
                      <h2 className="text-lg font-bold text-primary leading-snug">
                        <span>{article.titre}</span>
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        <span>{article.resume}</span>
                      </p>
                      <div className="pt-2">
                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                          style={{ color: 'hsl(var(--accent))' }}
                        >
                          Lire la suite <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── INSCRIPTION NEWSLETTER ───────────────────────────────────────── */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
            <FadeIn>
              <div className="w-12 h-1 mx-auto mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              <h2 className="text-3xl font-extrabold text-white mb-4">Restez informé</h2>
              <p className="text-base text-white/70 leading-relaxed">
                Suivez nos actualités, projets et réalisations. Contactez-nous pour en savoir plus sur nos activités en Guinée.
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
