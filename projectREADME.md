# 🚀 Real-Time Chat Application with Socket.io

A fully-featured real-time chat application built with Socket.io, React, and Express.js that demonstrates bidirectional communication, live messaging, notifications, and advanced chat features.

## 🌐 Live Demo

**🚀 Try it now:** [https://socketio-chat-client-plum.vercel.app/](https://socketio-chat-client-plum.vercel.app/)

**📊 Server Status:** [https://socketio-chat-server-p8q5.onrender.com](https://socketio-chat-server-p8q5.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Features Implemented](#features-implemented)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Core Chat Functionality
- **Real-time messaging** using Socket.io
- **User authentication** (username-based)
- **Global chat room** for all users
- **Private messaging** between users
- **Multiple chat rooms/channels**
- **Typing indicators** when users are composing messages
- **Online/offline status** for users
- **Message timestamps** and sender identification

### Advanced Features
- **Message reactions** (👍, ❤️, 😂, 😮, 😢, 😡)
- **File and image sharing** with preview
- **Real-time notifications** (in-app and browser)
- **Unread message count** tracking
- **Sound notifications** for new messages
- **User presence indicators**
- **Message delivery acknowledgment**
- **Reconnection logic** for handling disconnections
- **Responsive design** for desktop and mobile

### Performance & UX
- **Smooth bidirectional communication**
- **Proper error handling** and loading states
- **Message pagination** support
- **Connection status indicators**
- **Optimized Socket.io** performance
- **Message search functionality** (ready for implementation)
- **Mobile-responsive interface**

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Socket.io Client** - Real-time communication
- **Lucide React** - Icons
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
socketio-chat/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ChatArea.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── ConnectionStatus.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── Notification.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── socket/         # Socket.io client setup
│   │   │   └── socket.js
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # App entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── server/                 # Node.js backend
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env
├── README.md
├── projectREADME.md
└── Week5-Assignment.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd week-5-web-sockets-assignment-shunsui254
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Server (.env in server directory):
   ```
   PORT=5000
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```
   
   Client (.env in client directory):
   ```
   VITE_SOCKET_URL=http://localhost:5000
   ```

5. **Start the development servers**
   
   Terminal 1 (Server):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Client):
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - Enter a username to join the chat
   - Open multiple browser tabs to test real-time features

## 📡 API Documentation

### Socket Events

#### Client to Server
- `user_join` - User joins the chat
- `send_message` - Send a message to a room
- `private_message` - Send a private message
- `typing` - Indicate typing status
- `create_room` - Create a new chat room
- `join_room` - Join a specific room
- `leave_room` - Leave a room

#### Server to Client
- `user_list` - Updated list of connected users
- `user_joined` - New user joined notification
- `user_left` - User left notification
- `receive_message` - New message received
- `private_message` - Private message received
- `typing_users` - List of currently typing users

### REST API Endpoints
- `GET /api/messages` - Retrieve chat messages
- `GET /api/users` - Get connected users
- `GET /api/online` - Get online users
- `GET /api/rooms` - List available rooms
- `GET /health` - Server health check

## ✅ Features Implemented

### Task 1: Project Setup ✅
- [x] Node.js server with Express
- [x] Socket.io server configuration
- [x] React front-end application
- [x] Socket.io client setup
- [x] Basic client-server connection

### Task 2: Core Chat Functionality ✅
- [x] User authentication (username-based)
- [x] Global chat room
- [x] Message display with sender and timestamp
- [x] Typing indicators
- [x] Online/offline status

### Task 3: Advanced Chat Features ✅
- [x] Private messaging between users
- [x] Multiple chat rooms/channels
- [x] "User is typing" indicator
- [x] File and image sharing
- [x] Message reactions
- [x] Read receipts (visual indicators)

### Task 4: Real-Time Notifications ✅
- [x] New message notifications
- [x] User join/leave notifications
- [x] Unread message count
- [x] Sound notifications
- [x] Browser notifications (Web Notifications API)

### Task 5: Performance and UX Optimization ✅
- [x] Message pagination support
- [x] Reconnection logic
- [x] Socket.io optimization (rooms, namespaces)
- [x] Message delivery acknowledgment
- [x] Search functionality (infrastructure ready)
- [x] Responsive design (desktop and mobile)

## 🎯 Key Highlights

1. **Real-time Communication**: Seamless bidirectional communication using Socket.io
2. **User Experience**: Intuitive interface with modern design patterns
3. **Scalability**: Room-based architecture for better performance
4. **Reliability**: Connection status monitoring and auto-reconnection
5. **Accessibility**: Responsive design works on various devices
6. **Feature Rich**: Comprehensive chat features including reactions, file sharing, and notifications

## 🚀 Deployment

### 🌐 Live Application

**Try the live application here:**

🔗 **Client (Frontend)**: [https://socketio-chat-client-plum.vercel.app/](https://socketio-chat-client-plum.vercel.app/)  
🔗 **Server (Backend)**: [https://socketio-chat-server-p8q5.onrender.com](https://socketio-chat-server-p8q5.onrender.com)

The application is fully deployed and ready to use! Open the client URL to start chatting.

### Server Deployment (Render/Railway/Heroku)
1. Create a new service on your chosen platform
2. Connect your repository
3. Set environment variables:
   - `PORT` (usually auto-set)
   - `CLIENT_URL` (your deployed client URL)
   - `NODE_ENV=production`
4. Deploy from the `server` directory

### Client Deployment (Vercel/Netlify)
1. Create a new project
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables:
   - `VITE_SOCKET_URL` (your deployed server URL)
4. Deploy from the `client` directory

## 🔮 Future Enhancements

- [ ] Message search and filtering
- [ ] User profiles and avatars
- [ ] Voice and video calls
- [ ] Message persistence with database
- [ ] Admin controls and moderation
- [ ] Custom emoji support
- [ ] Message encryption
- [ ] Mobile app using React Native
- [ ] Desktop app using Electron

## 🤝 Contributing

This project was created as part of a Socket.io assignment. Feel free to fork and enhance it further!

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Socket.io, React, and Express.js**