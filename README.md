[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19971114&assignment_repo_type=AssignmentRepo)
# Real-Time Chat Application with Socket.io

This assignment focuses on building a real-time chat application using Socket.io, implementing bidirectional communication between clients and server.

## Assignment Overview

You will build a chat application with the following features:
1. Real-time messaging using Socket.io
2. User authentication and presence
3. Multiple chat rooms or private messaging
4. Real-time notifications
5. Advanced features like typing indicators and read receipts

## Project Structure

```
socketio-chat/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── socket/         # Socket.io client setup
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Node.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Socket event handlers
│   ├── models/             # Data models
│   ├── socket/             # Socket.io server setup
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week5-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Quick Deployment

Ready to deploy your chat application? Here are the quickest methods:

### 🚀 Using Deployment Scripts

```bash
# Install dependencies and build
npm run install-deps
npm run build

# Deploy to your preferred platform
./deploy.sh heroku          # macOS/Linux
deploy.bat heroku           # Windows

# Available platforms: heroku, vercel, netlify, railway
```

### 📋 Manual Deployment

1. **Heroku** (Recommended for beginners):
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

2. **Vercel** (Great for full-stack):
   ```bash
   npm i -g vercel
   vercel --prod
   ```

3. **Render + Vercel** (Most reliable free option):
   - Deploy server to Render.com
   - Deploy client to Vercel.com
   - See `DEPLOYMENT.md` for detailed instructions

**📖 For complete deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## Deployment Guide

This guide provides multiple deployment options for your Socket.io chat application.

### Prerequisites

Before deploying, ensure your application is production-ready:

1. **Environment Configuration**: Set up environment variables
2. **Build Process**: Create production builds for the client
3. **Security**: Implement proper authentication and CORS
4. **Performance**: Optimize for production

### Deployment Options

#### 1. Heroku Deployment (Recommended for Beginners)

**Step 1: Prepare Your Application**

```bash
# Install Heroku CLI first from https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create a new Heroku app
heroku create your-chat-app-name
```

**Step 2: Configure Environment Variables**

```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=
# Add any other environment variables your app needs
```

**Step 3: Create a Procfile**

Create a `Procfile` in your root directory:

```
web: node server/server.js
```

**Step 4: Deploy**

```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

Your app will be available at `https://your-chat-app-name.herokuapp.com`

#### 2. Vercel Deployment (Great for Static + Serverless)

**Step 1: Install Vercel CLI**

```bash
npm i -g vercel
```

**Step 2: Configure vercel.json**

Create `vercel.json` in your root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/server.js" },
    { "src": "/(.*)", "dest": "/client/dist/$1" }
  ]
}
```

**Step 3: Deploy**

```bash
vercel --prod
```

#### 3. Netlify + Railway/Railway.app

**For Frontend (Netlify):**

1. Connect your GitHub repo to Netlify
2. Set build command: `cd client && npm run build`
3. Set publish directory: `client/dist`

**For Backend (Railway):**

1. Connect your GitHub repo to Railway
2. Select the `server` folder as root
3. Railway will auto-detect and deploy your Node.js app

#### 4. Digital Ocean App Platform

**Step 1: Create App Spec**

Create `.do/app.yaml`:

```yaml
name: socketio-chat
services:
- name: api
  source_dir: /server
  github:
    repo: your-username/your-repo
    branch: main
  run_command: node server.js
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
- name: web
  source_dir: /client
  github:
    repo: your-username/your-repo
    branch: main
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
```

#### 5. AWS Elastic Beanstalk

**Step 1: Install AWS CLI and EB CLI**

**Step 2: Initialize Elastic Beanstalk**

```bash
eb init
eb create production
eb deploy
```

### Production Configuration

#### Environment Variables

Create `.env.production` files:

**Server (.env):**
```
NODE_ENV=production
PORT=process.env.PORT || 5000
CORS_ORIGIN=https://your-frontend-domain.com
```

**Client (.env.production):**
```
VITE_API_URL=https://your-backend-domain.com
VITE_SOCKET_URL=https://your-backend-domain.com
```

#### Server Configuration Updates

Update your `server.js` for production:

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Production CORS configuration
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Client Socket Configuration

Update your socket configuration for production:

```javascript
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling']
});
```

### Build Scripts

Add these scripts to your root `package.json`:

```json
{
  "scripts": {
    "build": "cd client && npm run build",
    "start": "cd server && npm start",
    "dev": "concurrently \"cd server && npm run dev\" \"cd client && npm run dev\"",
    "install-deps": "cd server && npm install && cd ../client && npm install"
  }
}
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Production build tested locally
- [ ] CORS properly configured
- [ ] Database connection strings updated
- [ ] SSL certificates configured (for custom domains)
- [ ] Performance monitoring set up
- [ ] Error logging implemented
- [ ] Backup strategy in place

### Monitoring and Maintenance

1. **Health Checks**: Implement health check endpoints
2. **Logging**: Use services like LogRocket or Sentry
3. **Analytics**: Monitor user engagement
4. **Performance**: Use tools like New Relic or DataDog
5. **Scaling**: Plan for horizontal scaling with multiple instances

### Troubleshooting Common Issues

1. **WebSocket Connection Issues**: Ensure your hosting provider supports WebSockets
2. **CORS Errors**: Check origin configuration in production
3. **Build Failures**: Verify all dependencies are in package.json
4. **Environment Variables**: Ensure all required vars are set in production

### Free Hosting Options

For development and testing:

- **Heroku**: Free tier with limitations
- **Vercel**: Free for personal projects
- **Netlify**: Free tier for static sites
- **Railway**: Free tier with usage limits
- **Render**: Free tier available

Choose the deployment option that best fits your needs and technical expertise!

## Files Included

- `Week5-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Socket.io configuration templates
  - Sample components for the chat interface

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Modern web browser
- Basic understanding of React and Express

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement the core chat functionality
3. Add at least 3 advanced features
4. Document your setup process and features in the README.md
5. Include screenshots or GIFs of your working application
6. Optional: Deploy your application and add the URLs to your README.md

## Resources

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Building a Chat Application with Socket.io](https://socket.io/get-started/chat)