import React, { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import {
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Globe,
  HardHat,
  Building2,
  Layers,
  Award,
  ArrowRight,
  Eye,
  FileCheck,
} from 'lucide-react';
import { BROCHURES_DATA, BrochureDocument, downloadBrochurePDF, OFFICIAL_CONTACT_INFO } from '@/utils/generateBrochurePDF';
import { DownloadCenterModal } from '@/components/DownloadCenterModal';

export default function CataloguesPage() {
  const [selectedDocId, setSelectedDocId] = useState<string>('corporate-profile');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeDoc = BROCHURES_DATA.find((d) => d.id === selectedDocId) || BROCHURES_DATA[0];

  const handleOpenModal = (docId: string) => {
    setSelectedDocId(docId);
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Catalogues & Documentations Officielles — DA-TO GUINÉE SA</title>
        <meta
          name="description"
          content="Espace officiel de téléchargement des catalogues, fiches techniques BTP, guides fonciers et plaquettes institutionnelles du Groupe DA-TO GUINÉE SA à Conakry."
        />
        <link rel="canonical" href="https://datoguinee.com/catalogues" />
      </Helmet>

      <main className="pt-24 pb-20 bg-slate-50 dark:bg-[#071933] transition-colors">
        {/* Banner Section */}
        <section className="relative py-16 md:py-20 bg-[#0B2C5C] text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#F5A623] uppercase tracking-wider mb-4 border border-white/10">
                <FileText className="w-4 h-4" />
                <span>Espace Documentation Officiel</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                Catalogues & Plaquettes Techniques
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Retrouvez l’ensemble des fiches techniques détaillées, spécifications matérielles, guides de viabilisation foncière et chartes de sécurité du Groupe DA-TO GUINÉE SA.
              </p>
            </div>
          </div>
        </section>

        {/* Main Documentation Catalog Grid */}
        <section className="py-16 container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-7xl mx-auto">
            {/* Left Selection List (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2">
                Sélectionnez une plaquette ({BROCHURES_DATA.length})
              </h2>

              <div className="space-y-3">
                {BROCHURES_DATA.map((doc) => {
                  const isSelected = doc.id === selectedDocId;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-4 cursor-pointer ${
                        isSelected
                          ? 'bg-white dark:bg-[#0C254B] border-[#F5A623] shadow-lg ring-2 ring-[#F5A623]'
                          : 'bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/10 bg-slate-100">
                        <img src={doc.imageUrl} alt={doc.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5A623] block mb-0.5">
                          {doc.category}
                        </span>
                        <h3 className="text-sm font-bold text-[#0B2C5C] dark:text-white truncate">
                          {doc.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          PDF · {doc.sizeMB} · Version {doc.version}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Official Seal Card */}
              <div className="p-6 rounded-2xl bg-[#0B2C5C] text-white border border-white/10 shadow-md text-center space-y-3 mt-6">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623]">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold tracking-tight">Documents Authentiques & Certifiés</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Chaque document délivré comporte l’en-tête officiel, l’adresse exacte du siège et les spécifications certifiées par nos ingénieurs.
                </p>
                <div className="text-[11px] font-mono text-[#F5A623] bg-white/10 py-1.5 px-3 rounded-lg inline-block">
                  Conakry, Lambanyi, Carrefour TMI
                </div>
              </div>
            </div>

            {/* Right Detailed View (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-[#0C254B] rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-white/10 shadow-xl space-y-8">
              {/* Header Info */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#0B2C5C] text-white text-xs font-bold uppercase tracking-wider">
                    {activeDoc.category}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    Document Officiel — {OFFICIAL_CONTACT_INFO.companyName}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2C5C] dark:text-white leading-snug mb-3">
                  {activeDoc.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200/80 dark:border-white/10">
                  {activeDoc.description}
                </p>
              </div>

              {/* High Definition Feature Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-md h-64 sm:h-80 border border-slate-200 dark:border-white/10 group">
                <img
                  src={activeDoc.imageUrl}
                  alt={activeDoc.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C5C]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                    <span>Conforme aux normes du Groupe DA-TO GUINÉE SA</span>
                  </div>
                  <span className="text-xs bg-black/40 backdrop-blur-xs px-3 py-1 rounded font-mono">
                    {activeDoc.sizeMB}
                  </span>
                </div>
              </div>

              {/* Gallery Images Grid */}
              {activeDoc.galleryImages && activeDoc.galleryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {activeDoc.galleryImages.map((gImg, gIdx) => (
                    <div key={gIdx} className="h-36 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/10">
                      <img src={gImg} alt={activeDoc.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Expanded Detailed Sections */}
              <div className="space-y-6 pt-2 border-t border-slate-100 dark:border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B2C5C] dark:text-[#F5A623]">
                  Contenu détaillé du catalogue :
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeDoc.sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-2"
                    >
                      <h4 className="text-sm font-bold text-[#0B2C5C] dark:text-amber-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0" />
                        <span>{sec.title}</span>
                      </h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-5 list-disc leading-relaxed">
                        {sec.content.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Contact & Download Action Bar */}
              <div className="p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 w-full sm:w-auto">
                  <p className="font-bold text-[#0B2C5C] dark:text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span>{OFFICIAL_CONTACT_INFO.address}</span>
                  </p>
                  <p className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#F5A623]" />
                      {OFFICIAL_CONTACT_INFO.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#F5A623]" />
                      {OFFICIAL_CONTACT_INFO.email}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => downloadBrochurePDF(activeDoc)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0B2C5C] hover:bg-[#07172E] text-white text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#F5A623]" />
                    <span>Télécharger la plaquette (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal preview */}
        <DownloadCenterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialDocId={selectedDocId}
        />
      </main>
    </>
  );
}
