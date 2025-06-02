# Deployment Guide for iConta24

This guide will help you deploy both the Strapi CMS and Next.js frontend to production.

## Overview
- **Frontend (Next.js)**: Deploy to Vercel (free tier)
- **Backend (Strapi)**: Deploy to Railway or Render (free tier)
- **Database**: PostgreSQL (included with Railway/Render)

## Option 1: Railway + Vercel (Recommended)

### Step 1: Deploy Strapi to Railway

1. **Prepare Repository**
   ```bash
   cd strapi
   git init
   git add .
   git commit -m "Initial Strapi setup"
   ```

2. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Create new project from GitHub repo

3. **Configure Railway**
   - Select your repository
   - Railway will auto-detect Node.js
   - Add PostgreSQL database service
   - Set environment variables:
     ```
     NODE_ENV=production
     DATABASE_CLIENT=postgres
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     APP_KEYS=generate-random-32-chars
     JWT_SECRET=generate-random-32-chars
     API_TOKEN_SALT=generate-random-32-chars
     ADMIN_JWT_SECRET=generate-random-32-chars
     TRANSFER_TOKEN_SALT=generate-random-32-chars
     ```

4. **Deploy**
   - Railway will automatically deploy
   - Note the app URL (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Next.js to Vercel

1. **Update Environment Variables**
   - Edit `next/.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-app.railway.app
   WEBSITE_URL=https://your-app.vercel.app
   PREVIEW_SECRET=your-preview-secret
   IMAGE_HOSTNAME=your-app.railway.app
   ```

2. **Deploy to Vercel**
   ```bash
   cd next
   npx vercel
   ```
   - Follow prompts
   - Set production environment variables in Vercel dashboard

3. **Configure Vercel Environment Variables**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add all variables from `.env.production`

### Step 3: Configure CORS in Strapi

1. **Update Railway Environment Variables**
   ```
   STRAPI_ADMIN_CLIENT_URL=https://your-app.vercel.app
   ```

2. **Test the deployment**
   - Visit your Vercel URL
   - Check that content loads from Strapi
   - Test admin panel at `https://your-app.railway.app/admin`

## Option 2: Render + Vercel

### Step 1: Deploy Strapi to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Connect GitHub account

2. **Create Web Service**
   - New → Web Service
   - Connect repository
   - Use `render.yaml` configuration

3. **Configure Environment Variables**
   ```
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_URL=${{DATABASE_URL}}
   APP_KEYS=generate-random-32-chars
   JWT_SECRET=generate-random-32-chars
   API_TOKEN_SALT=generate-random-32-chars
   ADMIN_JWT_SECRET=generate-random-32-chars
   TRANSFER_TOKEN_SALT=generate-random-32-chars
   ```

4. **Deploy**
   - Render will automatically deploy
   - Note the app URL

### Step 2: Deploy Next.js to Vercel
Follow the same steps as Option 1, Step 2.

## Environment Variables Guide

### Required Strapi Variables:
- `NODE_ENV=production`
- `DATABASE_CLIENT=postgres`
- `DATABASE_URL=<postgres-connection-string>`
- `APP_KEYS=<32-random-chars>`
- `JWT_SECRET=<32-random-chars>`
- `API_TOKEN_SALT=<32-random-chars>`
- `ADMIN_JWT_SECRET=<32-random-chars>`
- `TRANSFER_TOKEN_SALT=<32-random-chars>`

### Required Next.js Variables:
- `NEXT_PUBLIC_API_URL=<strapi-url>`
- `WEBSITE_URL=<frontend-url>`
- `PREVIEW_SECRET=<random-string>`
- `IMAGE_HOSTNAME=<strapi-domain>`

## Generate Secret Keys

Use this Node.js script to generate secure keys:

```javascript
const crypto = require('crypto');

console.log('APP_KEYS=' + crypto.randomBytes(32).toString('hex'));
console.log('JWT_SECRET=' + crypto.randomBytes(32).toString('hex'));
console.log('API_TOKEN_SALT=' + crypto.randomBytes(32).toString('hex'));
console.log('ADMIN_JWT_SECRET=' + crypto.randomBytes(32).toString('hex'));
console.log('TRANSFER_TOKEN_SALT=' + crypto.randomBytes(32).toString('hex'));
```

## Post-Deployment Setup

1. **Create Admin User**
   - Visit `https://your-strapi-app/admin`
   - Create admin account

2. **Upload Team Images**
   - Go to Media Library in Strapi admin
   - Upload team member photos
   - Attach to team members in Content Manager

3. **Test Content**
   - Create/edit content in Strapi
   - Verify it appears on frontend
   - Test preview mode

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check `STRAPI_ADMIN_CLIENT_URL` in Strapi env vars
   - Verify frontend URL is correct

2. **Images Not Loading**
   - Check `IMAGE_HOSTNAME` in Next.js env vars
   - Verify Strapi media library permissions

3. **Build Failures**
   - Check all environment variables are set
   - Verify PostgreSQL connection string

4. **Content Not Loading**
   - Check `NEXT_PUBLIC_API_URL` points to correct Strapi instance
   - Verify Strapi is running and accessible

## Free Tier Limitations

### Railway Free Tier:
- 500 hours/month runtime
- 1GB RAM
- 1GB storage
- PostgreSQL included

### Render Free Tier:
- 750 hours/month runtime
- 0.5GB RAM
- PostgreSQL included
- Automatic sleep after 15min inactivity

### Vercel Free Tier:
- 100GB bandwidth/month
- Unlimited static deployments
- Serverless functions included

## Support

If you encounter issues:
1. Check deployment logs
2. Verify all environment variables
3. Test locally first
4. Check service status pages