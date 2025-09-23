import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
}

interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'date';
  sortOrder?: 'asc' | 'desc';
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Buscar produtos..." }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  const categories = [
    { id: 'all', name: 'Todas as categorias' },
    { id: 'velas', name: 'Velas' },
    { id: 'guias', name: 'Guias' },
    { id: 'brajas', name: 'Brajás' },
    { id: 'defumadores', name: 'Defumadores' },
  ];

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({});
    setQuery('');
    onSearch('', {});
  };

  return (
    <div className="w-full">
      {/* Barra de Busca Principal */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          className="umbanda-button px-6"
        >
          Buscar
        </button>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          🔧 Filtros
        </button>
      </div>

      {/* Filtros Avançados */}
      {showFilters && (
        <div className="umbanda-card p-6 mb-4">
          <h3 className="umbanda-subtitle mb-4">🔧 Filtros Avançados</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={filters.category || 'all'}
                onChange={(e) => setFilters({...filters, category: e.target.value === 'all' ? undefined : e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Preço Mínimo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço Mínimo (R$)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value ? parseFloat(e.target.value) : undefined})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            {/* Preço Máximo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço Máximo (R$)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.maxPrice || ''}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value ? parseFloat(e.target.value) : undefined})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                placeholder="999.99"
              />
            </div>

            {/* Ordenação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={`${filters.sortBy || 'name'}-${filters.sortOrder || 'asc'}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters({...filters, sortBy: sortBy as any, sortOrder: sortOrder as any});
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="price-asc">Preço (Menor)</option>
                <option value="price-desc">Preço (Maior)</option>
                <option value="date-desc">Mais Recente</option>
                <option value="date-asc">Mais Antigo</option>
              </select>
            </div>
          </div>

          {/* Checkbox para estoque */}
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={(e) => setFilters({...filters, inStock: e.target.checked || undefined})}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Apenas produtos em estoque
              </span>
            </label>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSearch}
              className="umbanda-button"
            >
              🔍 Aplicar Filtros
            </button>
            <button
              onClick={clearFilters}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              🗑️ Limpar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
