import { useState } from 'react';
import './ProductModal.css';
import { X, ShieldCheck, Gift, ArrowRightLeft, Key, Lock } from 'lucide-react';
import type { Product } from '../../data/products';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onConfirm: (customization: {
    deliveryType: string;
    nick: string;
    loginInfo?: string;
    quantity: number;
  }) => void;
}

export default function ProductModal({ product, onClose, onConfirm }: ProductModalProps) {
  const [deliveryType, setDeliveryType] = useState(
    product.deliveryModes[0] ?? 'gift'
  );
  const [nick, setNick] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const canGift = product.deliveryModes.includes('gift') || product.deliveryModes.includes('gift_or_transfer');
  const canTransfer = product.deliveryModes.includes('transfer') || product.deliveryModes.includes('gift_or_transfer');
  const canLogin = product.deliveryModes.includes('login');

  const deliveryLabel = (type: string) => {
    if (type === 'gift') return 'Presente (Gift)';
    if (type === 'transfer') return 'Transferência Direta';
    if (type === 'login') return 'Ativação via Login';
    return type;
  };

  const handleConfirm = () => {
    const nickTrimmed = nick.trim().replace(/[<>"'`]/g, '').slice(0, 50);
    if (!nickTrimmed) {
      setError('Por favor, informe seu Nick do IMVU (Avatar Name).');
      return;
    }
    if (deliveryType === 'login' && (!loginEmail.trim() || !loginPassword.trim())) {
      setError('Preencha o E-mail e Senha para ativação via Login.');
      return;
    }
    onConfirm({
      deliveryType: deliveryLabel(deliveryType),
      nick: nickTrimmed,
      loginInfo: deliveryType === 'login'
        ? `E-mail: ${loginEmail.trim()} | Senha: ${loginPassword}`
        : undefined,
      quantity,
    });
  };

  return (
    <div
      className="p-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Personalizar envio"
    >
      <div className="p-modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-modal-header">
          <h3>Personalizar Envio</h3>
          <button className="p-modal-close" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        {/* Product Brief */}
        <div className="p-modal-product">
          <img src={product.image} alt={product.title} className="p-modal-product-img" />
          <div className="p-modal-product-info">
            <h4 className="p-modal-product-title">{product.title}</h4>
            <span className="p-modal-product-price">
              {product.priceOnRequest ? 'Sob Consulta' : `R$ ${product.price.toFixed(2)}`}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-modal-body">
          {/* Quantity */}
          <div className="p-modal-section">
            <label className="p-modal-label">Quantidade</label>
            <div className="p-modal-qty-selector">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Diminuir quantidade"
              >-</button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Aumentar quantidade"
              >+</button>
            </div>
          </div>

          {/* Delivery Type */}
          <div className="p-modal-section">
            <label className="p-modal-label">Tipo de Envio</label>
            <div className="p-modal-options">
              {canGift && (
                <button
                  type="button"
                  className={`p-modal-opt-card ${deliveryType === 'gift' ? 'active' : ''}`}
                  onClick={() => { setDeliveryType('gift'); setError(''); }}
                >
                  <Gift size={20} className="p-modal-opt-icon" />
                  <div className="p-modal-opt-details">
                    <span className="p-modal-opt-title">Envio por Presente (Gift)</span>
                    <span className="p-modal-opt-sub">Mais seguro. Sem precisar de senha.</span>
                  </div>
                </button>
              )}
              {canTransfer && (
                <button
                  type="button"
                  className={`p-modal-opt-card ${deliveryType === 'transfer' ? 'active' : ''}`}
                  onClick={() => { setDeliveryType('transfer'); setError(''); }}
                >
                  <ArrowRightLeft size={20} className="p-modal-opt-icon" />
                  <div className="p-modal-opt-details">
                    <span className="p-modal-opt-title">Transferência Direta</span>
                    <span className="p-modal-opt-sub">Transferência de créditos segura.</span>
                  </div>
                </button>
              )}
              {canLogin && (
                <button
                  type="button"
                  className={`p-modal-opt-card ${deliveryType === 'login' ? 'active' : ''}`}
                  onClick={() => { setDeliveryType('login'); setError(''); }}
                >
                  <Key size={20} className="p-modal-opt-icon" />
                  <div className="p-modal-opt-details">
                    <span className="p-modal-opt-title">Ativação via Login</span>
                    <span className="p-modal-opt-sub">Para ativações de VIP/AP com segurança.</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Avatar Name */}
          <div className="p-modal-section">
            <label className="p-modal-label" htmlFor="nick-input">Nick no IMVU (Avatar Name)</label>
            <input
              id="nick-input"
              type="text"
              placeholder="Ex: PedroGamer123"
              className="p-modal-input"
              value={nick}
              maxLength={50}
              onChange={e => { setNick(e.target.value); setError(''); }}
              autoCapitalize="none"
              autoCorrect="off"
            />
            <span className="p-modal-tip">⚠️ Verifique a ortografia do seu Nick para evitar erros no envio.</span>
          </div>

          {/* Login Fields */}
          {deliveryType === 'login' && (
            <div className="p-modal-section fade-in">
              <label className="p-modal-label">Dados para Login Temporário</label>
              <input
                type="email"
                placeholder="E-mail da conta IMVU"
                className="p-modal-input"
                style={{ marginBottom: '8px' }}
                value={loginEmail}
                onChange={e => { setLoginEmail(e.target.value); setError(''); }}
                autoComplete="off"
              />
              <input
                type="password"
                placeholder="Senha da Conta"
                className="p-modal-input"
                value={loginPassword}
                onChange={e => { setLoginPassword(e.target.value); setError(''); }}
                autoComplete="new-password"
              />
              <span className="p-modal-tip warning">
                <Lock size={11} style={{ display: 'inline', marginRight: '4px' }} />
                Suas informações são usadas exclusivamente para ativação. Altere sua senha após a conclusão.
              </span>
            </div>
          )}

          {error && <p className="p-modal-error" role="alert">{error}</p>}
        </div>

        {/* Footer */}
        <div className="p-modal-footer">
          <div className="p-modal-total">
            <span className="p-modal-total-lbl">Total</span>
            <span className="p-modal-total-price">
              {product.priceOnRequest ? 'Sob Consulta' : `R$ ${(product.price * quantity).toFixed(2)}`}
            </span>
          </div>
          <button className="p-modal-btn-confirm" onClick={handleConfirm}>
            <ShieldCheck size={18} />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
