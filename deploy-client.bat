@echo off
echo 🚀 Deploying Socket.io Chat Client to Vercel...

REM Navigate to client directory
cd client

echo 📦 Installing dependencies...
call npm install

echo 🏗️  Building application...
call npm run build

echo 🔺 Deploying to Vercel...
call vercel --prod

echo ✅ Deployment complete!
echo 📝 Don't forget to set environment variables in Vercel dashboard:
echo    VITE_SOCKET_URL=https://socketio-chat-server-p8q5.onrender.com

pause
