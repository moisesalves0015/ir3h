import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Plus, Edit2, Copy, Trash2, Search } from 'lucide-react';
import type { Product, ProductCategory, DeliveryMode } from '../../data/products';

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, duplicateProduct, categories } = useApp();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [category, setCategory] = useState<ProductCategory>('credits');
  const [price, setPrice] = useState('0.00');
  const [originalPrice, setOriginalPrice] = useState('0.00');
  const [discount, setDiscount] = useState('0');
  const [stock, setStock] = useState('50');
  const [deliveryTime, setDeliveryTime] = useState('5 a 15 minutos');
  const [deliveryModes, setDeliveryModes] = useState<DeliveryMode[]>(['gift', 'transfer']);
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('/images/credits.png');
  const [featured, setFeatured] = useState(false);
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setTitle('');
    setSlug('');
    setShortDesc('');
    setLongDesc('');
    setCategory('credits');
    setPrice('0.00');
    setOriginalPrice('0.00');
    setDiscount('0');
    setStock('50');
    setDeliveryTime('5 a 15 minutos');
    setDeliveryModes(['gift', 'transfer']);
    setTags('');
    setImage('/images/credits.png');
    setFeatured(false);
    setIsFlashSale(false);
    setIsNewArrival(false);
    setIsRecommended(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setSlug(p.slug);
    setShortDesc(p.shortDescription);
    setLongDesc(p.longDescription);
    setCategory(p.category);
    setPrice(p.price.toString());
    setOriginalPrice(p.originalPrice?.toString() || '0.00');
    setDiscount(p.discount?.toString() || '0');
    setStock(p.stock?.toString() || '0');
    setDeliveryTime(p.deliveryTime);
    setDeliveryModes(p.deliveryModes || []);
    setTags(p.tags?.join(', ') || '');
    setImage(p.image);
    setFeatured(!!p.featured);
    setIsFlashSale(!!p.isFlashSale);
    setIsNewArrival(!!p.isNewArrival);
    setIsRecommended(!!p.isRecommended);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload: Omit<Product, 'id'> = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      shortDescription: shortDesc,
      longDescription: longDesc,
      category,
      price: parseFloat(price) || 0,
      originalPrice: parseFloat(originalPrice) || undefined,
      discount: parseInt(discount) || undefined,
      stock: parseInt(stock) || 0,
      deliveryTime,
      deliveryModes,
      image,
      featured,
      isFlashSale,
      isNewArrival,
      isRecommended,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviews: editingProduct ? editingProduct.reviews : 0,
      sold: editingProduct ? editingProduct.sold : '0',
      reviews_data: editingProduct ? editingProduct.reviews_data : [],
      benefits: editingProduct?.benefits || [
        { icon: '⚡', text: 'Entrega rápida garantida' },
        { icon: '🔒', text: 'Compra 100% segura' }
      ],
      relatedIds: editingProduct ? editingProduct.relatedIds : [],
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }
    setIsModalOpen(false);
  };

  const handleToggleDeliveryMode = (mode: DeliveryMode) => {
    if (deliveryModes.includes(mode)) {
      setDeliveryModes(deliveryModes.filter(m => m !== mode));
    } else {
      setDeliveryModes([...deliveryModes, mode]);
    }
  };

  return (
    <div className="admin-products-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h1 className="admin-page-title">Gerenciar Catálogo</h1>
        <button className="admin-btn" onClick={openAddModal}>
          <Plus size={18} /> Novo Produto
        </button>
      </div>
      <p className="admin-page-desc">Adicione, edite ou remova produtos cadastrados na IR3H Store.</p>

      {/* Actions Toolbar */}
      <div className="admin-actions-bar">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            className="admin-search-input"
            style={{ paddingLeft: '38px' }}
            placeholder="Buscar por nome ou slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Exibindo {filteredProducts.length} de {products.length} produtos
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Preço Promo</th>
              <th>Estoque</th>
              <th>Badge</th>
              <th>Destaque</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: '700' }}>#{p.id}</td>
                <td style={{ fontWeight: '800', color: '#fff' }}>{p.title}</td>
                <td>
                  <span className="admin-badge admin-badge--user">{p.category}</span>
                </td>
                <td style={{ color: 'var(--brand-primary-light)', fontWeight: '700' }}>R$ {p.price.toFixed(2)}</td>
                <td>{p.originalPrice ? `R$ ${p.originalPrice.toFixed(2)}` : '-'}</td>
                <td>
                  <span className={`admin-badge ${(p.stock ?? 0) > 0 ? 'admin-badge--active' : 'admin-badge--inactive'}`}>
                    {(p.stock ?? 0) > 0 ? `${p.stock} un` : 'Sem Estoque'}
                  </span>
                </td>
                <td>
                  {p.badge ? <span className="admin-badge admin-badge--suspended">{p.badge}</span> : '-'}
                </td>
                <td>
                  {p.featured ? (
                    <span className="admin-badge admin-badge--active">Sim</span>
                  ) : (
                    <span className="admin-badge admin-badge--user">Não</span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      className="admin-btn admin-btn--secondary"
                      style={{ padding: '6px' }}
                      title="Editar"
                      onClick={() => openEditModal(p)}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="admin-btn admin-btn--secondary"
                      style={{ padding: '6px' }}
                      title="Duplicar"
                      onClick={() => duplicateProduct(p.id)}
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      className="admin-btn admin-btn--danger"
                      style={{ padding: '6px' }}
                      title="Excluir"
                      onClick={() => {
                        if (confirm(`Tem certeza que deseja excluir o produto "${p.title}"?`)) {
                          deleteProduct(p.id);
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

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '700px' }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h3>
              <button className="admin-modal__close" onClick={() => setIsModalOpen(false)}>Fechar</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal__body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Título do Produto</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: 50.000 Créditos IMVU"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Slug (URL amigável)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Ex: 50k-creditos-imvu"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Categoria</label>
                  <select
                    className="admin-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Preço Venda (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="admin-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Preço Original/Sem desconto (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="admin-input"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Desconto (%)</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Estoque Simulado</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Imagem (URL ou Caminho local)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Descrição Curta (Exibida em listagens)</label>
                  <textarea
                    className="admin-textarea"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    rows={2}
                    required
                  />
                </div>

                <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Descrição Completa (Detalhamento do produto)</label>
                  <textarea
                    className="admin-textarea"
                    value={longDesc}
                    onChange={(e) => setLongDesc(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Tempo de Entrega Estimado</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Tags (separadas por vírgula)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="credito, imvu, popular"
                  />
                </div>

                <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Opções de Entrega Habilitadas</label>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {(['gift', 'transfer', 'login', 'gift_or_transfer'] as DeliveryMode[]).map((mode) => (
                      <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={deliveryModes.includes(mode)}
                          onChange={() => handleToggleDeliveryMode(mode)}
                        />
                        <span>
                          {mode === 'gift' ? 'Presente (Gift)' : mode === 'transfer' ? 'Transferência' : mode === 'login' ? 'Login' : 'Presente ou Transf.'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Flags grid */}
                <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                    <span>Destaque principal</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={isFlashSale} onChange={(e) => setIsFlashSale(e.target.checked)} />
                    <span>Oferta Relâmpago (Flash Sale)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)} />
                    <span>Novidade (New Arrival)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={isRecommended} onChange={(e) => setIsRecommended(e.target.checked)} />
                    <span>Recomendado (Para Você)</span>
                  </label>
                </div>
              </div>

              <div className="admin-modal__footer">
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="admin-btn">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
