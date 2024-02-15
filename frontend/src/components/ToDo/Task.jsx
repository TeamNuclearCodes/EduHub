import { genDeadline } from "../../utils/ToDo";

const Task = ({task,deadline}) => {
  return (
    <div className="flex flex-col bg-zinc-950 rounded-md p-2">
      <h5 className="text-md font-[500] w-full">{task?.taskName}</h5>
      <div className="flex justify-between w-full">
        <p className="text-sm">{task?.taskDesc}</p>

        <div className="flex flex-col text-right">
        <p className="text-sm">Deadline: {genDeadline(task?.deadline)}</p>
        <p>{deadline}</p> 
        </div>
      </div>
    </div>
  );
};

export default Task;