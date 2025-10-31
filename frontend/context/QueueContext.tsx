'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Song } from '@/utils/api';

interface QueueContextType {
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  skipNext: () => void;
  skipPrevious: () => void;
  playSong: (index: number) => void;
  clearQueue: () => void;
  setIsPlaying: (playing: boolean) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const addToQueue = (song: Song) => {
    setQueue((prev) => {
      const newQueue = [...prev, song];
      // If this is the first song, start playing
      if (newQueue.length === 1) {
        setCurrentIndex(0);
        setIsPlaying(true);
      }
      return newQueue;
    });
  };

  const removeFromQueue = (index: number) => {
    setQueue((prev) => {
      const newQueue = prev.filter((_, i) => i !== index);
      // Adjust currentIndex if needed
      if (index < currentIndex) {
        setCurrentIndex(Math.max(0, currentIndex - 1));
      } else if (index === currentIndex && currentIndex >= newQueue.length) {
        setCurrentIndex(Math.max(0, newQueue.length - 1));
      }
      return newQueue;
    });
  };

  const skipNext = () => {
    if (queue.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % queue.length);
  };

  const skipPrevious = () => {
    if (queue.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + queue.length) % queue.length);
  };

  const playSong = (index: number) => {
    if (index >= 0 && index < queue.length) {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const clearQueue = () => {
    setQueue([]);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const value: QueueContextType = {
    queue,
    currentIndex,
    isPlaying,
    addToQueue,
    removeFromQueue,
    skipNext,
    skipPrevious,
    playSong,
    clearQueue,
    setIsPlaying,
  };

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = (): QueueContextType => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within QueueProvider');
  }
  return context;
};
