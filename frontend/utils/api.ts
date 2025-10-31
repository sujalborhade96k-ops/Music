export interface Song {
  videoId: string;
  title: string;
  channelName: string;
  thumbnail: string;
  duration: string;
}

export interface SearchResponse {
  success: boolean;
  query?: string;
  results?: Song[];
  error?: string;
}

export const searchSongs = async (query: string): Promise<Song[]> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  if (!query || query.trim().length === 0) {
    throw new Error('Search query cannot be empty');
  }

  try {
    const response = await fetch(
      `${backendUrl}/api/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: SearchResponse = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch results');
    }

    return data.results || [];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch search results');
  }
};
