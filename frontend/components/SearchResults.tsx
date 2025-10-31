'use client';

import { Song } from '@/utils/api';
import { useQueue } from '@/context/QueueContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SearchResultsProps {
  results: Song[];
  isLoading?: boolean;
  error?: string;
}

export default function SearchResults({ results, isLoading, error }: SearchResultsProps) {
  const { addToQueue } = useQueue();
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleCardClick = (song: Song) => {
    addToQueue(song);
    setToastMessage('Added to queue');
    // Navigate to player
    router.push('/player');
  };

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
        No results found. Try searching for a song or artist.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {results.map((song) => (
          <button
            key={song.videoId}
            onClick={() => handleCardClick(song)}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow text-left cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={song.thumbnail}
                alt={song.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="font-bold text-sm line-clamp-2 text-gray-900 dark:text-white">
                {song.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {song.channelName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {song.duration}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          {toastMessage}
        </div>
      )}
    </>
  );
}
