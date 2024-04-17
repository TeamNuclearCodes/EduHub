import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { user, frnd } = req.body;
  const userDB = await User.findOne({ username: user });
  const frndDB = await User.findOne({ username: frnd });
  console.log(user, frnd);

  var userobj = {};
  userobj[userDB.name] = user + frnd;
  var userstr = JSON.stringify(userobj);

  var frndobj = {};
  frndobj[frndDB.name] = user + frnd;
  var frndstr = JSON.stringify(frndobj);

  userDB.frnds.push(frndstr);
  console.log(userDB);
  await userDB.save();
  frndDB.frnds.push(userstr);
  console.log(frndDB);
  await frndDB.save();

  res.send(frndstr).status(200);
});

router.post("/get", async (req, res) => {
  const { userid } = req.body;
  try {
    const usersWithFriend = await User.find({ friends: userid });
    res.status(200).send(usersWithFriend);
  } catch (error) {
    console.error("Error:", error);
  }
});

export default router;
