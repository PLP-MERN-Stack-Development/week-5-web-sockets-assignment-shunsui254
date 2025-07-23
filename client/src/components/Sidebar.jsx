import React, { useState } from 'react';
import { Users, LogOut, Plus } from 'lucide-react';

const Sidebar = ({ 
  currentUser, 
  users, 
  rooms, 
  currentRoom, 
  privateChat, 
  onRoomChange, 
  onCreateRoom, 
  onLogout 
}) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      onCreateRoom(newRoomName.trim());
      setNewRoomName('');
      setShowCreateRoom(false);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Chat Rooms</h3>
        <div className="user-status">
          <span className="online-status">● </span>
          {currentUser}
        </div>
      </div>

      <div className="room-selector">
        <div className="room-list">
          <h4>Rooms</h4>
          {rooms.filter(room => room.type === 'room').map(room => (
            <div
              key={room.id}
              className={`room-item ${
                currentRoom === room.id && !privateChat ? 'active' : ''
              }`}
              onClick={() => onRoomChange(room)}
            >
              <span className="room-name"># {room.name}</span>
              {room.unreadCount > 0 && (
                <span className="unread-count">{room.unreadCount}</span>
              )}
            </div>
          ))}
          
          {showCreateRoom ? (
            <form onSubmit={handleCreateRoom} style={{ marginTop: '0.5rem' }}>
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="Room name"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #667eea',
                  borderRadius: '5px',
                  marginBottom: '0.5rem'
                }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Create
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowCreateRoom(false)}
                  style={{ 
                    padding: '0.5rem', 
                    border: '1px solid #ccc', 
                    background: 'transparent',
                    color: 'white',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              className="create-room-btn"
              onClick={() => setShowCreateRoom(true)}
            >
              <Plus size={16} style={{ marginRight: '0.5rem' }} />
              Create Room
            </button>
          )}
        </div>
      </div>

      <div className="users-list">
        <h4>
          <Users size={16} style={{ marginRight: '0.5rem' }} />
          Online Users ({users.length})
        </h4>
        {users.map(user => (
          <div
            key={user.id}
            className={`user-item ${
              privateChat && privateChat.id === user.id ? 'active' : ''
            }`}
            onClick={() => user.username !== currentUser && onRoomChange({
              id: user.id,
              name: user.username,
              type: 'user'
            })}
            style={{ 
              cursor: user.username !== currentUser ? 'pointer' : 'default',
              opacity: user.username === currentUser ? 0.7 : 1 
            }}
          >
            <div className="user-avatar">
              {getInitials(user.username)}
            </div>
            <div className="user-info">
              <div className="user-name">
                {user.username}
                {user.username === currentUser && ' (You)'}
              </div>
              {user.isTyping && (
                <div className="user-typing">typing...</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '1rem', borderTop: '1px solid #3c5169' }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #e74c3c',
            background: 'transparent',
            color: '#e74c3c',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
