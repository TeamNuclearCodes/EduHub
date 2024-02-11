import React, { useEffect, useState } from "react";
import "./ChatSpace.css";
import Input from "../Input/Input";
import axios from "axios";
import { clctMsg } from "../../utils/APIRoutes";
import { io } from "socket.io-client";

export default function ChatSpace({ selectedGrp, user }) {
  const socket = io(process.env.REACT_APP_HOST);
  socket.on("connect", () => {
    socket.on("receive-message", (message) => {
      console.log(message);
      extractMsg(message.content, message.sender);
    });
  });

  const [msg, setMsg] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        socket.emit("join", selectedGrp);
        const response = await axios.post(clctMsg, {
          grp: selectedGrp,
        });
        setMsg(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchData();
  }, [selectedGrp]);
  const extractMsg = (message, user) => {
    setMsg((prev) => [...prev, { sender: user, content: message }]);
  };
  return (
    <div className="ChatSpace">
      <div className="header">{selectedGrp}</div>
      <div className="msgbox">
        {msg.map((msg, index) => (
          <div key={index} className={msg.sender==user?"left":"right"}>{msg.content}</div>
        ))}
      </div>
      <div className="input">
        <Input currentGrp={selectedGrp} user={user} />
      </div>
    </div>
  );
}
