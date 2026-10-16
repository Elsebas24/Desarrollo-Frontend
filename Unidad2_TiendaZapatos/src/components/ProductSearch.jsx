// src/components/ProductSearch.jsx
import { useState } from 'react';
import { Search, X } from 'lucide-react';

// Desafío 3: buscador de siluetas que se despliega bajo la barra de navegación
export default function ProductSearch({ products, activeProductId, onSelectProduct, onClose }) {
  const [query, setQuery] = useState('');

  const term = query.trim().toLowerCase();
  const results = products.filter((p) =>
    `${p.name} ${p.category}`.toLowerCase().includes(term)
  );

  return (
    <div className="absolute inset-x-0 top-full bg-white border-b border-neutral-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
        <div className="flex items-center gap-3 border-b-2 border-neutral-900 pb-2">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
            placeholder="Buscar siluetas: XT-6, Speedcross, ACS..."
            className="flex-1 bg-transparent outline-none text-sm font-mono uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal placeholder:text-neutral-400"
          />
          <button onClick={onClose} className="p-1 text-neutral-500 hover:text-black">
            <X className="w-4 h-4" />
          </button>
        </div>

        {results.length === 0 ? (
          <p className="text-xs text-neutral-400 font-mono py-4 text-center">
            No hay siluetas que coincidan con "{query}".
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {results.map((p) => {
              const isActive = p.id === activeProductId;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className={`flex items-center gap-3 p-2 rounded text-left border transition ${
                    isActive ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-900'
                  }`}
                >
                  <img src={p.variants[0].thumbnail} alt={p.name} className="w-12 h-12 object-cover rounded bg-neutral-100" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold font-mono uppercase truncate">{p.name}</p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{p.category}</p>
                    <p className="text-xs font-mono font-bold mt-0.5">{p.price.toFixed(2)} €</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
