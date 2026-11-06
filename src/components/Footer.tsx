import React from 'react';
import { useStore, PageView } from '../context/StoreContext';
import { Leaf, Mail, Phone, MapPin, Share2, ShieldAlert, Sparkles, SlidersHorizontal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    prototypeSettings, 
    setActivePage, 
    setIsSettingsModalOpen, 
    setSelectedCategoryFilter 
  } = useStore();

  const handleNav = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14281f] text-[#ece3d3] pt-16 pb-12 border-t border-[#264a39]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#264a39] flex items-center justify-center text-[#8aa18e] border border-[#335d48]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-white block">
                  Root &amp; River
                </span>
                <span className="text-xs text-[#8aa18e] tracking-wider uppercase block">
                  Goodness grown close to the earth
                </span>
              </div>
            </div>

            <p className="text-xs text-[#c9d6cb] leading-relaxed max-w-sm">
              Root &amp; River bridges conscious households with independent village growers, traditional oil millers, and rural women's herb guilds. We champion small-batch harvests, soil health, and honest origin traceability.
            </p>

            {/* Editable Contact Placeholders */}
            <div className="p-4 rounded-xl bg-[#1c382b] border border-[#264a39] space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-[#264a39]">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8aa18e]">
                  Editable Shop Details (Placeholders)
                </span>
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="text-[11px] text-[#f5a894] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  Edit
                </button>
              </div>

              <div className="flex items-start gap-2 text-[#c9d6cb]">
                <Mail className="w-3.5 h-3.5 text-[#8aa18e] shrink-0 mt-0.5" />
                <span className="font-mono text-[11px]">{prototypeSettings.shopEmail}</span>
              </div>

              <div className="flex items-start gap-2 text-[#c9d6cb]">
                <Phone className="w-3.5 h-3.5 text-[#8aa18e] shrink-0 mt-0.5" />
                <span className="font-mono text-[11px]">{prototypeSettings.phone}</span>
              </div>

              <div className="flex items-start gap-2 text-[#c9d6cb]">
                <MapPin className="w-3.5 h-3.5 text-[#8aa18e] shrink-0 mt-0.5" />
                <span className="font-mono text-[11px]">{prototypeSettings.businessAddress}</span>
              </div>

              <div className="flex items-start gap-2 text-[#c9d6cb]">
                <Share2 className="w-3.5 h-3.5 text-[#8aa18e] shrink-0 mt-0.5" />
                <span className="font-mono text-[11px]">{prototypeSettings.socialHandle}</span>
              </div>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide">
              Harvest Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#c9d6cb]">
              <li>
                <button onClick={() => handleCategoryClick('vegetables')} className="hover:text-white transition-colors cursor-pointer">
                  Fresh Vegetables &amp; Greens
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('spices')} className="hover:text-white transition-colors cursor-pointer">
                  Turmeric &amp; Hill Spices
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('herbs')} className="hover:text-white transition-colors cursor-pointer">
                  Tulsi &amp; Traditional Herbs
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('honey')} className="hover:text-white transition-colors cursor-pointer">
                  Raw Forest Honey &amp; Gur
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('grains')} className="hover:text-white transition-colors cursor-pointer">
                  Heritage Rice &amp; Millets
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('oils')} className="hover:text-white transition-colors cursor-pointer">
                  Wood-Pressed Chekku Oils
                </button>
              </li>
            </ul>
          </div>

          {/* Sourcing & Story Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide">
              Root &amp; River
            </h4>
            <ul className="space-y-2 text-xs text-[#c9d6cb]">
              <li>
                <button onClick={() => handleNav('story')} className="hover:text-white transition-colors cursor-pointer">
                  Our Village Sourcing Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('herbs')} className="hover:text-white transition-colors cursor-pointer">
                  Herbal Preparation Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Village Collective Inquiry
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Customer Account &amp; Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setIsSettingsModalOpen(true)} className="hover:text-white transition-colors cursor-pointer text-[#8aa18e]">
                  Certification &amp; Launch Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Sourcing Transparency & Prototype Policies */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide">
              Store Governance &amp; Terms
            </h4>
            <ul className="space-y-2 text-xs text-[#c9d6cb]">
              <li>
                <span className="block text-[#8aa18e]">Delivery &amp; Courier:</span>
                <span>Farm-to-fork dispatch in 1-4 business days</span>
              </li>
              <li>
                <span className="block text-[#8aa18e]">Returns &amp; Replacements:</span>
                <span>Perishable damage guarantee within 24 hours</span>
              </li>
              <li>
                <span className="block text-[#8aa18e]">Food Safety &amp; Handling:</span>
                <span>Store spices &amp; herbs in dry airtight containers</span>
              </li>
              <li>
                <span className="block text-[#8aa18e]">Privacy Policy:</span>
                <span>Client demo mode &bull; No cookies sold</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype & Health Disclaimers Band */}
        <div className="p-4 rounded-xl bg-[#1c382b]/80 border border-[#264a39] text-xs text-[#c9d6cb] space-y-2">
          <div className="flex items-center gap-2 text-[#f5a894] font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Prototype Transparency &amp; Non-Medical Disclosure</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            <strong>Educational Herbal Content:</strong> All statements regarding Tulsi, Ashwagandha, and traditional botanicals are educational reflections of rural culinary practices and do not constitute medical advice or health claims.
            <br />
            <strong>Organic Sourcing Notice:</strong> Under Indian FSSAI and NPOP regulations, official organic labels (Jaivik Bharat / PGS) require verified statutory audit filings. All certification data on this prototype website is sample placeholder documentation.
          </p>
        </div>

        {/* Bottom credits */}
        <div className="border-t border-[#264a39] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8aa18e]">
          <p>
            &copy; 2026 Root &amp; River. Goodness grown close to the earth. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[#c9d6cb]">
              Crafted for sustainable rural agriculture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
