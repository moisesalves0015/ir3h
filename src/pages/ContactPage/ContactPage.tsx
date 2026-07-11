import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AboutPage/AboutPage.css';
import { ChevronLeft, MessageCircle, Clock, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const navigate = useNavigate();
  useEffect(() => { document.title = 'Contato — IR3H Store'; }, []);

  const options = [
    {
      icon: <MessageCircle size={22} style={{ color: '#25d366' }} />,
      bg: 'rgba(37, 211, 102, 0.1)',
      label: 'WhatsApp (Principal)',
      desc: 'Resposta em minutos — (27) 98800-3025',
      action: () => window.open('https://api.whatsapp.com/send?phone=5527988003025&text=Olá! Preciso de ajuda.', '_blank', 'noopener'),
    },
    {
      icon: <ExternalLink size={22} style={{ color: '#c084fc' }} />,
      bg: 'rgba(192, 132, 252, 0.1)',
      label: 'Instagram',
      desc: '@ir3h.store — Novidades e promoções',
      action: () => window.open('https://instagram.com', '_blank', 'noopener'),
    },
    {
      icon: <Clock size={22} style={{ color: 'var(--brand-accent)' }} />,
      bg: 'rgba(251, 191, 36, 0.1)',
      label: 'Horário de Atendimento',
      desc: 'Segunda a Domingo, 8h às 23h',
      action: undefined,
    },
  ];

  return (
    <div className="simple-page">
      <div className="simple-page__header">
        <button className="simple-page__back" onClick={() => navigate(-1)} aria-label="Voltar">
          <ChevronLeft size={20} />
        </button>
        <h1 className="simple-page__title">Contato</h1>
      </div>

      <div className="simple-page__body">
        <p className="simple-page__text">
          Nossa equipe está pronta para te atender! O canal principal é o <strong>WhatsApp</strong> —
          mais rápido e direto para resolver qualquer dúvida sobre pedidos, entregas ou produtos.
        </p>

        <div className="contact-options">
          {options.map((opt, i) => (
            <button
              key={i}
              className="contact-option"
              onClick={opt.action}
              style={{ cursor: opt.action ? 'pointer' : 'default' }}
              disabled={!opt.action}
            >
              <span className="contact-option__icon" style={{ background: opt.bg }}>
                {opt.icon}
              </span>
              <div className="contact-option__info">
                <p className="contact-option__label">{opt.label}</p>
                <p className="contact-option__desc">{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
