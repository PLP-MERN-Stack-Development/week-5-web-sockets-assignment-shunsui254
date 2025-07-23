import React from 'react';
import { X } from 'lucide-react';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          marginLeft: '1rem'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;
