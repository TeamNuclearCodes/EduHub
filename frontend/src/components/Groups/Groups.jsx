import React, { useState } from "react";
import "./Group.css";
import axios from "axios";
import { createGrp, joinGroup } from "../../utils/APIRoutes";

function Groups({ grps, handleSelect, selectedGrp }) {
  const [grpName, setGrpName] = useState("");

  const setSelectGrp = (grp) => {
    handleSelect(grp);
  };

  const joinGrp = async (e) => {
    e.preventDefault();
    try {
      var user = localStorage.getItem("currentUser");
      const res = await axios.post(joinGroup, {
        grp: grpName,
        user: user,
      });
      console.log(res);
      addValueToList(grpName);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    if (grpName === "") return;
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      var user = auth.username;
      const res = await axios.post(createGrp, {
        grp: grpName,
        user: user,
      });
      console.log(res);
      addValueToList(grpName);
    } catch (err) {
      console.log(err);
    }
  };

  function addValueToList(value) {
    var auth = JSON.parse(localStorage.getItem("auth"));
    let existingList = auth.chatgrps;
    console.log(existingList);
    existingList.push(value);
    auth.chatgrps = existingList;
    var updatedAuth = JSON.stringify(auth);
    localStorage.setItem("auth", updatedAuth);
    window.location.reload();
  }

  return (
    <div className="grps_container">
      <div className="join_create">
        <input
          type="text"
          placeholder="enter grp name"
          value={grpName}
          onChange={(e) => setGrpName(e.target.value)}
        ></input>
        <button onClick={joinGrp}>Join</button>
        <button onClick={createHandler}>Create</button>
      </div>
      {grps.map((grp, index) => {
        return (
          <div
            className={`grp ${selectedGrp === grp ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectGrp(grp)}
          >
            {grp}
          </div>
        );
      })}
    </div>
  );
}

export default Groups;
