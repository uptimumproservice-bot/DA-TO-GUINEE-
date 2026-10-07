import React from 'react';
import { X, ShieldCheck, Scale, FileText } from 'lucide-react';
import { CONTACT_COORDINATES } from '../data/siteData';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0B2C5C] text-white p-5 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-[#F5A623]" />
            <h2 id="legal-modal-title" className="text-lg sm:text-xl font-bold font-display text-white">
              Mentions Légales & Réglementation
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          
          <div>
            <h3 className="text-base font-bold text-[#0B2C5C] font-display mb-2 flex items-center gap-2">
              <Building2Icon className="w-4 h-4 text-[#F5A623]" />
              1. Identité de l'Entreprise
            </h3>
            <p>
              Le présent site internet est édité par la société DA-TO GUINEE SA (Société Anonyme de droit guinéen), dont le siège social est situé à Lambanyi Carrefour TMI, Conakry, République de Guinée, immatriculée au Registre du Commerce et du Crédit Mobilier (RCCM) de Conakry.
            </p>
            <ul className="mt-2 space-y-1 text-xs text-slate-600 list-disc list-inside">
              <li><strong>Siège social :</strong> {CONTACT_COORDINATES.address}</li>
              <li><strong>NIF :</strong> 100984523T</li>
              <li><strong>Téléphone :</strong> {CONTACT_COORDINATES.phone1}</li>
              <li><strong>Email officiel :</strong> {CONTACT_COORDINATES.email}</li>
              <li><strong>Directeur de publication :</strong> La Direction Générale de DA-TO GUINEE SA</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#0B2C5C] font-display mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
              2. Sécurisation Foncière & Agréments BTP
            </h3>
            <p>
              DA-TO GUINEE SA opère en stricte conformité avec le Code Foncier et Domanial de la République de Guinée, ainsi que les cahiers des charges techniques du Ministère des Travaux Publics et des Infrastructures et du Ministère de l'Urbanisme, de l'Habitat et de l'Aménagement du Territoire.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#0B2C5C] font-display mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F5A623]" />
              3. Protection des Données Personnelles
            </h3>
            <p>
              Les informations recueillies via les formulaires de devis et de contact font l'objet d'un traitement informatique exclusivement destiné à la gestion commerciale et technique de vos projets. Vos données ne sont en aucun cas cédées ou commercialisées à des tiers.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary px-5 py-2 rounded-lg text-xs font-semibold"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};

function Building2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="24" 
      height="24" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v8" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
