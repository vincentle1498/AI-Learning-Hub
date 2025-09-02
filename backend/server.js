const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Supabase Connection
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and Key are required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
console.log('Supabase connected');

// Supabase table names
const TABLES = {
  users: 'users',
  projects: 'projects', 
  discussions: 'discussions',
  lessons: 'lessons',
  rooms: 'rooms'
};

// ============= API ROUTES =============

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Learning Hub API is running' });
});

// ----------- USER ROUTES -----------
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const { data: existingUsers, error: checkError } = await supabase
      .from(TABLES.users)
      .select('*')
      .or(`username.eq.${username},email.eq.${email}`);
    
    if (checkError) throw checkError;
    
    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create user (in production, hash password!)
    const userData = { username, email, password, created: new Date().toISOString() };
    const { data: user, error } = await supabase
      .from(TABLES.users)
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    
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
    
    const { data: users, error } = await supabase
      .from(TABLES.users)
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();
    
    if (error || !users) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      success: true, 
      user: { id: users.id, username: users.username, email: users.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- PROJECT ROUTES -----------
app.get('/api/projects', async (req, res) => {
  try {
    const { data: projects, error } = await supabase
      .from(TABLES.projects)
      .select('*')
      .order('created', { ascending: false });
    
    if (error) throw error;
    res.json(projects || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      created: new Date().toISOString(),
      likes: 0,
      stars: 0
    };
    
    const { data: project, error } = await supabase
      .from(TABLES.projects)
      .insert([projectData])
      .select()
      .single();
    
    if (error) throw error;
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { data: project, error } = await supabase
      .from(TABLES.projects)
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();
    
    if (error) throw error;
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from(TABLES.projects)
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- DISCUSSION ROUTES -----------
app.get('/api/discussions', async (req, res) => {
  try {
    const { data: discussions, error } = await supabase
      .from(TABLES.discussions)
      .select('*')
      .order('created', { ascending: false });
    
    if (error) throw error;
    res.json(discussions || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/discussions', async (req, res) => {
  try {
    const discussionData = {
      ...req.body,
      created: new Date().toISOString(),
      replies: 0,
      repliesData: []
    };
    
    const { data: discussion, error } = await supabase
      .from(TABLES.discussions)
      .insert([discussionData])
      .select()
      .single();
    
    if (error) throw error;
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/discussions/:id/reply', async (req, res) => {
  try {
    // Get current discussion
    const { data: discussion, error: fetchError } = await supabase
      .from(TABLES.discussions)
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Add reply to repliesData array
    const updatedRepliesData = [...(discussion.repliesData || []), req.body];
    
    // Update discussion with new reply
    const { data: updatedDiscussion, error: updateError } = await supabase
      .from(TABLES.discussions)
      .update({
        repliesData: updatedRepliesData,
        replies: updatedRepliesData.length
      })
      .eq('id', req.params.id)
      .select()
      .single();
    
    if (updateError) throw updateError;
    res.json(updatedDiscussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- LESSON ROUTES -----------
app.get('/api/lessons', async (req, res) => {
  try {
    const { data: lessons, error } = await supabase
      .from(TABLES.lessons)
      .select('*')
      .order('created', { ascending: false });
    
    if (error) throw error;
    res.json(lessons || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/lessons', async (req, res) => {
  try {
    const lessonData = {
      ...req.body,
      created: new Date().toISOString()
    };
    
    const { data: lesson, error } = await supabase
      .from(TABLES.lessons)
      .insert([lessonData])
      .select()
      .single();
    
    if (error) throw error;
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------- ROOM ROUTES -----------
app.get('/api/rooms', async (req, res) => {
  try {
    const { data: rooms, error } = await supabase
      .from(TABLES.rooms)
      .select('*')
      .order('created', { ascending: false });
    
    if (error) throw error;
    res.json(rooms || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rooms', async (req, res) => {
  try {
    const roomData = {
      ...req.body,
      created: new Date().toISOString(),
      participants: []
    };
    
    const { data: room, error } = await supabase
      .from(TABLES.rooms)
      .insert([roomData])
      .select()
      .single();
    
    if (error) throw error;
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/rooms/:id/join', async (req, res) => {
  try {
    // Get current room
    const { data: room, error: fetchError } = await supabase
      .from(TABLES.rooms)
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Add participant if not already in room
    const participants = room.participants || [];
    if (!participants.includes(req.body.username)) {
      participants.push(req.body.username);
      
      const { data: updatedRoom, error: updateError } = await supabase
        .from(TABLES.rooms)
        .update({ participants })
        .eq('id', req.params.id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      res.json(updatedRoom);
    } else {
      res.json(room);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});