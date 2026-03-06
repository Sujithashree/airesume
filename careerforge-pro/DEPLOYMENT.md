cd careerforge-pro\backend

# Deployment Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Stripe account
- OpenAI API key
- Git

## Production Deployment Steps

### 1. Prepare Environment Variables

#### Backend Production (.env.production)
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_random_secret_key
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_live_your_webhook_secret
STRIPE_PRICE_ID_PRO=price_live_xxx
OPENAI_API_KEY=sk_your_openai_key
NODE_ENV=production
```

#### Frontend Production (.env.production)
```
REACT_APP_API_URL=https://api.careerforge.pro/api
REACT_APP_STRIPE_KEY=pk_live_your_live_key
```

### 2. Deploy Backend

#### Option A: Deploy to Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create careerforge-api

# Set environment variables
heroku config:set MONGODB_URI=your_url
heroku config:set JWT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=sk_live_xxx
# ... set other variables

# Deploy
git push heroku main

# Verify
heroku logs --tail
```

#### Option B: Deploy to AWS EC2
```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo-url
cd careerforge-pro/backend

# Install dependencies
npm install

# Set environment variables
nano .env.production

# Start with PM2 (process manager)
npm install -g pm2
pm2 start src/index.js --name "careerforge-api"
pm2 save
```

#### Option C: Deploy to Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Set environment variables
railway variables set MONGODB_URI=your_url
railway variables set JWT_SECRET=your_secret

# Deploy
railway up
```

### 3. Deploy Frontend

#### Option A: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod

# Set environment variables in Vercel dashboard
```

#### Option B: Deploy to Netlify
```bash
# Build the frontend
cd frontend
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

#### Option C: Deploy to GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/careerforge-pro"

# Build and deploy
npm run build
npx gh-pages -d build
```

### 4. Set Up Database

#### MongoDB Atlas (Recommended)
1. Create account at mongodb.com/cloud
2. Create cluster
3. Add database user
4. Get connection string
5. Use in MongoDB URI environment variable

#### Local MongoDB
```bash
# Install MongoDB
# macOS with Homebrew
brew install mongodb-community

# Start service
brew services start mongodb-community

# Create database
mongosh
> use careerforge
> db.createUser({user: "admin", pwd: "password", roles: ["readWrite"]})
```

### 5. Set Up Stripe

1. Go to stripe.com
2. Create account
3. Get API keys (test and live)
4. Create price for Pro plan
5. Set up webhook endpoints

### 6. Set Up DNS & Domain

1. Register domain (Namecheap, GoDaddy, etc.)
2. Point DNS to your hosted service
3. Set up HTTPS/SSL certificate
4. Update CORS settings in backend

### 7. Performance Optimization

```bash
# Backend
npm install compression  # Enable gzip compression
npm install redis       # Add caching layer

# Frontend
npm run build          # Production build
```

### 8. Monitoring & Logging

```bash
# Setup logging service (LogRocket, Sentry, etc.)
# Setup monitoring (New Relic, DataDog, etc.)
# Setup error tracking (Sentry, Rollbar, etc.)
```

### 9. Continuous Integration/Deployment

#### GitHub Actions Example (.github/workflows/deploy.yml)
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: 'careerforge-api'
          heroku_email: 'your@email.com'
```

## Checklist Before Going Live

- [ ] All environment variables set correctly
- [ ] Database backups configured
- [ ] SSL/HTTPS enabled
- [ ] Error logging set up
- [ ] Performance testing completed
- [ ] Security audit passed
- [ ] Load testing done
- [ ] API rate limiting configured
- [ ] Stripe webhooks verified
- [ ] Email service configured
- [ ] Backup plan created
- [ ] Documentation updated

## Scaling Considerations

- Use CDN for static assets
- Implement caching (Redis)
- Database indexing for queries
- Load balancing for multiple servers
- Horizontal scaling with Docker/Kubernetes
- Implement job queues (Bull, RabbitMQ)

## Rollback Plan

```bash
# If deployment fails
git revert <commit-hash>
git push heroku HEAD:main

# Or
heroku releases
heroku rollback
```

## Post-Deployment

1. Monitor error rates and performance
2. Set up alerts for critical issues
3. Schedule regular backups
4. Plan for regular updates
5. Collect user feedback
6. Iterate on features

---

For support, contact devops@careerforge.pro
