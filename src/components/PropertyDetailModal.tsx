import React, { useState } from 'react';
import { X, Heart, Share2, MapPin, Bed, Bath, Maximize2, Car, Calendar, Phone, Mail, CheckCircle2, DollarSign, Calculator, ChevronLeft, ChevronRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { Property } from '../types';
import { EXCHANGE_RATE_MEP } from '../data/mockProperties';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  currency: 'USD' | 'ARS';
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  isFavorite,
  currency,
  onToggleFavorite,
}) => {
  if (!isOpen || !property) return null;

  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'calculator' | 'tour'>('details');

  // Booking Form State
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('15:00');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Financial Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(30); // 30%
  const [loanTermYears, setLoanTermYears] = useState(15);

  const priceUSD = property.priceUSD;
  const downPaymentUSD = (priceUSD * downPaymentPercent) / 100;
  const loanAmountUSD = priceUSD - downPaymentUSD;
  // Estimated monthly payment (assuming ~7.5% annual rate estimate)
  const monthlyInterestRate = 0.075 / 12;
  const totalMonths = loanTermYears * 12;
  const estimatedMonthlyPaymentUSD =
    (loanAmountUSD * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  const formattedPriceUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(priceUSD);

  const priceARS = priceUSD * EXCHANGE_RATE_MEP;
  const formattedPriceARS = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(priceARS);

  const handleNextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setActiveTab('details');
    }, 4000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hola TGR Propiedades, estoy interesado en agendar una visita para la propiedad: "${property.title}" (ID: ${property.id}) de USD $${property.priceUSD.toLocaleString()}.`
    );
    window.open(`https://wa.me/5491154328800?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121418] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0d0f12] border-b border-white/10 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#d4af37] text-[#0d0f12] text-[10px] font-bold uppercase tracking-wider">
              {property.isExclusive ? 'Exclusivo TGR' : 'Destacado'}
            </span>
            <h2 className="text-base sm:text-xl font-serif font-bold text-white truncate max-w-md">
              {property.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleFavorite(property.id, e)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
              title="Guardar favorito"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={handleWhatsApp}
              className="p-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-all cursor-pointer"
              title="WhatsApp Directo"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Gallery Slider */}
          <div className="relative w-full aspect-[21/9] bg-black">
            <img
              src={property.images[currentImageIdx]}
              alt={property.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-black/30" />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs text-white font-medium">
                {currentImageIdx + 1} / {property.images.length} Fotos
              </span>

              <div className="flex gap-1.5 overflow-x-auto max-w-xs">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`w-10 h-7 rounded overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      currentImageIdx === idx ? 'border-[#d4af37] ring-2 ring-[#d4af37]' : 'border-white/20 opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Detalles, Calculadora Hipotecaria, Agendar Visita) */}
          <div className="border-b border-white/10 bg-[#0d0f12] px-6 flex gap-6 text-sm font-semibold text-gray-400">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'details' ? 'border-[#d4af37] text-[#d4af37]' : 'border-transparent hover:text-white'
              }`}
            >
              Detalles & Especificaciones
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calculator' ? 'border-[#d4af37] text-[#d4af37]' : 'border-transparent hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Simulador Financiero</span>
            </button>
            <button
              onClick={() => setActiveTab('tour')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tour' ? 'border-[#d4af37] text-[#d4af37]' : 'border-transparent hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Visita Privada</span>
            </button>
          </div>

          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="p-6 space-y-8">
              
              {/* Header Price & Location */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">{property.title}</h1>
                  <p className="text-sm text-gray-300 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                    <span>{property.address}, {property.neighborhood}, {property.city}</span>
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-xs text-gray-400 block uppercase tracking-wider">Precio de Venta</span>
                  <div className="text-3xl font-serif font-bold text-[#d4af37]">
                    {currency === 'USD' ? formattedPriceUSD : formattedPriceARS}
                  </div>
                  {property.expensasUSD && (
                    <span className="text-xs text-gray-400 block mt-0.5">
                      Expensas estimadas: USD ${property.expensasUSD}/mes
                    </span>
                  )}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                  <Bed className="w-6 h-6 text-[#d4af37]" />
                  <div>
                    <span className="text-xs text-gray-400 block">Dormitorios</span>
                    <span className="text-lg font-bold text-white">{property.bedrooms} Suites</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                  <Bath className="w-6 h-6 text-[#d4af37]" />
                  <div>
                    <span className="text-xs text-gray-400 block">Baños</span>
                    <span className="text-lg font-bold text-white">{property.bathrooms} Baños</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                  <Maximize2 className="w-6 h-6 text-[#d4af37]" />
                  <div>
                    <span className="text-xs text-gray-400 block">Sup. Total</span>
                    <span className="text-lg font-bold text-white">{property.areaTotal} m²</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#d4af37]" />
                  <div>
                    <span className="text-xs text-gray-400 block">Cocheras</span>
                    <span className="text-lg font-bold text-white">{property.parkingSpaces} Libres</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-bold text-white border-b border-white/10 pb-2">
                  Descripción General
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-light">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-bold text-white border-b border-white/10 pb-2">
                  Amenities & Equipamiento
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {property.amenities.map((item) => (
                    <div key={item} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-200">
                      <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Card */}
              <div className="bg-[#0d0f12] p-6 rounded-2xl border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#d4af37]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider block">Asesor Inmobiliario Senior</span>
                    <h4 className="text-lg font-serif font-bold text-white">{property.agent.name}</h4>
                    <p className="text-xs text-gray-400">{property.agent.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleWhatsApp}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-green-700 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Directo</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('tour')}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0d0f12] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Agendar Visita
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FINANCIAL CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="p-6 space-y-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#d4af37]" />
                    <span>Calculadora Estimativa de Inversión y Financiación</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Estimación para la adquisición de {property.title} por USD ${priceUSD.toLocaleString()}.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#d4af37] block mb-1">
                        Anticipo Inicial ({downPaymentPercent}%): USD ${downPaymentUSD.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={80}
                        step={5}
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full accent-[#d4af37] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#d4af37] block mb-1">
                        Plazo del Saldo Saldo / Crédito ({loanTermYears} Años)
                      </label>
                      <input
                        type="range"
                        min={5}
                        max={30}
                        step={5}
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(Number(e.target.value))}
                        className="w-full accent-[#d4af37] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="bg-[#0d0f12] p-5 rounded-xl border border-[#d4af37]/30 space-y-3">
                    <span className="text-xs text-gray-400 uppercase tracking-wider block">Resumen de Cuota Estimada</span>
                    <div>
                      <span className="text-3xl font-serif font-bold text-[#d4af37]">
                        USD ${Math.round(estimatedMonthlyPaymentUSD).toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 block">/ mes estimativo</span>
                    </div>

                    <div className="text-xs space-y-1 text-gray-300 pt-2 border-t border-white/10">
                      <div className="flex justify-between">
                        <span>Saldo a Financiar:</span>
                        <strong>USD ${loanAmountUSD.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Tasa Estimada Anual:</span>
                        <strong>7.5% TNA</strong>
                      </div>
                      {property.expensasUSD && (
                        <div className="flex justify-between text-gray-400">
                          <span>+ Expensas del Inmueble:</span>
                          <span>USD ${property.expensasUSD}/mes</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BOOK PRIVATE TOUR */}
          {activeTab === 'tour' && (
            <div className="p-6 max-w-2xl mx-auto space-y-6">
              {bookingSuccess ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4 my-6">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-serif font-bold text-white">¡Visita Agendada con Éxito!</h3>
                  <p className="text-sm text-emerald-200">
                    Tu solicitud para visitar <strong>{property.title}</strong> el día <strong>{tourDate}</strong> a las <strong>{tourTime}hs</strong> fue enviada. Un asesor de TGR se comunicará a la brevedad para confirmar los detalles.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#d4af37]" />
                      <span>Agendar Visita Privada Presencial o Virtual</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Coordiná una atención personalizada en el inmueble con uno de nuestros asesores VIP.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Ej. Carlos Pellegrini"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Teléfono / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="+54 11 1234-5678"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="ejemplo@dominio.com"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Fecha Preferida</label>
                      <input
                        type="date"
                        required
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Horario Preferido</label>
                      <select
                        value={tourTime}
                        onChange={(e) => setTourTime(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="10:00" className="bg-[#121418]">10:00 hs (Mañana)</option>
                        <option value="12:00" className="bg-[#121418]">12:00 hs (Mediodía)</option>
                        <option value="15:00" className="bg-[#121418]">15:00 hs (Tarde)</option>
                        <option value="18:00" className="bg-[#121418]">18:00 hs (Atardecer)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0d0f12] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#d4af37]/25 hover:opacity-95 transition-all cursor-pointer"
                  >
                    Confirmar Visita Privada
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
