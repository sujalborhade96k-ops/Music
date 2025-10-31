import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import YouTubeService from './services/youtube';
import createSearchRoute from './routes/search';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Validate API key
if (!YOUTUBE_API_KEY) {
  console.error('ERROR: YOUTUBE_API_KEY not set in environment variables');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Initialize YouTube service
const youtubeService = new YouTubeService(YOUTUBE_API_KEY);

// Routes
app.use('/api/search', createSearchRoute(youtubeService));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
