export type OperationType = 'venta' | 'alquiler' | 'temporario' | 'emprendimientos';

export type PropertyType = 
  | 'todos'
  | 'departamento'
  | 'penthouse'
  | 'casa'
  | 'terreno'
  | 'oficina'
  | 'local';

export interface PropertyAmenity {
  id: string;
  label: string;
  icon: string;
}

export interface Property {
  id: string;
  title: string;
  subtitle?: string;
  operation: OperationType;
  propertyType: PropertyType;
  priceUSD: number;
  priceARS?: number;
  expensasUSD?: number;
  address: string;
  neighborhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  areaTotal: number; // in m2
  areaCovered: number; // in m2
  parkingSpaces: number;
  isExclusive: boolean;
  isFeatured: boolean;
  isNew: boolean; // a estrenar
  status: 'disponible' | 'reservado' | 'vendido';
  images: string[];
  description: string;
  amenities: string[];
  yearBuilt?: number;
  videoUrl?: string;
  floorPlanUrl?: string;
  coords: {
    lat: number;
    lng: number;
  };
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

export interface SearchFilterState {
  operation: OperationType;
  location: string;
  propertyType: PropertyType;
  minPriceUSD: number;
  maxPriceUSD: number;
  bedrooms: number | 'todos';
  bathrooms: number | 'todos';
  minArea: number;
  maxArea: number;
  parking: number | 'todos';
  selectedAmenities: string[];
  onlyExclusive: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'area-desc';
  searchQuery: string;
}

export interface ValuationForm {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  neighborhood: string;
  address: string;
  approxArea: string;
  bedrooms: string;
  comments: string;
}

export interface BookingForm {
  propertyId: string;
  propertyTitle: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
