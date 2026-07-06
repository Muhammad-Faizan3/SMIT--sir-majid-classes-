console.log(`faizan bashir`);

import http from 'http'
const PORT=3000
const server = http.createServer((req,res) => {
    // console.log("request",req.url);
    if(req.url === '/') {
        res.end('server runing on http://localhost:3000 , welcome to batch 18 ...!')
    }else if (req.url === '/about') {
        res.end('about...')
    }else if (req.url === '/contact') {
        res.end('contact...')
    }else if(req.url === '/create-user'){
        res.end('user--created')
    }
})

server.listen(PORT,()=> console.log(`server runing http://localhost:${PORT}`))