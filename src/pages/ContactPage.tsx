import React, { useState } from 'react';
import { PageId, ContactFormData } from '../types';
import { ParallaxBanner } from '../components/ParallaxBanner';
import { CONTACT_COORDINATES } from '../data/siteData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Linkedin, 
  Facebook, 
  Youtube, 
  Twitter, 
  Share2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '+224 ',
    subject: 'Demande de devis',
    message: '',
    consent: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Merci de remplir tous les champs obligatoires.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '+224 ',
      subject: 'Demande de devis',
      message: '',
      consent: true
    });
    setIsSubmitted(false);
  };

  return (
    <div className="w-full bg-white">
      {/* 1. Parallax Banner */}
      <ParallaxBanner
        title="Contact & Siège Social"
        subtitle="Nos équipes d'ingénieurs et nos conseillers fonciers vous accueillent à Conakry pour donner vie à vos projets."
        image="/uploaded-images/hero_btp_engineers_1790975106455.jpg"
        badge="DISPONIBILITÉ & ÉCOUTE TECHNIQUE"
        currentPageLabel="Contact"
        onNavigateHome={() => onNavigate('accueil')}
      />

      {/* 2. Coordonnées directes (Visibles sans scroll grâce à la disposition en grille haute) */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: Téléphones */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F5A623] flex items-center justify-center shrink-0 border border-amber-100">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-display">
                  Téléphone direct
                </span>
                <a 
                  href={`tel:${CONTACT_COORDINATES.phone1}`} 
                  className="text-sm sm:text-base font-bold text-[#0B2C5C] hover:text-[#F5A623] transition-colors block mt-0.5"
                >
                  {CONTACT_COORDINATES.phone1}
                </a>
                <a 
                  href={`tel:${CONTACT_COORDINATES.phone2}`} 
                  className="text-xs text-slate-500 hover:text-[#0B2C5C] transition-colors block"
                >
                  {CONTACT_COORDINATES.phone2}
                </a>
              </div>
            </div>

            {/* Box 2: Adresse & BP */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B2C5C] flex items-center justify-center shrink-0 border border-blue-100">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-display">
                  Siège à Conakry
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug mt-0.5">
                  Immeuble DA-TO, Kaloum
                </p>
                <p className="text-xs text-slate-500">
                  BP 2450 Conakry, Guinée
                </p>
              </div>
            </div>

            {/* Box 3: Email */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1F7A3A] flex items-center justify-center shrink-0 border border-emerald-100">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-display">
                  Courriel officiel
                </span>
                <a 
                  href={`mailto:${CONTACT_COORDINATES.email}`} 
                  className="text-xs sm:text-sm font-bold text-[#0B2C5C] hover:text-[#F5A623] transition-colors block mt-0.5"
                >
                  {CONTACT_COORDINATES.email}
                </a>
                <span className="text-xs text-slate-500">
                  Réponse sous 24h
                </span>
              </div>
            </div>

            {/* Box 4: Horaires */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-display">
                  Heures d'ouverture
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                  Lun - Ven : 08h - 17h
                </p>
                <p className="text-xs text-slate-500">
                  Sam : 09h - 13h (sur RDV)
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Formulaire de contact & Accès Conakry */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">
              
              <div className="mb-6">
                <span className="text-xs font-bold text-[#F5A623] uppercase tracking-wider font-display block mb-1">
                  Écrivez-nous
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2C5C] font-display">
                  Transmettre votre demande
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Remplissez ce formulaire et un responsable de projet du DA-TO GUINEE SA prendra contact avec vous.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2C5C] font-display">
                    Message envoyé avec succès !
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Merci <strong>{formData.fullName}</strong>. Votre message a été adressé à notre secrétariat général à Conakry. Nous reviendrons vers vous très prochainement à l'adresse <strong>{formData.email}</strong>.
                  </p>
                  <button
                    onClick={handleReset}
                    className="btn-accent px-6 py-2.5 rounded-lg text-xs font-bold shadow"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nom */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 font-display">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ex: Ibrahima Camara"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 font-display">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@exemple.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Téléphone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 font-display">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                      />
                    </div>

                    {/* Sujet */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 font-display">
                        Sujet de votre démarche *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2C5C] bg-white text-slate-800"
                      >
                        <option value="Demande de devis">Demande de devis</option>
                        <option value="Information projet">Information projet</option>
                        <option value="Partenariat">Partenariat</option>
                        <option value="Autre">Autre demande</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 font-display">
                      Votre Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Précisez votre demande, les spécificités du terrain ou le type d'intervention souhaité en Guinée..."
                      className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="consent-check"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="w-4 h-4 text-[#0B2C5C] rounded border-slate-300 focus:ring-[#0B2C5C]"
                    />
                    <label htmlFor="consent-check" className="text-xs text-slate-600">
                      J'accepte d'être recontacté(e) par l'équipe commerciale et technique du DA-TO GUINEE SA.
                    </label>
                  </div>

                  {/* Bouton Envoyer */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.consent}
                      className="btn-accent w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        <>
                          <span>Envoyer le message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Stylized Map Plan + Accès Conakry (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Location Card */}
            <div className="bg-[#0B2C5C] text-white rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#F5A623] uppercase tracking-wider font-display">
                  Localisation Stratégique
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  Kaloum, Conakry
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-white mb-2">
                Siège Central DA-TO GUINEE SA
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Situé au cœur du quartier des affaires de Conakry, notre siège regroupe notre bureau d'études, notre direction des travaux et le pôle juridique foncier.
              </p>

              {/* Stylized Simulated Map Container */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-blue-900 bg-slate-900 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#F5A623] text-[#0B2C5C] mx-auto flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div className="bg-[#07172E]/90 px-4 py-2 rounded-lg border border-blue-800/80 backdrop-blur-sm">
                    <span className="text-xs font-bold text-white block">
                      Immeuble DA-TO · Boulevard du Commerce
                    </span>
                    <span className="text-[10px] text-slate-300">
                      Coordonnées GPS : 9.5092° N, 13.7122° O
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Accès sécurisé avec parking visiteurs</span>
                <a
                  href="https://maps.google.com/?q=Conakry,Guinea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5A623] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Ouvrir sur Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick response note */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 font-display">
                  Engagement de Réactivité sous 24h
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Nos ingénieurs examinent chaque demande pour vous orienter vers la direction de travaux adéquate.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3.5. Professional Corporate Team & Office View (Requirement 5) */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl relative bg-slate-900 border border-slate-200">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0B2C5C]/90 via-[#0B2C5C]/70 to-transparent flex items-center p-8 sm:p-12 lg:p-16">
              <div className="max-w-xl space-y-4">
                <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase block font-display">
                  EXCELLENCE & DIRECTION TECHNIQUE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
                  Notre Équipe d'Ingénieurs & Experts Fonciers à Conakry
                </h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Au service des grands projets d'infrastructure et de développement immobilier en Guinée, nos équipes pluridisciplinaires vous garantissent rigueur, transparence et respect des normes internationales HSE.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <div className="px-4 py-2 rounded-lg bg-[#F5A623] text-[#0B2C5C] font-bold text-xs">
                    Bureau d'Études & Chantier
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white/10 text-white font-bold text-xs backdrop-blur-sm">
                    100% Conforme HSE
                  </div>
                </div>
              </div>
            </div>
            <img 
              src="/uploaded-images/hse_safety_team_1790975150296.jpg" 
              alt="Équipe technique professionnelle du DA-TO GUINEE SA" 
              className="w-full h-[380px] sm:h-[440px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 4. Section "Suivez-nous" avec icônes réseaux sociaux en grand */}
      <section className="py-16 bg-[#0B2C5C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase mb-2 block font-display">
            Communauté & Actualité Chantier
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-3">
            Suivez le DA-TO GUINEE SA sur les Réseaux Sociaux
          </h2>

          <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-10">
            Découvrez nos vidéos exclusives de chantiers en Guinée, nos reportages d'ingénierie et nos nouvelles opportunités de lotissements viabilisés.
          </p>

          {/* Grandes icônes sociales avec badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-[#F5A623] hover:text-[#0B2C5C] text-white p-6 rounded-2xl border border-white/10 hover:border-[#F5A623] transition-all flex flex-col items-center justify-center gap-3 group card-hover"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-[#0B2C5C] group-hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold font-display">LinkedIn</span>
              <span className="text-[11px] text-slate-400 group-hover:text-[#0B2C5C]/80 font-medium">5,2k Abonnés</span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-[#F5A623] hover:text-[#0B2C5C] text-white p-6 rounded-2xl border border-white/10 hover:border-[#F5A623] transition-all flex flex-col items-center justify-center gap-3 group card-hover"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-[#0B2C5C] group-hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold font-display">Facebook</span>
              <span className="text-[11px] text-slate-400 group-hover:text-[#0B2C5C]/80 font-medium">18k Abonnés</span>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-[#F5A623] hover:text-[#0B2C5C] text-white p-6 rounded-2xl border border-white/10 hover:border-[#F5A623] transition-all flex flex-col items-center justify-center gap-3 group card-hover"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-[#0B2C5C] group-hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold font-display">YouTube</span>
              <span className="text-[11px] text-slate-400 group-hover:text-[#0B2C5C]/80 font-medium">Chaîne Vidéos</span>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-[#F5A623] hover:text-[#0B2C5C] text-white p-6 rounded-2xl border border-white/10 hover:border-[#F5A623] transition-all flex flex-col items-center justify-center gap-3 group card-hover"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-[#0B2C5C] group-hover:text-white flex items-center justify-center transition-colors">
                <Share2 className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold font-display">TikTok</span>
              <span className="text-[11px] text-slate-400 group-hover:text-[#0B2C5C]/80 font-medium">En immersion</span>
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-[#F5A623] hover:text-[#0B2C5C] text-white p-6 rounded-2xl border border-white/10 hover:border-[#F5A623] transition-all flex flex-col items-center justify-center gap-3 group card-hover"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-[#0B2C5C] group-hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold font-display">Twitter / X</span>
              <span className="text-[11px] text-slate-400 group-hover:text-[#0B2C5C]/80 font-medium">@GroupeDaTo</span>
            </a>

          </div>

        </div>
      </section>

    </div>
  );
};
