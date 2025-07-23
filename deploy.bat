@echo off
REM Deployment script for Socket.io Chat Application (Windows)
REM Usage: deploy.bat [platform]
REM Platforms: heroku, vercel, netlify, railway

echo 🚀 Starting deployment process...

set PLATFORM=%1
if "%PLATFORM%"=="" set PLATFORM=heroku

REM Install dependencies
echo 📦 Installing dependencies...
call npm run install-deps

REM Build client
echo 🏗️  Building client application...
call npm run build

REM Platform-specific deployment
if "%PLATFORM%"=="heroku" goto :heroku
if "%PLATFORM%"=="vercel" goto :vercel
if "%PLATFORM%"=="netlify" goto :netlify
if "%PLATFORM%"=="railway" goto :railway

echo ❌ Unknown platform: %PLATFORM%
echo Available platforms: heroku, vercel, netlify, railway
exit /b 1

:heroku
echo 🌟 Deploying to Heroku...

REM Check if Heroku CLI is installed
heroku --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Heroku CLI is not installed. Please install it first.
    exit /b 1
)

REM Check if git remote exists
git remote get-url heroku >nul 2>&1
if errorlevel 1 (
    echo ❌ Heroku remote not found. Please run 'heroku create your-app-name' first.
    exit /b 1
)

REM Deploy to Heroku
git add .
git commit -m "Deploy to Heroku - %date% %time%"
git push heroku main

echo ✅ Deployed to Heroku successfully!
heroku open
goto :end

:vercel
echo 🔺 Deploying to Vercel...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI is not installed. Installing...
    npm i -g vercel
)

REM Deploy to Vercel
vercel --prod

echo ✅ Deployed to Vercel successfully!
goto :end

:netlify
echo 🌐 Deploying client to Netlify...

REM Check if Netlify CLI is installed
netlify --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Netlify CLI is not installed. Installing...
    npm i -g netlify-cli
)

REM Deploy client to Netlify
cd client
call npm run build
netlify deploy --prod --dir=dist
cd ..

echo ✅ Client deployed to Netlify successfully!
echo ℹ️  Note: You'll need to deploy the server separately (e.g., to Railway or Heroku)
goto :end

:railway
echo 🚂 Instructions for Railway deployment:
echo 1. Push your code to GitHub
echo 2. Connect your GitHub repo to Railway
echo 3. Railway will auto-deploy your application
echo 4. Configure environment variables in Railway dashboard
goto :end

:end
echo 🎉 Deployment completed!
