import React from 'react';
import { Search, MapPin, Home, DollarSign, SlidersHorizontal, Sparkles } from 'lucide-react';
import { OperationType, PropertyType, SearchFilterState } from '../types';
import { NEIGHBORHOODS } from '../data/mockProperties';
import tgrHeroMansion from '../assets/images/tgr_hero_mansion_1786243634629.jpg';

interface HeroProps {
  filterState: SearchFilterState;
  onFilterChange: (updates: Partial<SearchFilterState>) => void;
  onSearchSubmit: () => void;
  onOpenAdvancedFilters: () => void;
  activeFilterCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  filterState,
  onFilterChange,
  onSearchSubmit,
  onOpenAdvancedFilters,
  activeFilterCount,
}) => {
  const handleOperationSelect = (op: OperationType) => {
    onFilterChange({ operation: op });
  };

  return (
    <div id="hero" className="relative min-h-[85vh] flex flex-col justify-center items-center pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0d0f12]">
      
      {/* Background Hero Image with Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src={tgrHeroMansion}
          alt="TGR Propiedades Luxury Mansion"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110 transform transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/60 to-[#0d0f12]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0d0f12]/40 to-[#0d0f12]" />
      </div>

      {/* Hero Headline Content */}
      <div className="relative z-10 max-w-4xl text-center space-y-4 my-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold tracking-wider uppercase shadow-xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TGR Propiedades Exclusivas • Buenos Aires & Zona Norte</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
          EXPERIENCIA INMOBILIARIA <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#e2c275] bg-clip-text text-transparent">
            SIN LÍMITES
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
          El catálogo más distinguido de casas, penthouses, pisos frente al río y desarrollos de pozo en las zonas más codiciadas.
        </p>
      </div>

      {/* Floating Glassmorphic Search Bar (Luxury Search Bar) */}
      <div className="relative z-20 w-full max-w-5xl mt-4">
        <div className="bg-[#121418]/85 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80">
          
          {/* Operation Tabs (Venta, Alquiler, Temporario, Emprendimientos) */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-5">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'venta', label: 'Venta' },
                { id: 'alquiler', label: 'Alquiler' },
                { id: 'temporario', label: 'Alquiler Temporario' },
                { id: 'emprendimientos', label: 'Emprendimientos' },
              ].map((tab) => {
                const isActive = filterState.operation === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleOperationSelect(tab.id as OperationType)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#0d0f12] shadow-md shadow-[#d4af37]/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Search Query Input */}
            <div className="relative w-full sm:w-64 mt-2 sm:mt-0">
              <input
                type="text"
                placeholder="Buscar por palabra clave..."
                value={filterState.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
            </div>
          </div>

          {/* Search Dropdowns Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            
            {/* Location Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Ubicación</span>
              </label>
              <select
                value={filterState.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                {NEIGHBORHOODS.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#121418] text-white">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Tipo de Propiedad</span>
              </label>
              <select
                value={filterState.propertyType}
                onChange={(e) => onFilterChange({ propertyType: e.target.value as PropertyType })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="todos" className="bg-[#121418]">Todos los tipos</option>
                <option value="departamento" className="bg-[#121418]">Departamento</option>
                <option value="penthouse" className="bg-[#121418]">Penthouse / Piso</option>
                <option value="casa" className="bg-[#121418]">Casa / Villa</option>
                <option value="terreno" className="bg-[#121418]">Terreno / Lote</option>
                <option value="oficina" className="bg-[#121418]">Oficina Corporativa</option>
              </select>
            </div>

            {/* Budget Range Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Presupuesto (USD)</span>
              </label>
              <select
                value={`${filterState.minPriceUSD}-${filterState.maxPriceUSD}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-').map(Number);
                  onFilterChange({ minPriceUSD: min, maxPriceUSD: max });
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="0-5000000" className="bg-[#121418]">Cualquier presupuesto</option>
                <option value="0-500000" className="bg-[#121418]">Hasta USD 500.000</option>
                <option value="500000-1000000" className="bg-[#121418]">USD 500k - USD 1.0M</option>
                <option value="1000000-2000000" className="bg-[#121418]">USD 1.0M - USD 2.0M</option>
                <option value="2000000-5000000" className="bg-[#121418]">Más de USD 2.0M</option>
              </select>
            </div>

            {/* Actions: Advanced Filters & Main Search */}
            <div className="flex gap-2 pt-2 sm:pt-0">
              <button
                onClick={onOpenAdvancedFilters}
                className="relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#d4af37]/40 text-xs font-semibold text-gray-200 hover:text-white transition-all cursor-pointer"
                title="Filtros Avanzados"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
                <span className="hidden lg:inline">Filtros</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#0d0f12] text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <button
                onClick={onSearchSubmit}
                className="flex-[2] flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0d0f12] text-sm font-bold tracking-wide shadow-lg shadow-[#d4af37]/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
