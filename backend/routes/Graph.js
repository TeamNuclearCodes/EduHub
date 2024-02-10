import express from 'express'
import connectToDB from "../utils/connectToDB.js";
import Graph from '../models/Graph.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.post('/', async(req,res) => {
    try {
        const body = req.body
        await connectToDB()
        const graph = await Graph.findOne({
            author: new ObjectId(body.user),
            subject: body.subject
        })
        if (graph) {
            graph.data.marksObtained = body.data.marksObtained
            graph.data.totalMarks = body.data.totalMarks
            await graph.save()
            res.json(graph).status(200)
        } else {
            const newGraph = Graph({
                subject: body.subject,
                author: new ObjectId(body.user),
                data: {
                    // date: body.data.date,
                    marksObtained: body.data.marksObtained,
                    totalMarks: body.data.totalMarks
                }
            })
            await newGraph.save()
            res.json(newGraph).status(201)
        }
    }catch(err){
        console.log(err)
    }
})

export default router