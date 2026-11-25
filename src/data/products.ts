import type { Product, ProductCategory } from '@/scripts/types/product.ts';

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  'Ornaments',
  'Candles & Scents',
  'Gift Sets',
  'Tableware & Decor',
];

export const PRODUCTS: readonly Product[] = [
  {
    id: 'glass-bauble-set',
    name: 'Fluted Glass Bauble Set',
    image: '/images/glass-bauble-set.webp',
    category: 'Ornaments',
    price: 48,
    description: 'Eight mouth-blown amber and pine glass ornaments in a beechwood keepsake box.',
  },
  {
    id: 'brass-star-topper',
    name: 'Brushed Brass Tree Star Topper',
    image: '/images/brass-star-topper.webp',
    category: 'Ornaments',
    price: 34,
    description: 'Lightweight eight-point star hand-finished in warm brushed brass.',
  },
  {
    id: 'wooden-nutcracker',
    name: 'Hand-Turned Walnut Nutcracker',
    image: '/images/wooden-nutcracker.webp',
    category: 'Ornaments',
    price: 72,
    description: 'Carved European beech and walnut mantel figurine with beeswax oil finish.',
  },
  {
    id: 'winter-pine-candle',
    name: 'Winter Pine & Cedar Candle',
    image: '/images/winter-pine-candle.webp',
    category: 'Candles & Scents',
    price: 36,
    description: 'Hand-poured soy-beeswax blend with Siberian fir, cedarwood, and warm amber.',
  },
  {
    id: 'spiced-orange-diffuser',
    name: 'Spiced Orange & Clove Diffuser',
    image: '/images/spiced-orange-diffuser.webp',
    category: 'Candles & Scents',
    price: 42,
    description: 'Botanical reed diffuser blending blood orange peel, cinnamon bark, and clove.',
  },
  {
    id: 'cocoa-shortbread-box',
    name: 'Spiced Cocoa & Shortbread Gift Box',
    image: '/images/cocoa-shortbread-box.webp',
    category: 'Gift Sets',
    price: 54,
    description: 'Single-origin spiced drinking chocolate paired with all-butter shortbread tins.',
  },
  {
    id: 'cozy-eve-gift-set',
    name: 'Winter Eve Mug & Tea Gift Set',
    image: '/images/cozy-eve-gift-set.webp',
    category: 'Gift Sets',
    price: 64,
    description: 'Glazed stoneware mug, loose-leaf cardamom black tea, and wildflower honey.',
  },
  {
    id: 'linen-stocking',
    name: 'Belgian Linen Stocking',
    image: '/images/linen-stocking.webp',
    category: 'Tableware & Decor',
    price: 38,
    description: 'Heavyweight oatmeal flax stocking finished with crimson wool blanket stitching.',
  },
  {
    id: 'eucalyptus-brass-wreath',
    name: 'Nordic Brass & Eucalyptus Wreath',
    image: '/images/eucalyptus-brass-wreath.webp',
    category: 'Tableware & Decor',
    price: 58,
    description:
      'Solid brass ring dressed with preserved eucalyptus, cedar sprigs, and dried citrus.',
  },
  {
    id: 'ceramic-pine-plates',
    name: 'Speckled Ceramic Dessert Plates (Set of 4)',
    image: '/images/ceramic-pine-plates.webp',
    category: 'Tableware & Decor',
    price: 46,
    description: 'Hand-glazed stoneware side plates with a subtle evergreen rim.',
  },
];
