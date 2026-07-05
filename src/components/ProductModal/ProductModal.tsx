import { useState } from 'react';
import './ProductModal.css';
import { X, ShieldCheck, Gift, ArrowRightLeft, Key } from 'lucide-react';
import type { Product } from '../../data/mockData';

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
  const [deliveryType, setDeliveryType] = useState('gift');
  const [nick, setNick] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  // Determine allowed delivery types based on product category
  const isAPOrVIP = product.category === 'ap' || product.category === 'vip';

  const handleConfirm = () => {
    if (!nick.trim()) {
      setError('Por favor, informe seu Nick do IMVU (Avatar Name).');
      return;
    }
    if (deliveryType === 'login' && (!loginEmail.trim() || !loginPassword.trim())) {
      setError('Por favor, preencha o E-mail e Senha para ativação via Login.');
      return;
    }

    onConfirm({
      deliveryType: deliveryType === 'gift' ? 'Presente (Gift)' : deliveryType === 'transfer' ? 'Transferência' : 'Login de Conta',
      nick: nick.trim(),
      loginInfo: deliveryType === 'login' ? `E-mail: ${loginEmail} | Senha: ${loginPassword}` : undefined,
      quantity,
    });
  };

  return (
    <div className="p-modal-overlay" onClick={onClose}>
      <div className="p-modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-modal-header">
          <h3>Customizar Envio</h3>
          <button className="p-modal-close" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        {/* Product Brief */}
        <div className="p-modal-product">
          <img src={product.image} alt={product.title} className="p-modal-product-img" />
          <div className="p-modal-product-info">
            <h4 className="p-modal-product-title">{product.title}</h4>
            <span className="p-modal-product-price">R$ {product.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Body Scroll */}
        <div className="p-modal-body">
          {/* Quantity */}
          <div className="p-modal-section">
            <label className="p-modal-label">Quantidade</label>
            <div className="p-modal-qty-selector">
              <button 
                type="button" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                type="button" 
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Delivery Type */}
          <div className="p-modal-section">
            <label className="p-modal-label">Tipo de Envio</label>
            <div className="p-modal-options">
              {/* Gift */}
              <button
                type="button"
                className={`p-modal-opt-card ${deliveryType === 'gift' ? 'active' : ''}`}
                onClick={() => { setDeliveryType('gift'); setError(''); }}
              >
                <Gift size={20} className="p-modal-opt-icon" />
                <div className="p-modal-opt-details">
                  <span className="p-modal-opt-title">Envio por Presente (Gift)</span>
                  <span className="p-modal-opt-sub">Mais seguro. Enviado como presente no jogo.</span>
                </div>
              </button>

              {/* Transfer (only for credits/combos, not AP/VIP directly) */}
              {!isAPOrVIP && (
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

              {/* Login Activation */}
              <button
                type="button"
                className={`p-modal-opt-card ${deliveryType === 'login' ? 'active' : ''}`}
                onClick={() => { setDeliveryType('login'); setError(''); }}
              >
                <Key size={20} className="p-modal-opt-icon" />
                <div className="p-modal-opt-details">
                  <span className="p-modal-opt-title">Ativação via Login</span>
                  <span className="p-modal-opt-sub">Necessário para ativações oficiais de AP/VIP.</span>
                </div>
              </button>
            </div>
          </div>

          {/* Avatar Name */}
          <div className="p-modal-section">
            <label className="p-modal-label" htmlFor="nick-input">Nick no Jogo (Avatar Name)</label>
            <input
              id="nick-input"
              type="text"
              placeholder="Ex: PedroGamer123"
              className="p-modal-input"
              value={nick}
              onChange={e => { setNick(e.target.value); setError(''); }}
            />
            <span className="p-modal-tip">Atenção: Verifique a ortografia do seu Nick para não haver erros no envio.</span>
          </div>

          {/* Login Fields if Login Type */}
          {deliveryType === 'login' && (
            <div className="p-modal-section fade-in">
              <label className="p-modal-label">Dados para Login Temporário</label>
              <input
                type="text"
                placeholder="E-mail ou Usuário do IMVU"
                className="p-modal-input"
                style={{ marginBottom: '8px' }}
                value={loginEmail}
                onChange={e => { setLoginEmail(e.target.value); setError(''); }}
              />
              <input
                type="password"
                placeholder="Senha da Conta"
                className="p-modal-input"
                value={loginPassword}
                onChange={e => { setLoginPassword(e.target.value); setError(''); }}
              />
              <span className="p-modal-tip warning">
                🔒 Suas informações são protegidas e usadas apenas para ativar o produto. Altere sua senha após a conclusão.
              </span>
            </div>
          )}

          {error && <p className="p-modal-error">{error}</p>}
        </div>

        {/* Footer */}
        <div className="p-modal-footer">
          <div className="p-modal-total">
            <span className="p-modal-total-lbl">Total</span>
            <span className="p-modal-total-price">R$ {(product.price * quantity).toFixed(2)}</span>
          </div>
          <button className="p-modal-btn-confirm" onClick={handleConfirm}>
            <ShieldCheck size={18} />
            Confirmar e Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
