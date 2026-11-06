import React from 'react';
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
  AlertTriangle,
  Zap,
  Home
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    products, 
    setActivePage, 
    setSelectedCategoryFilter, 
    setIsAiAssistantOpen,
    openProductDetails,
    showToast
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  const featuredProducts = products.slice(0, 6);
  const seasonalSelections = products.filter(
    (p) => p.badge === 'Seasonal Harvest' || p.badge === 'Harvest of the Day' || p.badge === 'Seasonal Pick'
  );

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-radial from-[#244b37] via-[#1c382b] to-[#14281f] text-[#fbf9f4] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#264a39]">
        {/* Subtle decorative leaf pattern background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#8aa18e_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#264a39] border border-[#335d48] text-xs font-semibold text-[#c9d6cb]">
              <span className="w-2 h-2 rounded-full bg-[#8aa18e] animate-ping" />
              <span>The Village-to-City Bridge &bull; Rural Farms to Metro Doorsteps</span>
            </div>

            <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-white">
              Pure Village Harvests,
              <span className="block text-[#f5a894] font-normal text-2xl sm:text-3xl mt-2 italic font-serif">
                Delivered Directly to City Tables.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#c9d6cb] leading-relaxed max-w-xl">
              Authentic village foods have historically stayed confined to remote hamlets, while city families were left with mass-processed supermarket substitutes. Root &amp; River creates the direct bridge: hand-harvested produce, wood-pressed oils, mountain turmeric, and sacred herbs transported safely from rural gardens straight into your city home.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryFilter('all');
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-xl bg-[#bf563b] hover:bg-[#a7452d] text-white font-serif font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Seasonal Harvest</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActivePage('story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#fbf9f4] font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
              >
                How We Reach Cities
              </button>

              <button
                type="button"
                onClick={() => setIsAiAssistantOpen(true)}
                className="px-4 py-3.5 rounded-xl bg-[#264a39] hover:bg-[#335d48] text-[#eef3ef] text-xs font-semibold border border-[#335d48] flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#bf563b]" />
                <span>City Kitchen Advisor</span>
              </button>
            </div>

            {/* Trust Chips */}
            <div className="pt-6 border-t border-[#264a39] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#c9d6cb]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8aa18e] shrink-0" />
                <span>24-72h Direct Metro Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#8aa18e] shrink-0" />
                <span>Servicing 28+ Major Indian Cities</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Globe className="w-4 h-4 text-[#8aa18e] shrink-0" />
                <span>Diaspora &amp; Global Inquiries</span>
              </div>
            </div>
          </div>

          {/* Right Featured Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
                  alt="Lakadong Turmeric Harvest"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#bf563b] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Harvest of the Month
                </div>
              </div>

              <div className="p-4 space-y-3 text-white">
                <div className="flex items-center justify-between text-xs text-[#c9d6cb]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8aa18e]" />
                    West Jaintia Hills, Meghalaya
                  </span>
                  <span>7.2% Curcumin Sample</span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg leading-tight">
                    Single-Origin Lakadong Turmeric Powder
                  </h3>
                  <p className="text-xs text-[#c9d6cb] mt-1 line-clamp-2">
                    Cultivated by Bah Kyrshan Dhar on mountain loam, sun-cured on clean bamboo mats and slow stone-milled.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="font-serif font-bold text-xl text-white">
                    ₹320 <span className="text-xs font-normal text-[#c9d6cb]">/ 250g pack</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => openProductDetails('prod-turmeric-lakadong')}
                    className="px-4 py-2 bg-white text-[#1c382b] font-serif font-bold text-xs rounded-xl hover:bg-[#ece3d3] transition-all cursor-pointer"
                  >
                    View Harvest Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Village-to-City Bridge Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="rounded-3xl bg-radial from-[#1e3d2f] to-[#14281f] text-white p-8 sm:p-12 border border-[#264a39] space-y-8 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#bf563b]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bf563b]/20 text-[#f5a894] border border-[#bf563b]/40 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>The Great Disconnect Solved</span>
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Why Pure Village Food Never Reached City People — Until Now
            </h2>
            <p className="text-xs sm:text-sm text-[#c9d6cb] leading-relaxed">
              Village farmers cultivate the most nutrient-dense, chemical-free food on earth, but without cold chains, fair aggregation, or digital access, their harvests historically stayed within rural weekly haats. Meanwhile, families living in busy cities and people abroad were trapped buying mass-manufactured, chemically preserved supermarket foods.
              <br /><br />
              <strong className="text-white">Root &amp; River creates the direct pipeline:</strong> We collect fresh harvests straight at village collection sheds and rush them via temperature-stable eco-parcels to your urban apartment door in 24 to 72 hours.
            </p>
          </div>

          {/* 3 Pillar Infographic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 pt-2">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#264a39] flex items-center justify-center text-2xl">
                🏡
              </div>
              <h3 className="font-serif font-bold text-lg text-white">
                1. Sourced from Isolated Hamlets
              </h3>
              <p className="text-xs text-[#c9d6cb] leading-relaxed">
                We work directly with tribal cooperatives in Bastar, smallholders in Jaintia Hills, and orchard stewards in Wayanad who are physically disconnected from city markets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#264a39] flex items-center justify-center text-2xl">
                🏙️
              </div>
              <h3 className="font-serif font-bold text-lg text-white">
                2. Direct to 28+ Metro Cities
              </h3>
              <p className="text-xs text-[#c9d6cb] leading-relaxed">
                Whether you reside in Mumbai, Delhi NCR, Bengaluru, Hyderabad, Pune, Chennai, or Kolkata, your order arrives fresh without sitting in wholesale mandi warehouses for weeks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#264a39] flex items-center justify-center text-2xl">
                🌍
              </div>
              <h3 className="font-serif font-bold text-lg text-white">
                3. Built for Conscious People Everywhere
              </h3>
              <p className="text-xs text-[#c9d6cb] leading-relaxed">
                Even foreign travelers and global diaspora who crave honest Indian heritage superfoods can trace every gram to the specific village soil where it was grown.
              </p>
            </div>
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
                className="font-bold text-[#1c382b] hover:text-[#bf563b] flex items-center gap-1"
              >
                <span>Switch to Village Harvests Today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Journey: How products are sourced, grown, packed, and delivered */}
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

      {/* Category Explorer Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
              Curated Rural Produce
            </span>
            <h2 className="font-serif font-bold text-3xl text-[#1c382b]">
              Explore by Village Category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryFilter('all');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-[#1c382b] hover:text-[#bf563b] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Products in Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className="p-4 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#1c382b] hover:bg-[#f6f1e7] transition-all text-center space-y-2 group shadow-xs cursor-pointer"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="font-serif font-bold text-xs sm:text-sm text-[#1c382b] block leading-snug">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Seasonal Selections Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
              Limited Small-Batch Picking
            </span>
            <h2 className="font-serif font-bold text-3xl text-[#1c382b]">
              Seasonal Selections
            </h2>
            <p className="text-xs text-[#526f58]">
              Harvested at peak freshness from current crop cycles in partner villages.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryFilter('all');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-[#1c382b] hover:text-[#bf563b] flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Seasonal Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonalSelections.slice(0, 3).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Featured Products Shelf */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
              Everyday Country Essentials
            </span>
            <h2 className="font-serif font-bold text-3xl text-[#1c382b]">
              Featured Pantry &amp; Farm Staples
            </h2>
            <p className="text-xs text-[#526f58]">
              Cold-pressed oils, sacred herbs, raw honey, and fragrant heirloom grains.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryFilter('all');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-[#1c382b] hover:text-[#bf563b] flex items-center gap-1 cursor-pointer"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 6).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Trust & Transparency Feature Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#eef3ef] border border-[#c9d6cb] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-[#1c382b]">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#1c382b] text-white flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#8aa18e]" />
            </div>
            <h3 className="font-serif font-bold text-lg">Single-Origin Villages</h3>
            <p className="text-xs text-[#526f58] leading-relaxed">
              Every jar, sack, and pouch lists the grower clan, exact taluka, and soil type. No mixed bulk aggregation from anonymous markets.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#1c382b] text-white flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#8aa18e]" />
            </div>
            <h3 className="font-serif font-bold text-lg">Harvest &amp; Packing Dates</h3>
            <p className="text-xs text-[#526f58] leading-relaxed">
              Transparent batch lot numbers reveal when rhizomes were dug, coconuts were pressed, and rice was aged in traditional granaries.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#1c382b] text-white flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#8aa18e]" />
            </div>
            <h3 className="font-serif font-bold text-lg">Direct Rural Logistics</h3>
            <p className="text-xs text-[#526f58] leading-relaxed">
              Standard 2-5 day delivery windows with dispatch directly from village aggregation sheds to preserve living natural freshness.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Growers / Farmer Stories */}
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

      {/* City Kitchen Voices & Urban Families */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
            Reaching Modern Homes Everywhere
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1c382b]">
            City Kitchen Stories
          </h2>
          <p className="text-xs sm:text-sm text-[#526f58]">
            See how urban households across India are replacing adulterated supermarket products with pure village harvests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] transition-all space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#526f58]">
                <span className="font-semibold text-[#1c382b] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#59735d]" />
                  Bengaluru, Karnataka
                </span>
                <span className="text-[#bf563b] font-medium">Verified City Resident</span>
              </div>
              <p className="text-xs text-[#243028] leading-relaxed italic">
                &ldquo;In a high-paced city like Bengaluru, getting authentic cold-pressed coconut oil and high-curcumin Lakadong turmeric was impossible. Supermarket products are chemically bleached. Root &amp; River brought true village purity right into our apartment.&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-[#f0ece3] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1c382b] text-white flex items-center justify-center font-bold text-xs">
                M
              </div>
              <div>
                <span className="font-serif font-bold text-xs text-[#1c382b] block">Meera &amp; Anand S.</span>
                <span className="text-[10px] text-[#526f58]">Indiranagar &bull; Regular Subscriber</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] transition-all space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#526f58]">
                <span className="font-semibold text-[#1c382b] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#59735d]" />
                  Mumbai, Maharashtra
                </span>
                <span className="text-[#bf563b] font-medium">Verified City Resident</span>
              </div>
              <p className="text-xs text-[#243028] leading-relaxed italic">
                &ldquo;My grandmother grew up in rural Konkan and always complained that city supermarket spices have lost their aroma and soul. When the Tellicherry black pepper and A2 Bilona ghee arrived in Mumbai, she smiled and said ‘this is the true village taste of my childhood’.&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-[#f0ece3] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1c382b] text-white flex items-center justify-center font-bold text-xs">
                P
              </div>
              <div>
                <span className="font-serif font-bold text-xs text-[#1c382b] block">Priya &amp; Dr. Kulkarni</span>
                <span className="text-[10px] text-[#526f58]">Worli &bull; 4 Orders Received</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] transition-all space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#526f58]">
                <span className="font-semibold text-[#1c382b] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#59735d]" />
                  Delhi NCR
                </span>
                <span className="text-[#bf563b] font-medium">Verified City Resident</span>
              </div>
              <p className="text-xs text-[#243028] leading-relaxed italic">
                &ldquo;Living in a metro city, we needed clean food for our children without chemical preservatives or artificial food polish. The aromatic Gobindobhog rice and raw wild forest honey have completely transformed our family meals.&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-[#f0ece3] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1c382b] text-white flex items-center justify-center font-bold text-xs">
                K
              </div>
              <div>
                <span className="font-serif font-bold text-xs text-[#1c382b] block">Kabir &amp; Shreya Mehta</span>
                <span className="text-[10px] text-[#526f58]">Vasant Kunj &bull; Household Staples</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metro Reach Bar */}
        <div className="p-4 rounded-2xl bg-[#eef3ef] border border-[#c9d6cb] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#1c382b]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1c382b] text-white">
              <Truck className="w-4 h-4 text-[#8aa18e]" />
            </div>
            <span>
              <strong>Delivering to 28+ Major Cities:</strong> Mumbai, Bengaluru, Delhi NCR, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Jaipur, Kochi &amp; beyond.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#526f58] bg-white px-3 py-1 rounded-full border border-[#c9d6cb]">
            Express Transit: 24 - 72 Hours
          </span>
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1c382b] text-white p-8 sm:p-12 relative overflow-hidden border border-[#264a39] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#264a39] text-[#c9d6cb] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#bf563b]" />
              <span>Contextual AI Sourcing Assistant</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl leading-tight">
              Unsure which traditional herbs or grains suit your recipe?
            </h2>
            <p className="text-xs sm:text-sm text-[#c9d6cb] leading-relaxed">
              Ask our intelligent EarthWise Advisor for recommendations based on traditional Indian culinary practices, evening relaxation teas, or pure wood-pressed cooking oils.
            </p>
            <p className="text-[11px] text-[#8aa18e] italic">
              *Educational culinary guide; not medical or therapeutic advice.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAiAssistantOpen(true)}
            className="px-8 py-4 rounded-xl bg-[#bf563b] hover:bg-[#a7452d] text-white font-serif font-bold text-sm shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch EarthWise Guide</span>
          </button>
        </div>
      </section>

      {/* Village Dispatch Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center">
          <Leaf className="w-6 h-6 text-[#59735d]" />
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1c382b]">
          Receive the Seasonal Harvest Dispatch
        </h2>
        <p className="text-xs text-[#526f58] max-w-md mx-auto">
          Get notified when fresh turmeric is milled, wild honey is gathered, or heirloom fragrant rice is aged and ready for dispatch.
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
