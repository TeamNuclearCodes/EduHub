import { Schema, Model, models } from "mongoose";
import User from "./User";

const commentSchema = new Schema({
    id: Schema.Types.ObjectId,
    comment: String,
    author: User
})


const questionSchema = new Schema({
    id: Schema.Types.ObjectId,
    question: String,
    comments: commentSchema,
    author: User
})

const Question = models.Question || Model("Question", questionSchema)
export default Question