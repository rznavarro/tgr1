import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyGrid } from './components/PropertyGrid';
import { AdvancedFilterModal } from './components/AdvancedFilterModal';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { EmprendimientosSection } from './components/EmprendimientosSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ValuationSection } from './components/ValuationSection';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ContactFooter } from './components/ContactFooter';

import { Property, SearchFilterState } from './types';
import { INITIAL_PROPERTIES } from './data/mockProperties';

const DEFAULT_FILTERS: SearchFilterState = {
  operation: 'venta',
  location: 'Todos',
  propertyType: 'todos',
  minPriceUSD: 0,
  maxPriceUSD: 5000000,
  bedrooms: 'todos',
  bathrooms: 'todos',
  minArea: 0,
  maxArea: 2000,
  parking: 'todos',
  selectedAmenities: [],
  onlyExclusive: false,
  sortBy: 'featured',
  searchQuery: '',
};

export default function App() {
  const [filterState, setFilterState] = useState<SearchFilterState>(DEFAULT_FILTERS);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tgr_favorites');
      return saved ? JSON.parse(saved) : ['tgr-001'];
    } catch {
      return ['tgr-001'];
    }
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'ARS'>('USD');

  // Filter properties logic
  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((p) => {
      // Operation
      if (filterState.operation && p.operation !== filterState.operation) {
        return false;
      }

      // Property Type
      if (filterState.propertyType !== 'todos' && p.propertyType !== filterState.propertyType) {
        return false;
      }

      // Location / Neighborhood
      if (filterState.location !== 'Todos' && !p.neighborhood.includes(filterState.location)) {
        return false;
      }

      // Price USD
      if (p.priceUSD < filterState.minPriceUSD || p.priceUSD > filterState.maxPriceUSD) {
        return false;
      }

      // Bedrooms
      if (filterState.bedrooms !== 'todos' && p.bedrooms < (filterState.bedrooms as number)) {
        return false;
      }

      // Bathrooms
      if (filterState.bathrooms !== 'todos' && p.bathrooms < (filterState.bathrooms as number)) {
        return false;
      }

      // Area m2
      if (p.areaTotal < filterState.minArea) {
        return false;
      }

      // Only Exclusive
      if (filterState.onlyExclusive && !p.isExclusive) {
        return false;
      }

      // Selected Amenities
      if (filterState.selectedAmenities.length > 0) {
        const hasAllAmenities = filterState.selectedAmenities.every((amenity) =>
          p.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Text Search Query
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchSubtitle = p.subtitle?.toLowerCase().includes(query);
        const matchNeighborhood = p.neighborhood.toLowerCase().includes(query);
        const matchAddress = p.address.toLowerCase().includes(query);

        if (!matchTitle && !matchSubtitle && !matchNeighborhood && !matchAddress) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
    if (filterState.sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
    if (filterState.sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
    if (filterState.sortBy === 'newest') return (b.yearBuilt || 2020) - (a.yearBuilt || 2020);
    if (filterState.sortBy === 'area-desc') return b.areaTotal - a.areaTotal;
    // Default 'featured'
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filterState]);

  // Calculate active filters count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterState.location !== 'Todos') count++;
    if (filterState.propertyType !== 'todos') count++;
    if (filterState.minPriceUSD > 0 || filterState.maxPriceUSD < 5000000) count++;
    if (filterState.bedrooms !== 'todos') count++;
    if (filterState.bathrooms !== 'todos') count++;
    if (filterState.minArea > 0) count++;
    if (filterState.onlyExclusive) count++;
    if (filterState.selectedAmenities.length > 0) count += filterState.selectedAmenities.length;
    return count;
  }, [filterState]);

  const handleFilterChange = (updates: Partial<SearchFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('tgr_favorites', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailModalOpen(true);
  };

  const handleBookTour = (property: Property, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProperty(property);
    setIsDetailModalOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-[#0d0f12]">
      
      {/* Header Bar */}
      <Header
        favoriteCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        onOpenValuation={() => setIsValuationOpen(true)}
        currency={currency}
        onToggleCurrency={() => setCurrency((prev) => (prev === 'USD' ? 'ARS' : 'USD'))}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner + Luxury Search Bar */}
        <Hero
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onSearchSubmit={() => handleNavigateSection('propiedades')}
          onOpenAdvancedFilters={() => setIsAdvancedFilterOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Signature Property Grid */}
        <PropertyGrid
          properties={filteredProperties}
          favorites={favorites}
          currency={currency}
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={handleSelectProperty}
          onBookTour={handleBookTour}
          onOpenAdvancedFilters={() => setIsAdvancedFilterOpen(true)}
        />

        {/* New Developments / Emprendimientos */}
        <EmprendimientosSection onOpenValuation={() => setIsValuationOpen(true)} />

        {/* Why Choose Us matching reference design */}
        <WhyChooseUs />

        {/* Valuation Banner */}
        <ValuationSection
          isOpen={isValuationOpen}
          onOpen={() => setIsValuationOpen(true)}
          onClose={() => setIsValuationOpen(false)}
        />
      </main>

      {/* Footer */}
      <ContactFooter
        onOpenValuation={() => setIsValuationOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Advanced Filters Drawer */}
      <AdvancedFilterModal
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        resultsCount={filteredProperties.length}
      />

      {/* Property Detail View Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        currency={currency}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Gemini AI Advisor Assistant Modal */}
      <AiAdvisorModal
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        properties={INITIAL_PROPERTIES}
        onSelectProperty={handleSelectProperty}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        allProperties={INITIAL_PROPERTIES}
        onRemoveFavorite={handleToggleFavorite}
        onSelectProperty={handleSelectProperty}
        currency={currency}
      />

    </div>
  );
}
