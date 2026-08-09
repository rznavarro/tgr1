import React from 'react';
import { Heart, MapPin, Bed, Bath, Maximize2, Car, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';
import { Property } from '../types';
import { EXCHANGE_RATE_MEP } from '../data/mockProperties';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  currency: 'USD' | 'ARS';
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  onBookTour: (property: Property, e: React.MouseEvent) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  currency,
  onToggleFavorite,
  onSelectProperty,
  onBookTour,
}) => {
  const formattedPriceUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.priceUSD);

  const priceARS = property.priceUSD * EXCHANGE_RATE_MEP;
  const formattedPriceARS = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(priceARS);

  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group relative bg-[#121418] rounded-xl border border-white/10 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {property.isExclusive && (
              <span className="px-2.5 py-1 rounded bg-[#d4af37] text-[#0d0f12] text-[10px] font-bold uppercase tracking-wider shadow-md">
                Exclusivo
              </span>
            )}
            {property.isNew && (
              <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20">
                A Estrenar
              </span>
            )}
            <span className="px-2.5 py-1 rounded bg-white/10 backdrop-blur-md text-gray-200 text-[10px] font-semibold uppercase tracking-wider">
              {property.operation}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => onToggleFavorite(property.id, e)}
            className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-all cursor-pointer"
            title="Guardar en favoritos"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Overlay Badges */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-gray-300 text-[10px]">
            {property.propertyType.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Property Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Title and Price */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
              {property.title}
            </h3>
            <span className="text-lg font-bold text-[#d4af37] whitespace-nowrap">
              {currency === 'USD' ? formattedPriceUSD : formattedPriceARS}
            </span>
          </div>

          {/* Subtitle / Address */}
          <p className="text-xs text-gray-400 flex items-center gap-1 mb-2 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span>{property.neighborhood}, {property.city}</span>
          </p>
        </div>

        {/* Property Specs Metric Icons */}
        <div className="grid grid-cols-4 gap-2 py-2.5 px-3 rounded-lg bg-white/5 border border-white/5 text-gray-300 text-xs font-medium">
          <div className="flex items-center gap-1.5" title="Habitaciones">
            <Bed className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{property.bedrooms} Dorm</span>
          </div>
          <div className="flex items-center gap-1.5" title="Baños">
            <Bath className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{property.bathrooms} Baños</span>
          </div>
          <div className="flex items-center gap-1.5" title="Superficie Total">
            <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{property.areaTotal} m²</span>
          </div>
          <div className="flex items-center gap-1.5" title="Cocheras">
            <Car className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{property.parkingSpaces} Coch</span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
          <span className="text-gray-400 font-light flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>TGR Verificado</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onBookTour(property, e)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] font-semibold transition-all cursor-pointer"
            >
              Agendar Visita
            </button>
            <span className="p-1.5 rounded-lg bg-white/5 group-hover:bg-[#d4af37] group-hover:text-[#0d0f12] text-gray-300 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
