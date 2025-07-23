import React, { useState } from 'react';
import { Heart, ThumbsUp, Smile } from 'lucide-react';

const Message = ({ message, currentUser, getInitials }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState(message.reactions || {});

  const isOwnMessage = message.sender === currentUser;
  const isSystemMessage = message.system;
  const isPrivateMessage = message.isPrivate;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleReaction = (emoji) => {
    const newReactions = { ...reactions };
    const userReactions = newReactions[emoji] || [];
    
    if (userReactions.includes(currentUser)) {
      // Remove reaction
      newReactions[emoji] = userReactions.filter(user => user !== currentUser);
      if (newReactions[emoji].length === 0) {
        delete newReactions[emoji];
      }
    } else {
      // Add reaction
      newReactions[emoji] = [...userReactions, currentUser];
    }
    
    setReactions(newReactions);
    setShowReactions(false);
  };

  const reactionEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  if (isSystemMessage) {
    return (
      <div className="message system">
        <div className="message-content">
          <div className="message-text">{message.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`message ${isOwnMessage ? 'own' : ''} ${isPrivateMessage ? 'private' : ''}`}>
      {!isOwnMessage && (
        <div className="message-avatar">
          {getInitials(message.sender)}
        </div>
      )}
      
      <div className="message-content">
        {!isOwnMessage && (
          <div className="message-sender">{message.sender}</div>
        )}
        
        <div className="message-text">{message.message}</div>
        
        {message.file && (
          <div className="message-file">
            {message.file.type?.startsWith('image/') ? (
              <img src={message.file.url} alt="Shared image" />
            ) : (
              <a href={message.file.url} target="_blank" rel="noopener noreferrer">
                📎 {message.file.name}
              </a>
            )}
          </div>
        )}
        
        <div className="message-time">
          {formatTime(message.timestamp)}
          {isPrivateMessage && <span> • Private</span>}
        </div>
        
        {Object.keys(reactions).length > 0 && (
          <div className="message-reactions">
            {Object.entries(reactions).map(([emoji, users]) => (
              <div
                key={emoji}
                className={`reaction ${users.includes(currentUser) ? 'reacted' : ''}`}
                onClick={() => handleReaction(emoji)}
                title={users.join(', ')}
              >
                {emoji} {users.length}
              </div>
            ))}
          </div>
        )}
        
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowReactions(!showReactions)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '50%',
              opacity: 0.7,
              fontSize: '0.8rem'
            }}
          >
            <Smile size={14} />
          </button>
          
          {showReactions && (
            <div className="emoji-picker">
              {reactionEmojis.map(emoji => (
                <div
                  key={emoji}
                  className="emoji"
                  onClick={() => handleReaction(emoji)}
                >
                  {emoji}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {isOwnMessage && (
        <div className="message-avatar">
          {getInitials(message.sender)}
        </div>
      )}
    </div>
  );
};

export default Message;
