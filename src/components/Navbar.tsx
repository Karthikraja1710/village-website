import React, { useState, useRef, useEffect } from 'react';
import { useStore, PageView } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Leaf, 
  SlidersHorizontal,
  LayoutGrid,
  ChevronDown,
  Headphones,
  MapPin,
  Truck,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    cartSubtotal,
    favorites,
    setIsCartOpen,
    setIsAiAssistantOpen,
    setIsSettingsModalOpen,
    setIsCouponsOpen,
    searchQuery,
    setSearchQuery,
    products,
    openProductDetails,
    currency,
    setCurrency,
    currencies,
    formatPrice,
    setSelectedCategoryFilter,
    prototypeSettings,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<typeof products>([]);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Close category menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search suggestions as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchSuggestions([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const matches = products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.villageOrigin.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    });

    setSearchSuggestions(matches.slice(0, 5));
  }, [searchQuery, products]);

  const handleNavClick = (page: PageView) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    setIsCategoryMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActivePage('shop');
    setIsCategoryMenuOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('shop');
      setIsSearchOpen(false);
    }
  };

  const handleSuggestionClick = (productId: string) => {
    openProductDetails(productId);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Helper to get category count
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* 1. TOP ANNOUNCEMENT & UTILITY BAR (Reference: The Village Organics ticker style) */}
      <div className="bg-[#14281f] text-[#c9d6cb] text-[11px] font-medium border-b border-[#244b37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          {/* Scrolling ticker ribbon */}
          <div className="overflow-hidden relative flex-1 mr-4 hidden md:block">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[#eef3ef]">
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#8aa18e]" />
                <strong>100% Traditional Village Harvest</strong> &bull; Sourced directly from rural growers
              </span>
              <span className="text-[#8aa18e]">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#8aa18e]" />
                Express Delivery to 28+ Major Cities across India (24 - 72 Hours)
              </span>
              <span className="text-[#8aa18e]">&bull;</span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#bf563b] font-bold">DISCOUNT:</span>
                Use code <span className="bg-[#264a39] px-1.5 py-0.5 rounded text-white font-mono font-bold">VILLAGE10</span> for ₹100 off your first city order
              </span>
              <span className="text-[#8aa18e]">&bull;</span>
              <span className="flex items-center gap-1.5">
                🌍 Global Village Pantry: International shipping available for foreign kitchens &amp; diaspora
              </span>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2 truncate">
            <Leaf className="w-3.5 h-3.5 text-[#8aa18e] shrink-0" />
            <span className="truncate">Village Harvest &bull; Free city delivery over ₹499</span>
          </div>

          {/* Right quick actions: Currency Switcher & Placeholder Settings */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Global Currency Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1c382b] hover:bg-[#264a39] text-[#eef3ef] text-[11px] font-semibold transition-all cursor-pointer border border-[#2d5641]"
                title="Change display currency (Domestic & International)"
              >
                <span>{currencies[currency]?.flag}</span>
                <span className="font-mono">{currency}</span>
                <ChevronDown className="w-3 h-3 text-[#8aa18e]" />
              </button>

              {isCurrencyOpen && (
                <div 
                  className="absolute right-0 top-7 w-48 bg-white rounded-xl shadow-2xl border border-[#e4dcce] overflow-hidden z-50 p-1.5 space-y-1 animate-in fade-in duration-150"
                  onMouseLeave={() => setIsCurrencyOpen(false)}
                >
                  <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-[#8aa18e] tracking-wider border-b border-[#f0ece3]">
                    Display Currency
                  </div>
                  {(Object.keys(currencies) as Array<keyof typeof currencies>).map((code) => {
                    const conf = currencies[code];
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          setCurrency(code);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          currency === code
                            ? 'bg-[#1c382b] text-white font-bold'
                            : 'text-[#1c382b] hover:bg-[#f6f1e7]'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{conf.flag}</span>
                          <span>{conf.code}</span>
                        </span>
                        <span className="text-[11px] opacity-80">{conf.symbol} ({conf.name.split(' ')[0]})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Editable Placeholder Quick Settings */}
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(true)}
              className="text-[11px] text-[#8aa18e] hover:text-[#fbf9f4] flex items-center gap-1 transition-colors cursor-pointer"
              title="Edit business placeholders and prototype credentials"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER (Logo, Search Bar, AI Guide, Wishlist, Cart) */}
      <div className="bg-[#fffdfa] border-b border-[#ece3d3] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#1c382b] flex items-center justify-center text-[#fbf9f4] shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-[#8aa18e]" />
            </div>
            <div>
              <span className="font-serif font-extrabold text-2xl tracking-tight text-[#1c382b] block leading-none">
                Root &amp; River
              </span>
              <span className="text-[11px] font-medium tracking-wider text-[#526f58] block mt-1 uppercase">
                Goodness grown close to the earth
              </span>
            </div>
          </div>

          {/* Large Centered Search Bar with Instant Autocomplete */}
          <div className="hidden md:block relative flex-1 max-w-lg lg:max-w-xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search single-origin turmeric, cold-pressed oils, wild honey, village origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full pl-4 pr-24 py-2.5 text-xs rounded-full border-2 border-[#1c382b]/20 bg-[#fbf9f4] text-[#1c382b] placeholder-[#8aa18e] focus:outline-none focus:border-[#1c382b] focus:bg-white transition-all shadow-xs"
              />
              <button
                type="submit"
                className="absolute right-1 px-4 py-1.5 rounded-full bg-[#1c382b] hover:bg-[#284c3b] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </form>

            {/* Live Suggestion Popover */}
            {isSearchOpen && searchSuggestions.length > 0 && (
              <div 
                className="absolute left-0 right-0 top-12 bg-white rounded-2xl shadow-2xl border border-[#e4dcce] overflow-hidden z-50 p-2 space-y-1 animate-in fade-in duration-150"
                onMouseLeave={() => setIsSearchOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#8aa18e] tracking-wider border-b border-[#f0ece3] flex justify-between items-center">
                  <span>Suggested Village Products</span>
                  <span>{searchSuggestions.length} items</span>
                </div>
                {searchSuggestions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSuggestionClick(p.id)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f6f1e7] transition-colors cursor-pointer"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover border border-[#e4dcce]"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif font-bold text-xs text-[#1c382b] line-clamp-1">
                        {p.name}
                      </h5>
                      <span className="text-[10px] text-[#526f58] line-clamp-1">
                        {p.villageOrigin}, {p.state} &bull; {formatPrice(p.price)}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('shop');
                    setIsSearchOpen(false);
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-[#1c382b] hover:bg-[#eef3ef] rounded-lg transition-colors cursor-pointer"
                >
                  View all results in Shop Catalog &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons: Advisor, Wishlist, Account, Cart Drawer */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* AI Advisor Button */}
            <button
              onClick={() => setIsAiAssistantOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#f6f1e7] hover:bg-[#1c382b] text-[#1c382b] hover:text-white border border-[#c9d6cb] text-xs font-semibold transition-all cursor-pointer shadow-2xs group"
              title="Open EarthWise Village Sourcing Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#bf563b] group-hover:text-yellow-300 transition-colors" />
              <span className="hidden sm:inline">AI Advisor</span>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="md:hidden p-2 text-[#526f58] hover:text-[#1c382b] rounded-full hover:bg-[#f6f1e7] cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="relative p-2 text-[#526f58] hover:text-[#bf563b] rounded-full hover:bg-[#f6f1e7] transition-colors cursor-pointer"
              title="Liked Products"
              aria-label="Liked Products"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#bf563b] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Customer Account Dashboard */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                activePage === 'dashboard'
                  ? 'bg-[#1c382b] text-[#fbf9f4]'
                  : 'text-[#526f58] hover:text-[#1c382b] hover:bg-[#f6f1e7]'
              }`}
              title="Customer Account Dashboard"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Village Basket Cart Button with Subtotal Preview */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 pl-3 pr-4 py-2 bg-[#1c382b] hover:bg-[#284c3b] text-white rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer group"
              title="Your Village Basket"
              aria-label="View basket"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#8aa18e] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#bf563b] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full border-2 border-[#1c382b]">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left leading-none">
                <span className="text-[10px] text-[#8aa18e] uppercase font-bold tracking-wider">Basket</span>
                <span className="text-xs font-serif font-bold text-white mt-0.5">{formatPrice(cartSubtotal)}</span>
              </div>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1c382b] hover:bg-[#f6f1e7] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. FULL-WIDTH DEEP GREEN NAVBAR (Signature style of the reference video) */}
      <div className="bg-[#1c382b] text-white shadow-inner hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-13">
          {/* Left: ALL CATEGORIES Dropdown Button */}
          <div className="relative" ref={categoryMenuRef}>
            <button
              type="button"
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="flex items-center gap-2.5 px-5 py-3.5 bg-[#264a39] hover:bg-[#335d48] text-white font-serif font-bold text-xs uppercase tracking-wider rounded-t-lg transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 text-[#8aa18e]" />
              <span>All Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Category Dropdown Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute left-0 top-full w-72 bg-[#fffdfa] rounded-b-2xl shadow-2xl border border-[#e4dcce] overflow-hidden z-50 py-2 divide-y divide-[#f0ece3] text-[#1c382b] animate-in fade-in slide-in-from-top-2 duration-150">
                {CATEGORIES.map((cat) => {
                  const count = getCategoryCount(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs hover:bg-[#f6f1e7] transition-colors cursor-pointer text-left group"
                    >
                      <span className="flex items-center gap-2.5 font-medium group-hover:text-[#bf563b] transition-colors">
                        <span className="text-base">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#eef3ef] text-[#59735d] group-hover:bg-[#1c382b] group-hover:text-white transition-colors">
                        {String(count).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Center Navigation Links (Matching Image 2 exact structure) */}
          <nav className="flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer py-1 relative ${
                activePage === 'home'
                  ? 'text-[#f5a894] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#bf563b]'
                  : 'text-[#eef3ef] hover:text-[#f5a894]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer py-1 relative ${
                activePage === 'shop'
                  ? 'text-[#f5a894] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#bf563b]'
                  : 'text-[#eef3ef] hover:text-[#f5a894]'
              }`}
            >
              Shop
            </button>

            {/* Categories dropdown link in nav */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="text-xs uppercase tracking-wider font-bold text-[#eef3ef] hover:text-[#f5a894] transition-colors cursor-pointer py-1 flex items-center gap-1"
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => handleNavClick('story')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer py-1 relative ${
                activePage === 'story'
                  ? 'text-[#f5a894] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#bf563b]'
                  : 'text-[#eef3ef] hover:text-[#f5a894]'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => {
                setActivePage('story');
                setTimeout(() => {
                  window.scrollTo({ top: 800, behavior: 'smooth' });
                }, 100);
              }}
              className="text-xs uppercase tracking-wider font-bold text-[#eef3ef] hover:text-[#f5a894] transition-colors cursor-pointer py-1"
            >
              Brands
            </button>

            {/* Coupons link */}
            <button
              type="button"
              onClick={() => setIsCouponsOpen(true)}
              className="text-xs uppercase tracking-wider font-bold text-[#f5a894] hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1 bg-[#264a39] px-2.5 py-1 rounded-md"
              title="View harvest vouchers & promo codes"
            >
              <span>Coupons</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#bf563b] animate-ping" />
            </button>

            {/* Terms & Conditions */}
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(true)}
              className="text-xs uppercase tracking-wider font-bold text-[#eef3ef] hover:text-[#f5a894] transition-colors cursor-pointer py-1 hidden xl:block"
            >
              Terms &amp; Conditions
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer py-1 relative ${
                activePage === 'contact'
                  ? 'text-[#f5a894] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#bf563b]'
                  : 'text-[#eef3ef] hover:text-[#f5a894]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Help Desk: "Need Help? Call Us: +91 [Phone number]" */}
          <div className="flex items-center gap-2.5 text-xs text-[#c9d6cb]">
            <div className="w-8 h-8 rounded-full bg-[#264a39] flex items-center justify-center text-white">
              <Headphones className="w-4 h-4 text-[#8aa18e]" />
            </div>
            <div>
              <span className="block text-[10px] text-[#8aa18e] uppercase font-bold leading-none">Need Help? Call Us</span>
              <span className="font-mono font-bold text-white text-xs">{prototypeSettings.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#fffdfa] py-4 border-b border-[#e4dcce] space-y-3 px-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2.5 text-left text-sm font-semibold rounded-xl transition-colors ${
                activePage === 'home' ? 'bg-[#1c382b] text-white' : 'text-[#1c382b] hover:bg-[#f6f1e7]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`px-4 py-2.5 text-left text-sm font-semibold rounded-xl transition-colors ${
                activePage === 'shop' ? 'bg-[#1c382b] text-white' : 'text-[#1c382b] hover:bg-[#f6f1e7]'
              }`}
            >
              Shop All Harvest
            </button>
            <button
              onClick={() => handleNavClick('herbs')}
              className={`px-4 py-2.5 text-left text-sm font-semibold rounded-xl transition-colors ${
                activePage === 'herbs' ? 'bg-[#1c382b] text-white' : 'text-[#1c382b] hover:bg-[#f6f1e7]'
              }`}
            >
              Herbs &amp; Traditional Pantry
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className={`px-4 py-2.5 text-left text-sm font-semibold rounded-xl transition-colors ${
                activePage === 'story' ? 'bg-[#1c382b] text-white' : 'text-[#1c382b] hover:bg-[#f6f1e7]'
              }`}
            >
              Our Village Story &amp; Sourcing
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-4 py-2.5 text-left text-sm font-semibold rounded-xl transition-colors ${
                activePage === 'contact' ? 'bg-[#1c382b] text-white' : 'text-[#1c382b] hover:bg-[#f6f1e7]'
              }`}
            >
              Contact &amp; Inquiries
            </button>
            <button
              onClick={() => {
                setIsCouponsOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 text-left text-sm font-semibold rounded-xl text-[#bf563b] bg-[#faeee9] hover:bg-[#f6dfb2] flex items-center justify-between"
            >
              <span>Vouchers &amp; Coupons</span>
              <span className="text-[10px] bg-[#bf563b] text-white px-2 py-0.5 rounded-full font-bold">DISCOUNTS</span>
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-4 py-2.5 text-left text-sm font-semibold rounded-xl transition-colors ${
                activePage === 'dashboard' ? 'bg-[#1c382b] text-white' : 'text-[#1c382b] hover:bg-[#f6f1e7]'
              }`}
            >
              Customer Account &amp; Orders
            </button>
          </div>

          {/* Quick Categories Bar in Mobile */}
          <div className="pt-2 border-t border-[#e4dcce]">
            <span className="text-[10px] font-bold text-[#8aa18e] uppercase tracking-wider block mb-2 px-1">
              Browse Categories
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className="px-2.5 py-1.5 bg-[#f6f1e7] rounded-lg text-xs text-[#1c382b] text-left flex items-center gap-1.5"
                >
                  <span>{cat.icon}</span>
                  <span className="line-clamp-1">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#e4dcce] flex gap-2">
            <button
              onClick={() => {
                setIsAiAssistantOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-[#eef3ef] text-[#1c382b] text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#bf563b]" />
              <span>AI Advisor</span>
            </button>
            <button
              onClick={() => {
                setIsSettingsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-xl border border-[#c9d6cb] text-[#526f58] text-xs font-semibold flex items-center justify-center gap-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
