import User from '../models/User.js';
import Graph from '../models/Graph.js';
import Question from '../models/Question.js';
import messageSchema from '../models/messageSchema.js';
import TodoList from  '../models/TodoList.js'

import express from 'express';
import { ObjectId } from 'mongodb'

const router = express.Router();

router.post('/getUsersByCollege', async (req,res) => {
    try {
        const userID = req.tokenData._id;
        if (req.body.college) {
            const data = await User.find({
                college: req.body.college,
                _id: {$ne: userID}
            }).select('username name college semester profileImage')
            const userFriends = await User.findOne({_id: userID}).select("friends")
            res.status(200).json({
                data: data,
                friends: userFriends.friends
            });
        } else {
            res.status(404).json({message:"no data"});
        }
    } catch (error) {
        console.log(error);
    }
})

router.patch('/update', async (req,res) => {
    try {
        const newData = req.body;
        await User.findByIdAndUpdate(req.tokenData._id ,newData);
        res.json({"message":"Updated successfully"}).status(200);
    } catch (error) {
        console.log(error);
    }
    
})

router.post('/addFriend', async(req,res) => {
    try {
        const friend = req.body.friend;
        if (friend) {
            const userData = await User.findOne({username: req.tokenData.username});
            const friendData = await User.findOne({username: friend});
            if (friendData) {
                userData.friends.push(new ObjectId(friendData._id));
                friendData.friends.push(new ObjectId(userData._id));
                await userData.save();
                await friendData.save();
                res.json({message: `You are now friends with ${friend}`}).status(201);
            }
            else res.json({error:`user ${friend} doesn't exists`}).status(404);
        } else {
            res.json({error:"friend are required fields"}).status(409);
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/deleteAccount', async(req,res) => {
    try {
        const id = req.tokenData._id;
        const user = await User.findById(new ObjectId(id));
        await Graph.deleteMany({author: new ObjectId(id)});                 // remove collections in graph
        await Question.deleteMany({author: new ObjectId(id)});              // remove all the questions the user has created
        await Question.deleteMany({'comments.author': new ObjectId(id)})    // remove all the comments created by the user
        await messageSchema.deleteMany({sender: user.username});            // remove all the messaged the user has sent
        await TodoList.deleteMany({author: new ObjectId(id)});              // remove all todos the user has created
        await User.findOneAndDelete({username: user.username});             // remove user collection
        res.json({message:"Account deleted successfully"}).status(202);
    } catch (error) {
        console.log(error)
    }
})

export default router