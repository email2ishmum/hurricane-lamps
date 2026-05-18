import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'irium',
    name: 'Irium',
    colors: ['Black', 'White', 'Golden', 'Silver', 'Rose Gold'],
    priceDiscount: 1250,
    priceOriginal: 1500,
    stock: 10,
    description: 'The Irium lamp combines sleek geometry with versatile metallic finishes, casting a sophisticated glow in any modern space.',
    mainImage: 'https://i.ibb.co.com/4wcr8p2G/irium-main.webp',
    detailImages: [
      'https://i.ibb.co.com/PZ1sZ87F/irium-d1.webp',
      'https://i.ibb.co.com/hRGMbq3T/irium-d2.webp',
      'https://i.ibb.co.com/V0PyJCBP/irium-d3.webp',
      'https://i.ibb.co.com/vC2H5mgS/irium-d4.webp',
      'https://i.ibb.co.com/PGM7C2ZR/irium-d5.webp',
      'https://i.ibb.co.com/sJwyh52V/irium-d6.webp',
      'https://i.ibb.co.com/4wWtGF1S/irium-d7.webp',
      'https://i.ibb.co.com/VY7PWmns/irium-d8.webp',
      'https://i.ibb.co.com/JR5PKrN6/irium-d9.webp',
    ],
  },
  {
    id: 'illume',
    name: 'Illume',
    colors: ['White'],
    priceDiscount: 2500,
    priceOriginal: 2850,
    stock: 3,
    description: 'Pure, radiant, and minimalist. The Illume lamp is designed for clarity and elegance, making it the perfect centerpiece for a clean aesthetic.',
    mainImage: 'https://i.ibb.co.com/6cyCNtk6/illume-main.webp',
    detailImages: [
      'https://i.ibb.co.com/xtjyfdw5/illume-d1.webp',
      'https://i.ibb.co.com/1f9J3dZR/illume-d2.webp',
      'https://i.ibb.co.com/Bkwgv2V/illume-d3.webp',
      'https://i.ibb.co.com/Fbx0zbyh/illume-d4.webp',
      'https://i.ibb.co.com/5ghwT0G8/illume-d5.webp',
    ],
  },
  {
    id: 'idea',
    name: 'Idea',
    colors: ['Sea Green'],
    priceDiscount: 800,
    priceOriginal: 950,
    stock: 25,
    description: 'A refreshing take on lighting, the Idea lamp in Sea Green brings a calm, natural vibe to your workspace or reading nook.',
    mainImage: 'https://i.ibb.co.com/60pd2YCJ/idea-main.webp',
    detailImages: [
      'https://i.ibb.co.com/x8L7M4xg/idea-d1.webp',
      'https://i.ibb.co.com/WvkxGkKm/idea-d2.webp',
      'https://i.ibb.co.com/N6VRm3cs/idea-d3.webp',
    ],
  },
  {
    id: 'berg',
    name: 'Berg',
    colors: ['Orange'],
    priceDiscount: 3000,
    priceOriginal: 3450,
    stock: 3,
    description: 'Bold and sculptural, the Berg lamp is a statement piece. Its vibrant orange hue and unique form command attention in any room.',
    mainImage: 'https://i.ibb.co.com/zhwP8Y3H/berg-main.webp',
    detailImages: [
      'https://i.ibb.co.com/S7fj0SB6/berg-d1.webp',
      'https://i.ibb.co.com/0yNp2xJt/berg-d2.webp',
      'https://i.ibb.co.com/xKy2Lq2j/berg-d3.webp',
    ],
  },
  {
    id: 'marsoum',
    name: 'Marsoum',
    colors: ['Orange'],
    priceDiscount: 2750,
    priceOriginal: 3450,
    stock: 3,
    description: 'Marsoum is where traditional craftsmanship meets modern minimalism. A refined orange silhouette that glow with warmth.',
    mainImage: 'https://i.ibb.co.com/DP3djx7c/marsoum-main.webp',
    detailImages: [
      'https://i.ibb.co.com/DDXsLpd4/marsoum-d1.webp',
    ],
  },
];

export const HERO_IMAGE = 'https://i.ibb.co.com/8nJtYy5j/hero-1.webp';

// Aggregating all detail images for the Home Page gallery
export const ALL_DETAIL_IMAGES = PRODUCTS.flatMap(p => p.detailImages);
