# Root & River — Goodness grown close to the earth

A complete, polished, responsive e-commerce web application for **Root & River**, an artisanal shop for produce and pantry goods sourced directly from village farms and rural gardens across India.

Built as an interactive functional prototype with rich authentic sample data, customizable business placeholders, and clear disclosures.

---

## 🌾 Features & Architecture

### 1. Brand & Aesthetic Identity
- **Color Palette:** Warm, natural, and grounded in earth tones:
  - Deep Forest Green (`#14281f`, `#1c382b`, `#264a39`)
  - Herb Sage (`#59735d`, `#8aa18e`, `#eef3ef`)
  - Warm Terracotta (`#bf563b`, `#a7452d`, `#faeee9`)
  - Village Cream & Raw Linen (`#fbf9f4`, `#f6f1e7`, `#ece3d3`)
- **Typography:** Fraunces & Cormorant Garamond serif headings with Plus Jakarta Sans body typography.
- **Botanical Detail:** Leaf motifs, harvest badges, origin stamps, and small-batch processing tags.
- **Responsiveness:** Fluid across mobile, tablet, and desktop with a dedicated sticky bottom navigation bar on mobile devices.

---

### 2. Sourced Catalog Across 6 Core Categories
Every product features real village origins, grower backgrounds, harvest dates, batch lot numbers, processing traditions, and verified sample reviews:
1. **Fresh vegetables & greens:** Native Country Spinach (Maval Valley), Heirloom Country Tomatoes (Junnar), Tender Moringa Pods & Leaves (Pollachi).
2. **Turmeric & other spices:** Single-Origin Lakadong Turmeric Powder (Jaintia Hills, Meghalaya - 7.2% curcumin test sample), Malabar Tellicherry Garbled Extra Bold Black Pepper (Idukki, Kerala).
3. **Tulsi, lemongrass & other herbs:** Sacred Krishna & Rama Tulsi Whole Leaf Tea (Vrindavan), Mountain Cut Nilgiri Lemongrass (Nilgiris), Slow-Milled Nagori Ashwagandha Root Powder (Neemuch).
4. **Wild honey & sweet nectar:** Raw Multifloral Wild Forest Honey (Western Ghats), Artisanal Sugarcane Jaggery Blocks (Kolhapur).
5. **Rice & other grains:** Fragrant Gobindobhog Heritage Scented Rice (Burdwan Delta), Red Palakkad Matta Parboiled Rice (Palakkad Valley), Unpolished Foxtail Millet (Anantapur).
6. **Coconut oil & pantry products:** Artisanal Wood-Pressed Extra Virgin Coconut Oil (Pollachi), Hand-Churned A2 Bilona Gir Cow Ghee (Gir, Gujarat), Cold-Pressed Raw Mustard Oil Kachi Ghani (Bharatpur), Wild Forest Seedless Desi Tamarind (Bastar).

---

### 3. Sourcing Transparency & Regulatory Disclaimers
- **Educational Non-Medical Advice:** Traditional herbs (Tulsi, Lemongrass, Ashwagandha) are presented purely for general educational and traditional culinary appreciation, never as medical advice or therapeutic cure claims.
- **Indian Organic Claims Notice:** Explains that under statutory FSSAI and NPOP regulations, official organic labels require certified documentation (Jaivik Bharat / PGS-India). Prototype entries are clearly tagged as sample data.
- **Store Configuration & Placeholder Drawer:** Accessible via the top notification banner to edit `[Shop email]`, `[Phone number]`, `[Business address]`, `[Social links]`, tax percentages, and free delivery thresholds.

---

### 4. Interactive E-Commerce Prototype Workflows
- **Search & Live Autocomplete:** Real-time search by product name, ingredients, categories, and village origins with dropdown suggestions while typing.
- **Multi-Attribute Filters:** Filter by category pills, origin state, price range, stock availability, and sorting (Featured, Price, Rating, Name).
- **Product Details Modal:** Interactive pack-size selector (e.g. 250g, 500g, 1kg), price recalculation, grower narrative, harvest/packing dates, culinary preparation suggestions, and interactive review form.
- **Basket Drawer & Free Delivery Progress:** Real-time quantity adjustments, item removal, free shipping meter, and working coupon codes (`VILLAGE10` for 10% off, `HARVESTFRESH` for 15% off).
- **Demo Checkout Flow:**
  - Step 1: Customer delivery details (with 1-click autofill from saved addresses).
  - Step 2: Shipping speed selection (Standard Village Post vs Express Harvest Courier).
  - Step 3: Payment method simulation (Demo UPI QR, Demo Cash on Delivery, Demo Card, Demo Net Banking).
  - Step 4: Rich Order Confirmation Screen with Order ID, batch tracking number, and direct link to Customer Dashboard.
- **Customer Dashboard:**
  - Active and past orders with 4-stage tracking status (Placed → Village Packed → In Transit → Delivered).
  - Saved delivery address book with Add, Delete, and Set Default.
  - Liked Harvests (Wishlist) with 1-click Add to Basket.
  - Recently Viewed harvests session history.
  - Customer profile settings and demo logout/login.
- **EarthWise AI Shopping Advisor:** Intelligent contextual recommendation guide matching user intentions (evening relaxation, high-curcumin spices, cold-pressed oils) with clear explanations of why each item fits.
- **Feedback & Grower Inquiry Form:** Configurable destination notification, local prototype message log, and confirmation toasts.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
npm install
```

### Run Locally (Development Server)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
The optimized static bundle is output to `dist/`.

---

## 🛠️ Production Launch Checklist
Before accepting real live orders, connect the following endpoints (documented in the in-app Store Configuration modal):
1. **Payment Gateway:** Connect Razorpay, Cashfree, or Stripe API keys.
2. **Customer Authentication:** Connect Supabase, Auth0, or Firebase Auth.
3. **Logistics & Dispatch:** Connect Shiprocket or Delhivery API for real automated airway bills (AWB).
4. **Organic & FSSAI Verification:** Upload valid 14-digit FSSAI Central License and Jaivik Bharat / NPOP accreditation files.
5. **Transactional Messaging:** Connect Resend, SendGrid, or Twilio for order receipts and SMS tracking alerts.
