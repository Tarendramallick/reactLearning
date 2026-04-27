# MongoDB Setup for React Learning Platform

## Quick Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Verify email

2. **Create a Cluster**
   - Click "Create" on Atlas dashboard
   - Select "Free" tier (M0 Sandbox)
   - Choose region closest to you
   - Create cluster (takes 1-2 minutes)

3. **Create Database User**
   - Go to "Database Access" section
   - Click "Add New Database User"
   - Enter username and password
   - Copy the password (you'll need it)
   - Finish

4. **Get Connection String**
   - Go to "Databases" section
   - Click "Connect" on your cluster
   - Select "Drivers" → "Node.js"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Replace `<appName>` with: `react-learning`
   
   Final format should look like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/react-learning?retryWrites=true&w=majority
   ```

5. **Whitelist Your IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - Or add your specific IP for security
   - Confirm

6. **Add to Project**
   - In v0, open Settings (top right)
   - Go to "Vars" section
   - Click "Add Environment Variable"
   - Key: `MONGODB_URI`
   - Value: Your full connection string
   - Save

### Option 2: Local MongoDB (for development)

1. **Install MongoDB Community**
   ```bash
   # macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community

   # Windows: Download installer from https://www.mongodb.com/try/download/community

   # Linux: Follow official docs for your distribution
   ```

2. **Verify Installation**
   ```bash
   mongosh
   # You should see a MongoDB shell prompt
   # Type: exit
   ```

3. **Add Environment Variable**
   - In v0 Settings → Vars
   - Key: `MONGODB_URI`
   - Value: `mongodb://localhost:27017/react-learning`
   - Save

4. **Database Auto-Created**
   - First request to `/api/lessons` creates database and collections automatically
   - No manual setup needed!

## How It Works

### First Request Flow

When you first load the app:

1. Go to `/courses`
2. App calls `/api/lessons`
3. API checks if lessons exist in MongoDB
4. If not, it:
   - Creates `modules` collection
   - Creates `lessons` collection
   - Inserts all curriculum data
   - Returns lessons to frontend

5. Next requests are instant (data already exists)

### Data Initialization

The platform automatically:
- Creates `react-learning` database
- Creates 5 collections:
  - `modules` - Learning module definitions
  - `lessons` - Lesson content and resources
  - `users` - User accounts
  - `user_progress` - Lesson completion tracking
  - `quizzes` - Quiz questions and metadata
  - `quiz_attempts` - Student quiz results

No manual database setup required!

## Testing the Connection

### Via App
1. Sign up at `/signup`
2. Create account (user saved to MongoDB)
3. Go to `/courses`
4. Lessons load from MongoDB

If it works, your connection is valid!

### Via MongoDB CLI
```bash
# For MongoDB Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/react-learning"

# For Local MongoDB
mongosh

# In shell, check database
use react-learning
db.lessons.count()
# Should show: 15 (for complete curriculum)
```

## Troubleshooting

### "ECONNREFUSED"
- MongoDB not running
- Wrong connection string
- Check `MONGODB_URI` in environment variables

### "Authentication failed"
- Wrong username/password
- IP not whitelisted (Atlas only)
- User doesn't have access to database

### "MongoError: connect ENOTFOUND"
- Typo in connection string
- Network connectivity issue
- DNS resolution problem

### Solution Steps
1. Verify connection string format
2. Test connection separately:
   ```bash
   mongosh "your-connection-string"
   ```
3. Check environment variables are set
4. Restart dev server: `pnpm dev`
5. Clear browser cache

## Connection String Format

### MongoDB Atlas
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/react-learning?retryWrites=true&w=majority
```

### Local MongoDB
```
mongodb://localhost:27017/react-learning
```

### Custom Server
```
mongodb://user:password@host:port/react-learning
```

## Environment Variables File

For local development, you can create `.env.local`:

```bash
# .env.local
MONGODB_URI=mongodb://localhost:27017/react-learning
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

## Security Notes

### For Development
- Local MongoDB: No authentication needed
- Atlas: Any IP is okay during development

### For Production
- Always use strong passwords
- Restrict IP whitelist to your servers only
- Use environment variables from secure vault
- Never commit connection strings to git
- Enable IP whitelist on Atlas
- Use MongoDB user with minimal permissions

## After Setup

The app handles everything:
✅ Auto-creates database on first request
✅ Auto-creates collections
✅ Auto-inserts curriculum (15 lessons, 5 modules)
✅ Auto-creates tables on user signup
✅ No manual SQL migrations needed

Just set the `MONGODB_URI` environment variable and you're ready to go!

## Quick Checklist

- [ ] MongoDB created (Atlas or local)
- [ ] Database user created (Atlas only)
- [ ] IP whitelisted (Atlas only)
- [ ] Connection string copied
- [ ] `MONGODB_URI` added to project variables
- [ ] Dev server started (`pnpm dev`)
- [ ] Sign up at `/signup` to test
- [ ] View `/courses` to verify data loads

You're all set! 🚀

---

**Need help?**
- Check connection string format carefully
- Try connecting with mongosh separately
- Verify environment variable is set
- Restart dev server after changing env vars
