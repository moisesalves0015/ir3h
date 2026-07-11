import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import './SearchPage.css';
import { Search, X, TrendingUp, ArrowLeft } from 'lucide-react';
import { searchProducts, allProducts } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';

const POPULAR_TERMS = [
  '10k créditos', '50k créditos', 'VIP Diamond', 'Access Pass',
  'VIP Gold', 'combo', 'rooms', 'nude ap', '100k',
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get('q') ?? '';
  const [inputVal, setInputVal] = useState(q);

  useEffect(() => {
    setInputVal(q);
    document.title = q ? `"${q}" — IR3H Store` : 'Buscar — IR3H Store';
  }, [q]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return searchProducts(q);
  }, [q]);

  const doSearch = (term: string) => {
    const t = term.trim().slice(0, 100);
    if (!t) return;
    setSearchParams({ q: t });
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') doSearch(inputVal);
  };

  return (
    <div className="search-page">
      {/* Header */}
      <div className="search-page__header">
        <button
          className="search-page__back"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="search-page__input-wrap">
          <Search size={15} className="search-page__icon" />
          <input
            autoFocus
            type="search"
            className="search-page__input"
            placeholder="Buscar créditos, VIP, AP..."
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Campo de busca"
          />
          {inputVal && (
            <button
              className="search-page__clear"
              onClick={() => { setInputVal(''); setSearchParams({}); }}
              aria-label="Limpar busca"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          className="search-page__search-btn"
          onClick={() => doSearch(inputVal)}
        >
          Buscar
        </button>
      </div>

      <div className="search-page__body">
        {!q ? (
          /* No query — show popular */
          <div className="search-page__popular">
            <div className="search-page__section-label">
              <TrendingUp size={14} />
              Mais buscados
            </div>
            <div className="search-page__popular-chips">
              {POPULAR_TERMS.map(term => (
                <button
                  key={term}
                  className="search-page__chip"
                  onClick={() => doSearch(term)}
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="search-page__section-label" style={{ marginTop: '24px' }}>
              💎 Todos os produtos
            </div>
            <div className="pgrid pgrid--col2">
              {allProducts.slice(0, 8).map(p => (
                <ProductCard key={p.id} product={p} variant="grid" />
              ))}
            </div>
          </div>
        ) : results.length > 0 ? (
          /* Results */
          <div className="search-page__results">
            <p className="search-page__count">
              {results.length} resultado{results.length !== 1 ? 's' : ''} para "<strong>{q}</strong>"
            </p>
            <div className="pgrid pgrid--col2">
              {results.map((p, i) => (
                <div key={p.id} style={{ animationDelay: `${i * 40}ms` }}>
                  <ProductCard product={p} variant="grid" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* No results */
          <div className="search-page__no-results">
            <span style={{ fontSize: '48px' }}>🔍</span>
            <h3>Nenhum resultado para "{q}"</h3>
            <p>Tente buscar por: créditos, VIP, AP, combos, rooms...</p>
            <div className="search-page__popular-chips">
              {POPULAR_TERMS.slice(0, 5).map(term => (
                <button key={term} className="search-page__chip" onClick={() => doSearch(term)}>
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
