import express from 'express'
import connectToDB from '../utils/connectToDB.js'
import Question from '../models/Question.js'

const router = express.Router()

router.get('/',(req,res) => {
    reqBody = req.body
    req.send('OK')

})

export default router