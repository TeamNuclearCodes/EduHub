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
        if (req.body.college) {
            const data = await User.find({
                college: req.body.college,
                _id: {$ne: req.body._id}
            }).select('username name college semester frnds friends profileImage')
            .populate('friends.list');
            res.status(200).json(data);
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
        await User.findByIdAndUpdate(newData._id, newData);
        res.json({"message":"Updated successfully"}).status(200);
    } catch (error) {
        console.log(error);
    }
    
})

router.post('/addFriend', async(req,res) => {
    try {
        const { username, friend } = req.body;
        if (username && friend) {
            const userData = await User.findOne({username: username});
            const friendData = await User.findOne({username: friend});
            if (friendData) {
                userData.friends.push(new ObjectId(friendData._id));
                friendData.friends.push(new ObjectId(userData._id));
                userData.save();
                friendData.save();
                res.json({message: `You are now friends with ${friend}`}).status(201);
            }
            else res.json({error:`user ${friend} doesn't exists`}).status(404);
        } else {
            res.json({error:"username & friend are required fields"}).status(409);
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/deleteAccount', async(req,res) => {
    try {
        const id = req.headers.authorization;
        const user = await User.findById(new ObjectId(id));
        await Graph.deleteMany({author: new ObjectId(id)});      // remove collections in graph
        await Question.deleteMany({author: new ObjectId(id)});
        await messageSchema.deleteMany({sender: user.username});
        await TodoList.deleteMany({author: new ObjectId(id)});
        await User.findOneAndDelete({username: user.username});
        res.json({message:"Account deleted succesfully"}).status(202);
    } catch (error) {
        console.log(error)
    }
})

export default router