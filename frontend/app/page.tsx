'use client';

import { useState } from 'react';
import DarkModeToggle from '@/components/DarkModeToggle';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import RecentSearches from '@/components/RecentSearches';
import NowPlayingBar from '@/components/NowPlayingBar';
import { Song, searchSongs } from '@/utils/api';
import { addRecentSearch } from '@/utils/storage';

export default function Home() {
  const [results, setResults] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (searchResults: Song[]) => {
    setResults(searchResults);
    setError('');
  };

  const handleRecentSearchClick = async (query: string) => {
    setError('');
    setIsLoading(true);

    try {
      const searchResults = await searchSongs(query);
      addRecentSearch(query);
      setResults(searchResults);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch results';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">🎵 TuneStream</h1>
          <DarkModeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar
            onSearch={handleSearch}
            onLoading={setIsLoading}
            onError={setError}
          />
        </div>

        {/* Recent searches */}
        {results.length === 0 && !isLoading && !error && (
          <div className="max-w-2xl mx-auto">
            <RecentSearches onSearchClick={handleRecentSearchClick} />
          </div>
        )}

        {/* Search results */}
        <div className="max-w-4xl mx-auto">
          <SearchResults results={results} isLoading={isLoading} error={error} />
        </div>
      </main>

      {/* Now playing bar */}
      <NowPlayingBar />
    </div>
  );
}
