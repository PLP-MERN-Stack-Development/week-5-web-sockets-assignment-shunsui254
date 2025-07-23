import React from 'react';

const ConnectionStatus = ({ isConnected }) => {
  if (isConnected === null) return null;

  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      {isConnected ? '🟢 Connected' : '🔴 Disconnected - Attempting to reconnect...'}
    </div>
  );
};

export default ConnectionStatus;
