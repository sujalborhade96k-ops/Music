'use client';

import { useEffect, useRef, useState } from 'react';
import { useQueue } from '@/context/QueueContext';

export default function Player() {
  const { queue, currentIndex, isPlaying, setIsPlaying, skipNext } = useQueue();
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const initializePlayer = () => {
    if (!containerRef.current || !window.YT) return;

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: queue[currentIndex]?.videoId || '',
      events: {
        onReady: () => setPlayerReady(true),
        onStateChange: handlePlayerStateChange,
      },
      playerVars: {
        controls: 1,
        modestbranding: 1,
      },
    });
  };

  const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (!event.target) return;

    // When video ends (state = 0), play next
    if (event.data === window.YT.PlayerState.ENDED) {
      skipNext();
    } else if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  // Handle currentIndex changes
  useEffect(() => {
    if (!playerReady || !playerRef.current) return;

    const currentSong = queue[currentIndex];
    if (currentSong) {
      playerRef.current.loadVideoById(currentSong.videoId);
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }
  }, [currentIndex, playerReady]);

  // Handle play/pause
  useEffect(() => {
    if (!playerReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying, playerReady]);

  return <div ref={containerRef} id="youtube-player" className="w-full h-full" />;
}

// Type declarations for YouTube API
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

namespace YT {
  export enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }

  export interface OnStateChangeEvent {
    target: Player;
    data: PlayerState;
  }

  export interface Player {
    loadVideoById(videoId: string): void;
    playVideo(): void;
    pauseVideo(): void;
    destroy(): void;
  }
}
