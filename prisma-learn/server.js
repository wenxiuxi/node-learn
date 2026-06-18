const express=require('express')
const {PrismaClient}=require('@prisma/client')
// PrismaClient → 操作数据库的工具
//app是服务器
const app=express()
// prisma       → 操作数据库的实例，后面所有数据库操作都靠它
const prisma=new PrismaClient()
app.use(express.json())

//get all users(contain tasks)
app.get('/users',async(req,res)=>{
    // 查User表里所有用户，并且把每个用户的任务也带出来，返回给前端。
    const users=await prisma.user.findMany({
        // 查User表里所有用户，并且把每个用户的任务也带出来，返回给前端。
        // 只返回用户信息，没有任务
// { id: 1, username: 'wenxiu' }
        include:{tasks:true}
    })
    res.json(users)
})
//create user
app.post('/users',async(req,res)=>{
    const {username,password}=req.body
    const user=await prisma.user.create({
        data:{username,password}
    })
    res.json(user)
})
//create task
app.post('/task',async(req,res)=>{
    const {title,userId}=req.body
    const task=await prisma.task.create({
        data:{title,userId}
    })
    res.json(task)
})

app.listen(3000,()=>{
    console.log('server running')
})
