import express from 'express'
import connectToDB from '../utils/connectToDB.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/login',(req,res) => {
    try {
        const username = req.body.username
        connectToDB()
        const user = new User({username: username})
        user.save()
        res.json(user).status(200)
    } catch (err) {
        console.log(err)
    }
})

export default router