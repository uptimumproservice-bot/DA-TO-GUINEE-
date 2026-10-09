import React, { useState } from 'react';
import { Phone, MessageSquare, X, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded quick drawer */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-white p-5 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-[#0B2C5C]">Contact Rapide</h4>
              <p className="text-[11px] text-slate-500">DA-TO GUINEE SA • Guinée</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors duration-200 select-none cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <a
              href="tel:+224628883030"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-[#0B2C5C] border border-slate-200/80 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0B2C5C] text-white flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left flex-1">
                <div className="text-xs font-bold">+224 628 88 30 30</div>
                <div className="text-[10px] text-slate-500">Appel direct Conakry</div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F5A623]" />
            </a>

            <a
              href="mailto:contact@datoguinee.com"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-[#0B2C5C] border border-slate-200/80 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F5A623] text-[#07172E] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left flex-1">
                <div className="text-xs font-bold truncate">contact@datoguinee.com</div>
                <div className="text-[10px] text-slate-500">Email commercial</div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F5A623]" />
            </a>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 block w-full py-2.5 px-4 text-center rounded-xl bg-[#0B2C5C] hover:bg-[#07172E] text-white text-xs font-bold transition-all shadow-md"
            >
              Demander une étude / devis
            </Link>
          </div>
        </div>
      )}

      {/* Floating trigger button with pulsing ripple effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir le contact rapide"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#F5A623] hover:bg-[#e09415] text-[#07172E] shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-amber-300/50"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#F5A623] opacity-40 animate-ping pointer-events-none" />
        
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <MessageSquare className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
};
