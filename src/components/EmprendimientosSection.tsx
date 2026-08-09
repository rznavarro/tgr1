import React from 'react';
import { Building, Sparkles, Download, ArrowRight, ShieldCheck, Check } from 'lucide-react';

const EMPRENDIMIENTOS = [
  {
    id: 'emp-1',
    title: 'Madero Harbour Residences',
    location: 'Dique 1, Puerto Madero',
    status: 'En Construcción (Pozo)',
    completion: '2026',
    priceFromUSD: 420000,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    description: 'Torre de 38 pisos proyectada por Carlos Ott. Unidades de 1, 2 y 3 dormitorios con terrazas privadas al dique y helipuerto.',
    units: 'Residencias de 90 a 350 m²',
    financing: 'Anticipo 30% + 36 cuotas en USD o CAC'
  },
  {
    id: 'emp-2',
    title: 'Chateau San Isidro Residences',
    location: 'Bajo San Isidro, Zona Norte',
    status: 'Lanzamiento Exclusivo',
    completion: '2027',
    priceFromUSD: 380000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'Masterplan de baja densidad rodeado de parques centenarios y amarraderos sobre el canal del río.',
    units: 'Casas en altura con jardín de 150 a 400 m²',
    financing: 'Financiación directa de pozo'
  },
  {
    id: 'emp-3',
    title: 'Grand Bay Tower Palermo',
    location: 'Av. Libertador & Sinclair, Palermo Chico',
    status: 'Últimas Unidades',
    completion: '2025',
    priceFromUSD: 510000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Edificio de gran jerarquía con vistas despejadas a los Bosques de Palermo y amenities 6 estrellas.',
    units: 'Pisos completos de 220 m²',
    financing: 'Entrega inmediata / Plan flexible'
  }
];

interface EmprendimientosSectionProps {
  onOpenValuation: () => void;
}

export const EmprendimientosSection: React.FC<EmprendimientosSectionProps> = ({ onOpenValuation }) => {
  return (
    <section id="emprendimientos" className="py-20 bg-[#0d0f12] border-t border-b border-white/10 relative overflow-hidden">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            <span>Desarrollos Inmobiliarios & Pozo</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Emprendimientos Exclusivos
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light">
            Oportunidades únicas de inversión en proyectos icónicos de pozo con máxima plusvalía en Buenos Aires y Zona Norte.
          </p>
        </div>

        {/* Emprendimientos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EMPRENDIMIENTOS.map((emp) => (
            <div
              key={emp.id}
              className="bg-[#121418] rounded-2xl border border-white/10 hover:border-[#d4af37]/50 overflow-hidden group transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={emp.image}
                    alt={emp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-black/40" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#d4af37] text-[#0d0f12] text-[10px] font-bold uppercase tracking-wider shadow">
                    {emp.status}
                  </span>

                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white text-xs font-medium">
                    Entrega {emp.completion}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs text-[#d4af37] font-semibold">{emp.location}</span>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors">
                      {emp.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {emp.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tipologías:</span>
                      <span className="font-semibold">{emp.units}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Financiación:</span>
                      <span className="text-[#d4af37] font-semibold">{emp.financing}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">Desde</span>
                  <span className="text-lg font-serif font-bold text-[#d4af37]">
                    USD ${emp.priceFromUSD.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={onOpenValuation}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Solicitar Planos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
