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
  ArrowRight,
  SlidersHorizontal 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    favorites,
    setIsCartOpen,
    setIsAiAssistantOpen,
    setIsSettingsModalOpen,
    searchQuery,
    setSearchQuery,
    products,
    openProductDetails,
    setSelectedCategoryFilter,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<typeof products>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#e4dcce] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Tagline */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('shop')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'shop'
                  ? 'text-[#1c382b] font-bold border-b-2 border-[#1c382b] pb-0.5'
                  : 'text-[#526f58] hover:text-[#1c382b]'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('herbs')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'herbs'
                  ? 'text-[#1c382b] font-bold border-b-2 border-[#1c382b] pb-0.5'
                  : 'text-[#526f58] hover:text-[#1c382b]'
              }`}
            >
              Herbs &amp; Pantry
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'story'
                  ? 'text-[#1c382b] font-bold border-b-2 border-[#1c382b] pb-0.5'
                  : 'text-[#526f58] hover:text-[#1c382b]'
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'contact'
                  ? 'text-[#1c382b] font-bold border-b-2 border-[#1c382b] pb-0.5'
                  : 'text-[#526f58] hover:text-[#1c382b]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Search Bar with live autocomplete */}
          <div className="hidden md:block relative flex-1 max-w-xs xl:max-w-sm">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#8aa18e]" />
              <input
                type="text"
                placeholder="Search herbs, turmeric, honey, village origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-[#c9d6cb] bg-white text-[#1c382b] placeholder-[#8aa18e] focus:outline-none focus:ring-2 focus:ring-[#1c382b] transition-all"
              />
            </form>

            {/* Live Suggestion Popover */}
            {isSearchOpen && searchSuggestions.length > 0 && (
              <div 
                className="absolute left-0 right-0 top-11 bg-white rounded-2xl shadow-xl border border-[#e4dcce] overflow-hidden z-50 p-2 space-y-1 animate-in fade-in duration-150"
                onMouseLeave={() => setIsSearchOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-[#8aa18e] tracking-wider border-b border-[#f0ece3]">
                  Suggested Village Products
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
                      className="w-9 h-9 rounded-lg object-cover border border-[#e4dcce]"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif font-bold text-xs text-[#1c382b] line-clamp-1">
                        {p.name}
                      </h5>
                      <span className="text-[10px] text-[#526f58] line-clamp-1">
                        {p.villageOrigin} &bull; ₹{p.price}
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
                  className="w-full text-center py-1.5 text-xs font-semibold text-[#1c382b] hover:bg-[#eef3ef] rounded-lg transition-colors cursor-pointer"
                >
                  View all results in Shop &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons: AI Guide, Favorites, Account, Basket */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAiAssistantOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#eef3ef] hover:bg-[#1c382b] text-[#1c382b] hover:text-white border border-[#c9d6cb] text-xs font-semibold transition-all cursor-pointer shadow-xs"
              title="Open EarthWise Sourcing Guide"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#bf563b]" />
              <span className="hidden sm:inline">Advisor</span>
            </button>

            {/* Mobile Search Toggle */}
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

            {/* Wishlist Link (scroll to liked in dashboard or open) */}
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

            {/* Basket Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#1c382b] text-white rounded-full hover:bg-[#284c3b] shadow-md transition-all cursor-pointer flex items-center justify-center"
              title="Your Village Basket"
              aria-label="View basket"
            >
              <ShoppingBag className="w-4 h-4 text-[#8aa18e]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#bf563b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#fbf9f4] min-w-5 text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1c382b] hover:bg-[#f6f1e7] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#e4dcce] space-y-3 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
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
                Contact &amp; Sourcing Inquiries
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

            <div className="pt-2 border-t border-[#e4dcce] flex gap-2 px-2">
              <button
                onClick={() => {
                  setIsAiAssistantOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-[#eef3ef] text-[#1c382b] text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#bf563b]" />
                <span>AI Sourcing Advisor</span>
              </button>
              <button
                onClick={() => {
                  setIsSettingsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-xl border border-[#c9d6cb] text-[#526f58] text-xs font-semibold flex items-center justify-center gap-1"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Placeholders</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
