import React from 'react';

/**
 * Functional Component with Props — UserCard
 * 
 * Demonstrates:
 * 1. A pure JavaScript functional component receiving 'props' as an argument.
 * 2. Destructuring props ({ id, name, email, role }) for clean, direct access.
 * 3. Dynamic badge styling based on whether the user's ID is Even or Odd.
 */
function UserCard({ id, name, email, role }) {
  // Determine whether the ID is even or odd for visual tagging
  const isEven = id % 2 === 0;

  // Extract initials for avatar placeholder
  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className={`user-card ${isEven ? 'user-card-even' : 'user-card-odd'}`}>
      <div className="user-card-header">
        <div className="user-avatar">{initials}</div>
        <div className="user-info">
          <h4 className="user-name">{name}</h4>
          <span className="user-role">{role || 'General User'}</span>
        </div>
        <span className={`id-badge ${isEven ? 'badge-even' : 'badge-odd'}`}>
          ID #{id} ({isEven ? 'Even' : 'Odd'})
        </span>
      </div>

      <div className="user-card-body">
        <p className="user-email">
          <span className="meta-icon">✉</span>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </div>
  );
}

export default UserCard;
