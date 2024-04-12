import { Button } from "../../components";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserCard = ({item,addFrnd,friends}) => {
    const navigate = useNavigate();

    return (
      <div className="p-[1px] rounded-md hover:shadow-2xl">
        <div className="bg-[#35383C] rounded-md flex flex-row gap-2 w-[300px] h-[120px] relative">
          <div className="bg-zinc-800 p-2 rounded-l-md text-center text-sm w-full flex flex-col align-middle justify-center  cursor-pointer" 
             onClick={() => navigate(`/p/${item.username}`)}
          >
              <p className="font-[500]">{item.name}</p>
              <p>Semester {item.semester}</p>
          </div>
          <img src={item.profileImage} alt="Profile image" className="p-2 mr-2 rounded-2xl"/>

          <div className="absolute top-0 right-0 p-1 cursor-pointer">
            {friends.includes(item._id) ? (
                <div className="py-2 px-4 rounded-md bg-green-800">
                    <FaUserCheck/>
                </div>
            ) : (
                <Button
                  handleClick={(e) => {
                    e.preventDefault();
                    addFrnd(item);
                  }}
                  variant="chatbtn"
                  leftIcon={<IoMdPersonAdd />}
                />
            )}
          </div>
        </div>
      </div>
    )
  }

export default UserCard