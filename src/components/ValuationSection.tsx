import React, { useState } from 'react';
import { Sparkles, Calculator, CheckCircle2, X, Send } from 'lucide-react';
import { ValuationForm } from '../types';

interface ValuationSectionProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ValuationSection: React.FC<ValuationSectionProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<ValuationForm>({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Departamento',
    neighborhood: '',
    address: '',
    approxArea: '',
    bedrooms: '3',
    comments: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <>
      {/* Valuation CTA Banner inspired by attached reference */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-r from-[#121418] via-[#1a1e24] to-[#121418] rounded-3xl border border-[#d4af37]/40 p-8 sm:p-12 shadow-2xl overflow-hidden text-center space-y-6">
          
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs font-semibold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Tasaciones Profesionales TGR</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              ¿Querés vender o conocer el valor real de tu propiedad?
            </h2>

            <p className="text-sm text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
              Recibí un informe técnico confidencial elaborado por nuestros especialistas en el mercado inmobiliario de alta gama.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpen}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0d0f12] text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#d4af37]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Solicitar Tasación Privada Gratuita
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Valuation Request Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#121418] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-serif font-bold text-white">¡Solicitud de Tasación Recibida!</h3>
                <p className="text-sm text-gray-300">
                  Muchas gracias <strong>{formData.name}</strong>. Nuestro equipo de tasaciones de TGR Propiedades analizará la información de tu propiedad en <strong>{formData.neighborhood}</strong> y te contactará en las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider block">Servicio Confidencial</span>
                  <h3 className="text-xl font-serif font-bold text-white">Solicitar Tasación Privada</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Roberto Gomez"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 11 5555-0000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Email de Contacto *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@ejemplo.com"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Tipo de Propiedad</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Departamento" className="bg-[#121418]">Departamento / Piso</option>
                      <option value="Penthouse" className="bg-[#121418]">Penthouse</option>
                      <option value="Casa" className="bg-[#121418]">Casa / Villa</option>
                      <option value="Terreno" className="bg-[#121418]">Terreno / Lote</option>
                      <option value="Oficina" className="bg-[#121418]">Oficina Corporativa</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Barrio / Zona</label>
                    <input
                      type="text"
                      required
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      placeholder="Ej. Puerto Madero, Recoleta, San Isidro"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Superficie Aproximada (m²)</label>
                  <input
                    type="text"
                    value={formData.approxArea}
                    onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                    placeholder="Ej. 180 m² cubiertos"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Comentarios o Detalles Adicionales</label>
                  <textarea
                    rows={3}
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    placeholder="Estado de conservación, piso, vista, etc."
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0d0f12] text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitud de Tasación</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};
