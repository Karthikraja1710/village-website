export interface VillageBrand {
  id: string;
  name: string;
  code: string;
  logo: string;
  tagline: string;
  village: string;
  district: string;
  state: string;
  specialty: string;
  leadGrower: string;
  established: string;
  description: string;
  farmerCount: number;
  heroImage: string;
}

export const VILLAGE_BRANDS: VillageBrand[] = [
  {
    id: 'brand-jaintia',
    name: 'Jaintia Mountain Collective',
    code: 'JMC',
    logo: '🏔️',
    tagline: 'High-Curcumin Lakadong Turmeric & Mountain Honey',
    village: 'Shangpung Village',
    district: 'West Jaintia Hills',
    state: 'Meghalaya',
    specialty: 'Single-Origin Lakadong Turmeric (~7.2% Curcumin) & Bamboo-Dried Spices',
    leadGrower: 'Bah Kyrshan Dhar',
    established: '1974',
    description: '18 tribal farming families cultivating native non-hybrid Lakadong rhizomes on virgin mountain slopes enriched with forest humus.',
    farmerCount: 32,
    heroImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'brand-wayanad',
    name: 'Wayanad Forest Stewards',
    code: 'WFS',
    logo: '🌿',
    tagline: 'Sun-Dried Tellicherry Pepper & Rainforest Botanicals',
    village: 'Meppadi & Sulthan Bathery',
    district: 'Wayanad',
    state: 'Kerala',
    specialty: 'Tellicherry Extra Bold Black Peppercorns & Green Cardamom Pods',
    leadGrower: 'Chacko & Clan',
    established: '1982',
    description: 'Highland spice orchards inter-cropped beneath shade-giving evergreen canopy, naturally sun-cured without sulfur or artificial polish.',
    farmerCount: 28,
    heroImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'brand-pollachi',
    name: 'Pollachi Chekku Oil Guild',
    code: 'POG',
    logo: '🥥',
    tagline: 'Vaagai Wooden-Churned Cold-Pressed Oils',
    village: 'Negamam & Kinathukadavu',
    district: 'Pollachi',
    state: 'Tamil Nadu',
    specialty: 'Raw Cold-Pressed Coconut Oil, Gingelly Sesame & Castor Oil',
    leadGrower: 'Selvaraj & Vellingiri',
    established: '1968',
    description: 'Slow-churned in traditional heirloom Vaagai wood mortars at temperatures strictly below 38°C to retain all natural antioxidants.',
    farmerCount: 24,
    heroImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'brand-bastar',
    name: 'Bastar Tribal Honey Collective',
    code: 'BTH',
    logo: '🍯',
    tagline: 'Wild Forest Raw Honey & Tribal Nectars',
    village: 'Kanger Valley Hamlets',
    district: 'Bastar',
    state: 'Chhattisgarh',
    specialty: 'Unfiltered, Unheated Wild Rock-Bee Forest Honey',
    leadGrower: 'Mangal Ram & Forest Cooperative',
    established: '1991',
    description: 'Sustainably gathered from multi-flora medicinal tree canopies deep within virgin sal forests, retaining live pollen and digestive enzymes.',
    farmerCount: 45,
    heroImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'brand-bengal',
    name: 'Burdwan Heritage Rice Guild',
    code: 'BRG',
    logo: '🌾',
    tagline: 'Indigenous Aromatic Rice & Ancient Millets',
    village: 'Kalna & Raina',
    district: 'Purba Bardhaman',
    state: 'West Bengal',
    specialty: 'Fragrant Gobindobhog, Black Rice (Karuppu Kavuni) & Low-GI Grains',
    leadGrower: 'Debabrata & Anirban Ghosh',
    established: '1985',
    description: 'Preserving 14 traditional heritage paddy strains, sun-dried on clean courtyards and single-milled with bran nutrition intact.',
    farmerCount: 36,
    heroImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'brand-kangra',
    name: 'Kangra Valley Herbal Sanctuary',
    code: 'KVH',
    logo: '🌱',
    tagline: 'Sacred Himalayan Tulsi & Mountain Herbs',
    village: 'Dharamsala Foothills',
    district: 'Kangra',
    state: 'Himachal Pradesh',
    specialty: 'Krishna Tulsi, Wild Mint, Lemongrass & Himalayan Herbs',
    leadGrower: 'Savitri Devi & Women Herb Guild',
    established: '1998',
    description: 'Nourished by glacial snow-melt streams and morning mountain mist, hand-harvested at sunrise to retain maximum essential oils.',
    farmerCount: 22,
    heroImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80',
  },
];

