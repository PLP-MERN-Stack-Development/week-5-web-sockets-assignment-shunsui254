import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatArea = ({ currentUser, currentRoom, privateChat, messages }) => {
  // Filter messages based on current room or private chat
  const filteredMessages = messages.filter(message => {
    if (privateChat) {
      // Show private messages between current user and selected user
      return message.isPrivate && (
        (message.senderId === privateChat.id && message.receiverId === currentUser) ||
        (message.sender === currentUser && message.receiverId === privateChat.id)
      );
    } else {
      // Show room messages (messages without isPrivate flag or with matching room)
      return !message.isPrivate && (message.room === currentRoom || (!message.room && currentRoom === 'general'));
    }
  });

  return (
    <div className="main-chat">
      <ChatHeader 
        currentRoom={currentRoom} 
        privateChat={privateChat} 
      />
      <MessageList 
        messages={filteredMessages} 
        currentUser={currentUser} 
      />
      <ChatInput 
        currentUser={currentUser}
        currentRoom={currentRoom}
        privateChat={privateChat}
      />
    </div>
  );
};

export default ChatArea;
