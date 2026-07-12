import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import { Trash2, Send, ShoppingCart, Shield, Zap, ChevronRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

// Validation utilities
const validateName = (v: string) => v.trim().length >= 3;
const validateWhatsapp = (v: string) => /^\d{10,11}$/.test(v.replace(/\D/g, ''));
const validateNick = (v: string) => v.trim().length >= 2;

const formatPhone = (v: string) => {
  const digits = v.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
};

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, placeOrder } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nick, setNick] = useState('');
  const [obs, setObs] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!validateName(name)) e.name = 'Nome deve ter ao menos 3 caracteres.';
    if (!validateWhatsapp(phone)) e.phone = 'WhatsApp inválido. Use apenas números (DDD + número).';
    if (!validateNick(nick)) e.nick = 'Nick inválido. Verifique o nome do seu avatar.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (submitting) return;
    setSubmitting(true);

    const order = placeOrder({
      items: cart,
      customerName: name,
      customerWhatsapp: phone.replace(/\D/g, ''),
      customerNick: nick,
      total: cartTotal,
    });

    // Build WhatsApp message
    const hasService = cart.some(item => item.product.priceOnRequest);
    let msg = `Olá! Quero confirmar meu pedido na *IR3H Store*! 💎\n\n`;
    msg += `*Protocolo:* ${order.orderId}\n`;
    msg += `*Cliente:* ${name}\n`;
    msg += `*WhatsApp:* ${phone}\n`;
    msg += `*Nick no IMVU:* ${nick}\n`;
    if (obs.trim()) msg += `*Observações:* ${obs.trim()}\n`;
    msg += `\n*━━━ PRODUTOS ━━━*\n`;
    cart.forEach((item, idx) => {
      msg += `\n${idx + 1}. *${item.product.title}* (x${item.quantity})\n`;
      msg += `   ↳ Valor: ${item.product.priceOnRequest ? 'Sob Consulta' : `R$ ${(item.product.price * item.quantity).toFixed(2)}`}\n`;
      msg += `   ↳ Envio: ${item.deliveryType}\n`;
      msg += `   ↳ Nick: ${item.nick}\n`;
      if (item.loginInfo) msg += `   ↳ Login: ${item.loginInfo}\n`;
    });
    msg += `\n*Total: R$ ${cartTotal.toFixed(2)}${hasService ? ' + Valor sob Consulta 💬' : ''}*\n\n`;
    msg += `Aguardo as instruções de pagamento${!hasService ? ' via *Pix*' : ' e o orçamento dos serviços'} para liberação do pedido. Obrigado(a)! 🙏`;

    const encoded = encodeURIComponent(msg);
    const waLink = `https://api.whatsapp.com/send?phone=5527988003025&text=${encoded}`;

    setTimeout(() => {
      clearCart();
      window.open(waLink, '_blank', 'noopener');
      navigate(`/pedido-confirmado?id=${encodeURIComponent(order.orderId)}`);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-state">
        <ShoppingCart size={64} style={{ color: 'var(--brand-primary-light)', opacity: 0.5 }} />
        <h2 className="cart-empty-state__title">Seu carrinho está vazio</h2>
        <p className="cart-empty-state__sub">Adicione créditos, VIP, AP ou combos para continuar.</p>
        <button
          className="cart-empty-state__btn"
          onClick={() => navigate('/')}
        >
          Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Meu Carrinho</h1>

      {/* Item list */}
      <div className="cart-list">
        {cart.map(item => (
          <div key={item.cartId} className="cart-item">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <h4 className="cart-item-title">{item.product.title}</h4>
              <div className="cart-item-meta">
                <span>Envio: <strong>{item.deliveryType}</strong></span>
                <span>Nick: <strong>{item.nick}</strong></span>
              </div>
              <div className="cart-item-bottom">
                {/* Qty controls */}
                <div className="cart-item-qty">
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    aria-label="Diminuir quantidade"
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span className="cart-qty-value">{item.quantity}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    aria-label="Aumentar quantidade"
                  >+</button>
                </div>
                <span className="cart-item-price">
                  {item.product.priceOnRequest ? (
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--brand-accent)' }}>Sob Consulta</span>
                  ) : (
                    `R$ ${(item.product.price * item.quantity).toFixed(2)}`
                  )}
                </span>
              </div>
            </div>
            <button
              className="cart-item-remove"
              onClick={() => removeFromCart(item.cartId)}
              aria-label={`Remover ${item.product.title}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* CTA to keep shopping */}
      <button className="cart-keep-shopping" onClick={() => navigate('/')}>
        + Adicionar mais produtos <ChevronRight size={14} />
      </button>

      {/* Guest Checkout Form */}
      <form className="cart-form" onSubmit={handleSubmit} noValidate>
        <h3 className="cart-form-title">
          <Send size={16} style={{ color: 'var(--brand-secondary)' }} />
          Dados para Entrega
        </h3>

        <div className="cart-form-fields">
          <div className="cart-field">
            <label htmlFor="cf-name" className="p-modal-label">
              Nome Completo *
            </label>
            <input
              id="cf-name"
              type="text"
              className={`p-modal-input ${errors.name ? 'cart-field--error' : ''}`}
              placeholder="Seu nome completo"
              value={name}
              maxLength={80}
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
              required
              aria-describedby={errors.name ? 'cf-name-err' : undefined}
            />
            {errors.name && <span id="cf-name-err" className="cart-field__error-msg" role="alert">{errors.name}</span>}
          </div>

          <div className="cart-field">
            <label htmlFor="cf-phone" className="p-modal-label">
              WhatsApp (com DDD) *
            </label>
            <input
              id="cf-phone"
              type="tel"
              className={`p-modal-input ${errors.phone ? 'cart-field--error' : ''}`}
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={e => { setPhone(formatPhone(e.target.value)); setErrors(p => ({ ...p, phone: '' })); }}
              required
              maxLength={16}
              aria-describedby={errors.phone ? 'cf-phone-err' : undefined}
            />
            {errors.phone && <span id="cf-phone-err" className="cart-field__error-msg" role="alert">{errors.phone}</span>}
          </div>

          <div className="cart-field">
            <label htmlFor="cf-nick" className="p-modal-label">
              Nick no IMVU (Avatar Name) *
            </label>
            <input
              id="cf-nick"
              type="text"
              className={`p-modal-input ${errors.nick ? 'cart-field--error' : ''}`}
              placeholder="Ex: PedroGamer123"
              value={nick}
              onChange={e => { setNick(e.target.value.replace(/[<>"'`]/g, '')); setErrors(p => ({ ...p, nick: '' })); }}
              required
              maxLength={50}
              autoCapitalize="none"
              autoCorrect="off"
              aria-describedby={errors.nick ? 'cf-nick-err' : undefined}
            />
            {errors.nick && <span id="cf-nick-err" className="cart-field__error-msg" role="alert">{errors.nick}</span>}
          </div>

          <div className="cart-field">
            <label htmlFor="cf-obs" className="p-modal-label">
              Observações (opcional)
            </label>
            <textarea
              id="cf-obs"
              className="p-modal-input cart-obs"
              placeholder="Alguma instrução especial para o pedido?"
              value={obs}
              onChange={e => setObs(e.target.value.slice(0, 300))}
              rows={2}
            />
          </div>
        </div>
      </form>

      {/* Summary */}
      {(() => {
        const hasService = cart.some(item => item.product.priceOnRequest);
        return (
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>R$ {cartTotal.toFixed(2)}{hasService && ' + Sob Consulta'}</span>
            </div>
            <div className="cart-summary-row">
              <span>Entrega</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>✓ Digital (Grátis)</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <span className="cart-summary-total-price">
                R$ {cartTotal.toFixed(2)}{hasService && ' + Sob Consulta'}
              </span>
            </div>
          </div>
        );
      })()}

      {/* Trust signals */}
      <div className="cart-trust">
        <div className="cart-trust-item">
          <Shield size={14} style={{ color: '#10b981' }} />
          <span>Pagamento seguro via Pix</span>
        </div>
        <div className="cart-trust-item">
          <Zap size={14} style={{ color: 'var(--brand-accent)' }} />
          <span>Entrega em minutos após Pix</span>
        </div>
      </div>

      {/* Submit */}
      <button
        className="cart-checkout-btn"
        onClick={handleSubmit}
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? (
          'Registrando pedido...'
        ) : (
          <>
            <span>Registrar Pedido & Pagar via WhatsApp</span>
            <span style={{ fontSize: '18px' }}>📲</span>
          </>
        )}
      </button>
    </div>
  );
}
