import mongoose,{Schema} from 'mongoose'

const graphDataSchema = new Schema({
    date: Date,
    marksObtained: [String],
    totalMarks: [String]  
})

const graphSchema = new Schema({
    subject: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    data: [graphDataSchema]
})

const Graph = mongoose.model("Graph", graphSchema)
export default Graph