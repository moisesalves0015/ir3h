import { useState } from 'react';
import { useApp, type Showcase, type ShowcaseItem } from '../../contexts/AppContext';
import { Edit2, ToggleLeft, ToggleRight, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminShowcases() {
  const { showcases, updateShowcase } = useApp();
  const [selectedShowcase, setSelectedShowcase] = useState<Showcase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [label, setLabel] = useState('');
  const [status, setStatus] = useState(true);
  const [items, setItems] = useState<ShowcaseItem[]>([]);

  // Item form states
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemImg, setItemImg] = useState('');
  const [itemLink, setItemLink] = useState('');
  const [itemGenre, setItemGenre] = useState('');
  const [itemStream, setItemStream] = useState('');
  const [itemEmoji, setItemEmoji] = useState('📻');

  const openEditModal = (showcase: Showcase) => {
    setSelectedShowcase(showcase);
    setTitle(showcase.title);
    setSubtitle(showcase.subtitle);
    setLabel(showcase.label || '');
    setStatus(showcase.status);
    setItems([...showcase.items]);
    setIsAddingItem(false);
    setIsModalOpen(true);
  };

  const handleSaveShowcase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShowcase) return;

    updateShowcase(selectedShowcase.id, {
      title,
      subtitle,
      label,
      status,
      items,
    });
    setIsModalOpen(false);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ShowcaseItem = {
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
      name: itemName,
      description: itemDesc,
      imgUrl: itemImg || undefined,
      link: itemLink || undefined,
      genre: itemGenre || undefined,
      streamUrl: itemStream || undefined,
      emoji: itemEmoji || undefined,
    };

    setItems([...items, newItem]);
    setIsAddingItem(false);
    // Reset fields
    setItemName('');
    setItemDesc('');
    setItemImg('');
    setItemLink('');
    setItemGenre('');
    setItemStream('');
    setItemEmoji('📻');
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[nextIndex];
    newItems[nextIndex] = temp;
    setItems(newItems);
  };

  return (
    <div className="admin-showcases-page">
      <h1 className="admin-page-title">Gerenciar Vitrines</h1>
      <p className="admin-page-desc">Customize as vitrines promocionais (Salas, Lojas e Rádios) que aparecem na Landing Page.</p>

      {/* Showcases List */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Título / Nome</th>
              <th>Subtítulo</th>
              <th>Total Itens</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {showcases.map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: '700' }}><span className="admin-badge admin-badge--user">{s.id}</span></td>
                <td style={{ fontWeight: '800', color: '#fff' }}>{s.title}</td>
                <td>{s.subtitle}</td>
                <td>{s.items.length} itens</td>
                <td>
                  <span className={`admin-badge ${s.status ? 'admin-badge--active' : 'admin-badge--inactive'}`}>
                    {s.status ? 'Visível' : 'Oculto'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      className="admin-btn admin-btn--secondary"
                      style={{ padding: '6px 12px', fontSize: '13px' }}
                      onClick={() => openEditModal(s)}
                    >
                      <Edit2 size={13} style={{ marginRight: '4px' }} /> Configurar
                    </button>
                    <button
                      className="admin-btn admin-btn--secondary"
                      style={{ padding: '6px' }}
                      title={s.status ? 'Desativar vitrine' : 'Ativar vitrine'}
                      onClick={() => updateShowcase(s.id, { status: !s.status })}
                    >
                      {s.status ? <ToggleRight size={20} className="text-emerald-500" /> : <ToggleLeft size={20} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Showcase Modal */}
      {isModalOpen && selectedShowcase && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '750px' }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Configurar Vitrine: {selectedShowcase.title}</h3>
              <button className="admin-modal__close" onClick={() => setIsModalOpen(false)}>Fechar</button>
            </div>
            <form onSubmit={handleSaveShowcase}>
              <div className="admin-modal__body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label>Título Principal</label>
                    <input type="text" className="admin-input" value={title} onChange={e => setTitle(e.target.value)} required />
                  </div>
                  <div className="admin-form-group">
                    <label>Label Superior (Tag)</label>
                    <input type="text" className="admin-input" value={label} onChange={e => setLabel(e.target.value)} />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Subtítulo / Descrição da Seção</label>
                  <input type="text" className="admin-input" value={subtitle} onChange={e => setSubtitle(e.target.value)} required />
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Status da Seção:</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
                    <input type="checkbox" checked={status} onChange={e => setStatus(e.target.checked)} />
                    <span>Seção ativa e visível na Landing Page</span>
                  </label>
                </div>

                {/* Items Management */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ margin: 0, color: '#fff', fontSize: '15px', fontWeight: '800' }}>Itens Divulgados</h4>
                    {!isAddingItem && (
                      <button type="button" className="admin-btn" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setIsAddingItem(true)}>
                        <Plus size={14} /> Novo Item
                      </button>
                    )}
                  </div>

                  {/* Add item sub-form */}
                  {isAddingItem && (
                    <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                      <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#fff' }}>Adicionar Item à Vitrine</h5>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div className="admin-form-group">
                          <label>Nome / Título do Item</label>
                          <input type="text" className="admin-input" style={{ padding: '8px 12px' }} value={itemName} onChange={e => setItemName(e.target.value)} required />
                        </div>
                        <div className="admin-form-group">
                          <label>Descrição</label>
                          <input type="text" className="admin-input" style={{ padding: '8px 12px' }} value={itemDesc} onChange={e => setItemDesc(e.target.value)} required />
                        </div>

                        {selectedShowcase.id !== 'radio' ? (
                          <>
                            <div className="admin-form-group">
                              <label>URL Imagem de Capa</label>
                              <input type="text" className="admin-input" style={{ padding: '8px 12px' }} value={itemImg} onChange={e => setItemImg(e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                              <label>Link Destino / Redirecionamento</label>
                              <input type="text" className="admin-input" style={{ padding: '8px 12px' }} value={itemLink} onChange={e => setItemLink(e.target.value)} />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="admin-form-group">
                              <label>Gênero Musical</label>
                              <input type="text" className="admin-input" style={{ padding: '8px 12px' }} value={itemGenre} onChange={e => setItemGenre(e.target.value)} placeholder="Ex: Dance, Pop" />
                            </div>
                            <div className="admin-form-group">
                              <label>URL do Streaming de Áudio</label>
                              <input type="text" className="admin-input" style={{ padding: '8px 12px' }} value={itemStream} onChange={e => setItemStream(e.target.value)} placeholder="Link do áudio mp3/live" />
                            </div>
                            <div className="admin-form-group">
                              <label>Emoji Icon</label>
                              <input type="text" className="admin-input" style={{ padding: '8px 12px' }} value={itemEmoji} onChange={e => setItemEmoji(e.target.value)} maxLength={2} />
                            </div>
                          </>
                        )}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button type="button" className="admin-btn admin-btn--secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setIsAddingItem(false)}>Cancelar</button>
                        <button type="button" className="admin-btn" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={handleAddItem}>Adicionar Item</button>
                      </div>
                    </div>
                  )}

                  {/* Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {items.map((item, index) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#0f0a22', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                        <div>
                          <span style={{ fontWeight: '800', color: '#fff', fontSize: '14px' }}>{item.name}</span>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '12px' }}>{item.description}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button type="button" className="admin-btn admin-btn--secondary" style={{ padding: '4px' }} disabled={index === 0} onClick={() => moveItem(index, 'up')}>
                            <ArrowUp size={14} />
                          </button>
                          <button type="button" className="admin-btn admin-btn--secondary" style={{ padding: '4px' }} disabled={index === items.length - 1} onClick={() => moveItem(index, 'down')}>
                            <ArrowDown size={14} />
                          </button>
                          <button type="button" className="admin-btn admin-btn--danger" style={{ padding: '4px' }} onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="admin-modal__footer">
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="admin-btn">Salvar Vitrine</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
