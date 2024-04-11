import { HrtLn, Button } from "../../components";
import { IoMdAdd, IoMdPersonAdd } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";

const UserCard = ({item,addFrnd,userID}) => {
    return (
      <div
        key={item._id}
        className="bg-zinc-950 rounded-md flex flex-col gap-2 w-[250px] relative"
      >
        <img src={item.profileImage} alt="Profile image" className="p-2"/>
        <div className="bg-zinc-800 p-2 rounded-md">
            <h4 className="text-md text-fuchsia-600">{item.username}</h4>
            <HrtLn/>
            <p>Name: {item.name}</p>
            <p>Semester: {item.semester}</p>
        </div>
        
        <div className="absolute top-0 right-0 p-2">
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
    )
  }

export default UserCard