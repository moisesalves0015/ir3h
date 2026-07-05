import { useState, useEffect } from 'react';
import './ProductCard.css';
import { Heart, Star, ShoppingCart, Sparkles, Flame } from 'lucide-react';
import type { Product } from '../../data/mockData';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'flash';
  onBuy?: (product: Product) => void;
}

const getIncentiveTagline = (category: string) => {
  switch (category) {
    case 'credits': return '⚡ Envio Direto ou Presente';
    case 'vip':     return '👑 VIP Oficial';
    case 'ap':      return '🔞 AP Sem Senha';
    case 'rooms':   return '🏠 Salas IMVU';
    case 'nude':    return '🔒 100% Discreto';
    case 'combos':  return '🎁 Super Desconto';
    default:        return '⚡ Envio Imediato';
  }
};

export default function ProductCard({ product, variant = 'grid', onBuy }: ProductCardProps) {
  const [liked, setLiked] = useState(product.isFavorite ?? false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTagline(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuy) {
      onBuy(product);
    }
  };

  return (
    <div className={`pcard pcard--${variant}`} onClick={handleBuy} style={{ cursor: 'pointer' }}>
      {/* Image */}
      <div className="pcard__img-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />

        {/* Badge */}
        {product.badge && (
          <span className={`badge badge--${product.badge} pcard__badge`} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '3px 6px' }}>
            {product.badge === 'sale' && `-${product.discount}% OFF`}
            {product.badge === 'new' && (
              <>
                <Sparkles size={9} />
                <span>NOVO</span>
              </>
            )}
            {product.badge === 'hot' && (
              <>
                <Flame size={9} />
                <span>POPULAR</span>
              </>
            )}
          </span>
        )}

        {/* Wishlist */}
        <button
          className={`pcard__heart ${liked ? 'pcard__heart--active' : ''}`}
          onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
          aria-label="Favoritar"
        >
          <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
        </button>

        {/* Cart overlay (grid only) */}
        {variant === 'grid' && (
          <button
            className="pcard__cart-btn"
            onClick={handleBuy}
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={14} />
            <span>Comprar</span>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="pcard__info">
        <p className="pcard__title">{product.title}</p>

        {/* Colors */}
        {product.colors && variant === 'grid' && (
          <div className="pcard__colors">
            {product.colors.map(c => (
              <span key={c} className="pcard__color-dot" style={{ background: c }} />
            ))}
            {product.colors.length > 4 && (
              <span className="pcard__colors-more">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Price row */}
        <div className="pcard__price-row">
          <span className="pcard__price">R${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="pcard__original">R${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Alternating Footer (Rating/Sold OR Tagline) with Slide-Fade Transition */}
        <div className="pcard__footer-switch">
          {/* Slide 1: Rating + Sold */}
          <div className={`pcard__footer-slide ${showTagline ? 'pcard__footer-slide--hidden-up' : 'pcard__footer-slide--visible'}`}>
            <div className="pcard__meta">
              <Star size={10} fill="currentColor" className="pcard__star" />
              <span className="pcard__rating">{product.rating}</span>
              <span className="pcard__sold">{product.sold}+ vendidos</span>
            </div>
          </div>
          {/* Slide 2: Tagline */}
          <div className={`pcard__footer-slide ${showTagline ? 'pcard__footer-slide--visible' : 'pcard__footer-slide--hidden-down'}`}>
            <div className="pcard__tagline" style={{ fontSize: '10px', color: 'var(--brand-primary-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
              {getIncentiveTagline(product.category)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
