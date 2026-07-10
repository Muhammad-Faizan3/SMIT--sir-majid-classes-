import express from 'express';

const PORT = 5000

const app  = express()

const obj ={
    "name" : "Faizan",
    "age" : 25
}

app.get('/', (req,res) => {
    res.json(obj)

})
app.get('/create-user', (req,res) => {
    res.send('Create user')

})
app.get('/delete-user', (req,res) => {
    res.send('delete-user')

})
app.get('/delete-user', (req,res) => {
    res.send('delete-user')

})
app.listen(PORT, ()=> console.log(`Mudasir start ... `))