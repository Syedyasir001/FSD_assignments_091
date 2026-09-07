import React, { useState } from 'react';

// Form component with controlled inputs
function AddUser({ onUserAdded }) {
  // Controlled form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent standard page reload

    if (!name || !email) {
      setMessage('Please enter both name and email.');
      return;
    }

    const newUser = { id: Date.now(), name, email };

    if (onUserAdded) {
      onUserAdded(newUser);
    }

    setMessage(`User "${name}" added successfully!`);
    // Reset controlled inputs
    setName('');
    setEmail('');
  };

  return (
    <div className="card form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter customer email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Customer</button>
      </form>

      {message && <p className="form-feedback">{message}</p>}
    </div>
  );
}

export default AddUser;
