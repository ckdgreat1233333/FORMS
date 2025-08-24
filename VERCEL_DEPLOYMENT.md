# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy your project**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `nearlly-lead-capture` (or your preferred name)
   - Directory: `.` (current directory)
   - Override settings: `N`

5. **Your app will be deployed!** 🎉

### Option 2: Deploy via GitHub (Automatic)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**

3. **Click "New Project"**

4. **Import your GitHub repository**

5. **Configure project:**
   - Framework Preset: `Node.js`
   - Root Directory: `.`
   - Build Command: Leave empty (not needed)
   - Output Directory: Leave empty (not needed)

6. **Click "Deploy"**

## 🎯 What You Get

After deployment, you'll get:
- **Production URL**: `https://your-app-name.vercel.app`
- **Automatic HTTPS**
- **Global CDN**
- **Custom domain support** (optional)

## 📱 Using Your Deployed App

### For Instagram Ads:
- **Main Form**: `https://your-app-name.vercel.app`
- **Admin Dashboard**: `https://your-app-name.vercel.app/admin.html`

### API Endpoints:
- **View Leads**: `https://your-app-name.vercel.app/api/leads`
- **View Stats**: `https://your-app-name.vercel.app/api/stats`

## 🔧 Important Notes for Vercel

### Data Storage
- Vercel uses serverless functions
- Data is stored in JSON files (temporary for serverless)
- For production, consider using a database like:
  - **MongoDB Atlas** (free tier available)
  - **Supabase** (PostgreSQL)
  - **PlanetScale** (MySQL)

### Environment Variables
If you need to add environment variables:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add any required variables

### Custom Domain
To add a custom domain:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your domain and follow DNS instructions

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all dependencies are in `package.json`
   - Ensure `vercel.json` is properly configured

2. **API Routes Not Working**
   - Verify the routes in `vercel.json`
   - Check that `server.js` exports the app

3. **Data Not Persisting**
   - Vercel serverless functions are stateless
   - Consider using a database for production

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments and performance
- **Function Logs**: View serverless function logs
- **Analytics**: Built-in performance analytics

## 🔄 Updates

To update your deployed app:
```bash
vercel --prod
```

Or push to GitHub if you set up automatic deployment.

## 💡 Pro Tips

1. **Use Vercel's preview deployments** for testing changes
2. **Set up automatic deployments** from GitHub
3. **Monitor function execution times** (serverless limits)
4. **Use environment variables** for sensitive data
5. **Enable Vercel Analytics** for performance insights

## 🎉 You're Ready!

Your lead capture form is now live and ready for Instagram ads! The form will work perfectly on mobile devices and capture all your leads automatically. 