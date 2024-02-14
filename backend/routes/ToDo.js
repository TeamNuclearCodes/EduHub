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

router.get('/', async(req,res) => {
    try{
        const user = JSON.parse(req.headers.authorization)
        await connectToDB()
        const currentDate = new Date().toLocaleDateString().split('/')
        const dueDate = new Date(currentDate[2],currentDate[1],Number(currentDate[0])+3)

        const tasks = await TodoList.find({
            author: new ObjectId(user._id),
            deadline: {
                $gte: currentDate,
                $lt: dueDate
            }
        }).populate('author')
        return res.json(tasks)
    } catch (e) {
        console.log(e)
    }
})

export default router