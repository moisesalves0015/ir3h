import './PromoBar.css';
import { Zap, ShieldCheck, Crown, Unlock } from 'lucide-react';

const promos = [
  { text: 'Envio Super Rápido via WhatsApp', Icon: Zap },
  { text: 'Créditos 100% Seguros & Oficiais', Icon: ShieldCheck },
  { text: 'VIP Ativação Direta', Icon: Crown },
  { text: 'AP Sem Complicação', Icon: Unlock },
  { text: 'Temos todos os selos oficiais do IMVU!', isImage: true },
];

export default function PromoBar() {
  // Duplicate for seamless loop
  const doubled = [...promos, ...promos, ...promos];

  return (
    <div className="promo-bar">
      <div className="promo-bar__track">
        {doubled.map((p, i) => {
          if (p.isImage) {
            return (
              <span key={i} className="promo-bar__item">
                <img src="/images/badges.png" alt="Selos IMVU" className="promo-bar__all-badges-img" />
                {p.text}
              </span>
            );
          }
          const Icon = p.Icon;
          return (
            <span key={i} className="promo-bar__item">
              {Icon && <Icon size={12} style={{ marginRight: '6px', color: 'var(--brand-accent)' }} />}
              {p.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
