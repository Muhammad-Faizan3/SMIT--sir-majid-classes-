import express from 'express'
const PORT = 5000
const app = express();

app.get('/',(req,res)=> {
    res.send('create server')

})
app.get('/about',(req,res)=> {
    res.send('create about')

})
app.post('/about',(req,res)=> {
    res.send('create-user')

})

app.listen(PORT, console.log(`server runing on http://localhost${PORT}`))