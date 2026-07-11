import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './ProfilePage.css';
import { Package, MessageCircle, HelpCircle, Info, FileText, ChevronRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { orders } = useApp();

  useEffect(() => {
    document.title = 'Minha Conta — IR3H Store';
  }, []);

  const reopenOrder = (orderId: string, nick: string) => {
    const msg = `Olá! Gostaria de verificar o status do pedido *${orderId}*. Nick: ${nick}`;
    window.open(
      `https://api.whatsapp.com/send?phone=5527988003025&text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener'
    );
  };

  const menuItems = [
    { icon: <HelpCircle size={20} />, label: 'Perguntas Frequentes', path: '/faq' },
    { icon: <Info size={20} />, label: 'Sobre a IR3H Store', path: '/sobre' },
    { icon: <MessageCircle size={20} />, label: 'Falar no WhatsApp', action: () => window.open('https://api.whatsapp.com/send?phone=5527988003025&text=Olá, preciso de ajuda!', '_blank', 'noopener') },
    { icon: <FileText size={20} />, label: 'Política de Privacidade', path: '/privacidade' },
    { icon: <FileText size={20} />, label: 'Termos de Uso', path: '/termos' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-page__hero">
        <div className="profile-page__avatar">💎</div>
        <div>
          <h1 className="profile-page__name">IR3H Store</h1>
          <p className="profile-page__tagline">Créditos IMVU com Entrega Rápida</p>
        </div>
      </div>

      {/* Order history */}
      <div className="profile-page__section">
        <h2 className="profile-page__section-title">
          <Package size={16} />
          Meus Pedidos
        </h2>

        {orders.length === 0 ? (
          <div className="profile-page__no-orders">
            <ShoppingBag size={40} style={{ opacity: 0.3 }} />
            <p>Você ainda não realizou nenhum pedido.</p>
            <button className="profile-page__shop-btn" onClick={() => navigate('/')}>
              Explorar Produtos
            </button>
          </div>
        ) : (
          <div className="profile-page__orders">
            {orders.map(order => {
              const date = new Date(order.timestamp);
              const dateStr = date.toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              });
              return (
                <div key={order.orderId} className="profile-order-card">
                  <div className="profile-order-card__header">
                    <span className="profile-order-card__id">{order.orderId}</span>
                    <span className={`profile-order-card__status profile-order-card__status--${order.status}`}>
                      {order.status === 'pending' ? 'Aguardando' : order.status === 'confirmed' ? 'Confirmado' : 'Entregue'}
                    </span>
                  </div>
                  <p className="profile-order-card__date">{dateStr}</p>
                  <p className="profile-order-card__nick">Nick: {order.customerNick}</p>
                  <div className="profile-order-card__products">
                    {order.items.map(item => (
                      <span key={item.cartId} className="profile-order-card__product">
                        {item.product.title} (x{item.quantity})
                      </span>
                    ))}
                  </div>
                  <div className="profile-order-card__footer">
                    <span className="profile-order-card__total">R$ {order.total.toFixed(2)}</span>
                    <button
                      className="profile-order-card__wa-btn"
                      onClick={() => reopenOrder(order.orderId, order.customerNick)}
                    >
                      <MessageCircle size={14} />
                      Contato WhatsApp
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="profile-page__menu">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="profile-page__menu-item"
            onClick={item.action ?? (() => navigate(item.path!))}
          >
            <span className="profile-page__menu-icon">{item.icon}</span>
            <span className="profile-page__menu-label">{item.label}</span>
            <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
          </button>
        ))}
      </div>

      <p className="profile-page__version">IR3H Store © 2025 — v1.0</p>
    </div>
  );
}
