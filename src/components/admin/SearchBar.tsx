'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Rechercher...',
  onSearch,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
        placeholder={placeholder}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
