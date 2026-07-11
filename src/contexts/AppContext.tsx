// ============================================================
//  APP CONTEXT — IR3H IMVU Store
//  Cart, Favorites, Orders, Toast, Navigation
// ============================================================

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product, ProductCategory } from '../data/products';

// ── Types ──────────────────────────────────────────────────────

export interface CartItem {
  cartId: string;
  product: Product;
  deliveryType: string;
  nick: string;
  loginInfo?: string;
  quantity: number;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  customerName: string;
  customerWhatsapp: string;
  customerNick: string;
  total: number;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartId'>) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  // Favorites
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (order: Omit<Order, 'orderId' | 'timestamp' | 'status'>) => Order;

  // Toast
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], message: string) => void;
  dismissToast: (id: string) => void;

  // First purchase
  isFirstPurchase: boolean;
}

// ── Context ────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

// ── Sanitize ───────────────────────────────────────────────────

const sanitizeString = (s: string): string =>
  s.replace(/[<>"'`]/g, '').trim().slice(0, 200);

// ── Storage helpers ────────────────────────────────────────────

const KEYS = {
  CART: 'ir3h_cart_v2',
  FAVORITES: 'ir3h_favs_v2',
  ORDERS: 'ir3h_orders_v2',
  FIRST_PURCHASE: 'ir3h_firstpurchase_v1',
};

const safeParse = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

// ── Provider ───────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => safeParse<CartItem[]>(KEYS.CART, []));
  const [favorites, setFavorites] = useState<number[]>(() => safeParse<number[]>(KEYS.FAVORITES, []));
  const [orders, setOrders] = useState<Order[]>(() => safeParse<Order[]>(KEYS.ORDERS, []));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isFirstPurchase] = useState<boolean>(() => {
    const val = localStorage.getItem(KEYS.FIRST_PURCHASE);
    return val === null; // true = no order placed yet
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  // ── Cart ──────────────────────────────────────────────────────

  const addToCart = useCallback((item: Omit<CartItem, 'cartId'>) => {
    const cartId = `${item.product.id}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setCart(prev => [...prev, { ...item, cartId }]);
    showToast('success', `${item.product.title.slice(0, 30)}... adicionado ao carrinho!`);
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((a, i) => a + i.quantity, 0);
  const cartTotal = cart.reduce((a, i) => a + i.product.price * i.quantity, 0);

  // ── Favorites ────────────────────────────────────────────────

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        showToast('info', 'Removido dos favoritos');
        return prev.filter(id => id !== productId);
      } else {
        showToast('success', 'Adicionado aos favoritos! ❤️');
        return [...prev, productId];
      }
    });
  }, []);

  const isFavorite = useCallback((productId: number) => favorites.includes(productId), [favorites]);

  // ── Orders ───────────────────────────────────────────────────

  const placeOrder = useCallback((orderData: Omit<Order, 'orderId' | 'timestamp' | 'status'>): Order => {
    const timestamp = new Date().toISOString();
    const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
    const orderId = `#IR3H-${randomPart}`;

    const order: Order = {
      ...orderData,
      orderId,
      timestamp,
      status: 'pending',
      customerName: sanitizeString(orderData.customerName),
      customerWhatsapp: orderData.customerWhatsapp.replace(/\D/g, '').slice(0, 15),
      customerNick: sanitizeString(orderData.customerNick),
    };

    setOrders(prev => [order, ...prev]);
    localStorage.setItem(KEYS.FIRST_PURCHASE, 'done');
    return order;
  }, []);

  // ── Toasts ───────────────────────────────────────────────────

  const showToast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    setToasts(prev => [...prev.slice(-3), { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // ── Context value ─────────────────────────────────────────────

  const value: AppContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    favorites,
    toggleFavorite,
    isFavorite,
    orders,
    placeOrder,
    toasts,
    showToast,
    dismissToast,
    isFirstPurchase,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// Re-export product category type for convenience
export type { ProductCategory };
