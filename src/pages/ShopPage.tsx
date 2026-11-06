import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, RotateCcw, X, Sparkles, Filter } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    searchQuery,
    setSearchQuery,
    setIsAiAssistantOpen,
    formatPrice,
  } = useStore();

  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique states/origins for filter dropdown
  const origins = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.state)));
    return ['all', ...list];
  }, [products]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategoryFilter !== 'all') {
      result = result.filter((p) => p.category === selectedCategoryFilter);
    }

    // Origin filter
    if (selectedOrigin !== 'all') {
      result = result.filter((p) => p.state === selectedOrigin);
    }

    // Price range
    if (selectedPriceRange === 'under-200') {
      result = result.filter((p) => p.price < 200);
    } else if (selectedPriceRange === '200-500') {
      result = result.filter((p) => p.price >= 200 && p.price <= 500);
    } else if (selectedPriceRange === 'above-500') {
      result = result.filter((p) => p.price > 500);
    }

    // Stock
    if (selectedStock === 'in-stock') {
      result = result.filter((p) => p.stockStatus === 'in-stock');
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.villageOrigin.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(q))
        );
      });
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategoryFilter, selectedOrigin, selectedPriceRange, selectedStock, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategoryFilter('all');
    setSelectedOrigin('all');
    setSelectedPriceRange('all');
    setSelectedStock('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategoryFilter !== 'all' ||
    selectedOrigin !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedStock !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
                Village Farm Catalog
              </span>
              <span className="text-xs text-[#526f58]">
                &bull; Showing {filteredProducts.length} of {products.length} harvests
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1c382b] mt-1">
              Shop Rural Produce &amp; Pantry
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAiAssistantOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#eef3ef] hover:bg-[#1c382b] text-[#1c382b] hover:text-white border border-[#c9d6cb] text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#bf563b]" />
              <span>Ask Sourcing Advisor</span>
            </button>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#c9d6cb] text-xs font-semibold text-[#1c382b] cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-[#59735d]" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategoryFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#1c382b] text-[#fbf9f4] shadow-sm'
                  : 'bg-white text-[#526f58] border border-[#e4dcce] hover:border-[#1c382b] hover:text-[#1c382b]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-[#e4dcce] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#8aa18e]" />
          <input
            type="text"
            placeholder="Search by name, ingredient, village origin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b] placeholder-[#8aa18e] focus:outline-none focus:ring-1 focus:ring-[#1c382b]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-[#8aa18e] hover:text-[#1c382b]"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Filter Dropdowns */}
        <div className="hidden lg:flex items-center gap-3 w-full md:w-auto">
          {/* Origin */}
          <select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b] focus:outline-none cursor-pointer"
          >
            <option value="all">Origin: All States</option>
            {origins.filter(o => o !== 'all').map((orig) => (
              <option key={orig} value={orig}>{orig}</option>
            ))}
          </select>

          {/* Price */}
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b] focus:outline-none cursor-pointer"
          >
            <option value="all">Price: Any Price</option>
            <option value="under-200">Under {formatPrice(200)}</option>
            <option value="200-500">{formatPrice(200)} - {formatPrice(500)}</option>
            <option value="above-500">Above {formatPrice(500)}</option>
          </select>

          {/* Stock */}
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b] focus:outline-none cursor-pointer"
          >
            <option value="all">Availability: All</option>
            <option value="in-stock">In Stock Only</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b] font-medium focus:outline-none cursor-pointer"
          >
            <option value="featured">Sort: Featured Harvest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
            <option value="name">Alphabetical (A - Z)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="p-2 text-xs text-[#bf563b] hover:bg-[#faeee9] rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer / Expandable */}
      {showMobileFilters && (
        <div className="lg:hidden p-4 rounded-2xl bg-white border border-[#e4dcce] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#e4dcce]">
            <h4 className="font-serif font-bold text-sm text-[#1c382b]">Filter Harvests</h4>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-[#526f58] hover:text-[#1c382b]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[#1c382b] mb-1">Origin State</label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b]"
              >
                <option value="all">All States</option>
                {origins.filter(o => o !== 'all').map((orig) => (
                  <option key={orig} value={orig}>{orig}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1c382b] mb-1">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b]"
              >
                <option value="all">Any Price</option>
                <option value="under-200">Under {formatPrice(200)}</option>
                <option value="200-500">{formatPrice(200)} - {formatPrice(500)}</option>
                <option value="above-500">Above {formatPrice(500)}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1c382b] mb-1">Stock Status</label>
              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b]"
              >
                <option value="all">All</option>
                <option value="in-stock">In Stock Only</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1c382b] mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b]"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="w-full py-2 text-xs font-semibold text-[#bf563b] bg-[#faeee9] rounded-lg cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-[#e4dcce] p-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#f6f1e7] flex items-center justify-center text-3xl">
            🌱
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl text-[#1c382b]">
              No village harvests matched your criteria
            </h3>
            <p className="text-xs text-[#526f58] max-w-sm mx-auto">
              Try adjusting your search terms or clearing your price and region filters to see other rural crops.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-5 py-2.5 bg-[#1c382b] text-white text-xs font-semibold rounded-xl hover:bg-[#284c3b] transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};

