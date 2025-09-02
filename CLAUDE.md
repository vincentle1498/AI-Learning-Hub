# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is an AI Learning Hub application with a hybrid architecture:

- **Frontend**: Single-page application in `index.html` (~7K lines) with inline JavaScript, CSS, and HTML
- **Backend**: Express.js API deployed on Render with in-memory storage
- **API Integration**: Client-side API service in `api-service.js` with localStorage fallback
- **Repositories**: Frontend and backend in separate GitHub repositories

## Key Components

### Frontend Structure
- Main application code embedded in `index.html` with sections for:
  - Project showcase and creation
  - Discussion forums with delete functionality
  - Interactive lessons
  - Study rooms and collaboration tools
  - User authentication and profiles
- Navigation system with dynamic content switching
- Theme system with light/dark modes
- Real-time features (Pomodoro timer, notifications, calendar)

### Backend Architecture
- **Production**: Simple Express.js server with in-memory storage
- **Repository**: `github.com/vincentle1498/ai-learning-hub-backend`
- **Deployment**: Render.com with automatic GitHub integration
- **Storage**: In-memory arrays for users, discussions, projects, lessons, rooms
- **Authentication**: Username/email uniqueness validation with password protection

### Data Flow
- API-first architecture with localStorage fallback
- Cross-user sharing via backend API
- Real-time synchronization between all users
- Offline functionality when API unavailable

## API Integration

### Frontend API Service
- Located in `api-service.js` (external file)
- Loaded dynamically with cache-busting: `api-service.js?bust=timestamp`
- Comprehensive methods for all content types and authentication
- Automatic fallback to localStorage when API fails

### Backend Endpoints
- **Authentication**: `/api/auth/register`, `/api/auth/login`
- **Discussions**: GET/POST/DELETE `/api/discussions`
- **Projects**: GET/POST `/api/projects`  
- **Lessons**: GET/POST `/api/lessons`
- **Rooms**: GET/POST `/api/rooms`
- **Health Check**: `/api/health`, `/api/test`

## Authentication System

### User Account Management
- **Registration**: Requires unique username, email, password
- **Login**: Username/email + password validation
- **Duplicate Prevention**: Backend validates uniqueness, shows specific error messages
- **Error Handling**: "Username already taken" → redirects to login page
- **Password Validation**: Must use correct password for existing accounts
- **Persistence**: Accounts stored on backend, remembered across sessions

### Frontend Auth Flow
- **Sign In Button** → Auth menu with separate Login/Signup buttons
- **Signup Form**: Username + Email + Password + Confirm Password
- **Login Form**: Username + Password only (no confirmation needed)
- **Password Validation**: Passwords must match exactly before API submission
- **Error Messages**: Specific validation errors from backend and client-side validation
- **Auto-redirect**: Offers to switch to login when signup fails due to existing account

## Deployment Configuration

### Frontend Deployment (Netlify)
- **Repository**: `github.com/vincentle1498/AI-Learning-Hub`
- **Site**: `https://ailearninghubs.netlify.app`
- **Auto-deploy**: From GitHub main branch
- **Files**: Static deployment of `index.html` + `api-service.js`

### Backend Deployment (Render)
- **Repository**: `github.com/vincentle1498/ai-learning-hub-backend` 
- **API**: `https://ai-learning-hub-api.onrender.com`
- **Configuration**: `render.yaml` with `npm start` → `node server.js`
- **Storage**: In-memory (resets on deployment but enables cross-user sharing)
- **Dependencies**: Only Express.js and CORS (no database dependencies)

## Common Development Commands

### Frontend Development
```bash
# No build process required - direct file editing
# Open index.html directly in browser for local testing
```

### Backend Development
```bash
# Local testing
node server.js

# Check API health
curl https://ai-learning-hub-api.onrender.com/api/health
```

### Deployment
```bash
# Frontend: Push to main branch - auto-deploys to Netlify
git add . && git commit -m "message" && git push origin main

# Backend: Must be pushed to separate repository
cd ../ai-learning-hub-backend-temp
git add . && git commit -m "message" && git push origin main
```

## Recent Problems Solved & Solutions

### Problem 1: Discussion Posting and Deletion
**Issue**: Users wanted to post discussions visible to others and delete their own posts
**Solution**: 
- Enhanced `createDiscussion()` to use API with localStorage fallback
- Added `deleteDiscussion()` with ownership validation and confirmation prompts
- Added delete buttons (🗑️) visible only to discussion authors
- Implemented proper event handling with `event.stopPropagation()`

### Problem 2: Cross-User Visibility  
**Issue**: All content stored locally, users couldn't see each other's posts
**Solution**:
- Created comprehensive API integration for all content types
- Updated all creation functions to use API-first approach
- Added automatic data loading from API on page load
- Implemented hybrid approach: API for sharing + localStorage for offline

