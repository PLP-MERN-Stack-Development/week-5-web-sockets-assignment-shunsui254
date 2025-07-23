import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { useSocket } from '../socket/socket';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);
  const { typingUsers } = useSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          currentUser={currentUser}
          getInitials={getInitials}
        />
      ))}
      
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          {typingUsers.length === 1 
            ? `${typingUsers[0]} is typing...`
            : `${typingUsers.slice(0, -1).join(', ')} and ${typingUsers[typingUsers.length - 1]} are typing...`
          }
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
