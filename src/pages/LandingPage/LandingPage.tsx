import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Shield,
  MessageSquare,
  Gift,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Gem,
  Play,
  Square,
  Copy,
  Check,
  ExternalLink,
  Radio
} from 'lucide-react';
import './LandingPage.css';

// Credit simulation data matching real products
const CREDIT_PACKS = [
  { value: '10.000', label: '10k Créditos', price: 'R$ 18,90', originalPrice: 'R$ 27,00', savings: 'Economize 30%', slug: '10k-creditos-imvu' },
  { value: '20.000', label: '20k Créditos', price: 'R$ 36,90', originalPrice: 'R$ 48,00', savings: 'Economize 23%', slug: '20k-creditos-imvu' },
  { value: '50.000', label: '50k Créditos', price: 'R$ 89,90', originalPrice: 'R$ 119,90', savings: 'Economize 25%', slug: '50k-creditos-imvu' },
  { value: '100.000', label: '100k Créditos', price: 'R$ 179,90', originalPrice: 'R$ 220,00', savings: 'Economize 18%', slug: '100k-creditos-imvu' },
];

// Rooms públicas para divulgação (visitação)
const PROMO_ROOMS = [
  {
    id: 1,
    name: 'Sala VIP Exclusiva',
    description: 'Room temática premium com decoração especial. Venha conhecer!',
    imgUrl: 'https://i.pinimg.com/1200x/77/6f/11/776f11f2708aa43d734ab6b29c61dc98.jpg',
    link: 'https://imvu.com',
  },
  {
    id: 2,
    name: 'Ambiente Noturno',
    description: 'Sala night club com luzes neon e música ambiente para suas festas.',
    imgUrl: 'https://i.pinimg.com/736x/52/6d/8f/526d8f3c93b6f76dddb903e4b057487b.jpg',
    link: 'https://imvu.com',
  },
  {
    id: 3,
    name: 'Lounge Tropical',
    description: 'Ambiente relaxante com decoração tropical. Perfeito para socializar.',
    imgUrl: 'https://i.pinimg.com/736x/14/43/35/1443351d08deaef582490c6a918c510f.jpg',
    link: 'https://imvu.com',
  },
];

// Shops de terceiros para divulgação
const PROMO_SHOPS = [
  {
    id: 1,
    name: 'Loja de Outono',
    description: 'Looks exclusivos de avatar disponíveis no catálogo da loja.',
    imgUrl: 'https://i.pinimg.com/736x/56/dc/b7/56dcb7d8e766ed9bc23b85a11f762fb9.jpg',
    link: 'https://imvu.com',
  },
  {
    id: 2,
    name: 'Acessórios VIP Shop',
    description: 'Conjunto de acessórios premium para customizar seu avatar.',
    imgUrl: 'https://i.pinimg.com/736x/f7/a6/b0/f7a6b0403cf16bc5be6bf9d4b349591a.jpg',
    link: 'https://imvu.com',
  },
  {
    id: 3,
    name: 'Shop Masculino',
    description: 'Seleção curada de roupas e poses para avatares masculinos.',
    imgUrl: 'https://i.pinimg.com/736x/2d/61/ac/2d61acb4aa6ed07ed03864d3f57b701e.jpg',
    link: 'https://imvu.com',
  },
];

