import { useNavigate } from 'react-router-dom';
import './CategoryGrid.css';
import { ChevronRight, Gem, Crown, Unlock, Gift, Home, Flame, Wrench } from 'lucide-react';
import { categories } from '../../data/mockData';

const getCategoryIcon = (id: string) => {
  const iconColor = '#db2777'; // Pink color standardized for all icons
  switch (id) {
    case 'credits': return <Gem size={20} style={{ color: iconColor }} />;
    case 'vip':     return <Crown size={20} style={{ color: iconColor }} />;
    case 'ap':      return <Unlock size={20} style={{ color: iconColor }} />;
    case 'rooms':   return <Home size={20} style={{ color: iconColor }} />;
    case 'nude':    return <Flame size={20} style={{ color: iconColor }} />;
    case 'combos':  return <Gift size={20} style={{ color: iconColor }} />;
    case 'service': return <Wrench size={20} style={{ color: iconColor }} />;
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
          return (
            <button
              key={cat.id}
              className="cat-item"
              onClick={() => navigate(`/categoria/${cat.id}`)}
              aria-label={`Ver ${cat.label}`}
            >
              <span className="cat-icon">{getCategoryIcon(cat.id)}</span>
              <span className="cat-label">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
