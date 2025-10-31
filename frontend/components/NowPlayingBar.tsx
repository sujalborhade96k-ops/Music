'use client';

import { useQueue } from '@/context/QueueContext';
import { useRouter } from 'next/navigation';

export default function NowPlayingBar() {
  const { queue, currentIndex, isPlaying, setIsPlaying } = useQueue();
  const router = useRouter();

  if (queue.length === 0) {
    return null;
  }

  const currentSong = queue[currentIndex];

  const handleClick = () => {
    router.push('/player');
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-40"
    >
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <img
          src={currentSong.thumbnail}
          alt={currentSong.title}
          className="w-14 h-14 rounded-lg object-cover"
        />

        {/* Song info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white truncate">
            {currentSong.title}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {currentSong.channelName}
          </p>
        </div>

        {/* Play/Pause button */}
        <button
          onClick={handlePlayPause}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 text-gray-900 dark:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5.5 1a.5.5 0 00-.5.5v17a.5.5 0 001 0V1.5a.5.5 0 00-.5-.5zm9 0a.5.5 0 00-.5.5v17a.5.5 0 001 0V1.5a.5.5 0 00-.5-.5z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-900 dark:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4.5 1.636a.5.5 0 00-.5.707l15 14.5a.5.5 0 00.863-.355V1.712a.5.5 0 00-.863-.355L4.5 1.636z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
