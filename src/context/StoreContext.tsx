import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  UserProfile, 
  UserAddress, 
  Review, 
  FeedbackSubmission, 
  PrototypeSettings 
} from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';
import { INITIAL_ORDERS, INITIAL_USER_PROFILE, INITIAL_PROTOTYPE_SETTINGS } from '../data/mockData';

export type PageView = 'home' | 'shop' | 'story' | 'herbs' | 'contact' | 'dashboard' | 'checkout';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  // Navigation & Page routing
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Products
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  openProductDetails: (productId: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedPackSize?: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  
  // Favorites / Wishlist
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  
  // Recently Viewed
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;
  
  // Orders
  orders: Order[];
  placeOrder: (orderPayload: {
    shippingDetails: any;
    deliveryMethod: string;
    paymentMethod: string;
    discount?: number;
  }) => Order;
  
  // User Profile & Addresses
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addUserAddress: (address: Omit<UserAddress, 'id'>) => void;
  deleteUserAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  // Reviews & Comments
  addProductReview: (productId: string, review: { rating: number; title: string; comment: string; author: string }) => void;
  
  // Feedback & Inquiries
  feedbacks: FeedbackSubmission[];
  submitFeedback: (feedback: { name: string; email: string; topic: string; message: string }) => void;
  
  // Prototype Settings & Placeholders
  prototypeSettings: PrototypeSettings;
  updatePrototypeSettings: (settings: Partial<PrototypeSettings>) => void;
  resetAllDemoData: () => void;
  
  // Modals & Panels
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rr_products_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return SAMPLE_PRODUCTS; }
    }
    return SAMPLE_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rr_cart_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('rr_favorites_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return ['prod-turmeric-lakadong', 'prod-oil-wood-pressed-coconut']; }
    }
    return ['prod-turmeric-lakadong', 'prod-oil-wood-pressed-coconut'];
  });

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('rr_recently_viewed_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return ['prod-turmeric-lakadong', 'prod-oil-wood-pressed-coconut', 'prod-honey-wild-forest']; }
    }
    return ['prod-turmeric-lakadong', 'prod-oil-wood-pressed-coconut', 'prod-honey-wild-forest'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rr_orders_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_ORDERS; }
    }
    return INITIAL_ORDERS;
  });

  // User Profile
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('rr_profile_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_USER_PROFILE; }
    }
    return INITIAL_USER_PROFILE;
  });

  // Feedback submissions
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>(() => {
    const saved = localStorage.getItem('rr_feedbacks_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  // Prototype Settings
  const [prototypeSettings, setPrototypeSettings] = useState<PrototypeSettings>(() => {
    const saved = localStorage.getItem('rr_settings_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_PROTOTYPE_SETTINGS; }
    }
    return INITIAL_PROTOTYPE_SETTINGS;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('rr_products_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rr_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rr_favorites_v1', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('rr_recently_viewed_v1', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('rr_orders_v1', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('rr_profile_v1', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('rr_feedbacks_v1', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('rr_settings_v1', JSON.stringify(prototypeSettings));
  }, [prototypeSettings]);

  // Toast helper
  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add recently viewed
  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  // Open product details modal and track recently viewed
  const openProductDetails = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      addRecentlyViewed(productId);
    }
  };

  // Cart operations
  const addToCart = (product: Product, selectedPackSize?: string, quantity: number = 1) => {
    const packSize = selectedPackSize || product.currentPackSize || product.packSizes[0]?.size || 'Standard';
    const packOption = product.packSizes.find((p) => p.size === packSize);
    const unitPrice = packOption ? packOption.price : product.price;
    const itemId = `${product.id}__${packSize}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === itemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: itemId,
          product,
          selectedPackSize: packSize,
          unitPrice,
          quantity,
        },
      ];
    });

    showToast(
      'Added to Basket',
      `${product.name} (${packSize}) x${quantity} added to your village basket.`,
      'success'
    );
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find((i) => i.id === itemId);
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      showToast('Item Removed', `${item.product.name} removed from your basket.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Favorites
  const toggleFavorite = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    const prodName = prod ? prod.name : 'Product';

    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Liked', `${prodName} removed from your favorites list.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Liked', `${prodName} added to your favorites list.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Place Order
  const placeOrder = (payload: {
    shippingDetails: any;
    deliveryMethod: string;
    paymentMethod: string;
    discount?: number;
  }): Order => {
    const discount = payload.discount || 0;
    const isFreeDelivery = cartSubtotal >= prototypeSettings.freeShippingThreshold;
    const deliveryFee = payload.deliveryMethod.includes('Express') ? 120 : (isFreeDelivery ? 0 : prototypeSettings.standardShippingFee);
    const total = Math.max(0, cartSubtotal + deliveryFee - discount);

    const newOrder: Order = {
      id: `RR-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        image: item.product.image,
        packSize: item.selectedPackSize,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.unitPrice * item.quantity,
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      discount,
      total,
      status: 'placed',
      statusLabel: 'Order Confirmed (Demo) — Scheduled for Village Harvest & Packing',
      shippingDetails: payload.shippingDetails,
      deliveryMethod: payload.deliveryMethod,
      paymentMethod: payload.paymentMethod,
      estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      trackingNumber: `RR-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      isDemo: true,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(
      'Demo Order Placed Successfully',
      `Order #${newOrder.id} logged in prototype dashboard. No actual charge occurred.`,
      'success'
    );
    return newOrder;
  };

  // User Profile Updates
  const updateUserProfile = (partial: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...partial }));
    showToast('Profile Updated', 'Your customer profile details have been saved.', 'success');
  };

  const addUserAddress = (addressData: Omit<UserAddress, 'id'>) => {
    const newId = `addr-${Date.now()}`;
    const newAddress: UserAddress = { ...addressData, id: newId };
    
    setUserProfile((prev) => {
      let updatedAddresses = [...prev.addresses];
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
      }
      return {
        ...prev,
        addresses: [...updatedAddresses, newAddress],
      };
    });
    showToast('Address Added', 'New delivery address added to your address book.', 'success');
  };

  const deleteUserAddress = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
    showToast('Address Removed', 'The address was removed from your address book.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    }));
    showToast('Default Address Set', 'Updated primary delivery destination.', 'success');
  };

  // Reviews
  const addProductReview = (
    productId: string, 
    reviewData: { rating: number; title: string; comment: string; author: string }
  ) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: reviewData.author || userProfile.name || 'Kind Guest',
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      isVerifiedPurchase: true,
      isSample: false,
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...p.reviews];
          const newAvg = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: newAvg,
          };
        }
        return p;
      })
    );

    // Also update selectedProduct if currently viewing it
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => {
        if (!prev) return null;
        const updated = [newReview, ...prev.reviews];
        return {
          ...prev,
          reviews: updated,
          reviewCount: updated.length,
          rating: Number((updated.reduce((sum, r) => sum + r.rating, 0) / updated.length).toFixed(1)),
        };
      });
    }

    showToast('Review Submitted', 'Thank you! Your feedback has been recorded in this demo.', 'success');
  };

  // Feedback Submission
  const submitFeedback = (payload: { name: string; email: string; topic: string; message: string }) => {
    const submission: FeedbackSubmission = {
      id: `fb-${Date.now()}`,
      ...payload,
      submittedAt: new Date().toLocaleString(),
    };
    setFeedbacks((prev) => [submission, ...prev]);
    showToast(
      'Message Received',
      `Feedback saved in prototype inbox. Configurable destination: ${prototypeSettings.shopEmail}`,
      'success'
    );
  };

  // Prototype Settings
  const updatePrototypeSettings = (partial: Partial<PrototypeSettings>) => {
    setPrototypeSettings((prev) => ({ ...prev, ...partial }));
    showToast('Store Settings Saved', 'Editable placeholders and business variables updated.', 'success');
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('rr_products_v1');
    localStorage.removeItem('rr_cart_v1');
    localStorage.removeItem('rr_favorites_v1');
    localStorage.removeItem('rr_recently_viewed_v1');
    localStorage.removeItem('rr_orders_v1');
    localStorage.removeItem('rr_profile_v1');
    localStorage.removeItem('rr_feedbacks_v1');
    localStorage.removeItem('rr_settings_v1');

    setProducts(SAMPLE_PRODUCTS);
    setCart([]);
    setFavorites(['prod-turmeric-lakadong', 'prod-oil-wood-pressed-coconut']);
    setRecentlyViewed(['prod-turmeric-lakadong', 'prod-oil-wood-pressed-coconut', 'prod-honey-wild-forest']);
    setOrders(INITIAL_ORDERS);
    setUserProfile(INITIAL_USER_PROFILE);
    setFeedbacks([]);
    setPrototypeSettings(INITIAL_PROTOTYPE_SETTINGS);

    showToast('Demo Data Reset', 'Restored pristine sample catalog, orders, and placeholders.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        products,
        selectedProduct,
        setSelectedProduct,
        openProductDetails,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyViewed,
        addRecentlyViewed,
        orders,
        placeOrder,
        isLoggedIn,
        setIsLoggedIn,
        userProfile,
        updateUserProfile,
        addUserAddress,
        deleteUserAddress,
        setDefaultAddress,
        addProductReview,
        feedbacks,
        submitFeedback,
        prototypeSettings,
        updatePrototypeSettings,
        resetAllDemoData,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
