export interface YouTubeSearchItem {
  videoId: string;
  title: string;
  channelName: string;
  thumbnail: string;
  duration: string;
}

export interface SearchResponse {
  success: boolean;
  query?: string;
  results?: YouTubeSearchItem[];
  error?: string;
}

export interface YouTubeSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      medium?: {
        url: string;
      };
      high?: {
        url: string;
      };
      default?: {
        url: string;
      };
    };
  };
}

export interface YouTubeAPIResponse {
  items: YouTubeSearchResult[];
}

export interface YouTubeContentDetails {
  duration: string;
}

export interface YouTubeVideoResponse {
  items: Array<{
    contentDetails: YouTubeContentDetails;
  }>;
}
