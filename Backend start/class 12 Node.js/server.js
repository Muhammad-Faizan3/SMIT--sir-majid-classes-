import  express from 'express'
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json());
// app.use(cors())

app.post('/api/send-email',(req,res) => {
    res.json({
        message : 'send-email',
        status : true
    })
})

app.listen(PORT, () => {
    console.log('server is running on localhost5000')
})