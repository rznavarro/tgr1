import React from 'react';
import { Building2, MapPin, Phone, Mail, Instagram, Linkedin, Facebook, MessageCircle } from 'lucide-react';

interface ContactFooterProps {
  onOpenValuation: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenValuation, onNavigateSection }) => {
  return (
    <footer id="contacto" className="bg-[#090a0c] border-t border-white/10 text-gray-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] p-[1px]">
                <div className="w-full h-full bg-[#0d0f12] rounded-[7px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#d4af37]" />
                </div>
              </div>
              <span className="text-xl font-serif font-bold tracking-wider text-white">
                TGR <span className="text-xs font-sans font-medium text-[#d4af37]">PROPIEDADES</span>
              </span>
            </div>

            <p className="text-gray-400 font-light leading-relaxed">
              Firma inmobiliaria especializada en intermediación, desarrollo y tasación de inmuebles de alto valor patrimonial en la República Argentina.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Offices */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Oficinas Centrales</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Sede Recoleta</strong>
                  <span>Av. Alvear 1880, CABA</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Sede San Isidro</strong>
                  <span>Av. Del Libertador 14200, San Isidro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Contacto & Atención VIP</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span className="text-white">+54 11 5432-8800</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <span className="text-white">contacto@tgrprop.com.ar</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">WhatsApp 24/7 Disponible</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Servicios & Secciones</h4>
            <ul className="space-y-2 text-gray-400 font-light">
              <li>
                <button onClick={() => onNavigateSection('propiedades')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Casas & Villas de Lujo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('propiedades')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Penthouses en Puerto Madero
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('emprendimientos')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Emprendimientos de Pozo
                </button>
              </li>
              <li>
                <button onClick={onOpenValuation} className="hover:text-[#d4af37] transition-colors cursor-pointer text-[#d4af37]">
                  Solicitar Tasación Privada
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} TGR Propiedades (www.tgrprop.com.ar). Todos los derechos reservados.</p>
          <p>Diseño y Tecnología Inmobiliaria de Alta Gama.</p>
        </div>

      </div>
    </footer>
  );
};
