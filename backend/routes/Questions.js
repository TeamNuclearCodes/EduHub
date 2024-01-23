import express from 'express'
import connectToDB from '../utils/connectToDB.js'
import Question from '../models/Question.js'

const router = express.Router()

router.get('/',(req,res) => {
    try{
        connectToDB()
        Question.find({}).then((questions) => {
            res.json(questions).status(200)
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/new',(req,res) => {
    const reqBody = req.body
    try {
        connectToDB()
        const question = new Question({
            question: reqBody.question,
            author: req.user,
            comments: []
        })
        question.save()

    } catch (err) {
        console.log(err)
    }
})

export default router