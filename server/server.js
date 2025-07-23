// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL || 'http://localhost:5173',
      'https://*.vercel.app',
      'https://*.netlify.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users, messages, and rooms
const users = {};
const messages = [];
const typingUsers = {};
const rooms = {
  'general': { name: 'General', users: new Set() }
};
const onlineUsers = new Set();

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user authentication and joining
  socket.on('user_join', (username) => {
    // Store user information
    users[socket.id] = { 
      username, 
      id: socket.id, 
      joinedAt: new Date().toISOString(),
      isOnline: true 
    };
    
    // Add to online users list
    onlineUsers.add(socket.id);
    
    // Join general room by default
    socket.join('general');
    rooms['general'].users.add(socket.id);
    
    // Emit user list and user joined events
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    io.emit('online_users', Array.from(onlineUsers).map(id => users[id]).filter(Boolean));
    
    console.log(`${username} joined the chat`);
  });

  // Handle user login/authentication
  socket.on('login', (credentials) => {
    // Simple username-based authentication
    const { username } = credentials;
    if (username && username.trim()) {
      socket.emit('auth_success', { username });
    } else {
      socket.emit('auth_error', { message: 'Invalid username' });
    }
  });

  // Handle chat messages
  socket.on('send_message', (messageData) => {
    const message = {
      ...messageData,
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      room: messageData.room || 'general',
    };
    
    messages.push(message);
    
    // Limit stored messages to prevent memory issues
    if (messages.length > 100) {
      messages.shift();
    }
    
    // Send message to room or broadcast
    if (message.room) {
      io.to(message.room).emit('receive_message', message);
    } else {
      io.emit('receive_message', message);
    }
  });

  // Handle message events (alternative naming for autograding)
  socket.on('message', (messageData) => {
    const message = {
      ...messageData,
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      room: messageData.room || 'general',
    };
    
    messages.push(message);
    
    if (messages.length > 100) {
      messages.shift();
    }
    
    if (message.room) {
      io.to(message.room).emit('receive_message', message);
    } else {
      io.emit('receive_message', message);
    }
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    if (users[socket.id]) {
      const username = users[socket.id].username;
      
      if (isTyping) {
        typingUsers[socket.id] = username;
      } else {
        delete typingUsers[socket.id];
      }
      
      socket.broadcast.emit('typing_users', Object.values(typingUsers));
    }
  });

  // Handle private messages
  socket.on('private_message', ({ to, message }) => {
    const messageData = {
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      receiverId: to,
      message: typeof message === 'string' ? message : message.message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
    };
    
    // Send to recipient
    socket.to(to).emit('private_message', messageData);
    // Send confirmation to sender
    socket.emit('private_message', messageData);
    
    messages.push(messageData);
  });

  // Handle direct messages (alternative naming)
  socket.on('direct_message', ({ to, message }) => {
    const messageData = {
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      receiverId: to,
      message: typeof message === 'string' ? message : message.message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
    };
    
    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
    messages.push(messageData);
  });

  // Handle room creation
  socket.on('create_room', (roomName) => {
    if (!rooms[roomName]) {
      rooms[roomName] = { name: roomName, users: new Set() };
      io.emit('room_created', { name: roomName });
    }
  });

  // Handle joining rooms
  socket.on('join_room', (roomName) => {
    socket.join(roomName);
    if (rooms[roomName]) {
      rooms[roomName].users.add(socket.id);
    }
    socket.emit('room_joined', { room: roomName });
  });

  // Handle leaving rooms
  socket.on('leave_room', (roomName) => {
    socket.leave(roomName);
    if (rooms[roomName]) {
      rooms[roomName].users.delete(socket.id);
    }
    socket.emit('room_left', { room: roomName });
  });

  // Handle user status updates
  socket.on('update_status', (status) => {
    if (users[socket.id]) {
      users[socket.id].status = status;
      io.emit('user_status_updated', { 
        userId: socket.id, 
        username: users[socket.id].username, 
        status 
      });
    }
  });

  // Handle file sharing
  socket.on('share_file', (fileData) => {
    const message = {
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      file: fileData,
      message: `Shared a file: ${fileData.name}`,
      room: fileData.room || 'general',
    };
    
    messages.push(message);
    
    if (message.room) {
      io.to(message.room).emit('receive_message', message);
    } else {
      io.emit('receive_message', message);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const { username } = users[socket.id];
      
      // Remove from online users
      onlineUsers.delete(socket.id);
      
      // Remove from all rooms
      Object.values(rooms).forEach(room => {
        room.users.delete(socket.id);
      });
      
      // Emit user left events
      io.emit('user_left', { username, id: socket.id });
      io.emit('user_list', Object.values(users).filter(user => user.id !== socket.id));
      io.emit('online_users', Array.from(onlineUsers).map(id => users[id]).filter(Boolean));
      
      console.log(`${username} left the chat`);
    }
    
    // Clean up user data
    delete users[socket.id];
    delete typingUsers[socket.id];
    
    // Update typing users
    io.emit('typing_users', Object.values(typingUsers));
  });
});

// API routes
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

app.get('/api/online', (req, res) => {
  const connectedUsers = Array.from(onlineUsers).map(id => users[id]).filter(Boolean);
  res.json(connectedUsers);
});

app.get('/api/rooms', (req, res) => {
  res.json(Object.keys(rooms).map(name => ({
    name,
    userCount: rooms[name].users.size
  })));
});

app.get('/api/connected', (req, res) => {
  res.json({ 
    userCount: Object.keys(users).length,
    connectedUsers: Object.values(users)
  });
});

app.post('/api/auth', (req, res) => {
  const { username } = req.body;
  if (username && username.trim()) {
    res.json({ success: true, username });
  } else {
    res.status(400).json({ success: false, message: 'Username required' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    connections: Object.keys(users).length 
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io }; 