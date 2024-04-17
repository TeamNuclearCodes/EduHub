import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../../components";
import "./Chat.css";
import Groups from "../../components/Groups/Groups";
import Welcome from "../../components/Welcome/Welcome";
import ChatSpace from "../../components/ChatSpace/ChatSpace";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";
import { getFrnds } from "../../utils/APIRoutes";

function Chat() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const { auth } = UserAuth();
  const [chatgrps, setChatgrps] = useState([]);
  const [frnds, setFrnds] = useState([]);
  const [room, setRoom] = useState(undefined);

  const [selectedGrp, setSelectedGrps] = useState(undefined);
  const changeSelected = (grp) => {
    setSelectedGrps(grp);
  };
  const changeRoom = (room) => {
    setRoom(room);
  };
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    } else {
      setUser(auth.username);
      setChatgrps(auth.chatgrps);
      setFrnds(auth.frnds);
    }
    const getData = async () => {
      try {
        console.log(getFrnds);
        const res = await axios.post(
          getFrnds,
          {
            userid: auth._id,
          },
          {
            headers: {
              authorization: auth.token,
            },
          }
        );
        console.log(res);
        setFrnds(res.data);
      } catch (err) {}
    };
    getData();
  }, []);
  return (
    <ProtectedRoute>
      <div className="container mt-4 px-2">
        <div className="flex justify-between w-full py-6 gap-4 max-md:flex-col max-md:px-2">
          <Groups
            frnds={frnds}
            grps={chatgrps}
            handleSelect={changeSelected}
            selectedGrp={selectedGrp}
            changeRoom={changeRoom}
            room={room}
          ></Groups>
          <div className="flex w-9/12 justify-center">
            {selectedGrp === undefined ? (
              <Welcome />
            ) : (
              <ChatSpace selectedGrp={selectedGrp} user={user} room={room} />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Chat;
