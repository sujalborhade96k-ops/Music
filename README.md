# 🎵 TuneStream

A minimal YouTube Music-style web player built with Next.js (React) frontend and Express backend. Search for songs, queue tracks, and enjoy continuous playback with a beautiful responsive UI.

## Features

- 🔍 **Search Functionality** - Search for songs/artists and get top 10 YouTube results
- 🎵 **Music Player** - Official YouTube iframe player with play/pause controls
- 📋 **Playlist Queue** - Add multiple songs to queue and navigate between them
- ▶️ **Continuous Playback** - Automatically plays next track when current ends
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🔔 **Recent Searches** - Stores your last 10 searches locally

## Tech Stack

### Frontend
- **Next.js 14+** with App Router (TypeScript)
- **React 18+** for UI components
- **TailwindCSS 3+** for styling
- **React Context API** for state management

### Backend
- **Node.js 18+** (LTS)
- **Express 4+** for HTTP server
- **TypeScript** for type safety

### APIs
- **YouTube Data API v3** (search endpoint)
- **YouTube IFrame Player API** (official embed)

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- YouTube Data API key (get from [Google Cloud Console](https://console.cloud.google.com/))

## Installation & Setup

### 1. Clone and Navigate

```bash
cd Music
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and add your YouTube API key:

```
YOUTUBE_API_KEY=your_actual_youtube_api_key_here
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

The default backend URL is already set:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Running Locally

### Terminal 1 - Start Backend

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

### Terminal 2 - Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

### Access the App

Open `http://localhost:3000` in your browser

## Project Structure

```
Music/
├── frontend/                 (Next.js app)
│   ├── app/                 (App Router pages)
│   │   ├── layout.tsx       (Root layout)
│   │   ├── page.tsx         (Home/search page)
│   │   └── player/page.tsx  (Player page)
│   ├── components/          (Reusable components)
│   ├── context/             (React Context - Queue, Dark Mode)
│   ├── utils/               (API client, storage utilities)
│   └── package.json
│
├── backend/                  (Express API)
│   ├── src/
│   │   ├── index.ts         (Server entry)
│   │   ├── routes/          (API routes)
│   │   ├── services/        (YouTube API wrapper)
│   │   ├── middleware/      (Error handling)
│   │   └── types/           (TypeScript interfaces)
│   └── package.json
│
└── README.md                (This file)
```

## API Endpoints

### GET /api/search?q=keyword

Searches YouTube for videos matching the query.

**Query Parameters:**
- `q` (required): Search query (e.g., "Taylor Swift")

**Response (200 OK):**
```json
{
  "success": true,
  "query": "Taylor Swift",
  "results": [
    {
      "videoId": "string",
      "title": "Song Title",
      "channelName": "Artist Name",
      "thumbnail": "https://...",
      "duration": "3:45"
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request` - Missing or empty query
- `503 Service Unavailable` - YouTube API quota exceeded
- `500 Internal Server Error` - Other errors

## Usage Guide

### Search for Music

1. Enter a song or artist name in the search bar
2. Click "Search" or press Enter
3. Results appear as a grid of cards with thumbnails

### Add to Queue

1. Click any search result card
2. Song is added to the queue (you'll see "Added to queue" notification)
3. You'll be taken to the player page automatically
4. If queue was empty, playback starts immediately

### Control Playback

**On the Player Page:**
- **Play/Pause** - Click the large play button
- **Next** - Skip to next song in queue
- **Previous** - Go back to previous song
- **Auto-play** - Next song plays automatically when current ends

### Manage Queue

- Click any song in the queue to jump to it
- Hover over a song and click the X to remove it
- Click "Clear Queue" to empty the queue

### Recent Searches

- Your last 10 searches appear on the home page
- Click a recent search to search again
- Click "Clear" to remove all recent searches

### Toggle Dark Mode

- Click the sun/moon icon in the top-right corner
- Your preference is saved and persists across sessions

## Production Build

### Backend

```bash
cd backend
npm run build
NODE_ENV=production npm start
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

## Troubleshooting

### Backend won't start
- Check that port 5000 is not in use
- Verify YOUTUBE_API_KEY is set in `.env`
- Run `npm install` again if dependencies are missing

### Search returns no results
- Check your YouTube API key is valid
- Verify quota hasn't been exceeded in Google Cloud Console
- Try a different search query

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- Check browser console for CORS errors

### Player doesn't load
- Check browser console for errors
- Ensure YouTube iframe API is loaded
- Try a different video ID

## Notes

- **Queue Persistence**: Queue resets on page reload (session-only)
- **Recent Searches**: Persisted in localStorage (survives page reload)
- **Dark Mode**: Preference persisted in localStorage
- **API Compliance**: Uses only official YouTube APIs - ToS compliant
- **No Audio Extraction**: All playback through official YouTube embed

## License

MIT

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Check browser console and terminal for error messages
4. Ensure you have a valid YouTube API key with quota available
