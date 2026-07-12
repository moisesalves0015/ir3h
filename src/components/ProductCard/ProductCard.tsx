import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import { Heart, Star, ShoppingCart, Sparkles, Flame, Crown, Lock } from 'lucide-react';
import type { Product } from '../../data/products';
import { useApp } from '../../contexts/AppContext';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'flash';
  onBuy?: (product: Product) => void;
}

const getIncentiveTagline = (p: Product) => {
  switch (p.category) {
    case 'credits': return `⚡ Entrega em ${p.deliveryTime}`;
    case 'vip':     return '👑 Badge VIP Exclusivo';
    case 'ap':      return '🔓 AP Permanente na Conta';
    case 'rooms':   return '🏠 Sala IMVU Personalizada';
    case 'nude':    return '🔒 Entrega Discreta';
    case 'combos':  return '🎁 Melhor Custo-Benefício';
    default:        return '⚡ Entrega Rápida';
  }
};

const getBadgeIcon = (badge: string | undefined) => {
  switch (badge) {
    case 'sale':      return null;
    case 'new':       return <Sparkles size={9} />;
    case 'hot':       return <Flame size={9} />;
    case 'exclusive': return <Crown size={9} />;
    default:          return null;
  }
};

const getBadgeLabel = (product: Product) => {
  if (product.badge === 'sale') return `-${product.discount}% OFF`;
  if (product.badge === 'new') return 'NOVO';
  if (product.badge === 'hot') return 'POPULAR';
  if (product.badge === 'exclusive') return 'EXCLUSIVO';
  return null;
};

export default function ProductCard({ product, variant = 'grid', onBuy }: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useApp();
  const liked = isFavorite(product.id);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTagline(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = () => {
    navigate(`/produto/${product.slug}`);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuy) onBuy(product);
    else navigate(`/produto/${product.slug}`);
  };

  const handleHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const badgeLabel = getBadgeLabel(product);

  return (
    <article
      className={`pcard pcard--${variant}`}
      onClick={handleCardClick}
      role="article"
      aria-label={product.title}
    >
      {/* Image */}
      <div className="pcard__img-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />

        {/* Badge */}
        {badgeLabel && (
          <span
            className={`badge badge--${product.badge === 'exclusive' ? 'hot' : product.badge} pcard__badge`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '3px 6px' }}
            aria-label={badgeLabel}
          >
            {getBadgeIcon(product.badge)}
            <span>{badgeLabel}</span>
          </span>
        )}

        {/* Stock urgency on low stock */}
        {product.stock && product.stock <= 20 && (
          <span className="pcard__stock-badge">
            <Lock size={9} />
            {product.stock} restantes
          </span>
        )}

        {/* Wishlist */}
        <button
          className={`pcard__heart ${liked ? 'pcard__heart--active' : ''}`}
          onClick={handleHeart}
          aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={liked}
        >
          <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
        </button>

        {/* Cart overlay (grid only) */}
        {variant === 'grid' && (
          <button
            className="pcard__cart-btn"
            onClick={handleBuy}
            aria-label={`Comprar ${product.title}`}
          >
            <ShoppingCart size={14} />
            <span>Comprar</span>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="pcard__info">
        <p className="pcard__title">{product.title}</p>

        {/* Price row */}
        <div className="pcard__price-row">
          {product.priceOnRequest ? (
            <span className="pcard__price" style={{ color: 'var(--brand-accent)', fontSize: '12px', textTransform: 'uppercase', fontWeight: '900' }}>Sob Consulta</span>
          ) : (
            <>
              <span className="pcard__price">R${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="pcard__original">R${product.originalPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="pcard__discount-badge">-{product.discount}%</span>
              )}
            </>
          )}
        </div>

        {/* Alternating Footer */}
        <div className="pcard__footer-switch">
          <div className={`pcard__footer-slide ${showTagline ? 'pcard__footer-slide--hidden-up' : 'pcard__footer-slide--visible'}`}>
            <div className="pcard__meta">
              <Star size={10} fill="currentColor" className="pcard__star" />
              <span className="pcard__rating">{product.rating}</span>
              <span className="pcard__sold">{product.sold}+ vendidos</span>
            </div>
          </div>
          <div className={`pcard__footer-slide ${showTagline ? 'pcard__footer-slide--visible' : 'pcard__footer-slide--hidden-down'}`}>
            <div className="pcard__tagline">
              {getIncentiveTagline(product)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
