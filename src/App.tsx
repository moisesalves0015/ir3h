import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

import TopBar from './components/TopBar/TopBar';
import SearchBar from './components/SearchBar/SearchBar';
import NavTabs from './components/NavTabs/NavTabs';
import PromoBar from './components/PromoBar/PromoBar';
import BottomNav from './components/BottomNav/BottomNav';
import Toast from './components/Toast/Toast';

// Store Views
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
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

// Admin CMS Views
import ProtectedRoute from './components/AdminLayout/ProtectedRoute';
import AdminLayout from './components/AdminLayout/AdminLayout';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminShowcases from './pages/Admin/AdminShowcases';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminBanners from './pages/Admin/AdminBanners';
import AdminLandingEditor from './pages/Admin/AdminLandingEditor';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminLogs from './pages/Admin/AdminLogs';
import AdminSettings from './pages/Admin/AdminSettings';

import { useApp } from './contexts/AppContext';
import { navTabs } from './data/mockData';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, settings } = useApp();

  // Update document title on route change
  useEffect(() => {
    const pathTitles: Record<string, string> = {
      '/': `${settings.seoTitle}`,
      '/ir3h-store': `Loja Oficial — ${settings.siteName}`,
      '/busca': `Buscar Produtos — ${settings.siteName}`,
      '/carrinho': `Meu Carrinho — ${settings.siteName}`,
      '/favoritos': `Meus Favoritos — ${settings.siteName}`,
      '/perfil': `Minha Conta — ${settings.siteName}`,
      '/faq': `Perguntas Frequentes — ${settings.siteName}`,
      '/sobre': `Sobre Nós — ${settings.siteName}`,
      '/contato': `Contato — ${settings.siteName}`,
      '/privacidade': `Política de Privacidade — ${settings.siteName}`,
      '/termos': `Termos de Uso — ${settings.siteName}`,
      '/admin': `Dashboard Admin — ${settings.siteName}`,
      '/admin/login': `Login Administrativo — ${settings.siteName}`,
    };
    const title = pathTitles[location.pathname] ?? settings.siteName;
    document.title = title;
  }, [location.pathname, settings]);

  const isLanding = location.pathname === '/';
  const isStore = location.pathname === '/ir3h-store';
  const isSearch = location.pathname === '/busca';
  const isAdmin = location.pathname.startsWith('/admin');

  const activeBottomTab = isLanding
    ? 'home'
    : location.pathname.startsWith('/categoria') || isStore
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
      category: '/ir3h-store',
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
        rooms: 'Rooms', nude: 'Nude', combos: 'Combos', service: 'Serviço',
      };
      return tabMap[seg] ?? navTabs[0];
    }
    return navTabs[0];
  })();

  const handleNavTabChange = (tab: string) => {
    const slugMap: Record<string, string> = {
      'Início': '/ir3h-store',
      'Créditos': '/categoria/credits',
      'VIP': '/categoria/vip',
      'AP': '/categoria/ap',
      'Rooms': '/categoria/rooms',
      'Nude': '/categoria/nude',
      'Combos': '/categoria/combos',
      'Serviço': '/categoria/service',
    };
    navigate(slugMap[tab] ?? '/ir3h-store');
  };

  return (
    <div className={`app-shell ${isLanding ? 'app-shell--landing' : ''} ${isAdmin ? 'app-shell--admin' : ''}`}>

      {/* ── Store chrome (hidden on landing and admin) ─────────── */}
      {!isLanding && !isAdmin && <TopBar cartCount={cartCount} />}
      {!isSearch && !isLanding && !isAdmin && <SearchBar />}
      {(isStore || location.pathname.startsWith('/categoria')) && !isAdmin && (
        <NavTabs activeTab={activeNavTab} onChange={handleNavTabChange} />
      )}

      {/* ── Admin routes — rendered outside the scroll container ── */}
      {isAdmin && (
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminDashboard /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/produtos"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminProducts /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vitrines"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminShowcases /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categorias"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminCategories /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banners"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminBanners /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/landing"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminLandingEditor /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminUsers /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/logs"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminLogs /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/configuracoes"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminSettings /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/admin/*" element={<AdminLogin />} />
        </Routes>
      )}

      {/* ── Store routes — inside the scroll container ──────────── */}
      {!isAdmin && (
        <main className="app-scroll" id="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ir3h-store" element={<><PromoBar /><HomePage /></>} />
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
            <Route path="*" element={<LandingPage />} />
          </Routes>
          {/* Spacer for bottom nav */}
          <div style={{ height: 'calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px) + 16px)' }} />
        </main>
      )}

      {/* ── Bottom nav (hidden on admin) ────────────────────────── */}
      {!isAdmin && (
        <BottomNav
          active={activeBottomTab}
          onChange={handleBottomNavChange}
          cartCount={cartCount}
        />
      )}

      {/* Toast notifications */}
      <Toast />
    </div>
  );
}
