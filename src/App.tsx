import './App.css';
import { useState } from 'react';
import { Trash2, Send, CheckCircle, Heart, User, Grid, ShoppingCart, Shield, Zap, MessageSquare } from 'lucide-react';

import TopBar       from './components/TopBar/TopBar';
import SearchBar    from './components/SearchBar/SearchBar';
import NavTabs      from './components/NavTabs/NavTabs';
import PromoBar     from './components/PromoBar/PromoBar';
import HeroBanner   from './components/HeroBanner/HeroBanner';
import CategoryGrid from './components/CategoryGrid/CategoryGrid';
import FlashSale    from './components/FlashSale/FlashSale';
import ProductGrid  from './components/ProductGrid/ProductGrid';
import BottomNav    from './components/BottomNav/BottomNav';
import ProductModal from './components/ProductModal/ProductModal';

import { recommendedProducts, newArrivals } from './data/mockData';
import type { Product } from './data/mockData';
import { navTabs } from './data/mockData';

export interface CartItem {
  cartId: string;
  product: Product;
  deliveryType: string;
  nick: string;
  loginInfo?: string;
  quantity: number;
}

/* ────────────────────────────────────────────────
   Simple placeholder screens for non-home tabs
──────────────────────────────────────────────── */
function PlaceholderScreen({ title, Icon }: { title: string; Icon: React.ComponentType<{ size?: number | string; className?: string; style?: React.CSSProperties }> }) {
  return (
    <div className="placeholder-screen">
      <Icon size={64} style={{ color: 'var(--brand-primary-light)' }} />
      <h2 className="placeholder-screen__title">{title}</h2>
      <p className="placeholder-screen__sub">Em breve...</p>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Main App
──────────────────────────────────────────────── */
export default function App() {
  const [activeNavTab, setActiveNavTab] = useState(navTabs[0]);
  const [activeBottomTab, setActiveBottomTab] = useState('home');

  // Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Guest Checkout States
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsapp, setCustomerWhatsapp] = useState('');
  const [customerNick, setCustomerNick] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');

  // Total cart items count
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Total cart price
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Trigger modal when buy clicked
  const handleBuyClick = (product: Product) => {
    setSelectedProductForModal(product);
  };

  // Add customized item to cart
  const handleConfirmCustomization = (customization: {
    deliveryType: string;
    nick: string;
    loginInfo?: string;
    quantity: number;
  }) => {
    if (!selectedProductForModal) return;

    const newItem: CartItem = {
      cartId: `${selectedProductForModal.id}-${Date.now()}`,
      product: selectedProductForModal,
      deliveryType: customization.deliveryType,
      nick: customization.nick,
      loginInfo: customization.loginInfo,
      quantity: customization.quantity,
    };

    setCart(prev => [...prev, newItem]);
    // Pre-fill checkout nick with last used nick
    setCustomerNick(customization.nick);
    setSelectedProductForModal(null);

    // Prompt user visually
    setActiveBottomTab('cart');
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Trigger guest checkout and WhatsApp redirection
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerWhatsapp.trim() || !customerNick.trim()) {
      alert('Por favor, preencha todos os campos do formulário para registrar seu pedido.');
      return;
    }

    // Generate a random order code (Ex: #IR3H-7492)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `#IR3H-${randomNum}`;
    setLastOrderId(orderId);
    setCheckoutSuccess(true);

    // Build the WhatsApp message
    let messageText = `Olá, gostaria de confirmar meu pedido na *IR3H Store*!\n\n`;
    messageText += `*Pedido:* ${orderId}\n`;
    messageText += `*Cliente:* ${customerName}\n`;
    messageText += `*WhatsApp:* ${customerWhatsapp}\n`;
    messageText += `*Nick no IMVU:* ${customerNick}\n\n`;
    messageText += `*--- PRODUTOS DOS PEDIDO ---*\n`;

    cart.forEach((item, idx) => {
      messageText += `${idx + 1}. ${item.product.title} (x${item.quantity})\n`;
      messageText += `   - Preço: R$ ${(item.product.price * item.quantity).toFixed(2)}\n`;
      messageText += `   - Envio: ${item.deliveryType}\n`;
      if (item.loginInfo) {
        messageText += `   - Login: ${item.loginInfo}\n`;
      }
      messageText += `\n`;
    });

    messageText += `*Total a Pagar:* R$ ${cartTotal.toFixed(2)}\n\n`;
    messageText += `Aguardo as instruções para pagamento via Pix e liberação do pedido.`;

    const encodedMessage = encodeURIComponent(messageText);
    // WhatsApp number for IR3H store
    const whatsappNumber = '5527988003025'; 
    const waLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Clean cart after a short delay so they see success first, then redirect
    setTimeout(() => {
      window.open(waLink, '_blank');
      setCart([]); // Clear cart
    }, 2500);
  };

  const renderMainContent = () => {
    // Bottom nav routing
    if (activeBottomTab === 'wishlist') return <PlaceholderScreen title="Favoritos" Icon={Heart} />;
    if (activeBottomTab === 'profile')  return <PlaceholderScreen title="Minha Conta" Icon={User} />;
    if (activeBottomTab === 'category') return <PlaceholderScreen title="Categorias" Icon={Grid} />;

    if (activeBottomTab === 'cart') {
      if (checkoutSuccess) {
        return (
          <div className="success-screen">
            <div className="success-icon-wrap">
              <CheckCircle size={44} />
            </div>
            <h2 className="success-title">Pedido Registrado!</h2>
            <div className="success-order-id">{lastOrderId}</div>
            <p className="success-message">
              Seu pedido foi registrado no sistema da IR3H. Estamos redirecionando você para o WhatsApp para realizar o pagamento (Pix) e liberação dos seus créditos/VIP.
            </p>
            <button 
              className="success-btn"
              onClick={() => {
                setCheckoutSuccess(false);
                setActiveBottomTab('home');
              }}
            >
              Voltar ao Início
            </button>
          </div>
        );
      }

      return (
        <div className="cart-page">
          <h2 className="cart-title">Meu Carrinho</h2>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={64} style={{ color: 'var(--brand-primary-light)', marginBottom: '8px' }} />
              <h3 className="cart-empty-title">Seu carrinho está vazio</h3>
              <p className="cart-empty-sub">Adicione créditos, VIP ou AP para continuar.</p>
              <button 
                className="cart-checkout-btn" 
                style={{ marginTop: '16px', background: 'var(--brand-primary)' }}
                onClick={() => setActiveBottomTab('home')}
              >
                Ver Produtos
              </button>
            </div>
          ) : (
            <>
              <div className="cart-list">
                {cart.map(item => (
                  <div key={item.cartId} className="cart-item">
                    <img src={item.product.image} alt={item.product.title} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4 className="cart-item-title">{item.product.title}</h4>
                      <div className="cart-item-meta">
                        <span>Envio: <strong>{item.deliveryType}</strong></span>
                        <span>Nick: <strong>{item.nick}</strong></span>
                      </div>
                      <div className="cart-item-price-row">
                        <span className="cart-item-price">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Qtd: {item.quantity}</span>
                      </div>
                    </div>
                    <button 
                      className="cart-item-remove" 
                      onClick={() => handleRemoveCartItem(item.cartId)}
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Guest Checkout Form */}
              <form className="cart-form" onSubmit={handleCheckoutSubmit}>
                <h3 className="cart-form-title">
                  <Send size={18} style={{ color: 'var(--brand-secondary)' }} />
                  Dados do Pedido
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label className="p-modal-label" htmlFor="cust-name">Nome Completo</label>
                    <input 
                      id="cust-name"
                      type="text" 
                      className="p-modal-input" 
                      placeholder="Seu nome" 
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="p-modal-label" htmlFor="cust-phone">WhatsApp</label>
                    <input 
                      id="cust-phone"
                      type="tel" 
                      className="p-modal-input" 
                      placeholder="Ex: (11) 99999-9999" 
                      required
                      value={customerWhatsapp}
                      onChange={e => setCustomerWhatsapp(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="p-modal-label" htmlFor="cust-nick">Nick do IMVU (Avatar Name)</label>
                    <input 
                      id="cust-nick"
                      type="text" 
                      className="p-modal-input" 
                      placeholder="Ex: PedroGamer123" 
                      required
                      value={customerNick}
                      onChange={e => setCustomerNick(e.target.value)}
                    />
                  </div>
                </div>
              </form>

              {/* Summary */}
              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Envio</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>Grátis (Digital)</span>
                </div>
                <div className="cart-summary-row total">
                  <span>Total</span>
                  <span className="cart-summary-total-price">R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="cart-checkout-btn" onClick={handleCheckoutSubmit}>
                Registrar Pedido & Pagar via WhatsApp
              </button>
            </>
          )}

          {/* Bottom spacer for BottomNav */}
          <div style={{ height: 'calc(var(--bottom-nav-h) + 16px)' }} />
        </div>
      );
    }

    // Home feed
    return (
      <main className="main-feed" id="home-feed">
        <PromoBar />
        <HeroBanner />
        <CategoryGrid />
        <FlashSale onBuy={handleBuyClick} />

        {/* Promo banner strip */}
        <div className="promo-strip">
          <div className="promo-strip__card" style={{ background: 'linear-gradient(135deg,#7c3aed,#c084fc)' }}>
            <Zap size={24} style={{ color: '#ffffff', flexShrink: 0 }} />
            <div>
              <p className="promo-strip__title">Envio Rápido</p>
              <p className="promo-strip__sub">Ativação em até 10 minutos</p>
            </div>
          </div>
          <div className="promo-strip__card" style={{ background: 'linear-gradient(135deg,#db2777,#ff8fa3)' }}>
            <Shield size={24} style={{ color: '#ffffff', flexShrink: 0 }} />
            <div>
              <p className="promo-strip__title">100% Seguro</p>
              <p className="promo-strip__sub">Métodos oficiais autorizados</p>
            </div>
          </div>
        </div>

        <ProductGrid title="Mais Vendidos" products={newArrivals} onBuy={handleBuyClick} />

        {/* Support banner */}
        <div className="app-banner">
          <div className="app-banner__content">
            <MessageSquare size={28} style={{ color: '#ffffff', flexShrink: 0 }} />
            <div>
              <p className="app-banner__title">Precisa de Ajuda?</p>
              <p className="app-banner__sub">Fale conosco pelo WhatsApp se tiver dúvidas.</p>
            </div>
          </div>
           <button 
            className="app-banner__btn"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5527988003025&text=Olá,%20tenho%20uma%20dúvida%20sobre%20os%20créditos%20IMVU.', '_blank')}
          >
            Suporte
          </button>
        </div>

        <ProductGrid title="Recomendados Para Você" products={recommendedProducts} onBuy={handleBuyClick} />

        {/* Bottom spacer for BottomNav */}
        <div style={{ height: 'calc(var(--bottom-nav-h) + 16px)' }} />
      </main>
    );
  };

  return (
    <div className="app-shell">
      {/* Sticky header stack */}
      <TopBar cartCount={cartCount} />
      <SearchBar />
      {activeBottomTab === 'home' && (
        <NavTabs activeTab={activeNavTab} onChange={setActiveNavTab} />
      )}

      {/* Page content */}
      <div className="app-scroll">
        {renderMainContent()}
      </div>

      {/* Fixed bottom navigation */}
      <BottomNav
        active={activeBottomTab}
        onChange={tab => { 
          // Reset checkout success state when leaving cart
          if (tab !== 'cart') {
            setCheckoutSuccess(false);
          }
          setActiveBottomTab(tab); 
        }}
        cartCount={cartCount}
      />

      {/* Customization modal */}
      {selectedProductForModal && (
        <ProductModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onConfirm={handleConfirmCustomization}
        />
      )}
    </div>
  );
}
