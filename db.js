const { MongoClient } = require('mongodb');
require('dotenv').config();

let db = null;
let client = null;

const connectDB = async () => {
  try {
    if (db) return db;
    
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-learning-hub';
    
    // Log connection attempt (hide password)
    const sanitizedUri = uri.replace(/:([^@]+)@/, ':****@');
    console.log('🔄 Attempting to connect to MongoDB:', sanitizedUri);
    
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 30000,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
    });
    
    await client.connect();
    console.log('✅ Connected to MongoDB successfully');
    
    db = client.db();
    
    // Create indexes for better performance
    await createIndexes();
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.codeName) console.error('Code name:', error.codeName);
    console.error('Full error:', error);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    // User indexes
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ apiKey: 1 }, { sparse: true });
    
    // Project indexes
    await db.collection('projects').createIndex({ created: -1 });
    await db.collection('projects').createIndex({ userId: 1 });
    
    // Discussion indexes
    await db.collection('discussions').createIndex({ created: -1 });
    
    // Lesson indexes
    await db.collection('lessons').createIndex({ created: -1 });
    
    // Room indexes
    await db.collection('rooms').createIndex({ created: -1 });
    await db.collection('rooms').createIndex({ status: 1 });
    
    console.log('✅ Database indexes created');
  } catch (error) {
    console.error('Index creation error:', error);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log('📴 MongoDB connection closed');
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB
};