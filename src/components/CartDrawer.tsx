import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    prototypeSettings,
    setActivePage,
    showToast,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountLabel, setDiscountLabel] = useState<string>('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = prototypeSettings.freeShippingThreshold;
  const differenceToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'VILLAGE10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discount);
      setDiscountLabel('10% Village Welcome Offer');
      showToast('Coupon Applied', '10% discount applied to your village harvest!', 'success');
    } else if (code === 'HARVESTFRESH') {
      const discount = Math.round(cartSubtotal * 0.15);
      setAppliedDiscount(discount);
      setDiscountLabel('15% Fresh Harvest Savings');
      showToast('Coupon Applied', '15% seasonal harvest discount applied!', 'success');
    } else {
      showToast('Invalid Coupon', 'Try using demo coupon "VILLAGE10" or "HARVESTFRESH".', 'warning');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#14281f]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#fffdfa] h-full shadow-2xl flex flex-col border-l border-[#d6cfc2] animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Cart Header */}
        <div className="p-5 bg-[#f6f1e7] border-b border-[#e4dcce] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1c382b] text-[#fbf9f4] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#8aa18e]" />
            </div>
            <div>
              <h3 id="cart-title" className="font-serif font-bold text-lg text-[#1c382b]">
                Your Village Basket
              </h3>
              <p className="text-xs text-[#526f58]">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} sourced from rural gardens
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#526f58] hover:text-[#1c382b] rounded-lg hover:bg-[#ece3d3] transition-colors cursor-pointer"
            aria-label="Close basket"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="p-3 bg-[#eef3ef] border-b border-[#c9d6cb] px-5">
          <div className="flex justify-between text-xs font-medium text-[#1c382b] mb-1.5">
            <span>
              {differenceToFreeShipping === 0 ? (
                <span className="text-[#2e6844] font-semibold flex items-center gap-1">
                  <span>🎉</span> You unlocked Free Village Delivery!
                </span>
              ) : (
                <span>Add ₹{differenceToFreeShipping} more for Free Village Delivery</span>
              )}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#c9d6cb] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1c382b] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#f6f1e7] flex items-center justify-center text-3xl">
                🧺
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-[#1c382b]">Your basket is empty</h4>
                <p className="text-xs text-[#526f58] max-w-xs mx-auto">
                  Explore fresh seasonal greens, single-origin spices, pure raw honey, and cold-pressed oils.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('shop');
                }}
                className="px-5 py-2.5 bg-[#1c382b] text-white text-xs font-semibold rounded-xl hover:bg-[#284c3b] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Browse Village Harvest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-[#e4dcce] bg-white flex gap-3 shadow-xs hover:border-[#8aa18e] transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 rounded-lg object-cover border border-[#e4dcce] shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif font-bold text-sm text-[#1c382b] leading-tight line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#8aa18e] hover:text-[#bf563b] p-0.5 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-[#526f58] mt-0.5 flex items-center gap-2">
                      <span className="bg-[#f6f1e7] px-1.5 py-0.5 rounded text-[11px] font-medium text-[#1c382b]">
                        {item.selectedPackSize}
                      </span>
                      <span>From {item.product.villageOrigin}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f0ece3]">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#c9d6cb] rounded-lg bg-[#fbf9f4]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-[#1c382b] hover:bg-[#ece3d3] rounded-l-lg transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#1c382b]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-[#1c382b] hover:bg-[#ece3d3] rounded-r-lg transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-[#1c382b]">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                      <div className="text-[10px] text-[#59735d]">
                        ₹{item.unitPrice} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#f6f1e7] border-t border-[#e4dcce] space-y-4">
            {/* Promo Code Box */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8aa18e]" />
                <input
                  type="text"
                  placeholder="Promo code (e.g., VILLAGE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b] focus:outline-none focus:ring-1 focus:ring-[#1c382b]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[#59735d] text-white text-xs font-semibold rounded-lg hover:bg-[#1c382b] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#526f58]">
              <div className="flex justify-between">
                <span>Basket Subtotal</span>
                <span className="font-semibold text-[#1c382b]">₹{cartSubtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#2e6844] font-medium">
                  <span>{discountLabel}</span>
                  <span>- ₹{appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Village Delivery</span>
                <span>
                  {differenceToFreeShipping === 0 ? (
                    <span className="text-[#2e6844] font-medium">FREE</span>
                  ) : (
                    `₹${prototypeSettings.standardShippingFee}`
                  )}
                </span>
              </div>
              <div className="border-t border-[#e4dcce] pt-2 flex justify-between text-sm font-bold text-[#1c382b]">
                <span>Total Estimated</span>
                <span>
                  ₹{Math.max(
                    0,
                    cartSubtotal +
                      (differenceToFreeShipping === 0 ? 0 : prototypeSettings.standardShippingFee) -
                      appliedDiscount
                  )}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full py-3 bg-[#1c382b] text-white font-serif font-bold text-sm rounded-xl hover:bg-[#284c3b] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-[#59735d]">
              🌿 100% Traceable to origin villages &bull; Safe prototype checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

