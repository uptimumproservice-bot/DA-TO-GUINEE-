import React, { useState } from 'react';
import { X, CheckCircle2, Send, Building2, MapPin, Phone, Mail, User } from 'lucide-react';
import { QuoteFormData } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPole?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ 
  isOpen, 
  onClose,
  defaultPole = 'BTP & Infrastructures' 
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    pole: defaultPole,
    projectType: 'Génie civil & Bâtiment',
    location: 'Grand Conakry',
    budgetRange: '50M - 200M GNF',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Veuillez remplir l’ensemble des coordonnées requises.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0B2C5C] text-white p-5 sm:p-6 flex items-center justify-between border-b border-blue-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F5A623] mb-1">
              <Building2 className="w-4 h-4" />
              <span>DA-TO GUINEE SA · ÉTUDE DE FAISABILITÉ & CHIFFRAGE</span>
            </div>
            <h2 id="quote-modal-title" className="text-xl sm:text-2xl font-bold font-display text-white">
              Demander un devis personnalisé
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Nos ingénieurs et experts fonciers analysent votre projet sous 48h ouvrées.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200 select-none cursor-pointer"
            aria-label="Fermer le formulaire de devis"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B2C5C] font-display">
                Demande de devis enregistrée avec succès !
              </h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Merci <strong>{formData.fullName}</strong>. Votre dossier a été transmis à notre direction technique à Conakry. Un ingénieur conseil prendra contact avec vous dans les 48 heures au <strong>{formData.phone}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="btn-accent px-6 py-2.5 rounded-lg text-sm font-bold shadow"
                >
                  Fermer cette fenêtre
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pôle d'activité */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pôle d'activité concerné *
                  </label>
                  <select
                    value={formData.pole}
                    onChange={(e) => setFormData({ ...formData, pole: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C] bg-white text-slate-800"
                  >
                    <option value="BTP & Infrastructures">BTP & Infrastructures</option>
                    <option value="Développement Foncier & Aménagement">Développement Foncier & Aménagement</option>
                    <option value="Immobilier & Valorisation">Immobilier & Valorisation</option>
                    <option value="Projet Global / Mixte">Projet Global / Mixte</option>
                  </select>
                </div>

                {/* Type de projet */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Typologie de mission *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C] bg-white text-slate-800"
                  >
                    <option value="Génie civil & Bâtiment">Génie civil & Bâtiment neuf</option>
                    <option value="Voirie & Réseaux Divers (VRD)">Voirie & Réseaux Divers (VRD)</option>
                    <option value="Bornage, Titre Foncier & Topographie">Bornage, Titre Foncier & Topographie</option>
                    <option value="Viabilisation de lotissement">Viabilisation de lotissement</option>
                    <option value="Promotion / Achat d'immeuble">Promotion / Acquisition immobilière</option>
                    <option value="Autre demande technique">Autre demande technique</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Localisation en Guinée */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Localisation du projet en Guinée *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ex: Kaloum, Dixinn, Coyah, Boké..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                    />
                  </div>
                </div>

                {/* Budget estimatif */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Enveloppe budgétaire prévisionnelle
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C] bg-white text-slate-800"
                  >
                    <option value="Moins de 50M GNF">Moins de 50M GNF</option>
                    <option value="50M - 200M GNF">50M - 200M GNF</option>
                    <option value="200M - 1 Milliard GNF">200M - 1 Milliard GNF</option>
                    <option value="Plus de 1 Milliard GNF">Plus de 1 Milliard GNF</option>
                    <option value="En cours d'évaluation">En cours d'évaluation</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                  Vos coordonnées de contact
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ex: Mamadou Diallo"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Téléphone (avec indicatif) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+224 6XX XX XX XX"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Adresse Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@entreprise.com"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message / Description */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Description succincte de votre besoin ou cahier des charges
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Surface du terrain, nombre d'étages, contraintes géotechniques ou calendrier souhaité..."
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C] text-sm"
                />
              </div>

              {/* Footer CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Données protégées · Confidentialité garantie
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors text-xs font-medium"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-accent px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow"
                  >
                    {isSubmitting ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <span>Transmettre ma demande</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
