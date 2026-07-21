import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const { settings, updateSettings } = useApp();

  const [siteName, setSiteName] = useState(settings.siteName);
  const [logoText, setLogoText] = useState(settings.logoText);
  const [faviconUrl, setFaviconUrl] = useState(settings.faviconUrl);
  const [seoTitle, setSeoTitle] = useState(settings.seoTitle);
  const [seoDescription, setSeoDescription] = useState(settings.seoDescription);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl);
  const [facebookUrl, setFacebookUrl] = useState(settings.facebookUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      siteName,
      logoText,
      faviconUrl,
      seoTitle,
      seoDescription,
      whatsappNumber,
      instagramUrl,
      facebookUrl,
    });
  };

  return (
    <div className="admin-settings-page">
      <h1 className="admin-page-title">Configurações Gerais</h1>
      <p className="admin-page-desc">Ajuste os parâmetros globais do site, SEO, Favicon e Links de atendimento.</p>

      <form onSubmit={handleSubmit} style={{ background: '#110b25', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          
          <h3 style={{ gridColumn: 'span 2', margin: '0 0 10px 0', color: '#fff', fontSize: '16px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
            Aparência & Identidade
          </h3>

          <div className="admin-form-group">
            <label>Nome do Site</label>
            <input type="text" className="admin-input" value={siteName} onChange={e => setSiteName(e.target.value)} required />
          </div>

          <div className="admin-form-group">
            <label>Texto do Logotipo (Logo)</label>
            <input type="text" className="admin-input" value={logoText} onChange={e => setLogoText(e.target.value)} required />
          </div>

          <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
            <label>Favicon URL (Caminho da imagem)</label>
            <input type="text" className="admin-input" value={faviconUrl} onChange={e => setFaviconUrl(e.target.value)} required />
          </div>

          <h3 style={{ gridColumn: 'span 2', margin: '20px 0 10px 0', color: '#fff', fontSize: '16px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
            SEO Global & Meta Tags
          </h3>

          <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
            <label>Título Padrão SEO</label>
            <input type="text" className="admin-input" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} required />
          </div>

          <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
            <label>Descrição Meta SEO</label>
            <textarea className="admin-textarea" value={seoDescription} onChange={e => setSeoDescription(e.target.value)} rows={3} required />
          </div>

          <h3 style={{ gridColumn: 'span 2', margin: '20px 0 10px 0', color: '#fff', fontSize: '16px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
            Canais de Atendimento & Redes
          </h3>

          <div className="admin-form-group">
            <label>WhatsApp de Vendas (com DDI/DDD)</label>
            <input type="text" className="admin-input" value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} placeholder="Ex: 5527988003025" required />
          </div>

          <div className="admin-form-group">
            <label>Instagram URL</label>
            <input type="url" className="admin-input" value={instagramUrl} onChange={e => setInstagramUrl(e.target.value)} placeholder="Ex: https://instagram.com/ir3h" />
          </div>

          <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
            <label>Facebook URL</label>
            <input type="url" className="admin-input" value={facebookUrl} onChange={e => setFacebookUrl(e.target.value)} placeholder="Ex: https://facebook.com/ir3h" />
          </div>

        </div>

        <button type="submit" className="admin-btn" style={{ width: '100%', justifyContent: 'center', height: '48px' }}>
          <Save size={18} style={{ marginRight: '6px' }} /> Salvar Configurações Gerais
        </button>
      </form>
    </div>
  );
}
