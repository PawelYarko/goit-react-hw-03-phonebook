import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default Filter;
