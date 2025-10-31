'use client';

import { useState, useEffect } from 'react';
import { getRecentSearches, clearRecentSearches } from '@/utils/storage';

interface RecentSearchesProps {
  onSearchClick: (query: string) => void;
}

export default function RecentSearches({ onSearchClick }: RecentSearchesProps) {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    const recent = getRecentSearches();
    setSearches(recent);
  }, []);

  if (searches.length === 0) {
    return null;
  }

  const handleClear = () => {
    clearRecentSearches();
    setSearches([]);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Searches</h2>
        <button
          onClick={handleClear}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={search}
            onClick={() => onSearchClick(search)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
}
