import React from "react";

const Task = ({ task, onDelete }) => {
  const handleDelete = () => {
    onDelete(task.key);
  };

  return (
    <div>
      <h1>{task.taskName}</h1>
      <p>{task.taskDesc}</p>
      <h3>{task.deadline}</h3>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default Task;
