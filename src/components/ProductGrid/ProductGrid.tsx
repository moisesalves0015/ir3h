import './ProductGrid.css';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../data/mockData';

interface ProductGridProps {
  title: string;
  products: Product[];
  columns?: 2 | 3;
  onBuy?: (product: Product) => void;
}

export default function ProductGrid({ title, products, columns = 2, onBuy }: ProductGridProps) {
  return (
    <div className="pgrid-section">
      <div className="section-header">
        <span className="section-title">{title}</span>
        <button className="section-link">
          Ver mais <ChevronRight size={14} />
        </button>
      </div>
      <div className={`pgrid pgrid--col${columns}`}>
        {products.map((p, i) => (
          <div key={p.id} style={{ animationDelay: `${i * 60}ms` }}>
            <ProductCard product={p} variant="grid" onBuy={onBuy} />
          </div>
        ))}
      </div>
    </div>
  );
}
