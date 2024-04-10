import { useEffect, useState } from "react";
import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { apiBase } from "../../constants";
import { UserCard } from "../../components";
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
      <div className="grid grid-cols-4 gap-2 mt-4 mx-2">
      {data?.map((item) => (
        <UserCard
          item={item}
          addFrnd={addFrnd}
          frnds={frnds}
        />
      ))}
      </div>
    </div>
  );
};

export default Find;
