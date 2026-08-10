import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dns from 'dns'

dns.setServers(['8.8.8.8', '1.1.1.1'])
const app = express();
const PORT = 5000
app.use(express.json())
const url =
  "mongodb+srv://m:xZKVby6E1Rsf62xm@batch18.iel8ecw.mongodb.net/backend?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

app.get('/', (req, res) => {
    res.json('hello world')
})

app.listen(PORT, () => {
    console.log(`server is runnung on ${PORT}`)
})