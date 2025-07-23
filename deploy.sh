#!/bin/bash

# Deployment script for Socket.io Chat Application
# Usage: ./deploy.sh [platform]
# Platforms: heroku, vercel, netlify, railway

set -e

echo "🚀 Starting deployment process..."

PLATFORM=${1:-heroku}

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-deps

# Build client
echo "🏗️  Building client application..."
npm run build

# Platform-specific deployment
case $PLATFORM in
  "heroku")
    echo "🌟 Deploying to Heroku..."
    
    # Check if Heroku CLI is installed
    if ! command -v heroku &> /dev/null; then
      echo "❌ Heroku CLI is not installed. Please install it first."
      exit 1
    fi
    
    # Check if git remote exists
    if ! git remote get-url heroku &> /dev/null; then
      echo "❌ Heroku remote not found. Please run 'heroku create your-app-name' first."
      exit 1
    fi
    
    # Deploy to Heroku
    git add .
    git commit -m "Deploy to Heroku - $(date)"
    git push heroku main
    
    echo "✅ Deployed to Heroku successfully!"
    heroku open
    ;;
    
  "vercel")
    echo "🔺 Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
      echo "❌ Vercel CLI is not installed. Installing..."
      npm i -g vercel
    fi
    
    # Deploy to Vercel
    vercel --prod
    
    echo "✅ Deployed to Vercel successfully!"
    ;;
    
  "netlify")
    echo "🌐 Deploying client to Netlify..."
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
      echo "❌ Netlify CLI is not installed. Installing..."
      npm i -g netlify-cli
    fi
    
    # Deploy client to Netlify
    cd client
    npm run build
    netlify deploy --prod --dir=dist
    cd ..
    
    echo "✅ Client deployed to Netlify successfully!"
    echo "ℹ️  Note: You'll need to deploy the server separately (e.g., to Railway or Heroku)"
    ;;
    
  "railway")
    echo "🚂 Instructions for Railway deployment:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your GitHub repo to Railway"
    echo "3. Railway will auto-deploy your application"
    echo "4. Configure environment variables in Railway dashboard"
    ;;
    
  *)
    echo "❌ Unknown platform: $PLATFORM"
    echo "Available platforms: heroku, vercel, netlify, railway"
    exit 1
    ;;
esac

echo "🎉 Deployment completed!"
