import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQPage.css';
import { ChevronLeft, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { faqItems, faqCategories } from '../../data/faq';

export default function FAQPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(faqCategories[0]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Perguntas Frequentes — IR3H Store';
  }, []);

  const filtered = faqItems.filter(f => f.category === activeCategory);

  return (
    <div className="faq-page">
      <div className="faq-page__header">
        <button className="faq-page__back" onClick={() => navigate(-1)} aria-label="Voltar">
          <ChevronLeft size={20} />
        </button>
        <h1 className="faq-page__title">Perguntas Frequentes</h1>
      </div>

      <div className="faq-page__categories scroll-x" style={{ padding: '0 var(--space-3) var(--space-3)' }}>
        {faqCategories.map(cat => (
          <button
            key={cat}
            className={`faq-category-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => { setActiveCategory(cat); setOpenId(null); }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="faq-page__list">
        {filtered.map(item => (
          <div
            key={item.id}
            className={`faq-item ${openId === item.id ? 'faq-item--open' : ''}`}
          >
            <button
              className="faq-item__question"
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              aria-expanded={openId === item.id}
            >
              <span>{item.question}</span>
              {openId === item.id
                ? <ChevronUp size={18} style={{ flexShrink: 0 }} />
                : <ChevronDown size={18} style={{ flexShrink: 0 }} />
              }
            </button>
            {openId === item.id && (
              <div className="faq-item__answer" role="region">
                <p>{item.answer}</p>
                <button
                  className="faq-item__wa-btn"
                  onClick={() => window.open(
                    `https://api.whatsapp.com/send?phone=5527988003025&text=Tenho uma dúvida sobre: ${encodeURIComponent(item.question)}`,
                    '_blank', 'noopener'
                  )}
                >
                  <MessageCircle size={14} />
                  Ainda tenho dúvidas — Falar no WhatsApp
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
