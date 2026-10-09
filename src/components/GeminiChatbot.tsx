import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, Minimize2 } from 'lucide-react';
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
      content: "Bonjour ! Je suis l'assistant virtuel expert de DA-TO GUINEE SA. Comment puis-je vous aider ?",
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
      {/* Floating Trigger Button — maintains corporate blue in dark mode with attached emblem */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 bg-[#F5A623] hover:bg-[#e0951a] text-[#0B2C5C] dark:!bg-[#0B2C5C] dark:hover:!bg-[#144382] dark:text-white dark:border dark:border-white/30 p-2 sm:px-3 sm:py-2 rounded-full shadow-2xl flex items-center gap-2.5 font-bold transition-all duration-300 hover:scale-105 border-2 border-white group text-xs cursor-pointer"
          aria-label="Assistant IA DA-TO GUINEE SA"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black flex items-center justify-center p-1 shrink-0 border border-white/40 overflow-hidden shadow-xs">
            <ExpertIaEmblem className="w-full h-full text-black" />
          </div>
          <span className="hidden sm:inline text-xs font-semibold">Expert IA DA-TO GUINEE SA</span>
        </button>
      )}

      {/* Chat Window Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] bg-white dark:bg-[#071933] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header — maintains corporate blue in dark mode with attached emblem */}
          <div className="bg-[#0B2C5C] dark:!bg-[#0B2C5C] text-white p-4 flex items-center justify-between border-b border-blue-900 dark:border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-black border border-white/40 flex items-center justify-center p-1.5 overflow-hidden shrink-0 shadow-md">
                <ExpertIaEmblem className="w-full h-full text-black" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight text-white">Assistant Expert DA-TO GUINEE SA</h3>
                <span className="text-[11px] text-blue-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  En ligne · IA DA-TO
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fermer"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-[#071933]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-white text-black border border-white/30 flex items-center justify-center p-1 shrink-0 mt-1 shadow-xs overflow-hidden">
                    <ExpertIaEmblem className="w-full h-full text-black" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === 'user'
                      ? 'bg-[#0B2C5C] dark:bg-[#0E3E7E] text-white font-medium rounded-br-none dark:border dark:border-white/20'
                      : 'bg-white dark:bg-[#0C254B] text-slate-800 dark:text-white border border-slate-200 dark:border-white/15 rounded-bl-none'
                  }`}
                >
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
                <div className="w-7 h-7 rounded-full bg-white text-black border border-white/30 flex items-center justify-center p-1 shrink-0 mt-1 overflow-hidden">
                  <ExpertIaEmblem className="w-full h-full text-black" />
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
