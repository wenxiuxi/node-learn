const http=require('http')
const server=http.createServer((req,res)=>{
    res.end('hello,i am server')
})
server.listen(3000,()=>{
    console.log('sever is runing,vist http://localhost:3000')
})