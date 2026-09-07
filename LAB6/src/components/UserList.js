import React, { useState } from 'react';
import UserCard from './UserCard';

/**
 * List Rendering Component using .map() — UserList
 * 
 * Demonstrates:
 * 1. Rendering dynamic lists of elements using JavaScript Array.prototype.map().
 * 2. Supplying unique 'key' props to top-level elements inside .map() for React's reconciliation engine.
 * 3. Dynamic array filtering (All, Even IDs, Odd IDs) before mapping.
 */
function UserList({ initialUsers }) {
  // Default dataset if no prop is supplied
  const defaultUsers = [
    { id: 1, name: "Syed Yasir", email: "syedyasirbca24@rvu.edu.in", role: "Full Stack Developer" },
    { id: 2, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Frontend Engineer" },
    { id: 3, name: "Bob Smith", email: "bob.smith@example.com", role: "UI/UX Designer" },
    { id: 4, name: "Charlie Brown", email: "charlie.brown@example.com", role: "DevOps Engineer" },
    { id: 5, name: "Diana Prince", email: "diana.prince@example.com", role: "Cloud Architect" },
    { id: 6, name: "Evan Wright", email: "evan.wright@example.com", role: "QA Engineer" }
  ];

  const userDataset = initialUsers && initialUsers.length > 0 ? initialUsers : defaultUsers;

  // State to filter the rendered list
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'even' | 'odd'

  // Filter the array based on selected mode
  const filteredUsers = userDataset.filter((user) => {
    if (filterMode === 'even') return user.id % 2 === 0;
    if (filterMode === 'odd') return user.id % 2 !== 0;
    return true; // 'all'
  });

  return (
    <div className="component-box user-list-component">
      <div className="list-toolbar">
        <div className="filter-button-group">
          <button
            type="button"
            className={`btn-filter ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            All Users ({userDataset.length})
          </button>
          <button
            type="button"
            className={`btn-filter ${filterMode === 'even' ? 'active' : ''}`}
            onClick={() => setFilterMode('even')}
          >
            Even IDs Only ({userDataset.filter(u => u.id % 2 === 0).length})
          </button>
          <button
            type="button"
            className={`btn-filter ${filterMode === 'odd' ? 'active' : ''}`}
            onClick={() => setFilterMode('odd')}
          >
            Odd IDs Only ({userDataset.filter(u => u.id % 2 !== 0).length})
          </button>
        </div>

        <span className="rendered-count-badge">
          Displaying {filteredUsers.length} item{filteredUsers.length !== 1 ? 's' : ''} mapped
        </span>
      </div>

      {/* Dynamic List Rendering using .map() */}
      <div className="users-cards-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            // Notice: 'key' is essential when mapping elements in React
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
            />
          ))
        ) : (
          <div className="empty-state">No users match the selected criteria.</div>
        )}
      </div>
    </div>
  );
}

export default UserList;
