export interface GrowerProfile {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  specialty: string;
  experience: string;
  harvestMethod: string;
  image: string;
  quote: string;
  description: string;
}

export const GROWER_SPOTLIGHTS: GrowerProfile[] = [
  {
    id: 'grower-kyrshan',
    name: 'Bah Kyrshan Dhar',
    village: 'Shangpung Village',
    district: 'West Jaintia Hills',
    state: 'Meghalaya',
    specialty: 'Single-Origin Lakadong Turmeric',
    experience: '34 years of mountain farming',
    harvestMethod: 'Hand-dug rhizomes cured on bamboo mats',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    quote: 'We listen to the soil and mountain rain. Turmeric harvested with patience holds the true warmth of our hills.',
    description: 'Kyrshan coordinates with 18 tribal farming families in the Jaintia highlands to protect ancestral non-hybrid Lakadong cultivars from industrial dilution.'
  },
  {
    id: 'grower-savitri',
    name: 'Savitri Devi & Women Herb Guild',
    village: 'Vrindavan Rural Groves',
    district: 'Mathura',
    state: 'Uttar Pradesh',
    specialty: 'Sacred Krishna & Rama Tulsi',
    experience: '28 years traditional herb foraging & cultivation',
    harvestMethod: 'Dawn hand-picked leaves, muslin shade dehydration',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80',
    quote: 'Every leaf of Tulsi carries sacred rhythm. When picked at sunrise before hot rays touch the dew, its oil remains sweet.',
    description: 'Empowering 22 women in her village, Savitri’s cooperative converts fallow river-buffer strips into blooming bio-diverse herbal sanctuaries.'
  },
  {
    id: 'grower-selvaraj',
    name: 'Selvaraj & Vellingiri',
    village: 'Negamam & Kinathukadavu',
    district: 'Pollachi',
    state: 'Tamil Nadu',
    specialty: 'Wood-Pressed Coconut Oil & Moringa',
    experience: '45 years family oil mill & coconut groves',
    harvestMethod: 'Cold Vaagai wood chekku press without steam or chemicals',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    quote: 'True cold-pressed oil needs time, not heat. The wooden pestle preserves the gentle essence that nature stored in the copra.',
    description: 'Operating a traditional open-air yard where fallen coconuts dry under glass domes before slow churning in heirloom wooden mortars.'
  },
  {
    id: 'grower-ramrao',
    name: 'Ramrao Patil',
    village: 'Maval Valley Hamlet',
    district: 'Pune',
    state: 'Maharashtra',
    specialty: 'Desi Country Greens & Riverbank Vegetables',
    experience: '3rd generation riverbank grower',
    harvestMethod: 'Fresh morning sickle cuts, packed in aerated natural leaf wraps',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    quote: 'The soil by the river is living breath. When we treat the earth with cow dung compost and clean water, every vegetable has real flavor.',
    description: 'Ramrao coordinates daily harvest logistics so country greens reach city kitchens within 24 to 36 hours of morning plucking.'
  }
];

export const SOURCING_STEPS = [
  {
    step: '01',
    title: 'Village Stewardship',
    subtitle: 'Nourishing Living Soil',
    description: 'We partner directly with smallholder farmers, tribal collectives, and rural cottage guilds who practice natural composting, crop rotation, and open-pollinated seed preservation.',
    icon: '🌱'
  },
  {
    step: '02',
    title: 'Traditional & Gentle Harvesting',
    subtitle: 'Picked at Peak Season',
    description: 'Crops are harvested only when seasonally ripe — hand-dug turmeric rhizomes, dawn-plucked herbs before morning dew evaporates, and mature coconuts naturally fallen.',
    icon: '🌾'
  },
  {
    step: '03',
    title: 'Artisanal Small-Batch Processing',
    subtitle: 'Stone-Ground & Wood-Pressed',
    description: 'No chemical solvent extractions, no artificial sulfur bleaches. Our partners use slow stone chakkis, bi-directional wooden bilonas, and cold vaagai wood expellers.',
    icon: '🏺'
  },
  {
    step: '04',
    title: 'Eco-Packed & Traceable Delivery',
    subtitle: 'Straight from Village Hub to Door',
    description: 'Small batches are sealed in paper pouches, reusable glass jars, or tin containers labeled with transparent batch numbers, grower details, and harvest dates.',
    icon: '📦'
  }
];
