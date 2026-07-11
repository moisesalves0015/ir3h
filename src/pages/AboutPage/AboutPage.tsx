import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';
import { ChevronLeft, Shield, Zap, MessageCircle, Star } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sobre Nós — IR3H Store';
  }, []);

  return (
    <div className="simple-page">
      <div className="simple-page__header">
        <button className="simple-page__back" onClick={() => navigate(-1)} aria-label="Voltar">
          <ChevronLeft size={20} />
        </button>
        <h1 className="simple-page__title">Sobre a IR3H Store</h1>
      </div>

      <div className="simple-page__body">
        <div className="about-hero">
          <span className="about-hero__emoji">💎</span>
          <h2 className="about-hero__title">IR3H Store</h2>
          <p className="about-hero__subtitle">O marketplace especializado no universo IMVU</p>
        </div>

        <p className="simple-page__text">
          A <strong>IR3H Store</strong> é o marketplace de referência para quem joga IMVU no Brasil.
          Nascemos com uma missão simples: entregar créditos, VIP, Access Pass e combos de forma
          rápida, segura e com o melhor preço do mercado.
        </p>

        <p className="simple-page__text">
          Nossa equipe é formada por entusiastas do IMVU que entendem profundamente a plataforma e as
          necessidades dos jogadores. Trabalhamos com métodos 100% oficiais e autorizados, garantindo
          segurança total para você.
        </p>

        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat__value">+2.000</span>
            <span className="about-stat__label">Clientes satisfeitos</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value">+5.000</span>
            <span className="about-stat__label">Pedidos entregues</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value">4.9⭐</span>
            <span className="about-stat__label">Avaliação média</span>
          </div>
        </div>

        <div className="about-values">
          <h3 className="simple-page__section-title">Nossos diferenciais</h3>

          {[
            { icon: <Zap size={18} />, title: 'Entrega Ultrarrápida', desc: 'Créditos e VIP entregues em minutos após o Pix.' },
            { icon: <Shield size={18} />, title: '100% Seguro', desc: 'Métodos oficiais. Nunca sua conta em risco.' },
            { icon: <Star size={18} />, title: 'Preço Justo', desc: 'Melhores preços do mercado, sempre.' },
            { icon: <MessageCircle size={18} />, title: 'Suporte Humanizado', desc: 'Atendimento via WhatsApp com pessoas reais.' },
          ].map((val, i) => (
            <div key={i} className="about-value-card">
              <span className="about-value-card__icon">{val.icon}</span>
              <div>
                <p className="about-value-card__title">{val.title}</p>
                <p className="about-value-card__desc">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="about-wa-btn"
          onClick={() => window.open('https://api.whatsapp.com/send?phone=5527988003025&text=Olá! Quero saber mais sobre a IR3H Store.', '_blank', 'noopener')}
        >
          <MessageCircle size={18} />
          Fale Conosco no WhatsApp
        </button>
      </div>
    </div>
  );
}
