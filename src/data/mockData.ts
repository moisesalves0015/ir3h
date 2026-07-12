// ============================================================
//  MOCK DATA — IR3H IMVU Store
// ============================================================

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  badge?: 'sale' | 'new' | 'hot';
  rating: number;
  reviews: number;
  sold: string;
  category: string;
  colors?: string[];
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export interface Banner {
  id: number;
  image: string;
  label: string;
  bgGradient: string;
}

// ─── Categories ───────────────────────────────────────────────
export const categories: Category[] = [
  { id: 'credits', label: 'Créditos', emoji: '💎', color: '#312e81' },
  { id: 'vip',     label: 'VIP',      emoji: '👑', color: '#5b21b6' },
  { id: 'ap',      label: 'AP',       emoji: '🔞', color: '#9d174d' },
  { id: 'rooms',   label: 'Rooms',    emoji: '🏠', color: '#1e3a8a' },
  { id: 'nude',    label: 'Nude',     emoji: '🔞', color: '#85144b' },
  { id: 'combos',  label: 'Combos',   emoji: '🎁', color: '#111827' },
];

// ─── Flash Sale Products (Ofertas Relâmpago) ───────────────────
export const flashSaleProducts: Product[] = [
  {
    id: 1,
    title: '10.000 (10k) Créditos IMVU',
    price: 18.90,
    originalPrice: 27.00,
    discount: 30,
    image: '/images/10k_credits.png',
    badge: 'sale',
    rating: 4.9, reviews: 312, sold: '1.2k', category: 'credits',
  },
  {
    id: 2,
    title: '50.000 (50k) Créditos IMVU',
    price: 89.90,
    originalPrice: 119.90,
    discount: 25,
    image: '/images/50k_credits.jpg',
    badge: 'sale',
    rating: 4.8, reviews: 145, sold: '580', category: 'credits',
  },
  {
    id: 3,
    title: 'Combo: 100k Créditos + AP',
    price: 249.90,
    originalPrice: 320.00,
    discount: 21,
    image: '/images/combos.png',
    badge: 'sale',
    rating: 4.9, reviews: 188, sold: '300', category: 'combos',
  },
  {
    id: 4,
    title: 'IMVU VIP Diamond (1 Mês)',
    price: 79.90,
    originalPrice: 99.90,
    discount: 20,
    image: '/images/vip.png',
    badge: 'new',
    rating: 4.8, reviews: 95, sold: '150', category: 'vip',
  },
];

// ─── New Arrivals (Novidades) ──────────────────────────────────
export const newArrivals: Product[] = [
  {
    id: 11,
    title: '5.000 (5k) Créditos IMVU',
    price: 9.90,
    originalPrice: 13.00,
    discount: 23,
    image: '/images/credits.png',
    badge: 'new',
    rating: 4.9, reviews: 142, sold: '2.5k', category: 'credits',
  },
  {
    id: 12,
    title: '20.000 (20k) Créditos IMVU',
    price: 36.90,
    originalPrice: 48.00,
    discount: 23,
    image: '/images/credits.png',
    badge: 'hot',
    rating: 4.9, reviews: 290, sold: '1.8k', category: 'credits',
  },
  {
    id: 13,
    title: '100.000 (100k) Créditos IMVU',
    price: 174.90,
    originalPrice: 220.00,
    discount: 20,
    image: '/images/credits.png',
    badge: 'hot',
    rating: 5.0, reviews: 422, sold: '950', category: 'credits',
  },
  {
    id: 14,
    title: 'Access Pass (AP) Oficial',
    price: 99.90,
    originalPrice: 129.90,
    discount: 23,
    image: '/images/ap.png',
    badge: 'hot',
    rating: 4.7, reviews: 180, sold: '600', category: 'ap',
  },
  {
    id: 15,
    title: 'VIP Gold (1 Mês)',
    price: 24.90,
    originalPrice: 35.00,
    discount: 28,
    image: '/images/vip.png',
    badge: 'new',
    rating: 4.6, reviews: 64, sold: '350', category: 'vip',
  },
  {
    id: 16,
    title: 'VIP Platinum (1 Mês)',
    price: 49.90,
    originalPrice: 65.00,
    discount: 23,
    image: '/images/vip.png',
    badge: 'new',
    rating: 4.8, reviews: 83, sold: '210', category: 'vip',
  },
];

// ─── Recommended (Para Você) ───────────────────────────────────
export const recommendedProducts: Product[] = [
  {
    id: 21,
    title: 'Combo: 50k Créditos + 1 Mês VIP Gold',
    price: 109.90,
    originalPrice: 145.00,
    discount: 24,
    image: '/images/combos.png',
    badge: 'hot',
    rating: 4.9, reviews: 204, sold: '500', category: 'combos',
  },
  {
    id: 22,
    title: 'Combo: 200k Créditos + AP',
    price: 399.90,
    originalPrice: 499.00,
    discount: 20,
    image: '/images/combos.png',
    badge: 'hot',
    rating: 5.0, reviews: 92, sold: '150', category: 'combos',
  },
  {
    id: 23,
    title: 'Sala de Chat IMVU Pronta',
    price: 34.90,
    originalPrice: 50.00,
    discount: 30,
    image: '/images/rooms.png',
    badge: 'new',
    rating: 4.8, reviews: 45, sold: '180', category: 'rooms',
  },
  {
    id: 24,
    title: 'Decoração Completa para Sala Chat',
    price: 59.90,
    originalPrice: 85.00,
    discount: 29,
    image: '/images/rooms.png',
    badge: 'hot',
    rating: 4.9, reviews: 112, sold: '420', category: 'rooms',
  },
  {
    id: 25,
    title: 'Pacote de Skins Nude AP',
    price: 49.90,
    originalPrice: 70.00,
    discount: 28,
    image: '/images/nude.png',
    badge: 'new',
    rating: 4.7, reviews: 78, sold: '250', category: 'nude',
  },
  {
    id: 26,
    title: 'Roupas Especiais Nude Premium',
    price: 39.90,
    originalPrice: 55.00,
    discount: 27,
    image: '/images/nude.png',
    badge: 'hot',
    rating: 4.8, reviews: 93, sold: '310', category: 'nude',
  },
];

// ─── Promo Banners ─────────────────────────────────────────────
export const heroBanners: Banner[] = [
  {
    id: 1,
    image: '/images/cover_all.png',
    label: 'IR3H Store — Créditos IMVU com Envio Imediato',
    bgGradient: 'linear-gradient(135deg,#5b21b6 0%,#db2777 100%)',
  },
  {
    id: 2,
    image: '/images/combos.png',
    label: 'Combos Especiais AP + Créditos com Desconto',
    bgGradient: 'linear-gradient(135deg,#1e3a8a 0%,#8b5cf6 100%)',
  },
  {
    id: 3,
    image: '/images/vip.png',
    label: 'Ativação VIP Rápida e Segura 100% Garantida',
    bgGradient: 'linear-gradient(135deg,#9d174d 0%,#fbbf24 100%)',
  },
];

// ─── Navigation tabs ──────────────────────────────────────────
export const navTabs = ['Início', 'Créditos', 'VIP', 'AP', 'Rooms', 'Nude', 'Combos'];
