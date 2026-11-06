import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { VILLAGE_BRANDS } from '../data/brands';
import { ProductCard } from '../components/ProductCard';
import { 
  Search, 
  RotateCcw, 
  X, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  ShoppingBag, 
  ArrowRight,
  Building2,
  Tag,
  CheckCircle2
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedBrandFilter,
    setSelectedBrandFilter,
    searchQuery,
    setSearchQuery,
    setIsAiAssistantOpen,
    setIsCartOpen,
    setActivePage,
    cartCount,
    cartSubtotal,
    formatPrice,
  } = useStore();

  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Active brand details if filtered by brand
  const activeBrand = useMemo(() => {
    return VILLAGE_BRANDS.find((b) => b.id === selectedBrandFilter);
  }, [selectedBrandFilter]);

  // Extract unique states/origins for filter dropdown
  const origins = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.state)));
    return ['all', ...list];
  }, [products]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Brand filter (From Brands page or shop sidebar)
    if (selectedBrandFilter !== 'all') {
      result = result.filter((p) => p.brandId === selectedBrandFilter);
    }

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
          (p.brandName && p.brandName.toLowerCase().includes(q)) ||
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
  }, [products, selectedCategoryFilter, selectedBrandFilter, selectedOrigin, selectedPriceRange, selectedStock, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategoryFilter('all');
    setSelectedBrandFilter('all');
    setSelectedOrigin('all');
    setSelectedPriceRange('all');
    setSelectedStock('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategoryFilter !== 'all' ||
    selectedBrandFilter !== 'all' ||
    selectedOrigin !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedStock !== 'all' ||
    searchQuery.trim() !== '';

  const getCategoryCount = (catId: string) => {
    let pool = products;
    if (selectedBrandFilter !== 'all') {
      pool = pool.filter(p => p.brandId === selectedBrandFilter);
    }
    if (catId === 'all') return pool.length;
    return pool.filter(p => p.category === catId).length;
  };

  return (
    <div className="space-y-8 pb-20">
      {/* ========================================================= */}
      {/* 1. PANORAMIC SPICE HEADER BANNER (Direct from video frame_044) */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-[#1c382b] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#2d5641]">
        {/* Background Image of Spices on dark surface */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity transform scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#14281f]/95 via-[#1c382b]/85 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          {/* Breadcrumb (Matches video frame_044) */}
          <div className="flex items-center gap-2 text-xs text-[#c9d6cb]">
            <button 
              onClick={() => setActivePage('home')} 
              className="hover:text-white font-medium cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#8aa18e]" />
            <button
              onClick={() => {
                setSelectedBrandFilter('all');
                setSelectedCategoryFilter('all');
              }}
              className="hover:text-white font-medium cursor-pointer"
            >
              Shop
            </button>
            {activeBrand && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#8aa18e]" />
                <span className="font-bold text-[#f5a894]">{activeBrand.name}</span>
              </>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
              {activeBrand ? activeBrand.name : 'Shop Products'}
            </h1>
            <p className="text-xs sm:text-sm text-[#c9d6cb] max-w-xl">
              {activeBrand 
                ? activeBrand.description 
                : 'Direct from smallholder farms, forest cooperatives, and artisanal cold-press yards across India.'}
            </p>
          </div>

          {activeBrand && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf563b]/30 text-[#f5a894] border border-[#bf563b]/40 text-xs font-semibold">
              <span>Filtered by Brand: {activeBrand.name}</span>
              <button 
                onClick={() => setSelectedBrandFilter('all')} 
                className="hover:text-white cursor-pointer ml-1"
                title="Remove brand filter"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Results Counter Bar (Matches video frame_044 "We found 2 items for you!") */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4dcce] pb-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-lg text-[#1c382b]">
              We found <strong className="text-[#2e6844] font-black">{filteredProducts.length}</strong> items for you!
            </span>
          </div>

          {/* Quick Toolbar Search & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8aa18e]" />
              <input
                type="text"
                placeholder="Search harvests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-7 py-1.5 text-xs rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b] focus:outline-none focus:border-[#1c382b]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-[#8aa18e] hover:text-[#1c382b]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b] font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Harvest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden p-2 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b] text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Filter className="w-4 h-4 text-[#2e6844]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Split Layout: Products Grid (Left) + Category & Brands Sidebar (Right) */}
        {/* (Faithful recreation of reference video frame_044) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Products Grid Column (8 cols on desktop) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-[#e4dcce] p-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#f6f1e7] flex items-center justify-center text-3xl">
                  🌱
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-xl text-[#1c382b]">
                    No village harvests matched your criteria
                  </h3>
                  <p className="text-xs text-[#526f58] max-w-sm mx-auto">
                    Try clearing brand or category filters to explore our full seasonal harvest.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar (Category List & Brand Switcher - Matching video frame_044) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Category Card */}
            <div className="bg-[#fffdfa] rounded-2xl border border-[#e4dcce] p-5 space-y-4 shadow-2xs">
              <h3 className="font-serif font-bold text-lg text-[#1c382b] border-b border-[#f0ece3] pb-2">
                Category
              </h3>

              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const count = getCategoryCount(cat.id);
                  const isSelected = selectedCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                        isSelected 
                          ? 'bg-[#1c382b] text-white font-bold' 
                          : 'text-[#1c382b] hover:bg-[#f6f1e7]'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">{cat.icon}</span>
                        <span className="line-clamp-1">{cat.label}</span>
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#264a39] text-white' : 'bg-[#eef3ef] text-[#2e6844]'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brands & Collectives Card */}
            <div className="bg-[#fffdfa] rounded-2xl border border-[#e4dcce] p-5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#f0ece3] pb-2">
                <h3 className="font-serif font-bold text-lg text-[#1c382b]">
                  Brands
                </h3>
                {selectedBrandFilter !== 'all' && (
                  <button
                    onClick={() => setSelectedBrandFilter('all')}
                    className="text-[10px] text-[#bf563b] font-bold hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedBrandFilter('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                    selectedBrandFilter === 'all'
                      ? 'bg-[#1c382b] text-white font-bold'
                      : 'text-[#1c382b] hover:bg-[#f6f1e7]'
                  }`}
                >
                  <span>All Rural Collectives</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    selectedBrandFilter === 'all' ? 'bg-[#264a39] text-white' : 'bg-[#eef3ef] text-[#526f58]'
                  }`}>
                    {products.length}
                  </span>
                </button>

                {VILLAGE_BRANDS.map((brand) => {
                  const bCount = products.filter(p => p.brandId === brand.id).length;
                  const isSelected = selectedBrandFilter === brand.id;
                  return (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => setSelectedBrandFilter(brand.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                        isSelected 
                          ? 'bg-[#1c382b] text-white font-bold' 
                          : 'text-[#1c382b] hover:bg-[#f6f1e7]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{brand.logo}</span>
                        <span className="line-clamp-1">{brand.name}</span>
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#264a39] text-white' : 'bg-[#eef3ef] text-[#2e6844]'
                      }`}>
                        {bCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Filter: Price Filter */}
            <div className="bg-[#fffdfa] rounded-2xl border border-[#e4dcce] p-5 space-y-3 shadow-2xs">
              <h3 className="font-serif font-bold text-sm text-[#1c382b]">
                Price Filter
              </h3>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-200', label: `Under ${formatPrice(200)}` },
                  { id: '200-500', label: `${formatPrice(200)} - ${formatPrice(500)}` },
                  { id: 'above-500', label: `Above ${formatPrice(500)}` },
                ].map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      selectedPriceRange === range.id
                        ? 'bg-[#2e6844] text-white font-bold'
                        : 'text-[#526f58] hover:bg-[#f6f1e7]'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Advisor Shortcut */}
            <div className="p-5 rounded-2xl bg-[#eef3ef] border border-[#c9d6cb] space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#bf563b]" />
                <span className="font-serif font-bold text-xs text-[#1c382b]">
                  Need Culinary Guidance?
                </span>
              </div>
              <p className="text-[11px] text-[#526f58] leading-relaxed">
                Not sure which single-origin turmeric or unrefined oil best fits your family recipe?
              </p>
              <button
                type="button"
                onClick={() => setIsAiAssistantOpen(true)}
                className="w-full py-2 rounded-xl bg-[#1c382b] hover:bg-[#284c3b] text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Ask Sourcing Advisor &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. STICKY FLOATING QUICK BUY / CART PILL                  */}
      {/* (Makes it effortlessly easy for customers to buy)         */}
      {/* ========================================================= */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#1c382b] text-white rounded-2xl shadow-2xl p-3 sm:p-4 border-2 border-[#8aa18e]/30 flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#2e6844] text-white flex items-center justify-center font-bold text-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] uppercase font-bold text-[#8aa18e] block">
                  {cartCount} Harvest {cartCount === 1 ? 'Item' : 'Items'} Added
                </span>
                <span className="font-serif font-bold text-base text-white">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActivePage('checkout')}
              className="px-4 py-2.5 rounded-xl bg-[#bf563b] hover:bg-[#a7452d] text-white font-serif font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Instant Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
