import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, X, ArrowRight, ShoppingBag, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface SuggestionResult {
  product: Product;
  matchScore: number;
  reason: string;
}

export const AiAssistantModal: React.FC = () => {
  const { 
    isAiAssistantOpen, 
    setIsAiAssistantOpen, 
    products, 
    addToCart, 
    openProductDetails 
  } = useStore();

  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<SuggestionResult[] | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  if (!isAiAssistantOpen) return null;

  const quickPrompts = [
    {
      label: 'Evening Calm & Herbal Infusions',
      text: 'Herbal infusions for evening relaxation, calm, and soothing warmth without caffeine',
      category: 'herbs',
    },
    {
      label: 'Traditional Cold-Pressed Cooking',
      text: 'Pure wood-pressed oils and bilona ghee for traditional cooking and rich natural aroma',
      category: 'oils',
    },
    {
      label: 'Festive Grains & Scented Rice',
      text: 'Heirloom rice and native unpolished grains for special recipes and comfort meals',
      category: 'grains',
    },
    {
      label: 'Single-Origin Potent Spices',
      text: 'High-curcumin turmeric and sun-ripened black peppercorns directly from hill farmers',
      category: 'spices',
    },
    {
      label: 'Raw Honey & Pure Jaggery',
      text: 'Unrefined natural sweeteners sourced from wild forest trees and traditional cane pans',
      category: 'honey',
    },
    {
      label: 'Fresh Daily Harvest Greens',
      text: 'Tender country vegetables and greens plucked fresh for family cooking',
      category: 'vegetables',
    },
  ];

  const handleSearch = (searchText: string) => {
    if (!searchText.trim()) return;
    setIsAnalyzing(true);
    setResults(null);

    // Simulate smart contextual analysis with realistic brief delay
    setTimeout(() => {
      const q = searchText.toLowerCase();
      const scored: SuggestionResult[] = [];

      products.forEach((prod) => {
        let score = 0;
        let reasons: string[] = [];

        // Check text matches
        if (q.includes(prod.category)) score += 30;
        if (prod.ingredients.some(ing => q.includes(ing.toLowerCase()))) score += 25;
        if (prod.name.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))) score += 20;
        if (q.includes('tea') || q.includes('herbal') || q.includes('calm') || q.includes('relax') || q.includes('infusion')) {
          if (prod.category === 'herbs') {
            score += 35;
            reasons.push('Contains traditional whole botanical leaves and herbs celebrated for calming rituals.');
          }
        }
        if (q.includes('oil') || q.includes('ghee') || q.includes('cooking') || q.includes('chekku') || q.includes('fat')) {
          if (prod.category === 'oils') {
            score += 35;
            reasons.push('Extracted using cold mechanical pressure without solvent refining, preserving natural aroma.');
          }
        }
        if (q.includes('sweet') || q.includes('honey') || q.includes('jaggery') || q.includes('sugar') || q.includes('dessert')) {
          if (prod.category === 'honey') {
            score += 35;
            reasons.push('Raw and unheated sweetener rich in natural enzymes and trace floral elements.');
          }
        }
        if (q.includes('rice') || q.includes('grain') || q.includes('millet') || q.includes('khichdi') || q.includes('fiber')) {
          if (prod.category === 'grains') {
            score += 35;
            reasons.push('Heritage variety with unpolished nutrient bran layers for sustained energy.');
          }
        }
        if (q.includes('turmeric') || q.includes('curcumin') || q.includes('spice') || q.includes('pepper') || q.includes('golden')) {
          if (prod.category === 'spices') {
            score += 35;
            reasons.push('Single-origin mountain harvest with high concentration of volatile aromatic oils.');
          }
        }
        if (q.includes('vegetable') || q.includes('green') || q.includes('fresh') || q.includes('spinach') || q.includes('palak')) {
          if (prod.category === 'vegetables') {
            score += 35;
            reasons.push('Fresh dawn harvest tied with natural jute, dispatched directly from village riverbanks.');
          }
        }

        if (score > 15) {
          const defaultReason = reasons[0] || `Selected for its authentic origin in ${prod.villageOrigin} and gentle small-batch preparation.`;
          scored.push({
            product: prod,
            matchScore: score,
            reason: defaultReason,
          });
        }
      });

      // Sort by score
      scored.sort((a, b) => b.matchScore - a.matchScore);
      setResults(scored.slice(0, 4));
      setIsAnalyzing(false);
    }, 450);
  };

  const handlePromptClick = (prompt: typeof quickPrompts[0]) => {
    setSelectedGoal(prompt.label);
    setQuery(prompt.text);
    handleSearch(prompt.text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14281f]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#fffdfa] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#d6cfc2] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-advisor-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#1c382b] text-[#fbf9f4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#264a39] flex items-center justify-center border border-[#335d48]">
              <Sparkles className="w-5 h-5 text-[#8aa18e]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="ai-advisor-title" className="text-lg font-serif font-bold text-white">
                  EarthWise Shopping Guide
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#bf563b] text-white font-medium">
                  Smart Contextual Advisor
                </span>
              </div>
              <p className="text-xs text-[#c9d6cb]">
                Intelligent seasonal suggestions based on traditional village sourcing &amp; culinary traditions
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAiAssistantOpen(false)}
            className="p-2 text-[#c9d6cb] hover:text-white hover:bg-[#264a39] rounded-lg transition-colors cursor-pointer"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Strip */}
        <div className="px-6 py-2.5 bg-[#f6f1e7] border-b border-[#e4dcce] flex items-center gap-2.5 text-xs text-[#526f58]">
          <AlertCircle className="w-4 h-4 text-[#bf563b] shrink-0" />
          <span>
            <strong>Educational &amp; Culinary Advice Only:</strong> This rule-based prototype does not offer medical advice or therapeutic guarantees. Please always inspect product labels for personal dietary allergies.
          </span>
        </div>

        {/* Main Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#243028]">
          {/* Query Bar */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#1c382b] uppercase tracking-wider">
              What are you looking to cook or experience?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                placeholder="e.g., Aromatic herbal tea for bedtime, or cold-pressed oil for sautéing..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b] placeholder-[#8aa18e] focus:outline-none focus:ring-2 focus:ring-[#1c382b] text-sm"
              />
              <button
                type="button"
                onClick={() => handleSearch(query)}
                disabled={isAnalyzing || !query.trim()}
                className="px-5 py-2.5 bg-[#1c382b] text-white font-semibold text-xs rounded-xl hover:bg-[#264a39] disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Guide Me</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Prompt chips */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#526f58] uppercase tracking-wider">
              Explore Popular Intentions:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handlePromptClick(p)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedGoal === p.label
                      ? 'bg-[#1c382b] text-white border-[#1c382b]'
                      : 'bg-[#f6f1e7] text-[#1c382b] border-[#e4dcce] hover:border-[#1c382b]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Display */}
          {isAnalyzing && (
            <div className="py-12 text-center space-y-3">
              <div className="inline-block p-3 rounded-full bg-[#eef3ef] text-[#1c382b] animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-[#1c382b]">
                Matching village harvests and traditional preparations...
              </p>
            </div>
          )}

          {!isAnalyzing && results && results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-base text-[#1c382b]">
                  Recommended Sourced Selections ({results.length})
                </h4>
                <span className="text-xs text-[#526f58]">Matched by sourcing &amp; culinary tradition</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map(({ product, reason }) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-xl border border-[#e4dcce] bg-white hover:border-[#8aa18e] transition-all flex flex-col justify-between space-y-3 shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#e4dcce]"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#bf563b] block">
                            {product.categoryLabel}
                          </span>
                          <h5 
                            onClick={() => {
                              openProductDetails(product.id);
                              setIsAiAssistantOpen(false);
                            }}
                            className="font-serif font-bold text-sm text-[#1c382b] hover:text-[#bf563b] cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h5>
                          <p className="text-xs text-[#526f58] line-clamp-1">
                            {product.villageOrigin}, {product.state}
                          </p>
                          <div className="text-xs font-semibold text-[#1c382b] mt-1">
                            ₹{product.price}{' '}
                            <span className="text-[11px] font-normal text-[#59735d]">
                              / {product.currentPackSize}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* AI Reasoning box */}
                      <div className="p-2.5 rounded-lg bg-[#eef3ef] border border-[#c9d6cb] text-xs text-[#1c382b] leading-relaxed">
                        <strong className="text-[#1c382b] block font-semibold mb-0.5">Why this fits:</strong>
                        {reason}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-[#f0ece3]">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(product, product.currentPackSize, 1);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-[#1c382b] text-white hover:bg-[#284c3b] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Basket</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          openProductDetails(product.id);
                          setIsAiAssistantOpen(false);
                        }}
                        className="py-1.5 px-3 rounded-lg border border-[#c9d6cb] text-[#1c382b] hover:bg-[#f6f1e7] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isAnalyzing && results && results.length === 0 && (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm text-[#526f58]">
                No exact harvest match found for "{query}". Try checking our categories like <em>herbs</em>, <em>spices</em>, <em>honey</em>, or <em>grains</em>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#f6f1e7] border-t border-[#e4dcce] flex items-center justify-between text-xs text-[#526f58]">
          <span>Root &amp; River Prototype Intelligent Assistant</span>
          <button
            type="button"
            onClick={() => setIsAiAssistantOpen(false)}
            className="font-semibold text-[#1c382b] hover:underline cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
