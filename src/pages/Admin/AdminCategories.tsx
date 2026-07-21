import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Category } from '../../data/mockData';

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form states
  const [id, setId] = useState('');
  const [label, setLabel] = useState('');
  const [emoji, setEmoji] = useState('💎');
  const [color, setColor] = useState('#312e81');

  const openAddModal = () => {
    setEditingCategory(null);
    setId('');
    setLabel('');
    setEmoji('💎');
    setColor('#312e81');
    setIsModalOpen(true);
  };

  const openEditModal = (c: Category) => {
    setEditingCategory(c);
    setId(c.id);
    setLabel(c.label);
    setEmoji(c.emoji);
    setColor(c.color);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, { label, emoji, color });
    } else {
      addCategory({ id, label, emoji, color });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="admin-categories-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h1 className="admin-page-title">Categorias</h1>
        <button className="admin-btn" onClick={openAddModal}>
          <Plus size={18} /> Nova Categoria
        </button>
      </div>
      <p className="admin-page-desc">Gerencie as categorias de produtos da loja.</p>

      {/* Categories Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Slug</th>
              <th>Nome da Categoria</th>
              <th>Emoji</th>
              <th>Cor Base</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: '700' }}><span className="admin-badge admin-badge--user">{c.id}</span></td>
                <td style={{ fontWeight: '800', color: '#fff' }}>{c.label}</td>
                <td style={{ fontSize: '20px' }}>{c.emoji}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: c.color, border: '1px solid rgba(255,255,255,0.1)' }} />
                    <code>{c.color}</code>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      className="admin-btn admin-btn--secondary"
                      style={{ padding: '6px' }}
                      title="Editar"
                      onClick={() => openEditModal(c)}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="admin-btn admin-btn--danger"
                      style={{ padding: '6px' }}
                      title="Excluir"
                      onClick={() => {
                        if (confirm(`Excluir a categoria "${c.label}"? Todos os produtos dessa categoria permanecerão, mas podem não ser listados.`)) {
                          deleteCategory(c.id);
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

      {/* Category Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '500px' }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</h3>
              <button className="admin-modal__close" onClick={() => setIsModalOpen(false)}>Fechar</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal__body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="admin-form-group">
                  <label>Identificador (ID / Slug)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Ex: credits, vip, ap"
                    disabled={!!editingCategory}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Nome Visível (Label)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Ex: Créditos"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Emoji Icon</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    maxLength={2}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Cor Personalizada (Hexadecimal)</label>
                  <input
                    type="color"
                    className="admin-input"
                    style={{ height: '42px', padding: '4px' }}
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                  />
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
