const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://ai-learning-hubs.netlify.app', 'https://ailearninghubs.netlify.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// In-memory storage (simple but working for cross-user sharing)
let discussions = [
  {
    id: 'disc_sample1',
    title: 'Welcome to AI Learning Hub!',
    content: 'This is a sample discussion to test cross-user sharing. Feel free to delete this if you see it!',
    author: 'System',
    authorId: 'system',
    category: 'general',
    tags: ['welcome', 'test'],
    created: new Date().toISOString(),
    replies: 0,
    repliesData: []
  }
];

let projects = [];
let lessons = [];
let rooms = [];

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Learning Hub API is running',
    server: 'simple-server',
    timestamp: new Date().toISOString(),
    endpoints: ['/api/discussions', '/api/projects', '/api/lessons', '/api/rooms']
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Learning Hub API is running',
    version: 'simple-backend-v2.0',
    server_type: 'in-memory-backend',
    discussions_count: discussions.length,
    projects_count: projects.length,
    timestamp: new Date().toISOString()
  });
});

// Test endpoint to verify deployment
app.get('/api/test', (req, res) => {
  res.json({
    test: 'SUCCESS',
    message: 'New simple backend is deployed and working!',
    discussions_available: discussions.length > 0,
    endpoints_working: true
  });
});

// ----------- DISCUSSION ROUTES -----------
app.get('/api/discussions', (req, res) => {
  try {
    console.log(`📋 GET /api/discussions - returning ${discussions.length} discussions`);
    res.json(discussions);
  } catch (error) {
    console.error('❌ Error getting discussions:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/discussions', (req, res) => {
  try {
    const discussion = {
      id: 'disc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      ...req.body,
      created: new Date().toISOString(),
      replies: 0,
      repliesData: []
    };
    
    discussions.unshift(discussion);
    console.log(`✅ POST /api/discussions - created discussion: ${discussion.title}`);
    res.json(discussion);
  } catch (error) {
    console.error('❌ Error creating discussion:', error);
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
    
    console.log(`🗑️ DELETE attempt - Discussion author: ${discussion.authorId}, Requester: ${userId}`);
    
    if (discussion.authorId !== userId && discussion.author !== userId) {
      return res.status(403).json({ error: 'Unauthorized - can only delete own discussions' });
    }
    
    // Remove the discussion
    const deletedDiscussion = discussions.splice(discussionIndex, 1)[0];
    console.log(`✅ DELETE /api/discussions/${req.params.id} - deleted: ${deletedDiscussion.title}`);
    res.json({ success: true, message: 'Discussion deleted', discussion: deletedDiscussion });
  } catch (error) {
    console.error('❌ Error deleting discussion:', error);
    res.status(500).json({ error: error.message });
  }
});

// ----------- PROJECT ROUTES -----------
app.get('/api/projects', (req, res) => {
  try {
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', (req, res) => {
  try {
    const project = {
      id: 'proj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
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
  try {
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/lessons', (req, res) => {
  try {
    const lesson = {
      id: 'lesson_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
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
  try {
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rooms', (req, res) => {
  try {
    const room = {
      id: 'room_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
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

// Catch all errors
app.use((err, req, res, next) => {
  console.error('🚨 Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ AI Learning Hub API running on port ${PORT}`);
  console.log(`🌐 Server: simple in-memory backend`);
  console.log(`📋 Initial discussions: ${discussions.length}`);
});