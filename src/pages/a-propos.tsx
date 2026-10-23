import { useRef } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { about } from 'virtual:content';
import { formatBrandText } from '@/components/BrandText';
import { DownloadCenterSection } from '@/components/DownloadCenterSection';

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
              backgroundImage: 'url(/airo-assets/images/pages/about/banner.jpg)',
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                <span>{about.banner.titre}</span>
              </h1>
              <div
                className="w-16 h-1 mb-4 rounded-full"
                style={{ background: 'hsl(var(--accent, 35 92% 55%))' }}
              />
              <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl leading-relaxed">
                Le territoire comme potentiel. Le projet comme engagement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── QUI SOMMES-NOUS ? ────────────────────────────────────────────── */}
        <section className="py-20 bg-[#F8F9FA] dark:bg-[#071933]/60 transition-colors">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Colonne gauche : Contenu textuel */}
              <FadeIn>
                {/* Ligne orange charte graphique au-dessus du titre */}
                <div
                  className="w-12 h-1 mb-4 rounded-full"
                  style={{ background: 'hsl(var(--accent, 35 92% 55%))' }}
                />

                {/* Titre de section : "Qui sommes-nous ?" en bleu marine, gras */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2C5C] dark:text-white mb-3 tracking-tight">
                  Qui sommes-nous ?
                </h2>

                {/* Slogan officiel en orange */}
                <p
                  className="italic font-semibold text-base md:text-lg mb-6"
                  style={{ color: 'hsl(var(--accent, 35 92% 55%))' }}
                >
                  &quot;Construire durablement. Créer de la valeur.&quot;
                </p>

                {/* Texte principal */}
                <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-normal">
                  <p>
                    <strong className="text-[#0B2C5C] dark:text-white font-bold">DA-TO GUINÉE SA</strong> est une entreprise guinéenne intervenant dans le BTP, le développement foncier et l’immobilier. Nos activités s’inscrivent dans une même dynamique : organiser les espaces, développer les infrastructures et valoriser le potentiel foncier et immobilier.
                  </p>
                  <p>
                    Nous abordons chaque opération en tenant compte de sa finalité, de ses contraintes techniques et de ses enjeux économiques, avec une attention particulière portée à la qualité de réalisation, à la maîtrise des ressources et à la pérennité des ouvrages.
                  </p>
                </div>

                {/* Texte d'accroche complémentaire (en bas de la colonne texte, en petit et en orange) */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'hsl(var(--accent, 35 92% 55%))' }}
                  >
                    Notre force : Une maîtrise complète de la chaîne de valeur, allant de l&apos;aménagement des terrains à la valorisation des actifs immobiliers.
                  </p>
                </div>
              </FadeIn>

              {/* Colonne droite : Photo format paysage */}
              <FadeIn delay={0.15}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-white/10 group">
                  <img
                    src="/assets/images/btp_building_construction_1791408048105.jpg"
                    alt="Équipe DA-TO Guinée SA sur le terrain et vue de chantier BTP"
                    className="w-full h-auto aspect-[16/11] object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C5C]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </FadeIn>
            </div>
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
                    src="/assets/images/vision_urban_btp_1791407884147.jpg"
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

        {/* ── NOTRE PHILOSOPHIE ─────────────────────────────────────────────── */}
        <section className="py-20 bg-[#F8F9FA] dark:bg-[#071933]/60 transition-colors">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Photo projet de route à gauche sans badge */}
              <FadeIn>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-white/10 group">
                  <img
                    src="/assets/images/chantier_route_btp.jpg"
                    alt="Chantier de bitumage et construction routière en Guinée - DA-TO GUINEE SA"
                    className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>

              {/* Contenu textuel à droite */}
              <FadeIn delay={0.15}>
                <div
                  className="w-12 h-1 mb-4 rounded-full"
                  style={{ background: 'hsl(var(--accent, 35 92% 55%))' }}
                />

                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2C5C] dark:text-white mb-6 tracking-tight">
                  Notre philosophie
                </h2>

                <div className="space-y-5 text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Nous considérons qu’un projet ne se résume pas à sa réalisation matérielle. Sa pertinence tient également à sa fonctionnalité, à sa qualité d’exécution, à sa capacité à répondre à un besoin et à la valeur qu’il peut générer dans le temps.
                  </p>

                  <div className="p-5 rounded-2xl bg-white dark:bg-[#0C254B] border-l-4 shadow-sm border-[#F5A623]">
                    <p className="font-semibold text-[#0B2C5C] dark:text-blue-100 italic leading-relaxed">
                      &quot;C’est cette exigence qui guide notre approche : concevoir avec discernement, réaliser avec rigueur et valoriser dans la durée.&quot;
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
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
        <section className="py-20 bg-white dark:bg-[#071933] overflow-hidden transition-colors">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-[#F5A623] dark:text-blue-300">
                <span>{about.approche.eyebrow}</span>
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white">
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
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border border-transparent dark:border-white/20 transition-colors ${
                          i === 0 || i === about.approche.etapes.length - 1
                            ? 'bg-[#F5A623] dark:!bg-[#0B2C5C]'
                            : 'bg-[#0B2C5C] dark:!bg-[#0B2C5C]'
                        }`}
                        style={{ color: '#ffffff' }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-xs font-semibold text-center text-primary dark:text-blue-100 whitespace-nowrap px-1">
                        <span>{etape.label}</span>
                      </span>
                    </div>
                    {i < about.approche.etapes.length - 1 && (
                      <div className="w-8 md:w-14 h-0.5 flex-shrink-0 mx-1 bg-[#0B2C5C]/20 dark:bg-white/25" />
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>



        {/* ── ENGAGEMENT & PROJET ─────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/airo-assets/images/pages/about/team-construction.jpg)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'hsl(var(--primary) / 0.88)' }}
          />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
            <FadeIn>
              <div className="w-12 h-1 mb-8 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'hsl(var(--accent))' }}>
                Construire durablement
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                Le projet comme engagement, le territoire comme potentiel
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                Pour DA-TO GUINÉE SA, chaque projet doit produire de l&apos;utilité, de la durabilité et de la valeur pour la Guinée.
              </p>
              <Link
                to="/nos-activites"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white shadow-xl transition-all duration-300 hover:brightness-110 select-none"
                style={{ background: 'hsl(var(--accent))' }}
              >
                <span>Découvrir nos activités</span>
                <ArrowRight size={18} />
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
