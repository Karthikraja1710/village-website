import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  Calendar, 
  Clock, 
  Leaf, 
  ShieldAlert, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  Edit3, 
  Plus, 
  Minus,
  MessageSquare,
  Zap
} from 'lucide-react';
import { Product } from '../types';

export const ProductModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    expressCheckout,
    openBrandShop,
    toggleFavorite, 
    isFavorite,
    addProductReview,
    userProfile,
    formatPrice 
  } = useStore();

  if (!selectedProduct) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'origin' | 'herbs' | 'reviews' | 'certifications'>('details');
  const [selectedPack, setSelectedPack] = useState(selectedProduct.currentPackSize || selectedProduct.packSizes[0]?.size || 'Standard');
  const [quantity, setQuantity] = useState(1);

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewAuthor, setReviewAuthor] = useState(userProfile.name || '');

  // Calculate current price based on pack size
  const currentPackOption = selectedProduct.packSizes.find(p => p.size === selectedPack) || selectedProduct.packSizes[0];
  const currentPrice = currentPackOption ? currentPackOption.price : selectedProduct.price;
  const currentOriginalPrice = currentPackOption?.originalPrice || selectedProduct.originalPrice;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) return;
    
    addProductReview(selectedProduct.id, {
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      author: reviewAuthor || 'Kind Village Visitor',
    });

    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedPack, quantity);
  };

  const favorited = isFavorite(selectedProduct.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#14281f]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#fffdfa] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#d6cfc2] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-3.5 bg-[#f6f1e7] border-b border-[#e4dcce] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#bf563b] bg-[#faeee9] px-2.5 py-0.5 rounded-full border border-[#f0cfc5]">
              {selectedProduct.categoryLabel}
            </span>
            <span className="text-xs text-[#526f58] hidden sm:inline">
              &bull; Lot {selectedProduct.batchLotNumber}
            </span>
          </div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 text-[#526f58] hover:text-[#1c382b] hover:bg-[#ece3d3] rounded-lg transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#243028]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Product Images & Visual Badges */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-[#f6f1e7] border border-[#e4dcce] aspect-4/3 sm:aspect-square">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                {selectedProduct.badge && (
                  <div className="absolute top-3 left-3 bg-[#1c382b] text-[#fbf9f4] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {selectedProduct.badge}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => toggleFavorite(selectedProduct.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer ${
                    favorited
                      ? 'bg-[#faeee9] text-[#bf563b]'
                      : 'bg-white/80 text-[#59735d] hover:text-[#bf563b]'
                  }`}
                  aria-label={favorited ? 'Remove from liked' : 'Add to liked'}
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-[#bf563b]' : ''}`} />
                </button>
              </div>

              {/* Quick Origin Badge Box */}
              <div className="p-3.5 rounded-xl bg-[#eef3ef] border border-[#c9d6cb] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1c382b]">
                  <MapPin className="w-4 h-4 text-[#59735d]" />
                  <span>Harvest Origin: {selectedProduct.villageOrigin}, {selectedProduct.state}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#526f58] pt-1 border-t border-[#c9d6cb]">
                  <span>Grower: <strong>{selectedProduct.growerName}</strong></span>
                  <span>{selectedProduct.harvestDate}</span>
                </div>
              </div>
            </div>

            {/* Right: Info, Price, Pack Sizes, Add to Cart */}
            <div className="space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                {selectedProduct.localName && (
                  <span className="text-xs font-medium text-[#59735d]">
                    Traditional name: {selectedProduct.localName}
                  </span>
                )}
                <h2 id="product-modal-title" className="font-serif font-bold text-2xl text-[#1c382b] leading-tight">
                  {selectedProduct.name}
                </h2>
                {selectedProduct.brandName && (
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedProduct.brandId) {
                        openBrandShop(selectedProduct.brandId);
                        setSelectedProduct(null);
                      }
                    }}
                    className="text-xs font-semibold text-[#2e6844] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>By {selectedProduct.brandName}</span>
                    <span className="text-[10px] bg-[#eef3ef] px-1.5 py-0.5 rounded text-[#2e6844] font-normal">&bull; Explore Brand &rarr;</span>
                  </button>
                )}
                <p className="text-xs text-[#526f58] leading-relaxed">
                  {selectedProduct.tagline}
                </p>

                {/* Rating & Stock */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#1c382b] bg-[#f6f1e7] px-2.5 py-1 rounded-md border border-[#e4dcce]">
                    <Star className="w-3.5 h-3.5 fill-[#d49e35] text-[#d49e35]" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-[#8aa18e] font-normal">
                      ({selectedProduct.reviewCount} sample reviews)
                    </span>
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    selectedProduct.stockStatus === 'in-stock'
                      ? 'bg-[#eef3ef] text-[#2e6844] border border-[#c9d6cb]'
                      : 'bg-[#faeee9] text-[#bf563b] border border-[#f0cfc5]'
                  }`}>
                    {selectedProduct.stockStatus === 'in-stock' ? `In Stock (${selectedProduct.availableQuantity} units left)` : 'Seasonal Reserve'}
                  </span>
                </div>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-3">
                  <span className="text-3xl font-serif font-bold text-[#1c382b]">
                    {formatPrice(currentPrice)}
                  </span>
                  {currentOriginalPrice && (
                    <span className="text-sm line-through text-[#8aa18e]">
                      {formatPrice(currentOriginalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-[#526f58]">
                    Taxes included &bull; Multi-currency enabled
                  </span>
                </div>

                {/* Pack Size Selector */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-[#1c382b] uppercase tracking-wider">
                    Select Pack Size / Quantity:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.packSizes.map((pack) => (
                      <button
                        key={pack.size}
                        type="button"
                        onClick={() => setSelectedPack(pack.size)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          selectedPack === pack.size
                            ? 'bg-[#1c382b] text-white border-[#1c382b] shadow-xs'
                            : 'bg-white text-[#1c382b] border-[#c9d6cb] hover:border-[#1c382b]'
                        }`}
                      >
                        <span className="font-semibold block">{pack.size}</span>
                        <span className="text-[11px] opacity-90">{formatPrice(pack.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className="flex items-center gap-2 text-xs text-[#526f58] pt-2">
                  <Clock className="w-4 h-4 text-[#8aa18e]" />
                  <span>Estimated Delivery: <strong>{selectedProduct.estimatedDelivery}</strong> (Worldwide Air Express: 5-9 days)</span>
                </div>
              </div>

              {/* Action Buttons: Quantity Counter + Add to Basket */}
              <div className="pt-4 border-t border-[#e4dcce] flex flex-col sm:flex-row gap-3">
                <div className="flex items-center border border-[#c9d6cb] rounded-xl bg-[#fbf9f4] self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-[#1c382b] hover:bg-[#ece3d3] rounded-l-xl transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-sm text-[#1c382b]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-[#1c382b] hover:bg-[#ece3d3] rounded-r-xl transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 bg-[#1c382b] text-white font-serif font-bold text-xs sm:text-sm rounded-xl hover:bg-[#284c3b] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#8aa18e]" />
                  <span>Add to Basket &bull; {formatPrice(currentPrice * quantity)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    expressCheckout(selectedProduct, selectedPack, quantity);
                    setSelectedProduct(null);
                  }}
                  className="py-3 px-5 bg-[#bf563b] hover:bg-[#a7452d] text-white font-serif font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Express 1-Click Checkout"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation for Detailed Sections */}
          <div className="border-t border-[#e4dcce] pt-6">
            <div className="flex border-b border-[#e4dcce] overflow-x-auto gap-4 sm:gap-8 pb-px">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-[#1c382b] text-[#1c382b]'
                    : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
                }`}
              >
                Description &amp; Processing
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('origin')}
                className={`pb-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'origin'
                    ? 'border-[#1c382b] text-[#1c382b]'
                    : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
                }`}
              >
                Grower &amp; Village Story
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('herbs')}
                className={`pb-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'herbs'
                    ? 'border-[#1c382b] text-[#1c382b]'
                    : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
                }`}
              >
                Traditional Uses &amp; Culinary Tips
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('certifications')}
                className={`pb-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'certifications'
                    ? 'border-[#1c382b] text-[#1c382b]'
                    : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
                }`}
              >
                Traceability &amp; Certification Placeholder
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-[#1c382b] text-[#1c382b]'
                    : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
                }`}
              >
                Community Reviews ({selectedProduct.reviews.length})
              </button>
            </div>

            {/* Tab 1: Details & Processing */}
            {activeTab === 'details' && (
              <div className="pt-5 space-y-4 text-xs leading-relaxed text-[#243028]">
                <p className="text-sm text-[#1c382b]">{selectedProduct.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] space-y-1.5">
                    <h4 className="font-semibold text-xs text-[#1c382b] uppercase tracking-wider">
                      Ingredients
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-[#526f58]">
                      {selectedProduct.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] space-y-1.5">
                    <h4 className="font-semibold text-xs text-[#1c382b] uppercase tracking-wider">
                      Harvest &amp; Packing Timelines
                    </h4>
                    <p className="text-[#526f58]"><strong>Harvest:</strong> {selectedProduct.harvestDate}</p>
                    <p className="text-[#526f58]"><strong>Packing:</strong> {selectedProduct.packingDate}</p>
                    <p className="text-[#526f58]"><strong>Batch Lot:</strong> {selectedProduct.batchLotNumber}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#e4dcce] space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#1c382b]">
                    Traditional Small-Batch Processing
                  </h4>
                  <p className="text-[#526f58]">{selectedProduct.processingDetails}</p>
                  <p className="text-[#526f58] pt-1"><strong>Soil &amp; Cultivation:</strong> {selectedProduct.growingDetails}</p>
                </div>
              </div>
            )}

            {/* Tab 2: Origin & Grower Story */}
            {activeTab === 'origin' && (
              <div className="pt-5 space-y-4">
                <div className="p-5 rounded-xl bg-[#eef3ef] border border-[#c9d6cb] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#1c382b] text-white flex items-center justify-center font-serif text-lg font-bold">
                      {selectedProduct.growerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#1c382b]">
                        {selectedProduct.growerName}
                      </h4>
                      <p className="text-xs text-[#526f58]">
                        {selectedProduct.growerExperience} &bull; {selectedProduct.villageOrigin}, {selectedProduct.district}, {selectedProduct.state}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#243028] leading-relaxed italic bg-white/70 p-3.5 rounded-lg border border-[#c9d6cb]">
                    &ldquo;{selectedProduct.growerStory}&rdquo;
                  </p>
                  <div className="text-xs text-[#526f58] flex flex-wrap gap-4 pt-1">
                    <span>Village Origin: <strong>{selectedProduct.villageOrigin}</strong></span>
                    <span>State: <strong>{selectedProduct.state}</strong></span>
                    <span>Direct Grower Relationship: <strong>Verified Partner Collective</strong></span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Herbs, Traditional Uses & Preparation Suggestions */}
            {activeTab === 'herbs' && (
              <div className="pt-5 space-y-4">
                {/* Non-Medical Disclaimer Alert */}
                <div className="p-4 rounded-xl bg-[#faeee9] border border-[#f0cfc5] flex items-start gap-3 text-xs text-[#8f3620]">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-[#bf563b] mt-0.5" />
                  <div>
                    <strong className="font-semibold block mb-0.5">Educational Traditional Knowledge Notice:</strong>
                    Traditional uses described below reflect regional rural folklore and culinary traditions. This content is provided strictly for educational appreciation and is <strong>not medical advice, diagnosis, or therapeutic treatment</strong>. Consult a qualified medical practitioner before using concentrated botanicals if you are pregnant, nursing, or taking prescription medicine.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] space-y-2">
                    <h4 className="font-serif font-bold text-sm text-[#1c382b] flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-[#59735d]" />
                      Traditional Household Use
                    </h4>
                    <p className="text-xs text-[#526f58] leading-relaxed">
                      {selectedProduct.traditionalUses || 'Used traditionally in Indian kitchens as a revered culinary accent and warm household remedy.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] space-y-2">
                    <h4 className="font-serif font-bold text-sm text-[#1c382b] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#59735d]" />
                      Culinary &amp; Preparation Tip
                    </h4>
                    <p className="text-xs text-[#526f58] leading-relaxed">
                      {selectedProduct.culinaryTips || 'Store in an airtight container in a cool, dry place away from direct light.'}
                    </p>
                  </div>
                </div>

                {selectedProduct.allergyNotice && (
                  <div className="p-3 rounded-lg bg-[#eef3ef] border border-[#c9d6cb] text-xs text-[#264a39]">
                    <strong>Allergen Notice:</strong> {selectedProduct.allergyNotice}
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Certification & Traceability */}
            {activeTab === 'certifications' && (
              <div className="pt-5 space-y-4">
                <div className="p-4 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#1c382b] flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#bf563b]" />
                    Certification &amp; Label Verification Notice
                  </h4>
                  <p className="text-xs text-[#526f58] leading-relaxed">
                    Root &amp; River prioritizes honest, truthful labeling. We do not claim any product is officially certified organic or chemical-free unless backed by official regulatory certificates. The fields below are sample placeholders for prototype demonstration:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                    <div className="p-3 bg-white rounded-lg border border-[#e4dcce]">
                      <span className="text-[#8aa18e] block uppercase text-[10px] tracking-wider font-semibold">
                        Certification Status
                      </span>
                      <span className="font-medium text-[#1c382b]">{selectedProduct.certificationStatus}</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-[#e4dcce]">
                      <span className="text-[#8aa18e] block uppercase text-[10px] tracking-wider font-semibold">
                        Scheme / Standard Placeholder
                      </span>
                      <span className="font-medium text-[#1c382b]">{selectedProduct.certificationScheme}</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-[#e4dcce]">
                      <span className="text-[#8aa18e] block uppercase text-[10px] tracking-wider font-semibold">
                        Traceability Lot Number
                      </span>
                      <span className="font-mono text-[#1c382b]">{selectedProduct.batchLotNumber}</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-[#e4dcce]">
                      <span className="text-[#8aa18e] block uppercase text-[10px] tracking-wider font-semibold">
                        Official Audit Status
                      </span>
                      <span className="text-[#bf563b] font-medium">Pending Launch Verification</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#8aa18e] italic">
                    {selectedProduct.certificationNote}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 5: Community Reviews & Write Review Form */}
            {activeTab === 'reviews' && (
              <div className="pt-5 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#1c382b]">
                      Customer Feedback ({selectedProduct.reviews.length})
                    </h4>
                    <p className="text-xs text-[#526f58]">
                      Sample reviews clearly distinguished from live customer contributions
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c382b] text-white text-xs font-semibold hover:bg-[#284c3b] transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{showReviewForm ? 'Cancel Form' : 'Write a Review'}</span>
                  </button>
                </div>

                {/* Review Form Drawer */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="p-4 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] space-y-3">
                    <h5 className="font-serif font-bold text-sm text-[#1c382b]">
                      Share Your Experience with this Harvest
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#1c382b] mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#1c382b] mb-1">
                          Rating (1 - 5 Stars)
                        </label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ 5 - Exceptional village quality</option>
                          <option value={4}>⭐⭐⭐⭐ 4 - Very good</option>
                          <option value={3}>⭐⭐⭐ 3 - Good</option>
                          <option value={2}>⭐⭐ 2 - Average</option>
                          <option value={1}>⭐ 1 - Needs improvement</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1c382b] mb-1">
                        Review Title
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g., Authentic flavor and wonderful aroma"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1c382b] mb-1">
                        Detailed Comments
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Tell others about how you prepared it, aroma, texture..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-3 py-1.5 text-xs text-[#526f58] hover:bg-[#ece3d3] rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-semibold bg-[#1c382b] text-white rounded-lg hover:bg-[#284c3b] cursor-pointer"
                      >
                        Post Demo Review
                      </button>
                    </div>
                  </form>
                )}

                {/* Review List */}
                <div className="space-y-3">
                  {selectedProduct.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl border border-[#e4dcce] bg-white space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#1c382b]">{rev.author}</span>
                          {rev.isSample ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f6f1e7] text-[#59735d] border border-[#e4dcce]">
                              Sample Feedback
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#eef3ef] text-[#2e6844] font-medium flex items-center gap-1 border border-[#c9d6cb]">
                              <CheckCircle2 className="w-3 h-3" />
                              User Review (Prototype)
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#8aa18e]">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-[#d49e35] text-[#d49e35]'
                                : 'text-[#c9d6cb]'
                            }`}
                          />
                        ))}
                        <span className="font-semibold text-[#1c382b] ml-1.5">{rev.title}</span>
                      </div>

                      <p className="text-[#526f58] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 bg-[#f6f1e7] border-t border-[#e4dcce] flex items-center justify-between text-xs text-[#526f58]">
          <span>Traceable batch: {selectedProduct.batchLotNumber}</span>
          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
            className="font-semibold text-[#1c382b] hover:underline cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

