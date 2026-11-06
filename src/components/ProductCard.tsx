import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Heart, ShoppingBag, Star, MapPin, Clock, Eye, Check, Zap, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    openProductDetails, 
    addToCart, 
    expressCheckout,
    toggleFavorite, 
    isFavorite,
    formatPrice,
    openBrandShop
  } = useStore();

  const [selectedPack, setSelectedPack] = useState(product.currentPackSize || product.packSizes[0]?.size || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const currentPackOption = product.packSizes.find((p) => p.size === selectedPack) || product.packSizes[0];
  const price = currentPackOption ? currentPackOption.price : product.price;
  const originalPrice = currentPackOption?.originalPrice || product.originalPrice;
  
  // Calculate discount percentage if original price exists
  const discountPercent = originalPrice && originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : null;

  const favorited = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedPack, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    expressCheckout(product, selectedPack, quantity);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.brandId) {
      openBrandShop(product.brandId);
    }
  };

  return (
    <div
      onClick={() => openProductDetails(product.id)}
      className="group relative bg-[#fffdfa] rounded-2xl border border-[#e4dcce] overflow-hidden hover:border-[#2e6844] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Product Image Box with Badges & Hover Actions */}
        <div className="relative aspect-square overflow-hidden bg-[#f6f1e7]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Top-Left Badges (Sale / Discount % - Matches video frame_044) */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
            {discountPercent ? (
              <span className="bg-[#2e6844] text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                {discountPercent}% OFF
              </span>
            ) : product.badge ? (
              <span className="bg-[#1c382b] text-[#fbf9f4] text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                {product.badge}
              </span>
            ) : null}

            <span className="bg-[#fffdfa]/90 backdrop-blur-xs text-[#1c382b] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#e4dcce] shadow-2xs">
              {product.categoryLabel}
            </span>
          </div>

          {/* Top-Right Quick Action Icons */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
            {/* Wishlist Heart */}
            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer ${
                favorited
                  ? 'bg-[#faeee9] text-[#bf563b]'
                  : 'bg-white/90 text-[#59735d] hover:text-[#bf563b] hover:bg-white'
              }`}
              title={favorited ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-label={favorited ? 'Remove from liked' : 'Add to liked'}
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-[#bf563b]' : ''}`} />
            </button>

            {/* Quick View Eye */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openProductDetails(product.id);
              }}
              className="p-2 rounded-full bg-white/90 text-[#59735d] hover:text-[#1c382b] hover:bg-white shadow-md backdrop-blur-md transition-all cursor-pointer opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 duration-200"
              title="Quick inspect harvest specifications"
              aria-label="Quick view"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stock Notification Tag */}
          {product.stockStatus === 'low-stock' && (
            <div className="absolute bottom-2 left-2 z-10 bg-[#bf563b] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
              Only {product.availableQuantity} left in batch
            </div>
          )}

          {/* Animated Hover Action Bar */}
          <div className="absolute inset-x-2 bottom-2 z-20 transform translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                justAdded
                  ? 'bg-[#2e6844] text-white'
                  : 'bg-[#1c382b] hover:bg-[#284c3b] text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#8aa18e]" />
                  <span>Add to Basket</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="px-3 py-2 rounded-xl bg-[#bf563b] hover:bg-[#a7452d] text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1"
              title="Express Buy Now"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy</span>
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-4 space-y-2">
          {/* Category & Brand Link (Matches video frame_044) */}
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8aa18e] block">
              {product.categoryLabel}
            </span>
            {/* Product Name */}
            <h3 className="font-serif font-bold text-base text-[#1c382b] leading-snug group-hover:text-[#2e6844] transition-colors line-clamp-1">
              {product.name}
            </h3>
            {/* Brand attribution (Matches "By Village Organics 2") */}
            <div 
              onClick={handleBrandClick}
              className="text-[11px] font-medium text-[#2e6844] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>By {product.brandName || product.growerName}</span>
            </div>
          </div>

          <p className="text-xs text-[#59735d] line-clamp-1">
            {product.tagline}
          </p>

          {/* Star Rating & Delivery Info */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <div className="flex items-center gap-1 text-[#1c382b] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#d49e35] text-[#d49e35]" />
              <span>{product.rating}</span>
              <span className="text-[#8aa18e] text-[11px] font-normal">({product.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#526f58]">
              <Clock className="w-3 h-3 text-[#8aa18e]" />
              <span className="line-clamp-1">{product.estimatedDelivery.split('(')[0]}</span>
            </div>
          </div>

          {/* Pack Size Pills */}
          {product.packSizes.length > 1 && (
            <div 
              className="flex flex-wrap gap-1 pt-1"
              onClick={(e) => e.stopPropagation()}
            >
              {product.packSizes.map((p) => (
                <button
                  key={p.size}
                  type="button"
                  onClick={() => setSelectedPack(p.size)}
                  className={`text-[10px] px-2 py-0.5 rounded-md border font-medium transition-colors cursor-pointer ${
                    selectedPack === p.size
                      ? 'bg-[#1c382b] text-white border-[#1c382b]'
                      : 'bg-[#fbf9f4] text-[#59735d] border-[#e4dcce] hover:border-[#1c382b]'
                  }`}
                >
                  {p.size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer: Price, Quantity & Signature Mint-Green Add Button */}
      {/* (Exact match to reference video frame_044) */}
      <div className="p-4 pt-0">
        <div className="pt-2.5 border-t border-[#f0ece3] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-lg text-[#2e6844]">
                {formatPrice(price * quantity)}
              </span>
              {originalPrice && (
                <span className="text-xs line-through text-[#8aa18e]">
                  {formatPrice(originalPrice * quantity)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#59735d] block">
              Pack: {selectedPack}
            </span>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#c9d6cb] rounded-lg bg-white overflow-hidden text-xs">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-1.5 py-1 text-[#526f58] hover:bg-[#f6f1e7] cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <span className="px-1.5 font-bold font-mono text-[11px] text-[#1c382b]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-1.5 py-1 text-[#526f58] hover:bg-[#f6f1e7] cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Signature Mint-Green Add Button (Matches video frame_044) */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                justAdded
                  ? 'bg-[#2e6844] text-white'
                  : 'bg-[#d8ebe4] text-[#1c382b] hover:bg-[#c2e2d6]'
              }`}
              aria-label={`Add ${product.name} to basket`}
            >
              {justAdded ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5 text-[#2e6844]" />
              )}
              <span>{justAdded ? 'Added' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
