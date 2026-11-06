import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Leaf, ShieldAlert, Sparkles, BookOpen, Coffee, Flame, Heart, Info, Clock, Check } from 'lucide-react';

export const HerbsPantryPage: React.FC = () => {
  const { products, openProductDetails, addToCart } = useStore();

  const herbsAndPantryProducts = products.filter(
    (p) => p.category === 'herbs' || p.category === 'oils' || p.category === 'spices'
  );

  const traditionalRituals = [
    {
      title: 'Grandmother’s Golden Turmeric Milk',
      herb: 'Lakadong Turmeric + Malabar Black Pepper',
      prepTime: '5 minutes',
      description: 'A comforting evening ritual steeped in village homes across the seasons.',
      steps: [
        'Warm 1 cup of fresh milk (or almond milk) in a small brass or steel pot over gentle heat.',
        'Whisk in 1/2 teaspoon of Single-Origin Lakadong Turmeric Powder.',
        'Crucial step: Add a generous pinch of freshly crushed Tellicherry Black Pepper (piperine supports curcumin absorption).',
        'Add 1 teaspoon of raw honey or shaved Kolhapuri gur once removed from direct heat.',
      ],
      disclaimer: 'Traditional comforting beverage. Not intended to treat, cure, or diagnose any medical illness.',
    },
    {
      title: 'Sacred Tulsi & Hill Lemongrass Morning Brew',
      herb: 'Krishna Tulsi + Mountain Lemongrass',
      prepTime: '6 minutes',
      description: 'An uplifting dawn infusion bringing the fresh clarity of rural mountain slopes.',
      steps: [
        'Bring 250ml of clean spring water to a rolling boil, then remove from active flame.',
        'Add 1 teaspoon of whole dried Tulsi leaves and 1/2 teaspoon of cut Nilgiri Lemongrass.',
        'Cover with a lid and allow the botanicals to steep undisturbed for 5 minutes so volatile oils remain trapped.',
        'Strain into a warm cup and enjoy plain or with a few drops of wild forest honey.',
      ],
      disclaimer: 'Caffeine-free botanical infusion for general well-being. Not medical advice.',
    },
    {
      title: 'Traditional Wood-Pressed Chekku Tempering (Tadka)',
      herb: 'Wood-Pressed Coconut Oil + Kachi Ghani Mustard Oil',
      prepTime: '3 minutes',
      description: 'How cold-pressed village oils unlock the phytonutrients of whole spices.',
      steps: [
        'Gently warm 1 tablespoon of cold-pressed oil in a heavy-bottomed iron tadka pan over low flame.',
        'Observe the fresh nutty aroma as the oil reaches warm cooking temperature (do not burn).',
        'Add mustard seeds, cumin, and fresh curry leaves; allow seeds to splutter gently.',
        'Pour immediately over steaming lentils, rasam, or poriyal for authentic village fragrance.',
      ],
      disclaimer: 'Culinary guidance for maximum flavor and heat stability.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef3ef] text-[#1c382b] text-xs font-semibold">
          <Leaf className="w-3.5 h-3.5 text-[#59735d]" />
          <span>Village Botanical Knowledge</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#1c382b] leading-tight">
          Traditional Herbs &amp; Country Pantry
        </h1>
        <p className="text-xs sm:text-sm text-[#526f58] leading-relaxed">
          Centuries of village kitchen wisdom passed through generations. Discover whole-leaf sacred Tulsi, slow-milled roots, wild forest honey, and artisanal wood-pressed oils.
        </p>
      </div>

      {/* Mandatory Non-Medical Disclaimer Alert */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#faeee9] border border-[#f0cfc5] text-xs text-[#8f3620] space-y-1.5 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 shrink-0 text-[#bf563b] mt-0.5" />
        <div>
          <strong className="font-semibold text-sm text-[#a7452d] block mb-0.5">
            General Educational Notice &bull; Not Medical Advice
          </strong>
          <p className="leading-relaxed">
            All herbal and botanical information provided on this page is for general educational and traditional cultural appreciation only. None of these products or descriptions are intended to diagnose, treat, cure, or prevent any disease. Do not substitute traditional herbal preparations for qualified professional medical care. Always verify dietary suitability if you have medical conditions or take prescription pharmaceuticals.
          </p>
        </div>
      </div>

      {/* Traditional Recipes / Preparation Rituals */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
              Household Preparations
            </span>
            <h2 className="font-serif font-bold text-2xl text-[#1c382b]">
              Traditional Preparation Guides
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {traditionalRituals.map((ritual, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#fffdfa] border border-[#e4dcce] hover:border-[#8aa18e] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#526f58]">
                  <span className="font-semibold text-[#bf563b]">{ritual.herb}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ritual.prepTime}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#1c382b] leading-snug">
                  {ritual.title}
                </h3>
                <p className="text-xs text-[#526f58]">
                  {ritual.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#f0ece3]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1c382b] block">
                    Preparation Method:
                  </span>
                  <ol className="space-y-1.5 text-xs text-[#243028] list-decimal list-inside">
                    {ritual.steps.map((step, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f6f1e7] text-[10px] text-[#59735d] italic border border-[#e4dcce]">
                {ritual.disclaimer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Herb & Pantry Products Catalog */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
            From Village Sheds &amp; Groves
          </span>
          <h2 className="font-serif font-bold text-2xl text-[#1c382b]">
            Available Herbs, Spices &amp; Cold-Pressed Oils
          </h2>
          <p className="text-xs text-[#526f58]">
            Carefully packaged in food-grade glass, tins, and aerated paper to preserve natural botanical potency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {herbsAndPantryProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};
