// ============================================================
//  APP CONTEXT — IR3H IMVU Store (Dynamic CMS Version)
// ============================================================

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { allProducts, type Product, type ProductCategory } from '../data/products';
import { categories as initialCategories, heroBanners as initialBanners, type Banner, type Category } from '../data/mockData';

// ── New CMS Interfaces ──────────────────────────────────────────

export interface ShowcaseItem {
  id: number;
  name: string;
  description: string;
  imgUrl?: string;
  link?: string;
  genre?: string;
  streamUrl?: string;
  emoji?: string;
}

export interface Showcase {
  id: string; // 'rooms' | 'shops' | 'radio'
  title: string;
  subtitle: string;
  label?: string;
  items: ShowcaseItem[];
  status: boolean;
}

export interface LandingHero {
  title: string;
  subtitle: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  videoUrl: string;
  badgeText: string;
}

export interface LandingReview {
  id: number;
  initials: string;
  color: string;
  name: string;
  text: string;
  stars: number;
}

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingPageConfig {
  hero: LandingHero;
  reviews: LandingReview[];
  faqs: LandingFaq[];
  footerLogo: string;
  footerText: string;
}

export interface SystemSettings {
  siteName: string;
  logoText: string;
  faviconUrl: string;
  seoTitle: string;
  seoDescription: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
}

export interface AdminLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'blocked' | 'suspended';
  whatsapp?: string;
}

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

// ── Context Interface ──────────────────────────────────────────

interface AppContextType {
  // Store Cart, Favorites, Orders, Toasts
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartId'>) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;

