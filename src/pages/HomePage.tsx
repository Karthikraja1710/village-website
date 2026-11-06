import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { SOURCING_STEPS, GROWER_SPOTLIGHTS } from '../data/growers';
import { CATEGORIES } from '../data/products';
import { 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Leaf, 
  Truck, 
  CheckCircle2,
  Calendar,
  Building2,
  Globe,
  Heart,
  ShieldCheck,
  Check,
  Tag,
  Users,
  Award,
  ChevronRight,
  Sprout,
  HeartPulse,
  Flame,
  Star,
  Quote,
  Compass,
  Sun,
  Activity,
  Layers
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    products, 
    setActivePage, 
    setSelectedCategoryFilter, 
    setIsAiAssistantOpen,
    setIsCouponsOpen,
    openProductDetails,
    showToast,
    formatPrice
  } = useStore();

  const [activeCatalogTab, setActiveCatalogTab] = useState<string>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Helper to count products per category
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText('VILLAGE10');
    setCopiedCoupon(true);
    showToast('Coupon Copied!', 'Use code VILLAGE10 at checkout for ₹100 off your order.', 'success');
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast(
        'Harvest Dispatch Subscribed',
        `Thank you! Seasonal harvest updates will be sent to ${newsletterEmail}.`,
        'success'
      );
      setNewsletterEmail('');
    }
  };

  // Filtered products for the catalog showcase
  const displayedProducts = activeCatalogTab === 'all' 
    ? products.slice(0, 8) 
    : products.filter(p => p.category === activeCatalogTab).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* ========================================================= */}
      {/* 1. HERO SECTION WITH LEFT CATEGORY SIDEBAR & SHOWCASE     */}
      {/* (Inspired by reference video & Image 2 navbar)             */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-radial from-[#1e3d2f] via-[#162f23] to-[#0f1f17] text-[#fbf9f4] pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#244b37]">
        {/* Subtle decorative grid/leaf pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#8aa18e_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Floating Category Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-[#fffdfa] rounded-2xl shadow-xl border border-[#e4dcce] overflow-hidden text-[#1c382b] h-full flex flex-col justify-between">
                <div>
                  <div className="px-5 py-4 bg-[#1c382b] text-white flex items-center justify-between">
                    <span className="font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-[#8aa18e]" />
                      <span>Village Categories</span>
                    </span>
                    <span className="text-[10px] font-mono bg-[#264a39] px-2 py-0.5 rounded-full text-[#c9d6cb]">
                      {products.length} Items
                    </span>
                  </div>

                  <div className="divide-y divide-[#f0ece3]">
                    {CATEGORIES.map((cat) => {
                      const count = getCategoryCount(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryClick(cat.id)}
                          className="w-full flex items-center justify-between px-4 py-3 text-xs hover:bg-[#f6f1e7] transition-all cursor-pointer text-left group"
                        >
                          <span className="flex items-center gap-2.5 font-medium group-hover:text-[#bf563b] transition-colors">
                            <span className="text-base group-hover:scale-110 transition-transform">{cat.icon}</span>
                            <span className="line-clamp-1">{cat.label}</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#eef3ef] text-[#59735d] group-hover:bg-[#1c382b] group-hover:text-white transition-colors">
                            {String(count).padStart(2, '0')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Trust Badge inside Left Menu */}
                <div className="p-3.5 m-3 rounded-xl bg-[#eef3ef] border border-[#c9d6cb] text-[11px] text-[#243028] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#1c382b]">
                    <ShieldCheck className="w-4 h-4 text-[#2e6844]" />
                    <span>Single-Origin Promise</span>
                  </div>
                  <p className="text-[10px] text-[#526f58] leading-tight">
                    Direct from village smallholders with complete harvest &amp; packing transparency.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Center & Right: High-Impact Hero Showcase */}
            <div className="lg:col-span-9 bg-linear-to-br from-[#244b37] to-[#14281f] rounded-3xl p-8 sm:p-12 border border-[#335d48] relative overflow-hidden flex flex-col justify-between shadow-2xl">
              {/* Decorative radial blur in top right */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#bf563b]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Text Content */}
                <div className="md:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c382b] border border-[#38644e] text-xs font-semibold text-[#c9d6cb]">
                    <span className="w-2 h-2 rounded-full bg-[#8aa18e] animate-ping" />
                    <span>Pure Organics From Our Village Farms</span>
                  </div>

                  <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-5xl tracking-tight leading-[1.15] text-white">
                    Rooted in Tradition,
                    <span className="block text-[#f5a894] font-normal text-2xl sm:text-3xl lg:text-4xl mt-2 italic font-serif">
                      Grown with Purity.
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm text-[#c9d6cb] leading-relaxed max-w-lg">
                    Authentic village superfoods have stayed hidden in rural hamlets for generations. 
                    <strong className="text-white"> Root &amp; River builds the direct bridge:</strong> single-origin Lakadong turmeric, wooden-churned cold-pressed oils, wild forest honey, and fragrant unpolished grains, dispatched straight from farm collection sheds to conscious city kitchens and global homes.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategoryFilter('all');
                        setActivePage('shop');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 rounded-xl bg-[#bf563b] hover:bg-[#a7452d] text-white font-serif font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <span>SHOP NOW</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActivePage('story');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#fbf9f4] font-semibold text-xs border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
                    >
                      Our Village Story
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCouponsOpen(true)}
                      className="px-4 py-3.5 rounded-xl bg-[#264a39] hover:bg-[#335d48] text-[#f5a894] hover:text-white text-xs font-semibold border border-[#3d7054] flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                    >
                      <Tag className="w-3.5 h-3.5 text-[#bf563b]" />
                      <span>View Coupons</span>
                    </button>
                  </div>

                  {/* Trust Micro-Row */}
                  <div className="pt-4 border-t border-[#335d48] flex flex-wrap items-center gap-4 text-[11px] text-[#c9d6cb]">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#8aa18e]" />
                      <span>24-72h Direct Metro Delivery</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8aa18e]" />
                      <span>Non-GMO, Chemical-Free Heritage</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#8aa18e]" />
                      <span>Serving 40+ Overseas Countries</span>
                    </span>
                  </div>
                </div>

                {/* Right Hero Visual Card with Floating Elements */}
                <div className="md:col-span-5 relative flex justify-center items-center">
                  <div className="relative w-full max-w-xs animate-float">
                    {/* Glowing background ring */}
                    <div className="absolute inset-0 bg-[#bf563b]/20 rounded-3xl blur-2xl transform -rotate-6 scale-95" />

                    {/* Main Image Card */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md p-3">
                      <div className="relative rounded-2xl overflow-hidden aspect-4/5">
                        <img
                          src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
                          alt="Pure Village Lakadong Turmeric"
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />

                        {/* Top tag */}
                        <div className="absolute top-3 left-3 bg-[#bf563b] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          <span>100% Traditional Harvest</span>
                        </div>

                        {/* Bottom product caption */}
                        <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                          <span className="text-[10px] text-[#c9d6cb] uppercase font-bold tracking-wider block">
                            West Jaintia Hills, Meghalaya
                          </span>
                          <h4 className="font-serif font-bold text-sm leading-tight text-white">
                            Single-Origin Lakadong Turmeric Powder
                          </h4>
                          <div className="flex items-center justify-between pt-1 border-t border-white/20">
                            <span className="font-serif font-bold text-base text-[#f5a894]">
                              {formatPrice(320)}
                            </span>
                            <button
                              type="button"
                              onClick={() => openProductDetails('prod-turmeric-lakadong')}
                              className="px-2.5 py-1 bg-white text-[#1c382b] font-bold text-[10px] rounded-lg hover:bg-[#ece3d3] transition-colors cursor-pointer"
                            >
                              View Harvest
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating pill: Pure Stone-Milled */}
                    <div className="absolute -top-3 -right-3 bg-white text-[#1c382b] rounded-xl px-3 py-1.5 shadow-xl border border-[#e4dcce] flex items-center gap-1.5 text-xs font-bold animate-float-delayed">
                      <Sprout className="w-4 h-4 text-[#2e6844]" />
                      <span>Stone-Milled &amp; Raw</span>
                    </div>

                    {/* Floating pill: Fast City Delivery */}
                    <div className="absolute -bottom-4 -left-3 bg-[#1c382b] text-white rounded-xl px-3 py-1.5 shadow-xl border border-[#335d48] flex items-center gap-1.5 text-xs font-semibold">
                      <Truck className="w-4 h-4 text-[#8aa18e]" />
                      <span>Direct Farm Dispatch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. 3 FEATURE PILLARS STRIP                                */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] hover:shadow-lg transition-all duration-300 space-y-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1c382b] group-hover:text-white transition-all">
              <Sprout className="w-6 h-6 text-[#2e6844] group-hover:text-[#8aa18e]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1c382b]">
              Pure. Traditional. Organic.
            </h3>
            <p className="text-xs text-[#526f58] leading-relaxed">
              Cultivated using ancestral natural farming methods without synthetic pesticides, chemical sprays, or artificial ripening agents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] hover:shadow-lg transition-all duration-300 space-y-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-[#faeee9] text-[#bf563b] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#bf563b] group-hover:text-white transition-all">
              <HeartPulse className="w-6 h-6 text-[#bf563b] group-hover:text-white" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1c382b]">
              Wellness Rooted in Tradition
            </h3>
            <p className="text-xs text-[#526f58] leading-relaxed">
              Living nutrients preserved through slow stone-milling, wooden cold-pressing (&lt;38°C), and unpasteurized raw forest harvesting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] hover:shadow-lg transition-all duration-300 space-y-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1c382b] group-hover:text-white transition-all">
              <Building2 className="w-6 h-6 text-[#2e6844] group-hover:text-[#8aa18e]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1c382b]">
              From Our Farm to Your Home
            </h3>
            <p className="text-xs text-[#526f58] leading-relaxed">
              Direct aggregation bridging remote village growers to city apartments across India and international doorsteps worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. VINTAGE ILLUSTRATED "PRODUCT CATEGORIES" PARCHMENT CARDS */}
      {/* (Faithful recreation of user uploaded Image 4)             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e4dcce] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
              Ancestral Craft &amp; Artistry
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1c382b] mt-1">
              Product Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#526f58] max-w-md">
            Purity goes beyond aesthetics. Explore traditional staples illustrated by their indigenous preparation methods.
          </p>
        </div>

        {/* 5 Illustrated Folk-Art Parchment Cards (Image 4 exact recreation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Pure and Traditional Spices */}
          <div 
            onClick={() => handleCategoryClick('spices')}
            className="parchment-card rounded-2xl border border-[#decbb0] p-5 flex flex-col justify-between cursor-pointer space-y-4 group overflow-hidden"
          >
            <div className="space-y-3">
              {/* Folk-art Banner Graphic */}
              <div className="aspect-4/3 rounded-xl bg-[#faeed1] border border-[#ebd2a0] p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between relative z-10">
                  <span className="text-[10px] font-serif italic text-[#8a6828] font-bold">
                    For us, purity goes beyond aesthetic.
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#1c382b] text-[#fbf9f4] flex items-center justify-center text-xs">
                    🌶️
                  </div>
                </div>

                <div className="py-2 text-center relative z-10">
                  <span className="text-5xl select-none">👵🏽🥣</span>
                  <p className="text-[10px] text-[#73531b] font-medium mt-1">
                    Grandmother Stone Mortar Ground
                  </p>
                </div>

                <span className="text-[9px] text-[#8a6828] text-center block relative z-10">
                  Packed with natural volatile curcumin
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-[#1c382b] group-hover:text-[#bf563b] transition-colors flex items-center justify-between">
                  <span>Pure and Traditional Spices</span>
                  <ArrowRight className="w-4 h-4 text-[#8aa18e] group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-xs text-[#526f58] mt-1 line-clamp-2">
                  Sun-cured on clean bamboo mats and stone chakki milled without bleaching.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#ebdcc5] text-[11px] font-bold text-[#8a6828] flex items-center gap-1">
              <span>Explore Spices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Cold Pressed Oils Flowchart */}
          <div 
            onClick={() => handleCategoryClick('oils')}
            className="parchment-card rounded-2xl border border-[#decbb0] p-5 flex flex-col justify-between cursor-pointer space-y-4 group overflow-hidden"
          >
            <div className="space-y-3">
              {/* Flowchart illustration */}
              <div className="aspect-4/3 rounded-xl bg-[#f5ede1] border border-[#dfd1be] p-3 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between text-[10px] font-serif italic text-[#59442a] font-bold">
                  <span>Cold pressed oil: How it is made</span>
                  <span className="text-base">🥥</span>
                </div>

                {/* Diagram graphic */}
                <div className="bg-white/70 backdrop-blur-xs rounded-lg p-2 text-center border border-[#dfd1be] text-[10px] space-y-1">
                  <div className="flex items-center justify-center gap-2 font-mono font-bold text-[#1c382b]">
                    <span>Seeds</span>
                    <span>&rarr;</span>
                    <span className="bg-[#264a39] text-white px-1.5 py-0.5 rounded text-[9px]">Cold Press &lt;38°C</span>
                    <span>&rarr;</span>
                    <span>Filtration</span>
                  </div>
                  <p className="text-[9px] text-[#526f58] leading-tight">
                    Seeds pressed very slowly at minimal temperature. Zero free radicals.
                  </p>
                </div>

                <span className="text-[9px] text-[#73531b] text-center block font-semibold">
                  Retains 100% vital nutrition &amp; natural aroma
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-[#1c382b] group-hover:text-[#bf563b] transition-colors flex items-center justify-between">
                  <span>Cold Pressed Oils</span>
                  <ArrowRight className="w-4 h-4 text-[#8aa18e] group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-xs text-[#526f58] mt-1 line-clamp-2">
                  Wooden Vaagai Chekku pressed coconut, groundnut, and gingelly oils.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#ebdcc5] text-[11px] font-bold text-[#8a6828] flex items-center gap-1">
              <span>Explore Oils &amp; Ghee</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Ghee & Honey Vintage Map */}
          <div 
            onClick={() => handleCategoryClick('honey')}
            className="parchment-card rounded-2xl border border-[#decbb0] p-5 flex flex-col justify-between cursor-pointer space-y-4 group overflow-hidden"
          >
            <div className="space-y-3">
              {/* Honeycomb map graphic */}
              <div className="aspect-4/3 rounded-xl bg-[#faeee9] border border-[#ebd0c7] p-3 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between text-[10px] font-serif italic text-[#8f3621] font-bold">
                  <span>Western Ghats Forest Reserve</span>
                  <span className="text-base">🐝</span>
                </div>

                <div className="py-2 text-center relative z-10">
                  <div className="inline-block p-2 rounded-full bg-white/80 shadow-md border border-[#ebd0c7]">
                    <span className="text-3xl">🍯🔍</span>
                  </div>
                  <span className="block text-[10px] font-bold tracking-wider uppercase text-[#8f3621] mt-1">
                    PURE. NATURAL. ORGANIC.
                  </span>
                </div>

                <span className="text-[9px] text-[#59735d] text-center block">
                  Wild hive collected with utmost care
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-[#1c382b] group-hover:text-[#bf563b] transition-colors flex items-center justify-between">
                  <span>Ghee &amp; Honey</span>
                  <ArrowRight className="w-4 h-4 text-[#8aa18e] group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-xs text-[#526f58] mt-1 line-clamp-2">
                  A2 Gir cow bilona cultured ghee and raw multi-flora unheated forest honey.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#ebdcc5] text-[11px] font-bold text-[#bf563b] flex items-center gap-1">
              <span>Explore Ghee &amp; Honey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Nutritious Cereals & Flour */}
          <div 
            onClick={() => handleCategoryClick('grains')}
            className="parchment-card rounded-2xl border border-[#decbb0] p-5 flex flex-col justify-between cursor-pointer space-y-4 group overflow-hidden"
          >
            <div className="space-y-3">
              {/* Botanical sketch graphic */}
              <div className="aspect-4/3 rounded-xl bg-[#eef5f1] border border-[#cfdfd6] p-3 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between text-[10px] font-serif italic text-[#24523d] font-bold">
                  <span>They say beauty comes in all shapes</span>
                  <span className="text-base">🌾</span>
                </div>

                <div className="py-2 text-center relative z-10">
                  <span className="text-4xl select-none">🌸🌾🌿</span>
                  <p className="text-[10px] text-[#24523d] font-medium mt-1">
                    Karuppu Kavuni &amp; Mappillai Samba
                  </p>
                </div>

                <span className="text-[9px] text-[#526f58] text-center block">
                  Fiber, iron &amp; mineral-rich heritage bran
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-[#1c382b] group-hover:text-[#bf563b] transition-colors flex items-center justify-between">
                  <span>Nutritious Cereals &amp; Flour</span>
                  <ArrowRight className="w-4 h-4 text-[#8aa18e] group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-xs text-[#526f58] mt-1 line-clamp-2">
                  Ancient unpolished grains and stone-ground ragi &amp; foxtail millets.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#ebdcc5] text-[11px] font-bold text-[#2e6844] flex items-center gap-1">
              <span>Explore Heritage Grains</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* 5th Wide Card: Honesty. Hard Work. Care. */}
        <div 
          onClick={() => {
            setSelectedCategoryFilter('all');
            setActivePage('shop');
          }}
          className="rounded-3xl p-6 sm:p-8 bg-[#faf4e8] border border-[#decbb0] hover:border-[#1c382b] transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1c382b] text-white flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
              🐂
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#bf563b] bg-[#faeee9] px-2.5 py-0.5 rounded-full inline-block">
                Our Farming Creed
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1c382b]">
                Honesty. Hard work. Care. That's what we bring to your table.
              </h3>
              <p className="text-xs text-[#526f58] max-w-xl">
                Reviving forgotten native grains, soil microbial fertility, and direct fair livelihoods for Indian village farming families.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-[#1c382b] group-hover:bg-[#bf563b] text-white text-xs font-serif font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore All Harvests</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. "ORGANIC FOOD IS THE BEST FOR YOU" SOIL & SEEDS SPLIT  */}
      {/* (Faithful recreation of user uploaded Image 1)             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#fffdfa] border border-[#e4dcce] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 2 Pillars */}
            <div className="lg:col-span-4 space-y-8">
              {/* Item 1: 100% Organic & Chemical-Free */}
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#2e6844]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1c382b]">
                  100% Organic &amp; Chemical-Free
                </h3>
                <p className="text-xs text-[#526f58] leading-relaxed">
                  Every product we offer is cultivated without synthetic fertilizers or pesticides. We believe in purity that your body can truly absorb and trust.
                </p>
              </div>

              <div className="border-t border-[#f0ece3]" />

              {/* Item 2: Empowering Local Farmers */}
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#faeee9] text-[#bf563b] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#bf563b]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1c382b]">
                  Empowering Local Farmers
                </h3>
                <p className="text-xs text-[#526f58] leading-relaxed">
                  We work closely with farmers around Kovai Thottam, Shangpung, and Wayanad, helping them transition to organic cultivation and form a Farm Producers Company for fair growth and shared prosperity.
                </p>
              </div>
            </div>

            {/* Center: Image of Farmer Planting Seeds in Soil with Green Overlay */}
            <div className="lg:col-span-4 relative flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-3/4 max-w-sm w-full group">
                <img
                  src="https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=800&q=80"
                  alt="Farmer planting seeds in fertile organic soil"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlapping Dark Green Badge (Direct match to Image 1) */}
                <div className="absolute top-4 left-4 bg-[#1c382b] text-white p-4 rounded-xl shadow-xl max-w-[200px] border border-[#2d5641]">
                  <h4 className="font-serif font-bold text-base leading-snug">
                    Organic food is the best for you
                  </h4>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                  <span className="text-[11px] font-mono tracking-wider uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs font-semibold">
                    Hands in Living Soil
                  </span>
                </div>
              </div>
            </div>

            {/* Right 2 Pillars */}
            <div className="lg:col-span-4 space-y-8">
              {/* Item 3: Traditional Varieties, Timeless Nutrition */}
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-[#2e6844]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1c382b]">
                  Traditional Varieties, Timeless Nutrition
                </h3>
                <p className="text-xs text-[#526f58] leading-relaxed">
                  We revive forgotten grains like Karuppu Kavuni, Mappillai Samba, and heritage millets that our ancestors cherished — rich in minerals, fiber, and antioxidants.
                </p>
              </div>

              <div className="border-t border-[#f0ece3]" />

              {/* Item 4: Farm-to-Home Transparency */}
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#2e6844]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1c382b]">
                  Farm-to-Home Transparency
                </h3>
                <p className="text-xs text-[#526f58] leading-relaxed">
                  From our fields in Therampalayam, Coimbatore and Jaintia Hills to your kitchen, we ensure complete traceability and honesty — no middlemen, no hidden ingredients, just authentic food.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. "60 YEARS OF EXPERIENCES" FOUNDER WISDOM & STATS SECTION */}
      {/* (Faithful recreation of user uploaded Image 3)             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#fffdfa] border border-[#e4dcce] overflow-hidden shadow-md relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Big Stylized "60" + Subtext + 3 Counters */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* 60 years of experiences header */}
                <div className="flex items-center gap-4">
                  <span className="font-serif font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-[#1c382b] text-cutout-grain select-none border-r-2 border-[#e4dcce] pr-6">
                    60
                  </span>
                  <div className="space-y-0.5">
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-[#1c382b] block leading-tight">
                      years of
                    </span>
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-[#1c382b] block leading-tight">
                      experiences
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1c382b] leading-snug">
                    <strong className="text-[#bf563b]">The Village Organics / Root &amp; River</strong> Growing wellness from the soil up — where technology meets tradition in every harvest.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526f58] leading-relaxed">
                    Three generations of soil stewards preserving ancestral seed lines, bio-diverse intercropping, and zero-chemical natural farming across rural India.
                  </p>
                </div>
              </div>

              {/* 3 Stats Counters Below */}
              <div className="pt-6 border-t border-[#f0ece3] grid grid-cols-3 gap-4">
                <div>
                  <span className="font-serif font-extrabold text-2xl sm:text-3xl text-[#2e6844] block">
                    150 +
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#526f58] block mt-0.5">
                    Partner Farmers
                  </span>
                </div>

                <div>
                  <span className="font-serif font-extrabold text-2xl sm:text-3xl text-[#2e6844] block">
                    10 +
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#526f58] block mt-0.5">
                    Acres &amp; Clusters
                  </span>
                </div>

                <div>
                  <span className="font-serif font-extrabold text-2xl sm:text-3xl text-[#2e6844] block">
                    1000 +
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#526f58] block mt-0.5">
                    Happy Families
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Dark Green Quote Box + Farmer in Nursery Photo */}
            <div className="lg:col-span-5 bg-[#14281f] text-white flex flex-col justify-between relative overflow-hidden">
              {/* Quote Card (Matching Image 3) */}
              <div className="p-8 sm:p-10 space-y-4 relative z-10 bg-[#1c382b] border-b border-[#2d5641]">
                {/* Decorative Quotation Marks */}
                <div className="text-6xl font-serif text-[#8aa18e]/20 absolute top-4 right-6 pointer-events-none select-none">
                  “
                </div>

                <p className="font-serif italic text-lg sm:text-xl text-[#fbf9f4] leading-relaxed relative z-10">
                  &ldquo;Farming is not a business — it's a way of giving back to the Earth that feeds us.&rdquo;
                </p>

                <div className="pt-2 border-t border-white/10">
                  <span className="font-serif font-bold text-sm text-[#f5a894] block">
                    P.R. Rangaswami &amp; Bah Kyrshan Dhar
                  </span>
                  <span className="text-[11px] text-[#c9d6cb]">
                    Founding Farmers &amp; Village Soil Stewards
                  </span>
                </div>
              </div>

              {/* Photo of Farmer Tending Plants */}
              <div className="relative aspect-16/9 lg:aspect-auto flex-1 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                  alt="Grower caring for organic seedlings in greenhouse"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[10px] text-white/90 font-mono tracking-wider uppercase bg-black/40 px-2.5 py-0.5 rounded backdrop-blur-xs">
                  Therampalayam Nursery Grove
                </span>
              </div>
            </div>
          </div>

          {/* Botanical Grass Silhouette Ribbon along the Bottom (Matching Image 3) */}
          <div className="h-6 w-full bg-linear-to-r from-[#244b37] via-[#2e6844] to-[#1c382b] opacity-80 flex items-center justify-around overflow-hidden select-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="text-[#8aa18e] text-xs transform -translate-y-1">🌱</span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. "OUR PRODUCTS" WITH SIDEBAR (Split layout from video)   */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Sidebar (Banner + Category Filter Checklist) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Promo Banner Card in Sidebar */}
            <div className="rounded-2xl overflow-hidden bg-radial from-[#1e3d2f] to-[#14281f] text-white p-6 relative border border-[#2d5641] space-y-4 shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5a894] bg-[#bf563b]/30 px-2 py-0.5 rounded-full inline-block">
                Farm-Direct Guarantee
              </span>
              <h3 className="font-serif font-bold text-xl text-white leading-tight">
                Wellness Rooted in Tradition
              </h3>
              <p className="text-xs text-[#c9d6cb] leading-relaxed">
                Every purchase directly finances smallholder farm cooperatives across Meghalaya, Wayanad, Bastar, and Kangra.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryFilter('all');
                  setActivePage('shop');
                }}
                className="w-full py-2.5 rounded-xl bg-[#bf563b] hover:bg-[#a7452d] text-white text-xs font-serif font-bold transition-colors cursor-pointer text-center"
              >
                Browse All Harvest &rarr;
              </button>
            </div>

            {/* Category Filter Widget */}
            <div className="p-5 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] space-y-3">
              <span className="font-serif font-bold text-xs text-[#1c382b] uppercase tracking-wider block border-b border-[#f0ece3] pb-2">
                Filter by Category
              </span>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const count = getCategoryCount(cat.id);
                  const isSelected = activeCatalogTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCatalogTab(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                        isSelected 
                          ? 'bg-[#1c382b] text-white font-bold' 
                          : 'text-[#1c382b] hover:bg-[#f6f1e7]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span className="line-clamp-1">{cat.label}</span>
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-[#264a39] text-[#eef3ef]' : 'bg-[#eef3ef] text-[#59735d]'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Village Cluster Origin Badges */}
            <div className="p-5 rounded-2xl bg-[#eef3ef] border border-[#c9d6cb] text-xs space-y-2">
              <span className="font-bold text-[#1c382b] block uppercase tracking-wider text-[10px]">
                Active Harvest Regions
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-[#243028]">
                <span className="bg-white px-2.5 py-1 rounded-md border border-[#c9d6cb]">Shangpung, Meghalaya</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-[#c9d6cb]">Wayanad, Kerala</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-[#c9d6cb]">Bastar, Chhattisgarh</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-[#c9d6cb]">Kangra Valley, HP</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-[#c9d6cb]">Burdwan, West Bengal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Catalog Grid */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4dcce] pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
                  Authentic Rural Harvest
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1c382b]">
                  Our Village Products
                </h3>
              </div>

              {/* Category Quick Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
                {CATEGORIES.slice(0, 5).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCatalogTab(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeCatalogTab === cat.id
                        ? 'bg-[#1c382b] text-white shadow-xs'
                        : 'bg-[#fffdfa] text-[#526f58] border border-[#e4dcce] hover:border-[#1c382b]'
                    }`}
                  >
                    {cat.label.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryFilter(activeCatalogTab);
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1c382b] hover:bg-[#284c3b] text-white font-serif font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>View All Products in Catalog ({products.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. TWO WIDE PROMOTIONAL BANNERS                           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Banner 1: Empowering Farmers / Coupon code VILLAGE10 */}
          <div className="rounded-3xl p-8 sm:p-10 bg-radial from-[#bf563b] to-[#8f3621] text-white relative overflow-hidden flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-3 relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block backdrop-blur-xs">
                Empowering Farmers, Enriching Lives
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white leading-tight">
                78% Direct Fair Return to Village Growers
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md">
                Every Rupee spent with Root &amp; River bypasses multi-tier mandi brokers and wholesale speculators, keeping ancient seeds and pure soil alive for future generations.
              </p>
            </div>

            {/* Interactive Coupon Box */}
            <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center gap-3">
              <div 
                onClick={handleCopyCoupon}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#1c382b] font-mono font-bold text-xs shadow-md cursor-pointer hover:bg-[#f6f1e7] transition-colors"
                title="Click to copy coupon code"
              >
                <Tag className="w-4 h-4 text-[#bf563b]" />
                <span>CODE: VILLAGE10</span>
                {copiedCoupon ? (
                  <Check className="w-3.5 h-3.5 text-green-600 ml-1" />
                ) : (
                  <span className="text-[10px] text-[#8aa18e] ml-1">(Click to copy)</span>
                )}
              </div>

              <span className="text-xs text-white/90 font-medium">
                Flat ₹100 off your first city kitchen order over ₹799
              </span>
            </div>
          </div>

          {/* Banner 2: Rooted in Tradition, Grown with Care */}
          <div className="rounded-3xl p-8 sm:p-10 bg-radial from-[#244b37] to-[#14281f] text-white relative overflow-hidden flex flex-col justify-between space-y-6 shadow-xl border border-[#335d48]">
            <div className="space-y-3 relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-[#8aa18e]/20 text-[#c9d6cb] px-3 py-1 rounded-full inline-block border border-[#8aa18e]/30">
                Ethical Sourcing Protocol
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white leading-tight">
                Rooted in Tradition, Grown with Care
              </h3>
              <p className="text-xs sm:text-sm text-[#c9d6cb] leading-relaxed max-w-md">
                We test every batch for heavy metals, moisture, and natural active compounds like curcumin and volatile polyphenols before dispatch.
              </p>
            </div>

            <div className="relative z-10 pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActivePage('story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-white text-[#1c382b] font-serif font-bold text-xs uppercase tracking-wider hover:bg-[#ece3d3] transition-colors cursor-pointer"
              >
                Read Sourcing Standards &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. THE VILLAGE-TO-CITY BRIDGE & COMPARISON TABLE          */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="rounded-3xl bg-radial from-[#1e3d2f] to-[#14281f] text-white p-8 sm:p-12 border border-[#264a39] space-y-8 relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bf563b]/20 text-[#f5a894] border border-[#bf563b]/40 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>The Great Urban Disconnect Solved</span>
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Why Pure Village Food Never Reached City People — Until Now
            </h2>
            <p className="text-xs sm:text-sm text-[#c9d6cb] leading-relaxed">
              Village farmers cultivate the most nutrient-dense food on earth, but without cold chains, aggregation sheds, or digital access, harvests stayed locked inside rural weekly haats. Meanwhile, families living in busy metro apartments and people abroad were forced to consume mass-manufactured, chemically refined supermarket foods.
              <br /><br />
              <strong className="text-white">Root &amp; River creates the direct pipeline:</strong> We collect fresh harvests straight at village collection sheds and rush them via temperature-stable eco-parcels to your urban apartment door in 24 to 72 hours.
            </p>
          </div>

          {/* Eye-Opening Comparison Table: Supermarket vs Village Direct */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#fffdfa] text-[#1c382b] space-y-4 shadow-lg relative z-10">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#bf563b] uppercase tracking-wider block">
                The City Shopper's Reality Check
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1c382b]">
                City Supermarket Food vs. Root &amp; River Village Direct
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#e4dcce] text-[#59735d]">
                    <th className="py-2.5 font-bold uppercase tracking-wider">Harvest Staple</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider text-[#a7452d]">City Supermarket Reality</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider text-[#2e6844]">Root &amp; River Village Direct</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ece3]">
                  <tr>
                    <td className="py-3 font-semibold text-[#1c382b]">Turmeric Powder</td>
                    <td className="py-3 text-[#7a483a]">Diluted with starch, artificial dye, low curcumin (1.5-2%)</td>
                    <td className="py-3 text-[#264a39] font-medium">Single-origin Lakadong rhizomes, pure stone-milled, ~7.2% curcumin</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1c382b]">Cooking Oils</td>
                    <td className="py-3 text-[#7a483a]">Extracted at 200°C with chemical hexane solvent &amp; synthetic bleaching</td>
                    <td className="py-3 text-[#264a39] font-medium">Traditional wood-press (Vaagai Chekku) at &lt;38°C; zero refining</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1c382b]">Honey &amp; Sweeteners</td>
                    <td className="py-3 text-[#7a483a]">Heavily adulterated with corn/sugar syrup, boiled &amp; micro-filtered</td>
                    <td className="py-3 text-[#264a39] font-medium">Raw, unheated wild forest honey retaining live enzymes &amp; pollen</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1c382b]">Rice &amp; Grains</td>
                    <td className="py-3 text-[#7a483a]">Chemically polished with talc/glucose; bran stripped of minerals</td>
                    <td className="py-3 text-[#264a39] font-medium">Indigenous heritage grains unpolished or single-milled with fiber bran intact</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1c382b]">Greens &amp; Vegetables</td>
                    <td className="py-3 text-[#7a483a]">4 to 7 days old after passing through 5 layers of wholesale middlemen</td>
                    <td className="py-3 text-[#264a39] font-medium">Dawn sickle cut, packed in breathable leaf wraps, delivered next-day</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526f58]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2e6844]" />
                Direct village sourcing protects your family from metropolitan food adulteration.
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryFilter('all');
                  setActivePage('shop');
                }}
                className="font-bold text-[#1c382b] hover:text-[#bf563b] flex items-center gap-1 cursor-pointer"
              >
                <span>Switch to Village Harvests Today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. SOURCING JOURNEY: Sourced, Grown, Packed & Delivered   */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
            Transparent Farm-to-Fork Journey
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1c382b]">
            How We Source, Grow, Pack &amp; Deliver
          </h2>
          <p className="text-xs sm:text-sm text-[#526f58]">
            Every step honors traditional village wisdom, living soil biology, and truthful small-batch handling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOURCING_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] hover:shadow-lg transition-all duration-300 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{step.icon}</span>
                <span className="font-serif font-extrabold text-2xl text-[#c9d6cb] group-hover:text-[#bf563b] transition-colors">
                  {step.step}
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#1c382b]">
                {step.title}
              </h3>
              <span className="text-[11px] font-semibold text-[#59735d] uppercase tracking-wider block">
                {step.subtitle}
              </span>
              <p className="text-xs text-[#526f58] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. MEET THE VILLAGE GROWERS (Farmer Stories)             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
            Honest Stewards of the Soil
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1c382b]">
            Meet the Village Growers
          </h2>
          <p className="text-xs sm:text-sm text-[#526f58]">
            We celebrate the skilled hands cultivating heirloom seeds and traditional groves across India's rural heartland.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GROWER_SPOTLIGHTS.map((grower) => (
            <div
              key={grower.id}
              className="rounded-2xl overflow-hidden bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-4/3 overflow-hidden bg-[#f6f1e7]">
                  <img
                    src={grower.image}
                    alt={grower.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#bf563b]">
                    {grower.village}, {grower.state}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#1c382b]">
                    {grower.name}
                  </h3>
                  <p className="text-xs font-medium text-[#526f58]">
                    {grower.specialty} &bull; {grower.experience}
                  </p>
                  <p className="text-xs text-[#526f58] italic pt-1 border-t border-[#f0ece3]">
                    &ldquo;{grower.quote}&rdquo;
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2 text-xs font-semibold text-[#1c382b] bg-[#f6f1e7] hover:bg-[#eef3ef] rounded-xl transition-colors cursor-pointer"
                >
                  Read Grower Journey
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. GLOBAL VILLAGE GOODS & CITY KITCHEN VOICES            */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="rounded-3xl bg-[#fffdfa] border border-[#e4dcce] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#e4dcce] pb-6">
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faeee9] text-[#bf563b] text-xs font-semibold uppercase tracking-wider border border-[#f0cfc5]">
                <Globe className="w-3.5 h-3.5" />
                <span>Global Village Pantry &bull; Sourced for Foreign Kitchens</span>
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1c382b]">
                Single-Origin Village Goods for Foreign Cooks &amp; Global Homes
              </h2>
              <p className="text-xs sm:text-sm text-[#526f58] leading-relaxed">
                Most spices and botanicals sold in supermarkets across the US, UK, Europe, and the Gulf are 2 to 4 years old, commodity-blended, and fumigated with industrial chemicals.
                <br /><br />
                Root &amp; River packages current-year village harvests into light-blocking, hermetically sealed tins and delivers them directly to food lovers and diaspora across 40+ countries.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f6f1e7] border border-[#e4dcce] text-xs space-y-2 lg:max-w-xs">
              <strong className="text-[#1c382b] block font-serif text-sm">International Buyer Assurance:</strong>
              <ul className="space-y-1 text-[#526f58] text-[11px] list-disc list-inside">
                <li>Phytosanitary inspection compliant packaging</li>
                <li>UV-blocking airtight metal tins &amp; amber glass</li>
                <li>Prices switchable into USD, EUR, GBP, AED, CAD, AUD</li>
                <li>Global Air Priority with DHL / FedEx tracking</li>
              </ul>
            </div>
          </div>

          {/* Foreign Testimonials / Global Voices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#e4dcce] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1c382b] flex items-center gap-1">
                  🇬🇧 London, United Kingdom
                </span>
                <span className="text-[#bf563b] text-[10px] font-medium">Home Cook &amp; Baker</span>
              </div>
              <p className="text-[#526f58] leading-relaxed italic">
                &ldquo;Store-bought turmeric in UK supermarkets is pale and bitter. This single-origin Lakadong turmeric completely changed our curries and morning golden milk. You can genuinely smell the mountain soil of Meghalaya.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#e4dcce] font-semibold text-[#1c382b] text-[11px]">
                Alistair &amp; Sunita Campbell &bull; Islington, London
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#e4dcce] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1c382b] flex items-center gap-1">
                  🇺🇸 San Francisco, California
                </span>
                <span className="text-[#bf563b] text-[10px] font-medium">Farm-to-Table Enthusiast</span>
              </div>
              <p className="text-[#526f58] leading-relaxed italic">
                &ldquo;The Tellicherry Extra Bold peppercorns cracked with a citrusy floral heat I had never experienced from commodity spice jars. Root &amp; River is doing for Indian village crops what single-origin beans did for coffee.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#e4dcce] font-semibold text-[#1c382b] text-[11px]">
                David Ross &bull; Hayes Valley, San Francisco
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#e4dcce] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1c382b] flex items-center gap-1">
                  🇦🇪 Dubai, United Arab Emirates
                </span>
                <span className="text-[#bf563b] text-[10px] font-medium">Ayurvedic Wellness Cook</span>
              </div>
              <p className="text-[#526f58] leading-relaxed italic">
                &ldquo;The raw Western Ghats honey and cultured Gir cow Bilona ghee arrived in Dubai within 4 days, pristine and properly sealed. The nutty danedar ghee texture made our family halwa unforgettable.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#e4dcce] font-semibold text-[#1c382b] text-[11px]">
                Fatima Al-Nuaimi &bull; Jumeirah, Dubai
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. AI SHOPPING ASSISTANT BANNER                         */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1c382b] text-white p-8 sm:p-12 relative overflow-hidden border border-[#264a39] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#264a39] text-[#c9d6cb] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#bf563b]" />
              <span>Intelligent EarthWise Sourcing Assistant</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl leading-tight">
              Unsure which traditional herbs or grains suit your kitchen?
            </h2>
            <p className="text-xs sm:text-sm text-[#c9d6cb] leading-relaxed">
              Ask our EarthWise Shopping Advisor for recommendations based on ancestral culinary practices, evening relaxation teas, or pure wood-pressed cooking oils.
            </p>
            <p className="text-[11px] text-[#8aa18e] italic">
              *Educational culinary guide; not medical or therapeutic advice.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAiAssistantOpen(true)}
            className="px-8 py-4 rounded-xl bg-[#bf563b] hover:bg-[#a7452d] text-white font-serif font-bold text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch EarthWise Guide</span>
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 13. HARVEST DISPATCH NEWSLETTER SUBSCRIPTION             */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center">
          <Leaf className="w-6 h-6 text-[#59735d]" />
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1c382b]">
          Receive the Seasonal Harvest Dispatch
        </h2>
        <p className="text-xs text-[#526f58] max-w-md mx-auto">
          Get notified when fresh Lakadong turmeric is milled, wild forest honey is harvested, or heirloom fragrant rice is aged and ready for dispatch.
        </p>

        <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2 pt-2">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-xs text-[#1c382b] focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1c382b] text-white text-xs font-semibold rounded-xl hover:bg-[#284c3b] transition-colors cursor-pointer"
          >
            Subscribe
          </button>
        </form>
        <span className="text-[11px] text-[#8aa18e] block">
          No spam. Pure seasonal harvest updates only. Unsubscribe anytime.
        </span>
      </section>
    </div>
  );
};
