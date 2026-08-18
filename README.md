# FreeTube 🎬

**FreeTube** is a full-stack movie streaming web application built with React 19 + Vite on the frontend and a Node.js/Express + Socket.IO backend. It lets users discover, search, and watch movies with multi-server playback, rich metadata, official trailers, community reviews, and a real-time **Watch Together** theater mode with WebRTC video/audio chat.

---

## 🌟 Features

| Feature | Description |
|---|---|
| 🍿 **Multi-Server Streaming** | Switch between 5 independent embed servers on the watch page for reliable playback |
| 🔍 **Instant Search** | Real-time movie search via TMDB API with loading skeleton feedback |
| 📂 **Category Browsing** | Browse *Now Playing*, *Popular*, *Top Rated*, and *Upcoming* with pagination |
| 🎭 **Watch Together (Theater)** | Create/join rooms for synchronized movie watching with WebRTC video/audio calls and real-time chat |
| 🎬 **Rich Movie Details** | Poster, backdrop, genres, rating, cast, runtime, release status, synopsis, and trailer |
| 💬 **Community Reviews** | TMDB community reviews displayed per movie |
| 📱 **Responsive Design** | Adaptive layout for mobile (horizontal card view) and desktop (poster grid view) |
| ⚡ **GSAP Animations** | Smooth animated sidebar drawer powered by GSAP |
| 💀 **Skeleton Loaders** | `HomeSkeleton` and `WatchSkeleton` for polished loading states |

---

## 🛠️ Tech Stack

