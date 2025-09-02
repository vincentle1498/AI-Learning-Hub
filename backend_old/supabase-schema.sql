-- AI Learning Hub Database Schema for Supabase
-- Run these commands in your Supabase SQL Editor

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  tech TEXT[], -- Array of technologies
  author VARCHAR(50),
  authorId VARCHAR(100),
  files JSONB DEFAULT '[]'::jsonb,
  likes INTEGER DEFAULT 0,
  stars INTEGER DEFAULT 0,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discussions table
CREATE TABLE discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  category VARCHAR(100),
  tags TEXT[], -- Array of tags
  author VARCHAR(50),
  authorId VARCHAR(100),
  replies INTEGER DEFAULT 0,
  repliesData JSONB DEFAULT '[]'::jsonb,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  category VARCHAR(100),
  difficulty VARCHAR(50),
  duration INTEGER, -- Duration in minutes
  author VARCHAR(50),
  authorId VARCHAR(100),
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rooms table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  maxParticipants INTEGER,
  owner VARCHAR(50),
  ownerId VARCHAR(100),
  participants TEXT[] DEFAULT ARRAY[]::TEXT[],
  isPrivate BOOLEAN DEFAULT false,
  enableVoice BOOLEAN DEFAULT false,
  enableScreen BOOLEAN DEFAULT false,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read/write access
-- Note: For production, you should create more restrictive policies

-- Users policies
CREATE POLICY "Allow public read access on users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on users" ON users FOR UPDATE USING (true);

-- Projects policies
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on projects" ON projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on projects" ON projects FOR DELETE USING (true);

-- Discussions policies
CREATE POLICY "Allow public read access on discussions" ON discussions FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on discussions" ON discussions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on discussions" ON discussions FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on discussions" ON discussions FOR DELETE USING (true);

-- Lessons policies
CREATE POLICY "Allow public read access on lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on lessons" ON lessons FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on lessons" ON lessons FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on lessons" ON lessons FOR DELETE USING (true);

-- Rooms policies
CREATE POLICY "Allow public read access on rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on rooms" ON rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on rooms" ON rooms FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on rooms" ON rooms FOR DELETE USING (true);