import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Loader2, Home, MessageSquare } from 'lucide-react';
import { Property } from '../types';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  properties,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: '¡Hola! Soy el Asesor Virtual Inteligente de TGR Propiedades. Contame qué tipo de inmueble, zona, presupuesto o estilo de vida estás buscando y te sugeriré las mejores opciones de nuestro catálogo exclusivo.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;

    const userText = inputPrompt;
    setInputPrompt('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: userText, properties }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al comunicarse con la IA');
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text || 'No se pudo generar una respuesta.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Error de conexión: ${err.message}. Verificá que la API key de Gemini esté configurada en los secretos de la plataforma.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#121418] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#0d0f12] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <span>Asesor Virtual TGR</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] font-sans font-bold">
                  GEMINI AI
                </span>
              </h3>
              <p className="text-[11px] text-gray-400">Recomendador inteligente de propiedades de lujo</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d0f12]/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-[#d4af37] text-[#0d0f12]' : 'bg-white/10 text-[#d4af37]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-1 ${
                  msg.sender === 'user'
                    ? 'bg-[#d4af37] text-[#0d0f12] font-semibold rounded-tr-none'
                    : 'bg-[#1a1e24] text-gray-200 border border-white/10 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 ${
                    msg.sender === 'user' ? 'text-[#0d0f12]/70' : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#d4af37]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#1a1e24] p-3 rounded-2xl border border-white/10 flex items-center gap-2 text-xs text-gray-300">
                <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                <span>Analizando catálogo de propiedades con IA...</span>
              </div>
            </div>
          )}
        </div>

        {/* Prompt Suggestions */}
        <div className="p-2.5 bg-[#0d0f12] border-t border-white/5 flex gap-2 overflow-x-auto text-[11px]">
          <button
            onClick={() => setInputPrompt('Busco un departamento exclusivo con vista al río en Puerto Madero')}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 shrink-0 cursor-pointer"
          >
            "Vista al río en Puerto Madero"
          </button>
          <button
            onClick={() => setInputPrompt('Quiero una casa con piscina en San Isidro o Nordelta por menos de 2M USD')}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 shrink-0 cursor-pointer"
          >
            "Casa con piscina en San Isidro / Nordelta"
          </button>
          <button
            onClick={() => setInputPrompt('¿Qué desarrollos de pozo tienen la mejor plusvalía en Buenos Aires?')}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 shrink-0 cursor-pointer"
          >
            "Desarrollos de pozo sugeridos"
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-[#0d0f12] border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Preguntale a la IA sobre propiedades, zonas o valores..."
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />
          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#0d0f12] disabled:opacity-50 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
