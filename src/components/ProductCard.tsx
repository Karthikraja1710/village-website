import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Heart, ShoppingBag, Star, MapPin, Clock, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    openProductDetails, 
    addToCart, 
    toggleFavorite, 
    isFavorite,
    formatPrice 
  } = useStore();

  const [selectedPack, setSelectedPack] = useState(product.currentPackSize || product.packSizes[0]?.size || 'Standard');
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
    addToCart(product, selectedPack, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div
      onClick={() => openProductDetails(product.id)}
      className="group relative bg-[#fffdfa] rounded-2xl border border-[#e4dcce] overflow-hidden hover:border-[#8aa18e] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
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

          {/* Top-Left Badges (Sale / Seasonal / Category) */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
            {discountPercent ? (
              <span className="bg-[#bf563b] text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full shadow-sm">
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
              Only {product.availableQuantity} units left in batch
            </div>
          )}

          {/* Animated Hover Action Bar (Slide-up from bottom of image) */}
          <div className="absolute inset-x-2 bottom-2 z-20 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                justAdded
                  ? 'bg-[#2e6844] text-white'
                  : 'bg-[#1c382b] hover:bg-[#284c3b] text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added to Basket</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#8aa18e]" />
                  <span>Add to Basket &bull; {formatPrice(price)}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-4 space-y-2">
          {/* Origin & Grower */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#526f58]">
            <MapPin className="w-3 h-3 text-[#8aa18e] shrink-0" />
            <span className="line-clamp-1 font-medium">{product.villageOrigin}, {product.state}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif font-bold text-base text-[#1c382b] leading-snug group-hover:text-[#bf563b] transition-colors line-clamp-1">
            {product.name}
          </h3>

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

      {/* Bottom Footer: Price & Add Button */}
      <div className="p-4 pt-0">
        <div className="pt-2.5 border-t border-[#f0ece3] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-lg text-[#1c382b]">
                {formatPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-xs line-through text-[#8aa18e]">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#59735d] block">
              Unit: {selectedPack}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold shadow-2xs hover:shadow-sm transition-all flex items-center gap-1 cursor-pointer ${
              justAdded
                ? 'bg-[#2e6844] text-white'
                : 'bg-[#1c382b] hover:bg-[#284c3b] text-white'
            }`}
            aria-label={`Add ${product.name} to basket`}
          >
            {justAdded ? (
              <Check className="w-3.5 h-3.5 text-white" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 text-[#8aa18e]" />
            )}
            <span>{justAdded ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
