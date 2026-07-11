import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

import TopBar from './components/TopBar/TopBar';
import SearchBar from './components/SearchBar/SearchBar';
import NavTabs from './components/NavTabs/NavTabs';
import PromoBar from './components/PromoBar/PromoBar';
import BottomNav from './components/BottomNav/BottomNav';
import Toast from './components/Toast/Toast';

import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import SearchPage from './pages/SearchPage/SearchPage';
import CartPage from './pages/CartPage/CartPage';
import OrderSuccessPage from './pages/OrderSuccessPage/OrderSuccessPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FAQPage from './pages/FAQPage/FAQPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';
import TermsPage from './pages/TermsPage/TermsPage';

import { useApp } from './contexts/AppContext';
import { navTabs } from './data/mockData';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useApp();

  // Update document title on route change
  useEffect(() => {
    const pathTitles: Record<string, string> = {
      '/': 'IR3H Store — Créditos IMVU, VIP & AP',
      '/busca': 'Buscar Produtos — IR3H Store',
      '/carrinho': 'Meu Carrinho — IR3H Store',
      '/favoritos': 'Meus Favoritos — IR3H Store',
      '/perfil': 'Minha Conta — IR3H Store',
      '/faq': 'Perguntas Frequentes — IR3H Store',
      '/sobre': 'Sobre Nós — IR3H Store',
      '/contato': 'Contato — IR3H Store',
      '/privacidade': 'Política de Privacidade — IR3H Store',
      '/termos': 'Termos de Uso — IR3H Store',
    };
    const title = pathTitles[location.pathname] ?? 'IR3H Store';
    document.title = title;
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isSearch = location.pathname === '/busca';
  const activeBottomTab = location.pathname === '/'
    ? 'home'
    : location.pathname.startsWith('/categoria')
    ? 'category'
    : location.pathname === '/carrinho'
    ? 'cart'
    : location.pathname === '/favoritos'
    ? 'wishlist'
    : location.pathname === '/perfil'
    ? 'profile'
    : 'home';

  const handleBottomNavChange = (tab: string) => {
    const map: Record<string, string> = {
      home: '/',
      category: '/categoria',
      cart: '/carrinho',
      wishlist: '/favoritos',
      profile: '/perfil',
    };
    navigate(map[tab] ?? '/');
  };

  // Active nav tab from URL
  const activeNavTab = (() => {
    if (location.pathname.startsWith('/categoria/')) {
      const seg = location.pathname.split('/')[2];
      const tabMap: Record<string, string> = {
        credits: 'Créditos', vip: 'VIP', ap: 'AP',
        rooms: 'Rooms', nude: 'Nude', combos: 'Combos',
      };
      return tabMap[seg] ?? navTabs[0];
    }
    return navTabs[0];
  })();

  const handleNavTabChange = (tab: string) => {
    const slugMap: Record<string, string> = {
      'Início': '/',
      'Créditos': '/categoria/credits',
      'VIP': '/categoria/vip',
      'AP': '/categoria/ap',
      'Rooms': '/categoria/rooms',
      'Nude': '/categoria/nude',
      'Combos': '/categoria/combos',
    };
    navigate(slugMap[tab] ?? '/');
  };

  return (
    <div className="app-shell">
      {/* Sticky header */}
      <TopBar cartCount={cartCount} />
      {!isSearch && <SearchBar />}
      {isHome && (
        <NavTabs activeTab={activeNavTab} onChange={handleNavTabChange} />
      )}

      {/* Main content */}
      <main className="app-scroll" id="main-content">
        <Routes>
          <Route path="/" element={<><PromoBar /><HomePage /></>} />
          <Route path="/categoria" element={<CategoryPage />} />
          <Route path="/categoria/:id" element={<CategoryPage />} />
          <Route path="/produto/:slug" element={<ProductPage />} />
          <Route path="/busca" element={<SearchPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/pedido-confirmado" element={<OrderSuccessPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />
          <Route path="/termos" element={<TermsPage />} />
          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
        <div style={{ height: 'calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px) + 16px)' }} />
      </main>

      {/* Fixed bottom nav */}
      <BottomNav
        active={activeBottomTab}
        onChange={handleBottomNavChange}
        cartCount={cartCount}
      />

      {/* Toast notifications */}
      <Toast />
    </div>
  );
}
