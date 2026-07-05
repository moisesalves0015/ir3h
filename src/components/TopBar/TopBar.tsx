import './TopBar.css';
import { Search, ShoppingCart, Bell, MessageCircle, Gem } from 'lucide-react';

interface TopBarProps {
  cartCount?: number;
}

export default function TopBar({ cartCount = 3 }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar__logo" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span className="topbar__logo-text">IR3H</span>
        <Gem size={18} style={{ color: 'var(--brand-accent)' }} />
      </div>

      <div className="topbar__actions">
        <button className="topbar__icon-btn" aria-label="Buscar">
          <Search size={20} />
        </button>
        <button className="topbar__icon-btn" aria-label="Mensagens">
          <MessageCircle size={20} />
        </button>
        <button className="topbar__icon-btn" aria-label="Notificações">
          <Bell size={20} />
        </button>
        <button className="topbar__icon-btn topbar__cart" aria-label="Carrinho">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="topbar__badge">{cartCount > 9 ? '9+' : cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
