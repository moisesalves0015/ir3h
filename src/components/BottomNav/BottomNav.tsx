import './BottomNav.css';
import { Home, Grid, ShoppingCart, Heart, User } from 'lucide-react';

interface BottomNavProps {
  active: string;
  onChange: (tab: string) => void;
  cartCount?: number;
}

const tabs = [
  { id: 'home',     label: 'Início',     Icon: Home },
  { id: 'category', label: 'Categorias', Icon: Grid },
  { id: 'cart',     label: 'Carrinho',   Icon: ShoppingCart },
  { id: 'wishlist', label: 'Favoritos',  Icon: Heart },
  { id: 'profile',  label: 'Minha Conta',Icon: User },
];

export default function BottomNav({ active, onChange, cartCount = 3 }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`bottom-nav__item ${active === id ? 'bottom-nav__item--active' : ''}`}
          onClick={() => onChange(id)}
          aria-label={label}
        >
          <div className="bottom-nav__icon-wrap">
            <Icon size={22} strokeWidth={active === id ? 2.5 : 1.8} />
            {id === 'cart' && cartCount > 0 && (
              <span className="bottom-nav__badge">{cartCount > 9 ? '9+' : cartCount}</span>
            )}
          </div>
          <span className="bottom-nav__label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
