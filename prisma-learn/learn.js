// const p=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve("success")
//         // reject('fail')
//     },3000)
// })
//resolve是成功，reject是失败
// console.log(p)
// 抓取错误
// p.catch(err=>{
//     console.log(err)
// })

// const fs=require('fs/promises');
// async function read(){
//     try{
//         const data=await fs.readFile("a.txt","utf8")
//         console.log(data)
//     }catch(err){
//         console.log(err)
//     }
// }
// read()

// const http=require('http')
// const sever=http.createServer((req,res)=>{
//     res.setHeader('Content-Type','application/json');
//     res.setHeader('Access-Control-Allow-Origin')
// })

//一个简单的api服务，处理http请求，并返回json数据
const http=require('http')
const server=http.createServer((req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    if(req.url==='/api'&& req.method==='GET'){
        const data={message:'hello'};
        res.writeHead(200);
        res.end(JSON.stringify(data));
    }else{
        res.writeHead(404);
        res.end(JSON.stringify({error:'resource not found'}))
    }

})
server.listen(4000,()=>{
    console.log('API sever running on http://localhost:4000')
})