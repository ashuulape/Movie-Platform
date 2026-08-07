# FreeTube 🎬

**FreeTube** is a modern, responsive web application for discovering, searching, and watching movies. It provides a seamless media experience featuring dynamic multi-server streaming, detailed movie metadata, official trailers, and community reviews.

---

## 🌟 How It Works

FreeTube provides a complete movie discovery and streaming experience through a modern web interface:

1. **Movie Discovery & Categorization**: Browse movies filtered by categories including *Now Playing*, *Popular*, *Top Rated*, and *Upcoming*.
2. **Real-Time Search**: Search for any movie by title using the top navigation search bar.
3. **Multi-Server Streaming**: Streams movies using multiple server options (Server 1, Server 2, Server 3, Server 4, Server 5). If one server is slow or unavailable, users can switch between servers seamlessly on the watch screen.
4. **Rich Movie Details**: Displays comprehensive movie info including poster artwork, backdrop themes, ratings, synopsis, genre tags, cast details, release date, and runtime.
5. **Trailers & Community Reviews**: Watch official trailers via embedded media players and read community review comments for every movie.
6. **Backend Proxy Server**: Features a lightweight Node.js/Express proxy server (`miniserver`) that handles movie data retrieval securely.

---

## ✨ Features

- 🍿 **Multi-Server Playback**: Flexible server switching to ensure reliable video streaming across multiple source servers.
- 🔍 **Instant Search**: Quick title search with automatic navigation and loading states.
- 📱 **Responsive Glassmorphism UI**: Modern aesthetic built with Tailwind CSS, supporting desktop and mobile layouts.
- ⚡ **Smooth Animations**: Animated navigation drawer powered by GSAP.
- 💀 **Skeleton Loaders**: Custom skeleton loaders (`HomeSkeleton` and `WatchSkeleton`) for optimized visual feedback during data fetching.
- 📑 **Pagination**: Effortless page-by-page browsing for extensive movie catalogs.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) (`@gsap/react`)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **State Management**: React Context API (`Moviedatacontext`, `MovieSearchcontext`)

### **Backend (`miniserver`)**
- **Runtime**: Node.js
- **Framework**: [Express.js](https://expressjs.com/)
- **Middleware**: CORS, Dotenv

---

## 📁 Project Structure

```
movies/
├── miniserver/              # Express backend proxy server
│   ├── package.json
│   └── server.js            # Express server routes & CORS setup
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable UI components
│   │   ├── Bottom.jsx       # Trailer player & reviews display
│   │   ├── Card.jsx         # Movie card component
│   │   ├── Data.jsx         # Movie details & server selector buttons
│   │   ├── HomeSkeleton.jsx # Grid loading skeleton
│   │   ├── Movies.jsx       # Main movie grid with pagination
│   │   ├── Navbar.jsx       # Top navigation bar & search input
│   │   ├── Sidebar.jsx      # GSAP animated drawer for categories
│   │   └── WatchSkeleton.jsx# Watch page loading skeleton
│   ├── Context/             # React Context state management
│   │   ├── Moviedatacontext.jsx
│   │   └── MovieSearchcontext.jsx
│   ├── App.jsx              # Main routes setup
│   ├── Home.jsx             # Home page view
│   ├── Watch.jsx            # Watch page view & multi-server player
│   ├── index.css            # Global CSS styles
│   └── main.jsx             # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- `npm` or `yarn`

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

Create a `.env` file in the root directory and inside `miniserver` directory using the templates below.

### Frontend `.env` (Root)
```env
VITE_API_KEY=your_movie_api_key
VITE_BACKEND=http://localhost:5000
VITE_SERVER_1=your_server_1_endpoint/
VITE_SERVER_2=your_server_2_endpoint/
VITE_SERVER_3=your_server_3_endpoint/
VITE_SERVER_4=your_server_4_endpoint/
VITE_SERVER_5=your_server_5_endpoint/
```

### Backend `.env` (`miniserver/.env`)
```env
SITE_URL=your_movie_data_api_endpoint/
```

> ⚠️ **Note**: Server endpoints and API keys are configured strictly via environment variables to keep backend services modular and secure.

---

## 🏃 Running the Application

1. **Start the Backend Proxy Server**:
   ```bash
   cd miniserver
   node server.js
   ```
   *The backend proxy will start on `http://localhost:5000`.*

2. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```
   *Open your browser and navigate to the local Vite dev URL (typically `http://localhost:5173`).*

---

## 👤 Author

Created by **[Ashutosh](https://github.com/ashuulape)**
