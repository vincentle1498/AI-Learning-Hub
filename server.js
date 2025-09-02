const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-memory storage (no database needed for now)
let storage = {
  users: [],
  projects: [],
  discussions: [],
  lessons: [],
  rooms: []
};

// ============= API ROUTES =============

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Learning Hub Backend API is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      projects: '/api/projects',
      discussions: '/api/discussions',
      lessons: '/api/lessons',
      rooms: '/api/rooms'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API is healthy',
    uptime: process.uptime()
  });
});

// ----------- USER ROUTES -----------
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = storage.users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create user
    const user = {
      id: 'user_' + Date.now(),
      username,
      email,
      password, // In production, hash this!
      created: new Date().toISOString()
    };
    
    storage.users.push(user);
    
    res.json({ 
      success: true, 
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = storage.users.find(u => u.username === username);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      success: true, 
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- PROJECT ROUTES -----------
app.get('/api/projects', (req, res) => {
  res.json(storage.projects);
});

app.post('/api/projects', (req, res) => {
  try {
    const project = {
      id: 'proj_' + Date.now(),
      ...req.body,
      created: new Date().toISOString(),
      likes: 0,
      stars: 0
    };
    
    storage.projects.unshift(project);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', (req, res) => {
  try {
    const index = storage.projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    storage.projects[index] = { ...storage.projects[index], ...req.body };
    res.json(storage.projects[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  try {
    storage.projects = storage.projects.filter(p => p.id !== req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- DISCUSSION ROUTES -----------
app.get('/api/discussions', (req, res) => {
  res.json(storage.discussions);
});

app.post('/api/discussions', (req, res) => {
  try {
    const discussion = {
      id: 'disc_' + Date.now(),
      ...req.body,
      created: new Date().toISOString(),
      replies: 0,
      repliesData: []
    };
    
    storage.discussions.unshift(discussion);
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/discussions/:id/reply', (req, res) => {
  try {
    const discussion = storage.discussions.find(d => d.id === req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    
    const reply = {
      id: 'reply_' + Date.now(),
      ...req.body,
      created: new Date().toISOString()
    };
    
    discussion.repliesData.push(reply);
    discussion.replies = discussion.repliesData.length;
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- LESSON ROUTES -----------
app.get('/api/lessons', (req, res) => {
  res.json(storage.lessons);
});

app.post('/api/lessons', (req, res) => {
  try {
    const lesson = {
      id: 'lesson_' + Date.now(),
      ...req.body,
      created: new Date().toISOString(),
      views: 0,
      completions: 0
    };
    
    storage.lessons.unshift(lesson);
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- ROOM ROUTES -----------
app.get('/api/rooms', (req, res) => {
  res.json(storage.rooms);
});

app.post('/api/rooms', (req, res) => {
  try {
    const room = {
      id: 'room_' + Date.now(),
      ...req.body,
      created: new Date().toISOString(),
      participants: [req.body.owner],
      status: 'active'
    };
    
    storage.rooms.unshift(room);
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/rooms/:id/join', (req, res) => {
  try {
    const room = storage.rooms.find(r => r.id === req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    if (!room.participants.includes(req.body.username)) {
      room.participants.push(req.body.username);
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});