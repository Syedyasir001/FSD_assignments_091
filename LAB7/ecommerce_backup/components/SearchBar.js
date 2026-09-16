import React, { useRef, useEffect } from 'react';

function SearchBar({ value, onChange }) {
  const inputRef = useRef(null);

  // useEffect: focus input on Cmd/Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="search-wrapper">
      <span className="search-icon">⌕</span>
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Search products... (Ctrl+K)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
