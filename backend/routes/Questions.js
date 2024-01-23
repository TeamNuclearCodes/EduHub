import express from 'express'
import connectToDB from '../utils/connectToDB.js'
import Question from '../models/Question.js'

const router = express.Router()

router.get('/',async (req,res) => {
    try{
        connectToDB()
        await Question.find({}).then((questions) => {
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
        res.json({"id":question.id})
    } catch (err) {
        console.log(err)
    }
})

export default router