### Frontend
| Library | Purpose |
|---|---|
| [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/) | UI framework & dev tooling |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [GSAP](https://greensock.com/gsap/) (`@gsap/react`) | Sidebar slide animation |
| [Motion](https://motion.dev/) | Additional UI animations in Theater |
| [Axios](https://axios-http.com/) | HTTP requests to TMDB & backend |
| [Socket.IO Client](https://socket.io/) | Real-time room communication in Theater mode |
| React Context API | Global state (`Moviedatacontext`, `MovieSearchcontext`) |

### Backend (`miniserver/`)
| Library | Purpose |
|---|---|
| [Express 5](https://expressjs.com/) | REST API server |
| [Socket.IO](https://socket.io/) | WebSocket signaling server for Theater rooms |
| [Axios](https://axios-http.com/) | Proxies movie data requests |
| [CORS](https://github.com/expressjs/cors) | Cross-origin request handling |
| [Dotenv](https://github.com/motdotla/dotenv) | Loads secrets from `.env` |

---

## 📁 Project Structure

```
movies/
├── miniserver/                  # Node.js backend
│   ├── .env                     # Backend secrets (not committed)
│   ├── package.json
│   └── server.js                # Express REST API + Socket.IO signaling
├── public/                      # Static public assets
├── src/
│   ├── assets/                  # Project static assets
│   ├── components/
│   │   ├── Bottom.jsx           # Trailer player + community reviews section
│   │   ├── Card.jsx             # Movie card (responsive mobile/desktop layouts)
│   │   ├── Data.jsx             # Movie detail panel + server switcher buttons
│   │   ├── HomeSkeleton.jsx     # Skeleton loader for home grid
│   │   ├── Movies.jsx           # Movie grid with category fetch + pagination
│   │   ├── Navbar.jsx           # Sticky top nav with search bar + logo
│   │   ├── Sidebar.jsx          # GSAP-animated category drawer
│   │   └── WatchSkeleton.jsx    # Skeleton loader for watch page
│   ├── Context/
│   │   ├── Moviedatacontext.jsx    # Global state: movie list, sidebar, page, category
│   │   └── MovieSearchcontext.jsx  # Global state: search query, loading, active server
│   ├── App.jsx                  # Route definitions
│   ├── Home.jsx                 # Home page (Sidebar + Navbar + Movies)
│   ├── Theater.jsx              # Watch Together room (WebRTC + Socket.IO + chat)
│   ├── Watch.jsx                # Movie watch page (embed player + movie details)
│   ├── index.css                # Global CSS resets
│   └── main.jsx                 # App entry point with context providers
├── .env                         # Frontend secrets (not committed)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧭 Application Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Movie discovery hub with category sidebar and paginated grid |
| `/watch/:name/:id` | `Watch` | Movie watch page with embed player, server switcher, and details |
| `/theater/:name/:id/:roomId` | `Theater` | Real-time Watch Together room with WebRTC video chat |

---

## 🎭 Theater Mode — Watch Together

The `/theater` page enables synchronized co-watching with friends:

- **Room creation**: Clicking **Watch Together** on the watch page auto-generates a room ID and navigates to the theater.
- **WebRTC peer-to-peer**: Video and audio calls are established directly between browsers using ICE/STUN. The backend only acts as a signaling relay — no media passes through the server.
- **Host privileges**: The first user to join a room is the **host** and can change the shared stream URL for all viewers.
- **Real-time chat**: Text chat is broadcast via Socket.IO to all room members.
- **Media controls**: Toggle mic, camera, and screen share independently. Muted peers display a visual indicator.
- **Host transfer**: If the host disconnects, the server automatically promotes the next connected peer.

### Socket.IO Event Reference

| Event | Direction | Description |
|---|---|---|
| `join-room` | Client → Server | Join a named room with a display name |
| `existing-users` | Server → Client | List of peers already in the room |
| `user-joined` / `user-left` | Server → Room | Peer join/leave notifications |
| `offer` / `answer` / `ice-candidate` | Relayed | WebRTC signaling messages |
| `toggle-media-status` | Client → Room | Broadcast mic/camera enabled state |
| `send-chat-message` / `receive-chat-message` | Both | Real-time text chat |
| `change-stream-url` | Host → Room | Sync the shared movie URL to all viewers |
| `room-state` | Server → Client | Initial room snapshot (host socket ID, stream URL, isHost) |
| `host-changed` | Server → Room | New host assigned after host leaves |
| `stream-url-updated` | Server → Room | Notify all peers that the stream URL changed |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ashuulape/Movie-Platform.git
   cd Movie-Platform
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd miniserver
   npm install
   cd ..
   ```

---

## 🔑 Environment Configuration

> ⚠️ **Never commit `.env` files.** Both are listed in `.gitignore`.

### Frontend `.env` (project root)

```env
# TMDB API read-access token (Bearer token)
VITE_API_KEY=your_tmdb_read_access_token

# URL of your deployed or local backend (miniserver)
VITE_BACKEND=http://localhost:5000

# Embed server base URLs — the movie TMDB ID is appended automatically
VITE_SERVER_1=https://your-server-1-domain/embed/
VITE_SERVER_2=https://your-server-2-domain/embed/movie/
VITE_SERVER_3=https://your-server-3-domain/movie/
VITE_SERVER_4=https://your-server-4-domain/embed/movie/
VITE_SERVER_5=https://your-server-5-domain/movie/
```

### Backend `.env` (`miniserver/.env`)

```env
# Base URL of the upstream movie data API (TMDB ID is appended as a query param)
SITE_URL=https://your-movie-data-api-endpoint/movie?tmdb_id=
```

---

## 🏃 Running the Application

1. **Start the Backend Proxy Server**:
   ```bash
   cd miniserver
   node server.js
   ```
   *The backend proxy and Socket.IO signaling server starts on `http://localhost:5000`.*

2. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```
   *Open your browser and navigate to the local Vite dev URL (typically `http://localhost:5173`).*

---

## 🌐 API Integration

### TMDB (The Movie Database)
The frontend fetches movie lists and search results directly from TMDB:
- **Movie lists**: `GET /3/movie/{now_playing|popular|top_rated|upcoming}`
- **Search**: `GET /3/search/movie?query=...`

All requests use a Bearer token from `VITE_API_KEY` in the `Authorization` header.

### Backend Proxy (`miniserver`)
Detailed per-movie data (cast, reviews, trailer, embed URLs, backdrops) is fetched through the backend:

```
GET /api/movies/:id
```

This keeps the upstream data source URL hidden from the browser and allows server-side data enrichment.

---

## 📜 Scripts

### Frontend
| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend
| Command | Description |
|---|---|
| `node server.js` | Start the Express + Socket.IO server |

---

## 👤 Author

Created by **[Ashutosh](https://github.com/ashuulape)**
