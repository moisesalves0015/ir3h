import { useParams, useNavigate } from 'react-router-dom';
import './CategoryPage.css';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Grid3x3, List } from 'lucide-react';
import { getProductsByCategory, allProducts, categoryMeta } from '../../data/products';
import type { ProductCategory } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';

type SortOption = 'popular' | 'price_asc' | 'price_desc' | 'rating' | 'new';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Mais Populares' },
  { value: 'price_asc', label: 'Menor Preço' },
  { value: 'price_desc', label: 'Maior Preço' },
  { value: 'rating', label: 'Melhor Avaliados' },
  { value: 'new', label: 'Novidades' },
];

const ALL_CATEGORIES = [
  { id: 'credits', label: 'Créditos' },
  { id: 'vip', label: 'VIP' },
  { id: 'ap', label: 'AP' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'nude', label: 'Nude' },
  { id: 'combos', label: 'Combos' },
];

export default function CategoryPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortOption>('popular');
  const [showSort, setShowSort] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 1>(2);

  const meta = id ? categoryMeta[id] : null;
  const products = useMemo(() => {
    const base = id
      ? getProductsByCategory(id as ProductCategory)
      : allProducts;

    return [...base].sort((a, b) => {
      switch (sort) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'new': return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        default: return parseInt(b.sold.replace(/\D/g, '') || '0') - parseInt(a.sold.replace(/\D/g, '') || '0');
      }
    });
  }, [id, sort]);

  const activeSortLabel = sortOptions.find(s => s.value === sort)?.label ?? 'Ordenar';

  return (
    <div className="cat-page">
      {/* Unified Hero cover banner with overlay title and description */}
      <div className="cat-page__hero">
        <img src={meta ? meta.image : '/images/cover_all.png'} alt={meta ? meta.label : 'IR3H Store'} className="cat-page__hero-img" />
        <div className="cat-page__hero-overlay">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h2 className="cat-page__hero-title" style={{ fontSize: 'var(--font-xl)', fontWeight: '900', color: '#ffffff' }}>
              {meta ? `${meta.emoji} ${meta.label}` : '💎 Todas as Categorias'}
            </h2>
            <p className="cat-page__description">
              {meta ? meta.description : 'Explore todos os pacotes de Créditos, Assinaturas VIP, Access Pass (AP), Salas, Combos e Serviços com entrega rápida.'}
            </p>
          </div>
        </div>
      </div>

      {/* Category pills when viewing all */}
      {!id && (
        <div className="cat-page__pills scroll-x" style={{ padding: '0 var(--space-3) var(--space-3)' }}>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className="cat-page__pill"
              onClick={() => navigate(`/categoria/${cat.id}`)}
            >
              {categoryMeta[cat.id]?.emoji} {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Controls bar */}
      <div className="cat-page__controls">
        <span className="cat-page__count">{products.length} produtos</span>
        <div className="cat-page__controls-right">
          <div className="cat-page__sort-wrap">
            <button
              className="cat-page__control-btn"
              onClick={() => setShowSort(s => !s)}
              aria-expanded={showSort}
              aria-haspopup="listbox"
            >
              <ArrowUpDown size={14} />
              <span>{activeSortLabel}</span>
            </button>
            {showSort && (
              <div className="cat-page__sort-dropdown" role="listbox">
                {sortOptions.map(opt => (
                  <button
                    key={opt.value}
                    role="option"
                    aria-selected={sort === opt.value}
                    className={`cat-page__sort-option ${sort === opt.value ? 'active' : ''}`}
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="cat-page__control-btn cat-page__control-btn--icon"
            onClick={() => setGridCols(c => c === 2 ? 1 : 2)}
            aria-label={gridCols === 2 ? 'Visualização em lista' : 'Visualização em grade'}
          >
            {gridCols === 2 ? <List size={16} /> : <Grid3x3 size={16} />}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="cat-page__empty">
          <SlidersHorizontal size={48} style={{ color: 'var(--text-muted)' }} />
          <p>Nenhum produto encontrado nesta categoria.</p>
        </div>
      ) : (
        <div className={`pgrid pgrid--col${gridCols}`} style={{ padding: '0 var(--space-3) var(--space-3)' }}>
          {products.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 40}ms` }}>
              <ProductCard product={p} variant="grid" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
