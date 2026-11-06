import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Heart, ShoppingBag, Star, MapPin, Clock, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    openProductDetails, 
    addToCart, 
    toggleFavorite, 
    isFavorite 
  } = useStore();

  const [selectedPack, setSelectedPack] = useState(product.currentPackSize || product.packSizes[0]?.size || 'Standard');

  const currentPackOption = product.packSizes.find((p) => p.size === selectedPack) || product.packSizes[0];
  const price = currentPackOption ? currentPackOption.price : product.price;
  const originalPrice = currentPackOption?.originalPrice || product.originalPrice;

  const favorited = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedPack, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div
      onClick={() => openProductDetails(product.id)}
      className="group bg-[#fffdfa] rounded-2xl border border-[#e4dcce] overflow-hidden hover:shadow-xl hover:border-[#8aa18e] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#f6f1e7]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {product.badge && (
              <span className="bg-[#1c382b] text-[#fbf9f4] text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                {product.badge}
              </span>
            )}
            <span className="bg-[#faeee9] text-[#bf563b] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#f0cfc5]">
              {product.categoryLabel}
            </span>
          </div>

          {/* Quick action buttons */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer ${
                favorited
                  ? 'bg-[#faeee9] text-[#bf563b]'
                  : 'bg-white/80 text-[#59735d] hover:text-[#bf563b]'
              }`}
              aria-label={favorited ? 'Remove from liked' : 'Add to liked'}
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-[#bf563b]' : ''}`} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openProductDetails(product.id);
              }}
              className="p-2 rounded-full bg-white/80 text-[#59735d] hover:text-[#1c382b] shadow-md backdrop-blur-md transition-all cursor-pointer hidden group-hover:flex items-center justify-center"
              aria-label="Quick view"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stock banner */}
          {product.stockStatus === 'low-stock' && (
            <div className="absolute bottom-2 left-2 bg-[#bf563b] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
              Only {product.availableQuantity} left in village batch
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-2.5">
          {/* Origin & Grower */}
          <div className="flex items-center gap-1.5 text-xs text-[#526f58]">
            <MapPin className="w-3 h-3 text-[#8aa18e] shrink-0" />
            <span className="line-clamp-1">{product.villageOrigin}, {product.state}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif font-bold text-base text-[#1c382b] leading-snug group-hover:text-[#bf563b] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#59735d] line-clamp-1">
            {product.tagline}
          </p>

          {/* Rating & Delivery Info */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1 text-[#1c382b] font-medium">
              <Star className="w-3.5 h-3.5 fill-[#d49e35] text-[#d49e35]" />
              <span>{product.rating}</span>
              <span className="text-[#8aa18e] text-[11px]">({product.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#526f58]">
              <Clock className="w-3 h-3 text-[#8aa18e]" />
              <span className="line-clamp-1">{product.estimatedDelivery.split('(')[0]}</span>
            </div>
          </div>

          {/* Pack size pills */}
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
                  className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
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

      {/* Card Footer: Price & Add to Cart button */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-[#f0ece3] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-lg text-[#1c382b]">
                ₹{price}
              </span>
              {originalPrice && (
                <span className="text-xs line-through text-[#8aa18e]">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#59735d] block">
              Pack: {selectedPack}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="py-2 px-3.5 rounded-xl bg-[#1c382b] text-white text-xs font-semibold hover:bg-[#284c3b] shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            aria-label={`Add ${product.name} to basket`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#8aa18e]" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

