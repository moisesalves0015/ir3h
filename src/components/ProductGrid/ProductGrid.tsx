import { useNavigate } from 'react-router-dom';
import './ProductGrid.css';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../data/products';

interface ProductGridProps {
  title: string;
  products: Product[];
  columns?: 2 | 3;
  onBuy?: (product: Product) => void;
  viewMoreLink?: string;
}

export default function ProductGrid({ title, products, columns = 2, onBuy, viewMoreLink }: ProductGridProps) {
  const navigate = useNavigate();

  return (
    <section className="pgrid-section" aria-label={title}>
      <div className="section-header">
        <span className="section-title">{title}</span>
        {viewMoreLink && (
          <button className="section-link" onClick={() => navigate(viewMoreLink)}>
            Ver mais <ChevronRight size={14} />
          </button>
        )}
      </div>
      <div className={`pgrid pgrid--col${columns}`}>
        {products.map((p, i) => (
          <div key={p.id} style={{ animationDelay: `${i * 60}ms` }}>
            <ProductCard product={p} variant="grid" onBuy={onBuy} />
          </div>
        ))}
      </div>
    </section>
  );
}
