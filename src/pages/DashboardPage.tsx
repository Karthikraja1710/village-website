import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Clock, 
  Star, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  Truck, 
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { UserAddress } from '../types';

export const DashboardPage: React.FC = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    userProfile,
    updateUserProfile,
    addUserAddress,
    deleteUserAddress,
    setDefaultAddress,
    orders,
    favorites,
    recentlyViewed,
    products,
    openProductDetails,
    addToCart,
    resetAllDemoData,
    setIsSettingsModalOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'favorites' | 'history' | 'settings'>('orders');

  // Address form modal/drawer
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Home');
  const [newAddrName, setNewAddrName] = useState(userProfile.name || '');
  const [newAddrPhone, setNewAddrPhone] = useState(userProfile.phone || '');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('Maharashtra');
  const [newAddrPincode, setNewAddrPincode] = useState('');
  const [newAddrDefault, setNewAddrDefault] = useState(false);

  // Profile edit
  const [editProfileName, setEditProfileName] = useState(userProfile.name);
  const [editProfileEmail, setEditProfileEmail] = useState(userProfile.email);
  const [editProfilePhone, setEditProfilePhone] = useState(userProfile.phone);

  const favoritedProducts = products.filter((p) => favorites.includes(p.id));
  const viewedProducts = products.filter((p) => recentlyViewed.includes(p.id));

  // Collect all reviews written by user
  const userReviews = products.flatMap((p) =>
    p.reviews
      .filter((r) => r.author === userProfile.name || !r.isSample)
      .map((r) => ({ ...r, product: p }))
  );

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine || !newAddrCity || !newAddrPincode) return;

    addUserAddress({
      label: newAddrLabel,
      name: newAddrName,
      phone: newAddrPhone,
      addressLine: newAddrLine,
      villageCity: newAddrCity,
      state: newAddrState,
      pincode: newAddrPincode,
      isDefault: newAddrDefault,
    });

    setNewAddrLine('');
    setNewAddrCity('');
    setNewAddrPincode('');
    setShowAddressForm(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editProfileName,
      email: editProfileEmail,
      phone: editProfilePhone,
    });
  };

  // If logged out demo view
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#1c382b] text-white flex items-center justify-center">
          <User className="w-8 h-8 text-[#8aa18e]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl text-[#1c382b]">
            Root &amp; River Account
          </h1>
          <p className="text-xs text-[#526f58]">
            Sign in to access your farm-to-fork orders, saved village favorites, and delivery addresses.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#faeee9] border border-[#f0cfc5] text-xs text-[#8f3620] text-left">
          <strong>Demo Notice:</strong> This prototype runs locally with browser state. Click below to sign in instantly with the demo profile.
        </div>

        <button
          onClick={() => setIsLoggedIn(true)}
          className="w-full py-3.5 bg-[#1c382b] text-white font-serif font-bold text-sm rounded-xl hover:bg-[#284c3b] shadow-md transition-all cursor-pointer"
        >
          Sign In as Demo Customer ({userProfile.name})
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner Notice on Storage */}
      <div className="p-4 rounded-2xl bg-[#eef3ef] border border-[#c9d6cb] flex items-start gap-3 text-xs text-[#264a39]">
        <ShieldAlert className="w-5 h-5 shrink-0 text-[#59735d] mt-0.5" />
        <div className="space-y-0.5">
          <strong className="font-semibold block">Customer Account &amp; Storage Transparency:</strong>
          <p className="text-[#526f58]">
            This is an interactive prototype. Your profile, past orders, and liked products are safely stored in your browser’s local storage. In a live production system, customer data connects to an encrypted OAuth/JWT backend with strict access controls.
          </p>
        </div>
      </div>

      {/* Profile Overview Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1c382b] text-white font-serif text-2xl font-bold flex items-center justify-center">
            {userProfile.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-2xl text-[#1c382b]">
                {userProfile.name}
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#faeee9] text-[#bf563b] font-semibold border border-[#f0cfc5]">
                Prototype Customer
              </span>
            </div>
            <p className="text-xs text-[#526f58]">
              {userProfile.email} &bull; {userProfile.phone} &bull; Member since {userProfile.joinedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="px-3 py-2 text-xs font-semibold text-[#526f58] hover:text-[#1c382b] rounded-xl hover:bg-[#f6f1e7] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Store Config</span>
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-3.5 py-2 text-xs font-semibold text-[#bf563b] hover:bg-[#faeee9] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e4dcce] overflow-x-auto gap-2 sm:gap-6 pb-px">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-[#1c382b] text-[#1c382b]'
              : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders &amp; Deliveries ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 px-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'favorites'
              ? 'border-[#1c382b] text-[#1c382b]'
              : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Liked Harvests ({favorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-[#1c382b] text-[#1c382b]'
              : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses &amp; Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'history'
              ? 'border-[#1c382b] text-[#1c382b]'
              : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Recently Viewed ({recentlyViewed.length})</span>
        </button>
      </div>

      {/* TAB 1: ORDERS & DELIVERIES */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#e4dcce] space-y-2">
              <Package className="w-12 h-12 text-[#8aa18e] mx-auto" />
              <h3 className="font-serif font-bold text-lg text-[#1c382b]">No orders placed yet</h3>
              <p className="text-xs text-[#526f58]">Explore our seasonal crops and place a demo order.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] shadow-xs space-y-5"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e4dcce]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#1c382b]">
                        Order #{order.id}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f6f1e7] text-[#59735d] border border-[#e4dcce]">
                        Placed on {order.date}
                      </span>
                    </div>
                    <span className="text-xs text-[#526f58] block mt-0.5">
                      Tracking Ref: <span className="font-mono">{order.trackingNumber}</span> &bull; {order.deliveryMethod}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-[#1c382b] block">
                      Total: ₹{order.total}
                    </span>
                    <span className="text-[11px] text-[#59735d]">{order.paymentMethod}</span>
                  </div>
                </div>

                {/* Tracking Status Timeline */}
                <div className="p-4 rounded-2xl bg-[#eef3ef] border border-[#c9d6cb] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1c382b] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#59735d]" />
                      <span>{order.statusLabel}</span>
                    </span>
                    <span className="text-[#526f58]">
                      Est. Delivery: <strong>{order.estimatedDeliveryDate}</strong>
                    </span>
                  </div>

                  {/* 4-step progress line */}
                  <div className="grid grid-cols-4 gap-2 pt-2 text-[10px] font-semibold text-center text-[#59735d]">
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-full ${order.status !== 'placed' || order.status === 'placed' ? 'bg-[#1c382b]' : 'bg-[#c9d6cb]'}`} />
                      <span>Order Placed</span>
                    </div>
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-full ${order.status === 'packed' || order.status === 'in_transit' || order.status === 'delivered' ? 'bg-[#1c382b]' : 'bg-[#c9d6cb]'}`} />
                      <span>Village Hub Packed</span>
                    </div>
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-full ${order.status === 'in_transit' || order.status === 'delivered' ? 'bg-[#1c382b]' : 'bg-[#c9d6cb]'}`} />
                      <span>In Transit</span>
                    </div>
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-full ${order.status === 'delivered' ? 'bg-[#2e6844]' : 'bg-[#c9d6cb]'}`} />
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8aa18e] block">
                    Ordered Harvests ({order.items.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-[#e4dcce] flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-12 rounded-lg object-cover border border-[#e4dcce] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 
                            onClick={() => openProductDetails(item.productId)}
                            className="font-serif font-bold text-xs text-[#1c382b] hover:text-[#bf563b] cursor-pointer line-clamp-1"
                          >
                            {item.productName}
                          </h4>
                          <span className="text-[11px] text-[#526f58] block">
                            Pack: {item.packSize} &bull; Qty: {item.quantity}
                          </span>
                          <span className="text-xs font-bold text-[#1c382b]">
                            ₹{item.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Destination info */}
                <div className="text-xs text-[#526f58] pt-2 border-t border-[#f0ece3]">
                  Destination: {order.shippingDetails.fullName}, {order.shippingDetails.addressLine1}, {order.shippingDetails.villageOrCity}, {order.shippingDetails.state} - {order.shippingDetails.pincode}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: LIKED / WISHLIST */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-[#1c382b]">
              Your Saved Harvests ({favoritedProducts.length})
            </h3>
            <span className="text-xs text-[#526f58]">Persisted in demo session</span>
          </div>

          {favoritedProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#e4dcce] space-y-2">
              <Heart className="w-12 h-12 text-[#8aa18e] mx-auto" />
              <h3 className="font-serif font-bold text-lg text-[#1c382b]">No liked harvests yet</h3>
              <p className="text-xs text-[#526f58]">Click the heart icon on any product to save it here for later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoritedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROFILE & SAVED ADDRESSES */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Profile Details Form (Span 5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] space-y-5 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#1c382b] pb-2 border-b border-[#e4dcce]">
              Customer Information
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1c382b] mb-1">Full Name</label>
                <input
                  type="text"
                  value={editProfileName}
                  onChange={(e) => setEditProfileName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c382b] mb-1">Email Address</label>
                <input
                  type="email"
                  value={editProfileEmail}
                  onChange={(e) => setEditProfileEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c382b] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={editProfilePhone}
                  onChange={(e) => setEditProfilePhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1c382b] text-white font-semibold text-xs rounded-xl hover:bg-[#284c3b] transition-colors cursor-pointer"
              >
                Save Profile Changes
              </button>
            </form>
          </div>

          {/* Saved Addresses (Span 7) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#e4dcce]">
                <h3 className="font-serif font-bold text-lg text-[#1c382b]">
                  Saved Delivery Addresses ({userProfile.addresses.length})
                </h3>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="px-3 py-1.5 bg-[#1c382b] text-white text-xs font-semibold rounded-lg hover:bg-[#284c3b] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddressForm ? 'Cancel' : 'Add Address'}</span>
                </button>
              </div>

              {/* Add Address Form Drawer */}
              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="p-4 rounded-2xl bg-[#f6f1e7] border border-[#e4dcce] space-y-3 text-xs">
                  <h4 className="font-serif font-bold text-sm text-[#1c382b]">
                    Add New Delivery Address
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-[#1c382b] mb-1">Address Label</label>
                      <input
                        type="text"
                        placeholder="Home / Work / Farm"
                        value={newAddrLabel}
                        onChange={(e) => setNewAddrLabel(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#1c382b] mb-1">Recipient Name</label>
                      <input
                        type="text"
                        required
                        value={newAddrName}
                        onChange={(e) => setNewAddrName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-[#1c382b] mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Door, Building, Street..."
                      value={newAddrLine}
                      onChange={(e) => setNewAddrLine(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-medium text-[#1c382b] mb-1">City/Village</label>
                      <input
                        type="text"
                        required
                        value={newAddrCity}
                        onChange={(e) => setNewAddrCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#1c382b] mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={newAddrState}
                        onChange={(e) => setNewAddrState(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#1c382b] mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={newAddrPincode}
                        onChange={(e) => setNewAddrPincode(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isDefaultCheck"
                      checked={newAddrDefault}
                      onChange={(e) => setNewAddrDefault(e.target.checked)}
                    />
                    <label htmlFor="isDefaultCheck" className="text-xs text-[#526f58]">
                      Set as primary delivery destination
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-3 py-1.5 text-xs text-[#526f58] hover:bg-[#ece3d3] rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-[#1c382b] text-white rounded-lg hover:bg-[#284c3b] cursor-pointer"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Address List */}
              <div className="space-y-3">
                {userProfile.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-2xl border border-[#e4dcce] bg-white flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="font-semibold text-[#1c382b]">{addr.label}</strong>
                        {addr.isDefault && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#eef3ef] text-[#2e6844] font-medium border border-[#c9d6cb]">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-[#243028] font-medium">{addr.name} &bull; {addr.phone}</p>
                      <p className="text-[#526f58]">
                        {addr.addressLine}, {addr.villageCity}, {addr.state} - {addr.pincode}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-[11px] text-[#59735d] hover:text-[#1c382b] underline cursor-pointer"
                        >
                          Make Default
                        </button>
                      )}
                      <button
                        onClick={() => deleteUserAddress(addr.id)}
                        className="text-[#8aa18e] hover:text-[#bf563b] p-1 cursor-pointer"
                        aria-label="Delete address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RECENTLY VIEWED */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-[#1c382b]">
              Harvests Explored Recently ({viewedProducts.length})
            </h3>
            <span className="text-xs text-[#526f58]">Tracked in this session</span>
          </div>

          {viewedProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#e4dcce] space-y-2">
              <Clock className="w-12 h-12 text-[#8aa18e] mx-auto" />
              <h3 className="font-serif font-bold text-lg text-[#1c382b]">No recently viewed harvests</h3>
              <p className="text-xs text-[#526f58]">Browse our shop catalog to discover products.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {viewedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

