import express from 'express'
import connectToDB from '../utils/connectToDB.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/login',(req,res) => {
    const username = req.body.username
})


export default router