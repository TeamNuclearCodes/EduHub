const Task = ({ task }) => {
  return (
    <div className="flex flex-col bg-zinc-950 rounded-md p-2">
      <h5 className="text-md font-[500] w-full">{task?.taskName}</h5>
      <div className="flex justify-between w-full">
        <p className="text-sm">{task?.taskDesc}</p>
        <h3 className="text-sm">Deadline: {task?.deadline?.substr(0,10)}</h3>
      </div>
    </div>
  );
};

export default Task;
