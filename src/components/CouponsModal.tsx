import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Tag, Copy, Check, Sparkles, Percent, Gift, Clock, ShieldCheck } from 'lucide-react';

interface CouponItem {
  code: string;
  title: string;
  discount: string;
  description: string;
  minSpend: string;
  expiry: string;
  badge: string;
  bgGradient: string;
}

export const CouponsModal: React.FC = () => {
  const { isCouponsOpen, setIsCouponsOpen, showToast } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isCouponsOpen) return null;

  const coupons: CouponItem[] = [
    {
      code: 'VILLAGE10',
      title: 'First City Order Welcome',
      discount: '₹100 OFF',
      description: 'Get ₹100 instant discount on your inaugural farm-direct delivery to any city.',
      minSpend: 'Orders above ₹799',
      expiry: 'Valid for next 14 days',
      badge: 'Most Popular',
      bgGradient: 'from-[#1c382b] to-[#264a39]',
    },
    {
      code: 'EARTHWISE20',
      title: 'Heirloom Heritage Harvest',
      discount: '15% OFF',
      description: 'Applicable across single-origin Lakadong turmeric, wild honey & cold-pressed oils.',
      minSpend: 'Orders above ₹1,299',
      expiry: 'Limited seasonal batch',
      badge: 'Heritage Value',
      bgGradient: 'from-[#8f3621] to-[#bf563b]',
    },
    {
      code: 'CITYFRESH',
      title: 'Free Express Metro Delivery',
      discount: 'FREE SHIPPING',
      description: 'Complimentary temperature-stable eco-packaging to Mumbai, Bengaluru, Delhi & 25+ cities.',
      minSpend: 'Orders above ₹499',
      expiry: 'All metropolitan orders',
      badge: 'Metro Special',
      bgGradient: 'from-[#1e3d2f] to-[#14281f]',
    },
    {
      code: 'GLOBALVILLAGE',
      title: 'International Diaspora Gift',
      discount: '10% OFF AIR',
      description: 'Save on international air priority postage for single-origin airtight tin packs.',
      minSpend: 'Orders above $50 / £40 / €45',
      expiry: 'Valid worldwide',
      badge: 'Worldwide',
      bgGradient: 'from-[#2c4033] to-[#1a2b20]',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast('Coupon Copied!', `Code ${code} copied to clipboard. Apply at checkout.`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#fffdfa] rounded-3xl shadow-2xl border border-[#e4dcce] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#1c382b] text-white flex items-center justify-between border-b border-[#2d5641]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#264a39] flex items-center justify-center text-white">
              <Tag className="w-5 h-5 text-[#8aa18e]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white leading-tight">
                Village Harvest Vouchers &amp; Coupons
              </h3>
              <p className="text-[11px] text-[#c9d6cb]">
                Direct-from-farm savings for city kitchens and international homes
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCouponsOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coupons List */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.code}
                className={`rounded-2xl p-4 bg-linear-to-br ${coupon.bgGradient} text-white shadow-md relative overflow-hidden flex flex-col justify-between space-y-3 group hover:scale-[1.02] transition-transform duration-300 border border-white/10`}
              >
                {/* Decorative background circle */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />

                <div className="space-y-1 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
                      {coupon.badge}
                    </span>
                    <span className="text-[10px] font-medium text-white/80 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{coupon.expiry}</span>
                    </span>
                  </div>

                  <span className="font-serif font-extrabold text-2xl text-[#f5a894] block mt-1">
                    {coupon.discount}
                  </span>
                  <h4 className="font-bold text-xs text-white">
                    {coupon.title}
                  </h4>
                  <p className="text-[11px] text-[#c9d6cb] leading-relaxed">
                    {coupon.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between relative z-10">
                  <span className="text-[10px] text-white/80">
                    {coupon.minSpend}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopy(coupon.code)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-[#1c382b] font-mono font-bold text-xs shadow-sm hover:bg-[#ece3d3] transition-colors cursor-pointer"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#bf563b]" />
                        <span>{coupon.code}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Note */}
          <div className="p-4 rounded-xl bg-[#eef3ef] border border-[#c9d6cb] flex items-center gap-3 text-xs text-[#243028]">
            <ShieldCheck className="w-5 h-5 text-[#2e6844] shrink-0" />
            <p className="text-[11px] text-[#526f58]">
              All coupons are authentic demo placeholders and apply automatically towards mock checkout subtotals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
