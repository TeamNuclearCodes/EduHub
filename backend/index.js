import express from "express";
import questionsRouter from './routes/Questions.js'
import authRouter from './routes/Auth.js'
import todoRouter from './routes/ToDo.js'
import graphRouter from './routes/Graph.js'
import msgRouter from './routes/Msg.js';
import grpRouter from './routes/Grps.js';
import cors from 'cors';
import dotenv from 'dotenv'
import { Server } from "socket.io";
import mongoose from "mongoose";

dotenv.config()

const app = express()

app.get('/',(req,res) => {
    return res.status(200).send('MECLABS EDUPROJECT API')
});

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });
const db = mongoose.connection;

app.use(express.json())
app.use(cors())
app.use('/api/auth',authRouter)
app.use('/api/questions',questionsRouter)
app.use('/api/todo',todoRouter)
app.use('/api/graph',graphRouter)
app.use('/api/group',grpRouter);
app.use('api/chat',msgRouter);


const server = app.listen(5000, () => {
    console.log('App running at port 5000');
})

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", (room) => socket.join(room));
  socket.on("send-message", (message, grp, sender) => {
    console.log(message);
    socket
      .to(grp)
      .emit("receive-message", { content: message, sender: sender });
  });
});
