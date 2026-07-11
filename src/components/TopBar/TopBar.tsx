import './TopBar.css';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Gem, Search } from 'lucide-react';

interface TopBarProps {
  cartCount?: number;
}

export default function TopBar({ cartCount = 0 }: TopBarProps) {
  const navigate = useNavigate();
  const WA_NUMBER = '5527988003025';
  const WA_URL = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=Olá! Quero tirar uma dúvida sobre os produtos da IR3H Store.`;

  return (
    <header className="topbar" role="banner">
      <button
        className="topbar__logo"
        onClick={() => navigate('/')}
        aria-label="IR3H Store — Página inicial"
      >
        <span className="topbar__logo-text">IR3H</span>
        <Gem size={16} style={{ color: 'var(--brand-accent)' }} />
      </button>

      <div className="topbar__actions">
        <button
          className="topbar__icon-btn"
          aria-label="Buscar produtos"
          onClick={() => navigate('/busca')}
        >
          <Search size={20} />
        </button>

        <button
          className="topbar__icon-btn topbar__whatsapp"
          aria-label="Falar no WhatsApp"
          onClick={() => window.open(WA_URL, '_blank', 'noopener')}
        >
          <MessageCircle size={20} />
        </button>

        <button
          className="topbar__icon-btn topbar__cart"
          aria-label={`Carrinho com ${cartCount} itens`}
          onClick={() => navigate('/carrinho')}
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="topbar__badge" aria-hidden="true">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
