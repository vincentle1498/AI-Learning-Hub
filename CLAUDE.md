# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is an AI Learning Hub application with a hybrid architecture:

- **Frontend**: Single-page application in `index.html` (~7K lines) with inline JavaScript, CSS, and HTML
- **Backend**: Express.js API with two deployment configurations:
  - Simple in-memory version (`server.js` in root) 
  - MongoDB version (`backend/server.js`) for persistent data
- **API Integration**: Client-side API service embedded in `index.html` with fallback to localStorage

## Key Components

### Frontend Structure
- Main application code embedded in `index.html` with sections for:
  - Project showcase and creation
  - Discussion forums 
  - Interactive lessons
  - Study rooms and collaboration tools
  - User authentication and profiles
- Navigation system with dynamic content switching
- Theme system with light/dark modes
- Real-time features (Pomodoro timer, notifications, calendar)

### Backend Options
- **Development/Simple**: Uses `server.js` with in-memory storage
- **Production**: Uses `backend/server.js` with Supabase integration
- API endpoints for users, projects, discussions, lessons, and study rooms

### Data Flow
- Hybrid data persistence: API-first with localStorage fallback
- API calls handled by embedded `ApiService` in `index.html`
- Backend attempts Supabase integration but currently uses localStorage fallback
- Automatic fallback ensures app works offline or when backend is down

## Common Development Commands

### Frontend Development
- Open `index.html` directly in browser for local testing
- No build process required - pure HTML/CSS/JS

### Backend Development
```bash
# Simple backend (in-memory)
node server.js

# Full backend with Supabase
cd backend
npm install
npm run dev        # Uses nodemon for development
npm start          # Production start
```

### Testing API Integration
- API URL configured in `index.html` as `AI_HUB_API_URL` variable around line 6730
- Local backend: `http://localhost:5000/api`
- Production: `https://ai-learning-hub-api.onrender.com/api`
- Current setup uses localStorage fallback due to backend API issues

## Deployment Configuration

### Backend Deployment (Render)
- Uses `render.yaml` configuration
- Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `NODE_VERSION`
- Automatic deployment from GitHub integration

### Frontend Deployment (Netlify)
- Static site deployment of `index.html` (with embedded API integration)
- Connected to GitHub repository: `github.com/vincentle1498/AI-Learning-Hub`
- Auto-deploys from GitHub pushes
- No build process required

## Environment Setup

### Required Environment Variables (Backend)
```bash
SUPABASE_URL=https://...supabase.co     # Supabase project URL
SUPABASE_ANON_KEY=eyJhbG...             # Supabase anonymous key
PORT=5000                               # Server port (auto-set by Render)
```

### Database Schema (Supabase PostgreSQL)
- Users: username, email, password, created
- Projects: title, description, category, tech stack, files, metrics
- Discussions: title, content, category, tags, replies
- Additional tables for lessons and study rooms

## File Organization

- `index.html` - Complete frontend application with embedded API integration
- `server.js` - Simple backend (in-memory storage)
- `backend/` - Production backend with database persistence (has compatibility issues)
- `simple-server.js` - Alternative simple backend solution
- `SUPABASE_DEPLOY.md` - Database deployment guide
- `*.md` files - Deployment and setup documentation

## Current Status

- ✅ Frontend working properly with no JavaScript errors
- ✅ App fully functional using localStorage for data persistence  
- ⚠️ Backend API has database compatibility issues (500 errors)
- ✅ Fallback to localStorage ensures app continues to work
- 🌐 Live at: https://ai-learning-hubs.netlify.app