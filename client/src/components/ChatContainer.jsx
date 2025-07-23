import React, { useState, useEffect } from 'react';
import { useSocket } from '../socket/socket';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

const ChatContainer = ({ currentUser, onLogout, onNotification }) => {
  const [currentRoom, setCurrentRoom] = useState('general');
  const [privateChat, setPrivateChat] = useState(null);
  const [rooms, setRooms] = useState([
    { id: 'general', name: 'General', unreadCount: 0, type: 'room' }
  ]);
  const { messages, users, lastMessage } = useSocket();

  // Handle new message notifications
  useEffect(() => {
    if (lastMessage && lastMessage.sender !== currentUser) {
      const isCurrentRoom = privateChat 
        ? lastMessage.senderId === privateChat.id || lastMessage.receiverId === privateChat.id
        : lastMessage.room === currentRoom || !lastMessage.room;

      if (!isCurrentRoom) {
        // Show notification for messages in other rooms/chats
        onNotification(`New message from ${lastMessage.sender}`);
        
        // Browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`New message from ${lastMessage.sender}`, {
            body: lastMessage.message,
            icon: '/vite.svg'
          });
        }
        
        // Update unread count
        if (lastMessage.isPrivate) {
          // Handle private message unread count
          setRooms(prev => prev.map(room => 
            room.id === lastMessage.senderId 
              ? { ...room, unreadCount: (room.unreadCount || 0) + 1 }
              : room
          ));
        } else {
          // Handle room message unread count
          setRooms(prev => prev.map(room => 
            room.id === (lastMessage.room || 'general')
              ? { ...room, unreadCount: (room.unreadCount || 0) + 1 }
              : room
          ));
        }
      }
    }
  }, [lastMessage, currentUser, currentRoom, privateChat, onNotification]);

  // Add users as potential private chat rooms
  useEffect(() => {
    const userRooms = users
      .filter(user => user.username !== currentUser)
      .map(user => ({
        id: user.id,
        name: user.username,
        unreadCount: 0,
        type: 'user',
        isOnline: true
      }));

    setRooms(prev => [
      ...prev.filter(room => room.type === 'room'),
      ...userRooms
    ]);
  }, [users, currentUser]);

  const handleRoomChange = (room) => {
    if (room.type === 'user') {
      setPrivateChat(room);
      setCurrentRoom(null);
    } else {
      setCurrentRoom(room.id);
      setPrivateChat(null);
    }
    
    // Clear unread count for selected room
    setRooms(prev => prev.map(r => 
      r.id === room.id ? { ...r, unreadCount: 0 } : r
    ));
  };

  const handleCreateRoom = (roomName) => {
    const newRoom = {
      id: roomName.toLowerCase().replace(/\s+/g, '-'),
      name: roomName,
      unreadCount: 0,
      type: 'room'
    };
    setRooms(prev => [...prev, newRoom]);
    setCurrentRoom(newRoom.id);
    setPrivateChat(null);
  };

  return (
    <div className="chat-container">
      <Sidebar
        currentUser={currentUser}
        users={users}
        rooms={rooms}
        currentRoom={currentRoom}
        privateChat={privateChat}
        onRoomChange={handleRoomChange}
        onCreateRoom={handleCreateRoom}
        onLogout={onLogout}
      />
      <ChatArea
        currentUser={currentUser}
        currentRoom={currentRoom}
        privateChat={privateChat}
        messages={messages}
      />
    </div>
  );
};

export default ChatContainer;
