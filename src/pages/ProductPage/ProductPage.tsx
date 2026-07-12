import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductPage.css';
import {
  ChevronLeft, Heart, ShoppingCart, MessageCircle,
  Star, Shield, Zap, CheckCircle, Clock, Users,
  ChevronDown, ChevronUp, Lock, Crown, Gem, Package
} from 'lucide-react';
import { getProductBySlug, getRelated } from '../../data/products';
import { useApp } from '../../contexts/AppContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';

const DELIVERY_MODE_LABELS: Record<string, string> = {
  gift: '🎁 Presente (Gift)',
  transfer: '🔄 Transferência Direta',
  login: '🔑 Ativação via Login',
  gift_or_transfer: '🎁 Gift ou Transferência',
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, addToCart } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const [showAllReqs, setShowAllReqs] = useState(false);
  const [activeReview, setActiveReview] = useState(0);

  const product = slug ? getProductBySlug(slug) : undefined;

  useEffect(() => {
    if (product) {
      document.title = `${product.title} — IR3H Store`;
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="product-page__not-found">
        <Package size={56} style={{ color: 'var(--text-muted)' }} />
        <h2>Produto não encontrado</h2>
        <p>O produto que você buscou não existe ou foi removido.</p>
        <button onClick={() => navigate('/')} className="product-page__btn product-page__btn--primary">
          Voltar ao Início
        </button>
      </div>
    );
  }

  const liked = isFavorite(product.id);
  const related = getRelated(product, 4);
  const visibleBenefits = showAllBenefits ? product.benefits : product.benefits.slice(0, 3);
  const visibleReqs = product.requirements
    ? (showAllReqs ? product.requirements : product.requirements.slice(0, 2))
    : [];

  const handleConfirmCustomization = (customization: {
    deliveryType: string; nick: string; loginInfo?: string; quantity: number;
  }) => {
    addToCart({
      product,
      deliveryType: customization.deliveryType,
      nick: customization.nick,
      loginInfo: customization.loginInfo,
      quantity: customization.quantity,
    });
    setModalOpen(false);
    navigate('/carrinho');
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating));

  return (
    <div className="product-page">
      {/* Back header */}
      <div className="product-page__topbar">
        <button className="product-page__back" onClick={() => navigate(-1)} aria-label="Voltar">
          <ChevronLeft size={20} />
        </button>
        <h1 className="product-page__topbar-title">Detalhes do Produto</h1>
        <button
          className={`product-page__fav ${liked ? 'product-page__fav--active' : ''}`}
          onClick={() => toggleFavorite(product.id)}
          aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={liked}
        >
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Hero image */}
      <div className="product-page__img-wrap">
        <img src={product.image} alt={product.title} />
        {product.badge && (
          <span className={`product-page__badge badge badge--${product.badge === 'exclusive' ? 'hot' : product.badge}`}>
            {product.badge === 'sale' ? `-${product.discount}% OFF` :
             product.badge === 'new' ? '✨ NOVO' :
             product.badge === 'hot' ? '🔥 POPULAR' : '⭐ EXCLUSIVO'}
          </span>
        )}
        {product.stock && product.stock <= 20 && (
          <div className="product-page__stock-warning">
            <Lock size={12} />
            Apenas {product.stock} unidades disponíveis
          </div>
        )}
      </div>

      {/* Main info */}
      <div className="product-page__info">
        {/* Category & delivery time */}
        <div className="product-page__meta-row">
          <span className="product-page__category">
            {product.category === 'credits' && <Gem size={13} />}
            {product.category === 'vip' && <Crown size={13} />}
            {product.category === 'ap' && <Lock size={13} />}
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
          <span className="product-page__delivery-time">
            <Zap size={12} />
            {product.deliveryTime}
          </span>
        </div>

        <h2 className="product-page__title">{product.title}</h2>
        <p className="product-page__short-desc">{product.shortDescription}</p>

        {/* Rating row */}
        <div className="product-page__rating-row">
          <div className="product-page__stars" aria-label={`Avaliação: ${product.rating} de 5 estrelas`}>
            {stars.map((filled, i) => (
              <Star key={i} size={14} fill={filled ? 'currentColor' : 'none'} className="product-page__star" />
            ))}
            <span className="product-page__rating-value">{product.rating}</span>
          </div>
          <span className="product-page__reviews">{product.reviews} avaliações</span>
          <span className="product-page__sold">
            <Users size={12} /> {product.sold}+ vendidos
          </span>
        </div>

        {/* Price */}
        <div className="product-page__price-section">
          {product.priceOnRequest ? (
            <div className="product-page__price-row">
              <span className="product-page__price" style={{ color: 'var(--brand-accent)' }}>Sob Consulta</span>
            </div>
          ) : (
            <>
              <div className="product-page__price-row">
                <span className="product-page__price">R$ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="product-page__original">R$ {product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              {product.discount && product.originalPrice && (
                <div className="product-page__savings">
                  <CheckCircle size={13} />
                  Você economiza R$ {(product.originalPrice - product.price).toFixed(2)} ({product.discount}% off)
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delivery modes */}
      <div className="product-page__section">
        <h3 className="product-page__section-title">Formas de Entrega</h3>
        <div className="product-page__delivery-modes">
          {product.deliveryModes.map(mode => (
            <div key={mode} className="product-page__delivery-mode">
              {DELIVERY_MODE_LABELS[mode]}
            </div>
          ))}
          <div className="product-page__delivery-mode product-page__delivery-mode--time">
            <Clock size={14} />
            Entrega em {product.deliveryTime}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="product-page__section">
        <h3 className="product-page__section-title">Sobre o Produto</h3>
        <p className="product-page__long-desc">{product.longDescription}</p>
      </div>

      {/* Benefits */}
      <div className="product-page__section">
        <h3 className="product-page__section-title">O que está incluído</h3>
        <ul className="product-page__benefits">
          {visibleBenefits.map((b, i) => (
            <li key={i} className="product-page__benefit">
              <span className="product-page__benefit-icon">{b.icon}</span>
              <span>{b.text}</span>
            </li>
          ))}
        </ul>
        {product.benefits.length > 3 && (
          <button
            className="product-page__show-more"
            onClick={() => setShowAllBenefits(s => !s)}
          >
            {showAllBenefits ? <><ChevronUp size={14} /> Ver menos</> : <><ChevronDown size={14} /> Ver todos os benefícios</>}
          </button>
        )}
      </div>

      {/* Requirements */}
      {product.requirements && product.requirements.length > 0 && (
        <div className="product-page__section product-page__section--warning">
          <h3 className="product-page__section-title">⚠️ Requisitos</h3>
          <ul className="product-page__requirements">
            {visibleReqs.map((req, i) => (
              <li key={i} className="product-page__requirement">
                <Shield size={12} style={{ flexShrink: 0, color: 'var(--brand-accent)' }} />
                {req}
              </li>
            ))}
          </ul>
          {product.requirements.length > 2 && (
            <button
              className="product-page__show-more"
              onClick={() => setShowAllReqs(s => !s)}
            >
              {showAllReqs ? <><ChevronUp size={14} /> Ver menos</> : <><ChevronDown size={14} /> Ver todos</>}
            </button>
          )}
        </div>
      )}

      {/* Trust badges */}
      <div className="product-page__trust-row">
        <div className="product-page__trust-item">
          <Shield size={18} style={{ color: '#10b981' }} />
          <span>100% Seguro</span>
        </div>
        <div className="product-page__trust-item">
          <Zap size={18} style={{ color: 'var(--brand-accent)' }} />
          <span>Entrega Rápida</span>
        </div>
        <div className="product-page__trust-item">
          <MessageCircle size={18} style={{ color: '#25d366' }} />
          <span>Suporte WhatsApp</span>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews_data.length > 0 && (
        <div className="product-page__section">
          <h3 className="product-page__section-title">Avaliações dos Clientes</h3>
          <div className="product-page__reviews-list">
            {product.reviews_data.map((rev, i) => (
              <div
                key={i}
                className={`product-page__review ${i === activeReview ? 'product-page__review--active' : ''}`}
                onClick={() => setActiveReview(i)}
              >
                <div className="product-page__review-header">
                  <span className="product-page__review-avatar">{rev.avatar}</span>
                  <div className="product-page__review-meta">
                    <span className="product-page__review-author">{rev.author}</span>
                    <div className="product-page__review-stars">
                      {Array.from({ length: rev.rating }, (_, si) => (
                        <Star key={si} size={10} fill="currentColor" style={{ color: 'var(--brand-accent)' }} />
                      ))}
                    </div>
                  </div>
                  <span className="product-page__review-date">{rev.date}</span>
                </div>
                <p className="product-page__review-text">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <div className="product-page__section">
          <h3 className="product-page__section-title">Produtos Relacionados</h3>
          <div className="pgrid pgrid--col2">
            {related.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} variant="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Sticky CTA */}
      <div className="product-page__sticky-cta">
        <div className="product-page__sticky-price">
          <span className="product-page__sticky-label">Total</span>
          <span className="product-page__sticky-value">
            {product.priceOnRequest ? 'Sob Consulta' : `R$ ${product.price.toFixed(2)}`}
          </span>
        </div>
        <button
          className="product-page__buy-btn"
          onClick={() => setModalOpen(true)}
          aria-label={`Comprar ${product.title}`}
        >
          <ShoppingCart size={18} />
          Comprar Agora
        </button>
      </div>

      {/* Product customization modal */}
      {modalOpen && (
        <ProductModal
          product={product}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmCustomization}
        />
      )}
    </div>
  );
}
