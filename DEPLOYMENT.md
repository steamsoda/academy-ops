# Deployment Guide - Vercel

This guide will help you deploy the Dragon Force Monterrey Academy Operations system to Vercel.

## 🚀 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **PostgreSQL Database**: You'll need a PostgreSQL database (recommended: Vercel Postgres, Railway, or Supabase)

## 📋 Step-by-Step Deployment

### 1. Connect Repository to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing your academy-ops code

### 2. Configure Environment Variables

In your Vercel project settings, add these environment variables:

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-strong-random-secret-here"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Application
NEXT_PUBLIC_APP_NAME="Dragon Force Monterrey"
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
```

### 3. Database Setup

#### Option A: Vercel Postgres (Recommended)

1. In your Vercel project, go to "Storage" tab
2. Click "Create Database"
3. Select "Postgres"
4. Choose your plan
5. Copy the connection string to your `DATABASE_URL` environment variable

#### Option B: External PostgreSQL

Use any PostgreSQL provider:
- **Railway**: [railway.app](https://railway.app)
- **Supabase**: [supabase.com](https://supabase.com)
- **Neon**: [neon.tech](https://neon.tech)

### 4. Deploy

1. Vercel will automatically detect Next.js
2. The build command is already configured: `npm run build`
3. Click "Deploy"

### 5. Initialize Database

After deployment, you need to set up your database:

1. Go to your Vercel project dashboard
2. Open the "Functions" tab
3. Find your API routes
4. The database will be automatically set up on first API call

Alternatively, you can run database setup manually:

```bash
# Connect to your Vercel project
vercel link

# Run database setup
vercel env pull .env.local
npm run db:setup:prod
```

## 🔧 Post-Deployment

### 1. Verify Deployment

1. Visit your deployed URL
2. Check that the Windows 98 theme loads correctly
3. Test the dashboard and players pages

### 2. Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to use your custom domain

### 3. Monitor Performance

1. Check Vercel Analytics
2. Monitor function execution times
3. Set up error tracking if needed

## 🐛 Troubleshooting

### Build Errors

**Error**: `@prisma/client did not initialize yet`

**Solution**: The build script now includes `prisma generate`, but if you still get this error:

1. Check that `DATABASE_URL` is set correctly
2. Ensure PostgreSQL is accessible from Vercel
3. Try redeploying

### Database Connection Issues

**Error**: `Connection refused` or `Authentication failed`

**Solution**:
1. Verify your `DATABASE_URL` format
2. Check that your database allows external connections
3. Ensure your database credentials are correct

### Environment Variables

**Error**: `NEXTAUTH_SECRET is not set`

**Solution**:
1. Generate a strong secret: `openssl rand -base64 32`
2. Add it to your Vercel environment variables
3. Redeploy

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data to your repository
2. **Database Access**: Use connection pooling and limit database access
3. **HTTPS**: Vercel automatically provides HTTPS
4. **CORS**: Configure CORS if needed for external API calls

## 📊 Performance Optimization

1. **Database Indexing**: Ensure your database has proper indexes
2. **Caching**: Consider implementing Redis for caching
3. **CDN**: Vercel automatically provides global CDN
4. **Image Optimization**: Use Next.js Image component for optimized images

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to your main branch. To set up:

1. Connect your GitHub repository
2. Configure branch protection rules
3. Set up preview deployments for pull requests

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review this documentation
3. Check the main README.md
4. Create an issue in the repository

---

**Happy Deploying! 🚀**
