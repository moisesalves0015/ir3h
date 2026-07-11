import { useNavigate } from 'react-router-dom';
import './CategoryGrid.css';
import { ChevronRight, Gem, Crown, Unlock, Gift, Home, Flame } from 'lucide-react';
import { categories } from '../../data/mockData';
import { getProductsByCategory } from '../../data/products';
import type { ProductCategory } from '../../data/products';

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'credits': return <Gem size={20} style={{ color: '#fbbf24' }} />;
    case 'vip':     return <Crown size={20} style={{ color: '#a78bfa' }} />;
    case 'ap':      return <Unlock size={20} style={{ color: '#db2777' }} />;
    case 'rooms':   return <Home size={20} style={{ color: '#60a5fa' }} />;
    case 'nude':    return <Flame size={20} style={{ color: '#ec4899' }} />;
    case 'combos':  return <Gift size={20} style={{ color: '#a78bfa' }} />;
    default:        return null;
  }
};

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <div className="cat-section">
      <div className="section-header">
        <span className="section-title">Categorias</span>
        <button className="section-link" onClick={() => navigate('/categoria')}>
          Ver todas <ChevronRight size={14} />
        </button>
      </div>
      <div className="cat-grid">
        {categories.map(cat => {
          const count = getProductsByCategory(cat.id as ProductCategory).length;
          return (
            <button
              key={cat.id}
              className="cat-item"
              onClick={() => navigate(`/categoria/${cat.id}`)}
              aria-label={`Ver ${cat.label} — ${count} produtos`}
            >
              <span className="cat-icon">{getCategoryIcon(cat.id)}</span>
              <span className="cat-label">{cat.label}</span>
              <span className="cat-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
