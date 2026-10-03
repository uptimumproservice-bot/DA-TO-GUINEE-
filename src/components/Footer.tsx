import React from 'react';
import { PageId } from '../types';
import { LogoPlaceholder } from './LogoPlaceholder';
import { CONTACT_COORDINATES } from '../data/siteData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Linkedin, 
  Facebook, 
  Youtube, 
  Twitter, 
  Share2,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenLegalModal: () => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenLegalModal,
  onOpenQuoteModal
}) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B2C5C] text-slate-300 border-t border-blue-900/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-blue-900/60">
          
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="inline-block">
              <LogoPlaceholder variant="footer" />
            </div>
            
            <p className="text-white font-semibold text-base leading-snug font-display pt-2">
              Construire durablement.<br />
              Créer de la valeur.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Entreprise guinéenne de référence en BTP & Infrastructures, Aménagement foncier sécurisé et Promotion immobilière à Conakry et dans toute la République de Guinée.
            </p>

            {/* Guinean presence badge */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F7A3A]"></span>
              <span>Siège social : Kaloum, Conakry (Guinée)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase font-display mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#F5A623] rounded-full inline-block"></span>
              Navigation Rapide
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('accueil')}
                  className="hover:text-[#F5A623] transition-colors flex items-center gap-1.5 text-slate-300 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('a-propos')}
                  className="hover:text-[#F5A623] transition-colors flex items-center gap-1.5 text-slate-300 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                  À propos du Groupe
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('activites')}
                  className="hover:text-[#F5A623] transition-colors flex items-center gap-1.5 text-slate-300 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                  Nos 3 Pôles d'Activités
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('methode')}
                  className="hover:text-[#F5A623] transition-colors flex items-center gap-1.5 text-slate-300 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                  Notre Méthode (01 à 07)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('hse')}
                  className="hover:text-[#F5A623] transition-colors flex items-center gap-1.5 text-slate-300 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                  Engagements & HSE
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('actualites')}
                  className="hover:text-[#F5A623] transition-colors flex items-center gap-1.5 text-slate-300 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                  Actualités & Chantiers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#F5A623] transition-colors flex items-center gap-1.5 text-slate-300 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                  Contact & Accès
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordonnées officielles */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase font-display mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#F5A623] rounded-full inline-block"></span>
              Coordonnées
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5A623] shrink-0 mt-1" />
                <span className="leading-snug">
                  {CONTACT_COORDINATES.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F5A623] shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${CONTACT_COORDINATES.phone1}`} className="hover:text-[#F5A623] transition-colors">
                    {CONTACT_COORDINATES.phone1}
                  </a>
                  <a href={`tel:${CONTACT_COORDINATES.phone2}`} className="hover:text-[#F5A623] transition-colors text-xs text-slate-400">
                    {CONTACT_COORDINATES.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5A623] shrink-0" />
                <div className="flex flex-col">
                  <a href={`mailto:${CONTACT_COORDINATES.email}`} className="hover:text-[#F5A623] transition-colors">
                    {CONTACT_COORDINATES.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  {CONTACT_COORDINATES.hours}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Réseaux Sociaux & Devis direct */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase font-display mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#F5A623] rounded-full inline-block"></span>
              Suivez-nous & Devis
            </h3>
            
            <p className="text-xs text-slate-400 mb-3.5">
              Rejoignez nos communautés pour suivre nos réalisations de chantiers en direct :
            </p>

            {/* Social Icons list */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-blue-950 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F5A623] hover:text-[#0B2C5C] transition-all"
                title="Suivez DA-TO GUINEE SA sur LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-blue-950 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F5A623] hover:text-[#0B2C5C] transition-all"
                title="Suivez DA-TO GUINEE SA sur Facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-blue-950 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F5A623] hover:text-[#0B2C5C] transition-all"
                title="Chaîne YouTube DA-TO GUINEE SA"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-blue-950 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F5A623] hover:text-[#0B2C5C] transition-all"
                title="TikTok DA-TO GUINEE SA"
                aria-label="TikTok"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-blue-950 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F5A623] hover:text-[#0B2C5C] transition-all"
                title="Twitter / X DA-TO GUINEE SA"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Quick devis block */}
            <div className="bg-blue-950/70 p-3.5 rounded-lg border border-blue-900/60">
              <span className="text-xs text-[#F5A623] font-semibold block mb-1">
                Un projet d'envergure en Guinée ?
              </span>
              <p className="text-[11px] text-slate-400 mb-2">
                Étude technique et cotation personnalisée sous 48h ouvrées.
              </p>
              <button
                onClick={onOpenQuoteModal}
                className="w-full btn-accent py-2 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <span>Demander une étude gratuite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} DA-TO GUINEE SA. Tous droits réservés. RCCM Conakry · République de Guinée.
          </div>
          
          <div className="flex items-center gap-5">
            <button 
              onClick={onOpenLegalModal}
              className="hover:text-[#F5A623] transition-colors underline-offset-4 hover:underline"
            >
              Mentions Légales & RCCM
            </button>
            <span>·</span>
            <button 
              onClick={onOpenLegalModal}
              className="hover:text-[#F5A623] transition-colors underline-offset-4 hover:underline"
            >
              Politique de Confidentialité
            </button>
            <span>·</span>
            <button 
              onClick={() => handleNav('hse')}
              className="hover:text-[#F5A623] transition-colors flex items-center gap-1 text-[#F5A623]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Normes HSE & RSE
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
