console.log('🚀 Starting AI Learning Hub Backend v4.0...');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

console.log('✅ Express loaded - NEW BACKEND v4.0');

// CORS - Allow all origins
app.use(cors());
app.use(express.json({ limit: '10mb' }));

console.log('✅ Middleware configured');

// Simple in-memory storage - NO DATABASE
let discussions = [
  {
    id: 'welcome_v4',
    title: 'NEW BACKEND v4.0 IS WORKING!',
    content: 'If you see this discussion, the new backend deployment was successful! Cross-user sharing is now active.',
    author: 'System',
    authorId: 'system',
    category: 'general',
    tags: ['system', 'v4'],
    created: new Date().toISOString(),
    replies: 0,
    repliesData: []
  }
];

console.log('✅ Data initialized with', discussions.length, 'discussions');

// Root endpoint
app.get('/', (req, res) => {
  console.log('📍 Root endpoint accessed - NEW BACKEND v4.0');
  res.json({
    status: 'SUCCESS',
    message: 'AI Learning Hub Backend v4.0 is ACTIVE!',
    version: 'v4.0-NEW-BACKEND',
    server_type: 'simple-memory-backend',
    timestamp: new Date().toISOString(),
    discussions_count: discussions.length,
    note: 'NO DATABASE - PURE MEMORY STORAGE'
  });
});

// Health endpoint  
app.get('/api/health', (req, res) => {
  console.log('📍 Health endpoint accessed - v4.0');
  res.json({
    status: 'OK',
    message: 'AI Learning Hub API v4.0 is running',
    version: 'v4.0-NEW-BACKEND',
    server_type: 'simple-memory-backend',
    discussions_count: discussions.length,
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('📍 Test endpoint accessed - v4.0');
  res.json({
    test: 'SUCCESS',
    message: 'NEW Backend v4.0 deployment successful!',
    version: 'v4.0-NEW-BACKEND',
    discussions_available: discussions.length > 0,
    all_systems: 'GO'
  });
});

// GET discussions
app.get('/api/discussions', (req, res) => {
  console.log('📍 GET /api/discussions - returning', discussions.length, 'discussions');
  res.json(discussions);
});

// POST new discussion
app.post('/api/discussions', (req, res) => {
  console.log('📍 POST /api/discussions - creating new discussion');
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
  res.json({ success: true, message: 'Discussion deleted successfully' });
});

// Projects endpoints
app.get('/api/projects', (req, res) => {
  res.json([]);
});

app.post('/api/projects', (req, res) => {
  res.json({ id: 'proj_' + Date.now(), ...req.body, created: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('🚨 Error:', err);
  res.status(500).json({ error: 'Server error' });
});

// Start server
app.listen(PORT, () => {
  console.log('🎉 AI Learning Hub Backend v4.0 running on port', PORT);
  console.log('🌐 NO DATABASE - MEMORY ONLY');
  console.log('📊 Initial discussions:', discussions.length);
});

console.log('🏁 NEW Backend v4.0 setup complete - NO SUPABASE!');