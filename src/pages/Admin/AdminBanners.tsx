import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Banner } from '../../data/mockData';

export default function AdminBanners() {
  const { banners, addBanner, updateBanner, deleteBanner } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Form states
  const [label, setLabel] = useState('');
  const [image, setImage] = useState('');
  const [bgGradient, setBgGradient] = useState('linear-gradient(135deg,#5b21b6 0%,#db2777 100%)');

  const openAddModal = () => {
    setEditingBanner(null);
    setLabel('');
    setImage('/images/cover_all.png');
    setBgGradient('linear-gradient(135deg,#5b21b6 0%,#db2777 100%)');
    setIsModalOpen(true);
  };

  const openEditModal = (b: Banner) => {
    setEditingBanner(b);
    setLabel(b.label);
    setImage(b.image);
    setBgGradient(b.bgGradient);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      updateBanner(editingBanner.id, { label, image, bgGradient });
    } else {
      addBanner({ label, image, bgGradient });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="admin-banners-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h1 className="admin-page-title">Banners Promocionais</h1>
        <button className="admin-btn" onClick={openAddModal}>
          <Plus size={18} /> Novo Banner
        </button>
      </div>
      <p className="admin-page-desc">Gerencie os banners rotativos exibidos no topo da loja oficial (`/ir3h-store`).</p>

      {/* Banners List */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título / Label</th>
              <th>Imagem</th>
              <th>Degradê do Fundo</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: '700' }}>#{b.id}</td>
                <td style={{ fontWeight: '800', color: '#fff' }}>{b.label}</td>
                <td>
                  <img src={b.image} alt={b.label} style={{ width: '80px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} />
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '16px', borderRadius: '4px', background: b.bgGradient, border: '1px solid rgba(255,255,255,0.1)' }} />
                    <code style={{ fontSize: '11px' }}>{b.bgGradient}</code>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      className="admin-btn admin-btn--secondary"
                      style={{ padding: '6px' }}
                      title="Editar"
                      onClick={() => openEditModal(b)}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="admin-btn admin-btn--danger"
                      style={{ padding: '6px' }}
                      title="Excluir"
                      onClick={() => {
                        if (confirm(`Remover o banner "${b.label}"?`)) {
                          deleteBanner(b.id);
                        }
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Banner Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '550px' }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{editingBanner ? 'Editar Banner' : 'Adicionar Banner'}</h3>
              <button className="admin-modal__close" onClick={() => setIsModalOpen(false)}>Fechar</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal__body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="admin-form-group">
                  <label>Título / Texto do Banner</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Ex: Desconto em VIP Diamond"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>URL da Imagem Haste</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Ex: /images/vip.png"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Degradê de Fundo CSS (Gradient)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={bgGradient}
                    onChange={(e) => setBgGradient(e.target.value)}
                    placeholder="Ex: linear-gradient(135deg, #1e3a8a, #8b5cf6)"
                    required
                  />
                  <div style={{ marginTop: '8px', padding: '16px', borderRadius: '8px', background: bgGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontWeight: '700', fontSize: '13px', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Pré-visualização do Fundo</span>
                  </div>
                </div>
              </div>

              <div className="admin-modal__footer">
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="admin-btn">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
