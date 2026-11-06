export type CategoryId = 
  | 'vegetables'
  | 'spices'
  | 'herbs'
  | 'honey'
  | 'grains'
  | 'oils';

export interface PackOption {
  size: string;
  price: number;
  originalPrice?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  isSample: boolean;
}

export interface Product {
  id: string;
  name: string;
  localName?: string;
  tagline: string;
  category: CategoryId;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  packSizes: PackOption[];
  currentPackSize: string;
  badge?: string;
  image: string;
  gallery?: string[];
  
  // Sourcing & Village Details
  villageOrigin: string;
  district: string;
  state: string;
  growerName: string;
  growerExperience: string;
  growerStory: string;
  harvestDate: string;
  packingDate: string;
  stockStatus: 'in-stock' | 'low-stock' | 'seasonal';
  availableQuantity: number;
  estimatedDelivery: string;
  
  // Details & Educational context
  description: string;
  ingredients: string[];
  growingDetails: string;
  processingDetails: string;
  traditionalUses?: string;
  culinaryTips?: string;
  allergyNotice?: string;
  
  // Certifications & Disclaimers
  certificationStatus: string;
  certificationScheme: string;
  certificationNote: string;
  batchLotNumber: string;
  
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item key (productId + packSize)
  product: Product;
  selectedPackSize: string;
  unitPrice: number;
  quantity: number;
}

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rateAgainstInr: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  villageOrCity: string;
  state: string;
  pincode: string;
  deliveryNotes?: string;
}

export type OrderStatus = 'placed' | 'packed' | 'in_transit' | 'delivered';

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    image: string;
    packSize: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  statusLabel: string;
  shippingDetails: ShippingDetails;
  deliveryMethod: string;
  paymentMethod: string;
  estimatedDeliveryDate: string;
  trackingNumber: string;
  isDemo: boolean;
}

export interface UserAddress {
  id: string;
  label: string;
  isDefault: boolean;
  name: string;
  phone: string;
  addressLine: string;
  villageCity: string;
  state: string;
  pincode: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  addresses: UserAddress[];
}

export interface FeedbackSubmission {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  submittedAt: string;
}

export interface PrototypeSettings {
  shopEmail: string;
  phone: string;
  businessAddress: string;
  socialHandle: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  taxRatePercent: number;
}

