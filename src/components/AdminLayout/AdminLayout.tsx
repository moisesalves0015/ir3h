import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import {
  LayoutDashboard,
  Package,
  ListCollapse,
  Images,
  Edit,
  Users,
  Settings,
  History,
  LogOut,
  FolderTree,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import './AdminLayout.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { label: 'Produtos', path: '/admin/produtos', icon: <Package size={18} /> },
    { label: 'Vitrines', path: '/admin/vitrines', icon: <ListCollapse size={18} /> },
    { label: 'Categorias', path: '/admin/categorias', icon: <FolderTree size={18} /> },
    { label: 'Banners', path: '/admin/banners', icon: <Images size={18} /> },
    { label: 'Landing Page', path: '/admin/landing', icon: <Edit size={18} /> },
    { label: 'Usuários', path: '/admin/usuarios', icon: <Users size={18} /> },
    { label: 'Logs & Auditoria', path: '/admin/logs', icon: <History size={18} /> },
    { label: 'Configurações', path: '/admin/configuracoes', icon: <Settings size={18} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Top Navbar for Mobile */}
      <header className="admin-header-mobile">
        <button className="admin-toggle-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="admin-header-mobile__title">IR3H Admin</span>
        <div className="admin-header-mobile__user-badge">💎</div>
      </header>

      {/* Sidebar Layout */}
      <aside className={`admin-sidebar ${isMobileOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__logo">
          <span>IR3H<strong>ADMIN</strong></span>
        </div>

        <div className="admin-sidebar__profile">
          <div className="admin-sidebar__avatar">💎</div>
          <div className="admin-sidebar__profile-info">
            <p className="admin-sidebar__profile-name">{currentUser?.name || 'Administrador'}</p>
            <span className="admin-sidebar__profile-role">Master Admin</span>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-sidebar__nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="admin-sidebar__nav-icon">{item.icon}</span>
                <span className="admin-sidebar__nav-label">{item.label}</span>
                <ChevronRight size={14} className="admin-sidebar__nav-arrow" />
              </Link>
            );
          })}
        </nav>

        <button className="admin-sidebar__logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sair do Painel</span>
        </button>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {isMobileOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Content wrapper */}
      <div className="admin-main">
        <div className="admin-content-container">{children}</div>
      </div>
    </div>
  );
}
