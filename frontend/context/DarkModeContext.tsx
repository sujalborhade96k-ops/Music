'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getDarkMode, setDarkMode } from '@/utils/storage';

interface DarkModeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedPreference = getDarkMode();
    setIsDark(savedPreference);
    setIsHydrated(true);

    // Apply to DOM immediately
    if (savedPreference) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      setDarkMode(newValue);

      // Apply to DOM
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return newValue;
    });
  };

  const value: DarkModeContextType = {
    isDark,
    toggleDarkMode,
  };

  // Avoid hydration mismatch
  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
};
