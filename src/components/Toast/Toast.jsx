import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'error', duration = 3000, onClose }) => {
  
  // Close the toast after the duration passes
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();  // Close the toast after `duration`
    }, duration);

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, [duration, onClose]);

  return (
    <div className={`toast ${type}`}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
