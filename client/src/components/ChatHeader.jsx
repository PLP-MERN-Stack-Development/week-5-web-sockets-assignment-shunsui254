import React from 'react';
import { Hash, User } from 'lucide-react';

const ChatHeader = ({ currentRoom, privateChat }) => {
  return (
    <div className="chat-header">
      <h3>
        {privateChat ? (
          <>
            <User size={20} style={{ marginRight: '0.5rem' }} />
            {privateChat.name}
          </>
        ) : (
          <>
            <Hash size={20} style={{ marginRight: '0.5rem' }} />
            {currentRoom || 'general'}
          </>
        )}
      </h3>
    </div>
  );
};

export default ChatHeader;
