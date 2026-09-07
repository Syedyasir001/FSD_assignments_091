import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Toast() {
  const { toast } = useContext(CartContext);

  if (!toast) return null;

  return (
    <div className="toast" key={toast.message}>
      <span className="toast-icon">{toast.icon}</span>
      {toast.message}
    </div>
  );
}

export default Toast;
