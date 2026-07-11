import { useRef, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './SearchBar.css';
import { Search, X, Clock, TrendingUp } from 'lucide-react';

const IMVU_SUGGESTIONS = [
  '10k créditos', '50k créditos', 'VIP Diamond', 'Access Pass',
  'AP', 'VIP Gold', 'combo créditos', 'rooms', 'nude', '100k créditos',
];

const HISTORY_KEY = 'ir3h_search_history_v1';

const getHistory = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
  } catch {
    return [];
  }
};

const saveHistory = (query: string, prev: string[]) => {
  const updated = [query, ...prev.filter(q => q !== query)].slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState<string[]>(getHistory);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const doSearch = (q: string) => {
    const trimmed = q.trim().slice(0, 100);
    if (!trimmed) return;
    saveHistory(trimmed, history);
    setHistory(getHistory());
    navigate(`/busca?q=${encodeURIComponent(trimmed)}`);
    setFocused(false);
    inputRef.current?.blur();
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') doSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const showDropdown = focused;

  return (
    <div className="search-wrap" role="search">
      <div className={`search-bar ${focused ? 'search-bar--focused' : ''}`}>
        <button
          className="search-bar__icon-btn"
          aria-label="Pesquisar"
          onClick={() => doSearch(query)}
        >
          <Search className="search-bar__icon" size={15} />
        </button>
        <input
          ref={inputRef}
          className="search-bar__input"
          type="search"
          autoComplete="off"
          placeholder="Buscar créditos, VIP, AP, combos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 180)}
          onKeyDown={handleKey}
          aria-label="Campo de busca"
        />
        {query ? (
          <button className="search-bar__clear" onClick={clearSearch} aria-label="Limpar busca">
            <X size={14} />
          </button>
        ) : null}
      </div>

      {showDropdown && (
        <div className="search-dropdown" role="listbox" aria-label="Sugestões de busca">
          {/* History */}
          {history.length > 0 && (
            <div className="search-dropdown__section">
              <p className="search-dropdown__label">
                <Clock size={11} /> Buscas recentes
              </p>
              {history.map(h => (
                <button
                  key={h}
                  className="search-chip search-chip--history"
                  role="option"
                  onMouseDown={() => { setQuery(h); doSearch(h); }}
                >
                  {h}
                </button>
              ))}
            </div>
          )}

          {/* Trending */}
          <div className="search-dropdown__section">
            <p className="search-dropdown__label">
              <TrendingUp size={11} /> Mais buscados
            </p>
            <div className="search-dropdown__chips">
              {IMVU_SUGGESTIONS.map(s => (
                <button
                  key={s}
                  className="search-chip"
                  role="option"
                  onMouseDown={() => { setQuery(s); doSearch(s); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
