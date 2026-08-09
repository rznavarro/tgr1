import React from 'react';
import { X, Heart, Trash2, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Property } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allProperties: Property[];
  onRemoveFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  currency: 'USD' | 'ARS';
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  allProperties,
  onRemoveFavorite,
  onSelectProperty,
  currency,
}) => {
  if (!isOpen) return null;

  const favoriteProperties = allProperties.filter((p) => favorites.includes(p.id));

  const handleConsultAll = () => {
    const titles = favoriteProperties.map((p) => p.title).join(', ');
    const text = encodeURIComponent(
      `Hola TGR Propiedades, quisiera consultar por mis propiedades favoritas guardadas: ${titles}.`
    );
    window.open(`https://wa.me/5491154328800?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#121418] border-l border-white/10 h-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0d0f12]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
            <h2 className="text-lg font-serif font-bold text-white">
              Mis Propiedades Guardadas ({favoriteProperties.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {favoriteProperties.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-gray-600 mx-auto stroke-1" />
              <p className="text-sm text-gray-400">No tenés propiedades guardadas en tus favoritos.</p>
              <p className="text-xs text-gray-500">Hacé clic en el corazón de cualquier tarjeta para guardarla acá.</p>
            </div>
          ) : (
            favoriteProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  onSelectProperty(prop);
                  onClose();
                }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#d4af37]/40 transition-all cursor-pointer group"
              >
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-20 h-20 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-serif font-bold text-white truncate group-hover:text-[#d4af37]">
                    {prop.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate">{prop.neighborhood}</p>
                  <span className="text-xs font-bold text-[#d4af37] block mt-1">
                    USD ${prop.priceUSD.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={(e) => onRemoveFavorite(prop.id, e)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                  title="Eliminar de favoritos"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoriteProperties.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-[#0d0f12]">
            <button
              onClick={handleConsultAll}
              className="w-full py-3 rounded-lg bg-green-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-green-700 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Asesor sobre Guardados</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
