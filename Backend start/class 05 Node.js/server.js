import express from 'express';
import fs from 'fs'
const app = express();
const PORT = 5000;

// body parser => express.json()

app.use(express.json())

app.post("/signup",(req,res) => {
    // console.log(req.body);

    const userObj = req.body;
   const isFileExists = fs.writeFileSync('users.txt', 'Hello World');

   if(isFileExists) {
    // already user hai
    // append user
   }


    // res.send('User-create')
})

app.get("/", (req,res) => {
    res.send('Batch 18  nodejs start')
})

app.listen(PORT,console.log(`server runing http://localhost:${PORT}`))