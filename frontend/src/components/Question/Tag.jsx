import { IoIosCloseCircle } from "react-icons/io";

const Tag = ({ tag, index, handleDelete }) => {
  return (
    <div className="flex gap-2 text-sm bg-zinc-600 rounded-lg px-1.5 py-0.5 justify-center items-center hover:bg-zinc-700">
      <p className="mb-1 font-[500]">#{tag}</p>
      <button onClick={(e) => handleDelete(index,e)} className="text-zinc-900 hover:text-red-500"><IoIosCloseCircle size={22}/></button>
    </div>
  );
};

export default Tag;