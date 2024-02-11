import React, { useState } from "react";
import "./Input.css";
import axios from "axios";
import { chat } from "../../utils/APIRoutes";
import { io } from "socket.io-client";

function Input({ currentGrp, user }) {
  const socket = io(process.env.REACT_APP_HOST);
  socket.on("connect", () => {
  });
  const [msg, setMsg] = useState("");
  const sendMsg = async (e) => {
    e.preventDefault();
    if (msg === "") return;
    setMsg("");
    try {
      socket
        .emit("send-message",msg, currentGrp, user);
      const res = await axios.post(chat, {
        grp: currentGrp,
        msg: msg,
        from: user,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    console.log(msg);
  };
  return (
    <div>
      <form onSubmit={sendMsg}>
        <input
          type="text"
          placeholder="Enter your msg"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Input;
