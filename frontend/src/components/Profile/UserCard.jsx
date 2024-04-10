import { HrtLn, Button } from "../../components";
import { IoMdAdd, IoMdPersonAdd } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";

// const UserCard = ({item,addFrnd,frnds}) => {
//   return (
//     <div
//         key={item._id}
//         className="bg-zinc-950 p-2 rounded-md flex flex-col gap-2"
//     >
//         <h4 className="text-md">{item.username}</h4>
//         <HrtLn />
//         <div className="flex justify-between">
//         <p>Name: {item.name}</p>
//         <p>Semester: {item.semester}</p>
//         </div>
//         {console.log(item.username)}
//         {frnds.includes(item.username) ? (
//         <div className="w-full text-center">Freinds</div>
//         ) : (
//             <Button
//                 handleClick={(e) => {
//                 e.preventDefault();
//                 addFrnd(item.username);
//                 }}
//                 text="Add Friend"
//                 variant="chatbtn"
//                 leftIcon={<IoMdAdd />}
//             />
//         )}
//     </div>
//   )
// }

const UserCard = ({item,addFrnd,frnds}) => {
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
            {console.log(item.username)}
            {frnds.includes(item.username) ? (
              <div className="absolute top-0 right-0 p-2">
                <div className="py-2 px-4 rounded-md bg-green-800">
                    <FaUserCheck/>
                </div>
              </div>
            ) : (
              <div className="absolute top-0 right-0 p-2">
                <Button
                    handleClick={(e) => {
                    e.preventDefault();
                    addFrnd(item.username);
                    }}
                    variant="chatbtn"
                    leftIcon={<IoMdPersonAdd />}
                />
              </div>
            )}
      </div>
    )
  }

export default UserCard