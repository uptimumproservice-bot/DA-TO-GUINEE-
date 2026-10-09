import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, Minimize2, BadgeCheck } from 'lucide-react';
import { ExpertIaEmblem } from './ExpertIaEmblem';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Bonjour ! Je suis l'assistant officiel certifié de DA-TO GUINEE SA. Spécialisé dans nos chantiers BTP, aménagements fonciers et promotions immobilières en République de Guinée, comment puis-je vous aider ?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages([...newMessages, { role: 'assistant', content: data.text }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: "Désolé, une erreur est survenue. Veuillez réessayer." }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "Impossible de joindre le serveur. Vérifiez votre connexion." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Quels sont vos projets BTP majeurs ?",
    "Expliquez-moi votre méthode en 7 étapes",
    "Comment investir dans l'immobilier à Conakry ?",
    "Quels sont vos engagements HSE ?"
  ];

  return (
    <>
      {/* Floating Trigger Button — corporate blue/gold with certified badge and blinking online indicator */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 bg-[#F5A623] hover:bg-[#e0951a] text-[#0B2C5C] dark:!bg-[#0B2C5C] dark:hover:!bg-[#144382] dark:text-white dark:border dark:border-blue-400/50 p-2 sm:px-3.5 sm:py-2.5 rounded-full shadow-lg dark:shadow-[0_4px_20px_rgba(11,44,92,0.45)] flex items-center gap-2.5 font-bold transition-colors duration-200 border-2 border-white group text-xs cursor-pointer select-none"
          aria-label="Assistant IA Certifié DA-TO GUINEE SA"
        >
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-[#071933] flex items-center justify-center p-1 shrink-0 border border-white/40 dark:border-blue-400/60 shadow-xs">
            <ExpertIaEmblem className="w-full h-full" />
            <span className="absolute -bottom-0.5 -right-0.5 bg-sky-500 rounded-full p-0.5 ring-1 ring-white">
              <BadgeCheck className="w-2.5 h-2.5 text-white" />
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-tight">
            <span>Expert IA DA-TO</span>
            <span title="Compte officiel certifié" className="inline-flex">
              <BadgeCheck className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 fill-sky-500 text-white shrink-0" />
            </span>
          </span>
          
          {/* Voyant clignotant d'activité En ligne */}
          <span className="relative flex h-2.5 w-2.5 items-center justify-center" title="En ligne">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 animate-online-blink ring-2 ring-white/70 dark:ring-blue-300/60" />
          </span>
        </button>
      )}

      {/* Chat Window Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] bg-white dark:bg-[#071933] rounded-2xl shadow-2xl border border-slate-200 dark:border-blue-500/30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300 dark:shadow-[0_20px_50px_rgba(37,99,235,0.35)]">
          {/* Header — corporate blue with certified badge */}
          <div className="bg-[#0B2C5C] dark:!bg-[#0B2C5C] text-white p-4 flex items-center justify-between border-b border-blue-900 dark:border-blue-500/30">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white dark:bg-[#071933] border border-white/40 dark:border-blue-400/60 flex items-center justify-center p-1.5 shrink-0 shadow-md">
                <ExpertIaEmblem className="w-full h-full" />
                <span className="absolute -bottom-0.5 -right-0.5 bg-sky-500 rounded-full p-0.5 ring-1.5 ring-white shadow-xs">
                  <BadgeCheck className="w-3 h-3 text-white" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-tight text-white">Assistant Expert DA-TO</h3>
                  <span title="Compte officiel certifié" className="inline-flex">
                    <BadgeCheck className="w-4 h-4 text-sky-400 fill-sky-500 text-white shrink-0 drop-shadow-xs" />
                  </span>
                </div>
                <div className="text-[11px] text-blue-200 dark:text-blue-300 flex items-center gap-2 mt-0.5">
                  {/* Voyant clignotant En ligne */}
                  <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                    <span className="relative flex h-2 w-2 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80 animate-ping" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 animate-online-blink ring-1 ring-white/60" />
                    </span>
                    En ligne
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-200 bg-sky-500/20 px-1.5 py-0.2 rounded-full border border-sky-400/30">
                    <BadgeCheck className="w-3 h-3 text-sky-300 fill-sky-500" />
                    Compte certifié
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer select-none"
              aria-label="Fermer"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Bandeau de certification officielle */}
          <div className="bg-[#05152b] text-blue-100 px-3.5 py-1.5 border-b border-blue-900/60 dark:border-blue-500/30 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 font-medium">
              <BadgeCheck className="w-3.5 h-3.5 text-sky-400 fill-sky-500 shrink-0" />
              <span className="text-slate-100">Compte officiel certifié · DA-TO GUINEE SA</span>
            </div>
            <span className="text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1.5 font-semibold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 animate-online-blink" />
              </span>
              En ligne 24/7
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-[#071933]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="relative w-7 h-7 rounded-full bg-white dark:bg-[#071933] border border-white/30 flex items-center justify-center p-1 shrink-0 mt-1 shadow-xs">
                    <ExpertIaEmblem className="w-full h-full" />
                    <span className="absolute -bottom-0.5 -right-0.5 bg-sky-500 rounded-full p-0.5 ring-1 ring-white">
                      <BadgeCheck className="w-2 h-2 text-white" />
                    </span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === 'user'
                      ? 'bg-[#0B2C5C] dark:bg-[#0E3E7E] text-white font-medium rounded-br-none dark:border dark:border-white/20'
                      : 'bg-white dark:bg-[#0C254B] text-slate-800 dark:text-white border border-slate-200 dark:border-white/15 rounded-bl-none'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-100 dark:border-white/10 text-[10px] text-slate-500 dark:text-blue-200/80 font-semibold">
                      <span>DA-TO Expert IA</span>
                      <span className="inline-flex items-center gap-0.5 text-sky-600 dark:text-sky-300">
                        <BadgeCheck className="w-3 h-3 text-sky-500 fill-sky-100 dark:fill-sky-900" />
                        Certifié
                      </span>
                    </div>
                  )}
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#0B2C5C] dark:bg-[#0E3E7E] text-white border border-white/30 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="relative w-7 h-7 rounded-full bg-white dark:bg-[#071933] border border-white/30 flex items-center justify-center p-1 shrink-0 mt-1">
                  <ExpertIaEmblem className="w-full h-full" />
                  <span className="absolute -bottom-0.5 -right-0.5 bg-sky-500 rounded-full p-0.5 ring-1 ring-white">
                    <BadgeCheck className="w-2 h-2 text-white" />
                  </span>
                </div>
                <div className="bg-white dark:bg-[#0C254B] text-slate-500 dark:text-blue-100 border border-slate-200 dark:border-white/15 rounded-2xl rounded-bl-none px-4 py-3 text-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#0B2C5C] dark:text-white" />
                  <span>Réflexion en cours...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-100 dark:bg-[#071933] border-t border-slate-200 dark:border-white/10 flex gap-1.5 overflow-x-auto no-scrollbar">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => setInput(sug)}
                  className="text-xs bg-white dark:bg-[#0B254E] text-slate-700 dark:text-white hover:text-[#0B2C5C] dark:hover:text-blue-200 border border-slate-200 dark:border-white/20 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#071933] border-t border-slate-200 dark:border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question sur le DA-TO GUINEE SA..."
              className="flex-1 bg-slate-100 dark:bg-[#0B254E] border border-slate-200 dark:border-white/20 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-blue-200/60 focus:outline-hidden focus:ring-2 focus:ring-[#0B2C5C] dark:focus:ring-white"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-[#0B2C5C] dark:bg-[#0E3E7E] hover:bg-blue-900 dark:hover:bg-[#1455a8] text-white p-2.5 rounded-xl disabled:opacity-50 transition-all flex items-center justify-center font-bold border dark:border-white/20 cursor-pointer"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