// Estações de rádio com links de streaming ao vivo
const RADIO_STATIONS = [
  {
    id: 1,
    name: 'IR3H Radio',
    genre: 'Pop / Eletrônico',
    streamUrl: 'https://s4.radio.co/seec67ef36/listen',
    emoji: '📻',
  },
  {
    id: 2,
    name: 'Surfer Network FM',
    genre: 'Dance / House',
    streamUrl: 'https://stream-285.surfernetwork.com/x9ko0jn9mzauv',
    emoji: '🎵',
  },
  {
    id: 3,
    name: 'Surf Wave Radio',
    genre: 'Pop / R&B',
    streamUrl: 'https://stream-176.surfernetwork.com/i8fbh0i6hv5uv',
    emoji: '🌊',
  },
  {
    id: 4,
    name: 'Zeno Radio',
    genre: 'Variado',
    streamUrl: 'https://stream.zeno.fm/mlugl0ydfdeuv',
    emoji: '🎶',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [playingRadioId, setPlayingRadioId] = useState<number | null>(null);
  const [copiedRadioId, setCopiedRadioId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const handleBuyCredit = () => {
    const pack = CREDIT_PACKS[selectedPackIndex];
    navigate(`/produto/${pack.slug}`);
  };

  const handlePlayRadio = (station: typeof RADIO_STATIONS[0]) => {
    if (playingRadioId === station.id) {
      // Stop
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      setPlayingRadioId(null);
    } else {
      // Stop any currently playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      // Play new
      const audio = new Audio(station.streamUrl);
      audio.play().catch(() => {
        // If browser blocks, open in new tab as fallback
        window.open(station.streamUrl, '_blank', 'noopener');
      });
      audioRef.current = audio;
      setPlayingRadioId(station.id);
    }
  };

  const handleCopyLink = (url: string, id: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedRadioId(id);
      setTimeout(() => setCopiedRadioId(null), 2000);
    });
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

      {/* ── DIVULGAÇÃO: ROOMS PÚBLICAS ── */}
      <section className="showcase" id="rooms">
        <div className="showcase__head">
          <div className="showcase__head-left">
            <span className="showcase__label">🏠 Explorar Salas</span>
            <h2 className="showcase__title">Rooms em Destaque</h2>
            <p className="showcase__sub">Salas públicas curadas para você visitar agora mesmo no IMVU</p>
          </div>
          <div className="showcase__head-right">
            <span className="showcase__count">{PROMO_ROOMS.length} salas disponíveis</span>
          </div>
        </div>
        <div className="showcase__rail-wrap">
          <div className="showcase__rail">
            {PROMO_ROOMS.map((room) => (
              <a
                key={room.id}
                href={room.link}
                target="_blank"
                rel="noopener noreferrer"
                className="scard scard--room"
              >
                <div className="scard__img-wrap">
                  <img src={room.imgUrl} alt={room.name} className="scard__img" />
                  <div className="scard__overlay" />
                  <span className="scard__chip scard__chip--room">🏠 Pública</span>
                  <div className="scard__cta-hover">
                    <span>Entrar na Sala</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
                <div className="scard__body">
                  <p className="scard__name">{room.name}</p>
                  <p className="scard__desc">{room.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="showcase__cta-strip">
          <p className="showcase__cta-text">💰 Gosta do que vê? Compre créditos e personalize sua própria sala!</p>
          <button className="showcase__cta-btn" onClick={() => navigate('/ir3h-store')}>
            Comprar Créditos
          </button>
        </div>
      </section>

      {/* ── DIVULGAÇÃO: SHOPS ── */}
      <section className="showcase showcase--dark" id="shops">
        <div className="showcase__head">
          <div className="showcase__head-left">
            <span className="showcase__label">🛍️ Descobrir Lojas</span>
            <h2 className="showcase__title">Shops em Destaque</h2>
            <p className="showcase__sub">Catálogos e lojas selecionadas com itens exclusivos para o seu avatar</p>
          </div>
          <div className="showcase__head-right">
            <span className="showcase__count">{PROMO_SHOPS.length} lojas disponíveis</span>
          </div>
        </div>
        <div className="showcase__rail-wrap">
          <div className="showcase__rail">
            {PROMO_SHOPS.map((shop) => (
              <a
                key={shop.id}
                href={shop.link}
                target="_blank"
                rel="noopener noreferrer"
                className="scard scard--shop"
              >
                <div className="scard__img-wrap">
                  <img src={shop.imgUrl} alt={shop.name} className="scard__img" />
                  <div className="scard__overlay" />
                  <span className="scard__chip scard__chip--shop">🛍️ Shop</span>
                  <div className="scard__cta-hover">
                    <span>Ver Loja</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
                <div className="scard__body">
                  <p className="scard__name">{shop.name}</p>
                  <p className="scard__desc">{shop.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="showcase__cta-strip showcase__cta-strip--shop">
          <p className="showcase__cta-text">✨ Encontrou algo que gostou? Use seus créditos IR3H para comprar!</p>
          <button className="showcase__cta-btn showcase__cta-btn--shop" onClick={() => navigate('/ir3h-store')}>
            Obter Créditos
          </button>
        </div>
      </section>

      {/* ── RÁDIOS AO VIVO ── */}
      <section className="showcase showcase--radio" id="radio">
        <div className="showcase__head">
          <div className="showcase__head-left">
            <span className="showcase__label"><Radio size={14} style={{ verticalAlign: 'middle' }} /> Ao Vivo Agora</span>
            <h2 className="showcase__title">Rádio ao Vivo</h2>
            <p className="showcase__sub">Estações em transmissão em tempo real — aperte play e curta!</p>
          </div>
        </div>
        <div className="showcase__rail-wrap">
          <div className="showcase__rail">
            {RADIO_STATIONS.map((station) => {
              const isPlaying = playingRadioId === station.id;
              const isCopied = copiedRadioId === station.id;
              return (
                <div
                  key={station.id}
                  className={`rcard ${isPlaying ? 'rcard--playing' : ''}`}
                >
                  <div className="rcard__art">
                    <span className="rcard__emoji">{station.emoji}</span>
                    {isPlaying && (
                      <div className="rcard__wave">
                        <span></span><span></span><span></span><span></span>
                      </div>
                    )}
                    {!isPlaying && <div className="rcard__pulse" />}
                    <span className="rcard__live-badge">● AO VIVO</span>
                  </div>
                  <div className="rcard__info">
                    <p className="rcard__name">{station.name}</p>
                    <p className="rcard__genre">{station.genre}</p>
                  </div>
                  <div className="rcard__actions">
                    <button
                      className={`rcard__play-btn ${isPlaying ? 'rcard__play-btn--stop' : ''}`}
                      onClick={() => handlePlayRadio(station)}
                      aria-label={isPlaying ? `Parar ${station.name}` : `Tocar ${station.name}`}
                    >
                      {isPlaying ? <Square size={18} /> : <Play size={18} />}
                    </button>
                    <button
                      className="rcard__copy-btn"
                      onClick={() => handleCopyLink(station.streamUrl, station.id)}
                      aria-label="Copiar link da rádio"
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
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
