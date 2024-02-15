import { genDeadline } from "../../utils/ToDo";

const Task = ({task,deadline}) => {
  const redBg = () => {
    return isNaN(deadline.substring(0,2).trim()) && !task.completed ? 'bg-[#d15252]' : 'bg-black'
  }

  return (
  <div className={`p-[2px] w-full rounded-md ${redBg()}`}>
    <div className={`flex bg-zinc-950 rounded-md p-2 max-md:flex-col bg-opacity-85`}>
      <div className="flex flex-col w-8/12 max-md:w-full">
        <h5 className="text-md font-[500] w-full">{task?.taskName}</h5>
        <p className="text-sm">{task?.taskDesc}</p>
      </div>
      <div className="flex flex-col w-4/12 max-md:w-full text-right">
        <p className="text-sm">Deadline: {genDeadline(task?.deadline)}</p>
        <p className="text-sm">{deadline}</p> 
      </div>
    </div>
  </div>
  );
};

export default Task;