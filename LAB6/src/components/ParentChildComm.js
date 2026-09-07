import React, { useState } from 'react';

// Child Component: Receives props and a callback function from Parent
function Child({ storeDiscount, onDiscountChange }) {
  return (
    <div className="child-box">
      <p>Child Component: Current Store Discount is <strong>{storeDiscount}%</strong></p>
      <div className="button-group">
        <button onClick={() => onDiscountChange(10)} className="btn btn-outline">Set 10% Off</button>
        <button onClick={() => onDiscountChange(20)} className="btn btn-outline">Set 20% Off</button>
        <button onClick={() => onDiscountChange(0)} className="btn btn-outline">Clear Discount</button>
      </div>
    </div>
  );
}

// Parent Component: Holds state and passes down props and callback
function ParentChildComm() {
  const [discount, setDiscount] = useState(10);
  const [log, setLog] = useState('Initialized with 10% discount');

  // Callback function executed when Child triggers it
  const handleDiscountChange = (newDiscount) => {
    setDiscount(newDiscount);
    setLog(`Parent updated discount to ${newDiscount}% via Child callback`);
  };

  return (
    <div className="card parent-card">
      <p>Parent State: Active Discount = <strong>{discount}%</strong></p>
      <p className="status-text">{log}</p>

      {/* Render Child passing prop and callback */}
      <Child storeDiscount={discount} onDiscountChange={handleDiscountChange} />
    </div>
  );
}

export default ParentChildComm;
