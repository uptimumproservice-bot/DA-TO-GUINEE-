import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Shield, Lock, Eye, Database, CheckCircle2, Mail, Phone } from 'lucide-react';
import { CONTACT_COORDINATES } from '../data/siteData';

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité — DA-TO GUINEE SA</title>
        <meta name="description" content="Politique de protection des données personnelles et de confidentialité du DA-TO GUINEE SA pour ses clients, partenaires et utilisateurs en République de Guinée." />
        <link rel="canonical" href="https://groupe-dato.com/politique-confidentialite" />
      </Helmet>

      <main className="py-16 bg-slate-50 dark:bg-[#071933] min-h-screen transition-colors">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="bg-white dark:bg-[#0C254B] rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[#0B2C5C] dark:bg-[#0E3366] text-[#F5A623] dark:text-blue-300 border dark:border-white/20 flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2C5C] dark:text-white">
                  Politique de Confidentialité
                </h1>
                <p className="text-xs text-slate-500 dark:text-blue-200">Protection des données personnelles · DA-TO GUINEE SA</p>
              </div>
            </div>

            <div className="space-y-8 text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0B2C5C] dark:text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#F5A623] dark:text-blue-300" />
                  1. Introduction & Engagement
                </h2>
                <p>
                  DA-TO GUINEE SA accorde une importance capitale à la protection de la vie privée et des données personnelles de ses clients, investisseurs, partenaires et visiteurs de son site internet. La présente Politique de Confidentialité explicite la nature des données collectées, l'utilisation qui en est faite et les mesures de sécurité mises en œuvre.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0B2C5C] dark:text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#F5A623] dark:text-blue-300" />
                  2. Données collectées
                </h2>
                <p>
                  Nous collectons uniquement les informations que vous nous transmettez volontairement lors de vos demandes de devis, de contact ou d'échanges avec nos équipes :
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623] dark:text-blue-300 shrink-0 mt-1" />
                    <span><strong>Données d'identification :</strong> Nom, prénom, fonction, nom de l'entreprise (le cas échéant).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623] dark:text-blue-300 shrink-0 mt-1" />
                    <span><strong>Coordonnées :</strong> Adresse email, numéro de téléphone, adresse postale.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623] dark:text-blue-300 shrink-0 mt-1" />
                    <span><strong>Données de projet :</strong> Détails concernant vos chantiers BTP, besoins fonciers ou investissements immobiliers.</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0B2C5C] flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#F5A623]" />
                  3. Utilisation des données
                </h2>
                <p>
                  Les données recueillies sont strictement destinées au traitement interne de vos demandes par DA-TO GUINEE SA :
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-600">
                  <li>Étude technique et établissement de devis personnalisés sous 48h.</li>
                  <li>Suivi de relation client et accompagnement sur vos projets de construction et d'aménagement.</li>
                  <li>Amélioration continue de nos services et de notre portail web.</li>
                </ul>
                <p className="font-semibold text-[#0B2C5C] mt-2">
                  En aucun cas vos données personnelles ne sont vendues, louées ou cédées à des tiers à des fins commerciales.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0B2C5C]">
                  4. Sécurité & Contact
                </h2>
                <p>
                  DA-TO GUINEE SA met en œuvre des mesures de sécurité techniques et organisationnelles rigoureuses afin de protéger vos données contre toute perte, altération, divulgation ou accès non autorisé.
                </p>
                <p>
                  Pour toute question relative à notre politique de confidentialité ou pour exercer vos droits d'accès et de rectification, vous pouvez nous contacter :
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row gap-4 justify-between">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#F5A623]" />
                    {CONTACT_COORDINATES.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#F5A623]" />
                    {CONTACT_COORDINATES.phone1}
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
