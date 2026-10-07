import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, Minimize2 } from 'lucide-react';

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
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 bg-[#F5A623] hover:bg-[#e0951a] text-[#0B2C5C] p-2.5 sm:px-3 sm:py-2 rounded-full shadow-lg flex items-center gap-1.5 font-bold transition-all duration-300 hover:scale-105 border-2 border-white group text-xs"
          aria-label="Assistant IA DA-TO GUINEE SA"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="hidden sm:inline text-xs">Expert IA DA-TO GUINEE SA</span>
        </button>
      )}

      {/* Chat Window Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-[#0B2C5C] text-white p-4 flex items-center justify-between border-b border-blue-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F5A623] text-[#0B2C5C] flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Assistant Expert DA-TO GUINEE SA</h3>
                <span className="text-[11px] text-[#F5A623] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  En ligne · Propulsé par Gemini
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
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#0B2C5C] text-[#F5A623] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === 'user'
                      ? 'bg-[#0B2C5C] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#F5A623] text-[#0B2C5C] flex items-center justify-center shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-[#0B2C5C] text-[#F5A623] flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white text-slate-500 border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 text-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#F5A623]" />
                  <span>Réflexion en cours...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => setInput(sug)}
                  className="text-xs bg-white text-slate-700 hover:text-[#0B2C5C] hover:bg-amber-50 border border-slate-200 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question sur le DA-TO GUINEE SA..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-[#0B2C5C] hover:bg-blue-900 text-white p-2.5 rounded-xl disabled:opacity-50 transition-all flex items-center justify-center"
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
