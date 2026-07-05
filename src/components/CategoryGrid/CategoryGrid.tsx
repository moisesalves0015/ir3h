import './CategoryGrid.css';
import { ChevronRight, Gem, Crown, Unlock, Gift, Home, Flame } from 'lucide-react';
import { categories } from '../../data/mockData';

interface CategoryGridProps {
  onSelect?: (id: string) => void;
}

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

export default function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <div className="cat-section">
      <div className="section-header">
        <span className="section-title">Categorias</span>
        <button className="section-link">
          Ver todas <ChevronRight size={14} />
        </button>
      </div>
      <div className="cat-grid">
        {categories.map(cat => (
          <button
            key={cat.id}
            className="cat-item"
            onClick={() => onSelect?.(cat.id)}
          >
            <span className="cat-icon">
              {getCategoryIcon(cat.id)}
            </span>
            <span className="cat-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