  orders: Order[];
  placeOrder: (order: Omit<Order, 'orderId' | 'timestamp' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], message: string) => void;
  dismissToast: (id: string) => void;

  isFirstPurchase: boolean;

  // CMS dynamic state
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  duplicateProduct: (id: number) => void;

  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  showcases: Showcase[];
  updateShowcase: (id: string, updated: Partial<Showcase>) => void;

  banners: Banner[];
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (id: number, banner: Partial<Banner>) => void;
  deleteBanner: (id: number) => void;

  landingConfig: LandingPageConfig;
  updateLandingConfig: (config: Partial<LandingPageConfig>) => void;

  users: User[];
  updateUserRole: (id: string, role: User['role']) => void;
  updateUserStatus: (id: string, status: User['status']) => void;

  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  logs: AdminLog[];
  addLog: (action: string, details: string) => void;
  clearLogs: () => void;

  settings: SystemSettings;
  updateSettings: (settings: Partial<SystemSettings>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const KEYS = {
  CART: 'ir3h_cart_v2',
  FAVORITES: 'ir3h_favs_v2',
  ORDERS: 'ir3h_orders_v2',
  FIRST_PURCHASE: 'ir3h_firstpurchase_v1',
  PRODUCTS: 'ir3h_products',
  CATEGORIES: 'ir3h_categories',
  SHOWCASES: 'ir3h_showcases',
  BANNERS: 'ir3h_banners',
  LANDING: 'ir3h_landing_config',
  USERS: 'ir3h_users',
  CURRENT_USER: 'ir3h_current_user',
  LOGS: 'ir3h_logs',
  SETTINGS: 'ir3h_settings',
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

// ── Initial Mock Data Fallbacks ──────────────────────────────────

const defaultLandingConfig: LandingPageConfig = {
  hero: {
    title: 'Eleve seu Avatar no IMVU com a IR3H Store',
    subtitle: 'Créditos, Passes VIP, AP e Rooms com as melhores taxas do mercado. Envio em minutos, 100% seguro e garantido.',
    primaryBtnText: 'Acessar Loja Completa',
    secondaryBtnText: 'Simular Créditos',
    videoUrl: '/hero_video.mp4',
    badgeText: '+2.400 clientes atendidos',
  },
  reviews: [
    { id: 1, initials: 'BL', color: '#8b5cf6', name: 'Beatriz_imvu', text: '"Comprei o AP e chegou super rápido! O atendimento do suporte no WhatsApp foi excelente. Super indico!"', stars: 5 },
    { id: 2, initials: 'TG', color: '#3b82f6', name: 'ThiagoGamer', text: '"Sempre compro créditos aqui. Rápido, seguro e muito mais barato do que comprar direto no jogo."', stars: 5 },
    { id: 3, initials: 'KV', color: '#db2777', name: 'KarenVip_br', text: '"Comprei o VIP Platinum e ativou na hora! A IR3H é a melhor revendedora que já usei. Voltarei sempre."', stars: 5 },
    { id: 4, initials: 'RL', color: '#10b981', name: 'RafaelLima99', text: '"Fiz meu primeiro pedido com receio mas foi perfeito. Entrega em menos de 10 minutos. Nota 10!"', stars: 5 },
  ],
  faqs: [
    { q: 'Como os créditos e passes são entregues?', a: 'A entrega é realizada via WhatsApp ou diretamente na sua conta IMVU por meio de Presente (Gift) ou Transferência Oficial. Todo o processo leva entre 5 a 15 minutos após a confirmação do pagamento.' },
    { q: 'Preciso fornecer a senha do meu avatar?', a: 'Não! Para a grande maioria dos pacotes de créditos e passes (incluindo AP), nós não solicitamos sua senha. Precisamos apenas do seu Nick (Avatar Name) do IMVU.' },
    { q: 'Quais são as formas de pagamento aceitas?', a: 'Aceitamos Pix (com aprovação e entrega imediata), Cartão de Crédito e Boleto Bancário.' },
    { q: 'O serviço da IR3H é seguro?', a: 'Totalmente seguro. Trabalhamos exclusivamente com métodos oficiais do IMVU, garantindo que sua conta fique 100% protegida contra qualquer tipo de banimento.' },
  ],
  footerLogo: 'IR3HSTORE',
  footerText: 'A maior e mais segura revendedora de créditos, passes e serviços IMVU do Brasil. Entrega rápida, suporte real.',
};

const defaultShowcases: Showcase[] = [
  {
    id: 'rooms',
    title: 'Rooms em Destaque',
    subtitle: 'Salas públicas curadas para você visitar agora mesmo no IMVU',
    label: 'Explorar Salas',
    status: true,
    items: [
      { id: 1, name: 'Sala VIP Exclusiva', description: 'Room temática premium com decoração especial. Venha conhecer!', imgUrl: 'https://i.pinimg.com/1200x/77/6f/11/776f11f2708aa43d734ab6b29c61dc98.jpg', link: 'https://imvu.com' },
      { id: 2, name: 'Ambiente Noturno', description: 'Sala night club com luzes neon e música ambiente para suas festas.', imgUrl: 'https://i.pinimg.com/736x/52/6d/8f/526d8f3c93b6f76dddb903e4b057487b.jpg', link: 'https://imvu.com' },
      { id: 3, name: 'Lounge Tropical', description: 'Ambiente relaxante com decoração tropical. Perfeito para socializar.', imgUrl: 'https://i.pinimg.com/736x/14/43/35/1443351d08deaef582490c6a918c510f.jpg', link: 'https://imvu.com' },
    ],
  },
  {
    id: 'shops',
    title: 'Shops em Destaque',
    subtitle: 'Catálogos e lojas selecionadas com itens exclusivos para o seu avatar',
    label: 'Descobrir Lojas',
    status: true,
    items: [
      { id: 1, name: 'Loja de Outono', description: 'Looks exclusivos de avatar disponíveis no catálogo da loja.', imgUrl: 'https://i.pinimg.com/736x/56/dc/b7/56dcb7d8e766ed9bc23b85a11f762fb9.jpg', link: 'https://imvu.com' },
      { id: 2, name: 'Acessórios VIP Shop', description: 'Conjunto de acessórios premium para customizar seu avatar.', imgUrl: 'https://i.pinimg.com/736x/f7/a6/b0/f7a6b0403cf16bc5be6bf9d4b349591a.jpg', link: 'https://imvu.com' },
      { id: 3, name: 'Shop Masculino', description: 'Seleção curada de roupas e poses para avatares masculinos.', imgUrl: 'https://i.pinimg.com/736x/2d/61/ac/2d61acb4aa6ed07ed03864d3f57b701e.jpg', link: 'https://imvu.com' },
    ],
  },
  {
    id: 'radio',
    title: 'Rádio ao Vivo',
    subtitle: 'Estações em transmissão em tempo real — aperte play e curta!',
    label: 'Ao Vivo Agora',
    status: true,
    items: [
      { id: 1, name: 'IR3H Radio', description: '', genre: 'Pop / Eletrônico', streamUrl: 'https://s4.radio.co/seec67ef36/listen', emoji: '📻' },
      { id: 2, name: 'Surfer Network FM', description: '', genre: 'Dance / House', streamUrl: 'https://stream-285.surfernetwork.com/x9ko0jn9mzauv', emoji: '🎵' },
      { id: 3, name: 'Surf Wave Radio', description: '', genre: 'Pop / R&B', streamUrl: 'https://stream-176.surfernetwork.com/i8fbh0i6hv5uv', emoji: '🌊' },
      { id: 4, name: 'Zeno Radio', description: '', genre: 'Variado', streamUrl: 'https://stream.zeno.fm/mlugl0ydfdeuv', emoji: '🎶' },
    ],
  },
];

const defaultUsers: User[] = [
  { id: '1', name: 'IR3H Admin', email: 'admin@ir3h.com', role: 'admin', status: 'active', whatsapp: '5527988003025' },
  { id: '2', name: 'João Cliente', email: 'joao@gmail.com', role: 'user', status: 'active', whatsapp: '5527999999999' },
];

const defaultSettings: SystemSettings = {
  siteName: 'IR3H Store',
  logoText: 'IR3HSTORE',
  faviconUrl: '/favicon.ico',
  seoTitle: 'IR3H Store — Promoções, Créditos & Passes IMVU',
  seoDescription: 'A maior e mais segura revendedora de créditos, passes e serviços IMVU do Brasil. Entrega rápida, suporte real.',
  whatsappNumber: '5527988003025',
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
};

// ── Provider ───────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => safeParse<CartItem[]>(KEYS.CART, []));
  const [favorites, setFavorites] = useState<number[]>(() => safeParse<number[]>(KEYS.FAVORITES, []));
  const [orders, setOrders] = useState<Order[]>(() => safeParse<Order[]>(KEYS.ORDERS, []));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isFirstPurchase] = useState<boolean>(() => localStorage.getItem(KEYS.FIRST_PURCHASE) === null);

  // CMS States
  const [products, setProducts] = useState<Product[]>(() => safeParse<Product[]>(KEYS.PRODUCTS, allProducts));
  const [categories, setCategories] = useState<Category[]>(() => safeParse<Category[]>(KEYS.CATEGORIES, initialCategories));
  const [showcases, setShowcases] = useState<Showcase[]>(() => safeParse<Showcase[]>(KEYS.SHOWCASES, defaultShowcases));
  const [banners, setBanners] = useState<Banner[]>(() => safeParse<Banner[]>(KEYS.BANNERS, initialBanners));
  const [landingConfig, setLandingConfig] = useState<LandingPageConfig>(() => safeParse<LandingPageConfig>(KEYS.LANDING, defaultLandingConfig));
  const [users, setUsers] = useState<User[]>(() => safeParse<User[]>(KEYS.USERS, defaultUsers));
  const [currentUser, setCurrentUser] = useState<User | null>(() => safeParse<User | null>(KEYS.CURRENT_USER, null));
  const [logs, setLogs] = useState<AdminLog[]>(() => safeParse<AdminLog[]>(KEYS.LOGS, []));
  const [settings, setSettings] = useState<SystemSettings>(() => safeParse<SystemSettings>(KEYS.SETTINGS, defaultSettings));

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem(KEYS.CART, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem(KEYS.SHOWCASES, JSON.stringify(showcases)); }, [showcases]);
  useEffect(() => { localStorage.setItem(KEYS.BANNERS, JSON.stringify(banners)); }, [banners]);
  useEffect(() => { localStorage.setItem(KEYS.LANDING, JSON.stringify(landingConfig)); }, [landingConfig]);
  useEffect(() => { localStorage.setItem(KEYS.USERS, JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem(KEYS.LOGS, JSON.stringify(logs)); }, [logs]);
  useEffect(() => { localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings)); }, [settings]);

  // ── Toast Utility ─────────────────────────────────────────────

  const showToast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    setToasts(prev => [...prev.slice(-2), { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // ── Logging System ───────────────────────────────────────────

  const addLog = useCallback((action: string, details: string) => {
    const newLog: AdminLog = {
      id: `log_${Date.now()}`,
      user: currentUser?.name || 'Sistema / Visitante',
      action,
      timestamp: new Date().toISOString(),
      details,
    };
    setLogs(prev => [newLog, ...prev]);
  }, [currentUser]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // ── Cart Operations ──────────────────────────────────────────

  const addToCart = useCallback((item: Omit<CartItem, 'cartId'>) => {
    const cartId = `${item.product.id}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setCart(prev => [...prev, { ...item, cartId }]);
    showToast('success', `${item.product.title.slice(0, 30)}... adicionado ao carrinho!`);
  }, [showToast]);

  const removeFromCart = useCallback((cartId: string) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => { setCart([]); }, []);
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
  }, [showToast]);

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
      customerName: orderData.customerName.replace(/[<>"']/g, '').trim(),
      customerWhatsapp: orderData.customerWhatsapp.replace(/\D/g, '').slice(0, 15),
      customerNick: orderData.customerNick.replace(/[<>"']/g, '').trim(),
    };

    setOrders(prev => [order, ...prev]);
    localStorage.setItem(KEYS.FIRST_PURCHASE, 'done');
    return order;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status } : o));
    addLog('Pedido Atualizado', `Status do pedido ${orderId} alterado para ${status}`);
    showToast('success', `Pedido ${orderId} atualizado para: ${status}`);
  }, [addLog, showToast]);

  // ── CMS Products CRUD ─────────────────────────────────────────

  const addProduct = useCallback((p: Omit<Product, 'id'>) => {
    const newId = products.length > 0 ? Math.max(...products.map(pr => pr.id)) + 1 : 1;
    const newProduct: Product = { ...p, id: newId };
    setProducts(prev => [newProduct, ...prev]);
    addLog('Produto Criado', `Criou o produto: ${newProduct.title} (ID: ${newId})`);
    showToast('success', `Produto "${newProduct.title}" cadastrado com sucesso!`);
  }, [products, addLog, showToast]);

  const updateProduct = useCallback((id: number, p: Partial<Product>) => {
    setProducts(prev => prev.map(pr => pr.id === id ? { ...pr, ...p } as Product : pr));
    addLog('Produto Atualizado', `Editou o produto ID: ${id}`);
    showToast('success', 'Produto atualizado com sucesso!');
  }, [addLog, showToast]);

  const deleteProduct = useCallback((id: number) => {
    const target = products.find(pr => pr.id === id);
    setProducts(prev => prev.filter(pr => pr.id !== id));
    addLog('Produto Excluído', `Excluiu o produto ID: ${id} (${target?.title || 'não encontrado'})`);
    showToast('info', 'Produto removido com sucesso.');
  }, [products, addLog, showToast]);

  const duplicateProduct = useCallback((id: number) => {
    const target = products.find(pr => pr.id === id);
    if (!target) return;
    const newId = products.length > 0 ? Math.max(...products.map(pr => pr.id)) + 1 : 1;
    const duplicated: Product = {
      ...target,
      id: newId,
      title: `${target.title} (Cópia)`,
      slug: `${target.slug}-copia-${Date.now().toString().slice(-4)}`,
    };
    setProducts(prev => [duplicated, ...prev]);
    addLog('Produto Duplicado', `Duplicou o produto ID: ${id} para o ID: ${newId}`);
    showToast('success', `Produto duplicado como "${duplicated.title}"`);
  }, [products, addLog, showToast]);

  // ── CMS Categories CRUD ───────────────────────────────────────

  const addCategory = useCallback((c: Category) => {
    setCategories(prev => [...prev, c]);
    addLog('Categoria Criada', `Criou a categoria: ${c.label}`);
    showToast('success', `Categoria "${c.label}" criada!`);
  }, [addLog, showToast]);

  const updateCategory = useCallback((id: string, c: Partial<Category>) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...c } : cat));
    addLog('Categoria Atualizada', `Editou a categoria ID: ${id}`);
    showToast('success', 'Categoria atualizada!');
  }, [addLog, showToast]);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    addLog('Categoria Excluída', `Excluiu a categoria ID: ${id}`);
    showToast('info', 'Categoria removida.');
  }, [addLog, showToast]);

  // ── CMS Showcase (Vitrines) ──────────────────────────────────

  const updateShowcase = useCallback((id: string, updated: Partial<Showcase>) => {
    setShowcases(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    addLog('Vitrine Atualizada', `Editou as configurações da vitrine "${id}"`);
    showToast('success', 'Configurações de vitrine atualizadas!');
  }, [addLog, showToast]);

  // ── CMS Banners CRUD ──────────────────────────────────────────

  const addBanner = useCallback((b: Omit<Banner, 'id'>) => {
    const newId = banners.length > 0 ? Math.max(...banners.map(ba => ba.id)) + 1 : 1;
    const newBanner: Banner = { ...b, id: newId };
    setBanners(prev => [...prev, newBanner]);
    addLog('Banner Criado', `Criou o banner promocional: ${b.label}`);
    showToast('success', 'Banner promocional adicionado.');
  }, [banners, addLog, showToast]);

  const updateBanner = useCallback((id: number, b: Partial<Banner>) => {
    setBanners(prev => prev.map(ba => ba.id === id ? { ...ba, ...b } as Banner : ba));
    addLog('Banner Atualizado', `Editou o banner ID: ${id}`);
    showToast('success', 'Banner promocional updated.');
  }, [addLog, showToast]);

  const deleteBanner = useCallback((id: number) => {
    setBanners(prev => prev.filter(ba => ba.id !== id));
    addLog('Banner Excluído', `Excluiu o banner ID: ${id}`);
    showToast('info', 'Banner promocional removido.');
  }, [addLog, showToast]);

  // ── CMS Landing Page Configurations ──────────────────────────

  const updateLandingConfig = useCallback((c: Partial<LandingPageConfig>) => {
    setLandingConfig(prev => ({ ...prev, ...c }));
    addLog('Landing Page Editada', 'Alterou configurações visuais ou textuais da Landing Page.');
    showToast('success', 'Landing Page salva com sucesso!');
  }, [addLog, showToast]);

  // ── CMS User Administration ──────────────────────────────────

  const updateUserRole = useCallback((id: string, role: User['role']) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    addLog('Acesso de Usuário Alterado', `Role do usuário ID: ${id} alterada para ${role}`);
    showToast('success', `Privilégio do usuário atualizado.`);
  }, [addLog, showToast]);

  const updateUserStatus = useCallback((id: string, status: User['status']) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
    addLog('Status de Usuário Alterado', `Status do usuário ID: ${id} alterado para ${status}`);
    showToast('info', `Status do usuário atualizado para ${status}.`);
  }, [addLog, showToast]);

  // ── CMS Authentication Simulator ──────────────────────────────

  const login = useCallback((email: string, pass: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (pass === 'admin123' || found.role === 'user') {
        if (found.status !== 'active') {
          showToast('error', `Acesso negado: sua conta está ${found.status}.`);
          return false;
        }
        setCurrentUser(found);
        addLog('Login efetuado', `Usuário ${found.name} entrou no painel.`);
        showToast('success', `Bem-vindo, ${found.name}!`);
        return true;
      }
    }
    showToast('error', 'E-mail ou senha incorretos.');
    return false;
  }, [users, addLog, showToast]);

  const logout = useCallback(() => {
    if (currentUser) {
      addLog('Logout efetuado', `Usuário ${currentUser.name} saiu do painel.`);
    }
    setCurrentUser(null);
    showToast('info', 'Você saiu da conta.');
  }, [currentUser, addLog, showToast]);

  // ── Global System Settings ───────────────────────────────────

  const updateSettings = useCallback((s: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...s }));
    addLog('Configurações Atualizadas', 'Modificou os metadados do site (SEO, Contatos ou Redes Sociais)');
    showToast('success', 'Configurações de sistema atualizadas.');
  }, [addLog, showToast]);

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
    updateOrderStatus,
    toasts,
    showToast,
    dismissToast,
    isFirstPurchase,

    // CMS Exports
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    showcases,
    updateShowcase,
    banners,
    addBanner,
    updateBanner,
    deleteBanner,
    landingConfig,
    updateLandingConfig,
    users,
    updateUserRole,
    updateUserStatus,
    currentUser,
    login,
    logout,
    logs,
    addLog,
    clearLogs,
    settings,
    updateSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export type { ProductCategory };
