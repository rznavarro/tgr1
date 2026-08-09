import React from 'react';
import { Crown, UserCheck, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const FEATURES = [
    {
      icon: Crown,
      title: 'Listados Exclusivos',
      subtitle: 'Elite Listings',
      description: 'Inmuebles únicos seleccionados bajo los estándares más exigentes de ubicación, arquitectura y diseño refinado.',
    },
    {
      icon: UserCheck,
      title: 'Asesores Personales',
      subtitle: 'Personal Advisors',
      description: 'Acompañamiento VIP personalizado uno a uno para compradores, vendedores e inversores patrimoniales.',
    },
    {
      icon: TrendingUp,
      title: 'Inteligencia de Mercado',
      subtitle: 'Market Intelligence',
      description: 'Tasaciones respaldadas por analítica constante del mercado inmobiliario argentino e internacional.',
    },
    {
      icon: ShieldCheck,
      title: 'Transacciones Seguras',
      subtitle: 'Secure Transactions',
      description: 'Resguardo jurídico, notarial y confidencialidad garantizada en cada etapa del proceso de compraventa.',
    },
  ];

  return (
    <section id="nosotros" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sello TGR Propiedades</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Por Qué Elegir TGR
        </h2>
        <p className="text-sm text-gray-400 font-light">
          Redefiniendo la experiencia inmobiliaria de lujo con precisión, confidencialidad y excelencia profesional.
        </p>
      </div>

      {/* Feature Grid inspired by reference image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="bg-[#121418] rounded-2xl border border-white/10 p-6 text-center space-y-4 hover:border-[#d4af37]/50 hover:bg-white/[0.07] transition-all duration-300 group shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mx-auto text-[#d4af37] group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-[#0d0f12] transition-all duration-300">
                <Icon className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {feat.title}
                </h3>
                <span className="text-[11px] text-[#d4af37] font-sans font-medium tracking-widest uppercase block mt-0.5">
                  {feat.subtitle}
                </span>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
};
