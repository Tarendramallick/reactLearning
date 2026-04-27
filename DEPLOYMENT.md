## Deployment Guide - React Learning Platform

Complete guide for deploying to production.

---

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] MongoDB account (Atlas or local)
- [ ] Git repository created
- [ ] Vercel account (for recommended deployment)
- [ ] All environment variables ready

---

## Part 1: Environment Setup

### MongoDB Connection

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a project
4. Create a cluster (M0 free tier is enough)
5. Add IP whitelist (0.0.0.0/0 for development)
6. Create database user
7. Copy connection string

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/reactlearning?retryWrites=true&w=majority
```

#### Option B: MongoDB Local

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string:
```
mongodb://localhost:27017/reactlearning
```

### Environment Variables

Create `.env.local` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reactlearning?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=production
```

Generate a secure JWT secret:
```bash
openssl rand -base64 32
```

---

## Part 2: Local Testing Before Deployment

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Verification
```bash
node scripts/verify-setup.js
```

Expected output:
```
✅ Passed: 38
```

### 3. Run Development Server
```bash
pnpm dev
```

### 4. Test Application

Visit: http://localhost:3000

**Quick Test Checklist:**
- [ ] Home page loads
- [ ] Can sign up
- [ ] Can login
- [ ] Can view courses
- [ ] Can view lesson
- [ ] Can take quiz
- [ ] Can see results
- [ ] Progress tracks

### 5. Run Production Build
```bash
pnpm build
pnpm start
```

Should complete without errors.

---

## Part 3: Deploy to Vercel (Recommended)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "React Learning Platform - Complete"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/react-learning.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Add Environment Variables

In Vercel Project Settings:

1. Go to Settings → Environment Variables
2. Add:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string
   - Environments: Production, Preview, Development

3. Click "Save"

### Step 4: Deploy

Click "Deploy" button

**Deployment Time:** Usually 2-3 minutes

---

## Part 4: Post-Deployment Verification

### 1. Check Deployment Status

