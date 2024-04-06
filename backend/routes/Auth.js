import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/login',async (req,res) => {
    try {
        const username = req.body.username
        if (username){
            let user = await User.findOne({username:username})
            if (!user) res.json({error:'Username doesn\'t exists'}).status(403)
            else res.json(user).status(200)

        } else {
            res.json({error: 'Invalid username'}).status(401)
        }
 
    } catch (err) {
        console.log(err)
    }
})

router.post('/signup', async(req,res) => {
    try {
        const body = req.body
        let user = await User.findOne({username: body.username})
        console.log(user)
        if (user) res.json({error: 'Username is taken'}).status(409)
        else {
            user = new User({
                username: body.username,
                password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
                name: body.name,
                college: body.college,
                semester: body.semester
            })
            user.save()
            res.json({
                message: "SignUp Successful",
                user: {
                    username: user.username,
                    name: user.name,
                    college: user.college,
                    semester: user.semester,
                    chatgrps: user.chatgrps
                }
            }).status(201)
        }
    } catch (error) {
        console.log(error)
    }
})


export default router