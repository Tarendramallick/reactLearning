# React Learning Platform - Setup & Deployment Guide

## Local Development

### 1. Environment Variables

Create a `.env.local` file (already provided):
```
JWT_SECRET=your-super-secret-jwt-key-change-in-vercel
```

### 2. Running Locally

```bash
pnpm dev
```

Visit `http://localhost:3000`

**Demo Credentials:**
- Email: `demo@example.com`
- Password: `password123`

---

## Deployment to Vercel

### Step 1: Add Environment Variables

1. Go to your Vercel project settings
2. Navigate to **Settings > Environment Variables**
3. Add the following:

| Key | Value | Description |
|-----|-------|-------------|
| `JWT_SECRET` | Generate a random string (see below) | Secret key for JWT tokens |

**To Generate a Secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use an online tool like: https://randomstring.io/

### Step 2: Set Environment Variables in Vercel

1. **Via Vercel Dashboard:**
   - Project Settings → Environment Variables
   - Add `JWT_SECRET` with your generated value
   - Make sure it applies to all environments (Production, Preview, Development)

2. **Via Vercel CLI:**
   ```bash
   vercel env add JWT_SECRET
   # Paste your generated secret
   ```

### Step 3: Deploy

```bash
vercel deploy
```

Or push to GitHub and Vercel will auto-deploy.

---

## Current Database Status

### What We Have Now
- ✅ **In-Memory Storage**: Fast, works immediately, resets on restart
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **User Sessions**: Stored in localStorage on client

### What's Missing (For Production)
- ❌ **Persistent Database**: Data doesn't survive server restarts

---

## Upgrade to a Real Database (Optional but Recommended)

### Option A: Supabase (Recommended)
1. Create account at https://supabase.com
2. Create a new project
3. Get your connection string from project settings
4. Add to Vercel environment variables:
   ```
   SUPABASE_URL=your-url
   SUPABASE_KEY=your-anon-key
   DATABASE_URL=your-connection-string
   ```

### Option B: MongoDB
1. Create cluster at https://mongodb.com/cloud/atlas
2. Get connection string
3. Add to Vercel environment variables:
   ```
   MONGODB_URI=your-connection-string
   ```

### Option C: PostgreSQL (Neon)
1. Create account at https://neon.tech
2. Create project and database
3. Get connection string
4. Add to Vercel environment variables:
   ```
   DATABASE_URL=your-connection-string
   ```

---

## Features Currently Working

✅ Landing page with hero section
✅ User authentication (login/signup)
✅ JWT token-based sessions
✅ Dark theme with React colors
✅ Sidebar navigation
✅ React Roadmap page
✅ Courses listing
✅ Projects showcase
✅ Learning Tracker with contribution calendar
✅ Resources collection
✅ Protected routes (requires login)

---

## Troubleshooting

### "JWT_SECRET is not defined"
- Add `JWT_SECRET` to your Vercel environment variables
- Restart your deployment after adding the env var

### "Can't login"
- Clear browser localStorage: `localStorage.clear()`
- Check browser console for errors
- Make sure JWT_SECRET is set

### "Data resets after restart"
- This is expected with in-memory storage
- To persist data, set up a real database (see above)

---

## Next Steps

1. ✅ Test locally with `pnpm dev`
2. ✅ Deploy to Vercel
3. ✅ Add JWT_SECRET environment variable
4. (Optional) Add a real database for data persistence
5. (Optional) Customize the demo user credentials
