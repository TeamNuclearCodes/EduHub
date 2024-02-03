import React from "react";

const Task = ({ task }) => {
  return (
    <div>
      <h1>{task.taskName}</h1>
    </div>
  );
};

export default Task;
