import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import FlashSale from '../../components/FlashSale/FlashSale';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { getNewArrivals, getRecommended, getFeatured } from '../../data/products';
import { Zap, Shield, MessageSquare, Star, Users, Package, Award } from 'lucide-react';

const TRUST_STATS = [
  { icon: <Users size={20} />, value: '+2.000', label: 'Clientes ativos' },
  { icon: <Star size={20} />, value: '4.9★', label: 'Avaliação média' },
  { icon: <Package size={20} />, value: '+5.000', label: 'Pedidos entregues' },
  { icon: <Award size={20} />, value: '100%', label: 'Produtos originais' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const newArrivals = getNewArrivals();
  const recommended = getRecommended();
  const featured = getFeatured();

  return (
    <div className="home-page">
      <HeroBanner />
      <CategoryGrid />
      <FlashSale />

      {/* Trust Stats Bar */}
      <div className="trust-stats">
        {TRUST_STATS.map((stat, i) => (
          <div key={i} className="trust-stat">
            <span className="trust-stat__icon">{stat.icon}</span>
            <span className="trust-stat__value">{stat.value}</span>
            <span className="trust-stat__label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Promo strip */}
      <div className="promo-strip" role="list" aria-label="Benefícios da IR3H Store">
        <div className="promo-strip__card" style={{ background: 'linear-gradient(135deg,#7c3aed,#c084fc)' }} role="listitem">
          <Zap size={22} style={{ color: '#ffffff', flexShrink: 0 }} aria-hidden="true" />
          <div>
            <p className="promo-strip__title">Envio em Minutos</p>
            <p className="promo-strip__sub">Ativação em até 15 minutos</p>
          </div>
        </div>
        <div className="promo-strip__card" style={{ background: 'linear-gradient(135deg,#db2777,#ff8fa3)' }} role="listitem">
          <Shield size={22} style={{ color: '#ffffff', flexShrink: 0 }} aria-hidden="true" />
          <div>
            <p className="promo-strip__title">100% Seguro</p>
            <p className="promo-strip__sub">Métodos oficiais IMVU</p>
          </div>
        </div>
      </div>

      <ProductGrid
        title="🔥 Mais Vendidos"
        products={featured.slice(0, 6)}
        viewMoreLink="/categoria"
      />

      {/* First purchase banner */}
      <div className="first-purchase-banner" onClick={() => navigate('/categoria/combos')}>
        <div className="first-purchase-banner__text">
          <span className="first-purchase-banner__tag">🎁 COMBO ESPECIAL</span>
          <h3 className="first-purchase-banner__title">Primeira compra com super desconto!</h3>
          <p className="first-purchase-banner__sub">10k Créditos + VIP Gold por apenas <strong>R$ 34,90</strong></p>
        </div>
        <span className="first-purchase-banner__cta">Ver Oferta →</span>
      </div>

      {/* Support banner */}
      <div className="app-banner">
        <div className="app-banner__content">
          <MessageSquare size={26} style={{ color: '#ffffff', flexShrink: 0 }} aria-hidden="true" />
          <div>
            <p className="app-banner__title">Precisa de Ajuda?</p>
            <p className="app-banner__sub">Fale conosco pelo WhatsApp em tempo real.</p>
          </div>
        </div>
        <button
          className="app-banner__btn"
          onClick={() => window.open(
            'https://api.whatsapp.com/send?phone=5527988003025&text=Olá! Tenho uma dúvida sobre a IR3H Store.',
            '_blank', 'noopener'
          )}
          aria-label="Abrir suporte no WhatsApp"
        >
          Suporte
        </button>
      </div>

      <ProductGrid
        title="✨ Novidades"
        products={newArrivals}
        viewMoreLink="/categoria"
      />

      <ProductGrid
        title="💎 Recomendados Para Você"
        products={recommended.slice(0, 4)}
        viewMoreLink="/categoria"
      />

      {/* Footer links */}
      <div className="home-footer-links">
        <button onClick={() => navigate('/faq')}>FAQ</button>
        <button onClick={() => navigate('/sobre')}>Sobre Nós</button>
        <button onClick={() => navigate('/contato')}>Contato</button>
        <button onClick={() => navigate('/privacidade')}>Privacidade</button>
        <button onClick={() => navigate('/termos')}>Termos</button>
      </div>
    </div>
  );
}
