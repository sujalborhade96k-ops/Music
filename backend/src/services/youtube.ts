import fetch from 'node-fetch';
import { YouTubeSearchItem, YouTubeAPIResponse, YouTubeVideoResponse } from '../types/index';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const API_TIMEOUT = 10000; // 10 seconds

class YouTubeService {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('YouTube API key is required');
    }
    this.apiKey = apiKey;
  }

  /**
   * Parse ISO 8601 duration to MM:SS or HH:MM:SS format
   */
  private parseDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '00:00';

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  /**
   * Fetch video duration from YouTube
   */
  private async getVideoDuration(videoId: string): Promise<string> {
    try {
      const response = await fetch(
        `${YOUTUBE_API_BASE}/videos?part=contentDetails&id=${videoId}&key=${this.apiKey}`,
        { timeout: API_TIMEOUT }
      );

      if (!response.ok) {
        return '00:00';
      }

      const data = (await response.json()) as YouTubeVideoResponse;
      if (data.items && data.items[0]?.contentDetails?.duration) {
        return this.parseDuration(data.items[0].contentDetails.duration);
      }
    } catch (error) {
      // Duration fetch failed, return default
    }

    return '00:00';
  }

  /**
   * Search YouTube for videos
   */
  async search(query: string, maxResults: number = 10): Promise<YouTubeSearchItem[]> {
    if (!query || query.trim().length === 0) {
      throw new Error('Search query required');
    }

    try {
      const response = await fetch(
        `${YOUTUBE_API_BASE}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${this.apiKey}`,
        { timeout: API_TIMEOUT }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('YouTube API quota exceeded');
        }
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = (await response.json()) as YouTubeAPIResponse;

      if (!data.items || data.items.length === 0) {
        return [];
      }

      const results: YouTubeSearchItem[] = [];

      for (const item of data.items) {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const channelName = item.snippet.channelTitle;

        // Use best available thumbnail
        const thumbnail =
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          '';

        if (!thumbnail) {
          continue; // Skip videos without thumbnails
        }

        // Fetch duration
        const duration = await this.getVideoDuration(videoId);

        results.push({
          videoId,
          title,
          channelName,
          thumbnail,
          duration,
        });

        if (results.length >= maxResults) {
          break;
        }
      }

      return results;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('quota exceeded')) {
          throw new Error('YouTube API quota exceeded');
        }
        throw error;
      }
      throw new Error('Failed to search YouTube');
    }
  }
}

export default YouTubeService;
