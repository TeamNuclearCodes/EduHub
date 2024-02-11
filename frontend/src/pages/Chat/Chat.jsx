import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../../components";
import "./Chat.css";
import Groups from "../../components/Groups/Groups";
import Welcome from "../../components/Welcome/Welcome";
import ChatSpace from "../../components/ChatSpace/ChatSpace";

function Chat() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("currentUser"));
  const [chatgrps, setChatgrps] = useState([]);
  const [selectedGrp, setSelectedGrps] = useState(undefined);
  const changeSelected = (grp) => {
    setSelectedGrps(grp);
  };
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    } else {
      setUser(auth.username);
      setChatgrps(auth.chatgrps);
    }
  }, []);
  return (
    <div className="container">
      <Groups
        grps={chatgrps}
        handleSelect={changeSelected}
        selectedGrp={selectedGrp}
        uaer={user}
      ></Groups>
      {selectedGrp === undefined ? (
        <Welcome />
      ) : (
        <ChatSpace selectedGrp={selectedGrp} user={user} />
      )}
    </div>
  );
}

export default Chat;
