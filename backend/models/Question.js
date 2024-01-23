import mongoose from "mongoose";
import User from "./User.js";

const Schema = mongoose.Schema

const commentSchema = new Schema({
    _id:  Schema.Types.ObjectId,
    comment: {type: String},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


const questionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    question: {type: String},
    author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    comments: [commentSchema]
})

const Question = mongoose.model("Question", questionSchema)
export default Question