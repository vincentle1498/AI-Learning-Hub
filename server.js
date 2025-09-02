console.log('🚀 Starting AI Learning Hub Backend...');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

console.log('✅ Express loaded');

// CORS - Allow all origins for testing
app.use(cors());
app.use(express.json({ limit: '10mb' }));

console.log('✅ Middleware configured');

// Simple in-memory storage
let discussions = [
  {
    id: 'test_disc_' + Date.now(),
    title: 'Backend is Working!',
    content: 'If you see this discussion, the backend deployment was successful and cross-user sharing is active!',
    author: 'System',
    authorId: 'system',
    category: 'general',
    tags: ['system', 'test'],
    created: new Date().toISOString(),
    replies: 0,
    repliesData: []
  }
];

console.log('✅ Data initialized with', discussions.length, 'discussions');

// Root endpoint
app.get('/', (req, res) => {
  console.log('📍 Root endpoint accessed');
  res.json({
    status: 'WORKING',
    message: 'AI Learning Hub Backend is ACTIVE!',
    version: 'v3.0-DEPLOYED',
    timestamp: new Date().toISOString(),
    discussions_count: discussions.length
  });
});

// Health endpoint
app.get('/api/health', (req, res) => {
  console.log('📍 Health endpoint accessed');
  res.json({
    status: 'OK',
    message: 'AI Learning Hub API is running',
    version: 'v3.0-DEPLOYED',
    server_type: 'simple-backend',
    discussions_count: discussions.length,
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('📍 Test endpoint accessed');
  res.json({
    test: 'SUCCESS',
    message: 'Backend deployment successful!',
    version: 'v3.0-DEPLOYED',
    discussions_available: discussions.length > 0
  });
});

// GET discussions
app.get('/api/discussions', (req, res) => {
  console.log('📍 GET /api/discussions - returning', discussions.length, 'discussions');
  res.json(discussions);
});

// POST new discussion
app.post('/api/discussions', (req, res) => {
  console.log('📍 POST /api/discussions');
  const discussion = {
    id: 'disc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    ...req.body,
    created: new Date().toISOString(),
    replies: 0,
    repliesData: []
  };
  
  discussions.unshift(discussion);
  console.log('✅ Created discussion:', discussion.title);
  res.json(discussion);
});

// DELETE discussion
app.delete('/api/discussions/:id', (req, res) => {
  console.log('📍 DELETE /api/discussions/' + req.params.id);
  const index = discussions.findIndex(d => d.id === req.params.id);
  
  if (index === -1) {
    console.log('❌ Discussion not found');
    return res.status(404).json({ error: 'Discussion not found' });
  }
  
  const deleted = discussions.splice(index, 1)[0];
  console.log('✅ Deleted discussion:', deleted.title);
  res.json({ success: true, message: 'Discussion deleted', discussion: deleted });
});

// Catch all
app.get('*', (req, res) => {
  console.log('📍 Unknown endpoint:', req.path);
  res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

// Start server
app.listen(PORT, () => {
  console.log('🎉 AI Learning Hub Backend running on port', PORT);
  console.log('🌐 Version: v3.0-DEPLOYED');
  console.log('📊 Initial discussions:', discussions.length);
});

console.log('🏁 Server setup complete');