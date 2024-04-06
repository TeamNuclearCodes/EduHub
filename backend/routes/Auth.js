import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { genToken } from '../utils/token.js'

const router = express.Router()

router.post('/login',async (req,res) => {
    try {
        const body = req.body
        if (body.username){
            let user = await User.findOne({username:body.username})
            if (!user) res.json({error:'Username doesn\'t exists'}).status(403)
            else {
                bcrypt.compare(body.password, user.password).then((result) => {
                    if(result) {
                        const jwtoken = genToken(user)
                        delete user._doc.password
                        const response = {...user._doc, token:jwtoken}
                        res.json({message:'Logged in', user: response}).status(200)
                    } else res.json({error:'Wrong password. Try again'}).status(403)

                })
            }
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
        if (user) res.json({error: 'Username is taken. Pick another one'}).status(409)
        else {
            user = new User({
                username: body.username,
                password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
                name: body.name,
                college: body.college,
                semester: body.semester
            })
            user.save()
            const jwtoken = genToken(user)
            res.json({
                message: "SignUp Successful",
                user: {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    college: user.college,
                    semester: user.semester,
                    chatgrps: user.chatgrps,
                    token: jwtoken
                }
            }).status(201)
        }
    } catch (error) {
        console.log(error)
    }
})


export default router