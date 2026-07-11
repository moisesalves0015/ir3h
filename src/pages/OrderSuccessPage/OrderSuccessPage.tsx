import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './OrderSuccessPage.css';
import { CheckCircle, Copy, MessageCircle, Home } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { orders } = useApp();
  const orderId = searchParams.get('id') ?? '';
  const order = orders.find(o => o.orderId === orderId);

  useEffect(() => {
    document.title = 'Pedido Confirmado — IR3H Store';
  }, []);

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
    } catch {
      /* fallback — do nothing */
    }
  };

  const reopenWhatsApp = () => {
    if (!order) return;
    let msg = `Olá! Referente ao meu pedido *${orderId}* na IR3H Store. `;
    msg += `Gostaria de verificar o status. Meu Nick: ${order.customerNick}`;
    window.open(
      `https://api.whatsapp.com/send?phone=5527988003025&text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener'
    );
  };

  return (
    <div className="success-page">
      <div className="success-page__icon-wrap">
        <CheckCircle size={48} />
      </div>

      <h1 className="success-page__title">Pedido Registrado! 🎉</h1>

      <div className="success-page__protocol-card">
        <p className="success-page__protocol-label">Seu Protocolo</p>
        <div className="success-page__protocol-id" onClick={copyOrderId} title="Clique para copiar">
          <span>{orderId || '#IR3H-XXXX'}</span>
          <Copy size={14} />
        </div>
        <p className="success-page__protocol-hint">Guarde este número para acompanhar seu pedido</p>
      </div>

      <div className="success-page__steps">
        <h3 className="success-page__steps-title">O que acontece agora?</h3>
        <div className="success-page__step">
          <span className="success-page__step-num">1</span>
          <div>
            <p className="success-page__step-title">WhatsApp Aberto</p>
            <p className="success-page__step-desc">Você foi redirecionado para o nosso WhatsApp com o pedido completo.</p>
          </div>
        </div>
        <div className="success-page__step">
          <span className="success-page__step-num">2</span>
          <div>
            <p className="success-page__step-title">Pagamento via Pix</p>
            <p className="success-page__step-desc">Nossa equipe enviará a chave Pix para pagamento.</p>
          </div>
        </div>
        <div className="success-page__step">
          <span className="success-page__step-num">3</span>
          <div>
            <p className="success-page__step-title">Entrega Rápida</p>
            <p className="success-page__step-desc">Após confirmar o Pix, entregaremos em minutos no seu nick.</p>
          </div>
        </div>
      </div>

      <div className="success-page__actions">
        <button className="success-page__btn success-page__btn--wa" onClick={reopenWhatsApp}>
          <MessageCircle size={18} />
          Abrir WhatsApp Novamente
        </button>
        <button className="success-page__btn success-page__btn--home" onClick={() => navigate('/')}>
          <Home size={18} />
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}
