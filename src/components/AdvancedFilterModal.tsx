import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check, DollarSign, Maximize2, Bed, Bath, Car, Shield } from 'lucide-react';
import { SearchFilterState, PropertyType, OperationType } from '../types';
import { NEIGHBORHOODS } from '../data/mockProperties';

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterState: SearchFilterState;
  onFilterChange: (updates: Partial<SearchFilterState>) => void;
  onResetFilters: () => void;
  resultsCount: number;
}

const AMENITY_OPTIONS = [
  'Piscina Climatizada',
  'Piscina Infinito',
  'Seguridad 24hs',
  'Parrilla / Quincho',
  'Vista al Río',
  'Vista al Lago',
  'Amarradero Privado',
  'Jacuzzi Privado',
  'Cava de Vinos',
  'Gimnasio',
  'Spa & Sauna',
  'Domótica',
  'Ascensor Privado',
  'Cancha de Tennis'
];

export const AdvancedFilterModal: React.FC<AdvancedFilterModalProps> = ({
  isOpen,
  onClose,
  filterState,
  onFilterChange,
  onResetFilters,
  resultsCount,
}) => {
  if (!isOpen) return null;

  const toggleAmenity = (amenity: string) => {
    const current = filterState.selectedAmenities;
    if (current.includes(amenity)) {
      onFilterChange({ selectedAmenities: current.filter((a) => a !== amenity) });
    } else {
      onFilterChange({ selectedAmenities: [...current, amenity] });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-[#121418] border-l border-white/10 h-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0d0f12]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-bold text-white">Filtros Personalizados</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-200">
          
          {/* Operación */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Tipo de Operación</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'venta', label: 'Venta' },
                { id: 'alquiler', label: 'Alquiler' },
                { id: 'temporario', label: 'Alquiler Temporario' },
                { id: 'emprendimientos', label: 'Emprendimientos' }
              ].map((op) => (
                <button
                  key={op.id}
                  onClick={() => onFilterChange({ operation: op.id as OperationType })}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    filterState.operation === op.id
                      ? 'bg-[#d4af37] text-[#0d0f12] border-[#d4af37] font-bold'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de Propiedad */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Tipo de Inmueble</label>
            <select
              value={filterState.propertyType}
              onChange={(e) => onFilterChange({ propertyType: e.target.value as PropertyType })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            >
              <option value="todos" className="bg-[#121418]">Todos los tipos</option>
              <option value="departamento" className="bg-[#121418]">Departamento</option>
              <option value="penthouse" className="bg-[#121418]">Penthouse / Piso Exclusivo</option>
              <option value="casa" className="bg-[#121418]">Casa / Villa de Lujo</option>
              <option value="terreno" className="bg-[#121418]">Terreno / Lote al Agua</option>
              <option value="oficina" className="bg-[#121418]">Oficina Corporativa</option>
            </select>
          </div>

          {/* Ubicación */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Zona / Barrio</label>
            <select
              value={filterState.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            >
              {NEIGHBORHOODS.map((loc) => (
                <option key={loc} value={loc} className="bg-[#121418]">{loc}</option>
              ))}
            </select>
          </div>

          {/* Rango de Precio USD */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex justify-between">
              <span>Rango de Precio (USD)</span>
              <span className="text-white font-normal">
                ${filterState.minPriceUSD.toLocaleString()} - ${filterState.maxPriceUSD.toLocaleString()}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-gray-400">Mínimo USD</span>
                <input
                  type="number"
                  step={50000}
                  value={filterState.minPriceUSD}
                  onChange={(e) => onFilterChange({ minPriceUSD: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <span className="text-[10px] text-gray-400">Máximo USD</span>
                <input
                  type="number"
                  step={100000}
                  value={filterState.maxPriceUSD}
                  onChange={(e) => onFilterChange({ maxPriceUSD: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Habitaciones */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              <span>Habitaciones / Dormitorios</span>
            </label>
            <div className="flex gap-2">
              {['todos', 1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => onFilterChange({ bedrooms: val as any })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    filterState.bedrooms === val
                      ? 'bg-[#d4af37] text-[#0d0f12] border-[#d4af37]'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  {val === 'todos' ? 'Cualquiera' : `${val}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Baños */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              <span>Baños</span>
            </label>
            <div className="flex gap-2">
              {['todos', 1, 2, 3, 4].map((val) => (
                <button
                  key={val}
                  onClick={() => onFilterChange({ bathrooms: val as any })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    filterState.bathrooms === val
                      ? 'bg-[#d4af37] text-[#0d0f12] border-[#d4af37]'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  {val === 'todos' ? 'Cualquiera' : `${val}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Superficie m2 */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex justify-between">
              <span>Superficie Mínima (m²)</span>
              <span className="text-white font-normal">{filterState.minArea} m²</span>
            </label>
            <input
              type="range"
              min={0}
              max={1000}
              step={50}
              value={filterState.minArea}
              onChange={(e) => onFilterChange({ minArea: Number(e.target.value) })}
              className="w-full accent-[#d4af37] bg-white/10 cursor-pointer"
            />
          </div>

          {/* Amenities & Extras */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Amenities & Características</label>
            <div className="grid grid-cols-2 gap-2">
              {AMENITY_OPTIONS.map((amenity) => {
                const selected = filterState.selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs text-left border transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] font-semibold'
                        : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${selected ? 'bg-[#d4af37] border-[#d4af37] text-[#0d0f12]' : 'border-gray-500'}`}>
                      {selected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Solo Exclusivas */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
            <div>
              <span className="text-sm font-semibold text-white block">Solo Listados Exclusivos</span>
              <span className="text-xs text-gray-400">Mostrar únicamente propiedades representadas en exclusiva por TGR</span>
            </div>
            <input
              type="checkbox"
              checked={filterState.onlyExclusive}
              onChange={(e) => onFilterChange({ onlyExclusive: e.target.checked })}
              className="w-5 h-5 accent-[#d4af37] rounded cursor-pointer"
            />
          </div>

          {/* Ordenar Por */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Ordenar Resultados</label>
            <select
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            >
              <option value="featured" className="bg-[#121418]">Destacadas primero</option>
              <option value="price-asc" className="bg-[#121418]">Precio: Menor a Mayor</option>
              <option value="price-desc" className="bg-[#121418]">Precio: Mayor a Menor</option>
              <option value="newest" className="bg-[#121418]">Más Recientes</option>
              <option value="area-desc" className="bg-[#121418]">Mayor Superficie m²</option>
            </select>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0d0f12] flex items-center gap-3">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0d0f12] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 hover:opacity-95 transition-all cursor-pointer text-center"
          >
            Ver {resultsCount} Propiedades
          </button>
        </div>

      </div>
    </div>
  );
};
