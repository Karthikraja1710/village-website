import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, ShippingDetails } from '../types';
import { 
  ShieldAlert, 
  ArrowLeft, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Tag, 
  Check, 
  ChevronRight,
  PackageCheck
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    prototypeSettings, 
    userProfile, 
    placeOrder, 
    setActivePage,
    openProductDetails 
  } = useStore();

  const [step, setStep] = useState<'details' | 'shipping' | 'payment' | 'confirmation'>('details');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Address form
  const defaultAddress = userProfile.addresses.find(a => a.isDefault) || userProfile.addresses[0];
  const [shippingForm, setShippingForm] = useState<ShippingDetails>({
    fullName: userProfile.name || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '',
    addressLine1: defaultAddress ? defaultAddress.addressLine : '',
    villageOrCity: defaultAddress ? defaultAddress.villageCity : '',
    state: defaultAddress ? defaultAddress.state : 'Maharashtra',
    pincode: defaultAddress ? defaultAddress.pincode : '411045',
    deliveryNotes: 'Please call before arrival. Ring doorbell.',
  });

  // Shipping Method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'netbanking'>('upi');

  // Coupon / Discount
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const freeDelivery = cartSubtotal >= prototypeSettings.freeShippingThreshold;
  const standardFee = freeDelivery ? 0 : prototypeSettings.standardShippingFee;
  const shippingFee = deliveryMethod === 'express' ? 120 : standardFee;
  const estimatedTax = Math.round((cartSubtotal * prototypeSettings.taxRatePercent) / 100);
  const finalTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'VILLAGE10') {
      setDiscountAmount(Math.round(cartSubtotal * 0.1));
      setCouponApplied(true);
    } else if (code === 'HARVESTFRESH') {
      setDiscountAmount(Math.round(cartSubtotal * 0.15));
      setCouponApplied(true);
    } else {
      alert('Try promo code VILLAGE10 (10% off) or HARVESTFRESH (15% off).');
    }
  };

  const handleConfirmOrder = () => {
    const deliveryMethodLabel = deliveryMethod === 'express'
      ? 'Express Harvest Courier (1 - 2 business days)'
      : 'Standard Farm-to-Fork Post (3 - 5 business days)';

    const paymentLabel = 
      paymentMethod === 'upi' ? 'Demo Instant UPI / QR Scan (Prototype)' :
      paymentMethod === 'cod' ? 'Demo Cash on Delivery (Prototype)' :
      paymentMethod === 'card' ? 'Demo Card Payment (Prototype)' : 'Demo Net Banking (Prototype)';

    const order = placeOrder({
      shippingDetails: shippingForm,
      deliveryMethod: deliveryMethodLabel,
      paymentMethod: paymentLabel,
      discount: discountAmount,
    });

    setCreatedOrder(order);
    setStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If cart is empty and not on confirmation screen
  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#f6f1e7] flex items-center justify-center text-3xl">
          🧺
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#1c382b]">
          Your basket is empty
        </h2>
        <p className="text-xs text-[#526f58]">
          Add fresh village vegetables, high-curcumin spices, or cold-pressed oils before checking out.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-3 bg-[#1c382b] text-white text-xs font-semibold rounded-xl hover:bg-[#284c3b] transition-all cursor-pointer"
        >
          Explore Village Harvest
        </button>
      </div>
    );
  }

  // ORDER CONFIRMATION SCREEN
  if (step === 'confirmation' && createdOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#eef3ef] border border-[#c9d6cb] text-[#2e6844] flex items-center justify-center">
            <PackageCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef3ef] text-[#2e6844] border border-[#c9d6cb]">
              <span className="w-2 h-2 rounded-full bg-[#2e6844] animate-pulse" />
              DEMO ORDER RECORDED
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1c382b]">
              Thank You for Supporting Village Agriculture!
            </h1>
            <p className="text-xs sm:text-sm text-[#526f58] max-w-lg mx-auto">
              Your prototype order <strong>#{createdOrder.id}</strong> has been logged in your customer dashboard. Because this is a demonstration store, no financial charges were made.
            </p>
          </div>

          {/* Tracking Strip */}
          <div className="p-4 rounded-2xl bg-[#f6f1e7] border border-[#e4dcce] text-left grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[#8aa18e] block uppercase text-[10px] tracking-wider font-semibold">
                Order Reference
              </span>
              <strong className="text-[#1c382b] font-mono text-sm">{createdOrder.id}</strong>
            </div>

            <div>
              <span className="text-[#8aa18e] block uppercase text-[10px] tracking-wider font-semibold">
                Estimated Delivery
              </span>
              <strong className="text-[#1c382b]">{createdOrder.estimatedDeliveryDate}</strong>
            </div>

            <div>
              <span className="text-[#8aa18e] block uppercase text-[10px] tracking-wider font-semibold">
                Batch Tracking #
              </span>
              <strong className="text-[#1c382b] font-mono">{createdOrder.trackingNumber}</strong>
            </div>
          </div>

          {/* Ordered items review */}
          <div className="text-left space-y-3 pt-2">
            <h3 className="font-serif font-bold text-sm text-[#1c382b]">
              Harvest Items Reserved:
            </h3>
            <div className="space-y-2 divide-y divide-[#f0ece3]">
              {createdOrder.items.map((item, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-12 h-12 rounded-lg object-cover border border-[#e4dcce]"
                    />
                    <div>
                      <span className="font-semibold text-[#1c382b] block">{item.productName}</span>
                      <span className="text-[#526f58] text-[11px]">
                        Pack: {item.packSize} &bull; Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-[#1c382b]">₹{item.total}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#e4dcce] flex justify-between text-sm font-bold text-[#1c382b]">
              <span>Final Total:</span>
              <span>₹{createdOrder.total} ({createdOrder.paymentMethod})</span>
            </div>
          </div>

          {/* Delivery destination preview */}
          <div className="p-4 rounded-xl bg-[#fbf9f4] border border-[#e4dcce] text-left text-xs space-y-1">
            <span className="font-semibold text-[#1c382b] block">Delivery Destination:</span>
            <p className="text-[#526f58]">
              {createdOrder.shippingDetails.fullName} &bull; {createdOrder.shippingDetails.phone}
            </p>
            <p className="text-[#526f58]">
              {createdOrder.shippingDetails.addressLine1}, {createdOrder.shippingDetails.villageOrCity}, {createdOrder.shippingDetails.state} - {createdOrder.shippingDetails.pincode}
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActivePage('dashboard')}
              className="flex-1 py-3 px-6 bg-[#1c382b] text-white font-serif font-bold text-xs rounded-xl hover:bg-[#284c3b] shadow-md transition-all cursor-pointer"
            >
              Track in Customer Dashboard
            </button>
            <button
              onClick={() => setActivePage('shop')}
              className="py-3 px-6 border border-[#c9d6cb] text-[#1c382b] font-semibold text-xs rounded-xl hover:bg-[#f6f1e7] transition-all cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT STEPS FLOW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Prominent Demo Banner */}
      <div className="p-4 rounded-2xl bg-[#faeee9] border border-[#f0cfc5] flex items-start gap-3 text-xs text-[#8f3620]">
        <ShieldAlert className="w-5 h-5 shrink-0 text-[#bf563b] mt-0.5" />
        <div>
          <strong className="font-bold text-[#a7452d] block mb-0.5">
            PROTOTYPE DEMO CHECKOUT — No Financial Charge
          </strong>
          This is an interactive simulation of the Root &amp; River checkout flow. Payment processing is not connected to live banking rails. All delivery estimates, taxes, and order tracking numbers are functional demonstration data.
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs">
        <button
          onClick={() => setStep('details')}
          className={`flex items-center gap-1.5 font-semibold ${
            step === 'details' ? 'text-[#1c382b]' : 'text-[#8aa18e]'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step === 'details' ? 'bg-[#1c382b] text-white' : 'bg-[#e4dcce] text-[#59735d]'
          }`}>1</span>
          <span>Delivery Details</span>
        </button>

        <ChevronRight className="w-4 h-4 text-[#8aa18e]" />

        <button
          onClick={() => setStep('shipping')}
          className={`flex items-center gap-1.5 font-semibold ${
            step === 'shipping' ? 'text-[#1c382b]' : 'text-[#8aa18e]'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step === 'shipping' ? 'bg-[#1c382b] text-white' : 'bg-[#e4dcce] text-[#59735d]'
          }`}>2</span>
          <span>Delivery Option</span>
        </button>

        <ChevronRight className="w-4 h-4 text-[#8aa18e]" />

        <button
          onClick={() => setStep('payment')}
          className={`flex items-center gap-1.5 font-semibold ${
            step === 'payment' ? 'text-[#1c382b]' : 'text-[#8aa18e]'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step === 'payment' ? 'bg-[#1c382b] text-white' : 'bg-[#e4dcce] text-[#59735d]'
          }`}>3</span>
          <span>Review &amp; Confirm</span>
        </button>
      </div>

      {/* Checkout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Delivery Details */}
          {step === 'details' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#e4dcce]">
                <h3 className="font-serif font-bold text-xl text-[#1c382b]">
                  1. Delivery Details
                </h3>
                <span className="text-xs text-[#526f58]">Direct village dispatch</span>
              </div>

              {/* Saved Address Pill Picker */}
              {userProfile.addresses.length > 0 && (
                <div className="p-3 bg-[#eef3ef] rounded-xl border border-[#c9d6cb] space-y-1.5">
                  <span className="text-[11px] font-semibold text-[#1c382b] uppercase tracking-wider block">
                    Use Saved Address from Profile:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.addresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => {
                          setShippingForm({
                            fullName: addr.name,
                            phone: addr.phone,
                            email: userProfile.email,
                            addressLine1: addr.addressLine,
                            villageOrCity: addr.villageCity,
                            state: addr.state,
                            pincode: addr.pincode,
                            deliveryNotes: shippingForm.deliveryNotes,
                          });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#c9d6cb] hover:border-[#1c382b] text-xs font-medium text-[#1c382b] cursor-pointer"
                      >
                        {addr.label}: {addr.addressLine.substring(0, 24)}...
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#1c382b] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.fullName}
                      onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#1c382b] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#1c382b] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1c382b] mb-1">Delivery Street Address</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.addressLine1}
                    onChange={(e) => setShippingForm({ ...shippingForm, addressLine1: e.target.value })}
                    placeholder="House/Flat number, Building, Street..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-[#1c382b] mb-1">Village / City</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.villageOrCity}
                      onChange={(e) => setShippingForm({ ...shippingForm, villageOrCity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#1c382b] mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#1c382b] mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.pincode}
                      onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#1c382b] mb-1">Delivery Notes (Optional)</label>
                  <input
                    type="text"
                    value={shippingForm.deliveryNotes}
                    onChange={(e) => setShippingForm({ ...shippingForm, deliveryNotes: e.target.value })}
                    placeholder="e.g., Leave with gate security if not home"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  disabled={!shippingForm.fullName || !shippingForm.addressLine1}
                  className="px-6 py-3 bg-[#1c382b] text-white font-serif font-bold text-xs rounded-xl hover:bg-[#284c3b] disabled:opacity-50 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Continue to Delivery Options</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Shipping Options */}
          {step === 'shipping' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#e4dcce]">
                <h3 className="font-serif font-bold text-xl text-[#1c382b]">
                  2. Choose Delivery Speed
                </h3>
                <span className="text-xs text-[#526f58]">Direct from rural sheds</span>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    deliveryMethod === 'standard'
                      ? 'border-[#1c382b] bg-[#eef3ef]'
                      : 'border-[#e4dcce] bg-white hover:border-[#8aa18e]'
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={deliveryMethod === 'standard'}
                    onChange={() => setDeliveryMethod('standard')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="font-serif font-bold text-sm text-[#1c382b]">
                        Standard Farm-to-Fork Post
                      </strong>
                      <span className="font-bold text-xs text-[#1c382b]">
                        {freeDelivery ? 'FREE' : `₹${prototypeSettings.standardShippingFee}`}
                      </span>
                    </div>
                    <p className="text-xs text-[#526f58] mt-1">
                      Estimated delivery in <strong>3 - 5 business days</strong>. Packaged in aerated paper bags and recyclable corrugated containers.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    deliveryMethod === 'express'
                      ? 'border-[#1c382b] bg-[#eef3ef]'
                      : 'border-[#e4dcce] bg-white hover:border-[#8aa18e]'
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={deliveryMethod === 'express'}
                    onChange={() => setDeliveryMethod('express')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="font-serif font-bold text-sm text-[#1c382b]">
                        Express Seasonal Harvest Courier
                      </strong>
                      <span className="font-bold text-xs text-[#1c382b]">₹120</span>
                    </div>
                    <p className="text-xs text-[#526f58] mt-1">
                      Estimated delivery in <strong>1 - 2 business days</strong>. Priority handling for fresh vegetables and fresh cold-pressed batches.
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2 text-xs font-medium text-[#526f58] hover:text-[#1c382b]"
                >
                  &larr; Back to Details
                </button>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="px-6 py-3 bg-[#1c382b] text-white font-serif font-bold text-xs rounded-xl hover:bg-[#284c3b] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Continue to Payment Review</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method & Final Confirmation */}
          {step === 'payment' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#e4dcce]">
                <h3 className="font-serif font-bold text-xl text-[#1c382b]">
                  3. Select Demo Payment Method
                </h3>
                <span className="text-xs text-[#bf563b] font-semibold">Demo Sandbox Mode</span>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#1c382b] bg-[#eef3ef]'
                      : 'border-[#e4dcce] bg-white hover:border-[#8aa18e]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <strong className="font-serif font-bold text-sm text-[#1c382b] block">
                      Demo UPI / QR Code Scan (Prototype)
                    </strong>
                    <span className="text-xs text-[#526f58]">
                      Simulates instant mobile scan (GPay, PhonePe, Paytm). No transaction charged.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#1c382b] bg-[#eef3ef]'
                      : 'border-[#e4dcce] bg-white hover:border-[#8aa18e]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <strong className="font-serif font-bold text-sm text-[#1c382b] block">
                      Demo Cash on Delivery (Prototype)
                    </strong>
                    <span className="text-xs text-[#526f58]">
                      Pay in demo cash when rural produce box arrives at your door.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#1c382b] bg-[#eef3ef]'
                      : 'border-[#e4dcce] bg-white hover:border-[#8aa18e]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <strong className="font-serif font-bold text-sm text-[#1c382b] block">
                      Demo Credit / Debit Card (Prototype)
                    </strong>
                    <span className="text-xs text-[#526f58]">
                      Placeholder for Visa / Mastercard / RuPay gateway integration.
                    </span>
                  </div>
                </label>
              </div>

              {/* Review Delivery Details */}
              <div className="p-4 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] text-xs space-y-1">
                <span className="font-semibold text-[#1c382b] block">Dispatching To:</span>
                <p className="text-[#526f58]">
                  {shippingForm.fullName} &bull; {shippingForm.phone}
                </p>
                <p className="text-[#526f58]">
                  {shippingForm.addressLine1}, {shippingForm.villageOrCity}, {shippingForm.state} - {shippingForm.pincode}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-2 text-xs font-medium text-[#526f58] hover:text-[#1c382b]"
                >
                  &larr; Back to Shipping
                </button>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="py-3 px-8 bg-[#bf563b] hover:bg-[#a7452d] text-white font-serif font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Place Demo Order &bull; ₹{finalTotal}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary Sidebar (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1c382b] pb-2 border-b border-[#e4dcce]">
              Order Summary ({cart.length} items)
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#e4dcce] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-[#1c382b] block line-clamp-1">
                      {item.product.name}
                    </span>
                    <span className="text-[#526f58]">
                      {item.selectedPackSize} &bull; Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-[#1c382b]">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Promo (VILLAGE10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#c9d6cb] bg-[#fbf9f4] text-[#1c382b]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#59735d] text-white text-xs font-semibold rounded-lg hover:bg-[#1c382b]"
              >
                Apply
              </button>
            </form>

            {/* Breakdown */}
            <div className="pt-3 border-t border-[#e4dcce] space-y-2 text-xs text-[#526f58]">
              <div className="flex justify-between">
                <span>Produce Subtotal</span>
                <span className="font-semibold text-[#1c382b]">₹{cartSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2e6844] font-medium">
                  <span>Harvest Discount Applied</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Village Delivery</span>
                <span>
                  {shippingFee === 0 ? <strong className="text-[#2e6844]">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-[#8aa18e]">
                <span>Estimated Statutory Tax ({prototypeSettings.taxRatePercent}%)</span>
                <span>₹{estimatedTax} (Included)</span>
              </div>

              <div className="pt-2 border-t border-[#e4dcce] flex justify-between text-base font-bold text-[#1c382b]">
                <span>Total Due</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
