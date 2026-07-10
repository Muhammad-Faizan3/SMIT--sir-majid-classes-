import http from 'http';

const PORT = 5000
const server = http.createServer((req,res) => {
    console.log(req.url);
    if(req.url === '/') {
        res.end("Server start")
    }
})

server.listen(PORT,()=> console.log(`server runing on  http:localhost:${PORT}`))