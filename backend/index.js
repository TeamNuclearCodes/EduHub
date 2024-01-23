import express from "express";
import connectToDB from "./utils/connectToDB.js";

const app = express()

app.get('/',(req,res) => {
    return res.status(200).send('test')
})


app.listen(5000, () => {
    console.log('App running at port 5000');
})