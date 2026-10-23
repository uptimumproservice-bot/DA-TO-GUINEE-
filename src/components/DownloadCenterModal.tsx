import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, X, Check, ShieldCheck, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { BROCHURES_DATA, BrochureDocument, downloadBrochurePDF } from '../utils/generateBrochurePDF';

interface DownloadCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDocId?: string;
}

export const DownloadCenterModal: React.FC<DownloadCenterModalProps> = ({
  isOpen,
  onClose,
  initialDocId = 'corporate-profile',
}) => {
  const [selectedDoc, setSelectedDoc] = useState<BrochureDocument>(
    BROCHURES_DATA.find((d) => d.id === initialDocId) || BROCHURES_DATA[0]
  );
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});

  const handleDownload = (doc: BrochureDocument) => {
    downloadBrochurePDF(doc);
    setDownloadedIds((prev) => ({ ...prev, [doc.id]: true }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0C254B] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden text-slate-900 dark:text-white"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-[#0B2C5C] to-[#07172E] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5A623]/20 text-[#F5A623] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">Espace Téléchargements & Plaquettes</h3>
                <p className="text-xs text-white/70">Documents officiels et fiches techniques du Groupe DA-TO GUINÉE SA</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
            {/* Sidebar list */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-[#071933] p-4 border-r border-slate-200 dark:border-white/10 overflow-y-auto space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 px-2">
                Catalogues disponibles ({BROCHURES_DATA.length})
              </p>
              {BROCHURES_DATA.map((doc) => {
                const isActive = doc.id === selectedDoc.id;
                const isDownloaded = downloadedIds[doc.id];

                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-[#0C254B] border-[#F5A623] shadow-md ring-1 ring-[#F5A623]'
                        : 'bg-white/60 dark:bg-white/5 border-slate-200/80 dark:border-white/5 hover:bg-white dark:hover:bg-white/10'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-white/10 bg-slate-100">
                      <img src={doc.imageUrl} alt={doc.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5A623] truncate">
                          {doc.category}
                        </span>
                        {isDownloaded && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        PDF · {doc.sizeMB} · {doc.pagesCount} p.
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Document Preview Pane */}
            <div className="md:col-span-7 p-6 flex flex-col justify-between overflow-y-auto bg-white dark:bg-[#0C254B]">
              <div>
                {/* Visual Header Image */}
                <div className="relative rounded-xl overflow-hidden shadow-md h-36 mb-3 border border-slate-200/80 dark:border-white/10">
                  <img src={selectedDoc.imageUrl} alt={selectedDoc.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C5C]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#0B2C5C]/90 backdrop-blur-xs px-2.5 py-1 rounded border border-white/20">
                      {selectedDoc.category}
                    </span>
                    <span className="text-[11px] text-white/90 font-medium">
                      Version {selectedDoc.version}
                    </span>
                  </div>
                </div>

                {/* Gallery Images Grid */}
                {selectedDoc.galleryImages && selectedDoc.galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {selectedDoc.galleryImages.map((gImg, gIdx) => (
                      <div key={gIdx} className="h-20 rounded-lg overflow-hidden border border-slate-200/80 dark:border-white/10">
                        <img src={gImg} alt={selectedDoc.title} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <h3 className="text-xl font-extrabold text-[#0B2C5C] dark:text-white mb-2 leading-tight">
                  {selectedDoc.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed bg-slate-50 dark:bg-white/5 p-3.5 rounded-xl border border-slate-200/80 dark:border-white/10">
                  {selectedDoc.description}
                </p>

                <div className="space-y-3 mb-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Grandes lignes du document :
                  </h4>
                  {selectedDoc.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-xs font-bold text-[#0B2C5C] dark:text-amber-400">
                        • {sec.title}
                      </p>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5 pl-4 list-disc">
                        {sec.content.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Coordonnées officielles vérifiées */}
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#0B2C5C] dark:text-white">
                    <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span>{selectedDoc.address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#F5A623]" />
                      {selectedDoc.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#F5A623]" />
                      {selectedDoc.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Format PDF A4 · Prêt à imprimer
                </div>

                <button
                  onClick={() => handleDownload(selectedDoc)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B2C5C] hover:bg-[#07172E] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#F5A623]" />
                  <span>Télécharger (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
