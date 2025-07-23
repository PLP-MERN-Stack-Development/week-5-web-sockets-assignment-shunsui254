@echo off
REM Script to prepare client-only deployment
echo 🚀 Preparing client for separate deployment...

REM Create a temporary directory for client-only deployment
mkdir temp-client-deploy 2>nul
cd temp-client-deploy

REM Copy client files
echo 📦 Copying client files...
xcopy ..\client\* . /E /I /H /Y

REM Create a simple README for the client repository
echo # Socket.io Chat Client > README.md
echo. >> README.md
echo This is the frontend client for the Socket.io chat application. >> README.md
echo. >> README.md
echo ## Environment Variables >> README.md
echo. >> README.md
echo Create a `.env.production` file with: >> README.md
echo ``` >> README.md
echo VITE_SOCKET_URL=https://your-server-url.onrender.com >> README.md
echo ``` >> README.md
echo. >> README.md
echo ## Deployment >> README.md
echo. >> README.md
echo This project is configured for Vercel deployment. >> README.md

echo ✅ Client files prepared in temp-client-deploy folder
echo 📝 Next steps:
echo 1. Create a new GitHub repository called 'socketio-chat-client'
echo 2. Copy the contents of temp-client-deploy to the new repository
echo 3. Deploy the new repository to Vercel
echo 4. Set VITE_SOCKET_URL environment variable in Vercel

pause
