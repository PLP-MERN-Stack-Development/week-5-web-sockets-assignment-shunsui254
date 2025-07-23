# Quick Deployment Guide

## Prerequisites

1. **Build your application first**:
   ```bash
   npm run install-deps
   npm run build
   ```

2. **Test locally**:
   ```bash
   npm run dev
   ```

## Platform-Specific Deployment

### 🌟 Heroku (Easiest for beginners)

1. **Install Heroku CLI**: Download from [heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login and create app**:
   ```bash
   heroku login
   heroku create your-chat-app-name
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**:
   ```bash
   npm run deploy:heroku
   # OR use the deployment script
   ./deploy.sh heroku          # On macOS/Linux
   deploy.bat heroku           # On Windows
   ```

### 🔺 Vercel (Great for full-stack apps)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   npm run deploy:vercel
   # OR use the deployment script
   ./deploy.sh vercel          # On macOS/Linux
   deploy.bat vercel           # On Windows
   ```

### 🌐 Render + Vercel (Recommended)

**Server (Render)**:
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect this repository
5. Configure:
   - **Name**: `socketio-chat-server`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `CLIENT_URL`: `https://your-client-url.vercel.app`

**Client (Vercel)**:
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import this repository
5. Configure:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     - `VITE_SOCKET_URL`: `https://your-server-url.onrender.com`

### 🚂 Railway (Full-stack)

1. Connect your GitHub repo to Railway
2. Railway will auto-deploy both client and server
3. Configure environment variables in Railway dashboard

## Environment Variables

### Server (.env):
```
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-deployed-client-url.com
```

### Client (.env.production):
```
VITE_API_URL=https://your-deployed-server-url.com
VITE_SOCKET_URL=https://your-deployed-server-url.com
```

## Deployment Scripts

Use the included deployment scripts for easy deployment:

```bash
# Deploy to different platforms
./deploy.sh [platform]   # macOS/Linux
deploy.bat [platform]    # Windows

# Available platforms: heroku, vercel, netlify, railway
```

## Troubleshooting

### Common Issues:

1. **Build fails**: Check all dependencies are in package.json
2. **WebSocket connection fails**: Ensure hosting provider supports WebSockets
3. **CORS errors**: Update CORS origin in server configuration
4. **Environment variables not set**: Check platform-specific env variable setup

### Quick Fixes:

```bash
# Clear node_modules and reinstall
rm -rf */node_modules
npm run install-deps

# Check build output
npm run build

# Test production build locally
cd client && npm run preview
```

## Free Hosting Recommendations

- **Beginners**: Heroku (full-stack, easy setup)
- **Performance**: Vercel (excellent for React apps)
- **Flexibility**: Render + Vercel (separate frontend/backend)
- **Modern**: Railway (great GitHub integration)
- Verify both services are running
- Check browser console for errors
