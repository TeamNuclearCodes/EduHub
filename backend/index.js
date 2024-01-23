import express from "express";
import questionsRouter from './routes/Questions.js'
import authRouter from './routes/Auth.js'

const app = express()

app.get('/',(req,res) => {
    return res.status(200).send('MECLABS EDUPROJECT API')
})

app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/questions',questionsRouter)

app.listen(5000, () => {
    console.log('App running at port 5000');
})