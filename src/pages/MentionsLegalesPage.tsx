import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Scale, Building, ShieldCheck, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_COORDINATES } from '../data/siteData';

export default function MentionsLegalesPage() {
  return (
    <>
      <Helmet>
        <title>Mentions Légales — DA-TO GUINEE SA</title>
        <meta name="description" content="Mentions légales et informations réglementaires officielles du DA-TO GUINEE SA, entreprise de BTP, aménagement foncier et promotion immobilière en République de Guinée." />
        <link rel="canonical" href="https://groupe-dato.com/mentions-legales" />
      </Helmet>

      <main className="py-16 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-[#0B2C5C] text-[#F5A623] flex items-center justify-center font-bold">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2C5C]">
                  Mentions Légales
                </h1>
                <p className="text-xs text-slate-500">DA-TO GUINEE SA · Lambanyi Carrefour TMI, Conakry</p>
              </div>
            </div>

            <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0B2C5C] flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#F5A623]" />
                  1. Éditeur du site et identification de l'entreprise
                </h2>
                <p>
                  Le présent site internet institutionnel est édité par la société <strong>DA-TO GUINEE SA</strong> (Société Anonyme de droit guinéen), entreprise de référence spécialisée dans le BTP, le développement foncier et la promotion immobilière, dont le siège social est situé à <strong>Lambanyi Carrefour TMI, Conakry, République de Guinée</strong>, immatriculée au Registre du Commerce et du Crédit Mobilier (RCCM).
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 mt-3">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F5A623] shrink-0" />
                    <span><strong>Siège social :</strong> {CONTACT_COORDINATES.address}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#F5A623] shrink-0" />
                    <span><strong>Téléphone :</strong> {CONTACT_COORDINATES.phone1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#F5A623] shrink-0" />
                    <span><strong>Email :</strong> {CONTACT_COORDINATES.email}</span>
                  </li>
                  <li>
                    <span><strong>RCCM :</strong> Conakry / Guinée</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0B2C5C] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#F5A623]" />
                  2. Direction de la publication & Hébergement
                </h2>
                <p>
                  <strong>Directeur de la publication :</strong> La Direction Générale du DA-TO GUINEE SA.<br />
                  <strong>Hébergement :</strong> Cloud sécurisé haute performance (Infrastructure Cloud Run / Vercel Enterprise).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0B2C5C] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F5A623]" />
                  3. Propriété intellectuelle & Conformité réglementaire
                </h2>
                <p>
                  L'ensemble des contenus (textes, images, graphismes, logos, icônes, vidéos, structures) affichés sur ce site est la propriété exclusive du DA-TO GUINEE SA ou de ses partenaires. Toute reproduction, représentation, modification ou exploitation totale ou partielle, par quelque procédé que ce soit, est formellement interdite sans l'autorisation écrite préalable du DA-TO GUINEE SA.
                </p>
                <p>
                  Le DA-TO GUINEE SA exerce ses activités de BTP, d'aménagement foncier et de valorisation immobilière en stricte conformité avec la législation en vigueur en République de Guinée (Code Foncier et Domanial, normes techniques du Ministère des Travaux Publics).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0B2C5C]">
                  4. Limitation de responsabilité
                </h2>
                <p>
                  Les informations fournies sur ce site le sont à titre indicatif. Le DA-TO GUINEE SA s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées, mais ne saurait garantir l'exhaustivité ou l'actualité absolue des données présentées.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
