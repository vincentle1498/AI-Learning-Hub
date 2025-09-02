# 🚀 Supabase Deployment Guide

## Step 1: Set up Supabase Database

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/snxcxrdhqojfnwtjqaiu)
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `backend/supabase-schema.sql`
4. Click **Run** to create all tables and policies

## Step 2: Get Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://snxcxrdhqojfnwtjqaiu.supabase.co`)
   - **anon/public key** (starts with `eyJhbG...`)

## Step 3: Update Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com/web/srv-d2qu1d75r7bs73b93310)
2. Click **Environment** tab
3. **Delete** old variables:
   - `MONGODB_URI`
4. **Add** new variables:
   - `SUPABASE_URL` = your Supabase project URL
   - `SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Save Changes**

## Step 4: Deploy Updated Backend

### Option A: Git Push (Recommended)
```bash
cd "C:\AI Website"
git add backend/
git commit -m "Update backend to use Supabase"
git push
```

### Option B: Manual File Upload
1. Go to your GitHub repo: https://github.com/vincentle1498/AI-Learning-Hub
2. Navigate to `backend/` folder
3. Upload the updated files:
   - `package.json`
   - `server.js`
   - `.env.example`
   - `supabase-schema.sql`

## Step 5: Monitor Deployment

1. In Render dashboard, check **Logs** tab
2. Look for:
   - ✅ `Supabase connected`
   - ✅ `Server running on port 5000`
3. Test API health: https://ai-learning-hub-backend.onrender.com/api/health

## Step 6: Test Discussion Posts

1. Go to your frontend: https://ailearninghubs.netlify.app
2. Navigate to **Discussions**
3. Create a test discussion post
4. Close and reopen the tab
5. **The post should now persist!** 🎉

## Troubleshooting

**"Supabase URL and Key are required" error:**
- Check environment variables in Render
- Make sure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set

**"relation does not exist" error:**
- Run the SQL schema in Supabase SQL Editor
- Check table names match exactly

**"row level security" errors:**
- Make sure RLS policies were created properly
- Tables should allow public access for now

## Benefits of Supabase Migration

✅ **Persistent Data**: Discussion posts survive server restarts
✅ **Real Database**: PostgreSQL with ACID compliance  
✅ **Scalable**: Better performance than in-memory storage
✅ **Admin Interface**: View/edit data in Supabase dashboard
✅ **Backup & Recovery**: Built-in database backups