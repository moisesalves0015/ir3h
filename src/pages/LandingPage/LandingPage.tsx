import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Shield,
  MessageSquare,
  Gift,
  CheckCircle,
  Gem,
  Play,
  Square,
  Copy,
  Check,
  ExternalLink,
  Radio,
  Crown,
  Lock,
  ShoppingCart,
  BarChart3,
  Star,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  FileText,
  Heart,
  Unlock,
  HelpCircle,
  Users,
} from 'lucide-react';
import { useApp, type ShowcaseItem } from '../../contexts/AppContext';
import './LandingPage.css';

const CREDIT_PACKS = [
  { value: '10.000', label: '10k', price: 'R$ 18,90', originalPrice: 'R$ 27,00', savings: 'SAVE 30%', slug: '10k-creditos-imvu', badge: null },
  { value: '20.000', label: '20k', price: 'R$ 36,90', originalPrice: 'R$ 48,00', savings: 'SAVE 23%', slug: '20k-creditos-imvu', badge: 'POPULAR' },
  { value: '50.000', label: '50k', price: 'R$ 89,90', originalPrice: 'R$ 119,90', savings: 'SAVE 25%', slug: '50k-creditos-imvu', badge: 'MELHOR VALOR' },
  { value: '100.000', label: '100k', price: 'R$ 179,90', originalPrice: 'R$ 220,00', savings: 'SAVE 18%', slug: '100k-creditos-imvu', badge: null },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { showcases, landingConfig, settings } = useApp();
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [playingRadioId, setPlayingRadioId] = useState<number | null>(null);
  const [copiedRadioId, setCopiedRadioId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const roomsShowcase = showcases.find(s => s.id === 'rooms');
  const shopsShowcase = showcases.find(s => s.id === 'shops');
  const radioShowcase = showcases.find(s => s.id === 'radio');

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const handleBuyCredit = () => {
    const pack = CREDIT_PACKS[selectedPackIndex];
    navigate(`/produto/${pack.slug}`);
  };

  const handlePlayRadio = (station: ShowcaseItem) => {
    if (playingRadioId === station.id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      setPlayingRadioId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      const streamUrl = station.streamUrl || '';
      const audio = new Audio(streamUrl);
      audio.play().catch(() => window.open(streamUrl, '_blank', 'noopener'));
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

  return (
    <div className="landing-page">

      {/* ── HEADER ── */}
      <header className="lp-header">
        <button className="lp-header__brand" onClick={() => navigate('/')}>
          <Gem size={20} className="lp-header__brand-icon" />
          <span>{settings.logoText.slice(0, 4)}<strong>{settings.logoText.slice(4)}</strong></span>
        </button>
        <nav className="lp-header__nav">
          <a href="#calculator" className="lp-header__nav-link">Créditos</a>
          {roomsShowcase?.status && <a href="#rooms" className="lp-header__nav-link">Rooms</a>}
          {radioShowcase?.status && <a href="#radio" className="lp-header__nav-link">Rádio</a>}
        </nav>
        <button
          className="lp-header__cta"
          onClick={() => navigate('/ir3h-store')}
        >
          <ShoppingCart size={14} />
          Acessar Loja
        </button>
      </header>

      {/* ── HERO ── */}
      <section className="lp-hero">
        {/* CSS particle dots */}
        <div className="lp-hero__particles" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => <span key={i} className="lp-hero__particle" />)}
        </div>

        <div className="lp-hero__container">
          <div className="lp-hero__content">
            <div className="lp-hero__social-proof">
              <Users size={13} />
              <span>{landingConfig.hero.badgeText}</span>
            </div>

            <h1 className="lp-hero__title">
              {landingConfig.hero.title.split('IR3H Store')[0]}
              <span>IR3H Store</span>
              {landingConfig.hero.title.split('IR3H Store')[1]}
            </h1>
            <p className="lp-hero__desc">
              {landingConfig.hero.subtitle}
            </p>

            <div className="lp-hero__chips">
              <span className="lp-hero__chip"><Zap size={11} />Envio Instantâneo</span>
              <span className="lp-hero__chip"><Shield size={11} />Método Oficial</span>
              <span className="lp-hero__chip"><Lock size={11} />Sem Senha</span>
            </div>

            <div className="lp-hero__actions">
              <button className="lp-hero__btn-primary" onClick={() => navigate('/ir3h-store')}>
                <ShoppingCart size={16} />
                {landingConfig.hero.primaryBtnText}
              </button>
              <a href="#calculator" className="lp-hero__btn-secondary">
                <BarChart3 size={16} />
                {landingConfig.hero.secondaryBtnText}
              </a>
            </div>
          </div>

          <div className="lp-hero__visual">
            <div className="lp-visual-card">
              <div className="lp-visual-card__glow" />
              <div className="lp-visual-card__header">
                <div className="lp-visual-card__avatar">
                  <Gem size={18} />
                </div>
                <div className="lp-visual-card__user-info">
                  <p className="lp-visual-card__username">ir3h_vip_pro</p>
                  <span className="lp-visual-card__badge-vip">
                    <Crown size={9} /> VIP Diamond
                  </span>
                </div>
                <span className="lp-visual-card__status-dot" />
              </div>

              <div className="lp-visual-card__video-container">
                <video src={landingConfig.hero.videoUrl} autoPlay loop muted playsInline className="lp-visual-card__video" />
              </div>

              <div className="lp-visual-card__badges">
                <span className="lp-badge-item"><Unlock size={9} /> AP OFICIAL</span>
                <span className="lp-badge-item"><Zap size={9} /> ENTREGA FAST</span>
                <span className="lp-badge-item"><Shield size={9} /> 100% SEGURO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="lp-trust">
        <div className="lp-trust__inner">
          {[
            { icon: <Zap size={20} />, title: 'Entrega em até 15 min', desc: 'Créditos na sua conta rapidinho.' },
            { icon: <Shield size={20} />, title: '100% Seguro', desc: 'Métodos oficiais, zero banimento.' },
            { icon: <MessageSquare size={20} />, title: 'Suporte WhatsApp', desc: 'Atendimento humano e rápido.' },
            { icon: <Gift size={20} />, title: 'Sem Senha', desc: 'Apenas seu Avatar Nick.' },
          ].map((item, i) => (
            <div key={i} className="lp-trust-card">
              <div className="lp-trust-card__icon">{item.icon}</div>
              <div>
                <p className="lp-trust-card__title">{item.title}</p>
                <p className="lp-trust-card__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CREDIT SIMULATOR ── */}
      <section className="lp-calc" id="calculator">
        <div className="lp-calc__inner">
          <div className="showcase__head" style={{ marginBottom: '32px' }}>
            <div className="showcase__head-left">
              <span className="showcase__label"><BarChart3 size={13} /> Simulador de Preços</span>
              <h2 className="showcase__title">Escolha seu Pacote</h2>
              <p className="showcase__sub">Selecione a quantidade e veja quanto você economiza comprando com a IR3H:</p>
            </div>
          </div>

          {/* Pack selector cards */}
          <div className="lp-calc__cards">
            {CREDIT_PACKS.map((pack, idx) => (
              <button
                key={idx}
                className={`lp-calc-card ${selectedPackIndex === idx ? 'lp-calc-card--active' : ''}`}
                onClick={() => setSelectedPackIndex(idx)}
              >
                {pack.badge && <span className="lp-calc-card__badge">{pack.badge}</span>}
                <span className="lp-calc-card__label">{pack.label}</span>
                <span className="lp-calc-card__credits">Créditos</span>
                <span className="lp-calc-card__price">{pack.price}</span>
                <span className="lp-calc-card__savings">{pack.savings}</span>
              </button>
            ))}
          </div>

          {/* Result box */}
          <div className="lp-calc__result">
            <div className="lp-calc__result-left">
              <p className="lp-calc__result-label">Você escolheu</p>
              <p className="lp-calc__result-credits">{CREDIT_PACKS[selectedPackIndex].value}</p>
              <p className="lp-calc__result-credits-label">Créditos IMVU</p>
            </div>
            <div className="lp-calc__result-divider" />
            <div className="lp-calc__result-right">
              <p className="lp-calc__result-orig">De: <s>{CREDIT_PACKS[selectedPackIndex].originalPrice}</s></p>
              <p className="lp-calc__result-final">{CREDIT_PACKS[selectedPackIndex].price}</p>
              <span className="lp-calc__result-savings">{CREDIT_PACKS[selectedPackIndex].savings}</span>
            </div>
          </div>

          <button className="lp-calc__btn" onClick={handleBuyCredit}>
            <ShoppingCart size={18} />
            Garantir com Desconto
          </button>
        </div>
      </section>

      {/* ── PASSES ── */}
      <section className="lp-passes">
        <div className="lp-passes__inner">
          <div className="showcase__head" style={{ marginBottom: '32px', maxWidth: '100%' }}>
            <div className="showcase__head-left">
              <span className="showcase__label"><Crown size={13} /> Assinaturas Premium</span>
              <h2 className="showcase__title">Passes & Assinaturas</h2>
              <p className="showcase__sub">Desbloqueie todos os recursos do IMVU e acesse áreas exclusivas:</p>
            </div>
          </div>

          <div className="lp-passes__grid">
            {/* VIP Card */}
            <div className="lp-pass-card">
              <div className="lp-pass-card__strip lp-pass-card__strip--vip" />
              <div className="lp-pass-card__ribbon">Mais Vendido</div>
              <div className="lp-pass-card__icon lp-pass-card__icon--vip">
                <Crown size={26} />
              </div>
              <h3 className="lp-pass-card__title">IMVU VIP Platinum</h3>
              <p className="lp-pass-card__desc">Torne-se um criador, remova anúncios e ganhe créditos mensais.</p>
              <div className="lp-pass-card__benefits">
                {['Ganha créditos todo mês', 'Crie suas próprias roupas e salas', 'Suporte prioritário do IMVU'].map((b, i) => (
                  <div key={i} className="lp-pass-card__benefit">
                    <CheckCircle size={15} className="lp-pass-card__benefit-icon lp-pass-card__benefit-icon--vip" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <div className="lp-pass-card__price-row">
                <span className="lp-pass-card__price">R$ 39,90</span>
                <span className="lp-pass-card__period">/ 1 mês</span>
              </div>
              <p className="lp-pass-card__social">+850 usuários ativos</p>
              <button className="lp-pass-card__btn lp-pass-card__btn--vip" onClick={() => navigate('/produto/vip-platinum-1-mes')}>
                Assinar VIP Platinum
              </button>
            </div>

            {/* AP Card */}
            <div className="lp-pass-card lp-pass-card--ap">
              <div className="lp-pass-card__strip lp-pass-card__strip--ap" />
              <div className="lp-pass-card__icon lp-pass-card__icon--ap">
                <Unlock size={26} />
              </div>
              <h3 className="lp-pass-card__title">Access Pass (AP)</h3>
              <p className="lp-pass-card__desc">Acesso completo para maiores de 18 anos ao catálogo restrito.</p>
              <div className="lp-pass-card__benefits">
                {['Acesso ao catálogo +18 (roupas e poses)', 'Entre em salas exclusivas AP', 'Selo de Verificação de Idade'].map((b, i) => (
                  <div key={i} className="lp-pass-card__benefit">
                    <CheckCircle size={15} className="lp-pass-card__benefit-icon lp-pass-card__benefit-icon--ap" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <div className="lp-pass-card__price-row">
                <span className="lp-pass-card__price">R$ 89,90</span>
                <span className="lp-pass-card__period">Taxa única</span>
              </div>
              <p className="lp-pass-card__social">+1.200 usuários ativos</p>
              <button className="lp-pass-card__btn lp-pass-card__btn--ap" onClick={() => navigate('/produto/access-pass-ap-oficial')}>
                Comprar Access Pass
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROOMS SHOWCASE ── */}
      {roomsShowcase && roomsShowcase.status && (
        <section className="showcase" id="rooms">
          <div className="showcase__head">
            <div className="showcase__head-left">
              <span className="showcase__label"><Gift size={13} /> {roomsShowcase.label}</span>
              <h2 className="showcase__title">{roomsShowcase.title}</h2>
              <p className="showcase__sub">{roomsShowcase.subtitle}</p>
            </div>
            <div className="showcase__head-right">
              <span className="showcase__count">{roomsShowcase.items.length} salas disponíveis</span>
            </div>
          </div>
          <div className="showcase__rail-wrap">
            <div className="showcase__rail">
              {roomsShowcase.items.map((room) => (
                <a key={room.id} href={room.link} target="_blank" rel="noopener noreferrer" className="scard scard--room">
                  <div className="scard__img-wrap">
                    <img src={room.imgUrl} alt={room.name} className="scard__img" />
                    <div className="scard__overlay" />
                    <span className="scard__chip scard__chip--room"><Gift size={9} /> Pública</span>
                    <div className="scard__cta-hover"><span>Entrar na Sala</span><ExternalLink size={14} /></div>
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
            <p className="showcase__cta-text">Quer sua própria sala? Compre créditos e customize o seu espaço!</p>
            <button className="showcase__cta-btn" onClick={() => navigate('/ir3h-store')}>
              <ShoppingCart size={13} /> Comprar Créditos
            </button>
          </div>
        </section>
      )}

      {/* ── SHOPS SHOWCASE ── */}
      {shopsShowcase && shopsShowcase.status && (
        <section className="showcase showcase--dark" id="shops">
          <div className="showcase__head">
            <div className="showcase__head-left">
              <span className="showcase__label"><ExternalLink size={13} /> {shopsShowcase.label}</span>
              <h2 className="showcase__title">{shopsShowcase.title}</h2>
              <p className="showcase__sub">{shopsShowcase.subtitle}</p>
            </div>
            <div className="showcase__head-right">
              <span className="showcase__count">{shopsShowcase.items.length} lojas disponíveis</span>
            </div>
          </div>
          <div className="showcase__rail-wrap">
            <div className="showcase__rail">
              {shopsShowcase.items.map((shop) => (
                <a key={shop.id} href={shop.link} target="_blank" rel="noopener noreferrer" className="scard scard--shop">
                  <div className="scard__img-wrap">
                    <img src={shop.imgUrl} alt={shop.name} className="scard__img" />
                    <div className="scard__overlay" />
                    <span className="scard__chip scard__chip--shop"><ExternalLink size={9} /> Shop</span>
                    <div className="scard__cta-hover"><span>Ver Loja</span><ExternalLink size={14} /></div>
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
            <p className="showcase__cta-text">Encontrou algo que gostou? Use seus créditos IR3H para comprar!</p>
            <button className="showcase__cta-btn showcase__cta-btn--shop" onClick={() => navigate('/ir3h-store')}>
              <ShoppingCart size={13} /> Obter Créditos
            </button>
          </div>
        </section>
      )}

      {/* ── RÁDIOS SHOWCASE ── */}
      {radioShowcase && radioShowcase.status && (
        <section className="showcase showcase--radio" id="radio">
          <div className="showcase__head">
            <div className="showcase__head-left">
              <span className="showcase__label"><Radio size={13} /> {radioShowcase.label}</span>
              <h2 className="showcase__title">{radioShowcase.title}</h2>
              <p className="showcase__sub">{radioShowcase.subtitle}</p>
            </div>
          </div>
          <div className="showcase__rail-wrap">
            <div className="showcase__rail">
              {radioShowcase.items.map((station) => {
                const isPlaying = playingRadioId === station.id;
                const isCopied = copiedRadioId === station.id;
                return (
                  <div key={station.id} className={`rcard ${isPlaying ? 'rcard--playing' : ''}`}>
                    <div className="rcard__art">
                      <span className="rcard__emoji">{station.emoji}</span>
                      {isPlaying && <div className="rcard__wave"><span /><span /><span /><span /></div>}
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
                      <button className="rcard__copy-btn" onClick={() => handleCopyLink(station.streamUrl || '', station.id)} aria-label="Copiar link da rádio">
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── DEPOIMENTOS ── */}
      <section className="lp-reviews">
        <div className="lp-reviews__inner">
          <div className="showcase__head" style={{ maxWidth: '100%', marginBottom: '12px' }}>
            <div className="showcase__head-left">
              <span className="showcase__label"><Star size={13} /> Avaliações Verificadas</span>
              <h2 className="showcase__title">Quem comprou aprova!</h2>
              <p className="showcase__sub">Mais de 300 clientes avaliaram nosso serviço</p>
            </div>
            <div className="showcase__head-right">
              <div className="lp-reviews__score">
                <div className="lp-reviews__score-stars">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <span className="lp-reviews__score-val">4.9</span>
                <span className="lp-reviews__score-count">+300</span>
              </div>
            </div>
          </div>

          <div className="lp-reviews__rail">
            {landingConfig.reviews.map((t) => (
              <div key={t.id} className="lp-review-card">
                <div className="lp-review-card__header">
                  <div className="lp-review-card__avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div className="lp-review-card__meta">
                    <p className="lp-review-card__name">{t.name}</p>
                    <div className="lp-review-card__stars">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="lp-review-card__text">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="lp-faq">
        <div className="lp-faq__inner">
          <div className="showcase__head" style={{ maxWidth: '100%', marginBottom: '32px' }}>
            <div className="showcase__head-left">
              <span className="showcase__label"><HelpCircle size={13} /> Tire suas Dúvidas</span>
              <h2 className="showcase__title">Perguntas Frequentes</h2>
              <p className="showcase__sub">Respostas para as dúvidas mais comuns dos nossos clientes</p>
            </div>
          </div>
          <div className="lp-faq__items">
            {landingConfig.faqs.map((faq, index) => (
              <div key={index} className={`lp-faq-item ${faqOpenIndex === index ? 'lp-faq-item--open' : ''}`}>
                <button
                  className="lp-faq-item__header"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={faqOpenIndex === index}
                >
                  <span>{faq.q}</span>
                  {faqOpenIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                <div className="lp-faq-item__body">
                  <p className="lp-faq-item__content">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <div className="lp-footer__col lp-footer__col--brand">
            <div className="lp-footer__logo">
              <Gem size={20} />
              {landingConfig.footerLogo.slice(0, 4)}<span>{landingConfig.footerLogo.slice(4)}</span>
            </div>
            <p className="lp-footer__desc">
              {landingConfig.footerText}
            </p>
          </div>

          <div className="lp-footer__col">
            <p className="lp-footer__col-title">Navegação</p>
            <div className="lp-footer__links">
              <button className="lp-footer__link" onClick={() => navigate('/faq')}>FAQ</button>
              <button className="lp-footer__link" onClick={() => navigate('/sobre')}>Sobre Nós</button>
              <button className="lp-footer__link" onClick={() => navigate('/contato')}>Contato</button>
              <button className="lp-footer__link" onClick={() => navigate('/privacidade')}>Privacidade</button>
              <button className="lp-footer__link" onClick={() => navigate('/termos')}>Termos</button>
            </div>
          </div>

          <div className="lp-footer__col">
            <p className="lp-footer__col-title">Formas de Pagamento</p>
            <div className="lp-footer__payments">
              <div className="lp-footer__payment-item">
                <Banknote size={16} />
                <span>PIX</span>
              </div>
              <div className="lp-footer__payment-item">
                <CreditCard size={16} />
                <span>Cartão</span>
              </div>
              <div className="lp-footer__payment-item">
                <FileText size={16} />
                <span>Boleto</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-footer__bottom">
          <p>© {new Date().getFullYear()} {settings.siteName}. Todos os direitos reservados.</p>
          <p className="lp-footer__made">Feito com <Heart size={12} fill="currentColor" /> para a comunidade IMVU</p>
        </div>
      </footer>

    </div>
  );
}
