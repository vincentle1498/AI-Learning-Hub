# AI Learning Hub - API Setup Guide

## 🔐 Security Improvements Implemented

### 1. **Password Security**
- ✅ Passwords are now hashed using bcrypt (10 rounds)
- ✅ Plain text passwords are never stored in the database
- ✅ Password validation requires: 8+ characters, uppercase, lowercase, and numbers

### 2. **API Key Authentication**
- ✅ Each user gets a unique API key upon registration
- ✅ API keys required for all write operations (POST, PUT, DELETE)
- ✅ API keys sent via `x-api-key` header or `apiKey` query parameter
- ✅ Users can regenerate their API key at any time

### 3. **MongoDB Integration**
- ✅ All data now persists in MongoDB (no more memory loss on restart)
- ✅ Proper indexes for optimal query performance
- ✅ Data validation and sanitization

### 4. **Rate Limiting**
- ✅ General API: 100 requests per 15 minutes per IP
- ✅ Auth endpoints: 5 requests per 15 minutes per IP
- ✅ Prevents abuse and brute force attacks

### 5. **Input Validation**
- ✅ All endpoints validate input data
- ✅ Proper error messages for invalid data
- ✅ SQL injection and XSS protection

## 📦 Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up MongoDB:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a free cluster if you haven't already
   - Get your connection string
   - Add your IP address to the whitelist

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Add your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/ai-learning-hub
PORT=5000
```

4. **Start the server:**
```bash
npm start
```

## 🔑 API Authentication

### Register a new user:
```javascript
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "apiKey": "ai_hub_xxxx-xxxx-xxxx-xxxx"
  }
}
```

### Login:
```javascript
POST /api/auth/login
{
  "username": "john_doe",
  "password": "SecurePass123"
}

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "apiKey": "ai_hub_xxxx-xxxx-xxxx-xxxx"
  }
}
```

### Using the API Key:
```javascript
// In headers
fetch('https://your-api.com/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'ai_hub_xxxx-xxxx-xxxx-xxxx'
  },
  body: JSON.stringify(data)
})

// Or as query parameter
fetch('https://your-api.com/api/projects?apiKey=ai_hub_xxxx-xxxx-xxxx-xxxx', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

## 🚀 Deployment

### For Render.com:
1. Add environment variable in Render dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   
2. The app will automatically:
   - Install dependencies
   - Connect to MongoDB
   - Start the server

### For Local Development:
```bash
# Install dependencies
npm install

# Create .env file with your MongoDB URI
echo "MONGODB_URI=your-connection-string" > .env

# Start server
npm start
```

## 📚 API Endpoints

### Public Endpoints (No API Key Required):
- `GET /api/health` - Health check
- `GET /api/projects` - List projects
- `GET /api/discussions` - List discussions
- `GET /api/lessons` - List lessons
- `GET /api/rooms` - List rooms
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Protected Endpoints (API Key Required):
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project (owner only)
- `DELETE /api/projects/:id` - Delete project (owner only)
- `POST /api/discussions` - Create discussion
- `POST /api/discussions/:id/reply` - Reply to discussion
- `POST /api/lessons` - Create lesson
- `POST /api/rooms` - Create room
- `PUT /api/rooms/:id/join` - Join room
- `POST /api/auth/generate-api-key` - Generate new API key

## 🛡️ Security Best Practices

1. **Never commit `.env` file** - It contains sensitive data
2. **Use HTTPS in production** - Render provides this automatically
3. **Rotate API keys regularly** - Use the regenerate endpoint
4. **Monitor rate limits** - Check for unusual activity
5. **Keep dependencies updated** - Run `npm audit` regularly

## 🐛 Troubleshooting

### MongoDB Connection Issues:
- Check your IP is whitelisted in MongoDB Atlas
- Verify connection string format
- Ensure database user has correct permissions

### API Key Issues:
- Store API key securely in frontend
- Include key in every protected request
- Regenerate key if compromised

### Rate Limiting:
- Wait 15 minutes if rate limited
- Contact admin for increased limits if needed

## 📧 Support

For issues or questions about the API, check the logs in:
- Render.com dashboard for production
- Console output for local development