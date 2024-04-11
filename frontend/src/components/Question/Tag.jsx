import React from "react";

const Tag = ({ tag, index, handleDelete }) => {
  const handleClick = () => {
    handleDelete(index);
  };
  return (
    <div>
      <p>{tag}</p>
      <button onClick={handleClick}>x</button>
    </div>
  );
};

export default Tag;
