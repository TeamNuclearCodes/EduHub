import { useEffect, useState } from "react";
import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { apiBase } from "../../constants";
import { UserCard } from "../../components";

const Find = () => {
  const { auth } = UserAuth();
  const [data, setData] = useState({data: [], friends: []});

  const addFrnd = async (friend) => {
    try {
      let friends_ = [...data.friends];
      friends_.push(friend._id);
      setData({...data, friends: friends_});
      await axios.post(`${apiBase}/api/user/addFriend`, {
        friend: friend.username,
        username: auth.username,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch(`${apiBase}/api/user/getUsersByCollege`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        college: auth.college,
        _id: auth._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.message) setData(data);
        else setData([]);
      });
  }, []);

  return (
    <div className="flex py-2 w-full flex-col gap-2">
      <h3 className="text-center font-[500] underline underline-offset-4">
        Students in {auth.college}
      </h3>
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8 mt-4 mx-auto">
      {data?.data?.map((item) => (
        <UserCard
          item={item}
          key={item._id}
          addFrnd={addFrnd}
          userID={auth._id}
          friends={data.friends}
        />
      ))}
      </div>
    </div>
  );
};

export default Find;
