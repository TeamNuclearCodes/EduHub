import express from 'express'
import connectToDB from '../utils/connectToDB.js'
import TodoList from '../models/TodoList.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.post('/', async (req,res) => {
    try{
        const {name, desc, date, author} = req.body;
        await connectToDB()
        const task = new TodoList({
            taskDesc:desc,
            taskName: name,
            deadline: date,
            author: new ObjectId(author._id)
        })
        await task.save()

        return res.json(task)
    } catch (err) {
        console.log(err)
    }
})

export default router