import React from "react";

const Filter = ({ onSearchChange }) => {
  return (
    <form>
      <div>
        filter shown with <input onChange={onSearchChange} />
      </div>
    </form>
  );
};

export default Filter;
