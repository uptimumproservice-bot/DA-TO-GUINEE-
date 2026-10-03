import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView } from 'motion/react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import {
  Star,
  Leaf,
  Settings2,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react';
import { home } from 'virtual:content';

import heroBtpImg from '../assets/images/hero_btp_engineers_1790975106455.jpg';
import heroLandImg from '../assets/images/hero_land_survey_1790975129590.jpg';
import heroRealEstateImg from '../assets/images/hero_real_estate_1790975118410.jpg';

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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Carousel image slots ────────────────────────────────────────────────────
const carouselImages = [
  heroBtpImg,
  heroLandImg,
  heroRealEstateImg,
];

// ─── Pole image slots ────────────────────────────────────────────────────────
const poleImages = [
  '/airo-assets/images/pages/home/pole-btp',
  '/airo-assets/images/pages/home/pole-foncier',
  '/airo-assets/images/pages/home/pole-immobilier',
];

const poleHrefs = [
  '/nos-activites#btp',
  '/nos-activites#foncier',
  '/nos-activites#immobilier',
];

// ─── Atout icons ─────────────────────────────────────────────────────────────
const atoutIcons = [Star, Leaf, Settings2, TrendingUp];

export default function HomePage() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sync carousel slide state with controls and progress
  useEffect(() => {
    if (!api) return;

    setCurrentSlide(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Helmet>
        <title>DA-TO GUINEE SA — Construire durablement. Créer de la valeur.</title>
        <meta
          name="description"
          content="DA-TO GUINEE SA est une entreprise guinéenne spécialisée dans le BTP, le développement foncier et l'immobilier. Nous concevons et réalisons des projets qui créent de la valeur durable en Guinée."
        />
        <link rel="canonical" href="https://groupe-dato.com/" />
        <meta property="og:title" content="DA-TO GUINEE SA — BTP • Développement Foncier • Immobilier" />
        <meta
          property="og:description"
          content="Entreprise guinéenne spécialisée dans le BTP, le développement foncier et l'immobilier."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groupe-dato.com/" />
      </Helmet>

      <main>
        {/* ── 1. HERO (Structure Airo avec animations Porteo Group) ─────────────── */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
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
              <source src="/airo-assets/images/pages/home/hero" type="video/mp4" />
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

          <div className="relative z-10 container mx-auto px-4 lg:px-8 flex flex-col items-center text-center gap-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
                <span>{home.hero.tagline}</span>
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
                <span>{home.hero.titre}</span>
                <br />
                <span style={{ color: 'hsl(var(--accent))' }}>{home.hero.titreAccent}</span>
              </h1>
              <p className="text-lg text-white/80 max-w-xl">
                <span>{home.hero.sousTitre}</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            >
              <Link
                to="/nos-activites"
                className="inline-flex items-center gap-2 px-8 py-4 rounded text-base font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:brightness-105"
                style={{ background: 'hsl(var(--accent))' }}
              >
                <span>{home.hero.cta}</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Animated scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          >
            <span className="text-xs text-white/50 uppercase tracking-widest font-medium">
              {home.hero.scrollLabel}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-0.5 h-8 rounded-full"
              style={{ background: 'hsl(var(--accent) / 0.6)' }}
            />
          </motion.div>
        </section>

        {/* ── 2. CARROUSEL (Structure Airo enrichie avec commandes et animations Porteo) ── */}
        <section className="relative group">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {home.carousel.map((slide: any, i: number) => {
                const isActive = currentSlide === i;
                return (
                  <CarouselItem key={slide.id}>
                    <div className="relative h-[520px] md:h-[600px] overflow-hidden">
                      <motion.img
                        animate={{ scale: isActive ? 1.05 : 1 }}
                        transition={{ duration: 6, ease: 'easeOut' }}
                        src={carouselImages[i]}
                        alt={slide.titre}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />

                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(to right, hsl(var(--primary) / 0.88) 0%, hsl(var(--primary) / 0.5) 60%, transparent 100%)',
                        }}
                      />

                      <div className="relative z-10 h-full flex items-center">
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="container mx-auto px-4 lg:px-8 max-w-2xl"
                        >
                          <p
                            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                            style={{ color: 'hsl(var(--accent))' }}
                          >
                            Pôle {i + 1} / {home.carousel.length}
                          </p>
                          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                            <span>{slide.titre}</span>
                          </h2>
                          <p className="text-base text-white/80 leading-relaxed max-w-lg mb-6">
                            <span>{slide.description}</span>
                          </p>
                          <Link
                            to="/nos-activites"
                            className="inline-flex items-center gap-2 text-sm font-semibold transition-transform duration-200 hover:translate-x-1"
                            style={{ color: 'hsl(var(--accent))' }}
                          >
                            <span>En savoir plus</span> <ChevronRight size={16} />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Porteo-style carousel arrows & navigation dots */}
            <div className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center gap-3">
              <button
                onClick={() => api?.scrollPrev()}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 border border-white/20"
                aria-label="Slide précédente"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
                {home.carousel.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => api?.scrollTo(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? 'w-6 bg-[#F5A623]'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Aller au slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => api?.scrollNext()}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 border border-white/20"
                aria-label="Slide suivante"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </Carousel>
        </section>

        {/* ── 3. ACCROCHE (Structure Airo) ─────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
            <FadeIn>
              <div
                className="w-12 h-1 mx-auto mb-8 rounded-full"
                style={{ background: 'hsl(var(--accent))' }}
              />
              <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-4">
                <span>{home.accroche.ligne1}</span>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span>{home.accroche.ligne2}</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── 4. NOS 3 PÔLES (Structure Airo avec micro-animations Porteo) ─── */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-14">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'hsl(var(--accent))' }}
              >
                <span>{home.poles.eyebrow}</span>
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
                <span>{home.poles.titre}</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {home.poles.items.map((pole: any, i: number) => (
                <FadeIn key={pole.id} delay={i * 0.12}>
                  <Link
                    to={poleHrefs[i]}
                    className="group block rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-white"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={poleImages[i]}
                        alt={pole.titre}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />

                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'hsl(var(--primary) / 0.25)' }}
                      />
                    </div>
                    <div className="p-6 flex items-center justify-between">
                      <h3 className="text-base font-bold text-primary leading-snug group-hover:text-[#F5A623] transition-colors">
                        <span>{pole.titre}</span>
                      </h3>
                      <ChevronRight
                        size={18}
                        className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1.5"
                        style={{ color: 'hsl(var(--accent))' }}
                      />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. POURQUOI NOUS CHOISIR (Structure Airo) ────────────────────── */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-14">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'hsl(var(--accent))' }}
              >
                <span>{home.atouts.eyebrow}</span>
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                <span>{home.atouts.titre}</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {home.atouts.items.map((atout: any, i: number) => {
                const Icon = atoutIcons[i];
                return (
                  <FadeIn key={atout.id} delay={i * 0.15}>
                    <div className="flex flex-col items-center text-center gap-4 p-6 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 group">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.15,
                          ease: 'easeOut',
                        }}
                        whileHover={{
                          scale: 1.15,
                          rotate: 8,
                          transition: { type: 'spring', stiffness: 350, damping: 15 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors group-hover:shadow-[0_0_20px_rgba(245,166,35,0.35)]"
                        style={{ background: 'hsl(var(--accent) / 0.15)' }}
                      >
                        <Icon size={28} style={{ color: 'hsl(var(--accent))' }} />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#F5A623] transition-colors">
                        <span>{atout.titre}</span>
                      </h3>
                      <p className="text-sm text-white/65 leading-relaxed">
                        <span>{atout.desc}</span>
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. CONTRIBUTION GUINÉE (Structure Airo) ──────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/airo-assets/images/pages/home/contribution-guinee)',
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'hsl(var(--primary) / 0.82)' }}
          />

          <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
            <FadeIn>
              <div
                className="w-12 h-1 mb-8 rounded-full"
                style={{ background: 'hsl(var(--accent))' }}
              />
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                <span>{home.contribution.titre}</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                <span>{home.contribution.para1}</span>
              </p>
              <p className="text-base text-white/65 leading-relaxed mb-8">
                <span>{home.contribution.para2}</span>
              </p>
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold text-white border border-white/30 hover:border-white/70 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>{home.contribution.cta}</span> <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── 7. CTA CONTACT (Structure Airo) ──────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                <div
                  className="flex-1 p-10 lg:p-14 flex flex-col justify-center gap-6"
                  style={{ background: 'hsl(var(--accent))' }}
                >
                  <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
                    <span>{home.ctaContact.eyebrow}</span>
                  </p>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    <span>{home.ctaContact.titre}</span>
                  </h2>
                  <p className="text-base text-white/80 max-w-md leading-relaxed">
                    <span>{home.ctaContact.desc}</span>
                  </p>
                  <div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded text-base font-bold text-primary bg-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <span>{home.ctaContact.cta}</span> <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>

                <div
                  className="hidden lg:flex flex-1 items-center justify-center p-14"
                  style={{ background: 'hsl(var(--primary))' }}
                >
                  <div className="text-center">
                    <div className="text-6xl font-extrabold text-white/10 leading-none mb-4">
                      DA-TO
                    </div>
                    <p className="text-lg font-semibold text-white/60 italic">
                      <span>{home.ctaContact.slogan}</span>
                    </p>
                    <div className="mt-8 flex justify-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: 'hsl(var(--accent))' }}
                      />
                      <span className="w-3 h-3 rounded-full bg-white/30" />
                      <span className="w-3 h-3 rounded-full bg-white/30" />
                    </div>
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