### Problem 3: JavaScript Cache Conflicts
**Issue**: Persistent `"Identifier 'API_URL' has already been declared"` errors
**Solution**:
- Moved API integration to separate `api-service.js` file
- Added dynamic script loading with timestamp cache-busting
- Created compatibility layer for cached files
- Used different variable names to avoid conflicts

### Problem 4: Backend Deployment Issues
**Issue**: Render deployment not updating despite manual deploys and code changes
**Root Cause**: Render was connected to wrong repository (`ai-learning-hub-backend` vs `AI-Learning-Hub`)
**Solution**:
- Identified repository mismatch through health endpoint version checking  
- Deployed working simple backend to correct repository
- Replaced complex Supabase backend with simple in-memory storage
- Eliminated database dependencies causing 500 errors

### Problem 5: Unclickable Delete Buttons
**Issue**: Delete buttons visible but not responding to clicks
**Solution**:
- Removed conflicting onclick handlers from wrapper elements
- Added proper z-index and positioning
- Used `event.stopPropagation()` to prevent click conflicts
- Added visual improvements (solid background, hover effects)

### Problem 6: User Authentication & Account Persistence
**Issue**: No persistent user accounts, multiple users could have same username
**Solution**:
- Added backend user storage with uniqueness validation
- Created separate login/signup forms with different fields
- Implemented proper error handling for "Username already taken" / "Invalid password"
- Added automatic redirect suggestions when signup fails due to existing account
- Password validation prevents unauthorized access to existing accounts

### Problem 7: Password Confirmation for Account Creation
**Issue**: Users could make typos when creating passwords, leading to login issues
**Solution**:
- Added password confirmation field to signup form only (not login)
- Added client-side validation to ensure passwords match before API submission
- Account creation only proceeds when passwords match AND username/email are unique
- Clear error message "Passwords do not match. Please try again." if mismatch
- Improves user experience and prevents password entry errors

## Technical Implementation Details

### API Service Architecture
- **Location**: `api-service.js` (separate file for cache management)
- **Loading**: Dynamic with cache-busting timestamps
- **Error Handling**: Preserves backend error messages for proper user feedback
- **Fallback**: Automatic localStorage fallback for offline functionality
- **Methods**: Complete CRUD operations for all content types + authentication

### Discussion System
- **Creation**: API-first with localStorage fallback
- **Deletion**: API-based with ownership validation (authorId + username check)
- **Rendering**: Dynamic delete buttons only for discussion owners
- **Cross-user**: Real-time sharing via backend API
- **Ownership**: Dual validation (authorId and author username for compatibility)

### Authentication Flow
1. **User clicks "Sign In"** → Shows auth menu (Login vs Signup)
2. **Signup**: Username + Email + Password → Backend validates uniqueness
3. **Login**: Username + Password → Backend validates credentials  
4. **Errors**: Specific messages with action guidance (redirect to login/signup)
5. **Success**: User stored in APP_STATE and localStorage for persistence

## Troubleshooting Guide

### Cache Issues
- **Problem**: Browser loading old JavaScript files
- **Solution**: Use cache-busting timestamps in script URLs
- **Nuclear option**: Rename files completely (e.g., `api-integration.js` → `api-service.js`)

### Backend Deployment Issues  
- **Problem**: Render not updating despite manual deployment
- **Check**: Verify repository connection and correct branch
- **Check**: Health endpoint version info to confirm deployment
- **Solution**: Use separate repositories for clear separation

### Authentication Errors
- **"Username already taken"**: User should use login instead of signup
- **"Invalid password"**: User entered wrong password for existing account  
- **"Network error"**: Backend deployment issue or API connection problem

### Cross-User Sharing Not Working
- **Check**: API_HUB_API_URL is not null in browser console
- **Check**: Console shows API calls, not localStorage fallback messages
- **Check**: Backend health endpoint returns current version info
- **Solution**: Ensure both frontend and backend are deployed and connected

## Development Best Practices

1. **Always test in incognito mode** to verify cross-user functionality
2. **Check browser console** for API call logs and error messages  
3. **Use separate repositories** for frontend and backend deployments
4. **Add comprehensive logging** for debugging deployment and API issues
5. **Implement graceful fallbacks** (localStorage when API unavailable)
6. **Version your deployments** to track which code is actually running
7. **Manual deployment** on Render when auto-deployment fails

## Important Implementation Notes

- **API Integration**: Uses external `api-service.js` to avoid cache conflicts
- **Authentication**: Stored on backend, not localStorage (persistent across devices)
- **Error Handling**: Preserves and displays specific backend error messages
- **Ownership Validation**: Dual-check (authorId and username) for compatibility
- **Cache Management**: Timestamp-based cache busting for reliable updates
- **Repository Structure**: Frontend and backend in separate repos for clean deployment