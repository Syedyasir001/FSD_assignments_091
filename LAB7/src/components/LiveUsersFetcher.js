import React, { useState, useEffect } from 'react';

// Demonstrates useState and useEffect hooks with Express backend API
function LiveUsersFetcher() {
  // useState for route filter and user data
  const [filter, setFilter] = useState('even'); // 'even' or 'odd'
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect triggers when 'filter' state changes
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/users/${filter}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo data if Express server is offline
        const fallback = filter === 'even'
          ? [{ id: 2, name: 'Alice Johnson', email: 'alice@example.com' }, { id: 4, name: 'Charlie Brown', email: 'charlie@example.com' }]
          : [{ id: 1, name: 'Syed Yasir', email: 'syedyasir@example.com' }, { id: 3, name: 'Bob Smith', email: 'bob@example.com' }];
        setUsers(fallback);
        setLoading(false);
      });
  }, [filter]); // Dependency array

  return (
    <div className="card fetcher-card">
      <div className="button-group">
        <button
          onClick={() => setFilter('even')}
          className={`btn ${filter === 'even' ? 'btn-primary' : 'btn-outline'}`}
        >
          GET /users/even
        </button>
        <button
          onClick={() => setFilter('odd')}
          className={`btn ${filter === 'odd' ? 'btn-primary' : 'btn-outline'}`}
        >
          GET /users/odd
        </button>
      </div>

      <p className="status-text">
        Showing <strong>{filter.toUpperCase()}</strong> ID users from Express API:
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="simple-list">
          {users.map((u) => (
            <li key={u.id}>
              <strong>#{u.id}</strong> — {u.name} ({u.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LiveUsersFetcher;
