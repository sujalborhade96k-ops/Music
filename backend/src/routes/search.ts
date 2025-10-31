import { Router, Request, Response } from 'express';
import YouTubeService from '../services/youtube';
import { SearchResponse } from '../types/index';

const router = Router();

const createSearchRoute = (youtubeService: YouTubeService) => {
  router.get('/', async (req: Request, res: Response<SearchResponse>) => {
    const query = req.query.q as string;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Search query required',
      });
    }

    try {
      const results = await youtubeService.search(query, 10);

      res.status(200).json({
        success: true,
        query,
        results,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('quota exceeded')) {
          return res.status(503).json({
            success: false,
            error: 'YouTube API unavailable. Please try again later.',
          });
        }
      }

      res.status(500).json({
        success: false,
        error: 'Failed to fetch search results',
      });
    }
  });

  return router;
};

export default createSearchRoute;
