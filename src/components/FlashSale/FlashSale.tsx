import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlashSale.css';
import { Zap, ChevronRight } from 'lucide-react';
import { getFlashSaleProducts } from '../../data/products';
import type { Product } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';

function useCountdown(targetSeconds: number) {
  const [remaining, setRemaining] = useState(targetSeconds);
  useEffect(() => {
    const id = setInterval(() => setRemaining(r => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  return { h, m, s };
}

function Digit({ value }: { value: number }) {
  return (
    <span className="flash-digit">{String(value).padStart(2, '0')}</span>
  );
}

interface FlashSaleProps {
  onBuy?: (product: Product) => void;
}

export default function FlashSale({ onBuy }: FlashSaleProps) {
  const navigate = useNavigate();
  const { h, m, s } = useCountdown(4 * 3600 + 23 * 60 + 47);
  const products = getFlashSaleProducts();

  return (
    <div className="flash-section">
      <div className="flash-header">
        <div className="flash-header__left">
          <Zap size={16} fill="currentColor" className="flash-zap" />
          <span className="flash-title">Ofertas Relâmpago</span>
          <div className="flash-timer" role="timer" aria-label="Tempo restante da oferta">
            <Digit value={h} /><span className="flash-colon">:</span>
            <Digit value={m} /><span className="flash-colon">:</span>
            <Digit value={s} />
          </div>
        </div>
        <button
          className="flash-see-all"
          onClick={() => navigate('/busca?q=oferta')}
          aria-label="Ver todas as ofertas relâmpago"
        >
          Ver tudo <ChevronRight size={13} />
        </button>
      </div>

      <div className="flash-products scroll-x" style={{ padding: '0 var(--space-3) var(--space-3)' }}>
        {products.map(product => (
          <div key={product.id} className="flash-product-wrap">
            <ProductCard product={product} variant="flash" onBuy={onBuy} />
          </div>
        ))}
      </div>
    </div>
  );
}
