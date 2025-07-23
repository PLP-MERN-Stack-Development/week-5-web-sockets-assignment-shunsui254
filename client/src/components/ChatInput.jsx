import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useSocket } from '../socket/socket';

const ChatInput = ({ currentUser, currentRoom, privateChat }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const { sendMessage, sendPrivateMessage, setTyping } = useSocket();

  const handleTyping = (value) => {
    setMessage(value);
    
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      setTyping(true);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() || selectedFile) {
      const messageData = {
        message: message.trim(),
        room: currentRoom,
        file: selectedFile ? {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size,
          url: URL.createObjectURL(selectedFile) // In a real app, you'd upload to a server
        } : null
      };

      if (privateChat) {
        sendPrivateMessage(privateChat.id, messageData);
      } else {
        sendMessage(messageData);
      }
      
      setMessage('');
      setSelectedFile(null);
      setIsTyping(false);
      setTyping(false);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="chat-input">
      {selectedFile && (
        <div style={{ 
          marginBottom: '0.5rem', 
          padding: '0.5rem', 
          background: '#f0f0f0', 
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>📎 {selectedFile.name}</span>
          <button 
            onClick={removeFile}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: '#e74c3c',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="input-container">
        <div className="file-upload">
          <input
            ref={fileInputRef}
            type="file"
            className="file-input"
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <button type="button" className="file-upload-btn">
            <Paperclip size={18} />
          </button>
        </div>
        
        <textarea
          className="message-input"
          value={message}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder={
            privateChat 
              ? `Message ${privateChat.name}...` 
              : `Message #${currentRoom || 'general'}...`
          }
          rows="1"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        
        <button
          type="submit"
          className="send-btn"
          disabled={!message.trim() && !selectedFile}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
