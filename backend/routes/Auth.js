import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { genToken } from '../utils/token.js'
import sha256 from 'js-sha256'

const router = express.Router()

router.post('/login',async (req,res) => {
    try {
        const body = req.body
        if (body.username && body.password){
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
        } else res.json({error:'username & password are required arguments'})
    } catch (err) {
        console.log(err)
    }
})

router.post('/signup', async(req,res) => {
    try {
        const body = req.body
        if (!(body.username && body.password && body.email)) res.json({error:'username, password & email are required arguments'})
        else {
            let user = await User.findOne({username: body.username})
            if (user) res.json({error: 'Username is taken. Pick another one'}).status(409)
            user = await User.findOne({email: body.email})
            if (user) res.json({error: 'E-Mail is used by another account.'}).status(409)
            else {
                // generate gravtar link
                const hash = sha256(String(body.email).trim().toLowerCase());
                const profileImage=`https://www.gravatar.com/avatar/${hash}?d=robohash&s=400`;
                // create a new user
                const newUser = new User({
                    username: body.username,
                    password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
                    email: body.email,
                    name: body.name || '',
                    college: body.college || '',
                    semester: body.semester || '',
                    profileImage: profileImage
                })
                newUser.save()
                const jwtoken = genToken(newUser)
                let returnobj = {...newUser._doc}
                delete returnobj.password
                returnobj.token = jwtoken
                res.json({
                    message: "SignUp Successful",
                    user: returnobj
                }).status(201)
            }
        }
    } catch (error) {
        console.log(error)
    }
})


export default router