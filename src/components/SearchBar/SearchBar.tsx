import { useRef, useState } from 'react';
import './SearchBar.css';
import { Search, Mic, X } from 'lucide-react';

const suggestions = [
  'vestido floral', 'tênis branco', 'bolsa couro', 'calça jeans',
  'camiseta oversized', 'sandália verão', 'blazer feminino', 'shorts jeans',
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="search-wrap">
      <div className={`search-bar ${focused ? 'search-bar--focused' : ''}`}>
        <Search className="search-bar__icon" size={15} />
        <input
          ref={inputRef}
          className="search-bar__input"
          type="text"
          placeholder="Buscar produtos, marcas e mais..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
        />
        {query ? (
          <button className="search-bar__clear" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
            <X size={14} />
          </button>
        ) : (
          <button className="search-bar__mic"><Mic size={15} /></button>
        )}
      </div>

      {focused && !query && (
        <div className="search-suggestions">
          <p className="search-suggestions__label">🔥 Tendências</p>
          <div className="search-suggestions__chips">
            {suggestions.map(s => (
              <button key={s} className="search-chip" onClick={() => setQuery(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