Visit your Vercel deployment URL (e.g., https://react-learning.vercel.app)

### 2. Test All Features

**Quick Test:**
1. Sign up with new account
2. Login
3. Browse courses
4. Complete a lesson quiz
5. Check progress

### 3. Monitor Logs

In Vercel Dashboard:
- Go to Deployments
- Click on current deployment
- View Function Logs
- Check for any errors

### 4. Database Verification

```bash
# Using MongoDB Compass or CLI, verify:
- users collection has your test user
- lessons collection has 15 lessons
- quiz_attempts collection has attempts
- user_progress collection has progress records
```

---

## Part 5: Production Best Practices

### Security

1. **Change JWT Secret**
   ```env
   JWT_SECRET=generate-new-strong-secret
   ```

2. **Enable MongoDB IP Whitelist**
   - Only allow your Vercel IPs
   - Or use VPN for security

3. **Enable HTTPS** (automatic on Vercel)

4. **Set Secure Cookies**
   - Already configured in code
   - Verify in production

### Performance

1. **Enable Caching**
   - Vercel CDN enabled by default
   - Configure in next.config.mjs

2. **Database Optimization**
   - Add indexes for frequently queried fields
   - Monitor query performance

3. **Monitor Application**
   - Use Vercel Analytics
   - Set up error tracking (Sentry optional)

### Monitoring

1. **Vercel Analytics**
   - Available in dashboard
   - Monitor page load times
   - Track errors

2. **Database Monitoring**
   - MongoDB Atlas provides dashboard
   - Monitor query performance
   - Check storage usage

---

## Part 6: Scaling Considerations

### When to Scale

**Upgrade database when:**
- Approaching storage limits
- Query response times > 100ms
- Need 99.9% uptime SLA

**Upgrade hosting when:**
- Concurrent users > 1000
- Average response time > 500ms

### MongoDB Scaling

1. Move from M0 (Free) to M2 tier
2. Enable auto-sharding for large datasets
3. Use connection pooling

### Vercel Scaling

- Automatically scales serverless functions
- No action needed for typical loads
- Premium support for enterprise

---

## Part 7: Troubleshooting

### Issue: MongoDB Connection Failed

**Solution:**
```bash
# Test connection string
mongosh "your-connection-string"

# Check:
1. Username and password correct
2. IP whitelisted
3. Database exists
4. Network connectivity
```

### Issue: Pages Load Slowly

**Solution:**
1. Check database query performance
2. Enable Vercel Analytics
3. Review logs for bottlenecks
4. Consider upgrading MongoDB tier

### Issue: Quiz Data Not Appearing

**Solution:**
```bash
# Verify in MongoDB:
1. Check 'quizzes' collection exists
2. Verify 7 quizzes present
3. Check question data integrity
4. Review API logs
```

### Issue: User Can't Login

**Solution:**
1. Check user exists in MongoDB
2. Verify password hashing
3. Check JWT secret consistency
4. Review auth logs

---

## Part 8: Maintenance

### Weekly Tasks
- [ ] Check error logs
- [ ] Monitor response times
- [ ] Verify backups

### Monthly Tasks
- [ ] Update dependencies
- [ ] Review security
- [ ] Check cost usage
- [ ] Update documentation

### Quarterly Tasks
- [ ] Security audit
- [ ] Performance review
- [ ] Database optimization
- [ ] User feedback analysis

---

## Part 9: Backup Strategy

### MongoDB Atlas Backup

1. Enable automatic backups (default)
2. Set 7-day retention
3. Test restore procedure monthly

### Application Backup

1. Keep GitHub as source of truth
2. Tag releases: `v1.0.0`
3. Create release notes

---

## Part 10: Monitoring Commands

### Check Application Health

```bash
# Vercel CLI health check
vercel inspect

# MongoDB connection test
mongosh "your-connection-string"

# Check Node.js memory
node -e "console.log(process.memoryUsage())"
```

### View Logs

**Vercel Logs:**
```bash
vercel logs
```

**MongoDB Atlas Logs:**
- Available in MongoDB Atlas Dashboard
- Requires login

---

## Part 11: Rollback Procedure

If something goes wrong:

### Vercel Rollback

1. Go to Vercel Dashboard
2. Deployments section
3. Select previous deployment
4. Click "Promote to Production"

### Database Rollback

1. Go to MongoDB Atlas
2. Backup/Restore section
3. Select backup point
4. Confirm restore

---

## Part 12: Cost Estimation

### Vercel
- Free tier: Good for <100 users
- Hobby: $20/month for small projects
- Pro: $20/month per workspace

### MongoDB
- Free (M0): 512MB storage
- M2: $9/month for 10GB
- M5: $57/month for 100GB

### Total Monthly Cost
- Small (< 100 users): ~$0 (free tier)
- Medium (100-1000 users): ~$20-30
- Large (1000+ users): ~$50-100+

---

## Part 13: Success Checklist

After deployment, verify:

- [ ] Site loads in < 2 seconds
- [ ] All pages accessible
- [ ] Authentication works
- [ ] Can complete quiz
- [ ] Progress saves
- [ ] Database connected
- [ ] Error handling works
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] SSL/HTTPS working
- [ ] Backups enabled
- [ ] Monitoring configured

---

## Support & Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)

### Getting Help
1. Check TESTING_GUIDE.md for common issues
2. Review ARCHITECTURE.md for design
3. Read error messages carefully
4. Check server logs

### Contact & Issues
- GitHub Issues for bug reports
- GitHub Discussions for questions
- Create support ticket in Vercel dashboard

---

## Final Checklist

Before going live:

- [ ] Environment variables set
- [ ] Local testing passed
- [ ] Build completes without errors
- [ ] Database is production-ready
- [ ] Backups configured
- [ ] SSL certificates valid
- [ ] Monitoring enabled
- [ ] Error tracking configured
- [ ] Documentation reviewed
- [ ] Team notified

---

**Your React Learning Platform is Ready for Production!** 🚀

For questions, refer to:
1. QUICK_START.md - Quick setup
2. TESTING_GUIDE.md - Testing procedures  
3. ARCHITECTURE.md - System design
4. ZUSTAND_IMPLEMENTATION.md - State management
