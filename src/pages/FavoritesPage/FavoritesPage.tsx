import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './FavoritesPage.css';
import { Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { getProductById } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites } = useApp();

  useEffect(() => {
    document.title = 'Meus Favoritos — IR3H Store';
  }, []);

  const favProducts = favorites
    .map(id => getProductById(id))
    .filter(Boolean) as ReturnType<typeof getProductById>[];

  return (
    <div className="favorites-page">
      <div className="favorites-page__header">
        <h1 className="favorites-page__title">
          <Heart size={20} style={{ color: 'var(--brand-primary)' }} />
          Meus Favoritos
        </h1>
        <span className="favorites-page__count">{favProducts.length} itens</span>
      </div>

      {favProducts.length === 0 ? (
        <div className="favorites-page__empty">
          <Heart size={64} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
          <h2>Nenhum favorito ainda</h2>
          <p>Toque no ❤️ em qualquer produto para salvá-lo aqui.</p>
          <button
            className="favorites-page__explore-btn"
            onClick={() => navigate('/')}
          >
            <ShoppingBag size={16} />
            Explorar Produtos
          </button>
        </div>
      ) : (
        <div className="pgrid pgrid--col2" style={{ padding: '0 var(--space-3)' }}>
          {favProducts.map(p => p && (
            <ProductCard key={p.id} product={p} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
