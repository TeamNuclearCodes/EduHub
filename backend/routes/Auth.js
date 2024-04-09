import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { genToken } from '../utils/token.js'

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
        if (!(body.username && body.password)) res.json({error:'username & password are required arguments'})
        else {
            const user = await User.findOne({username: body.username})
            if (user) res.json({error: 'Username is taken. Pick another one'}).status(409)
            else {
                const newUser = new User({
                    username: body.username,
                    password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
                    name: body.name || '',
                    college: body.college || '',
                    semester: body.semester || ''
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