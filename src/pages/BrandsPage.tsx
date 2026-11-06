import React from 'react';
import { useStore } from '../context/StoreContext';
import { VILLAGE_BRANDS } from '../data/brands';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Percent, 
  Sparkles, 
  Users,
  Award,
  ChevronRight,
  Leaf
} from 'lucide-react';

export const BrandsPage: React.FC = () => {
  const { openBrandShop, products, setActivePage } = useStore();

  const getBrandProductCount = (brandId: string) => {
    return products.filter((p) => p.brandId === brandId).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb (Matches reference video) */}
      <div className="flex items-center gap-2 text-xs text-[#526f58]">
        <button 
          onClick={() => setActivePage('home')} 
          className="hover:text-[#1c382b] font-medium cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#8aa18e]" />
        <span>Pages</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#8aa18e]" />
        <span className="font-bold text-[#1c382b]">Brands &amp; Grower Collectives</span>
      </div>

      {/* Page Title & Intro */}
      <div className="space-y-2 border-b border-[#e4dcce] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef3ef] text-[#1c382b] text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5 text-[#2e6844]" />
          <span>Village Producer Collectives</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1c382b]">
          All Brands &amp; Rural Collectives
        </h1>
        <p className="text-xs sm:text-sm text-[#526f58] max-w-2xl leading-relaxed">
          Every brand on Root &amp; River represents an authentic village farming cluster with certified single-origin provenance, traditional seed heritage, and zero middleman exploitation.
        </p>
      </div>

      {/* Brands Grid (Matches reference video frame_000) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {VILLAGE_BRANDS.map((brand) => {
          const count = getBrandProductCount(brand.id);
          return (
            <div
              key={brand.id}
              onClick={() => openBrandShop(brand.id)}
              className="bg-[#fffdfa] rounded-2xl border border-[#e4dcce] hover:border-[#2e6844] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between space-y-4 cursor-pointer group relative overflow-hidden"
            >
              {/* Top Row: Logo & Established Tag */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#f6f1e7] border border-[#e4dcce] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-[#1c382b] transition-all duration-300">
                    <span>{brand.logo}</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#eef3ef] text-[#2e6844] border border-[#c9d6cb]">
                    Est. {brand.established}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1c382b] group-hover:text-[#2e6844] transition-colors leading-snug">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-[#bf563b] font-medium mt-0.5">
                    {brand.tagline}
                  </p>
                </div>

                <p className="text-xs text-[#526f58] leading-relaxed line-clamp-2">
                  {brand.description}
                </p>
              </div>

              {/* Bottom Metadata & CTA */}
              <div className="pt-3 border-t border-[#f0ece3] space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#526f58]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8aa18e]" />
                    <span>{brand.district}, {brand.state}</span>
                  </span>
                  <span className="font-bold text-[#1c382b] bg-[#f6f1e7] px-2 py-0.5 rounded text-[11px]">
                    {count} Harvests
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#526f58] flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#8aa18e]" />
                    <span>{brand.farmerCount} Family Farmers</span>
                  </span>
                  <span className="text-xs font-bold text-[#2e6844] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Shop Brand</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Feature Trust Cards (Exact recreation of reference video frame_000 bottom strip) */}
      <div className="pt-8 border-t border-[#e4dcce]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-5 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] transition-all flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#faeee9] text-[#bf563b] flex items-center justify-center shrink-0">
              <Percent className="w-5 h-5 text-[#bf563b]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#1c382b]">
                Best prices &amp; offers
              </h4>
              <p className="text-[11px] text-[#526f58] leading-relaxed">
                Discover unbeatable farm-direct savings with no middleman price markups.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-5 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] transition-all flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#eef3ef] text-[#2e6844] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#2e6844]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#1c382b]">
                Speed delivery
              </h4>
              <p className="text-[11px] text-[#526f58] leading-relaxed">
                Experience lightning-fast 24-72h express transit to all major metropolitan cities.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-5 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] transition-all flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#faeee9] text-[#bf563b] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#bf563b]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#1c382b]">
                Great daily deal
              </h4>
              <p className="text-[11px] text-[#526f58] leading-relaxed">
                Seasonal harvest pickings with exclusive batch coupon discounts.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-5 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] transition-all flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#eef3ef] text-[#2e6844] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#2e6844]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#1c382b]">
                100% Quality Products
              </h4>
              <p className="text-[11px] text-[#526f58] leading-relaxed">
                Single-origin lab purity tested you can rely on for your family's health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

