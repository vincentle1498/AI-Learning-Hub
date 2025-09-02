const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://ai-learning-hubs.netlify.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// In-memory storage (simple but working)
let discussions = [];
let projects = [];
let lessons = [];
let rooms = [];

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Learning Hub Simple Backend is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API is healthy'
  });
});

// ----------- DISCUSSION ROUTES -----------
app.get('/api/discussions', (req, res) => {
  res.json(discussions);
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
    
    discussions.unshift(discussion);
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/discussions/:id', (req, res) => {
  try {
    const discussionIndex = discussions.findIndex(d => d.id === req.params.id);
    if (discussionIndex === -1) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    
    // Check ownership (basic security)
    const discussion = discussions[discussionIndex];
    const { userId } = req.body;
    
    if (discussion.authorId !== userId && discussion.author !== userId) {
      return res.status(403).json({ error: 'Unauthorized - can only delete own discussions' });
    }
    
    // Remove the discussion
    discussions.splice(discussionIndex, 1);
    res.json({ success: true, message: 'Discussion deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/discussions/:id/reply', (req, res) => {
  try {
    const discussion = discussions.find(d => d.id === req.params.id);
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

// ----------- PROJECT ROUTES -----------
app.get('/api/projects', (req, res) => {
  res.json(projects);
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
    
    projects.unshift(project);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- LESSON ROUTES -----------
app.get('/api/lessons', (req, res) => {
  res.json(lessons);
});

app.post('/api/lessons', (req, res) => {
  try {
    const lesson = {
      id: 'lesson_' + Date.now(),
      ...req.body,
      created: new Date().toISOString()
    };
    
    lessons.unshift(lesson);
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- ROOM ROUTES -----------
app.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/api/rooms', (req, res) => {
  try {
    const room = {
      id: 'room_' + Date.now(),
      ...req.body,
      created: new Date().toISOString(),
      participants: []
    };
    
    rooms.unshift(room);
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Simple backend running on port ${PORT}`);
  console.log(`🌐 Visit: https://your-app.onrender.com`);
});