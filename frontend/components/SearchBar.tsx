'use client';

import { useState } from 'react';
import { Song, searchSongs } from '@/utils/api';
import { addRecentSearch } from '@/utils/storage';

interface SearchBarProps {
  onSearch: (results: Song[]) => void;
  onLoading?: (isLoading: boolean) => void;
  onError?: (error: string) => void;
}

export default function SearchBar({ onSearch, onLoading, onError }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      onError?.('Please enter a search query');
      return;
    }

    setIsLoading(true);
    onLoading?.(true);

    try {
      const results = await searchSongs(query);
      addRecentSearch(query);
      onSearch(results);
      setQuery('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch results';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
      onLoading?.(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs or artists..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Searching...</span>
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
}
