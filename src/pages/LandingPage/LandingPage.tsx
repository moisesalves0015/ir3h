import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Shield,
  MessageSquare,
  Gift,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Gem
} from 'lucide-react';
import './LandingPage.css';

// Credit simulation data matching real products
const CREDIT_PACKS = [
  { value: '10.000', label: '10k Créditos', price: 'R$ 18,90', originalPrice: 'R$ 27,00', savings: 'Economize 30%', slug: '10k-creditos-imvu' },
  { value: '20.000', label: '20k Créditos', price: 'R$ 36,90', originalPrice: 'R$ 48,00', savings: 'Economize 23%', slug: '20k-creditos-imvu' },
  { value: '50.000', label: '50k Créditos', price: 'R$ 89,90', originalPrice: 'R$ 119,90', savings: 'Economize 25%', slug: '50k-creditos-imvu' },
  { value: '100.000', label: '100k Créditos', price: 'R$ 179,90', originalPrice: 'R$ 220,00', savings: 'Economize 18%', slug: '100k-creditos-imvu' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const handleBuyCredit = () => {
    const pack = CREDIT_PACKS[selectedPackIndex];
    navigate(`/produto/${pack.slug}`);
  };

  const FAQS = [
    {
      q: 'Como os créditos e passes são entregues?',
      a: 'A entrega é realizada via WhatsApp ou diretamente na sua conta IMVU por meio de Presente (Gift) ou Transferência Oficial. Todo o processo leva entre 5 a 15 minutos após a confirmação do pagamento.'
    },
    {
      q: 'Preciso fornecer a senha do meu avatar?',
      a: 'Não! Para a grande maioria dos pacotes de créditos e passes (incluindo AP), nós não solicitamos sua senha. Precisamos apenas do seu Nick (Avatar Name) do IMVU.'
    },
    {
      q: 'Quais são as formas de pagamento aceitas?',
      a: 'Aceitamos Pix (com aprovação e entrega imediata), Cartão de Crédito e Boleto Bancário.'
    },
    {
      q: 'O serviço da IR3H é seguro?',
      a: 'Totalmente seguro. Trabalhamos exclusivamente com métodos oficiais do IMVU, garantindo que sua conta fique 100% protegida contra qualquer tipo de banimento.'
    }
  ];

  return (
    <div className="landing-page">
      {/* Landing Header / Menu */}
      <header className="landing-header">
        <div className="landing-header__brand" onClick={() => navigate('/')}>
          <span>IR3H STORE</span>
          <Gem size={18} style={{ color: 'var(--brand-accent)' }} />
        </div>
        <button
          className="landing-header__btn"
          onClick={() => navigate('/ir3h-store')}
          aria-label="Ir para a loja de vendas"
        >
          Acessar Loja
        </button>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero__container">
          <div className="landing-hero__content">
            <h1 className="landing-hero__title">
              Eleve seu Avatar no IMVU com a <span>IR3H Store</span>
            </h1>
            <p className="landing-hero__desc">
              Adquira Créditos, Passes VIP, AP e Rooms com as melhores taxas do mercado. Envio em minutos, 100% seguro e garantido!
            </p>
            
            <div className="landing-hero__chips">
              <span className="landing-hero__chip">Envio Instantâneo</span>
              <span className="landing-hero__chip">Método Oficial</span>
              <span className="landing-hero__chip">Sem Senha</span>
            </div>

            <div className="landing-hero__actions">
              <button
                className="landing-hero__btn-primary"
                onClick={() => navigate('/ir3h-store')}
              >
                Acessar Loja Completa
              </button>
              <a href="#calculator" className="landing-hero__btn-secondary">
                Simulador de Créditos
              </a>
            </div>
          </div>

          <div className="landing-hero__visual">
            <div className="landing-visual-card">
              <div className="landing-visual-card__glow"></div>
              <div className="landing-visual-card__header">
                <div className="landing-visual-card__user-avatar">💎</div>
                <div className="landing-visual-card__user-info">
                  <p className="landing-visual-card__username">ir3h_vip_pro</p>
                  <span className="landing-visual-card__badge-vip">👑 VIP Diamond</span>
                </div>
                <span className="landing-visual-card__status-dot"></span>
              </div>

              <div className="landing-visual-card__video-container">
                <video
                  src="/hero_video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="landing-visual-card__video"
                />
              </div>

              <div className="landing-visual-card__footer" style={{ marginTop: '12px' }}>
                <div className="landing-visual-card__badge-grid" style={{ flexDirection: 'row', gap: '8px', width: '100%', justifyContent: 'center' }}>
                  <span className="badge-item">🔞 AP OFICIAL</span>
                  <span className="badge-item">⚡ ENTREGA FAST</span>
                  <span className="badge-item">🔒 100% SEGURO</span>
                </div>
              </div>
            </div>

            {/* Floating assets for depth */}
            <div className="floating-gem floating-gem--1">💎</div>
            <div className="floating-gem floating-gem--2">👑</div>
            <div className="floating-gem floating-gem--3">🔞</div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="landing-advantages">
        <div className="landing-advantage-card">
          <div className="landing-advantage-card__icon">
            <Zap size={20} />
          </div>
          <h3 className="landing-advantage-card__title">Entrega Super Rápida</h3>
          <p className="landing-advantage-card__desc">Créditos na sua conta em até 15 minutos.</p>
        </div>
        <div className="landing-advantage-card">
          <div className="landing-advantage-card__icon">
            <Shield size={20} />
          </div>
          <h3 className="landing-advantage-card__title">100% Seguro</h3>
          <p className="landing-advantage-card__desc">Métodos oficiais sem riscos de banimento.</p>
        </div>
        <div className="landing-advantage-card">
          <div className="landing-advantage-card__icon">
            <MessageSquare size={20} />
          </div>
          <h3 className="landing-advantage-card__title">Suporte via WhatsApp</h3>
          <p className="landing-advantage-card__desc">Atendimento humanizado para tirar dúvidas.</p>
        </div>
        <div className="landing-advantage-card">
          <div className="landing-advantage-card__icon">
            <Gift size={20} />
          </div>
          <h3 className="landing-advantage-card__title">Sem Senha</h3>
          <p className="landing-advantage-card__desc">Compre informando apenas o seu Avatar Name.</p>
        </div>
      </section>

      {/* Credits Selector / Calculator Section */}
      <section className="landing-calc" id="calculator">
        <h2 className="landing-calc__title">💵 Simulador de Créditos</h2>
        <p className="landing-calc__subtitle">Selecione o pacote desejado e veja quanto você economiza comprando conosco:</p>

        <div className="landing-calc__tabs">
          {CREDIT_PACKS.map((pack, idx) => (
            <button
              key={idx}
              className={`landing-calc__tab ${selectedPackIndex === idx ? 'landing-calc__tab--active' : ''}`}
              onClick={() => setSelectedPackIndex(idx)}
            >
              {pack.value.split('.')[0]}K
            </button>
          ))}
        </div>

        <div className="landing-calc__box">
          <p className="landing-calc__val">{CREDIT_PACKS[selectedPackIndex].value} Créditos IMVU</p>
          <p className="landing-calc__orig">De: {CREDIT_PACKS[selectedPackIndex].originalPrice}</p>
          <p className="landing-calc__final">{CREDIT_PACKS[selectedPackIndex].price}</p>
          <span className="landing-calc__savings">{CREDIT_PACKS[selectedPackIndex].savings}</span>

          <button
            className="landing-calc__btn"
            onClick={handleBuyCredit}
            aria-label={`Comprar pacote de ${CREDIT_PACKS[selectedPackIndex].value} créditos`}
          >
            ⚡ Garantir com Desconto
          </button>
        </div>
      </section>

      {/* Passes Spotlight Section (VIP & AP) */}
      <section className="landing-passes">
        <h2 className="landing-passes__title">👑 Passes & Assinaturas</h2>
        <p className="landing-passes__subtitle">Desbloqueie todos os recursos e acesse áreas restritas do IMVU:</p>

        <div className="landing-passes-wrapper">
          {/* VIP Card */}
          <div className="landing-pass-card">
            <div className="landing-pass-card__badge">Mais Vendido</div>
            <div className="landing-pass-card__icon">👑</div>
            <h3 className="landing-pass-card__title">IMVU VIP Platinum</h3>
            <p className="landing-pass-card__desc">Torne-se um criador, remova anúncios e ganhe créditos mensais.</p>
            <div className="landing-pass-card__benefits">
              <div className="landing-pass-card__benefit">
                <CheckCircle size={16} className="landing-pass-card__benefit-icon" />
                <span>Ganha créditos todo mês</span>
              </div>
              <div className="landing-pass-card__benefit">
                <CheckCircle size={16} className="landing-pass-card__benefit-icon" />
                <span>Crie suas próprias roupas e salas</span>
              </div>
              <div className="landing-pass-card__benefit">
                <CheckCircle size={16} className="landing-pass-card__benefit-icon" />
                <span>Suporte prioritário do IMVU</span>
              </div>
            </div>
            <div className="landing-pass-card__price-row">
              <span className="landing-pass-card__price">R$ 39,90</span>
              <span className="landing-pass-card__period">/ 1 mês</span>
            </div>
            <button
              className="landing-pass-card__btn landing-pass-card__btn--vip"
              onClick={() => navigate('/produto/vip-platinum-1-mes')}
            >
              Assinar VIP Platinum
            </button>
          </div>

          {/* AP Card */}
          <div className="landing-pass-card landing-pass-card--exclusive">
            <div className="landing-pass-card__icon">🔞</div>
            <h3 className="landing-pass-card__title">Access Pass (AP)</h3>
            <p className="landing-pass-card__desc">Acesso completo para maiores de 18 anos ao catálogo restrito.</p>
            <div className="landing-pass-card__benefits">
              <div className="landing-pass-card__benefit">
                <CheckCircle size={16} className="landing-pass-card__benefit-icon" />
                <span>Acesso ao catálogo +18 (roupas e poses)</span>
              </div>
              <div className="landing-pass-card__benefit">
                <CheckCircle size={16} className="landing-pass-card__benefit-icon" />
                <span>Entre em salas exclusivas AP</span>
              </div>
              <div className="landing-pass-card__benefit">
                <CheckCircle size={16} className="landing-pass-card__benefit-icon" />
                <span>Selo de Verificação de Idade</span>
              </div>
            </div>
            <div className="landing-pass-card__price-row">
              <span className="landing-pass-card__price">R$ 89,90</span>
              <span className="landing-pass-card__period">Taxa única</span>
            </div>
            <button
              className="landing-pass-card__btn landing-pass-card__btn--ap"
              onClick={() => navigate('/produto/access-pass-ap-oficial')}
            >
              Comprar Access Pass
            </button>
          </div>
        </div>
      </section>

      {/* Rooms Showcase Section */}
      <section className="landing-rooms">
        <h2 className="landing-rooms__title">🏠 Rooms & Decorações</h2>
        <p className="landing-rooms__subtitle">Transforme seu espaço virtual com decorações temáticas prontas:</p>

        <div className="landing-rooms__grid">
          <div className="landing-room-card">
            <div className="landing-room-card__img-wrap">
              <img src="/images/room_romantic.jpg" alt="Sala Romântica" className="landing-room-card__img" onError={(e) => { e.currentTarget.src = '/images/credits.png' }} />
            </div>
            <div className="landing-room-card__content">
              <h4 className="landing-room-card__title">Sala Romântica</h4>
              <p className="landing-room-card__price">R$ 29,90</p>
              <button
                className="landing-room-card__btn"
                onClick={() => navigate('/produto/room-romantica-imvu')}
              >
                Detalhes
              </button>
            </div>
          </div>

          <div className="landing-room-card">
            <div className="landing-room-card__img-wrap">
              <img src="/images/room_wedding.jpg" alt="Decoração de Casamento" className="landing-room-card__img" onError={(e) => { e.currentTarget.src = '/images/credits.png' }} />
            </div>
            <div className="landing-room-card__content">
              <h4 className="landing-room-card__title">Decoração Casamento</h4>
              <p className="landing-room-card__price">R$ 49,90</p>
              <button
                className="landing-room-card__btn"
                onClick={() => navigate('/produto/decoracao-casamento-imvu')}
              >
                Detalhes
              </button>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            className="landing-hero__btn-secondary"
            style={{ width: 'auto', display: 'inline-block', padding: '10px 24px' }}
            onClick={() => navigate('/categoria/rooms')}
          >
            Ver Todas as Salas
          </button>
        </div>
      </section>

      {/* Testimonials / Trust Stats */}
      <section className="landing-reviews">
        <h2 className="landing-reviews__title">⭐ Quem já comprou aprova!</h2>
        <div className="landing-reviews__grid">
          <div className="landing-review-card">
            <div className="landing-review-card__header">
              <div className="landing-review-card__user">
                <span className="landing-review-card__avatar">💜</span>
                <span className="landing-review-card__name">Beatriz_imvu</span>
              </div>
              <span className="landing-review-card__rating">★★★★★</span>
            </div>
            <p className="landing-review-card__text">
              "Comprei o AP e chegou super rápido! O atendimento do suporte no WhatsApp foi excelente."
            </p>
          </div>

          <div className="landing-review-card">
            <div className="landing-review-card__header">
              <div className="landing-review-card__user">
                <span className="landing-review-card__avatar">🎮</span>
                <span className="landing-review-card__name">ThiagoGamer</span>
              </div>
              <span className="landing-review-card__rating">★★★★★</span>
            </div>
            <p className="landing-review-card__text">
              "Sempre compro créditos aqui. Rápido, seguro e mais barato do que comprar direto no jogo."
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="landing-faq">
        <h2 className="landing-faq__title">❓ Perguntas Frequentes</h2>
        <div className="landing-faq__items">
          {FAQS.map((faq, index) => (
            <div key={index} className="landing-faq-item">
              <button
                className="landing-faq-item__header"
                onClick={() => toggleFaq(index)}
                aria-expanded={faqOpenIndex === index}
              >
                <span>{faq.q}</span>
                {faqOpenIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {faqOpenIndex === index && (
                <div className="landing-faq-item__content">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__logo">
          IR3H<span> STORE</span>
        </div>
        <p className="landing-footer__desc">
          A maior e mais segura revendedora de créditos, passes e serviços IMVU do Brasil.
        </p>

        <div className="landing-footer__links">
          <button className="landing-footer__link" onClick={() => navigate('/faq')}>FAQ</button>
          <button className="landing-footer__link" onClick={() => navigate('/sobre')}>Sobre Nós</button>
          <button className="landing-footer__link" onClick={() => navigate('/contato')}>Contato</button>
          <button className="landing-footer__link" onClick={() => navigate('/privacidade')}>Privacidade</button>
          <button className="landing-footer__link" onClick={() => navigate('/termos')}>Termos</button>
        </div>

        <div className="landing-footer__payment">
          <p className="landing-footer__payment-title">Formas de Pagamento</p>
          <div className="landing-footer__payment-icons">
            <span className="landing-footer__payment-badge">PIX</span>
            <span className="landing-footer__payment-badge">CARTÃO</span>
            <span className="landing-footer__payment-badge">BOLETO</span>
          </div>
        </div>

        <p className="landing-footer__copyright">
          &copy; {new Date().getFullYear()} IR3H Store. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
