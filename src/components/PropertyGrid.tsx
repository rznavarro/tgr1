import React, { useState } from 'react';
import { LayoutGrid, Map, List, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Property, SearchFilterState } from '../types';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  favorites: string[];
  currency: 'USD' | 'ARS';
  filterState: SearchFilterState;
  onFilterChange: (updates: Partial<SearchFilterState>) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  onBookTour: (property: Property, e: React.MouseEvent) => void;
  onOpenAdvancedFilters: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  favorites,
  currency,
  filterState,
  onFilterChange,
  onToggleFavorite,
  onSelectProperty,
  onBookTour,
  onOpenAdvancedFilters,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'map'>('grid');

  return (
    <section id="propiedades" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Section Header inspired by reference design */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Colección Seleccionada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Propiedades Exclusivas
          </h2>
          <p className="text-sm text-gray-400 mt-1 font-light">
            Encontradas <strong className="text-[#d4af37]">{properties.length}</strong> propiedades que coinciden con tu búsqueda.
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdvancedFilters}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#d4af37]/40 text-xs font-medium text-gray-200 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
            <span>Filtros Personalizados</span>
          </button>

          <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#d4af37] text-[#0d0f12]' : 'text-gray-400 hover:text-white'
              }`}
              title="Vista en Grilla"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-2 rounded-md transition-all cursor-pointer ${
                viewMode === 'compact' ? 'bg-[#d4af37] text-[#0d0f12]' : 'text-gray-400 hover:text-white'
              }`}
              title="Vista Compacta"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-md transition-all cursor-pointer ${
                viewMode === 'map' ? 'bg-[#d4af37] text-[#0d0f12]' : 'text-gray-400 hover:text-white'
              }`}
              title="Vista Mapa Interactivo"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(filterState.location !== 'Todos' ||
        filterState.propertyType !== 'todos' ||
        filterState.bedrooms !== 'todos' ||
        filterState.selectedAmenities.length > 0 ||
        filterState.searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-gray-400">Filtros activos:</span>
          
          {filterState.location !== 'Todos' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs">
              Ubicación: {filterState.location}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterChange({ location: 'Todos' })} />
            </span>
          )}

          {filterState.propertyType !== 'todos' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs capitalize">
              Tipo: {filterState.propertyType}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterChange({ propertyType: 'todos' })} />
            </span>
          )}

          {filterState.bedrooms !== 'todos' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs">
              Dormitorios: {filterState.bedrooms}+
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterChange({ bedrooms: 'todos' })} />
            </span>
          )}

          {filterState.selectedAmenities.map((amenity) => (
            <span key={amenity} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs">
              {amenity}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() =>
                  onFilterChange({
                    selectedAmenities: filterState.selectedAmenities.filter((a) => a !== amenity),
                  })
                }
              />
            </span>
          ))}

          {filterState.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs">
              Búsqueda: "{filterState.searchQuery}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterChange({ searchQuery: '' })} />
            </span>
          )}
        </div>
      )}

      {/* Grid Content */}
      {properties.length === 0 ? (
        <div className="bg-[#121418] rounded-2xl border border-white/10 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mx-auto text-[#d4af37]">
            <Map className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif font-bold text-white">No se encontraron propiedades</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            No hay inmuebles que coincidan exactamente con la combinación de filtros seleccionados. Probá flexibilizar el presupuesto o la ubicación.
          </p>
          <button
            onClick={() =>
              onFilterChange({
                location: 'Todos',
                propertyType: 'todos',
                minPriceUSD: 0,
                maxPriceUSD: 5000000,
                bedrooms: 'todos',
                bathrooms: 'todos',
                selectedAmenities: [],
                searchQuery: '',
              })
            }
            className="px-6 py-2.5 rounded-lg bg-[#d4af37] text-[#0d0f12] text-xs font-bold uppercase tracking-wider"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : viewMode === 'map' ? (
        <div className="bg-[#121418] rounded-2xl border border-white/10 p-6 space-y-6">
          <div className="relative w-full h-96 rounded-xl overflow-hidden bg-[#0d0f12] border border-white/10 flex items-center justify-center group">
            {/* Styled Map Graphic / Interactive Pins */}
            <div className="absolute inset-0 bg-slate-950 opacity-90 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 text-center space-y-3 p-6 max-w-lg">
              <span className="px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs font-semibold">
                Mapa Interactivo de Zona
              </span>
              <h3 className="text-xl font-serif font-bold text-white">Visualización de Inmuebles en Buenos Aires</h3>
              <p className="text-xs text-gray-400">
                A continuación podés ubicar las propiedades en San Isidro, Puerto Madero, Recoleta, Palermo y Nordelta.
              </p>
            </div>

            {/* Simulated Interactive Map Markers */}
            {properties.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => onSelectProperty(p)}
                style={{
                  top: `${20 + (idx * 15) % 60}%`,
                  left: `${15 + (idx * 22) % 75}%`,
                }}
                className="absolute z-20 px-2.5 py-1 rounded-full bg-[#d4af37] text-[#0d0f12] text-[11px] font-bold shadow-lg shadow-[#d4af37]/40 hover:scale-110 transition-transform flex items-center gap-1 cursor-pointer border border-white"
                title={`${p.title} - USD ${p.priceUSD.toLocaleString()}`}
              >
                <span>USD ${(p.priceUSD / 1000).toFixed(0)}k</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                currency={currency}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
                onBookTour={onBookTour}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            viewMode === 'compact'
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              currency={currency}
              onToggleFavorite={onToggleFavorite}
              onSelectProperty={onSelectProperty}
              onBookTour={onBookTour}
            />
          ))}
        </div>
      )}

    </section>
  );
};
