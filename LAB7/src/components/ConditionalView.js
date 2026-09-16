import React, { useState } from 'react';

// Component demonstrating conditional rendering
function ConditionalView() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDeals, setShowDeals] = useState(true);

  return (
    <div className="card conditional-card">
      {/* 1. Ternary Operator: condition ? A : B */}
      <div className="conditional-item">
        <p>
          Customer Status:{' '}
          <strong>{isLoggedIn ? 'Logged In (VIP Member)' : 'Guest (Logged Out)'}</strong>
        </p>
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="btn btn-outline"
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>

      <hr className="divider" />

      {/* 2. Logical AND Operator: condition && Component */}
      <div className="conditional-item">
        <button
          onClick={() => setShowDeals(!showDeals)}
          className="btn btn-outline"
        >
          {showDeals ? 'Hide Flash Deals' : 'Show Flash Deals'}
        </button>

        {showDeals && (
          <div className="deal-box">
            ⚡ Flash Deal Active: Get 15% off using code <strong>AUDIO15</strong> at checkout!
          </div>
        )}
      </div>
    </div>
  );
}

export default ConditionalView;
