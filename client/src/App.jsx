import React, { useState, useEffect } from 'react';
import { useSocket } from './socket/socket';
import LoginForm from './components/LoginForm';
import ChatContainer from './components/ChatContainer';
import ConnectionStatus from './components/ConnectionStatus';
import Notification from './components/Notification';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const { isConnected } = useSocket();

  // Request notification permission on app load
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="app">
      <ConnectionStatus isConnected={isConnected} />
      
      {!currentUser ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <ChatContainer 
          currentUser={currentUser} 
          onLogout={handleLogout}
          onNotification={showNotification}
        />
      )}
      
      {notification && (
        <Notification 
          message={notification} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
}

export default App;
