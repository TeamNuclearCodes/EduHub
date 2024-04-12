import express from 'express';
import User from '../../models/User.js';
import { ObjectId } from "mongodb";

const router = express.Router();

router.get('/user/:username', async(req,res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({username: username}).select("username name college semester profileImage")
        if (!user) res.json({error: 'User does not exists'});
        else {
            const date = user._id.getTimestamp();
            const joinedYear = date.getFullYear();
            let response = {...user._doc};
            const currentDate = new Date;
            if (joinedYear <= currentDate.getFullYear()) {
                const difference = currentDate.getMonth() - date.getMonth();
                if (difference >= 12) response.date = `Joined in ${joinedYear}`;
                else if (difference == 0) response.date = `Joined This Month`;
                else if (difference == 1) response.date = `Joined 1 Month ago`;
                else response.date = `Joined ${difference} Months ago`;
            } else response.date = `Joinde in ${currentDate.getFullYear() - joinedYear}`;
            res.json(response).status(200);
        }
    } catch (error) {
        console.log(error)
    }    
});

export default router;