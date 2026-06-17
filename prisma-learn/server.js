const express=require('express')
const {PrismaClient}=require('@prisma/client')

const app=express()
const prisma=new PrismaClient()
app.use(express.json())

//get all users(contain tasks)
app.get('/users',async(requestAnimationFrame,res)=>{
    const users=await prisma.user.findMany({
        include:{tasks:true}
    })
    res.json(users)
})
//create user
app.post('/users',async(req,res)=>{
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