import express, { response } from 'express'
import mongoose from 'mongoose';
import { log } from 'node:console';

const app = express();

// app.get("/", (req,res) => {
//     res.send("Create Server ")
// })

const userObj = response
app.post("/create-std", (req,res) => {
    res.send("Batch 18 node serverjs ")
    console.log(response)
})



const PORT = 5000;

app.listen(PORT, console.log(`server running http://localhost${5000}`))