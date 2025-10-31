'use client';

import { useQueue } from '@/context/QueueContext';
import Player from '@/components/Player';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useRouter } from 'next/navigation';

export default function PlayerPage() {
  const { queue, currentIndex, isPlaying, setIsPlaying, skipNext, skipPrevious, removeFromQueue, playSong, clearQueue } =
    useQueue();
  const router = useRouter();

  if (queue.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Queue is Empty</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go back to Search
          </button>
        </div>
      </div>
    );
  }

  const currentSong = queue[currentIndex];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
          >
            ← Back to Search
          </button>
          <h1 className="text-xl font-bold">Now Playing</h1>
          <DarkModeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Player */}
          <div className="lg:col-span-2">
            {/* YouTube Player */}
            <div className="bg-black rounded-lg overflow-hidden aspect-video mb-8">
              <Player />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={skipPrevious}
                className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 5a1 1 0 011 1v5.5h7.5a1 1 0 110 2H9v5.5a1 1 0 11-2 0V6a1 1 0 011-1z" />
                </svg>
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 1a.5.5 0 00-.5.5v17a.5.5 0 001 0V1.5a.5.5 0 00-.5-.5zm9 0a.5.5 0 00-.5.5v17a.5.5 0 001 0V1.5a.5.5 0 00-.5-.5z" />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4.5 1.636a.5.5 0 00-.5.707l15 14.5a.5.5 0 00.863-.355V1.712a.5.5 0 00-.863-.355L4.5 1.636z" />
                  </svg>
                )}
              </button>

              <button
                onClick={skipNext}
                className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Next"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M12 5a1 1 0 011 1v5.5H5.5a1 1 0 110-2H13V6a1 1 0 011-1z" />
                </svg>
              </button>
            </div>

            {/* Song info */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">{currentSong.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{currentSong.channelName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Playing {currentIndex + 1} of {queue.length}
              </p>
            </div>
          </div>

          {/* Right column: Queue */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4">Queue</h3>

              {/* Queue list */}
              <div className="space-y-2 mb-4 max-h-[60vh] overflow-y-auto">
                {queue.map((song, index) => (
                  <div
                    key={song.videoId + index}
                    className="group relative"
                  >
                    <button
                      onClick={() => playSong(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        index === currentIndex
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <p className="text-sm font-medium truncate">{song.title}</p>
                      <p className="text-xs opacity-75 truncate">{song.channelName}</p>
                    </button>
                    {index === currentIndex && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromQueue(index);
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove from queue"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Clear queue button */}
              {queue.length > 0 && (
                <button
                  onClick={clearQueue}
                  className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Clear Queue
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile: Queue as collapsible (hidden on desktop) */}
      <div className="lg:hidden px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-bold mb-2">Queue ({queue.length})</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {queue.map((song, index) => (
            <button
              key={song.videoId + index}
              onClick={() => playSong(index)}
              className={`w-full text-left p-2 rounded text-sm truncate transition-colors ${
                index === currentIndex
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {song.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
