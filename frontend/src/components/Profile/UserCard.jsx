import { Button } from "../../components";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";

const UserCard = ({item,addFrnd,userID}) => {
    return (
      <div className="p-[1px] rounded-md hover:bg-gradient-to-r from-violet-800 to-fuchsia-800 cursor-pointer"
        onClick={() => console.log(item._id)}
      >
        <div className="bg-[#35383C] rounded-md flex flex-row gap-2 w-[300px] h-[120px]
        relative border-transparent hover:bg-gradient"
        >
          <div className="bg-zinc-800 p-2 rounded-l-md text-center text-sm w-full flex flex-col align-middle justify-center">
              <p className="font-[500]">{item.name}</p>
              <p>Semester {item.semester}</p>
          </div>
          <img src={item.profileImage} alt="Profile image" className="p-2 mr-2"/>

          <div className="absolute top-0 right-0 p-1">
            {item.friends.includes(userID) ? (
                <div className="py-2 px-4 rounded-md bg-green-800">
                    <FaUserCheck/>
                </div>
            ) : (
                <Button
                    handleClick={(e) => {
                      e.preventDefault();
                      addFrnd(item.username);
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