'use client';

import { useDarkMode } from '@/context/DarkModeContext';

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        // Sun icon
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l-2.122-2.122a6 6 0 10-8.485 0l2.122 2.122a4 4 0 005.657 0zM9.172 9.172a2 2 0 112.828-2.828 2 2 0 01-2.828 2.828zm6.364-1.414a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414zM4 11a1 1 0 100 2h3a1 1 0 100-2H4z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        // Moon icon
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
