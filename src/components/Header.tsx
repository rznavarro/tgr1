import React, { useState } from 'react';
import { Building2, Heart, Search, Menu, X, DollarSign, Bot, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenAiAdvisor: () => void;
  onOpenValuation: () => void;
  currency: 'USD' | 'ARS';
  onToggleCurrency: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoriteCount,
  onOpenFavorites,
  onOpenAiAdvisor,
  onOpenValuation,
  currency,
  onToggleCurrency,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f12]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] p-[1px] shadow-lg shadow-[#d4af37]/20 group-hover:shadow-[#d4af37]/40 transition-all">
            <div className="w-full h-full bg-[#0d0f12] rounded-[7px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#d4af37]" />
            </div>
          </div>
          <div>
            <span className="text-xl font-serif font-bold tracking-wider text-white flex items-center gap-1.5">
              TGR <span className="text-xs tracking-widest font-sans font-medium px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">PROPIEDADES</span>
            </span>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Luxury Real Estate</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button 
            onClick={() => handleNav('hero')} 
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <button 
            onClick={() => handleNav('propiedades')} 
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Propiedades
          </button>
          <button 
            onClick={() => handleNav('emprendimientos')} 
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Emprendimientos
          </button>
          <button 
            onClick={onOpenValuation} 
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Tasar Propiedad
          </button>
          <button 
            onClick={() => handleNav('nosotros')} 
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Nosotros
          </button>
          <button 
            onClick={() => handleNav('contacto')} 
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Contacto
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Currency Switcher */}
          <button
            onClick={onToggleCurrency}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37]/40 text-xs font-semibold text-gray-200 transition-all cursor-pointer"
            title="Cambiar Moneda (USD / ARS)"
          >
            <DollarSign className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Moneda: <strong className="text-[#d4af37]">{currency}</strong></span>
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37]/40 text-gray-300 hover:text-white transition-all cursor-pointer"
            title="Ver Favoritos Guardados"
          >
            <Heart className={`w-4 h-4 ${favoriteCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#0d0f12] text-[10px] font-bold flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* AI Advisor Trigger */}
          <button
            onClick={onOpenAiAdvisor}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 text-xs font-medium text-[#d4af37] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Asesor IA TGR</span>
          </button>

          {/* Book Tour CTA */}
          <button
            onClick={() => handleNav('propiedades')}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0d0f12] text-xs font-bold tracking-wide shadow-md shadow-[#d4af37]/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Agendar Visita
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
          >
            <Heart className={`w-5 h-5 ${favoriteCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d4af37] text-[#0d0f12] text-[9px] font-bold flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f12]/95 border-b border-white/10 px-4 pt-4 pb-6 space-y-4 backdrop-blur-xl">
          <div className="flex flex-col gap-3 font-medium text-gray-200">
            <button onClick={() => handleNav('hero')} className="text-left py-2 border-b border-white/5">Inicio</button>
            <button onClick={() => handleNav('propiedades')} className="text-left py-2 border-b border-white/5">Propiedades</button>
            <button onClick={() => handleNav('emprendimientos')} className="text-left py-2 border-b border-white/5">Emprendimientos</button>
            <button onClick={() => { onOpenValuation(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-white/5 text-[#d4af37]">Solicitar Tasación</button>
            <button onClick={() => handleNav('nosotros')} className="text-left py-2 border-b border-white/5">Nosotros</button>
            <button onClick={() => handleNav('contacto')} className="text-left py-2 border-b border-white/5">Contacto</button>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10 text-xs">
              <span className="text-gray-300">Moneda preferida:</span>
              <button 
                onClick={onToggleCurrency}
                className="px-3 py-1 rounded bg-[#d4af37] text-[#0d0f12] font-bold"
              >
                {currency}
              </button>
            </div>

            <button
              onClick={() => { onOpenAiAdvisor(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 border border-[#d4af37]/40 text-[#d4af37] font-semibold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consultar Asesor IA</span>
            </button>

            <button
              onClick={() => handleNav('propiedades')}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0d0f12] font-bold text-sm text-center"
            >
              Ver Catalogo Exclusivo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
