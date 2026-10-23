import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, MapPin, Phone, Mail, Eye } from 'lucide-react';
import { BROCHURES_DATA, downloadBrochurePDF, OFFICIAL_CONTACT_INFO } from '../utils/generateBrochurePDF';
import { DownloadCenterModal } from './DownloadCenterModal';

export const DownloadCenterSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string>('corporate-profile');

  const openModal = (docId: string) => {
    setSelectedDocId(docId);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-slate-50 dark:bg-[#071933]/80 border-t border-b border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2C5C]/10 text-[#0B2C5C] dark:bg-white/10 dark:text-[#F5A623] text-xs font-semibold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Catalogues & Plaquettes Officiel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C5C] dark:text-white tracking-tight">
              Espace Documentation & Plaquettes
            </h2>
            <div className="w-12 h-1 bg-[#F5A623] mx-auto mt-4 rounded-full" />
            <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
              Consultez et téléchargez les présentations détaillées de nos 3 pôles d’activité ainsi que notre charte de conformité HSE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {BROCHURES_DATA.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl bg-white dark:bg-[#0C254B] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#F5A623] transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Header Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={doc.imageUrl}
                      alt={doc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C5C]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B2C5C]/90 text-white backdrop-blur-xs px-2.5 py-1 rounded border border-white/20">
                        {doc.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                      {doc.sizeMB}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0B2C5C] dark:text-white mb-2 group-hover:text-[#F5A623] transition-colors leading-snug">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {doc.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3 h-3 text-[#F5A623] shrink-0" />
                        <span className="truncate">{OFFICIAL_CONTACT_INFO.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => downloadBrochurePDF(doc)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B2C5C] text-white hover:bg-[#07172E] text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span>Télécharger (PDF)</span>
                  </button>

                  <button
                    onClick={() => openModal(doc.id)}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    title="Aperçu rapide"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DownloadCenterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDocId={selectedDocId}
      />
    </>
  );
};
