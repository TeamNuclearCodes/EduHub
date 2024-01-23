import express from 'express'
import connectToDB from '../utils/connectToDB.js'
import Question from '../models/Question.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.get('/',async (req,res) => {
    try{
        await connectToDB()
        await Question.find({}).then((questions) => {
            res.json(questions).status(200)
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/new',async (req,res) => {
    const reqBody = req.body
    console.log(reqBody)
    try {
        await connectToDB()
        const question = new Question({
            question: reqBody.question,
            author: new ObjectId(reqBody.author),
            comments: []
        })
        await question.save()
        console.log(question)
        res.json({"id":question._id})
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id',async (req,res) => {
    const id = req.params.id
    try {
        await connectToDB()
        const question = await Question.findById(id).populate('author')
        if (question) {
            res.send(JSON.stringify(question)).status(200)
        } else {
            res.json({"error":"Question not found"}).status(404)
        }
    } catch (err) {
        console.log(err)
    }
})


export default router