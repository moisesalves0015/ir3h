import { useState } from 'react';
import { useApp, type LandingReview, type LandingFaq } from '../../contexts/AppContext';
import { Plus, Trash2, Save, Star } from 'lucide-react';

export default function AdminLandingEditor() {
  const { landingConfig, updateLandingConfig } = useApp();

  // Hero States
  const [heroTitle, setHeroTitle] = useState(landingConfig.hero.title);
  const [heroSub, setHeroSub] = useState(landingConfig.hero.subtitle);
  const [heroBtn1, setHeroBtn1] = useState(landingConfig.hero.primaryBtnText);
  const [heroBtn2, setHeroBtn2] = useState(landingConfig.hero.secondaryBtnText);
  const [heroVideo, setHeroVideo] = useState(landingConfig.hero.videoUrl);
  const [heroBadge, setHeroBadge] = useState(landingConfig.hero.badgeText);

  // Reviews States
  const [reviews, setReviews] = useState<LandingReview[]>(landingConfig.reviews);
  const [revName, setRevName] = useState('');
  const [revText, setRevText] = useState('');
  const [revStars, setRevStars] = useState(5);
  const [revInitials, setRevInitials] = useState('');

  // FAQs States
  const [faqs, setFaqs] = useState<LandingFaq[]>(landingConfig.faqs);
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  // Footer States
  const [footerLogo, setFooterLogo] = useState(landingConfig.footerLogo);
  const [footerText, setFooterText] = useState(landingConfig.footerText);

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateLandingConfig({
      hero: {
        title: heroTitle,
        subtitle: heroSub,
        primaryBtnText: heroBtn1,
        secondaryBtnText: heroBtn2,
        videoUrl: heroVideo,
        badgeText: heroBadge,
      },
    });
  };

  const handleSaveFooter = (e: React.FormEvent) => {
    e.preventDefault();
    updateLandingConfig({
      footerLogo,
      footerText,
    });
  };

  // Reviews CRUD
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const colors = ['#8b5cf6', '#3b82f6', '#db2777', '#10b981', '#f59e0b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initials = revInitials || revName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    const newReview: LandingReview = {
      id: Date.now(),
      name: revName,
      text: revText,
      stars: revStars,
      initials,
      color: randomColor,
    };

    const updated = [...reviews, newReview];
    setReviews(updated);
    updateLandingConfig({ reviews: updated });
    // reset
    setRevName('');
    setRevText('');
    setRevStars(5);
    setRevInitials('');
  };

  const handleDeleteReview = (id: number) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    updateLandingConfig({ reviews: updated });
  };

  // FAQ CRUD
  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    const newFaq: LandingFaq = { q: faqQ, a: faqA };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    updateLandingConfig({ faqs: updated });
    // reset
    setFaqQ('');
    setFaqA('');
  };

  const handleDeleteFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
    updateLandingConfig({ faqs: updated });
  };

  return (
    <div className="admin-landing-editor">
      <h1 className="admin-page-title">Editor da Landing Page</h1>
      <p className="admin-page-desc">Altere as seções de cabeçalho, hero, depoimentos, FAQs e rodapé da página inicial.</p>

      {/* Editor Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        
        {/* HERO SECTION EDITOR */}
        <div style={{ background: '#110b25', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#fff', fontSize: '18px', fontWeight: '800' }}>Configurar Hero Banner</h3>
          <form onSubmit={handleSaveHero}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                <label>Título Principal</label>
                <input type="text" className="admin-input" value={heroTitle} onChange={e => setHeroTitle(e.target.value)} required />
              </div>
              <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                <label>Subtítulo / Descrição</label>
                <textarea className="admin-textarea" value={heroSub} onChange={e => setHeroSub(e.target.value)} rows={2} required />
              </div>
              <div className="admin-form-group">
                <label>Texto Botão Primário</label>
                <input type="text" className="admin-input" value={heroBtn1} onChange={e => setHeroBtn1(e.target.value)} required />
              </div>
              <div className="admin-form-group">
                <label>Texto Botão Secundário</label>
                <input type="text" className="admin-input" value={heroBtn2} onChange={e => setHeroBtn2(e.target.value)} required />
              </div>
              <div className="admin-form-group">
                <label>Tag Badge Flutuante</label>
                <input type="text" className="admin-input" value={heroBadge} onChange={e => setHeroBadge(e.target.value)} required />
              </div>
              <div className="admin-form-group">
                <label>URL do Vídeo MP4 (mocked)</label>
                <input type="text" className="admin-input" value={heroVideo} onChange={e => setHeroVideo(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="admin-btn">
              <Save size={16} /> Salvar Seção Hero
            </button>
          </form>
        </div>

        {/* REVIEWS SECTION CRUD */}
        <div style={{ background: '#110b25', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#fff', fontSize: '18px', fontWeight: '800' }}>Depoimentos e Avaliações</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {/* Add Review */}
            <form onSubmit={handleAddReview} style={{ background: 'rgba(0,0,0,0.15)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', color: '#fff' }}>Adicionar Depoimento</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div className="admin-form-group">
                  <label>Nome do Usuário</label>
                  <input type="text" className="admin-input" style={{ padding: '8px 12px' }} value={revName} onChange={e => setRevName(e.target.value)} placeholder="Ex: Thay_IMVU" required />
                </div>
                <div className="admin-form-group">
                  <label>Estrelas (1-5)</label>
                  <select className="admin-select" style={{ padding: '8px 12px' }} value={revStars} onChange={e => setRevStars(parseInt(e.target.value))}>
                    <option value={5}>5 Estrelas</option>
                    <option value={4}>4 Estrelas</option>
                    <option value={3}>3 Estrelas</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Iniciais do Avatar</label>
                  <input type="text" className="admin-input" style={{ padding: '8px 12px' }} value={revInitials} onChange={e => setRevInitials(e.target.value)} maxLength={2} placeholder="Ex: TY" />
                </div>
              </div>
              <div className="admin-form-group" style={{ marginBottom: '12px' }}>
                <label>Texto do Depoimento</label>
                <textarea className="admin-textarea" style={{ minHeight: '60px' }} value={revText} onChange={e => setRevText(e.target.value)} placeholder="Escreva a avaliação..." required />
              </div>
              <button type="submit" className="admin-btn" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <Plus size={14} /> Adicionar Depoimento
              </button>
            </form>

            {/* List Reviews */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Depoimentos Cadastrados:</label>
              {reviews.map(r => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#0f0a22', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: '#fff' }}>
                      {r.initials}
                    </div>
                    <div>
                      <span style={{ fontWeight: '800', color: '#fff', fontSize: '13px' }}>{r.name}</span>
                      <div style={{ display: 'flex', color: 'var(--brand-accent)', gap: '2px', marginTop: '2px' }}>
                        {Array.from({ length: r.stars }).map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                      </div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>{r.text}</p>
                    </div>
                  </div>
                  <button type="button" className="admin-btn admin-btn--danger" style={{ padding: '6px' }} onClick={() => handleDeleteReview(r.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs CRUD */}
        <div style={{ background: '#110b25', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#fff', fontSize: '18px', fontWeight: '800' }}>Perguntas Frequentes (FAQ)</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {/* Add FAQ */}
            <form onSubmit={handleAddFaq} style={{ background: 'rgba(0,0,0,0.15)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', color: '#fff' }}>Adicionar Pergunta</h4>
              <div className="admin-form-group" style={{ marginBottom: '12px' }}>
                <label>Pergunta</label>
                <input type="text" className="admin-input" value={faqQ} onChange={e => setFaqQ(e.target.value)} placeholder="Ex: O envio é imediato?" required />
              </div>
              <div className="admin-form-group" style={{ marginBottom: '12px' }}>
                <label>Resposta</label>
                <textarea className="admin-textarea" style={{ minHeight: '60px' }} value={faqA} onChange={e => setFaqA(e.target.value)} placeholder="Escreva a resposta..." required />
              </div>
              <button type="submit" className="admin-btn" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <Plus size={14} /> Adicionar Pergunta
              </button>
            </form>

            {/* List FAQs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Perguntas Cadastradas:</label>
              {faqs.map((f, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '14px 16px', background: '#0f0a22', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <span style={{ fontWeight: '800', color: '#fff', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{f.q}</span>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{f.a}</p>
                  </div>
                  <button type="button" className="admin-btn admin-btn--danger" style={{ padding: '6px' }} onClick={() => handleDeleteFaq(index)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER SECTION EDITOR */}
        <div style={{ background: '#110b25', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#fff', fontSize: '18px', fontWeight: '800' }}>Configurar Rodapé</h3>
          <form onSubmit={handleSaveFooter}>
            <div className="admin-form-group">
              <label>Nome do Logo do Rodapé</label>
              <input type="text" className="admin-input" value={footerLogo} onChange={e => setFooterLogo(e.target.value)} required />
            </div>
            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
              <label>Descrição do Rodapé</label>
              <textarea className="admin-textarea" value={footerText} onChange={e => setFooterText(e.target.value)} rows={3} required />
            </div>
            <button type="submit" className="admin-btn">
              <Save size={16} /> Salvar Rodapé
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
