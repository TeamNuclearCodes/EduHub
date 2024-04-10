import { useEffect, useState } from "react";
import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { apiBase } from "../../constants";
import { HrtLn } from "../../components";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { addFrnds } from "../../utils/APIRoutes";

const Find = () => {
  const { auth } = UserAuth();
  const [data, setData] = useState([]);
  const frnds = JSON.parse(localStorage.getItem("frnds"));

  function addValueToList(value, frnd) {
    let existingList = auth.frnds;
    value = JSON.stringify(value);
    existingList.push(value);
    auth.frnds = existingList;
    localStorage.setItem("auth", JSON.stringify(auth));
    frnds.push(frnd);
    localStorage.setItem("frnds", JSON.stringify(frnds));
    location.reload();
  }

  const addFrnd = async (frnd) => {
    console.log(frnd);
    try {
      console.log(addFrnds);
      const res = await axios.post(addFrnds, {
        frnd: frnd,
        user: auth.username,
      });
      console.log(res.data);
      addValueToList(res.data, frnd);
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
      {data?.map((item) => (
        <div
          key={item._id}
          className="bg-zinc-950 p-2 rounded-md flex flex-col gap-2"
        >
          <h4 className="text-md">{item.username}</h4>
          <HrtLn />
          <div className="flex justify-between">
            <p>Name: {item.name}</p>
            <p>Semester: {item.semester}</p>
          </div>
          {console.log(item.username)}
          {frnds.includes(item.username) ? (
            <div className="w-full text-center">Freinds</div>
          ) : (
            <Button
              handleClick={(e) => {
                e.preventDefault();
                addFrnd(item.username);
              }}
              text="Add Friend"
              variant="chatbtn"
              leftIcon={<IoMdAdd />}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Find;
