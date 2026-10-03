import { useRef, useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { contact } from 'virtual:content';
import { MapsGroundingWidget } from '../components/MapsGroundingWidget';

const SUJETS: string[] = [
  'Demande de devis',
  'Information sur un projet',
  'Partenariat',
  'Autre',
];

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

export default function ContactPage() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const parallaxY = useTransform(scrollY, (value) => (prefersReducedMotion ? 0 : value * 0.3));

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      nom: (form.elements.namedItem('nom') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telephone: (form.elements.namedItem('telephone') as HTMLInputElement).value,
      sujet: (form.elements.namedItem('sujet') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // silent
    }
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <>
      <Helmet>
        <title>Contact — DA-TO GUINEE SA</title>
        <meta name="description" content="Contactez le DA-TO GUINEE SA pour vos projets de BTP, développement foncier et immobilier en Guinée. Formulaire de contact, coordonnées et localisation." />
        <link rel="canonical" href="https://groupe-dato.com/contact" />
        <meta property="og:title" content="Contact — DA-TO GUINEE SA" />
        <meta property="og:description" content="Parlons de votre projet. Contactez le DA-TO GUINEE SA en Guinée." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groupe-dato.com/contact" />
      </Helmet>

      <main>
        {/* ── BANNIÈRE ─────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[520px] flex items-center overflow-hidden">
          <motion.div
            className="absolute -top-[15%] left-0 right-0 h-[130%] bg-cover bg-center will-change-transform"
            style={{ 
              backgroundImage: 'url(/airo-assets/images/pages/contact/banner)',
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
                <span>{contact.banner.sousTitre}</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                <span>{contact.banner.titre}</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── FORMULAIRE + COORDONNÉES ──────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

              {/* Formulaire */}
              <FadeIn>
                <div className="w-12 h-1 mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
                <h2 className="text-3xl font-extrabold text-primary mb-8">Envoyez-nous un message</h2>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                    <CheckCircle2 size={48} style={{ color: 'hsl(var(--accent))' }} />
                    <h3 className="text-xl font-bold text-primary">Message envoyé !</h3>
                    <p className="text-muted-foreground">Nous vous répondrons dans les meilleurs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="nom" className="text-sm font-semibold text-foreground">Nom complet *</label>
                        <input
                          id="nom"
                          name="nom"
                          type="text"
                          required
                          placeholder="Votre nom"
                          className="px-4 py-3 rounded-lg border border-border bg-muted text-sm focus:outline-none focus:ring-2 transition-all"
                          style={{ '--tw-ring-color': 'hsl(var(--accent) / 0.4)' } as React.CSSProperties}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-semibold text-foreground">Email *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="votre@email.com"
                          className="px-4 py-3 rounded-lg border border-border bg-muted text-sm focus:outline-none focus:ring-2 transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="telephone" className="text-sm font-semibold text-foreground">Téléphone</label>
                        <input
                          id="telephone"
                          name="telephone"
                          type="tel"
                          placeholder="+224 ..."
                          className="px-4 py-3 rounded-lg border border-border bg-muted text-sm focus:outline-none focus:ring-2 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="sujet" className="text-sm font-semibold text-foreground">Sujet *</label>
                        <select
                          id="sujet"
                          name="sujet"
                          required
                          className="px-4 py-3 rounded-lg border border-border bg-muted text-sm focus:outline-none focus:ring-2 transition-all"
                        >
                          <option value="">Choisir un sujet</option>
                          {SUJETS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-semibold text-foreground">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Décrivez votre projet ou votre demande..."
                        className="px-4 py-3 rounded-lg border border-border bg-muted text-sm focus:outline-none focus:ring-2 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded text-base font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: 'hsl(var(--accent))' }}
                    >
                      {loading ? 'Envoi en cours…' : (<><Send size={16} /> Envoyer le message</>)}
                    </button>
                  </form>
                )}
              </FadeIn>

              {/* Coordonnées */}
              <FadeIn delay={0.15}>
                <div className="w-12 h-1 mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
                <h2 className="text-3xl font-extrabold text-primary mb-8">Nos coordonnées</h2>
                <div className="flex flex-col gap-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(var(--accent) / 0.12)' }}>
                      <MapPin size={18} style={{ color: 'hsl(var(--accent))' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary mb-0.5">Adresse</p>
                      <p className="text-sm text-muted-foreground"><span>{contact.coordonnees.adresse}</span></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(var(--accent) / 0.12)' }}>
                      <Phone size={18} style={{ color: 'hsl(var(--accent))' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary mb-0.5">Téléphone</p>
                      <p className="text-sm text-muted-foreground"><span>{contact.coordonnees.telephone}</span></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(var(--accent) / 0.12)' }}>
                      <Mail size={18} style={{ color: 'hsl(var(--accent))' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary mb-0.5">Email</p>
                      <p className="text-sm text-muted-foreground">
                        <a href={`mailto:${contact.coordonnees.email}`} className="hover:underline transition-colors hover:text-primary">
                          <span>{contact.coordonnees.email}</span>
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(var(--accent) / 0.12)' }}>
                      <Clock size={18} style={{ color: 'hsl(var(--accent))' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary mb-0.5">Horaires</p>
                      <p className="text-sm text-muted-foreground"><span>{contact.coordonnees.horaires}</span></p>
                    </div>
                  </div>
                </div>

                {/* Image Conakry */}
                <div className="rounded-2xl overflow-hidden shadow-xl h-56">
                  <img
                    src="/src/assets/images/contact_african_team_1791015747983.jpg"
                    alt="Équipe professionnelle DA-TO GUINEE SA à Conakry"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── CLIENTS & PARTENAIRES ─────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-14">
              <div className="w-12 h-1 mx-auto mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--accent))' }}>
                <span>{contact.clients.eyebrow}</span>
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
                <span>{contact.clients.titre}</span>
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Clients */}
              <FadeIn>
                <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                  <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 rounded-full inline-block" style={{ background: 'hsl(var(--accent))' }} />
                    <span>{contact.clients.clients.label}</span>
                  </h3>
                  <div className="flex flex-col gap-3">
                    {contact.clients.clients.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <CheckCircle2 size={15} className="flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                        <p className="text-sm text-foreground"><span>{item.texte}</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
              {/* Partenaires */}
              <FadeIn delay={0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                  <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 rounded-full inline-block" style={{ background: 'hsl(var(--accent))' }} />
                    <span>{contact.clients.partenaires.label}</span>
                  </h3>
                  <div className="flex flex-col gap-3">
                    {contact.clients.partenaires.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <CheckCircle2 size={15} className="flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                        <p className="text-sm text-foreground"><span>{item.texte}</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── CONTRIBUTION GUINÉE ───────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/src/assets/images/contact_african_team_1791015747983.jpg)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'hsl(var(--primary) / 0.88)' }}
          />
          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            <FadeIn className="text-center mb-12">
              <div className="w-12 h-1 mx-auto mb-6 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--accent))' }}>
                <span>{contact.contribution.eyebrow}</span>
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {contact.contribution.items.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.07}>
                  <div
                    className="rounded-xl p-5 text-center"
                    style={{ background: 'hsl(var(--accent) / 0.12)', border: '1px solid hsl(var(--accent) / 0.25)' }}
                  >
                    <p className="text-sm font-semibold text-white leading-snug">
                      <span>{item.texte}</span>
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAPS GROUNDING WIDGET ─────────────────────────────────────────── */}
        <MapsGroundingWidget />
      </main>
    </>
  );
}
