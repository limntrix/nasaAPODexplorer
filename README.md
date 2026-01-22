# NASA APOD Explorer 🚀

A full-stack application to explore NASA's Astronomy Picture of the Day (APOD).
Built with Spring Boot (Java) and React (TypeScript + Vite).

## Features

- 🌌 **Dashboard**: View today's stunning astronomy picture.
- 📅 **Time Travel**: Select a specific date to view past APODs.
- 🖼️ **Gallery**: Browse recent pictures in a responsive grid.
- ⚡ **Performance**: Backend caching with Caffeine for fast responses.
- 🎨 **Design**: Premium UI with dark mode, glassmorphism, and animations.

## Prerequisites

- **Java JDK 17+**
- **Maven**
- **Node.js (v18+) & npm**
- **NASA API Key**: Get one for free at [api.nasa.gov](https://api.nasa.gov/)

## Project Structure

```
nasa-apod-explorer/
├── backend/            # Spring Boot REST API
│   ├── src/            # Java source code
│   └── pom.xml         # Maven dependencies
└── frontend/           # React + TypeScript Client
    ├── src/            # React components & logic
    └── package.json    # Node dependencies
```

## Getting Started

### 1. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure your environment variables:
   - Create a new environment variable `NASA_API_KEY` with your key.
   - OR, pass it directly when running.

3. Run the application:
   ```bash
   # Linux/Mac
   export NASA_API_KEY=YOUR_KEY_HERE
   mvn spring-boot:run

   # Windows (PowerShell)
   $env:NASA_API_KEY="YOUR_KEY_HERE"
   mvn spring-boot:run
   
   # Or simply use the demo key (limited rates):
   mvn spring-boot:run
   ```
   The server will start at `http://localhost:8080`.

### 2. Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`.

## Rest API Endpoints

- `GET /api/apod/today` - Get today's APOD
- `GET /api/apod?date=YYYY-MM-DD` - Get APOD for specific date
- `GET /api/apod/recent?days=10` - Get recent APODs

## Technologies

- **Backend**: Spring Boot 3, Caffeine Cache, RestTemplate, Lombok
- **Frontend**: React, TypeScript, Vite, Vanilla CSS
