'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUpDown, TrendingUp, TrendingDown, Star, Clock, Hash } from 'lucide-react';

export type SortOption = 
  | 'relevance'
  | 'price-asc' 
  | 'price-desc' 
  | 'name-asc' 
  | 'name-desc' 
  | 'rating-desc'
  | 'newest'
  | 'bestseller';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: 'relevance', label: 'Pertinence', icon: <ArrowUpDown className="w-4 h-4" /> },
  { value: 'price-asc', label: 'Prix croissant', icon: <TrendingUp className="w-4 h-4" /> },
  { value: 'price-desc', label: 'Prix décroissant', icon: <TrendingDown className="w-4 h-4" /> },
  { value: 'name-asc', label: 'Nom A-Z', icon: <Hash className="w-4 h-4" /> },
  { value: 'name-desc', label: 'Nom Z-A', icon: <Hash className="w-4 h-4 rotate-180" /> },
  { value: 'rating-desc', label: 'Meilleures notes', icon: <Star className="w-4 h-4" /> },
  { value: 'newest', label: 'Nouveautés', icon: <Clock className="w-4 h-4" /> },
  { value: 'bestseller', label: 'Meilleures ventes', icon: <TrendingUp className="w-4 h-4" /> },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find(option => option.value === value) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: SortOption) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <ArrowUpDown className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium">Trier par: {selectedOption.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
          <div className="py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                  value === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className={value === option.value ? 'text-blue-600' : 'text-gray-400'}>
                  {option.icon}
                </span>
                <span className="text-sm font-medium">{option.label}</span>
                {value === option.value && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}