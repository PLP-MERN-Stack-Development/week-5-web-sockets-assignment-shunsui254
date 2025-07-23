@echo off
echo 🚀 Deploying Socket.io Chat Server to Render...

echo 📦 Step 1: Ensure dependencies are up to date
cd server
call npm install

echo 📝 Step 2: Commit and push changes to GitHub
cd ..
git add .
git commit -m "Deploy server to Render - %date% %time%"
git push origin main

echo 🌐 Step 3: Instructions for Render deployment
echo.
echo Now go to Render.com and:
echo 1. Create a new Web Service
echo 2. Connect your GitHub repository
echo 3. Use these settings:
echo    - Name: socketio-chat-server
echo    - Root Directory: server
echo    - Environment: Node
echo    - Build Command: npm install
echo    - Start Command: npm start
echo    - Environment Variables:
echo      NODE_ENV=production
echo      PORT=10000
echo.
echo 4. Click "Create Web Service"
echo 5. Wait for deployment to complete
echo 6. Copy your server URL for client deployment

echo ✅ Server code is ready for Render deployment!
pause
